# AgroSmart

Panel web en React con un backend Node.js y Express. Oracle guarda los registros administrativos y MongoDB guarda el monitoreo agrícola. Cada motor se configura por separado en el backend y se puede probar en su propio equipo.

## Arranque local

Instala Node.js 22.12 o superior dentro de la rama 22, o Node.js 24 o superior. Desde la raíz del repositorio en el primer arranque:

```powershell
npm ci
Copy-Item .env.example .env
```

En macOS y Linux, copia el archivo con `cp .env.example .env`. Si ya tienes un `.env` local, edítalo con tu configuración.

```powershell
npm run dev
```

Abre [AgroSmart](http://127.0.0.1:3000). El botón **Actualizar** vuelve a probar las conexiones y recarga la consulta actual. Reinicia el proceso si cambias el `.env`. Las variables del archivo se leen en el servidor y Git ignora el archivo local.

## Equipo con MongoDB

1. Inicia MongoDB. El archivo de ejemplo apunta a `mongodb://127.0.0.1:27017` y a la base `agrosmart`. Si tu instalación usa autenticación, conecta con el usuario de aplicación que tiene el rol `readWrite` sobre `agrosmart`. Usa `mongodb://USUARIO:CLAVE@127.0.0.1:27017/?authSource=agrosmart` y codifica los caracteres reservados de la contraseña en la URL.
2. Si faltan las colecciones o los datos, sigue [la guía de carga de MongoDB](Docubd2/AgroSmart_MongoDB/AgroSmart_MongoDB/LEEME_MONGO.md). Si tu instalación ya contiene los datos, úsala directamente.
3. Abre **Resumen** y comprueba que MongoDB aparezca como **Conectado**. En **Lecturas de sensores**, filtra por sensor, parcela o fechas. También puedes consultar alertas pendientes, observaciones, reportes de plagas y monitoreo satelital.

## Equipo con Oracle

1. Sigue [la guía de instalación de Oracle](Docubd2/AgroSmart_Oracle/AgroSmart_Oracle/LEEME.md). Ejecuta `00_usuarios.sql` como SYSTEM en la PDB y `01_creacion_tablas.sql`, `02_datos_oracle.sql` y `05_seguridad.sql` como `AGROSMART_OWNER`.
2. Deja `MONGO_URI=` si solo vas a probar Oracle. Ajusta estas variables en tu `.env`.

   ```dotenv
   ORACLE_USER=agrosmart_app
   ORACLE_PASSWORD="tu_clave_local"
   ORACLE_CONNECT_STRING=127.0.0.1:1521/XEPDB1
   ORACLE_SCHEMA=AGROSMART_OWNER
   ```

   Cambia `XEPDB1` por el nombre de servicio de tu PDB si tu instalación usa otro, por ejemplo `FREEPDB1`. El controlador conecta en modo Thin con Oracle Database 12.1 o superior. [Documentación del controlador de Oracle](https://node-oracledb.readthedocs.io/en/latest/user_guide/installation.html#supported-oracle-database-versions).
3. Abre **Resumen** y comprueba que Oracle aparezca como **Conectado**. En **Campañas**, podrás ver datos de las parcelas y cultivos asociados. En **Costos por campaña**, se consultan los totales de la vista `v_costo_campania`.

## Registrar, editar y eliminar

En cada tabla de Oracle o colección de MongoDB, **Registrar** abre un formulario. En la columna **Acciones**, **Editar** carga los datos completos y **Eliminar** solicita confirmación. **Costos por campaña** muestra los totales calculados al ingresar aplicaciones de insumos y costos de producción.

- **MongoDB con Oracle configurado.** El backend verifica las referencias en Oracle al registrar o editar documentos. Si Oracle está configurado y la consulta falla, se detiene el guardado.
- **MongoDB en un equipo sin Oracle.** El backend valida contra el catálogo sintético `referencia_mongo.json` de `Docubd2`. Por ejemplo, el sensor 1 pertenece a la parcela 1 y mide temperatura. Los identificadores nuevos de Oracle requieren la conexión a esa instancia.
- **Oracle en un equipo sin MongoDB.** Puedes probar las altas, ediciones y el borrado de registros que tienen dependencias solo en Oracle, como un insumo de prueba. Para eliminar una parcela, un sensor, una campaña o un trabajador, configura también el MongoDB correspondiente. AgroSmart verifica que no existan documentos asociados antes de confirmar el borrado.
- **Oracle con el usuario lector.** Usa `agrosmart_lector` para consultas y `agrosmart_app` para probar los cambios. Los permisos de los scripts de seguridad se aplican en el servidor de base de datos.

Las reglas de campaña y las referencias entre motores se verifican en el backend local. Usa la misma instancia de AgroSmart para los cambios que afecten a ambas bases. Los cambios directos desde SQL Developer o Compass pueden omitir las verificaciones de la aplicación.

## Consultas y compilación

Con los dos motores configurados, **Historial por parcela** permite consultar sus registros usando el mismo `id_parcela`.

- `GET /api/health` comprueba cada motor de forma independiente.
- `GET /api/mongo/lecturas_sensores?parcela=1&sensor=1&desde=2026-11-01&hasta=2026-11-30` devuelve lecturas con fechas inclusivas en hora de Lima.
- `GET /api/oracle/campania?parcela=1` devuelve campañas de la parcela.
- `POST /api/{motor}/{recurso}` registra datos. `GET`, `PUT` y `DELETE /api/{motor}/{recurso}/{id}` consultan, editan y eliminan un registro.
- `npm run lint` ejecuta la revisión de tipos.
- `npm run build` genera el frontend. Después, `npm start` sirve la compilación y la API en el mismo puerto.
