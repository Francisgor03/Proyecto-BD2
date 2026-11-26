import express from 'express';
import { fileURLToPath } from 'node:url';
import { datasets, engineNames } from '../shared/datasets.mjs';
import { recordFields } from '../shared/recordFields.mjs';
import { closeDatabases, configuration, listRecords, missingResources } from './databases.mjs';
import { changeRecord, explainRecordError, getRecord, parseRecordId } from './records.mjs';

const app = express();
app.disable('x-powered-by');
app.set('query parser', 'simple');

function engineError(engine, error) {
  const code = String(error.code ?? error.name);
  console.error(`[${engineNames[engine]}] ${/^[A-Za-z0-9_-]+$/.test(code) ? code : 'Error'}`);
}

app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  if (!['127.0.0.1', 'localhost'].includes(req.hostname)) {
    return res.status(403).json({ message: 'Abre AgroSmart en localhost para usar la API.' });
  }
  next();
});

app.get('/api/health', async (_req, res) => {
  const results = await Promise.all(Object.keys(engineNames).map(async (engine) => {
    const state = configuration(engine);
    if (state !== 'ready') return [engine, { state }];
    try {
      const missing = await missingResources(engine);
      return [engine, { state: missing.length ? 'empty' : 'connected', missing }];
    } catch (error) {
      engineError(engine, error);
      return [engine, { state: 'unreachable' }];
    }
  }));
  res.json(Object.fromEntries(results));
});

function integer(value, fallback, min, max) {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || !/^\d{1,10}$/.test(value) || +value < min || +value > max) {
    throw new Error(`Se esperaba un entero entre ${min} y ${max}.`);
  }
  return Number(value);
}

function parseDay(value) {
  if (value === undefined) return undefined;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Usa fechas con el formato AAAA-MM-DD.');
  }
  const date = new Date(`${value}T00:00:00-05:00`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error('La fecha indicada no es válida.');
  }
  return date;
}

app.get('/api/:engine/:resource', async (req, res) => {
  const { engine, resource } = req.params;
  const dataset = datasets.find((entry) => entry.engine === engine && entry.id === resource);
  if (!dataset) return res.status(404).json({ message: 'La consulta solicitada no existe.' });

  const state = configuration(engine);
  if (state !== 'ready') {
    return res.status(503).json({
      message: `Revisa la configuración de ${engineNames[engine]} en el archivo .env del backend.`,
    });
  }

  let filters;
  try {
    const query = req.query;
    const allowed = ['limit', 'offset'];
    if ('id_parcela' in dataset.columns) allowed.push('parcela');
    if (engine === 'mongo' && 'id_sensor' in dataset.columns) allowed.push('sensor');
    if (dataset.date) allowed.push('desde', 'hasta');
    if (resource === 'alertas_sensores') allowed.push('pendientes');
    if (Object.keys(query).some((key) => !allowed.includes(key))) {
      throw new Error('La consulta contiene un filtro no disponible.');
    }
    const from = parseDay(query.desde);
    const lastDay = parseDay(query.hasta);
    if (from && lastDay && from > lastDay) {
      throw new Error('La fecha inicial debe ser anterior o igual a la final.');
    }
    if (query.pendientes !== undefined && query.pendientes !== 'true') {
      throw new Error('El filtro pendientes debe ser true.');
    }
    filters = {
      limit: integer(query.limit, 20, 1, 100),
      offset: integer(query.offset, 0, 0, 9999999999),
      parcel: integer(query.parcela, undefined, 1, 9999999999),
      sensor: integer(query.sensor, undefined, 1, 9999999999),
      from,
      through: lastDay && new Date(lastDay.getTime() + 86_400_000),
      pending: query.pendientes === 'true',
    };
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const records = await listRecords(dataset, filters);
    if (!records) {
      return res.status(503).json({
        message: `Falta la colección ${resource}. Revisa el nombre de la base y los scripts de Docubd2.`,
      });
    }
    res.json({
      records: records.slice(0, filters.limit),
      hasMore: records.length > filters.limit,
    });
  } catch (error) {
    engineError(engine, error);
    res.status(503).json({
      message: `No se pudo consultar ${engineNames[engine]}. Revisa el servicio, los permisos y el esquema.`,
    });
  }
});

const jsonBody = express.json({ limit: '64kb' });

function localWrite(req, res, next) {
  const origin = req.get('origin');
  if (origin && origin !== `http://${req.get('host')}`) {
    return res.status(403).json({ message: 'Las escrituras se realizan desde la interfaz local de AgroSmart.' });
  }
  if (req.method === 'DELETE') return next();
  if (!req.is('application/json')) return res.status(415).json({ message: 'Envía los datos en formato JSON.' });
  jsonBody(req, res, (error) => {
    if (error) return res.status(error.status === 413 ? 413 : 400).json({ message: 'El formulario es demasiado grande o el JSON no es válido.' });
    next();
  });
}

async function recordRequest(req, res) {
  const { engine, resource, recordId } = req.params;
  const dataset = datasets.find((entry) => entry.engine === engine && entry.id === resource);
  if (!dataset) return res.status(404).json({ message: 'El recurso solicitado no existe.' });
  if (!Object.hasOwn(recordFields, resource)) {
    return res.status(405).json({ message: 'Los totales se calculan a partir de aplicaciones de insumos y costos de producción.' });
  }
  if (configuration(engine) !== 'ready') {
    return res.status(503).json({ message: `Configura ${engineNames[engine]} en el .env del backend.` });
  }

  try {
    const id = recordId && parseRecordId(dataset, recordId);
    if (req.method === 'GET' || req.method === 'HEAD') return res.json(await getRecord(dataset, id));
    const changedId = await changeRecord(dataset, id, req.method, req.body);
    if (req.method === 'DELETE') return res.sendStatus(204);
    return res.status(req.method === 'POST' ? 201 : 200).json({ id: changedId });
  } catch (error) {
    const known = explainRecordError(error);
    if (known) return res.status(known.status).json({ message: known.message });
    engineError(engine, error);
    return res.status(503).json({ message: 'No se pudo completar la operación. Revisa la conexión de las bases y los permisos.' });
  }
}

app.get('/api/:engine/:resource/:recordId', recordRequest);
app.post('/api/:engine/:resource', localWrite, recordRequest);
app.put('/api/:engine/:resource/:recordId', localWrite, recordRequest);
app.delete('/api/:engine/:resource/:recordId', localWrite, recordRequest);
app.use('/api', (_req, res) => res.status(404).json({ message: 'Ruta de API desconocida.' }));

const dev = process.argv.includes('--dev');
const vite = dev ? await (await import('vite')).createServer({ server: { middlewareMode: true } }) : null;
app.use(vite ? vite.middlewares : express.static(fileURLToPath(new URL('../dist/', import.meta.url))));

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`AgroSmart disponible en http://127.0.0.1:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    server.close();
    await Promise.allSettled([vite?.close(), closeDatabases()]);
    process.exit(0);
  });
}
