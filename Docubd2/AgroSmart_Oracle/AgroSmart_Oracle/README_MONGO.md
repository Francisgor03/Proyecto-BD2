# AgroSmart – Guía para la parte MongoDB (datos coherentes con Oracle)

Todos los datos son **sintéticos**. Los documentos de MongoDB deben usar **identificadores que existan en Oracle**. Los valores válidos están en `referencia_mongo.json` y en `datos_oracle/*.csv`.

## Identificadores válidos (números, no texto)
| Campo en MongoDB | Valores válidos | Origen |
| --- | --- | --- |
| `id_parcela` | 1 a 35 | `parcelas` / `parcela.csv` |
| `id_campania` | 1 a 40 | `campanias` / `campania.csv` |
| `id_sensor` | 1 a 40 | `sensores` / `sensor.csv` |
| `id_trabajador` | 1 a 40 | `trabajadores` / `trabajador.csv` |

## Reglas para que los datos sean coherentes
1. **Lecturas y alertas:** el `id_parcela` debe ser la parcela de ese sensor (campo `id_parcela` de `sensores`). La fecha debe ser posterior a su `fecha_instalacion` y no pasar del **2026-11-22**. Preferir sensores `ACTIVO`; un sensor `INACTIVO` o `MANTENIMIENTO` no debería tener lecturas recientes.
2. **Observaciones, reportes de plagas y monitoreos satelitales:** usar solo campañas que **no** sean `PLANIFICADA`. El `id_parcela` debe ser el de la campaña. La fecha debe estar entre `fecha_inicio` y `fecha_fin_efectiva` de la campaña (para las `EN_CURSO` es 2026-11-22).
3. **`id_trabajador`** en observaciones y reportes: de preferencia, un trabajador asignado a esa campaña (lista `asignaciones`).
4. Todos los documentos llevan `origen: "sintetico"`. Mínimo **30 documentos por colección**.
5. Tipos y valores permitidos: ver la hoja *Mongo_Diccionario* de `AgroSmart_Diccionario_Datos.xlsx`. Validar ids numéricos con `bsonType: "number"`.
