-- AgroSmart - 99_limpieza.sql
-- Borra todas las tablas del esquema para repetir la instalacion. Ejecutar como AGROSMART_OWNER.
-- CUIDADO: elimina todos los datos.
DROP VIEW v_costo_campania;
DROP TABLE costo_produccion PURGE;
DROP TABLE aplicacion_insumo PURGE;
DROP TABLE asignacion_trabajador PURGE;
DROP TABLE sensor PURGE;
DROP TABLE campania PURGE;
DROP TABLE parcela PURGE;
DROP TABLE insumo PURGE;
DROP TABLE trabajador PURGE;
DROP TABLE tipo_cultivo PURGE;
DROP TABLE propietario PURGE;
