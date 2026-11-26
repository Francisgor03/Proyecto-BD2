import { ObjectId } from 'mongodb';
import oracledb from 'oracledb';
import { recordFields } from '../shared/recordFields.mjs';
import { firstRow, validateMongoRules, validateOracleChange } from './businessRules.mjs';
import { mongoDatabase, schema, withOracle } from './databases.mjs';
import { RecordError, requireRule, validateRecord } from './recordValidation.mjs';

export function parseRecordId(dataset, value) {
  if (dataset.engine === 'mongo') {
    requireRule(/^[a-f0-9]{24}$/i.test(value), 'El identificador del documento no es válido.', 400);
    return new ObjectId(value);
  }
  requireRule(/^\d{1,10}$/.test(value) && Number(value) > 0, 'El identificador del registro no es válido.', 400);
  return Number(value);
}

async function mongoCollection(id) {
  const db = mongoDatabase();
  const found = await db.listCollections({ name: id }, { nameOnly: true, maxTimeMS: 5000 }).toArray();
  requireRule(found.length, `Falta la colección ${id}. Revisa los scripts de Docubd2.`, 503);
  return db.collection(id);
}

function oracleRow(connection, dataset, id, lock = false) {
  const fields = recordFields[dataset.id];
  const columns = [
    `${dataset.key} AS "${dataset.key}"`,
    ...Object.entries(fields).map(([key, field]) => field.type === 'date'
      ? `TO_CHAR(${key}, 'YYYY-MM-DD') AS "${key}"`
      : `${key} AS "${key}"`),
  ];
  return firstRow(connection,
    `SELECT ${columns.join(', ')} FROM ${schema}.${dataset.id} WHERE ${dataset.key} = :id${lock ? ' FOR UPDATE' : ''}`, { id });
}

export async function getRecord(dataset, id) {
  const record = dataset.engine === 'mongo'
    ? await (await mongoCollection(dataset.id)).findOne({ _id: id }, { maxTimeMS: 5000 })
    : await withOracle((connection) => oracleRow(connection, dataset, id));
  requireRule(record, 'Este registro ya no existe.', 404);
  return record;
}

// Keep cross-engine checks and the write in the same order across requests to this server.
let previousWrite = Promise.resolve();

export function changeRecord(dataset, id, method, payload) {
  const fields = recordFields[dataset.id];
  const record = method === 'DELETE' ? undefined : validateRecord(payload, fields);
  const write = previousWrite.then(() => dataset.engine === 'mongo'
    ? writeMongo(dataset, fields, id, record)
    : writeOracle(dataset, fields, id, record));
  previousWrite = write.catch(() => {});
  return write;
}

async function writeMongo(dataset, fields, id, record) {
  const collection = await mongoCollection(dataset.id);
  if (!record) {
    const result = await collection.deleteOne({ _id: id });
    requireRule(result.deletedCount, 'Este documento ya no existe.', 404);
    return;
  }

  await validateMongoRules(dataset, record);
  const document = { ...record, origen: 'sintetico' };
  if (!id) {
    const { insertedId } = await collection.insertOne(document);
    return insertedId;
  }
  const unset = Object.fromEntries(Object.keys(fields).filter((field) => !Object.hasOwn(record, field)).map((field) => [field, '']));
  const result = await collection.updateOne({ _id: id }, { $set: document, $unset: unset });
  requireRule(result.matchedCount, 'Este documento ya no existe.', 404);
  return id;
}

function oracleValue(field, bind) {
  return field.type === 'date' ? `TO_DATE(:${bind}, 'YYYY-MM-DD')` : `:${bind}`;
}

async function writeOracle(dataset, fields, id, record) {
  return withOracle(async (connection) => {
    const table = `${schema}.${dataset.id}`;
    const existing = id && await oracleRow(connection, dataset, id, true);
    if (id) requireRule(existing, 'Este registro ya no existe.', 404);
    if (record && dataset.id === 'campania') {
      const parcel = await firstRow(connection,
        `SELECT id_parcela FROM ${schema}.parcela WHERE id_parcela = :id FOR UPDATE`, { id: record.id_parcela });
      requireRule(parcel, 'La parcela indicada no existe.');
    }
    await validateOracleChange(connection, dataset, record, existing);
    if (!record) {
      await connection.execute(`DELETE FROM ${table} WHERE ${dataset.key} = :id`, { id });
      await connection.commit();
      return;
    }
    const columns = id
      ? Object.keys(fields).filter((key) => (record[key] ?? null) !== (existing[key] ?? null)
          && !(dataset.id === 'propietario' && key === 'fecha_registro' && record[key] === undefined))
      : Object.keys(record);
    if (!columns.length) return id;

    const values = columns.map((key, index) => oracleValue(fields[key], `field${index}`));
    const binds = Object.fromEntries(columns.map((key, index) => [`field${index}`, record[key] ?? null]));
    if (id) {
      const assignments = columns.map((key, index) => `${key} = ${values[index]}`);
      await connection.execute(`UPDATE ${table} SET ${assignments.join(', ')} WHERE ${dataset.key} = :id`, { ...binds, id });
      await connection.commit();
      return id;
    }
    const { outBinds } = await connection.execute(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')}) RETURNING ${dataset.key} INTO :createdId`,
      { ...binds, createdId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } },
    );
    await connection.commit();
    return outBinds.createdId[0];
  });
}

export function explainRecordError(error) {
  if (error instanceof RecordError) return error;
  switch (error.code) {
    case 'ORA-00001':
    case 11000: return new RecordError(409, 'Ya existe un registro con ese identificador o combinación de valores únicos.');
    case 'ORA-02292': return new RecordError(409, 'Oracle tiene registros relacionados. Elimina o reasigna esas dependencias primero.');
    case 'ORA-02291': return new RecordError(422, 'Una de las referencias indicadas no existe en Oracle.');
    case 'ORA-01031':
    case 13: return new RecordError(403, 'La cuenta de la base de datos necesita permisos para realizar esta operación.');
    case 'ORA-02290':
    case 'ORA-01400':
    case 'ORA-01438':
    case 'ORA-12899':
    case 121: return new RecordError(422, 'Los valores no cumplen las restricciones del esquema. Revisa los campos.');
    default: return null;
  }
}
