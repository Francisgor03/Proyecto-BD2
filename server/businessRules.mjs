import { readFile } from 'node:fs/promises';
import oracledb from 'oracledb';
import { configuration, mongoDatabase, schema, withOracle } from './databases.mjs';
import { RecordError, requireRule } from './recordValidation.mjs';

const limaDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', dateStyle: 'short' });
const today = () => limaDate.format(new Date());
const collectionGroups = {
  id_parcela: ['lecturas_sensores', 'alertas_sensores', 'observaciones_agricolas', 'reportes_plagas', 'monitoreos_satelitales'],
  id_sensor: ['lecturas_sensores', 'alertas_sensores'],
  id_campania: ['observaciones_agricolas', 'reportes_plagas', 'monitoreos_satelitales'],
  id_trabajador: ['observaciones_agricolas', 'reportes_plagas', 'alertas_sensores'],
};
const datedChildren = {
  aplicacion_insumo: 'fecha_aplicacion',
  asignacion_trabajador: 'fecha_asignacion',
  costo_produccion: 'fecha_registro',
};
let reference;

export async function firstRow(connection, statement, binds) {
  const { rows } = await connection.execute(statement, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });
  return rows[0];
}

async function readOracleReference(record) {
  const status = configuration('oracle');
  if (status === 'disabled') {
    try {
      reference ??= JSON.parse(await readFile(new URL(
        '../Docubd2/AgroSmart_MongoDB/AgroSmart_MongoDB/referencia_mongo.json', import.meta.url,
      ), 'utf8'));
    } catch {
      throw new RecordError(503, 'Configura Oracle o recupera el catálogo sintético referencia_mongo.json de Docubd2.');
    }
    return {
      parcel: reference.parcelas.find((row) => row.id_parcela === record.id_parcela),
      sensor: reference.sensores.find((row) => row.id_sensor === record.id_sensor),
      campaign: reference.campanias.find((row) => row.id_campania === record.id_campania),
      worker: reference.trabajadores.find((row) => row.id_trabajador === record.id_trabajador_atencion),
      assignment: reference.asignaciones.find((row) => row.id_campania === record.id_campania
        && row.id_trabajador === record.id_trabajador),
    };
  }
  requireRule(status === 'ready', 'Completa la configuración de Oracle para verificar los identificadores.', 503);
  try {
    return await withOracle(async (connection) => {
      const parcel = await firstRow(connection,
        `SELECT 1 FROM ${schema}.parcela WHERE id_parcela = :id`, { id: record.id_parcela });
      const sensor = record.id_sensor && await firstRow(connection,
        `SELECT id_parcela AS "id_parcela", tipo_sensor AS "tipo_sensor",
                TO_CHAR(fecha_instalacion, 'YYYY-MM-DD') AS "fecha_instalacion"
           FROM ${schema}.sensor WHERE id_sensor = :id`, { id: record.id_sensor });
      const campaign = record.id_campania && await firstRow(connection,
        `SELECT id_parcela AS "id_parcela", estado AS "estado",
                TO_CHAR(fecha_inicio, 'YYYY-MM-DD') AS "fecha_inicio",
                TO_CHAR(fecha_fin, 'YYYY-MM-DD') AS "fecha_fin_efectiva"
           FROM ${schema}.campania WHERE id_campania = :id`, { id: record.id_campania });
      const worker = record.id_trabajador_atencion && await firstRow(connection,
        `SELECT 1 FROM ${schema}.trabajador WHERE id_trabajador = :id`, { id: record.id_trabajador_atencion });
      const assignment = record.id_trabajador && await firstRow(connection,
        `SELECT 1 FROM ${schema}.asignacion_trabajador
          WHERE id_campania = :campaign AND id_trabajador = :worker AND ROWNUM = 1`,
        { campaign: record.id_campania, worker: record.id_trabajador });
      return { parcel, sensor, campaign, worker, assignment };
    });
  } catch {
    throw new RecordError(503, 'No se pudieron verificar las referencias en Oracle. Revisa su conexión y permisos.');
  }
}

export async function validateMongoRules(dataset, record) {
  const eventDate = record[dataset.date];
  const day = limaDate.format(eventDate);
  if (dataset.id === 'alertas_sensores') {
    if (record.atendida) {
      requireRule(record.fecha_atencion && record.fecha_atencion >= eventDate,
        'La alerta atendida requiere una fecha de atención igual o posterior a la alerta.');
    } else {
      requireRule(!record.fecha_atencion && !record.id_trabajador_atencion,
        'Borra la fecha y el trabajador de atención si la alerta está pendiente.');
    }
    if (record.valor_detectado !== undefined && record.umbral_configurado !== undefined) {
      const kind = record.tipo_alerta;
      if (kind.endsWith('_alta')) requireRule(record.valor_detectado > record.umbral_configurado, 'El valor debe superar el umbral.');
      if (kind.endsWith('_baja')) requireRule(record.valor_detectado < record.umbral_configurado, 'El valor debe quedar por debajo del umbral.');
    }
  }
  if (record.mediciones) {
    const seen = new Set();
    for (const { tipo, valor, unidad } of record.mediciones) {
      const moisture = tipo === 'humedad_suelo';
      requireRule(!seen.has(tipo), 'Incluye una sola medición de cada tipo.');
      requireRule(unidad === (moisture ? '%' : '°C'), 'Usa % para humedad y °C para temperatura.');
      requireRule(!moisture || (valor >= 0 && valor <= 100), 'La humedad debe estar entre 0 y 100 %.');
      seen.add(tipo);
    }
  }
  const { parcel, sensor, campaign, worker, assignment } = await readOracleReference(record);
  requireRule(parcel, 'El ID de parcela no existe en el catálogo de referencia.');
  if (record.id_sensor) {
    requireRule(sensor && sensor.id_parcela === record.id_parcela, 'El sensor debe pertenecer a la parcela indicada.');
    requireRule(day >= sensor.fecha_instalacion, 'La fecha no puede ser anterior a la instalación del sensor.');
    if (record.mediciones && sensor.tipo_sensor !== 'MULTIPARAMETRO') {
      const type = sensor.tipo_sensor === 'HUMEDAD_SUELO' ? 'humedad_suelo' : 'temperatura_ambiente';
      requireRule(record.mediciones.every(({ tipo }) => tipo === type), 'El tipo de medición debe coincidir con el tipo del sensor.');
    }
  }
  if (record.id_campania) {
    requireRule(campaign && campaign.id_parcela === record.id_parcela, 'La campaña debe pertenecer a la parcela indicada.');
    requireRule(campaign.estado !== 'PLANIFICADA' && withinCampaign(day, campaign),
      'La fecha debe estar dentro de una campaña que ya inició.');
  }
  if (record.id_trabajador) requireRule(assignment, 'El trabajador debe estar asignado a la campaña.');
  if (record.id_trabajador_atencion) requireRule(worker, 'El trabajador que atendió la alerta no existe.');
}

function withinCampaign(day, campaign) {
  return day >= campaign.fecha_inicio && day <= (campaign.fecha_fin_efectiva ?? today());
}

async function checkMongoLinks(key, id, filterFor = (collection) => ({
  [collection === 'alertas_sensores' && key === 'id_trabajador' ? 'id_trabajador_atencion' : key]: id,
})) {
  requireRule(configuration('mongo') === 'ready', 'Configura MongoDB para comprobar si el registro tiene documentos asociados.', 503);
  const db = mongoDatabase();
  const collections = collectionGroups[key];
  const existing = await db.listCollections({ name: { $in: collections } }, { nameOnly: true, maxTimeMS: 5000 }).toArray();
  requireRule(existing.length === collections.length, 'Faltan colecciones en MongoDB para comprobar las referencias.', 503);
  for (const collection of collections) {
    const filter = filterFor(collection);
    if (filter && await db.collection(collection).findOne(filter, { projection: { _id: 1 }, maxTimeMS: 5000 })) {
      throw new RecordError(409, `El cambio afectaría documentos asociados en ${collection}.`);
    }
  }
}

function dateOutside(field, start, end) {
  const before = new Date(`${start}T00:00:00-05:00`);
  const after = end && new Date(+new Date(`${end}T00:00:00-05:00`) + 86_400_000);
  return [{ [field]: { $lt: before } }, ...(after ? [{ [field]: { $gte: after } }] : [])];
}

export async function validateOracleChange(connection, dataset, record, existing) {
  const id = existing?.[dataset.key];
  if (!record && Object.hasOwn(collectionGroups, dataset.key)) {
    await checkMongoLinks(dataset.key, id);
  }
  if (record && dataset.id === 'propietario' && record.correo) {
    requireRule(/^[^\s@]+@[^\s@]+$/.test(record.correo), 'Introduce un correo electrónico válido.');
  }
  if (record && dataset.id === 'campania') {
    await validateCampaign(connection, record, existing);
  }
  const childDate = datedChildren[dataset.id];
  if (record && childDate) {
    const campaign = await firstRow(connection,
      `SELECT TO_CHAR(fecha_inicio, 'YYYY-MM-DD') AS "fecha_inicio", TO_CHAR(fecha_fin, 'YYYY-MM-DD') AS "fecha_fin_efectiva"
         FROM ${schema}.campania WHERE id_campania = :id FOR UPDATE`, { id: record.id_campania });
    requireRule(campaign && withinCampaign(record[childDate], campaign), 'La fecha debe estar dentro de la campaña.');
  }
  if (record && dataset.id === 'asignacion_trabajador') {
    const duplicate = await firstRow(connection,
      `SELECT 1 FROM ${schema}.asignacion_trabajador
        WHERE id_campania = :campaign AND id_trabajador = :worker
          AND TRUNC(fecha_asignacion) = TO_DATE(:day, 'YYYY-MM-DD')
          AND (:id = 0 OR id_asignacion <> :id) AND ROWNUM = 1`,
      { campaign: record.id_campania, worker: record.id_trabajador, day: record.fecha_asignacion, id: id ?? 0 });
    requireRule(!duplicate, 'El trabajador ya está asignado a esta campaña en esa fecha.', 409);
  }
  if (existing && configuration('mongo') === 'ready') {
    if (record && dataset.id === 'sensor'
      && (record.id_parcela !== existing.id_parcela || record.fecha_instalacion !== existing.fecha_instalacion
        || record.tipo_sensor !== existing.tipo_sensor)) {
      await checkMongoLinks('id_sensor', id, (collection) => {
        const dateField = collection === 'lecturas_sensores' ? 'fecha_registro' : 'fecha';
        const conditions = [{ id_parcela: { $ne: record.id_parcela } }, ...dateOutside(dateField, record.fecha_instalacion)];
        if (collection === 'lecturas_sensores' && record.tipo_sensor !== 'MULTIPARAMETRO') {
          const type = record.tipo_sensor === 'HUMEDAD_SUELO' ? 'humedad_suelo' : 'temperatura_ambiente';
          conditions.push({ mediciones: { $elemMatch: { tipo: { $ne: type } } } });
        }
        return { id_sensor: id, $or: conditions };
      });
    }
    if (dataset.id === 'asignacion_trabajador' &&
      (!record || record.id_campania !== existing.id_campania || record.id_trabajador !== existing.id_trabajador)) {
      const other = await firstRow(connection,
        `SELECT 1 FROM ${schema}.asignacion_trabajador
          WHERE id_campania = :campaign AND id_trabajador = :worker AND id_asignacion <> :id AND ROWNUM = 1`,
        { campaign: existing.id_campania, worker: existing.id_trabajador, id });
      if (!other) await checkMongoLinks('id_trabajador', existing.id_trabajador, (collection) => collection === 'alertas_sensores'
        ? null : { id_trabajador: existing.id_trabajador, id_campania: existing.id_campania });
    }
  }
}

async function validateCampaign(connection, record, existing) {
  const id = existing?.id_campania ?? 0;
  requireRule(!record.fecha_fin || record.fecha_fin >= record.fecha_inicio, 'La fecha de fin debe ser igual o posterior a la de inicio.');
  if (record.estado !== 'CANCELADA') {
    const conflicts = await firstRow(connection,
      `SELECT 1 FROM ${schema}.campania
        WHERE id_parcela = :parcel AND id_campania <> :id AND estado <> 'CANCELADA'
          AND ((estado = 'EN_CURSO' AND :state = 'EN_CURSO') OR
            (TRUNC(fecha_inicio) <= TO_DATE(:endDay, 'YYYY-MM-DD')
              AND NVL(TRUNC(fecha_fin), DATE '9999-12-31') >= TO_DATE(:startDay, 'YYYY-MM-DD')))
          AND ROWNUM = 1`,
      { parcel: record.id_parcela, id, state: record.estado, endDay: record.fecha_fin ?? '9999-12-31', startDay: record.fecha_inicio });
    requireRule(!conflicts, 'Las fechas se solapan con otra campaña de la parcela o ya hay una campaña en curso.', 409);
  }
  if (!existing) return;
  if (record.fecha_inicio !== existing.fecha_inicio || (record.fecha_fin ?? null) !== existing.fecha_fin) {
    for (const [table, field] of Object.entries(datedChildren)) {
      const outside = await firstRow(connection,
        `SELECT 1 FROM ${schema}.${table} WHERE id_campania = :id AND ROWNUM = 1
          AND (TRUNC(${field}) < TO_DATE(:startDay, 'YYYY-MM-DD') OR TRUNC(${field}) > TO_DATE(:endDay, 'YYYY-MM-DD'))`,
        { id, startDay: record.fecha_inicio, endDay: record.fecha_fin ?? today() });
      requireRule(!outside, 'Las fechas dejarían asignaciones, aplicaciones de insumos o costos fuera de la campaña.', 409);
    }
  }
  if (configuration('mongo') === 'ready' && (record.id_parcela !== existing.id_parcela || record.estado !== existing.estado
    || record.fecha_inicio !== existing.fecha_inicio || (record.fecha_fin ?? null) !== existing.fecha_fin)) {
    const dates = { observaciones_agricolas: 'fecha', reportes_plagas: 'fecha_reporte', monitoreos_satelitales: 'fecha_captura' };
    await checkMongoLinks('id_campania', id, (collection) => record.estado === 'PLANIFICADA' ? { id_campania: id } : {
      id_campania: id,
      $or: [{ id_parcela: { $ne: record.id_parcela } },
        ...dateOutside(dates[collection], record.fecha_inicio, record.fecha_fin ?? today())],
    });
  }
}
