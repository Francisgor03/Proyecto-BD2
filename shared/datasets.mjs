/**
 * @typedef {object} Dataset
 * @property {string} id
 * @property {string} title
 * @property {string} key
 * @property {Record<string, string>} columns
 * @property {string | null} date
 * @property {'oracle' | 'mongo'} engine
 */

/** @param {string} id @param {string} title @param {string} key @param {Record<string, string>} columns @returns {Dataset} */
const oracle = (id, title, key, columns) => ({ id, title, key, columns, date: null, engine: 'oracle' });

/** @param {string} id @param {string} title @param {string} date @param {Record<string, string>} columns @returns {Dataset} */
const mongo = (id, title, date, columns) => ({ id, title, key: '_id', columns, date, engine: 'mongo' });
export const datasets = [
  oracle('campania', 'Campañas', 'id_campania', {
    id_campania: 'ID', nombre: 'Campaña', id_parcela: 'ID de parcela', parcela: 'Parcela',
    cultivo: 'Cultivo', fecha_inicio: 'Inicio', fecha_fin: 'Fin', estado: 'Estado',
  }),
  oracle('parcela', 'Parcelas', 'id_parcela', {
    id_parcela: 'ID', nombre: 'Parcela', id_propietario: 'ID de propietario', area_hectareas: 'Área (ha)',
    ubicacion: 'Ubicación', tipo_suelo: 'Tipo de suelo', latitud: 'Latitud', longitud: 'Longitud',
  }),
  oracle('v_costo_campania', 'Costos por campaña', 'id_campania', {
    id_campania: 'ID', campania: 'Campaña', id_parcela: 'ID de parcela', estado: 'Estado',
    costo_insumos: 'Insumos', costo_otros: 'Otros costos', costo_total: 'Total',
  }),
  oracle('sensor', 'Sensores', 'id_sensor', {
    id_sensor: 'ID', codigo_dispositivo: 'Dispositivo', id_parcela: 'ID de parcela', parcela: 'Parcela',
    tipo_sensor: 'Tipo', fecha_instalacion: 'Instalación', estado: 'Estado',
  }),
  oracle('propietario', 'Propietarios', 'id_propietario', {
    id_propietario: 'ID', nombres: 'Nombres', apellidos: 'Apellidos', fecha_registro: 'Registro',
  }),
  oracle('tipo_cultivo', 'Tipos de cultivo', 'id_tipo_cultivo', {
    id_tipo_cultivo: 'ID', nombre: 'Cultivo', categoria: 'Categoría',
    descripcion: 'Descripción', duracion_dias: 'Duración (días)',
  }),
  oracle('trabajador', 'Trabajadores', 'id_trabajador', {
    id_trabajador: 'ID', nombres: 'Nombres', apellidos: 'Apellidos',
    cargo: 'Cargo', fecha_ingreso: 'Ingreso', estado: 'Estado',
  }),
  oracle('asignacion_trabajador', 'Asignaciones', 'id_asignacion', {
    id_asignacion: 'ID', id_campania: 'Campaña', id_trabajador: 'Trabajador',
    fecha_asignacion: 'Fecha', actividad: 'Actividad',
  }),
  oracle('insumo', 'Insumos', 'id_insumo', {
    id_insumo: 'ID', nombre: 'Insumo', tipo: 'Tipo', unidad_medida: 'Unidad',
    precio_referencial: 'Precio referencial',
  }),
  oracle('aplicacion_insumo', 'Aplicaciones de insumos', 'id_aplicacion', {
    id_aplicacion: 'ID', id_campania: 'Campaña', id_insumo: 'Insumo',
    fecha_aplicacion: 'Fecha', cantidad: 'Cantidad', costo_unitario: 'Costo unitario',
  }),
  oracle('costo_produccion', 'Costos de producción', 'id_costo', {
    id_costo: 'ID', id_campania: 'Campaña', concepto: 'Concepto', descripcion: 'Descripción',
    monto: 'Monto', fecha_registro: 'Fecha',
  }),
  mongo('lecturas_sensores', 'Lecturas de sensores', 'fecha_registro', {
    fecha_registro: 'Fecha y hora', id_sensor: 'Sensor', id_parcela: 'Parcela',
    mediciones: 'Mediciones', bateria_pct: 'Batería (%)', estado: 'Estado', origen: 'Origen',
  }),
  mongo('alertas_sensores', 'Alertas de sensores', 'fecha', {
    fecha: 'Fecha y hora', id_sensor: 'Sensor', id_parcela: 'Parcela', tipo_alerta: 'Tipo',
    severidad: 'Severidad', valor_detectado: 'Valor', umbral_configurado: 'Umbral',
    atendida: 'Atendida', descripcion: 'Descripción',
  }),
  mongo('observaciones_agricolas', 'Observaciones agrícolas', 'fecha', {
    fecha: 'Fecha y hora', id_parcela: 'Parcela', id_campania: 'Campaña', id_trabajador: 'Trabajador',
    descripcion: 'Descripción', evidencias: 'Evidencias', etiquetas: 'Etiquetas',
  }),
  mongo('reportes_plagas', 'Reportes de plagas', 'fecha_reporte', {
    fecha_reporte: 'Fecha y hora', id_parcela: 'Parcela', id_campania: 'Campaña', tipo_plaga: 'Plaga',
    nivel_afectacion: 'Afectación', area_afectada_pct: 'Área afectada (%)',
    estado: 'Estado', descripcion: 'Descripción',
  }),
  mongo('monitoreos_satelitales', 'Monitoreo satelital', 'fecha_captura', {
    fecha_captura: 'Fecha y hora', id_parcela: 'Parcela', id_campania: 'Campaña',
    indices: 'Índices de vegetación', cobertura_nubes_pct: 'Nubes (%)', calidad: 'Calidad',
  }),
];

export const engineNames = { mongo: 'MongoDB', oracle: 'Oracle' };
