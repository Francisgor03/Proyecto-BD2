export class RecordError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function requireRule(condition, message, status = 422) {
  if (!condition) throw new RecordError(status, message);
}

function dateValue(value, field) {
  const day = typeof value === 'string' && value.slice(0, 10);
  requireRule(day && /^\d{4}-\d{2}-\d{2}$/.test(day) && !day.startsWith('0000'), `${field.label}: fecha inválida.`);
  const midnight = new Date(`${day}T00:00:00Z`);
  requireRule(Number.isFinite(+midnight) && midnight.toISOString().slice(0, 10) === day, `${field.label}: fecha inválida.`);
  if (field.type === 'date') {
    requireRule(value === day, `${field.label}: usa AAAA-MM-DD.`);
    return day;
  }
  const iso = /^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/;
  requireRule(iso.test(value) && Number.isFinite(Date.parse(value)), `${field.label}: indica fecha, hora y zona horaria.`);
  return new Date(value);
}

function fieldValue(value, field) {
  if (field.type === 'object') return validateRecord(value, field.fields);
  if (field.type === 'list') {
    requireRule(Array.isArray(value) && (field.optional || value.length > 0), `${field.label}: agrega al menos un elemento.`);
    return value.map((item) => fieldValue(item, field.item));
  }
  if (field.type === 'date' || field.type === 'datetime') return dateValue(value, field);
  if (field.type === 'select') {
    requireRule(field.choices.includes(value), `${field.label}: elige un valor de la lista.`);
    return value;
  }
  if (field.type === 'boolean') {
    requireRule(typeof value === 'boolean', `${field.label}: selecciona Sí o No.`);
    return value;
  }
  if (field.type === 'number') {
    requireRule(Number.isFinite(value)
      && (field.min === undefined || value >= field.min)
      && (field.max === undefined || value <= field.max), `${field.label}: valor numérico fuera de rango o inválido.`);
    if (field.scale !== undefined) {
      const scaled = value * 10 ** field.scale;
      const tolerance = Math.max(1, Math.abs(scaled)) * Number.EPSILON * 2;
      requireRule(Math.abs(scaled - Math.round(scaled)) <= tolerance, `${field.label}: máximo ${field.scale} decimales.`);
    }
    return value;
  }
  requireRule(typeof value === 'string', `${field.label}: introduce texto.`);
  const clean = value.trim();
  requireRule(clean.length >= field.min && clean.length <= field.max, `${field.label}: entre ${field.min} y ${field.max} caracteres.`);
  return clean;
}

export function validateRecord(payload, fields) {
  requireRule(payload && typeof payload === 'object' && !Array.isArray(payload), 'Envía un objeto con los campos del formulario.');
  requireRule(Object.keys(payload).every((key) => Object.hasOwn(fields, key)), 'Hay campos que no se pueden escribir.');
  const record = {};
  for (const [key, field] of Object.entries(fields)) {
    const value = payload[key] === undefined ? field.defaultValue : payload[key];
    if (value === undefined || value === null || value === '') {
      requireRule(field.optional, `${field.label} es obligatorio.`);
    } else {
      record[key] = fieldValue(value, field);
    }
  }
  return record;
}
