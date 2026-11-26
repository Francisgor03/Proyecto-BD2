// =====================================================================
// AgroSmart - 05_seguridad_mongo.js
// Crea los usuarios y explica como activar la autenticacion. CAMBIA las contrasenas antes de ejecutar.
// (Usa contrasenas sin caracteres especiales para que funcionen en las cadenas de conexion.)
//
// PASO 1 - Con MongoDB SIN autenticacion todavia (instalacion por defecto), ejecuta este archivo:
//   mongosh "mongodb://localhost:27017" -f 05_seguridad_mongo.js
// =====================================================================
var admin = db.getSiblingDB("admin");
admin.createUser({ user: "agrosmart_admin", pwd: "AdminAgs2026x",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" }] });

var bd = db.getSiblingDB("agrosmart");
bd.createUser({ user: "agrosmart_app", pwd: "AppAgs2026x", roles: [{ role: "readWrite", db: "agrosmart" }] });
bd.createUser({ user: "agrosmart_lector", pwd: "LectorAgs2026x", roles: [{ role: "read", db: "agrosmart" }] });
printjson(bd.getUsers().users.map(function (u) { return { usuario: u.user, roles: u.roles }; }));

// =====================================================================
// PASO 2 - Activar la autenticacion (Windows):
//   a) Abre como administrador el archivo de configuracion de MongoDB, normalmente:
//        C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg
//   b) Agrega (o descomenta) estas lineas, con la sangria exacta:
//        security:
//          authorization: enabled
//   c) Reinicia el servicio (CMD como administrador):  net stop MongoDB   y luego   net start MongoDB
//
// PASO 3 - Verificar (captura las pantallas como evidencia):
//   - Sin credenciales, esto debe FALLAR (Command find requires authentication):
//       mongosh "mongodb://localhost:27017/agrosmart" --eval "db.lecturas_sensores.find().limit(1)"
//       mongosh "mongodb://localhost:27017/agrosmart" --eval "db.lecturas_sensores.countDocuments({})"
//   - Como lector (agrosmart_lector): la lectura funciona, la escritura FALLA (not authorized):
//       mongosh "mongodb://agrosmart_lector:LectorAgs2026x@localhost:27017/agrosmart?authSource=agrosmart"
//         db.lecturas_sensores.countDocuments({})                         -> funciona
//         db.lecturas_sensores.deleteOne({ id_sensor: 1 })                -> not authorized
//   - Como aplicacion (agrosmart_app): lectura y escritura funcionan (ejecuta 04_crud_mongo.js).
//   - Estado de la conexion y privilegios:
//         db.runCommand({ connectionStatus: 1, showPrivileges: true })
//
// En Compass: cadena de conexion
//   mongodb://agrosmart_app:AppAgs2026x@localhost:27017/agrosmart?authSource=agrosmart
// Para la aplicacion Python: guarda la cadena en una variable de entorno (MONGO_URI), no en el codigo.
// =====================================================================
