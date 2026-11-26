-- =====================================================================
-- AgroSmart - 05_seguridad.sql
-- Ejecutar como AGROSMART_OWNER, DESPUES de 01 y 02 (los usuarios se crean en 00_usuarios.sql).
-- =====================================================================

-- Rol de la aplicacion: CRUD sobre las tablas (sin DDL)
GRANT SELECT, INSERT, UPDATE, DELETE ON propietario            TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON parcela                TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON tipo_cultivo           TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON campania               TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON trabajador             TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON asignacion_trabajador  TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON insumo                 TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON aplicacion_insumo      TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON costo_produccion       TO agrosmart_app_rol;
GRANT SELECT, INSERT, UPDATE, DELETE ON sensor                 TO agrosmart_app_rol;
GRANT SELECT ON v_costo_campania TO agrosmart_app_rol;   -- la vista se crea al final de 01_creacion_tablas.sql

-- Usuario de solo lectura
GRANT SELECT ON propietario            TO agrosmart_lector;
GRANT SELECT ON parcela                TO agrosmart_lector;
GRANT SELECT ON tipo_cultivo           TO agrosmart_lector;
GRANT SELECT ON campania               TO agrosmart_lector;
GRANT SELECT ON trabajador             TO agrosmart_lector;
GRANT SELECT ON asignacion_trabajador  TO agrosmart_lector;
GRANT SELECT ON insumo                 TO agrosmart_lector;
GRANT SELECT ON aplicacion_insumo      TO agrosmart_lector;
GRANT SELECT ON costo_produccion       TO agrosmart_lector;
GRANT SELECT ON sensor                 TO agrosmart_lector;
GRANT SELECT ON v_costo_campania       TO agrosmart_lector;

-- ---------------------------------------------------------------------
-- VERIFICACION (captura la pantalla como evidencia)
-- ---------------------------------------------------------------------
-- Privilegios otorgados desde este esquema:
SELECT grantee, table_name, privilege FROM user_tab_privs_made
WHERE grantee IN ('AGROSMART_APP_ROL', 'AGROSMART_LECTOR') ORDER BY grantee, table_name, privilege;

-- Pruebas (conectate con cada usuario en SQL Developer):
-- 1) Como AGROSMART_LECTOR:
--      SELECT COUNT(*) FROM agrosmart_owner.parcela;                    -> funciona
--      DELETE FROM agrosmart_owner.parcela WHERE id_parcela = 1;        -> ORA-01031: privilegios insuficientes
-- 2) Como AGROSMART_APP:
--      SELECT COUNT(*) FROM agrosmart_owner.parcela;                    -> funciona
--      UPDATE agrosmart_owner.parcela SET area_hectareas = area_hectareas WHERE id_parcela = 1;  -> funciona (haz ROLLBACK)
--      CREATE TABLE prueba (id NUMBER);                                 -> ORA-01031: privilegios insuficientes
