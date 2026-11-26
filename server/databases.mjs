import { MongoClient } from 'mongodb';
import oracledb from 'oracledb';
import { datasets } from '../shared/datasets.mjs';

const { MONGO_URI, MONGO_DB, ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING } = process.env;
export const schema = (process.env.ORACLE_SCHEMA ?? 'AGROSMART_OWNER').trim().toUpperCase();
const mongoName = MONGO_DB?.trim() || 'agrosmart';
const mongoDatasets = datasets.filter(({ engine }) => engine === 'mongo');
const oracleSettings = [ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING];
const schemaIsValid = /^[A-Z][A-Z0-9_$#]{0,127}$/.test(schema);
let mongoClient;
let oraclePool;

export function configuration(engine) {
  if (engine === 'mongo') {
    return MONGO_URI?.trim() ? 'ready' : 'disabled';
  }
  if (!oracleSettings.some(Boolean)) return 'disabled';
  return oracleSettings.every(Boolean) && schemaIsValid ? 'ready' : 'incomplete';
}

export function mongoDatabase() {
  mongoClient ??= new MongoClient(MONGO_URI, {
    serverSelectionTimeoutMS: 3500,
    socketTimeoutMS: 6500,
  });
  return mongoClient.db(mongoName);
}

export async function withOracle(query) {
  oraclePool ??= oracledb.createPool({
    user: ORACLE_USER,
    password: ORACLE_PASSWORD,
    connectString: ORACLE_CONNECT_STRING,
    connectTimeout: 4,
    poolMin: 0,
    poolMax: 4,
    queueTimeout: 6500,
  }).catch((error) => {
    oraclePool = undefined;
    throw error;
  });
  const pool = await oraclePool;
  const connection = await pool.getConnection();
  try {
    connection.callTimeout = 6500;
    return await query(connection);
  } finally {
    await connection.close();
  }
}

export async function missingResources(engine) {
  if (engine === 'mongo') {
    const collections = await mongoDatabase().listCollections({}, { nameOnly: true, maxTimeMS: 5000 }).toArray();
    const names = new Set(collections.map(({ name }) => name));
    return mongoDatasets.filter(({ id }) => !names.has(id)).map(({ id }) => id);
  }

  await withOracle((connection) => connection.execute(
    `SELECT 1 FROM ${schema}.parcela WHERE ROWNUM = 1`,
  ));
  return [];
}

const oracleRelations = {
  campania: {
    extra: { parcela: 'p.nombre', cultivo: 't.nombre' },
    joins: `JOIN ${schema}.parcela p ON p.id_parcela = r.id_parcela
            JOIN ${schema}.tipo_cultivo t ON t.id_tipo_cultivo = r.id_tipo_cultivo`,
  },
  sensor: {
    extra: { parcela: 'p.nombre' },
    joins: `JOIN ${schema}.parcela p ON p.id_parcela = r.id_parcela`,
  },
  v_costo_campania: {
    extra: { id_parcela: 'c.id_parcela' },
    joins: `JOIN ${schema}.campania c ON c.id_campania = r.id_campania`,
  },
};

export async function listRecords(dataset, { offset, limit, parcel, sensor, from, through, pending }) {
  if (dataset.engine === 'mongo') {
    const db = mongoDatabase();
    const collections = await db.listCollections({ name: dataset.id }, { nameOnly: true, maxTimeMS: 5000 }).toArray();
    if (!collections.length) return null;

    const filter = {};
    if (parcel) filter.id_parcela = parcel;
    if (sensor) filter.id_sensor = sensor;
    if (pending) filter.atendida = false;
    if (from || through) {
      filter[dataset.date] = {
        ...(from && { $gte: from }),
        ...(through && { $lt: through }),
      };
    }
    const rows = await db.collection(dataset.id).find(filter, { maxTimeMS: 5000 })
      .sort({ [dataset.date]: -1, _id: -1 })
      .skip(offset).limit(limit + 1).toArray();
    return rows;
  }

  const { extra = {}, joins = '' } = oracleRelations[dataset.id] ?? {};
  const parcelColumn = extra.id_parcela ?? 'r.id_parcela';
  const predicate = parcel ? `WHERE ${parcelColumn} = :parcel` : '';
  const columns = Object.keys(dataset.columns).map((column) => {
    const source = extra[column] ?? `r.${column}`;
    return column.startsWith('fecha_')
      ? `TO_CHAR(${source}, 'YYYY-MM-DD') AS "${column}"`
      : `${source} AS "${column}"`;
  });

  return withOracle(async (connection) => {
    const result = await connection.execute(
      `SELECT ${columns.join(', ')}
       FROM ${schema}.${dataset.id} r ${joins}
       ${predicate}
       ORDER BY r.${dataset.key} OFFSET :rowOffset ROWS FETCH NEXT :rowLimit ROWS ONLY`,
      { rowOffset: offset, rowLimit: limit + 1, ...(parcel && { parcel }) },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows;
  });
}

export async function closeDatabases() {
  const pool = await oraclePool?.catch(() => undefined);
  await Promise.allSettled([mongoClient?.close(), pool?.close(5)]);
}
