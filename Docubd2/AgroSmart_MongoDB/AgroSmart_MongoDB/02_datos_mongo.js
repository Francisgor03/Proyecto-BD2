// AgroSmart - 02_datos_mongo.js  (DATOS SINTETICOS, semilla 2026)
// Ejecutar despues de 01_crear_colecciones.js:
//   mongosh "mongodb://localhost:27017" -f 02_datos_mongo.js
// Alternativa: importar datos_mongo/*.json desde Compass (ADD DATA > Import JSON file).
// Si ya cargaste los datos y quieres repetir, ejecuta antes 99_limpieza_mongo.js y 01.

var bd = db.getSiblingDB("agrosmart");

// lecturas_sensores (228 documentos)
print("lecturas_sensores: " + Object.keys(bd.lecturas_sensores.insertMany([
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-10T23:47:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.2,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-11T09:23:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-13T22:04:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 31.0,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 97,
    "origen": "sintetico"
  },
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-16T06:06:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-20T16:44:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 28.2,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 44,
    "origen": "sintetico"
  },
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-20T22:09:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 72,
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-09T02:24:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 99,
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-11T22:04:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 35.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-15T11:32:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 35.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-16T00:00:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 28.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-17T10:52:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 23.0,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha_registro": ISODate("2026-11-19T14:28:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 31.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 48,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-11T11:04:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 86,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-11T22:57:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 23.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 99,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-14T01:21:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 20.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 69,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-18T22:08:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 35.4,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-19T21:49:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 94,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha_registro": ISODate("2026-11-20T04:51:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 20.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-09T07:35:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 15.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 58,
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-15T12:58:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 13.2,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-16T04:27:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 47,
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-19T00:57:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 17.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-19T14:36:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 33.5,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha_registro": ISODate("2026-11-22T00:57:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 40,
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-08T14:59:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 47.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-12T06:09:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 34.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 51,
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-15T00:26:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 48.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 55,
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-16T02:35:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-17T04:06:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 42.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 5,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-21T18:19:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 36,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-09T17:55:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 50.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 50,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-10T06:46:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 45.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 56,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-11T01:49:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 48.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 64,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-16T22:09:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 49.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 86,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-17T01:52:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 51.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 41,
    "origen": "sintetico"
  },
  {
    "id_sensor": 6,
    "id_parcela": 6,
    "fecha_registro": ISODate("2026-11-17T22:48:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 46.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-08T23:55:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 89,
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-11T15:13:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-13T01:49:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 88,
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-13T19:24:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 23.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 96,
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-20T05:51:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 47,
    "origen": "sintetico"
  },
  {
    "id_sensor": 7,
    "id_parcela": 7,
    "fecha_registro": ISODate("2026-11-21T08:42:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 23.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 46,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-09T03:50:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 70,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-12T22:17:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 29.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 62,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-16T12:29:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 68,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-18T09:40:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 11.5,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 80,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-19T12:32:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 27.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha_registro": ISODate("2026-11-21T17:31:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 27.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 68,
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-08T20:04:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 23.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-10T00:37:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 49.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-14T17:12:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 50.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 89,
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-14T17:44:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 46.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-18T11:47:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 41.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha_registro": ISODate("2026-11-18T13:28:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-09T01:47:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 31.2,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 27.2,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-09T21:34:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.0,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 27.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 50,
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-15T07:56:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 32.3,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 29.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 38,
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-16T12:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 28.1,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 29.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-17T03:34:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.9,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 9.0,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 67,
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha_registro": ISODate("2026-11-19T02:25:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 30.5,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 28.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-09T10:08:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 64.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 42,
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-10T16:06:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 41.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-11T20:46:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 51.8,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-12T20:27:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 37.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 70,
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-20T23:27:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 40.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 95,
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha_registro": ISODate("2026-11-21T22:08:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 44.8,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 74,
    "origen": "sintetico"
  },
  {
    "id_sensor": 12,
    "id_parcela": 12,
    "fecha_registro": ISODate("2026-10-05T08:12:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 12,
    "id_parcela": 12,
    "fecha_registro": ISODate("2026-10-06T01:27:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 24.6,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 45,
    "origen": "sintetico"
  },
  {
    "id_sensor": 12,
    "id_parcela": 12,
    "fecha_registro": ISODate("2026-10-11T11:09:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 32.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 62,
    "origen": "sintetico"
  },
  {
    "id_sensor": 13,
    "id_parcela": 13,
    "fecha_registro": ISODate("2026-10-10T17:42:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 51.4,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 7.8,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 40,
    "origen": "sintetico"
  },
  {
    "id_sensor": 13,
    "id_parcela": 13,
    "fecha_registro": ISODate("2026-10-11T01:05:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 50.2,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 13,
    "id_parcela": 13,
    "fecha_registro": ISODate("2026-10-14T13:58:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 51.2,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 89,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-09T05:11:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 35.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 35,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-12T15:32:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.8,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 66,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-12T20:38:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 62.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-16T03:18:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 30.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-21T00:42:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 21.6,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 93,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-21T13:02:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 34.8,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-12T14:03:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-13T23:40:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-14T22:33:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 79,
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-16T01:46:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 20.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 62,
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-16T09:19:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 15,
    "id_parcela": 15,
    "fecha_registro": ISODate("2026-11-19T00:00:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-12T00:40:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 35.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 50,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-14T21:34:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 37.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 77,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-14T23:13:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 44.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 98,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-16T06:26:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 45.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 61,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-19T06:54:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 32.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 42,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha_registro": ISODate("2026-11-21T17:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 13.5,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 88,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-08T18:50:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 61,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-09T09:50:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 59,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-13T20:05:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 47,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-16T17:20:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 28.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 56,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-20T01:15:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 30.1,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 88,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha_registro": ISODate("2026-11-20T05:19:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 32.8,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 100,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-16T05:08:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 23.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 97,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-16T18:48:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 29.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 86,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-16T20:08:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 38.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 87,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-16T22:22:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 34.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 73,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-19T22:14:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 23.5,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 100,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-20T03:26:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 24.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 44,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-11T01:57:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 16.0,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-12T17:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 22.0,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 85,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-14T17:59:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 36.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 54,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-17T19:00:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 44.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 42,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-21T03:14:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 41.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-21T07:34:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 43.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 80,
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-09T19:14:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 43.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-11T14:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 43.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-12T14:02:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 15.7,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-13T00:08:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 37.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-13T00:41:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 39.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha_registro": ISODate("2026-11-19T14:23:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 38.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-10T16:27:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 29.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 89,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-12T15:25:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 28.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 74,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-13T08:10:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 96,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-14T08:27:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 33.1,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 45,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-18T18:19:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 31.5,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 61,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha_registro": ISODate("2026-11-19T00:19:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 35.1,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha_registro": ISODate("2026-10-08T11:15:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.7,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha_registro": ISODate("2026-10-10T08:45:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 19.3,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.5,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 76,
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha_registro": ISODate("2026-10-11T04:01:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 23.2,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.2,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-09T09:41:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 47.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 93,
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-09T12:23:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 10.4,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 56,
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-10T04:55:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 40.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-10T10:55:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 68.7,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-15T16:52:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 47.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha_registro": ISODate("2026-11-21T07:22:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 42.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-09T12:02:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 15.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 37,
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-12T23:21:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 15.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 52,
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-14T13:10:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 17.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-18T16:00:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 15.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 80,
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-19T03:27:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 50,
    "origen": "sintetico"
  },
  {
    "id_sensor": 24,
    "id_parcela": 24,
    "fecha_registro": ISODate("2026-11-20T08:50:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 13.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 93,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-08T15:21:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.9,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 17.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 39,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-11T01:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 32.8,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-11T04:41:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 21.8,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.8,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 100,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-18T05:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 32.2,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 32.0,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 40,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-18T08:09:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 29.1,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 65,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha_registro": ISODate("2026-11-18T14:17:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.4,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 66,
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-08T20:48:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 60,
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-09T06:19:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 56,
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-10T16:03:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 44,
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-17T20:45:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-18T12:53:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 26,
    "id_parcela": 26,
    "fecha_registro": ISODate("2026-11-21T23:49:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 20.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 98,
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-08T12:52:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 46.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 100,
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-10T16:11:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 47.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 67,
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-11T07:12:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 44.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 66,
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-11T20:47:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 51.5,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-17T17:05:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 42.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 27,
    "id_parcela": 27,
    "fecha_registro": ISODate("2026-11-21T20:27:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 46.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 93,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-10T20:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 87,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-12T08:42:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 27.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-14T09:21:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 91,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-19T22:38:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 24.6,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 43,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-20T02:31:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 91,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha_registro": ISODate("2026-11-20T16:47:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 25.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-10T23:13:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 11.7,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 86,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-12T13:57:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 14.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 77,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-15T16:41:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 20.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 73,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-16T02:25:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 92,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-18T11:05:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 14.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 39,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha_registro": ISODate("2026-11-19T21:30:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-09T22:28:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 87,
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-11T12:50:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 27.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-15T22:54:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 30.2,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 99,
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-17T14:32:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 26.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 81,
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-19T07:07:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 26.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha_registro": ISODate("2026-11-20T13:27:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-09T04:58:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 35.8,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 59,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-11T02:19:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 33.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 85,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-12T17:50:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 18.9,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-13T17:25:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 14.8,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 87,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-14T05:33:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 47.2,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 97,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha_registro": ISODate("2026-11-20T09:45:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 16.2,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 32,
    "id_parcela": 32,
    "fecha_registro": ISODate("2026-10-04T16:16:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 28.7,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 32,
    "id_parcela": 32,
    "fecha_registro": ISODate("2026-10-11T18:45:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 24.3,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 32,
    "id_parcela": 32,
    "fecha_registro": ISODate("2026-10-14T20:50:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 26.6,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 43,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-08T18:23:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 26.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 81,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-11T03:28:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 30.8,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 45,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-11T22:30:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 24.2,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 58,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-12T14:22:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 30.8,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 67,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-16T23:56:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 25.9,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha_registro": ISODate("2026-11-18T19:21:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.3,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 80,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-11T04:16:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 17.6,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.4,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 78,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-14T11:46:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 21.5,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.2,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 76,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-14T22:39:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 24.4,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.1,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 81,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-15T23:59:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 31.8,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 77,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-16T01:20:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 19.6,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.6,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 61,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha_registro": ISODate("2026-11-21T01:17:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 27.5,
        "unidad": "%"
      },
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 48,
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-09T19:40:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 11.5,
        "unidad": "°C"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-11T02:58:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-11T13:56:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 82,
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-15T12:24:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 14.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-21T00:41:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 13.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 56,
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha_registro": ISODate("2026-11-21T12:34:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-10T03:54:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 12.7,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-18T12:20:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 38.0,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 72,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-19T04:57:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 40.3,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 85,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-19T12:07:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 38.4,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-20T02:26:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 12.7,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 73,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha_registro": ISODate("2026-11-22T10:27:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 19.7,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 79,
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-11T20:12:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-12T03:11:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 52,
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-12T15:30:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 79,
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-13T05:07:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 19.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 70,
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-14T14:49:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 15.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 93,
    "origen": "sintetico"
  },
  {
    "id_sensor": 37,
    "id_parcela": 18,
    "fecha_registro": ISODate("2026-11-21T21:44:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-11T00:12:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.1,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-11T11:58:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 26.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 90,
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-13T13:04:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 38,
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-14T18:32:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 75,
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-15T22:48:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.6,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 77,
    "origen": "sintetico"
  },
  {
    "id_sensor": 38,
    "id_parcela": 14,
    "fecha_registro": ISODate("2026-11-18T13:23:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 21.7,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 40,
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-10T00:17:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 79,
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-17T04:29:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.8,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 45,
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-18T21:52:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 17.0,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 41,
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-20T08:37:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 16.5,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "bateria_pct": 53,
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-20T10:47:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 22.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 39,
    "id_parcela": 1,
    "fecha_registro": ISODate("2026-11-22T11:25:00Z"),
    "mediciones": [
      {
        "tipo": "temperatura_ambiente",
        "valor": 18.4,
        "unidad": "°C"
      }
    ],
    "estado": "normal",
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-11T08:38:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 62.6,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 51,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-13T12:56:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 29.9,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 74,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-13T23:23:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 30.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 60,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-14T09:31:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 15.2,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "bateria_pct": 97,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-14T21:54:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 29.1,
        "unidad": "%"
      }
    ],
    "estado": "normal",
    "bateria_pct": 46,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha_registro": ISODate("2026-11-18T18:13:00Z"),
    "mediciones": [
      {
        "tipo": "humedad_suelo",
        "valor": 21.1,
        "unidad": "%"
      }
    ],
    "estado": "alerta",
    "origen": "sintetico"
  }
]).insertedIds).length + " documentos insertados");

// observaciones_agricolas (60 documentos)
print("observaciones_agricolas: " + Object.keys(bd.observaciones_agricolas.insertMany([
  {
    "id_parcela": 17,
    "id_campania": 17,
    "id_trabajador": 39,
    "fecha": ISODate("2026-11-12T10:30:00Z"),
    "descripcion": "Floracion uniforme en la mayor parte de la parcela.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_001_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_001_2.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "id_trabajador": 23,
    "fecha": ISODate("2026-07-23T17:00:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_002_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_002_2.jpg"
      }
    ],
    "etiquetas": [
      "seguimiento",
      "cosecha",
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "id_trabajador": 26,
    "fecha": ISODate("2026-09-30T08:10:00Z"),
    "descripcion": "Hojas con coloracion amarillenta en los bordes de la parcela.",
    "etiquetas": [
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "id_trabajador": 26,
    "fecha": ISODate("2026-11-09T12:20:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_004_1.jpg"
      }
    ],
    "etiquetas": [
      "suelo"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 36,
    "id_trabajador": 15,
    "fecha": ISODate("2026-02-19T14:10:00Z"),
    "descripcion": "Buen desarrollo de las plantas en el sector norte.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_005_1.jpg"
      }
    ],
    "etiquetas": [
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2025-12-23T15:00:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "id_trabajador": 12,
    "fecha": ISODate("2025-06-01T12:15:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_007_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_007_2.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "id_trabajador": 6,
    "fecha": ISODate("2026-05-29T10:15:00Z"),
    "descripcion": "Se detecta acumulacion de agua en la parte baja del terreno.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_008_1.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "id_trabajador": 34,
    "fecha": ISODate("2025-11-16T15:50:00Z"),
    "descripcion": "Cobertura vegetal pareja tras la ultima fertilizacion.",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2026-01-10T08:30:00Z"),
    "descripcion": "Se detecta acumulacion de agua en la parte baja del terreno.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_010_1.jpg"
      }
    ],
    "etiquetas": [
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "id_trabajador": 27,
    "fecha": ISODate("2025-10-05T07:00:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_011_1.jpg"
      }
    ],
    "etiquetas": [
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 14,
    "id_campania": 14,
    "id_trabajador": 40,
    "fecha": ISODate("2025-08-03T08:45:00Z"),
    "descripcion": "Hojas con coloracion amarillenta en los bordes de la parcela.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_012_1.pdf"
      }
    ],
    "etiquetas": [
      "fertilizacion",
      "crecimiento",
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "id_trabajador": 29,
    "fecha": ISODate("2025-07-30T14:00:00Z"),
    "descripcion": "Se marcaron plantas con sintomas para seguimiento.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_013_1.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "id_trabajador": 6,
    "fecha": ISODate("2026-09-14T07:40:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_014_1.jpg"
      }
    ],
    "etiquetas": [
      "seguimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 5,
    "id_trabajador": 39,
    "fecha": ISODate("2025-07-09T10:50:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_015_1.pdf"
      }
    ],
    "etiquetas": [
      "seguimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 32,
    "id_campania": 32,
    "id_trabajador": 22,
    "fecha": ISODate("2025-09-16T12:10:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "id_trabajador": 34,
    "fecha": ISODate("2026-02-04T17:45:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_017_1.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento",
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2026-02-18T12:10:00Z"),
    "descripcion": "Floracion uniforme en la mayor parte de la parcela.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_018_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_018_2.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "id_trabajador": 26,
    "fecha": ISODate("2026-11-10T14:20:00Z"),
    "descripcion": "Se observa suelo compactado en la zona de transito de maquinaria.",
    "etiquetas": [
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "id_trabajador": 34,
    "fecha": ISODate("2025-08-10T11:20:00Z"),
    "descripcion": "Plantas con menor altura cerca del canal de riego.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_020_1.jpg"
      }
    ],
    "etiquetas": [
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 1,
    "id_trabajador": 29,
    "fecha": ISODate("2025-05-16T09:30:00Z"),
    "descripcion": "Revision de mangueras de riego: dos puntos con fuga menor.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_021_1.jpg"
      }
    ],
    "etiquetas": [
      "riego",
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "id_trabajador": 31,
    "fecha": ISODate("2026-07-01T07:40:00Z"),
    "descripcion": "Plantas con menor altura cerca del canal de riego.",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "id_trabajador": 12,
    "fecha": ISODate("2026-08-21T15:50:00Z"),
    "descripcion": "Buen desarrollo de las plantas en el sector norte.",
    "etiquetas": [
      "seguimiento",
      "crecimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 7,
    "id_campania": 7,
    "id_trabajador": 26,
    "fecha": ISODate("2026-09-07T10:15:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_024_1.jpg"
      }
    ],
    "etiquetas": [
      "cosecha",
      "fertilizacion",
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 36,
    "id_trabajador": 15,
    "fecha": ISODate("2026-06-26T09:50:00Z"),
    "descripcion": "Cobertura vegetal pareja tras la ultima fertilizacion.",
    "etiquetas": [
      "supervision"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2026-01-18T09:10:00Z"),
    "descripcion": "Se observa suelo compactado en la zona de transito de maquinaria.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_026_1.jpg"
      }
    ],
    "etiquetas": [
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "id_trabajador": 29,
    "fecha": ISODate("2025-07-17T15:45:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_027_1.jpg"
      }
    ],
    "etiquetas": [
      "suelo",
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "id_trabajador": 1,
    "fecha": ISODate("2026-09-05T07:10:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_028_1.jpg"
      }
    ],
    "etiquetas": [
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 14,
    "id_campania": 14,
    "id_trabajador": 8,
    "fecha": ISODate("2025-08-14T08:50:00Z"),
    "descripcion": "Revision de mangueras de riego: dos puntos con fuga menor.",
    "etiquetas": [
      "fertilizacion",
      "seguimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "id_trabajador": 5,
    "fecha": ISODate("2026-02-01T13:40:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_030_1.pdf"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_030_2.jpg"
      }
    ],
    "etiquetas": [
      "fertilizacion",
      "supervision"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "id_trabajador": 8,
    "fecha": ISODate("2026-08-22T07:20:00Z"),
    "descripcion": "Humedad adecuada despues del riego de la manana.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_031_1.jpg"
      }
    ],
    "etiquetas": [
      "riego",
      "crecimiento"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "id_trabajador": 5,
    "fecha": ISODate("2026-02-13T08:30:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_032_1.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "id_trabajador": 26,
    "fecha": ISODate("2026-10-07T08:00:00Z"),
    "descripcion": "Se marcaron plantas con sintomas para seguimiento.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_033_1.pdf"
      }
    ],
    "etiquetas": [
      "supervision",
      "fertilizacion",
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "id_trabajador": 29,
    "fecha": ISODate("2025-08-19T08:15:00Z"),
    "descripcion": "Humedad adecuada despues del riego de la manana.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_034_1.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "id_trabajador": 8,
    "fecha": ISODate("2026-09-08T14:50:00Z"),
    "descripcion": "Plantas con menor altura cerca del canal de riego.",
    "etiquetas": [
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "id_trabajador": 34,
    "fecha": ISODate("2025-12-11T09:30:00Z"),
    "descripcion": "Se observa suelo compactado en la zona de transito de maquinaria.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_036_1.jpg"
      }
    ],
    "etiquetas": [
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "id_trabajador": 30,
    "fecha": ISODate("2026-10-21T08:15:00Z"),
    "descripcion": "Buen desarrollo de las plantas en el sector norte.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_037_1.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento",
      "suelo"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "id_trabajador": 31,
    "fecha": ISODate("2026-06-21T10:20:00Z"),
    "descripcion": "Cobertura vegetal pareja tras la ultima fertilizacion.",
    "etiquetas": [
      "crecimiento",
      "suelo"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2026-03-25T14:00:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_039_1.jpg"
      }
    ],
    "etiquetas": [
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "id_trabajador": 27,
    "fecha": ISODate("2025-11-03T17:15:00Z"),
    "descripcion": "Se observa suelo compactado en la zona de transito de maquinaria.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_040_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_040_2.jpg"
      }
    ],
    "etiquetas": [
      "cosecha",
      "suelo",
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "id_trabajador": 9,
    "fecha": ISODate("2026-08-02T16:30:00Z"),
    "descripcion": "Se detecta acumulacion de agua en la parte baja del terreno.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_041_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_041_2.jpg"
      }
    ],
    "etiquetas": [
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "id_trabajador": 8,
    "fecha": ISODate("2026-11-07T07:50:00Z"),
    "descripcion": "Plantas con menor altura cerca del canal de riego.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_042_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_042_2.jpg"
      }
    ],
    "etiquetas": [
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "id_trabajador": 14,
    "fecha": ISODate("2025-11-01T07:20:00Z"),
    "descripcion": "Humedad adecuada despues del riego de la manana.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_043_1.jpg"
      }
    ],
    "etiquetas": [
      "cosecha",
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 18,
    "id_campania": 18,
    "id_trabajador": 19,
    "fecha": ISODate("2026-10-10T08:10:00Z"),
    "descripcion": "Se observa crecimiento irregular en una zona del cultivo.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_044_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_044_2.jpg"
      }
    ],
    "etiquetas": [
      "riego",
      "seguimiento",
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 1,
    "id_trabajador": 29,
    "fecha": ISODate("2025-06-27T14:00:00Z"),
    "descripcion": "Revision de mangueras de riego: dos puntos con fuga menor.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_045_1.pdf"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_045_2.jpg"
      }
    ],
    "etiquetas": [
      "suelo",
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "id_trabajador": 34,
    "fecha": ISODate("2026-06-11T09:00:00Z"),
    "descripcion": "Cobertura vegetal pareja tras la ultima fertilizacion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_046_1.jpg"
      }
    ],
    "etiquetas": [
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "id_trabajador": 6,
    "fecha": ISODate("2026-07-24T13:45:00Z"),
    "descripcion": "Se detecta acumulacion de agua en la parte baja del terreno.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_047_1.jpg"
      }
    ],
    "etiquetas": [
      "maquinaria",
      "seguimiento",
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "id_trabajador": 34,
    "fecha": ISODate("2025-05-27T11:10:00Z"),
    "descripcion": "Inicio de cosecha en la zona mas avanzada del cultivo.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_048_1.pdf"
      }
    ],
    "etiquetas": [
      "suelo",
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha": ISODate("2026-04-13T09:40:00Z"),
    "descripcion": "Hojas con coloracion amarillenta en los bordes de la parcela.",
    "etiquetas": [
      "riego"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 5,
    "id_trabajador": 39,
    "fecha": ISODate("2025-06-23T13:45:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "documento",
        "archivo": "obs_050_1.pdf"
      }
    ],
    "etiquetas": [
      "fertilizacion"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "id_trabajador": 14,
    "fecha": ISODate("2025-11-05T08:15:00Z"),
    "descripcion": "Cobertura vegetal pareja tras la ultima fertilizacion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_051_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_051_2.jpg"
      }
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "id_trabajador": 29,
    "fecha": ISODate("2025-08-13T16:40:00Z"),
    "descripcion": "Presencia de aves en el sector sur; se revisara la proteccion.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_052_1.jpg"
      }
    ],
    "etiquetas": [
      "cosecha",
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "id_trabajador": 34,
    "fecha": ISODate("2026-06-24T15:20:00Z"),
    "descripcion": "Hojas con coloracion amarillenta en los bordes de la parcela.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_053_1.jpg"
      },
      {
        "tipo": "imagen",
        "archivo": "obs_053_2.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento",
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 19,
    "id_campania": 19,
    "id_trabajador": 24,
    "fecha": ISODate("2026-10-19T07:10:00Z"),
    "descripcion": "Buen desarrollo de las plantas en el sector norte.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_054_1.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento",
      "cosecha"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "id_trabajador": 5,
    "fecha": ISODate("2026-03-27T12:00:00Z"),
    "descripcion": "Floracion uniforme en la mayor parte de la parcela.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_055_1.jpg"
      }
    ],
    "etiquetas": [
      "seguimiento",
      "supervision"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 1,
    "id_trabajador": 29,
    "fecha": ISODate("2025-03-24T10:20:00Z"),
    "descripcion": "Se marcaron plantas con sintomas para seguimiento.",
    "evidencias": [
      {
        "tipo": "imagen",
        "archivo": "obs_056_1.jpg"
      }
    ],
    "etiquetas": [
      "crecimiento",
      "fertilizacion",
      "maquinaria"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "id_trabajador": 27,
    "fecha": ISODate("2025-12-07T08:40:00Z"),
    "descripcion": "Hojas con coloracion amarillenta en los bordes de la parcela.",
    "etiquetas": [
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "id_trabajador": 9,
    "fecha": ISODate("2026-07-29T11:45:00Z"),
    "descripcion": "Se recomienda reforzar el control de malezas en el sector este.",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "id_trabajador": 34,
    "fecha": ISODate("2026-04-29T17:20:00Z"),
    "descripcion": "Se marcaron plantas con sintomas para seguimiento.",
    "etiquetas": [
      "malezas"
    ],
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "id_trabajador": 9,
    "fecha": ISODate("2026-07-22T17:15:00Z"),
    "descripcion": "Se observa suelo compactado en la zona de transito de maquinaria.",
    "etiquetas": [
      "malezas",
      "fertilizacion",
      "crecimiento"
    ],
    "origen": "sintetico"
  }
]).insertedIds).length + " documentos insertados");

// reportes_plagas (45 documentos)
print("reportes_plagas: " + Object.keys(bd.reportes_plagas.insertMany([
  {
    "id_parcela": 23,
    "id_campania": 23,
    "id_trabajador": 34,
    "fecha_reporte": ISODate("2025-10-25T10:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_001_1.jpg",
      "plaga_001_2.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 7,
    "id_campania": 7,
    "id_trabajador": 26,
    "fecha_reporte": ISODate("2026-10-01T15:40:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 5,
    "descripcion": "Plantas con sintomas no identificados; se tomaran muestras.",
    "fotografias": [
      "plaga_002_1.jpg",
      "plaga_002_2.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "id_trabajador": 27,
    "fecha_reporte": ISODate("2025-09-10T13:40:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "alto",
    "descripcion": "Presencia de insectos en algunas plantas.",
    "fotografias": [
      "plaga_003_1.jpg",
      "plaga_003_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 21,
    "id_campania": 21,
    "id_trabajador": 38,
    "fecha_reporte": ISODate("2025-07-25T13:10:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "medio",
    "descripcion": "Dano por causa no determinada en un sector.",
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha_reporte": ISODate("2026-01-11T10:40:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 5,
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_005_1.jpg",
      "plaga_005_2.jpg",
      "plaga_005_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 40,
    "id_trabajador": 39,
    "fecha_reporte": ISODate("2026-05-11T17:30:00Z"),
    "tipo_plaga": "maleza",
    "nivel_afectacion": "bajo",
    "descripcion": "Crecimiento de maleza entre las hileras.",
    "fotografias": [
      "plaga_006_1.jpg",
      "plaga_006_2.jpg"
    ],
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 2,
    "id_trabajador": 33,
    "fecha_reporte": ISODate("2025-07-23T11:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 21,
    "id_campania": 21,
    "id_trabajador": 34,
    "fecha_reporte": ISODate("2025-03-20T15:45:00Z"),
    "tipo_plaga": "roedores",
    "nivel_afectacion": "alto",
    "descripcion": "Dano en plantas por roedores en el borde de la parcela.",
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "id_trabajador": 30,
    "fecha_reporte": ISODate("2026-10-27T13:20:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "bajo",
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "id_trabajador": 5,
    "fecha_reporte": ISODate("2026-08-13T13:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "alto",
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_010_1.jpg",
      "plaga_010_2.jpg",
      "plaga_010_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 5,
    "id_trabajador": 39,
    "fecha_reporte": ISODate("2025-07-04T09:00:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 20,
    "descripcion": "Presencia de insectos en algunas plantas.",
    "fotografias": [
      "plaga_011_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "id_trabajador": 31,
    "fecha_reporte": ISODate("2026-06-29T17:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 25,
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_012_1.jpg",
      "plaga_012_2.jpg",
      "plaga_012_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "id_trabajador": 35,
    "fecha_reporte": ISODate("2026-08-08T16:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "alto",
    "area_afectada_pct": 51,
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_013_1.jpg",
      "plaga_013_2.jpg",
      "plaga_013_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "id_trabajador": 5,
    "fecha_reporte": ISODate("2026-04-16T11:20:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 27,
    "descripcion": "Dano por causa no determinada en un sector.",
    "fotografias": [
      "plaga_014_1.jpg",
      "plaga_014_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha_reporte": ISODate("2026-02-07T11:30:00Z"),
    "tipo_plaga": "roedores",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 26,
    "descripcion": "Rastros de roedores cerca del almacen de insumos.",
    "fotografias": [
      "plaga_015_1.jpg",
      "plaga_015_2.jpg",
      "plaga_015_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "id_trabajador": 31,
    "fecha_reporte": ISODate("2025-06-26T10:15:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 14,
    "descripcion": "Presencia de insectos en algunas plantas.",
    "fotografias": [
      "plaga_016_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "id_trabajador": 31,
    "fecha_reporte": ISODate("2026-06-25T07:40:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 20,
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_017_1.jpg",
      "plaga_017_2.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 6,
    "id_campania": 6,
    "id_trabajador": 1,
    "fecha_reporte": ISODate("2025-11-15T08:45:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_018_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 36,
    "id_trabajador": 15,
    "fecha_reporte": ISODate("2026-02-20T12:10:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "bajo",
    "descripcion": "Plantas con sintomas no identificados; se tomaran muestras.",
    "fotografias": [
      "plaga_019_1.jpg",
      "plaga_019_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "id_trabajador": 34,
    "fecha_reporte": ISODate("2026-06-10T14:20:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 19,
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_020_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 6,
    "id_campania": 6,
    "id_trabajador": 1,
    "fecha_reporte": ISODate("2025-12-20T11:40:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "alto",
    "area_afectada_pct": 44,
    "descripcion": "Presencia de insectos en algunas plantas.",
    "fotografias": [
      "plaga_021_1.jpg",
      "plaga_021_2.jpg",
      "plaga_021_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 1,
    "id_trabajador": 29,
    "fecha_reporte": ISODate("2025-04-16T10:00:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 5,
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "id_trabajador": 26,
    "fecha_reporte": ISODate("2026-09-26T12:10:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "medio",
    "descripcion": "Plantas con sintomas no identificados; se tomaran muestras.",
    "fotografias": [
      "plaga_023_1.jpg",
      "plaga_023_2.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 26,
    "id_campania": 26,
    "id_trabajador": 22,
    "fecha_reporte": ISODate("2025-10-02T11:30:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 30,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "id_trabajador": 5,
    "fecha_reporte": ISODate("2026-02-21T07:30:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 7,
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_025_1.jpg",
      "plaga_025_2.jpg",
      "plaga_025_3.jpg"
    ],
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 26,
    "id_campania": 26,
    "id_trabajador": 22,
    "fecha_reporte": ISODate("2025-11-06T10:40:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 12,
    "descripcion": "Plantas con sintomas no identificados; se tomaran muestras.",
    "fotografias": [
      "plaga_026_1.jpg",
      "plaga_026_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha_reporte": ISODate("2026-03-22T16:30:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "id_trabajador": 31,
    "fecha_reporte": ISODate("2025-05-09T08:30:00Z"),
    "tipo_plaga": "roedores",
    "nivel_afectacion": "bajo",
    "descripcion": "Dano en plantas por roedores en el borde de la parcela.",
    "fotografias": [
      "plaga_028_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "id_trabajador": 26,
    "fecha_reporte": ISODate("2026-10-05T15:20:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 20,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "id_trabajador": 14,
    "fecha_reporte": ISODate("2025-10-31T10:20:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "id_trabajador": 35,
    "fecha_reporte": ISODate("2026-05-07T09:50:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 4,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "fotografias": [
      "plaga_031_1.jpg",
      "plaga_031_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "id_trabajador": 34,
    "fecha_reporte": ISODate("2025-11-25T12:10:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "alto",
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_032_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "id_trabajador": 34,
    "fecha_reporte": ISODate("2025-05-28T14:00:00Z"),
    "tipo_plaga": "maleza",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 4,
    "descripcion": "Maleza compite con el cultivo en el sector oeste.",
    "fotografias": [
      "plaga_033_1.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 18,
    "id_campania": 18,
    "id_trabajador": 19,
    "fecha_reporte": ISODate("2026-09-27T12:15:00Z"),
    "tipo_plaga": "roedores",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 9,
    "descripcion": "Dano en plantas por roedores en el borde de la parcela.",
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "id_trabajador": 12,
    "fecha_reporte": ISODate("2026-05-30T17:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 9,
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_035_1.jpg",
      "plaga_035_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 18,
    "id_campania": 18,
    "id_trabajador": 19,
    "fecha_reporte": ISODate("2026-09-29T07:50:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 15,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "fotografias": [
      "plaga_036_1.jpg",
      "plaga_036_2.jpg",
      "plaga_036_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 32,
    "id_campania": 32,
    "id_trabajador": 22,
    "fecha_reporte": ISODate("2025-12-03T11:40:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 9,
    "descripcion": "Presencia de insectos en algunas plantas.",
    "fotografias": [
      "plaga_037_1.jpg",
      "plaga_037_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "id_trabajador": 12,
    "fecha_reporte": ISODate("2025-04-19T08:50:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 2,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "fotografias": [
      "plaga_038_1.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "id_trabajador": 6,
    "fecha_reporte": ISODate("2026-03-18T14:45:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_039_1.jpg",
      "plaga_039_2.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 6,
    "id_campania": 6,
    "id_trabajador": 1,
    "fecha_reporte": ISODate("2026-03-18T12:20:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "medio",
    "descripcion": "Humedad alta favorece aparicion de hongos en el follaje.",
    "fotografias": [
      "plaga_040_1.jpg",
      "plaga_040_2.jpg",
      "plaga_040_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 7,
    "id_campania": 7,
    "id_trabajador": 26,
    "fecha_reporte": ISODate("2026-09-06T08:50:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "bajo",
    "area_afectada_pct": 7,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "fotografias": [
      "plaga_041_1.jpg",
      "plaga_041_2.jpg",
      "plaga_041_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "id_trabajador": 31,
    "fecha_reporte": ISODate("2025-12-10T11:50:00Z"),
    "tipo_plaga": "hongos",
    "nivel_afectacion": "alto",
    "area_afectada_pct": 62,
    "descripcion": "Manchas en hojas asociadas a hongos.",
    "fotografias": [
      "plaga_042_1.jpg",
      "plaga_042_2.jpg",
      "plaga_042_3.jpg"
    ],
    "estado": "resuelto",
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "id_trabajador": 30,
    "fecha_reporte": ISODate("2026-09-24T10:30:00Z"),
    "tipo_plaga": "otros",
    "nivel_afectacion": "bajo",
    "descripcion": "Dano por causa no determinada en un sector.",
    "fotografias": [
      "plaga_043_1.jpg",
      "plaga_043_2.jpg",
      "plaga_043_3.jpg"
    ],
    "estado": "pendiente",
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "id_trabajador": 30,
    "fecha_reporte": ISODate("2026-10-18T14:40:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 19,
    "descripcion": "Dano leve por insectos en hojas jovenes.",
    "fotografias": [
      "plaga_044_1.jpg",
      "plaga_044_2.jpg",
      "plaga_044_3.jpg"
    ],
    "estado": "en_atencion",
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "id_trabajador": 26,
    "fecha_reporte": ISODate("2026-11-21T10:50:00Z"),
    "tipo_plaga": "insectos",
    "nivel_afectacion": "medio",
    "area_afectada_pct": 22,
    "descripcion": "Presencia de insectos en algunas plantas.",
    "estado": "resuelto",
    "origen": "sintetico"
  }
]).insertedIds).length + " documentos insertados");

// alertas_sensores (54 documentos)
print("alertas_sensores: " + Object.keys(bd.alertas_sensores.insertMany([
  {
    "id_sensor": 1,
    "id_parcela": 1,
    "fecha": ISODate("2026-11-13T22:04:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 31.0,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-14T13:04:00Z"),
    "id_trabajador_atencion": 27,
    "origen": "sintetico"
  },
  {
    "id_sensor": 2,
    "id_parcela": 2,
    "fecha": ISODate("2026-11-17T10:52:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 23.0,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 3,
    "id_parcela": 3,
    "fecha": ISODate("2026-11-18T22:08:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 35.4,
    "umbral_configurado": 30,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 4,
    "id_parcela": 4,
    "fecha": ISODate("2026-11-19T14:36:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 33.5,
    "umbral_configurado": 30,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 8,
    "id_parcela": 8,
    "fecha": ISODate("2026-11-18T09:40:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 11.5,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-18T22:40:00Z"),
    "id_trabajador_atencion": 38,
    "origen": "sintetico"
  },
  {
    "id_sensor": 9,
    "id_parcela": 9,
    "fecha": ISODate("2026-11-08T20:04:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 23.8,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-10T03:04:00Z"),
    "id_trabajador_atencion": 37,
    "origen": "sintetico"
  },
  {
    "id_sensor": 10,
    "id_parcela": 10,
    "fecha": ISODate("2026-11-17T03:34:00Z"),
    "tipo_alerta": "temperatura_baja",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 9.0,
    "umbral_configurado": 12,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 11,
    "id_parcela": 11,
    "fecha": ISODate("2026-11-09T10:08:00Z"),
    "tipo_alerta": "humedad_alta",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 64.8,
    "umbral_configurado": 55,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 12,
    "id_parcela": 12,
    "fecha": ISODate("2026-10-06T01:27:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 24.6,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-10-07T13:27:00Z"),
    "id_trabajador_atencion": 18,
    "origen": "sintetico"
  },
  {
    "id_sensor": 12,
    "id_parcela": 12,
    "fecha": ISODate("2026-11-19T02:25:00Z"),
    "tipo_alerta": "sensor_sin_senal",
    "severidad": "media",
    "descripcion": "El sensor dejo de reportar lecturas.",
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-20T16:25:00Z"),
    "id_trabajador_atencion": 5,
    "origen": "sintetico"
  },
  {
    "id_sensor": 13,
    "id_parcela": 13,
    "fecha": ISODate("2026-10-10T17:42:00Z"),
    "tipo_alerta": "temperatura_baja",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 7.8,
    "umbral_configurado": 12,
    "atendida": true,
    "fecha_atencion": ISODate("2026-10-12T13:42:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 13,
    "id_parcela": 13,
    "fecha": ISODate("2026-11-02T14:22:00Z"),
    "tipo_alerta": "sensor_sin_senal",
    "severidad": "media",
    "descripcion": "El sensor dejo de reportar lecturas.",
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha": ISODate("2026-11-12T20:38:00Z"),
    "tipo_alerta": "humedad_alta",
    "severidad": "media",
    "descripcion": "Humedad del suelo por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 62.8,
    "umbral_configurado": 55,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-13T22:38:00Z"),
    "id_trabajador_atencion": 18,
    "origen": "sintetico"
  },
  {
    "id_sensor": 14,
    "id_parcela": 14,
    "fecha": ISODate("2026-11-21T00:42:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 21.6,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 16,
    "id_parcela": 16,
    "fecha": ISODate("2026-11-21T17:33:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 13.5,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha": ISODate("2026-11-20T01:15:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 30.1,
    "umbral_configurado": 30,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 17,
    "id_parcela": 17,
    "fecha": ISODate("2026-11-20T05:19:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 32.8,
    "umbral_configurado": 30,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha": ISODate("2026-11-16T05:08:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 23.8,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-17T13:08:00Z"),
    "id_trabajador_atencion": 20,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha": ISODate("2026-11-19T22:14:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 23.5,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 18,
    "id_parcela": 18,
    "fecha": ISODate("2026-11-20T03:26:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 24.8,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha": ISODate("2026-11-11T01:57:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 16.0,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-11T16:57:00Z"),
    "id_trabajador_atencion": 18,
    "origen": "sintetico"
  },
  {
    "id_sensor": 19,
    "id_parcela": 19,
    "fecha": ISODate("2026-11-12T17:33:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 22.0,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-14T17:33:00Z"),
    "id_trabajador_atencion": 35,
    "origen": "sintetico"
  },
  {
    "id_sensor": 20,
    "id_parcela": 20,
    "fecha": ISODate("2026-11-12T14:02:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 15.7,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-14T00:02:00Z"),
    "id_trabajador_atencion": 5,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha": ISODate("2026-11-14T08:27:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 33.1,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-16T05:27:00Z"),
    "id_trabajador_atencion": 37,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha": ISODate("2026-11-18T18:19:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 31.5,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-19T08:19:00Z"),
    "id_trabajador_atencion": 27,
    "origen": "sintetico"
  },
  {
    "id_sensor": 21,
    "id_parcela": 21,
    "fecha": ISODate("2026-11-19T00:19:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "media",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 35.1,
    "umbral_configurado": 30,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha": ISODate("2026-10-10T08:45:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 19.3,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha": ISODate("2026-10-11T04:01:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 23.2,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 22,
    "id_parcela": 22,
    "fecha": ISODate("2026-10-21T02:32:00Z"),
    "tipo_alerta": "sensor_sin_senal",
    "severidad": "media",
    "descripcion": "El sensor dejo de reportar lecturas.",
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha": ISODate("2026-11-09T12:23:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 10.4,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-10T06:23:00Z"),
    "id_trabajador_atencion": 5,
    "origen": "sintetico"
  },
  {
    "id_sensor": 23,
    "id_parcela": 23,
    "fecha": ISODate("2026-11-10T10:55:00Z"),
    "tipo_alerta": "humedad_alta",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 68.7,
    "umbral_configurado": 55,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-11T18:55:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha": ISODate("2026-11-11T04:41:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 21.8,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-11T08:41:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 25,
    "id_parcela": 25,
    "fecha": ISODate("2026-11-18T05:33:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 32.0,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-18T23:33:00Z"),
    "id_trabajador_atencion": 8,
    "origen": "sintetico"
  },
  {
    "id_sensor": 28,
    "id_parcela": 28,
    "fecha": ISODate("2026-11-19T22:38:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 24.6,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 29,
    "id_parcela": 29,
    "fecha": ISODate("2026-11-10T23:13:00Z"),
    "tipo_alerta": "temperatura_baja",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 11.7,
    "umbral_configurado": 12,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-12T21:13:00Z"),
    "id_trabajador_atencion": 38,
    "origen": "sintetico"
  },
  {
    "id_sensor": 30,
    "id_parcela": 30,
    "fecha": ISODate("2026-11-15T22:54:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 30.2,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-16T22:54:00Z"),
    "id_trabajador_atencion": 27,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha": ISODate("2026-11-12T17:50:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 18.9,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-13T21:50:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha": ISODate("2026-11-13T17:25:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 14.8,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-14T01:25:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 31,
    "id_parcela": 31,
    "fecha": ISODate("2026-11-20T09:45:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 16.2,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 32,
    "id_parcela": 32,
    "fecha": ISODate("2026-10-11T18:45:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 24.3,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 32,
    "id_parcela": 32,
    "fecha": ISODate("2026-10-28T17:57:00Z"),
    "tipo_alerta": "sensor_sin_senal",
    "severidad": "media",
    "descripcion": "El sensor dejo de reportar lecturas.",
    "atendida": true,
    "fecha_atencion": ISODate("2026-10-30T04:57:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha": ISODate("2026-11-11T03:28:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 30.8,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-12T20:28:00Z"),
    "id_trabajador_atencion": 18,
    "origen": "sintetico"
  },
  {
    "id_sensor": 33,
    "id_parcela": 33,
    "fecha": ISODate("2026-11-12T14:22:00Z"),
    "tipo_alerta": "temperatura_alta",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 30.8,
    "umbral_configurado": 30,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-13T10:22:00Z"),
    "id_trabajador_atencion": 27,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha": ISODate("2026-11-11T04:16:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 17.6,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-12T09:16:00Z"),
    "id_trabajador_atencion": 37,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha": ISODate("2026-11-14T11:46:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 21.5,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-15T11:46:00Z"),
    "id_trabajador_atencion": 5,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha": ISODate("2026-11-14T22:39:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "baja",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 24.4,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-15T02:39:00Z"),
    "id_trabajador_atencion": 37,
    "origen": "sintetico"
  },
  {
    "id_sensor": 34,
    "id_parcela": 34,
    "fecha": ISODate("2026-11-16T01:20:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 19.6,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-16T07:20:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 35,
    "id_parcela": 35,
    "fecha": ISODate("2026-11-09T19:40:00Z"),
    "tipo_alerta": "temperatura_baja",
    "severidad": "baja",
    "descripcion": "Temperatura ambiental por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 11.5,
    "umbral_configurado": 12,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-09T23:40:00Z"),
    "id_trabajador_atencion": 9,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha": ISODate("2026-11-10T03:54:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 12.7,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-11T20:54:00Z"),
    "id_trabajador_atencion": 9,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha": ISODate("2026-11-20T02:26:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 12.7,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 36,
    "id_parcela": 5,
    "fecha": ISODate("2026-11-22T10:27:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 19.7,
    "umbral_configurado": 25,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha": ISODate("2026-11-11T08:38:00Z"),
    "tipo_alerta": "humedad_alta",
    "severidad": "media",
    "descripcion": "Humedad del suelo por encima del umbral configurado (valor de ejemplo).",
    "valor_detectado": 62.6,
    "umbral_configurado": 55,
    "atendida": false,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha": ISODate("2026-11-14T09:31:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "alta",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 15.2,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-15T07:31:00Z"),
    "id_trabajador_atencion": 11,
    "origen": "sintetico"
  },
  {
    "id_sensor": 40,
    "id_parcela": 19,
    "fecha": ISODate("2026-11-18T18:13:00Z"),
    "tipo_alerta": "humedad_baja",
    "severidad": "media",
    "descripcion": "Humedad del suelo por debajo del umbral configurado (valor de ejemplo).",
    "valor_detectado": 21.1,
    "umbral_configurado": 25,
    "atendida": true,
    "fecha_atencion": ISODate("2026-11-20T01:13:00Z"),
    "id_trabajador_atencion": 9,
    "origen": "sintetico"
  }
]).insertedIds).length + " documentos insertados");

// monitoreos_satelitales (76 documentos)
print("monitoreos_satelitales: " + Object.keys(bd.monitoreos_satelitales.insertMany([
  {
    "id_parcela": 1,
    "id_campania": 1,
    "fecha_captura": ISODate("2025-04-11T15:00:00Z"),
    "indices": {
      "ndvi": 0.72
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 1,
    "fecha_captura": ISODate("2025-04-29T15:00:00Z"),
    "indices": {
      "ndvi": 0.82,
      "evi": 0.51,
      "savi": 0.62
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 2,
    "fecha_captura": ISODate("2025-05-22T15:00:00Z"),
    "indices": {
      "ndvi": 0.25,
      "evi": 0.1,
      "savi": 0.23
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 2,
    "fecha_captura": ISODate("2025-08-15T15:00:00Z"),
    "indices": {
      "ndvi": 0.64,
      "evi": 0.35,
      "savi": 0.48
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "fecha_captura": ISODate("2025-04-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.61,
      "savi": 0.41
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "fecha_captura": ISODate("2025-06-03T15:00:00Z"),
    "indices": {
      "ndvi": 0.66,
      "evi": 0.35,
      "savi": 0.45
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 3,
    "fecha_captura": ISODate("2025-06-25T15:00:00Z"),
    "indices": {
      "ndvi": 0.31,
      "evi": 0.23,
      "savi": 0.25
    },
    "cobertura_nubes_pct": 60,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 4,
    "fecha_captura": ISODate("2025-05-12T15:00:00Z"),
    "indices": {
      "ndvi": 0.32,
      "evi": 0.21,
      "savi": 0.22
    },
    "cobertura_nubes_pct": 0,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 4,
    "fecha_captura": ISODate("2025-06-05T15:00:00Z"),
    "indices": {
      "ndvi": 0.8,
      "evi": 0.47,
      "savi": 0.63
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 4,
    "fecha_captura": ISODate("2025-07-02T15:00:00Z"),
    "indices": {
      "ndvi": 0.42,
      "evi": 0.29,
      "savi": 0.33
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 5,
    "fecha_captura": ISODate("2025-06-16T15:00:00Z"),
    "indices": {
      "ndvi": 0.56,
      "evi": 0.37
    },
    "cobertura_nubes_pct": 35,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 5,
    "fecha_captura": ISODate("2025-10-14T15:00:00Z"),
    "indices": {
      "ndvi": 0.31
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 6,
    "id_campania": 6,
    "fecha_captura": ISODate("2026-01-21T15:00:00Z"),
    "indices": {
      "ndvi": 0.74,
      "evi": 0.43
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 6,
    "id_campania": 6,
    "fecha_captura": ISODate("2026-03-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.39,
      "evi": 0.24
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 7,
    "id_campania": 7,
    "fecha_captura": ISODate("2026-10-30T15:00:00Z"),
    "indices": {
      "ndvi": 0.61,
      "evi": 0.39
    },
    "cobertura_nubes_pct": 35,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 7,
    "id_campania": 7,
    "fecha_captura": ISODate("2026-11-11T15:00:00Z"),
    "indices": {
      "ndvi": 0.37,
      "evi": 0.18,
      "savi": 0.37
    },
    "cobertura_nubes_pct": 0,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "fecha_captura": ISODate("2026-04-08T15:00:00Z"),
    "indices": {
      "ndvi": 0.23,
      "evi": 0.18,
      "savi": 0.2
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 8,
    "id_campania": 8,
    "fecha_captura": ISODate("2026-06-20T15:00:00Z"),
    "indices": {
      "ndvi": 0.83,
      "evi": 0.52,
      "savi": 0.59
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "fecha_captura": ISODate("2025-07-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.28,
      "savi": 0.19
    },
    "cobertura_nubes_pct": 35,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 9,
    "id_campania": 9,
    "fecha_captura": ISODate("2025-08-03T15:00:00Z"),
    "indices": {
      "ndvi": 0.81,
      "evi": 0.62,
      "savi": 0.63
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 11,
    "id_campania": 11,
    "fecha_captura": ISODate("2026-10-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.43
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 11,
    "id_campania": 11,
    "fecha_captura": ISODate("2026-11-12T15:00:00Z"),
    "indices": {
      "ndvi": 0.68,
      "evi": 0.47,
      "savi": 0.54
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 11,
    "id_campania": 11,
    "fecha_captura": ISODate("2026-11-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.36,
      "evi": 0.26
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "fecha_captura": ISODate("2025-06-08T15:00:00Z"),
    "indices": {
      "ndvi": 0.66,
      "evi": 0.44,
      "savi": 0.49
    },
    "cobertura_nubes_pct": 60,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "fecha_captura": ISODate("2025-07-12T15:00:00Z"),
    "indices": {
      "ndvi": 0.82,
      "evi": 0.57
    },
    "cobertura_nubes_pct": 15,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 12,
    "id_campania": 12,
    "fecha_captura": ISODate("2025-07-27T15:00:00Z"),
    "indices": {
      "ndvi": 0.73,
      "evi": 0.48,
      "savi": 0.57
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 13,
    "id_campania": 13,
    "fecha_captura": ISODate("2025-06-05T15:00:00Z"),
    "indices": {
      "ndvi": 0.72,
      "evi": 0.52
    },
    "cobertura_nubes_pct": 15,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 14,
    "id_campania": 14,
    "fecha_captura": ISODate("2025-08-01T15:00:00Z"),
    "indices": {
      "ndvi": 0.5,
      "evi": 0.33,
      "savi": 0.36
    },
    "cobertura_nubes_pct": 35,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "fecha_captura": ISODate("2026-10-28T15:00:00Z"),
    "indices": {
      "ndvi": 0.72,
      "evi": 0.48
    },
    "cobertura_nubes_pct": 15,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 15,
    "id_campania": 15,
    "fecha_captura": ISODate("2026-11-05T15:00:00Z"),
    "indices": {
      "ndvi": 0.59,
      "evi": 0.33,
      "savi": 0.39
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 17,
    "id_campania": 17,
    "fecha_captura": ISODate("2026-09-20T15:00:00Z"),
    "indices": {
      "ndvi": 0.73,
      "evi": 0.47,
      "savi": 0.53
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 17,
    "id_campania": 17,
    "fecha_captura": ISODate("2026-10-08T15:00:00Z"),
    "indices": {
      "ndvi": 0.79,
      "evi": 0.46,
      "savi": 0.55
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 18,
    "id_campania": 18,
    "fecha_captura": ISODate("2026-08-12T15:00:00Z"),
    "indices": {
      "ndvi": 0.82,
      "savi": 0.58
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 18,
    "id_campania": 18,
    "fecha_captura": ISODate("2026-10-10T15:00:00Z"),
    "indices": {
      "ndvi": 0.23
    },
    "cobertura_nubes_pct": 35,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 19,
    "id_campania": 19,
    "fecha_captura": ISODate("2026-09-13T15:00:00Z"),
    "indices": {
      "ndvi": 0.37,
      "evi": 0.28,
      "savi": 0.26
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 19,
    "id_campania": 19,
    "fecha_captura": ISODate("2026-10-23T15:00:00Z"),
    "indices": {
      "ndvi": 0.82,
      "savi": 0.65
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 21,
    "id_campania": 21,
    "fecha_captura": ISODate("2025-02-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.36,
      "evi": 0.23,
      "savi": 0.26
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 21,
    "id_campania": 21,
    "fecha_captura": ISODate("2025-02-26T15:00:00Z"),
    "indices": {
      "ndvi": 0.32,
      "evi": 0.24
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "fecha_captura": ISODate("2026-07-25T15:00:00Z"),
    "indices": {
      "ndvi": 0.62,
      "savi": 0.43
    },
    "cobertura_nubes_pct": 15,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 22,
    "id_campania": 22,
    "fecha_captura": ISODate("2026-07-28T15:00:00Z"),
    "indices": {
      "ndvi": 0.75,
      "evi": 0.46,
      "savi": 0.59
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "fecha_captura": ISODate("2025-11-05T15:00:00Z"),
    "indices": {
      "ndvi": 0.78,
      "evi": 0.55,
      "savi": 0.63
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 23,
    "id_campania": 23,
    "fecha_captura": ISODate("2025-11-27T15:00:00Z"),
    "indices": {
      "ndvi": 0.69,
      "evi": 0.46,
      "savi": 0.5
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "fecha_captura": ISODate("2026-10-22T15:00:00Z"),
    "indices": {
      "ndvi": 0.57,
      "evi": 0.39
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 25,
    "id_campania": 25,
    "fecha_captura": ISODate("2026-10-31T15:00:00Z"),
    "indices": {
      "ndvi": 0.49,
      "evi": 0.29,
      "savi": 0.38
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 26,
    "id_campania": 26,
    "fecha_captura": ISODate("2025-05-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.71,
      "evi": 0.48,
      "savi": 0.56
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 26,
    "id_campania": 26,
    "fecha_captura": ISODate("2025-06-27T15:00:00Z"),
    "indices": {
      "ndvi": 0.81,
      "evi": 0.62,
      "savi": 0.63
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 26,
    "id_campania": 26,
    "fecha_captura": ISODate("2025-07-02T15:00:00Z"),
    "indices": {
      "ndvi": 0.73
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 27,
    "id_campania": 27,
    "fecha_captura": ISODate("2026-02-04T15:00:00Z"),
    "indices": {
      "ndvi": 0.66,
      "evi": 0.42,
      "savi": 0.48
    },
    "cobertura_nubes_pct": 15,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 27,
    "id_campania": 27,
    "fecha_captura": ISODate("2026-06-25T15:00:00Z"),
    "indices": {
      "ndvi": 0.68,
      "savi": 0.53
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "fecha_captura": ISODate("2026-02-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.67,
      "evi": 0.41,
      "savi": 0.42
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "fecha_captura": ISODate("2026-04-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.77,
      "evi": 0.53,
      "savi": 0.64
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 28,
    "id_campania": 28,
    "fecha_captura": ISODate("2026-05-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.36
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "fecha_captura": ISODate("2026-09-15T15:00:00Z"),
    "indices": {
      "ndvi": 0.7,
      "evi": 0.5,
      "savi": 0.47
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "fecha_captura": ISODate("2026-09-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.75,
      "evi": 0.53
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 29,
    "id_campania": 29,
    "fecha_captura": ISODate("2026-09-26T15:00:00Z"),
    "indices": {
      "ndvi": 0.8
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 31,
    "id_campania": 31,
    "fecha_captura": ISODate("2026-03-10T15:00:00Z"),
    "indices": {
      "ndvi": 0.81,
      "evi": 0.55,
      "savi": 0.64
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 32,
    "id_campania": 32,
    "fecha_captura": ISODate("2025-08-02T15:00:00Z"),
    "indices": {
      "ndvi": 0.36
    },
    "cobertura_nubes_pct": 10,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 32,
    "id_campania": 32,
    "fecha_captura": ISODate("2025-09-19T15:00:00Z"),
    "indices": {
      "ndvi": 0.61,
      "savi": 0.52
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 32,
    "id_campania": 32,
    "fecha_captura": ISODate("2025-11-27T15:00:00Z"),
    "indices": {
      "ndvi": 0.79,
      "evi": 0.49,
      "savi": 0.56
    },
    "cobertura_nubes_pct": 0,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "fecha_captura": ISODate("2026-09-24T15:00:00Z"),
    "indices": {
      "ndvi": 0.41,
      "evi": 0.32,
      "savi": 0.38
    },
    "cobertura_nubes_pct": 20,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 33,
    "id_campania": 33,
    "fecha_captura": ISODate("2026-10-24T15:00:00Z"),
    "indices": {
      "ndvi": 0.79,
      "evi": 0.47,
      "savi": 0.55
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "fecha_captura": ISODate("2026-07-14T15:00:00Z"),
    "indices": {
      "ndvi": 0.79
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 34,
    "id_campania": 34,
    "fecha_captura": ISODate("2026-08-20T15:00:00Z"),
    "indices": {
      "ndvi": 0.72,
      "evi": 0.48
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "fecha_captura": ISODate("2026-06-20T15:00:00Z"),
    "indices": {
      "ndvi": 0.25,
      "savi": 0.18
    },
    "cobertura_nubes_pct": 0,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 35,
    "id_campania": 35,
    "fecha_captura": ISODate("2026-06-23T15:00:00Z"),
    "indices": {
      "ndvi": 0.65
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 36,
    "fecha_captura": ISODate("2025-11-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.54,
      "savi": 0.39
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 1,
    "id_campania": 36,
    "fecha_captura": ISODate("2026-06-02T15:00:00Z"),
    "indices": {
      "ndvi": 0.57,
      "savi": 0.44
    },
    "cobertura_nubes_pct": 45,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "fecha_captura": ISODate("2026-03-07T15:00:00Z"),
    "indices": {
      "ndvi": 0.6,
      "evi": 0.39,
      "savi": 0.43
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 2,
    "id_campania": 37,
    "fecha_captura": ISODate("2026-06-24T15:00:00Z"),
    "indices": {
      "ndvi": 0.45,
      "evi": 0.31
    },
    "cobertura_nubes_pct": 5,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "fecha_captura": ISODate("2025-11-10T15:00:00Z"),
    "indices": {
      "ndvi": 0.75,
      "evi": 0.5
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 3,
    "id_campania": 38,
    "fecha_captura": ISODate("2025-11-24T15:00:00Z"),
    "indices": {
      "ndvi": 0.7,
      "evi": 0.4
    },
    "cobertura_nubes_pct": 3,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "fecha_captura": ISODate("2025-12-18T15:00:00Z"),
    "indices": {
      "ndvi": 0.84,
      "evi": 0.5,
      "savi": 0.58
    },
    "cobertura_nubes_pct": 60,
    "calidad": "mala",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "fecha_captura": ISODate("2025-12-24T15:00:00Z"),
    "indices": {
      "ndvi": 0.77,
      "evi": 0.48,
      "savi": 0.6
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 4,
    "id_campania": 39,
    "fecha_captura": ISODate("2026-02-26T15:00:00Z"),
    "indices": {
      "ndvi": 0.42,
      "savi": 0.27
    },
    "cobertura_nubes_pct": 25,
    "calidad": "regular",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 40,
    "fecha_captura": ISODate("2026-08-23T15:00:00Z"),
    "indices": {
      "ndvi": 0.77,
      "evi": 0.39,
      "savi": 0.58
    },
    "cobertura_nubes_pct": 0,
    "calidad": "buena",
    "origen": "sintetico"
  },
  {
    "id_parcela": 5,
    "id_campania": 40,
    "fecha_captura": ISODate("2026-11-14T15:00:00Z"),
    "indices": {
      "ndvi": 0.28,
      "evi": 0.18,
      "savi": 0.24
    },
    "cobertura_nubes_pct": 8,
    "calidad": "buena",
    "origen": "sintetico"
  }
]).insertedIds).length + " documentos insertados");

printjson(["lecturas_sensores","observaciones_agricolas","reportes_plagas","alertas_sensores","monitoreos_satelitales"].map(function (c) { return { coleccion: c, documentos: bd.getCollection(c).countDocuments({}) }; }));
