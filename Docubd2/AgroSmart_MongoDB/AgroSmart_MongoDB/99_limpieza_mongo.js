// AgroSmart - 99_limpieza_mongo.js
// Elimina la base "agrosmart" completa para repetir la instalacion (borra TODOS los datos).
// Con la autenticacion activa, ejecutalo como agrosmart_admin.
db.getSiblingDB("agrosmart").dropDatabase();
print("Base agrosmart eliminada. Ejecuta de nuevo 01_crear_colecciones.js y 02_datos_mongo.js");
