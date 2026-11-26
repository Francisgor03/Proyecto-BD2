/** @typedef {null | boolean | number | string | Value[] | {[key: string]: Value}} Value */
/**
 * @typedef {object} Field
 * @property {string} label
 * @property {'text'|'number'|'date'|'datetime'|'select'|'boolean'|'list'|'object'} type
 * @property {boolean} [optional]
 * @property {Value} [defaultValue]
 * @property {number} [min]
 * @property {number} [max]
 * @property {number} [scale]
 * @property {string[]} [choices]
 * @property {Field} [item]
 * @property {Record<string, Field>} [fields]
 */

/** @param {string} label @param {number} max @param {boolean} [optional] @param {number} [min] @returns {Field} */
const text = (label, max, optional = false, min = 1) => ({ label, type: 'text', max, optional, min });
/** @param {string} label @param {number} [min] @param {number} [max] @param {number} [scale] @param {boolean} [optional] @returns {Field} */
const num = (label, min, max, scale, optional = false) => ({ label, type: 'number', min, max, scale, optional });
/** @param {string} label @param {boolean} [optional] */
const ref = (label, optional = false) => num(label, 1, 9999999999, 0, optional);
/** @param {string} label @param {boolean} [optional] @returns {Field} */
const date = (label, optional = false) => ({ label, type: 'date', optional });
/** @param {string} label @param {boolean} [optional] @returns {Field} */
const datetime = (label, optional = false) => ({ label, type: 'datetime', optional });
/** @param {string} label @param {string} options @param {string} [defaultValue] @returns {Field} */
const select = (label, options, defaultValue) => ({ label, type: 'select', choices: options.split(' '), defaultValue });
/** @param {string} label @param {Field} item @param {boolean} [optional] @returns {Field} */
const list = (label, item, optional = true) => ({ label, type: 'list', item, optional });
/** @param {string} label @param {Record<string, Field>} fields @returns {Field} */
const object = (label, fields) => ({ label, type: 'object', fields });

const parcela = ref('ID de parcela');
const campania = ref('ID de campaña');
const sensor = ref('ID de sensor');
const trabajador = ref('ID de trabajador');
const descripcion = text('Descripción', 200, true);

/** @type {Record<string, Record<string, Field>>} */
export const recordFields = {
  propietario: {
    nombres: text('Nombres', 80), apellidos: text('Apellidos', 80),
    tipo_documento: select('Tipo de documento', 'DNI CE'), numero_documento: text('Número de documento', 12),
    telefono: text('Teléfono', 15, true), correo: text('Correo electrónico', 100, true),
    fecha_registro: date('Fecha de registro', true),
  },
  parcela: {
    id_propietario: ref('ID de propietario'), nombre: text('Nombre', 80),
    area_hectareas: num('Área (ha)', 0.01, 999999.99, 2), ubicacion: text('Ubicación', 150),
    latitud: num('Latitud', -90, 90, 6, true), longitud: num('Longitud', -180, 180, 6, true),
    tipo_suelo: select('Tipo de suelo', 'ARENOSO LIMOSO ARCILLOSO FRANCO FRANCO_ARENOSO FRANCO_ARCILLOSO'),
  },
  tipo_cultivo: {
    nombre: text('Nombre', 60), categoria: select('Categoría', 'FRUTAL HORTALIZA CEREAL LEGUMINOSA TUBERCULO INDUSTRIAL'),
    descripcion, duracion_dias: num('Duración (días)', 1, 9999, 0),
  },
  campania: {
    id_parcela: parcela, id_tipo_cultivo: ref('ID de tipo de cultivo'), nombre: text('Nombre', 80),
    fecha_inicio: date('Fecha de inicio'), fecha_fin: date('Fecha de fin', true),
    estado: select('Estado', 'PLANIFICADA EN_CURSO FINALIZADA CANCELADA', 'PLANIFICADA'),
  },
  trabajador: {
    nombres: text('Nombres', 80), apellidos: text('Apellidos', 80),
    numero_documento: text('Número de documento', 12),
    cargo: select('Cargo', 'AGRICULTOR TECNICO_CAMPO SUPERVISOR OPERADOR ASISTENTE'),
    telefono: text('Teléfono', 15, true), fecha_ingreso: date('Fecha de ingreso'),
    estado: select('Estado', 'ACTIVO INACTIVO', 'ACTIVO'),
  },
  asignacion_trabajador: {
    id_campania: campania, id_trabajador: trabajador,
    fecha_asignacion: date('Fecha de asignación'), actividad: text('Actividad', 100),
  },
  insumo: {
    nombre: text('Nombre', 80), tipo: select('Tipo', 'FERTILIZANTE PESTICIDA HERBICIDA FUNGICIDA SEMILLA ENMIENDA'),
    unidad_medida: select('Unidad de medida', 'KG L SACO UNIDAD'),
    precio_referencial: num('Precio referencial', 0, 99999999.99, 2),
  },
  aplicacion_insumo: {
    id_campania: campania, id_insumo: ref('ID de insumo'), cantidad: num('Cantidad', 0.01, 99999999.99, 2),
    costo_unitario: num('Costo unitario', 0, 99999999.99, 2), fecha_aplicacion: date('Fecha de aplicación'),
  },
  costo_produccion: {
    id_campania: campania,
    concepto: select('Concepto', 'MANO_OBRA RIEGO MAQUINARIA TRANSPORTE ALQUILER OTROS'),
    descripcion, monto: num('Monto', 0.01, 9999999999.99, 2), fecha_registro: date('Fecha de registro'),
  },
  sensor: {
    id_parcela: parcela, tipo_sensor: select('Tipo de sensor', 'HUMEDAD_SUELO TEMPERATURA MULTIPARAMETRO'),
    codigo_dispositivo: text('Código de dispositivo', 30), fecha_instalacion: date('Fecha de instalación'),
    estado: select('Estado', 'ACTIVO INACTIVO MANTENIMIENTO', 'ACTIVO'),
  },
  lecturas_sensores: {
    id_sensor: sensor, id_parcela: parcela, fecha_registro: datetime('Fecha de lectura'),
    mediciones: list('Mediciones', object('Medición', {
      tipo: select('Tipo', 'humedad_suelo temperatura_ambiente'),
      valor: num('Valor'), unidad: select('Unidad', '% °C'),
    }), false),
    estado: select('Estado', 'normal alerta error', 'normal'), bateria_pct: num('Batería (%)', 0, 100, undefined, true),
  },
  observaciones_agricolas: {
    id_parcela: parcela, id_campania: campania, id_trabajador: trabajador, fecha: datetime('Fecha'),
    descripcion: text('Descripción', 4000, false, 5),
    evidencias: list('Evidencias', object('Evidencia', {
      tipo: select('Tipo', 'imagen documento'), archivo: text('Nombre del archivo', 500),
    })),
    etiquetas: list('Etiquetas', text('Etiqueta', 500)),
  },
  reportes_plagas: {
    id_parcela: parcela, id_campania: campania, id_trabajador: trabajador, fecha_reporte: datetime('Fecha del reporte'),
    tipo_plaga: select('Tipo de plaga', 'insectos hongos maleza roedores otros'),
    nivel_afectacion: select('Nivel de afectación', 'bajo medio alto'),
    area_afectada_pct: num('Área afectada (%)', 0, 100, undefined, true),
    descripcion: text('Descripción', 4000, false, 5),
    fotografias: list('Fotografías', text('Nombre del archivo', 500)),
    estado: select('Estado', 'pendiente en_atencion resuelto', 'pendiente'),
  },
  alertas_sensores: {
    id_sensor: sensor, id_parcela: parcela, fecha: datetime('Fecha de alerta'),
    tipo_alerta: select('Tipo de alerta', 'humedad_baja humedad_alta temperatura_alta temperatura_baja sensor_sin_senal'),
    severidad: select('Severidad', 'baja media alta'), descripcion: text('Descripción', 4000),
    valor_detectado: num('Valor detectado', undefined, undefined, undefined, true),
    umbral_configurado: num('Umbral configurado', undefined, undefined, undefined, true),
    atendida: { label: 'Atendida', type: 'boolean', defaultValue: false },
    fecha_atencion: datetime('Fecha de atención', true),
    id_trabajador_atencion: ref('ID de trabajador que atendió', true),
  },
  monitoreos_satelitales: {
    id_parcela: parcela, id_campania: ref('ID de campaña', true), fecha_captura: datetime('Fecha de captura'),
    indices: object('Índices de vegetación', {
      ndvi: num('NDVI', -1, 1), evi: num('EVI', -1, 1, undefined, true), savi: num('SAVI', -1, 1, undefined, true),
    }),
    cobertura_nubes_pct: num('Nubes (%)', 0, 100, undefined, true),
    calidad: select('Calidad', 'buena regular mala'),
  },
};
