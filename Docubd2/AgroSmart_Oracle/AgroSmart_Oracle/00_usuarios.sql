-- =====================================================================
-- AgroSmart - 00_usuarios.sql
-- Ejecutar como SYSTEM (o SYS) conectado al PDB (en Oracle XE: servicio XEPDB1).
-- Si te conectas a la raiz (CDB$ROOT), descomenta la siguiente linea:
-- ALTER SESSION SET CONTAINER = XEPDB1;
-- CAMBIA las contrasenas antes de ejecutar y guardalas en variables de entorno.
-- =====================================================================

-- Dueno del esquema: crea las tablas y es dueno de los datos
CREATE USER agrosmart_owner IDENTIFIED BY "Owner#2026Ags"
  DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;
GRANT CREATE SESSION, CREATE TABLE, CREATE VIEW, CREATE SEQUENCE,
      CREATE TRIGGER, CREATE PROCEDURE TO agrosmart_owner;

-- Rol de la aplicacion (los privilegios sobre tablas se otorgan en 05_seguridad.sql)
CREATE ROLE agrosmart_app_rol;

-- Usuario de la aplicacion Python: CRUD sin permisos de DDL
CREATE USER agrosmart_app IDENTIFIED BY "App#2026Ags";
GRANT CREATE SESSION TO agrosmart_app;
GRANT agrosmart_app_rol TO agrosmart_app;

-- Usuario de solo lectura (consultas y reportes)
CREATE USER agrosmart_lector IDENTIFIED BY "Lector#2026Ags";
GRANT CREATE SESSION TO agrosmart_lector;
