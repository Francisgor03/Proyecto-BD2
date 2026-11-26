-- =====================================================================
-- AgroSmart - 04_crud.sql  (operaciones CRUD de ejemplo)
-- Ejecutar como AGROSMART_OWNER o AGROSMART_APP (con el esquema delante: agrosmart_owner.tabla).
-- Ejecuta cada bloque por separado (Ctrl+Enter) y captura la pantalla como evidencia.
-- Los registros de prueba usan el documento 99999999 para poder borrarlos al final.
-- =====================================================================

-- ---- CREATE ----
INSERT INTO propietario (nombres, apellidos, tipo_documento, numero_documento, telefono, correo)
VALUES ('Prueba', 'Crud Agrosmart', 'DNI', '99999999', '999000111', 'prueba.crud@example.com');

INSERT INTO parcela (id_propietario, nombre, area_hectareas, ubicacion, latitud, longitud, tipo_suelo)
SELECT id_propietario, 'Parcela de prueba', 12.5, 'Ica, Ica (ficticia)', -14.07, -75.73, 'FRANCO'
FROM propietario WHERE numero_documento = '99999999';
COMMIT;

-- ---- READ ----
SELECT o.id_propietario, o.nombres, p.id_parcela, p.nombre, p.area_hectareas
FROM propietario o JOIN parcela p ON p.id_propietario = o.id_propietario
WHERE o.numero_documento = '99999999';

-- ---- UPDATE ----
UPDATE parcela SET area_hectareas = 15.0, tipo_suelo = 'FRANCO_ARENOSO'
WHERE nombre = 'Parcela de prueba'
  AND id_propietario = (SELECT id_propietario FROM propietario WHERE numero_documento = '99999999');
UPDATE propietario SET telefono = '999222333' WHERE numero_documento = '99999999';
COMMIT;

SELECT nombre, area_hectareas, tipo_suelo FROM parcela WHERE nombre = 'Parcela de prueba';

-- ---- DELETE (primero el hijo, luego el padre) ----
DELETE FROM parcela WHERE nombre = 'Parcela de prueba'
  AND id_propietario = (SELECT id_propietario FROM propietario WHERE numero_documento = '99999999');
DELETE FROM propietario WHERE numero_documento = '99999999';
COMMIT;

-- ---------------------------------------------------------------------
-- PRUEBAS DE INTEGRIDAD: cada sentencia DEBE FALLAR. Ejecutalas una por una y captura el error.
-- ---------------------------------------------------------------------
-- ORA-00001 (UNIQUE): documento duplicado
-- INSERT INTO propietario (nombres, apellidos, tipo_documento, numero_documento) SELECT 'X','Y','DNI', numero_documento FROM propietario WHERE id_propietario = 1;

-- ORA-02290 (CHECK): area negativa
-- INSERT INTO parcela (id_propietario, nombre, area_hectareas, ubicacion, tipo_suelo) VALUES (1, 'Area negativa', -5, 'Ica', 'FRANCO');

-- ORA-02291 (FK): propietario inexistente
-- INSERT INTO parcela (id_propietario, nombre, area_hectareas, ubicacion, tipo_suelo) VALUES (99999, 'Sin dueno', 5, 'Ica', 'FRANCO');

-- ORA-02292 (FK): borrar un propietario que tiene parcelas
-- DELETE FROM propietario WHERE id_propietario = 1;

-- ORA-02290 (CHECK): fecha fin anterior al inicio
-- INSERT INTO campania (id_parcela, id_tipo_cultivo, nombre, fecha_inicio, fecha_fin, estado) VALUES (1, 1, 'Fechas invertidas', DATE '2026-05-01', DATE '2026-04-01', 'FINALIZADA');
