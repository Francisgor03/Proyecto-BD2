// =====================================================================
// AgroSmart - 03_consultas_mongo.js  (find, filtros, aggregation pipeline, explain)
// Ejecutar:  mongosh "mongodb://localhost:27017" -f 03_consultas_mongo.js
// (o pega un bloque a la vez en la pestana MONGOSH de Compass).
// Ejemplos usan: sensor 1 (parcela 1), campania 31 (parcela 31), trabajador 6. Todos existen en Oracle.
// =====================================================================
var bd = db.getSiblingDB("agrosmart");

// 1. Conteo de documentos por coleccion (cada una debe tener >= 30)
printjson(["lecturas_sensores","observaciones_agricolas","reportes_plagas","alertas_sensores","monitoreos_satelitales"]
  .map(function (c) { return { coleccion: c, documentos: bd.getCollection(c).countDocuments({}) }; }));

// 2. find: ultimas 5 lecturas del sensor 1 (usa el indice id_sensor + fecha_registro)
printjson(bd.lecturas_sensores.find({ id_sensor: 1 }).sort({ fecha_registro: -1 }).limit(5).toArray());

// 3. find con filtro sobre arreglo anidado: lecturas con humedad menor a 25 %
printjson(bd.lecturas_sensores.find(
  { mediciones: { $elemMatch: { tipo: "humedad_suelo", valor: { $lt: 25 } } } },
  { _id: 0, id_sensor: 1, id_parcela: 1, fecha_registro: 1, mediciones: 1 }
).sort({ fecha_registro: -1 }).limit(5).toArray());

// 4. Alertas pendientes (no atendidas), mas recientes primero
printjson(bd.alertas_sensores.find({ atendida: false }, { _id: 0, id_sensor: 1, id_parcela: 1, fecha: 1, tipo_alerta: 1, severidad: 1 })
  .sort({ fecha: -1 }).limit(10).toArray());

// 5. Observaciones de la campania 31 con la etiqueta "riego" o "supervision"
printjson(bd.observaciones_agricolas.find({ id_campania: 31, etiquetas: { $in: ["riego", "supervision"] } }).toArray());

// 6. Reportes de plagas de nivel alto y no resueltos
printjson(bd.reportes_plagas.find({ nivel_afectacion: "alto", estado: { $ne: "resuelto" } }).toArray());

// 7. Aggregation: humedad promedio, minima y maxima por parcela
printjson(bd.lecturas_sensores.aggregate([
  { $unwind: "$mediciones" },
  { $match: { "mediciones.tipo": "humedad_suelo" } },
  { $group: { _id: "$id_parcela", lecturas: { $sum: 1 }, promedio: { $avg: "$mediciones.valor" },
              minima: { $min: "$mediciones.valor" }, maxima: { $max: "$mediciones.valor" } } },
  { $project: { _id: 0, id_parcela: "$_id", lecturas: 1, promedio: { $round: ["$promedio", 1] }, minima: 1, maxima: 1 } },
  { $sort: { promedio: 1 } }
]).toArray());

// 8. Aggregation: alertas por tipo y severidad
printjson(bd.alertas_sensores.aggregate([
  { $group: { _id: { tipo: "$tipo_alerta", severidad: "$severidad" }, cantidad: { $sum: 1 } } },
  { $sort: { cantidad: -1 } }
]).toArray());

// 9. Aggregation: reportes de plagas por tipo y estado
printjson(bd.reportes_plagas.aggregate([
  { $group: { _id: { tipo: "$tipo_plaga", estado: "$estado" }, cantidad: { $sum: 1 } } },
  { $sort: { "_id.tipo": 1, cantidad: -1 } }
]).toArray());

// 10. Aggregation: NDVI promedio por parcela y ultima captura (monitoreo satelital)
printjson(bd.monitoreos_satelitales.aggregate([
  { $sort: { fecha_captura: 1 } },
  { $group: { _id: "$id_parcela", capturas: { $sum: 1 }, ndvi_promedio: { $avg: "$indices.ndvi" },
              ultima_captura: { $last: "$fecha_captura" }, ultimo_ndvi: { $last: "$indices.ndvi" } } },
  { $project: { _id: 0, id_parcela: "$_id", capturas: 1, ndvi_promedio: { $round: ["$ndvi_promedio", 2] }, ultima_captura: 1, ultimo_ndvi: 1 } },
  { $sort: { ndvi_promedio: -1 } }, { $limit: 10 }
]).toArray());

// 11. Aggregation: etiquetas mas usadas en las observaciones
printjson(bd.observaciones_agricolas.aggregate([
  { $unwind: "$etiquetas" }, { $group: { _id: "$etiquetas", usos: { $sum: 1 } } }, { $sort: { usos: -1 } }
]).toArray());

// 12. Aggregation: lecturas por dia del sensor 1
printjson(bd.lecturas_sensores.aggregate([
  { $match: { id_sensor: 1 } },
  { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha_registro" } }, lecturas: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]).toArray());

// 13. Uso de indices: el plan debe mostrar IXSCAN (no COLLSCAN)
var plan = bd.lecturas_sensores.find({ id_sensor: 1 }).sort({ fecha_registro: -1 }).explain("executionStats");
printjson({ etapa: plan.queryPlanner.winningPlan.stage || plan.queryPlanner.winningPlan.inputStage.stage,
            indice: JSON.stringify(plan.queryPlanner.winningPlan).match(/ix_[a-z_]+/g),
            docsExaminados: plan.executionStats.totalDocsExamined, devueltos: plan.executionStats.nReturned });

// 14. Consulta integrada Oracle + MongoDB: se hace en Python (la aplicacion consulta Oracle por la parcela
//     y MongoDB por sus lecturas/alertas, y las une por id_parcela). Aqui solo se obtiene la parte MongoDB:
printjson({ parcela: 1,
  lecturas: bd.lecturas_sensores.countDocuments({ id_parcela: 1 }),
  alertas_pendientes: bd.alertas_sensores.countDocuments({ id_parcela: 1, atendida: false }),
  observaciones: bd.observaciones_agricolas.countDocuments({ id_parcela: 1 }) });
