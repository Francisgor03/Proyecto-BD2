// =====================================================================
// AgroSmart - 01_crear_colecciones.js
// Crea la base "agrosmart", las 5 colecciones con validacion $jsonSchema y los 9 indices.
// Ejecutar:  mongosh "mongodb://localhost:27017" -f 01_crear_colecciones.js
// (o pega los bloques en la pestana MONGOSH de Compass). Es repetible: no borra datos.
// Nota: los ids y valores numericos se validan con bsonType "number" porque mongosh guarda 101 como double.
// MongoDB NO verifica que los ids existan en Oracle: eso lo valida la aplicacion.
// =====================================================================

var bd = db.getSiblingDB("agrosmart");

// ---- lecturas_sensores ----
if (!bd.getCollectionNames().includes("lecturas_sensores")) {
  bd.createCollection("lecturas_sensores", {
    validator: { $jsonSchema: {
      "bsonType": "object",
      "required": [
        "id_sensor",
        "id_parcela",
        "fecha_registro",
        "mediciones",
        "estado",
        "origen"
      ],
      "properties": {
        "id_sensor": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_parcela": {
          "bsonType": "number",
          "minimum": 1
        },
        "fecha_registro": {
          "bsonType": "date"
        },
        "mediciones": {
          "bsonType": "array",
          "minItems": 1,
          "items": {
            "bsonType": "object",
            "required": [
              "tipo",
              "valor",
              "unidad"
            ],
            "properties": {
              "tipo": {
                "enum": [
                  "humedad_suelo",
                  "temperatura_ambiente"
                ]
              },
              "valor": {
                "bsonType": "number"
              },
              "unidad": {
                "enum": [
                  "%",
                  "°C"
                ]
              }
            }
          }
        },
        "estado": {
          "enum": [
            "normal",
            "alerta",
            "error"
          ]
        },
        "bateria_pct": {
          "bsonType": "number",
          "minimum": 0,
          "maximum": 100
        },
        "origen": {
          "enum": [
            "sintetico"
          ]
        }
      }
    } },
    validationLevel: "strict",
    validationAction: "error"
  });
}
bd.lecturas_sensores.createIndex({id_sensor: 1, fecha_registro: -1}, { name: "ix_lect_sensor_fecha" });
bd.lecturas_sensores.createIndex({id_parcela: 1, fecha_registro: -1}, { name: "ix_lect_parcela_fecha" });

// ---- observaciones_agricolas ----
if (!bd.getCollectionNames().includes("observaciones_agricolas")) {
  bd.createCollection("observaciones_agricolas", {
    validator: { $jsonSchema: {
      "bsonType": "object",
      "required": [
        "id_parcela",
        "id_campania",
        "id_trabajador",
        "fecha",
        "descripcion",
        "origen"
      ],
      "properties": {
        "id_parcela": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_campania": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_trabajador": {
          "bsonType": "number",
          "minimum": 1
        },
        "fecha": {
          "bsonType": "date"
        },
        "descripcion": {
          "bsonType": "string",
          "minLength": 5
        },
        "evidencias": {
          "bsonType": "array",
          "items": {
            "bsonType": "object",
            "required": [
              "tipo",
              "archivo"
            ],
            "properties": {
              "tipo": {
                "enum": [
                  "imagen",
                  "documento"
                ]
              },
              "archivo": {
                "bsonType": "string"
              }
            }
          }
        },
        "etiquetas": {
          "bsonType": "array",
          "items": {
            "bsonType": "string"
          }
        },
        "origen": {
          "enum": [
            "sintetico"
          ]
        }
      }
    } },
    validationLevel: "strict",
    validationAction: "error"
  });
}
bd.observaciones_agricolas.createIndex({id_parcela: 1, fecha: -1}, { name: "ix_obs_parcela_fecha" });
bd.observaciones_agricolas.createIndex({id_campania: 1}, { name: "ix_obs_campania" });

// ---- reportes_plagas ----
if (!bd.getCollectionNames().includes("reportes_plagas")) {
  bd.createCollection("reportes_plagas", {
    validator: { $jsonSchema: {
      "bsonType": "object",
      "required": [
        "id_parcela",
        "id_campania",
        "id_trabajador",
        "fecha_reporte",
        "tipo_plaga",
        "nivel_afectacion",
        "descripcion",
        "estado",
        "origen"
      ],
      "properties": {
        "id_parcela": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_campania": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_trabajador": {
          "bsonType": "number",
          "minimum": 1
        },
        "fecha_reporte": {
          "bsonType": "date"
        },
        "tipo_plaga": {
          "enum": [
            "insectos",
            "hongos",
            "maleza",
            "roedores",
            "otros"
          ]
        },
        "nivel_afectacion": {
          "enum": [
            "bajo",
            "medio",
            "alto"
          ]
        },
        "area_afectada_pct": {
          "bsonType": "number",
          "minimum": 0,
          "maximum": 100
        },
        "descripcion": {
          "bsonType": "string",
          "minLength": 5
        },
        "fotografias": {
          "bsonType": "array",
          "items": {
            "bsonType": "string"
          }
        },
        "estado": {
          "enum": [
            "pendiente",
            "en_atencion",
            "resuelto"
          ]
        },
        "origen": {
          "enum": [
            "sintetico"
          ]
        }
      }
    } },
    validationLevel: "strict",
    validationAction: "error"
  });
}
bd.reportes_plagas.createIndex({id_campania: 1}, { name: "ix_plagas_campania" });
bd.reportes_plagas.createIndex({estado: 1, nivel_afectacion: 1}, { name: "ix_plagas_estado_nivel" });

// ---- alertas_sensores ----
if (!bd.getCollectionNames().includes("alertas_sensores")) {
  bd.createCollection("alertas_sensores", {
    validator: { $jsonSchema: {
      "bsonType": "object",
      "required": [
        "id_sensor",
        "id_parcela",
        "fecha",
        "tipo_alerta",
        "severidad",
        "descripcion",
        "atendida",
        "origen"
      ],
      "properties": {
        "id_sensor": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_parcela": {
          "bsonType": "number",
          "minimum": 1
        },
        "fecha": {
          "bsonType": "date"
        },
        "tipo_alerta": {
          "enum": [
            "humedad_baja",
            "humedad_alta",
            "temperatura_alta",
            "temperatura_baja",
            "sensor_sin_senal"
          ]
        },
        "severidad": {
          "enum": [
            "baja",
            "media",
            "alta"
          ]
        },
        "descripcion": {
          "bsonType": "string"
        },
        "valor_detectado": {
          "bsonType": "number"
        },
        "umbral_configurado": {
          "bsonType": "number"
        },
        "atendida": {
          "bsonType": "bool"
        },
        "fecha_atencion": {
          "bsonType": "date"
        },
        "id_trabajador_atencion": {
          "bsonType": "number",
          "minimum": 1
        },
        "origen": {
          "enum": [
            "sintetico"
          ]
        }
      },
      "anyOf": [
        {
          "properties": {
            "atendida": {
              "enum": [
                false
              ]
            }
          }
        },
        {
          "properties": {
            "atendida": {
              "enum": [
                true
              ]
            }
          },
          "required": [
            "fecha_atencion"
          ]
        }
      ]
    } },
    validationLevel: "strict",
    validationAction: "error"
  });
}
bd.alertas_sensores.createIndex({atendida: 1, fecha: -1}, { name: "ix_alertas_atendida_fecha" });
bd.alertas_sensores.createIndex({id_sensor: 1}, { name: "ix_alertas_sensor" });

// ---- monitoreos_satelitales ----
if (!bd.getCollectionNames().includes("monitoreos_satelitales")) {
  bd.createCollection("monitoreos_satelitales", {
    validator: { $jsonSchema: {
      "bsonType": "object",
      "required": [
        "id_parcela",
        "fecha_captura",
        "indices",
        "calidad",
        "origen"
      ],
      "properties": {
        "id_parcela": {
          "bsonType": "number",
          "minimum": 1
        },
        "id_campania": {
          "bsonType": "number",
          "minimum": 1
        },
        "fecha_captura": {
          "bsonType": "date"
        },
        "indices": {
          "bsonType": "object",
          "required": [
            "ndvi"
          ],
          "properties": {
            "ndvi": {
              "bsonType": "number",
              "minimum": -1,
              "maximum": 1
            },
            "evi": {
              "bsonType": "number",
              "minimum": -1,
              "maximum": 1
            },
            "savi": {
              "bsonType": "number",
              "minimum": -1,
              "maximum": 1
            }
          }
        },
        "cobertura_nubes_pct": {
          "bsonType": "number",
          "minimum": 0,
          "maximum": 100
        },
        "calidad": {
          "enum": [
            "buena",
            "regular",
            "mala"
          ]
        },
        "origen": {
          "enum": [
            "sintetico"
          ]
        }
      }
    } },
    validationLevel: "strict",
    validationAction: "error"
  });
}
bd.monitoreos_satelitales.createIndex({id_parcela: 1, fecha_captura: -1}, { name: "ix_sat_parcela_fecha" });

printjson(bd.getCollectionNames());
printjson(bd.getCollectionNames().map(function (c) { return { coleccion: c, indices: bd.getCollection(c).getIndexes().map(function (i) { return i.name; }) }; }));
