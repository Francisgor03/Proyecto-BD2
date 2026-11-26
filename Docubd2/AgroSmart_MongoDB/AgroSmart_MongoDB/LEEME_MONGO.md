# AgroSmart – Parte MongoDB: guía de instalación

> **Estado:** los scripts están escritos pero **no se han ejecutado contra un MongoDB real** (no tuve acceso a uno). Lo que sí verifiqué: la sintaxis de todos los `.js` (con Node) y que los 463 documentos cumplen exactamente los mismos `$jsonSchema` que se envían a MongoDB (con un validador en Python), además de su coherencia con los ids de Oracle. Si algún script da error, copia el mensaje exacto y se corrige.
> Todos los datos son **sintéticos** y llevan `origen: "sintetico"`.

## Requisitos
- MongoDB Community (6.0 o superior), `mongosh` y MongoDB Compass. Conexión local: `mongodb://localhost:27017`.

## Archivos y orden de ejecución

| Orden | Archivo | Qué hace |
| --- | --- | --- |
| 1 | `01_crear_colecciones.js` | Crea la base `agrosmart`, las 5 colecciones con validación `$jsonSchema` y los 9 índices |
| 2 | `02_datos_mongo.js` | Inserta los documentos sintéticos (≥ 30 por colección) |
| 3 | `03_consultas_mongo.js` | `find`, filtros, 9 consultas con aggregation pipeline y `explain` |
| 4 | `05_seguridad_mongo.js` | Crea los usuarios y explica cómo activar la autenticación |
| 5 | `04_crud_mongo.js` | `insertOne`, `insertMany`, `updateOne`, `updateMany`, `deleteOne`, `deleteMany` y pruebas de validación |
| – | `99_limpieza_mongo.js` | Borra la base para repetir la instalación |

Otros: `generar_datos_mongo.py` (regenera todo; semilla fija), `datos_mongo/*.json` (los mismos datos para importar desde Compass) y `referencia_mongo.json` (ids válidos de Oracle).

Documentos generados: `lecturas_sensores` 228 · `observaciones_agricolas` 60 · `reportes_plagas` 45 · `alertas_sensores` 54 · `monitoreos_satelitales` 76.

## Pasos
1. **Crear colecciones y cargar datos** (en una terminal, dentro de esta carpeta):
   ```
   mongosh "mongodb://localhost:27017" -f 01_crear_colecciones.js
   mongosh "mongodb://localhost:27017" -f 02_datos_mongo.js
   ```
   *Alternativa con Compass:* ejecuta solo el `01`, y luego en cada colección usa **ADD DATA → Import JSON file** con el archivo de `datos_mongo/`. También puedes pegar los bloques en la pestaña **MONGOSH** de Compass.
2. **Verificar:** ejecuta `03_consultas_mongo.js`; la consulta 1 debe mostrar 228, 60, 45, 54 y 76 documentos, y la 13 debe mostrar `IXSCAN` (usa el índice).
3. **Seguridad:** ejecuta `05_seguridad_mongo.js` (cambia antes las contraseñas), activa la autenticación siguiendo los pasos que están en ese archivo y haz las pruebas con capturas.
4. **CRUD:** con la autenticación activa, ejecuta `04_crud_mongo.js` como `agrosmart_app` y captura cada operación.

## Detalles de diseño
- Los ids (`id_parcela`, `id_campania`, `id_sensor`, `id_trabajador`) son números que existen en Oracle. **MongoDB no verifica esa relación**: la valida la aplicación Python.
- Los ids y valores numéricos se validan con `bsonType: "number"`, porque mongosh guarda `101` como `double` y `"int"` lo rechazaría.
- `fecha_atencion` es obligatoria cuando `atendida` es `true` (se resuelve con `anyOf` en el esquema).
- Coherencia entre datos: las lecturas y alertas usan la parcela de su sensor y fechas posteriores a su instalación; las observaciones, plagas y monitoreos solo usan campañas ya iniciadas, dentro de sus fechas, y los trabajadores asignados a esa campaña. Cada lectura en estado `alerta` tiene su alerta.
- Los umbrales de alerta (humedad < 25 % o > 55 %, temperatura > 30 °C o < 12 °C) son **valores de ejemplo**, no recomendaciones agronómicas. Los índices NDVI/EVI/SAVI son valores de muestra.
- La unidad de temperatura es `°C`. Si tu terminal de Windows muestra el símbolo raro, el dato se guarda bien (los archivos son UTF-8); no cambies la unidad en los datos.

## Errores frecuentes
- `Document failed validation`: el documento no cumple el esquema; revisa el campo indicado. (En las pruebas del final de `04_crud_mongo.js` es el resultado esperado.)
- `MongoServerError: ... requires authentication`: la autenticación está activa; conéctate con usuario y contraseña (`authSource=agrosmart`).
- Si el servicio no reinicia tras editar `mongod.cfg`, revisa la sangria de las líneas `security:` y `authorization: enabled` (YAML).
- Contraseñas con `#`, `@` o `/` deben codificarse en la cadena de conexión; por eso las de ejemplo no las llevan.
