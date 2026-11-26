-- =====================================================================
-- AgroSmart - 03_consultas.sql  (SELECT, JOIN, agregaciones, reportes)
-- Ejecutar como AGROSMART_OWNER (o como AGROSMART_LECTOR anteponiendo el esquema: agrosmart_owner.tabla)
-- Tip SQL Developer: Ctrl+Enter ejecuta la sentencia donde esta el cursor.
-- =====================================================================

-- 1. Conteo de registros por tabla (verifica el minimo de 30)
SELECT 'PROPIETARIO' tabla, COUNT(*) filas FROM propietario UNION ALL
SELECT 'PARCELA', COUNT(*) FROM parcela UNION ALL
SELECT 'TIPO_CULTIVO', COUNT(*) FROM tipo_cultivo UNION ALL
SELECT 'CAMPANIA', COUNT(*) FROM campania UNION ALL
SELECT 'TRABAJADOR', COUNT(*) FROM trabajador UNION ALL
SELECT 'ASIGNACION_TRABAJADOR', COUNT(*) FROM asignacion_trabajador UNION ALL
SELECT 'INSUMO', COUNT(*) FROM insumo UNION ALL
SELECT 'APLICACION_INSUMO', COUNT(*) FROM aplicacion_insumo UNION ALL
SELECT 'COSTO_PRODUCCION', COUNT(*) FROM costo_produccion UNION ALL
SELECT 'SENSOR', COUNT(*) FROM sensor;

-- 2. SELECT simple con filtro y orden
SELECT id_parcela, nombre, area_hectareas, tipo_suelo
FROM parcela WHERE area_hectareas > 50 ORDER BY area_hectareas DESC;

-- 3. JOIN: parcelas con su propietario
SELECT p.id_parcela, p.nombre AS parcela, p.ubicacion, o.nombres || ' ' || o.apellidos AS propietario
FROM parcela p JOIN propietario o ON o.id_propietario = p.id_propietario
ORDER BY p.id_parcela;

-- 4. JOIN de 3 tablas: campanias con parcela y cultivo
SELECT c.id_campania, c.nombre AS campania, p.nombre AS parcela, t.nombre AS cultivo, c.fecha_inicio, c.fecha_fin, c.estado
FROM campania c
JOIN parcela p ON p.id_parcela = c.id_parcela
JOIN tipo_cultivo t ON t.id_tipo_cultivo = c.id_tipo_cultivo
ORDER BY c.fecha_inicio;

-- 5. Campanias en curso
SELECT c.id_campania, c.nombre, p.nombre AS parcela, c.fecha_inicio
FROM campania c JOIN parcela p ON p.id_parcela = c.id_parcela
WHERE c.estado = 'EN_CURSO' ORDER BY c.fecha_inicio;

-- 6. Agregacion: campanias por estado
SELECT estado, COUNT(*) AS cantidad FROM campania GROUP BY estado ORDER BY cantidad DESC;

-- 7. Agregacion: superficie total y numero de parcelas por propietario (HAVING)
SELECT o.id_propietario, o.nombres || ' ' || o.apellidos AS propietario,
       COUNT(p.id_parcela) AS parcelas, SUM(p.area_hectareas) AS hectareas_totales
FROM propietario o JOIN parcela p ON p.id_propietario = o.id_propietario
GROUP BY o.id_propietario, o.nombres, o.apellidos
HAVING COUNT(p.id_parcela) >= 2
ORDER BY hectareas_totales DESC;

-- 8. Vista: costo total por campania (ya se crea en 01; aqui se recrea por si hace falta)
CREATE OR REPLACE VIEW v_costo_campania AS
SELECT c.id_campania, c.nombre AS campania, c.estado,
       NVL(ci.costo_insumos, 0) AS costo_insumos,
       NVL(cp.costo_otros, 0)   AS costo_otros,
       NVL(ci.costo_insumos, 0) + NVL(cp.costo_otros, 0) AS costo_total
FROM campania c
LEFT JOIN (SELECT id_campania, SUM(cantidad * costo_unitario) AS costo_insumos
           FROM aplicacion_insumo GROUP BY id_campania) ci ON ci.id_campania = c.id_campania
LEFT JOIN (SELECT id_campania, SUM(monto) AS costo_otros
           FROM costo_produccion GROUP BY id_campania) cp ON cp.id_campania = c.id_campania;

SELECT * FROM v_costo_campania ORDER BY costo_total DESC;

-- 9. Costo total por cultivo (usa la vista)
SELECT t.nombre AS cultivo, COUNT(*) AS campanias, ROUND(SUM(v.costo_total), 2) AS costo_total
FROM v_costo_campania v
JOIN campania c ON c.id_campania = v.id_campania
JOIN tipo_cultivo t ON t.id_tipo_cultivo = c.id_tipo_cultivo
GROUP BY t.nombre ORDER BY costo_total DESC;

-- 10. Trabajadores por campania
SELECT c.nombre AS campania, COUNT(DISTINCT a.id_trabajador) AS trabajadores, COUNT(*) AS asignaciones
FROM asignacion_trabajador a JOIN campania c ON c.id_campania = a.id_campania
GROUP BY c.nombre ORDER BY trabajadores DESC;

-- 11. Insumos mas utilizados
SELECT i.nombre, i.tipo, COUNT(*) AS aplicaciones, SUM(a.cantidad) AS cantidad_total, i.unidad_medida
FROM aplicacion_insumo a JOIN insumo i ON i.id_insumo = a.id_insumo
GROUP BY i.nombre, i.tipo, i.unidad_medida ORDER BY aplicaciones DESC;

-- 12. Sensores por parcela y estado
SELECT p.nombre AS parcela, s.codigo_dispositivo, s.tipo_sensor, s.estado, s.fecha_instalacion
FROM sensor s JOIN parcela p ON p.id_parcela = s.id_parcela
ORDER BY p.nombre, s.codigo_dispositivo;

-- 13. Parcelas sin campanias (subconsulta NOT EXISTS)
SELECT p.id_parcela, p.nombre FROM parcela p
WHERE NOT EXISTS (SELECT 1 FROM campania c WHERE c.id_parcela = p.id_parcela);

-- 14. Trabajadores sin asignaciones
SELECT t.id_trabajador, t.nombres, t.apellidos, t.cargo, t.estado
FROM trabajador t LEFT JOIN asignacion_trabajador a ON a.id_trabajador = t.id_trabajador
WHERE a.id_asignacion IS NULL;

-- ---------------------------------------------------------------------
-- VALIDACION DE REGLAS DE NEGOCIO (cada consulta debe devolver 0 filas)
-- ---------------------------------------------------------------------
-- RN-03: una parcela no tiene campanias solapadas
SELECT a.id_parcela, a.id_campania AS camp_a, b.id_campania AS camp_b
FROM campania a JOIN campania b ON a.id_parcela = b.id_parcela AND a.id_campania < b.id_campania
WHERE a.estado <> 'CANCELADA' AND b.estado <> 'CANCELADA'
  AND a.fecha_inicio <= NVL(b.fecha_fin, DATE '9999-12-31')
  AND b.fecha_inicio <= NVL(a.fecha_fin, DATE '9999-12-31');

-- RN-04: aplicaciones, asignaciones y costos dentro de las fechas de su campania
SELECT 'APLICACION' origen, x.id_aplicacion AS id FROM aplicacion_insumo x JOIN campania c ON c.id_campania = x.id_campania
WHERE x.fecha_aplicacion < c.fecha_inicio OR x.fecha_aplicacion > NVL(c.fecha_fin, SYSDATE)
UNION ALL
SELECT 'ASIGNACION', x.id_asignacion FROM asignacion_trabajador x JOIN campania c ON c.id_campania = x.id_campania
WHERE x.fecha_asignacion < c.fecha_inicio OR x.fecha_asignacion > NVL(c.fecha_fin, SYSDATE)
UNION ALL
SELECT 'COSTO', x.id_costo FROM costo_produccion x JOIN campania c ON c.id_campania = x.id_campania
WHERE x.fecha_registro < c.fecha_inicio OR x.fecha_registro > NVL(c.fecha_fin, SYSDATE);
