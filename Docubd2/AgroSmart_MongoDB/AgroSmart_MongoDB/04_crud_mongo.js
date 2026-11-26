// =====================================================================
// AgroSmart - 04_crud_mongo.js  (insertOne, insertMany, find, updateOne, updateMany, deleteOne, deleteMany)
// Ejecutar con el usuario de la aplicacion (despues de activar la autenticacion, ver 05):
//   mongosh "mongodb://agrosmart_app:AppAgs2026x@localhost:27017/agrosmart?authSource=agrosmart" -f 04_crud_mongo.js
// Todos los documentos de prueba llevan  nota: "PRUEBA CRUD"  y se eliminan al final.
// Ejecuta los bloques uno a uno si quieres capturar la pantalla de cada operacion.
// =====================================================================
var bd = db.getSiblingDB("agrosmart");

// ---- CREATE: insertOne ----
printjson(bd.lecturas_sensores.insertOne({
  id_sensor: 1, id_parcela: 1, fecha_registro: ISODate("2026-11-22T12:00:00Z"),
  mediciones: [{ tipo: "humedad_suelo", valor: 33.4, unidad: "%" }],
  estado: "normal", origen: "sintetico", nota: "PRUEBA CRUD" }));

printjson(bd.alertas_sensores.insertOne({
  id_sensor: 1, id_parcela: 1, fecha: ISODate("2026-11-22T12:05:00Z"), tipo_alerta: "humedad_baja", severidad: "media",
  descripcion: "Alerta de prueba CRUD", valor_detectado: 20.5, umbral_configurado: 25, atendida: false,
  origen: "sintetico", nota: "PRUEBA CRUD" }));

// ---- CREATE: insertMany ----
printjson(bd.observaciones_agricolas.insertMany([
  { id_parcela: 31, id_campania: 31, id_trabajador: 6, fecha: ISODate("2026-11-20T09:00:00Z"),
    descripcion: "Observacion de prueba 1", etiquetas: ["prueba"], origen: "sintetico", nota: "PRUEBA CRUD" },
  { id_parcela: 31, id_campania: 31, id_trabajador: 6, fecha: ISODate("2026-11-21T09:30:00Z"),
    descripcion: "Observacion de prueba 2", evidencias: [{ tipo: "imagen", archivo: "prueba_crud.jpg" }], origen: "sintetico", nota: "PRUEBA CRUD" }
]));

// ---- READ ----
printjson(bd.alertas_sensores.find({ nota: "PRUEBA CRUD" }).toArray());
printjson(bd.observaciones_agricolas.find({ nota: "PRUEBA CRUD" }, { _id: 0, descripcion: 1, fecha: 1, etiquetas: 1 }).toArray());

// ---- UPDATE: updateOne (marcar la alerta de prueba como atendida) ----
printjson(bd.alertas_sensores.updateOne({ nota: "PRUEBA CRUD" },
  { $set: { atendida: true, fecha_atencion: ISODate("2026-11-22T13:00:00Z"), id_trabajador_atencion: 6 } }));

// ---- UPDATE: updateMany (agregar una etiqueta a las observaciones de prueba) ----
printjson(bd.observaciones_agricolas.updateMany({ nota: "PRUEBA CRUD" }, { $addToSet: { etiquetas: "revisado" } }));
printjson(bd.observaciones_agricolas.find({ nota: "PRUEBA CRUD" }, { _id: 0, descripcion: 1, etiquetas: 1 }).toArray());

// ---- DELETE: deleteOne y deleteMany ----
printjson(bd.lecturas_sensores.deleteOne({ nota: "PRUEBA CRUD" }));
printjson(bd.alertas_sensores.deleteMany({ nota: "PRUEBA CRUD" }));
printjson(bd.observaciones_agricolas.deleteMany({ nota: "PRUEBA CRUD" }));

// Verificacion: no deben quedar documentos de prueba (todos deben dar 0)
printjson(["lecturas_sensores", "alertas_sensores", "observaciones_agricolas"].map(function (c) {
  return { coleccion: c, restantes: bd.getCollection(c).countDocuments({ nota: "PRUEBA CRUD" }) }; }));

// ---------------------------------------------------------------------
// PRUEBAS DE VALIDACION: cada insercion DEBE FALLAR con "Document failed validation".
// Descomenta de una en una, ejecuta y captura el error.
// ---------------------------------------------------------------------
// Unidad no permitida:
// bd.lecturas_sensores.insertOne({ id_sensor: 1, id_parcela: 1, fecha_registro: new Date(), mediciones: [{ tipo: "humedad_suelo", valor: 30, unidad: "kg" }], estado: "normal", origen: "sintetico" });
// Falta un campo obligatorio (id_sensor):
// bd.lecturas_sensores.insertOne({ id_parcela: 1, fecha_registro: new Date(), mediciones: [{ tipo: "humedad_suelo", valor: 30, unidad: "%" }], estado: "normal", origen: "sintetico" });
// NDVI fuera de rango (-1 a 1):
// bd.monitoreos_satelitales.insertOne({ id_parcela: 1, fecha_captura: new Date(), indices: { ndvi: 1.5 }, calidad: "buena", origen: "sintetico" });
// Alerta atendida sin fecha_atencion:
// bd.alertas_sensores.insertOne({ id_sensor: 1, id_parcela: 1, fecha: new Date(), tipo_alerta: "humedad_baja", severidad: "baja", descripcion: "x", atendida: true, origen: "sintetico" });
