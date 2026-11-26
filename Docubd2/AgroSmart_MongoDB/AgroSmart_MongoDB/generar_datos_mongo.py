# -*- coding: utf-8 -*-
"""
AgroSmart - Generador de datos SINTETICOS para MongoDB (coherentes con los ids de Oracle).
Lee referencia_mongo.json (generado por la parte Oracle) y produce:
  datos_mongo/*.json (para importar en Compass), 01_crear_colecciones.js y 02_datos_mongo.js (para mongosh).
Semilla fija: siempre genera los mismos datos. Todos los datos son sinteticos.
"""
import json, random, re, math, unicodedata
from datetime import date, datetime, timedelta

SEED = 2026
TODAY = date(2026, 11, 22)
NOW = datetime(2026, 11, 22, 12, 0, 0)       # "ahora" del conjunto de datos
R = random.Random(SEED)
D = date.fromisoformat

ref = json.load(open('referencia_mongo.json', encoding='utf-8'))
sensores = [dict(s, fecha_instalacion=D(s['fecha_instalacion'])) for s in ref['sensores']]
campanias = [dict(c, fecha_inicio=D(c['fecha_inicio']), fin=D(c['fecha_fin_efectiva']) if c['fecha_fin_efectiva'] else None) for c in ref['campanias']]
trab = {t['id_trabajador']: t for t in ref['trabajadores']}
asig = {}
for a in ref['asignaciones']:
    asig.setdefault(a['id_campania'], set()).add(a['id_trabajador'])
activas = [c for c in campanias if c['estado'] != 'PLANIFICADA' and c['id_campania'] in asig]
tecnicos = [t for t in ref['trabajadores'] if t['estado'] == 'ACTIVO' and t['cargo'] in ('TECNICO_CAMPO', 'SUPERVISOR')]

def dt_between(a, b):
    """datetime aleatorio entre dos datetime."""
    return a + timedelta(seconds=R.randint(0, int((b - a).total_seconds())))
def dia(d, h0=7, h1=17):
    return datetime(d.year, d.month, d.day, R.randint(h0, h1), R.choice([0, 10, 15, 20, 30, 40, 45, 50]), 0)
def f1(x): return round(x, 1)

# ======================= ESQUEMAS (unica fuente: se validan los datos y se escriben en el JS) =======================
def idf(): return {'bsonType': 'number', 'minimum': 1}
def pct(): return {'bsonType': 'number', 'minimum': 0, 'maximum': 100}
ORIGEN = {'enum': ['sintetico']}
SCHEMAS = {
 'lecturas_sensores': {'bsonType': 'object', 'required': ['id_sensor', 'id_parcela', 'fecha_registro', 'mediciones', 'estado', 'origen'],
   'properties': {'id_sensor': idf(), 'id_parcela': idf(), 'fecha_registro': {'bsonType': 'date'},
     'mediciones': {'bsonType': 'array', 'minItems': 1, 'items': {'bsonType': 'object', 'required': ['tipo', 'valor', 'unidad'],
        'properties': {'tipo': {'enum': ['humedad_suelo', 'temperatura_ambiente']}, 'valor': {'bsonType': 'number'}, 'unidad': {'enum': ['%', '°C']}}}},
     'estado': {'enum': ['normal', 'alerta', 'error']}, 'bateria_pct': pct(), 'origen': ORIGEN}},
 'observaciones_agricolas': {'bsonType': 'object', 'required': ['id_parcela', 'id_campania', 'id_trabajador', 'fecha', 'descripcion', 'origen'],
   'properties': {'id_parcela': idf(), 'id_campania': idf(), 'id_trabajador': idf(), 'fecha': {'bsonType': 'date'},
     'descripcion': {'bsonType': 'string', 'minLength': 5},
     'evidencias': {'bsonType': 'array', 'items': {'bsonType': 'object', 'required': ['tipo', 'archivo'],
        'properties': {'tipo': {'enum': ['imagen', 'documento']}, 'archivo': {'bsonType': 'string'}}}},
     'etiquetas': {'bsonType': 'array', 'items': {'bsonType': 'string'}}, 'origen': ORIGEN}},
 'reportes_plagas': {'bsonType': 'object', 'required': ['id_parcela', 'id_campania', 'id_trabajador', 'fecha_reporte', 'tipo_plaga', 'nivel_afectacion', 'descripcion', 'estado', 'origen'],
   'properties': {'id_parcela': idf(), 'id_campania': idf(), 'id_trabajador': idf(), 'fecha_reporte': {'bsonType': 'date'},
     'tipo_plaga': {'enum': ['insectos', 'hongos', 'maleza', 'roedores', 'otros']}, 'nivel_afectacion': {'enum': ['bajo', 'medio', 'alto']},
     'area_afectada_pct': pct(), 'descripcion': {'bsonType': 'string', 'minLength': 5},
     'fotografias': {'bsonType': 'array', 'items': {'bsonType': 'string'}},
     'estado': {'enum': ['pendiente', 'en_atencion', 'resuelto']}, 'origen': ORIGEN}},
 'alertas_sensores': {'bsonType': 'object', 'required': ['id_sensor', 'id_parcela', 'fecha', 'tipo_alerta', 'severidad', 'descripcion', 'atendida', 'origen'],
   'properties': {'id_sensor': idf(), 'id_parcela': idf(), 'fecha': {'bsonType': 'date'},
     'tipo_alerta': {'enum': ['humedad_baja', 'humedad_alta', 'temperatura_alta', 'temperatura_baja', 'sensor_sin_senal']},
     'severidad': {'enum': ['baja', 'media', 'alta']}, 'descripcion': {'bsonType': 'string'},
     'valor_detectado': {'bsonType': 'number'}, 'umbral_configurado': {'bsonType': 'number'},
     'atendida': {'bsonType': 'bool'}, 'fecha_atencion': {'bsonType': 'date'}, 'id_trabajador_atencion': idf(), 'origen': ORIGEN},
   'anyOf': [{'properties': {'atendida': {'enum': [False]}}}, {'properties': {'atendida': {'enum': [True]}}, 'required': ['fecha_atencion']}]},
 'monitoreos_satelitales': {'bsonType': 'object', 'required': ['id_parcela', 'fecha_captura', 'indices', 'calidad', 'origen'],
   'properties': {'id_parcela': idf(), 'id_campania': idf(), 'fecha_captura': {'bsonType': 'date'},
     'indices': {'bsonType': 'object', 'required': ['ndvi'], 'properties': {k: {'bsonType': 'number', 'minimum': -1, 'maximum': 1} for k in ('ndvi', 'evi', 'savi')}},
     'cobertura_nubes_pct': pct(), 'calidad': {'enum': ['buena', 'regular', 'mala']}, 'origen': ORIGEN}},
}
INDICES = {
 'lecturas_sensores': [({'id_sensor': 1, 'fecha_registro': -1}, 'ix_lect_sensor_fecha'), ({'id_parcela': 1, 'fecha_registro': -1}, 'ix_lect_parcela_fecha')],
 'observaciones_agricolas': [({'id_parcela': 1, 'fecha': -1}, 'ix_obs_parcela_fecha'), ({'id_campania': 1}, 'ix_obs_campania')],
 'reportes_plagas': [({'id_campania': 1}, 'ix_plagas_campania'), ({'estado': 1, 'nivel_afectacion': 1}, 'ix_plagas_estado_nivel')],
 'alertas_sensores': [({'atendida': 1, 'fecha': -1}, 'ix_alertas_atendida_fecha'), ({'id_sensor': 1}, 'ix_alertas_sensor')],
 'monitoreos_satelitales': [({'id_parcela': 1, 'fecha_captura': -1}, 'ix_sat_parcela_fecha')],
}

def check(v, s, path='$'):
    """Validador minimo de los mismos $jsonSchema que se envian a MongoDB."""
    e = []
    if 'anyOf' in s and not any(not check(v, x, path) for x in s['anyOf']): e.append(path + ': anyOf')
    bt = s.get('bsonType')
    if bt:
        ok = {'number': isinstance(v, (int, float)) and not isinstance(v, bool), 'string': isinstance(v, str), 'date': isinstance(v, datetime),
              'array': isinstance(v, list), 'object': isinstance(v, dict), 'bool': isinstance(v, bool)}[bt]
        if not ok: return e + [path + ': tipo %s' % bt]
    if 'enum' in s and v not in s['enum']: e.append('%s: %r fuera de enum' % (path, v))
    if 'minimum' in s and v < s['minimum']: e.append(path + ': < minimo')
    if 'maximum' in s and v > s['maximum']: e.append(path + ': > maximo')
    if 'minLength' in s and len(v) < s['minLength']: e.append(path + ': corto')
    if 'minItems' in s and len(v) < s['minItems']: e.append(path + ': pocos items')
    if isinstance(v, list) and 'items' in s:
        for i, x in enumerate(v): e += check(x, s['items'], '%s[%d]' % (path, i))
    if isinstance(v, dict):
        for k in s.get('required', []):
            if k not in v: e.append('%s: falta %s' % (path, k))
        for k, sub in s.get('properties', {}).items():
            if k in v: e += check(v[k], sub, path + '.' + k)
    return e

# ======================= LECTURAS Y ALERTAS =======================
UMB = {'humedad_baja': 25, 'humedad_alta': 55, 'temperatura_alta': 30, 'temperatura_baja': 12}
DESC_AL = {'humedad_baja': 'Humedad del suelo por debajo del umbral configurado (valor de ejemplo).',
           'humedad_alta': 'Humedad del suelo por encima del umbral configurado (valor de ejemplo).',
           'temperatura_alta': 'Temperatura ambiental por encima del umbral configurado (valor de ejemplo).',
           'temperatura_baja': 'Temperatura ambiental por debajo del umbral configurado (valor de ejemplo).'}
def severidad(t, v):
    d = {'humedad_baja': UMB['humedad_baja'] - v, 'humedad_alta': v - UMB['humedad_alta'],
         'temperatura_alta': v - UMB['temperatura_alta'], 'temperatura_baja': UMB['temperatura_baja'] - v}[t]
    return 'alta' if d >= 8 else 'media' if d >= 3 else 'baja'

lecturas, alertas = [], []
def nueva_alerta(s, fecha, tipo, valor):
    reciente = fecha > NOW - timedelta(days=3)
    atendida = R.random() < (0.2 if reciente else 0.75)
    a = {'id_sensor': s['id_sensor'], 'id_parcela': s['id_parcela'], 'fecha': fecha, 'tipo_alerta': tipo}
    if tipo == 'sensor_sin_senal':
        a.update(severidad='media', descripcion='El sensor dejo de reportar lecturas.')
    else:
        a.update(severidad=severidad(tipo, valor), descripcion=DESC_AL[tipo], valor_detectado=valor, umbral_configurado=UMB[tipo])
    a['atendida'] = atendida
    if atendida:
        a['fecha_atencion'] = min(fecha + timedelta(hours=R.randint(2, 48)), NOW)
        a['id_trabajador_atencion'] = R.choice(tecnicos)['id_trabajador']
    a['origen'] = 'sintetico'
    alertas.append(a)

for s in sensores:
    activo = s['estado'] == 'ACTIVO'
    limite = NOW if activo else datetime(2026, 10, 15, 12, 0, 0)
    inicio = max(datetime.combine(s['fecha_instalacion'], datetime.min.time()) + timedelta(hours=8), limite - timedelta(days=14))
    if inicio >= limite: continue
    n = 6 if activo else 3
    momentos = sorted(dt_between(inicio, limite).replace(second=0, microsecond=0) for _ in range(n))
    bh, bt = R.uniform(24, 46), R.uniform(16, 29)
    for m in momentos:
        med, anom = [], []
        if s['tipo_sensor'] in ('HUMEDAD_SUELO', 'MULTIPARAMETRO'):
            h = bh + R.gauss(0, 5)
            if R.random() < 0.16: h = R.uniform(10, 24) if R.random() < 0.7 else R.uniform(56, 70)
            h = f1(min(max(h, 5), 85)); med.append({'tipo': 'humedad_suelo', 'valor': h, 'unidad': '%'})
            if h < UMB['humedad_baja']: anom.append(('humedad_baja', h))
            elif h > UMB['humedad_alta']: anom.append(('humedad_alta', h))
        if s['tipo_sensor'] in ('TEMPERATURA', 'MULTIPARAMETRO'):
            t = bt + R.gauss(0, 2.5)
            if R.random() < 0.12: t = R.uniform(30.5, 36) if R.random() < 0.7 else R.uniform(6, 11.5)
            t = f1(t); med.append({'tipo': 'temperatura_ambiente', 'valor': t, 'unidad': '°C'})
            if t > UMB['temperatura_alta']: anom.append(('temperatura_alta', t))
            elif t < UMB['temperatura_baja']: anom.append(('temperatura_baja', t))
        doc = {'id_sensor': s['id_sensor'], 'id_parcela': s['id_parcela'], 'fecha_registro': m, 'mediciones': med,
               'estado': 'alerta' if anom else 'normal'}
        if R.random() < 0.7: doc['bateria_pct'] = R.randint(35, 100)
        doc['origen'] = 'sintetico'
        lecturas.append(doc)
        if anom: nueva_alerta(s, m, *anom[0])
    if not activo:   # sensor que dejo de reportar
        nueva_alerta(s, dt_between(datetime(2026, 10, 16, 8, 0), NOW).replace(second=0, microsecond=0), 'sensor_sin_senal', None)

# ======================= OBSERVACIONES =======================
OBS = ['Se observa crecimiento irregular en una zona del cultivo.', 'Hojas con coloracion amarillenta en los bordes de la parcela.',
 'Humedad adecuada despues del riego de la manana.', 'Se detecta acumulacion de agua en la parte baja del terreno.',
 'Buen desarrollo de las plantas en el sector norte.', 'Se recomienda reforzar el control de malezas en el sector este.',
 'Plantas con menor altura cerca del canal de riego.', 'Floracion uniforme en la mayor parte de la parcela.',
 'Se observa suelo compactado en la zona de transito de maquinaria.', 'Presencia de aves en el sector sur; se revisara la proteccion.',
 'Revision de mangueras de riego: dos puntos con fuga menor.', 'Cobertura vegetal pareja tras la ultima fertilizacion.',
 'Se marcaron plantas con sintomas para seguimiento.', 'Inicio de cosecha en la zona mas avanzada del cultivo.']
ETQ = ['crecimiento', 'supervision', 'riego', 'fertilizacion', 'suelo', 'malezas', 'cosecha', 'maquinaria', 'seguimiento']
observaciones = []
for i in range(1, 61):
    c = R.choice(activas); a, b = c['fecha_inicio'], c['fin'] or TODAY
    f = dia(a + timedelta(days=R.randint(0, (b - a).days)))
    d = {'id_parcela': c['id_parcela'], 'id_campania': c['id_campania'], 'id_trabajador': R.choice(sorted(asig[c['id_campania']])),
         'fecha': f, 'descripcion': R.choice(OBS)}
    k = R.choice([0, 1, 1, 2])
    if k: d['evidencias'] = [{'tipo': 'imagen' if R.random() < .85 else 'documento', 'archivo': 'obs_%03d_%d.%s' % (i, j + 1, 'jpg')} for j in range(k)]
    for ev in d.get('evidencias', []):
        if ev['tipo'] == 'documento': ev['archivo'] = ev['archivo'].replace('.jpg', '.pdf')
    if R.random() < 0.8: d['etiquetas'] = R.sample(ETQ, R.randint(1, 3))
    d['origen'] = 'sintetico'
    observaciones.append(d)

# ======================= REPORTES DE PLAGAS =======================
PL = {'insectos': ['Presencia de insectos en algunas plantas.', 'Daño leve por insectos en hojas jovenes.'],
      'hongos': ['Manchas en hojas asociadas a hongos.', 'Humedad alta favorece aparicion de hongos en el follaje.'],
      'maleza': ['Crecimiento de maleza entre las hileras.', 'Maleza compite con el cultivo en el sector oeste.'],
      'roedores': ['Rastros de roedores cerca del almacen de insumos.', 'Daño en plantas por roedores en el borde de la parcela.'],
      'otros': ['Plantas con sintomas no identificados; se tomaran muestras.', 'Daño por causa no determinada en un sector.']}
RANGO_AREA = {'bajo': (1, 10), 'medio': (10, 30), 'alto': (30, 70)}
plagas = []
for i in range(1, 46):
    c = R.choice(activas); a, b = c['fecha_inicio'], c['fin'] or TODAY
    f = dia(a + timedelta(days=R.randint(0, (b - a).days)))
    tp = R.choices(list(PL), [40, 25, 15, 8, 12])[0]; niv = R.choices(['bajo', 'medio', 'alto'], [45, 40, 15])[0]
    d = {'id_parcela': c['id_parcela'], 'id_campania': c['id_campania'], 'id_trabajador': R.choice(sorted(asig[c['id_campania']])),
         'fecha_reporte': f, 'tipo_plaga': tp, 'nivel_afectacion': niv}
    if R.random() < 0.6: d['area_afectada_pct'] = R.randint(*RANGO_AREA[niv])
    d['descripcion'] = R.choice(PL[tp]).replace('Daño', 'Dano')
    nf = R.choice([0, 1, 2, 3])
    if nf: d['fotografias'] = ['plaga_%03d_%d.jpg' % (i, j + 1) for j in range(nf)]
    if c['estado'] == 'FINALIZADA': d['estado'] = R.choices(['resuelto', 'en_atencion', 'pendiente'], [80, 10, 10])[0]
    else: d['estado'] = R.choices(['pendiente', 'en_atencion', 'resuelto'], [40, 35, 25])[0]
    d['origen'] = 'sintetico'
    plagas.append(d)

# ======================= MONITOREOS SATELITALES =======================
sat = []
for c in campanias:
    if c['estado'] == 'PLANIFICADA': continue
    a, b = c['fecha_inicio'], c['fin'] or TODAY; L = max((b - a).days, 1)
    fechas = sorted({a + timedelta(days=R.randint(0, L)) for _ in range(R.randint(1, 3))})
    if len(fechas) < 2 and R.random() < 0.7 and L > 8: fechas = sorted(set(fechas) | {a + timedelta(days=R.randint(0, L))})
    for f in fechas:
        prog = (f - a).days / L
        ndvi = min(max(0.25 + 0.55 * math.sin(math.pi * prog) + R.gauss(0, 0.03), 0.05), 0.92)
        nub = R.choice([0, 3, 5, 8, 10, 15, 20, 25, 35, 45, 60])
        d = {'id_parcela': c['id_parcela'], 'id_campania': c['id_campania'],
             'fecha_captura': datetime(f.year, f.month, f.day, 15, 0, 0), 'indices': {'ndvi': round(ndvi, 2)}}
        if R.random() < 0.7: d['indices']['evi'] = round(min(max(ndvi * 0.65 + R.gauss(0, 0.04), 0.03), 0.9), 2)
        if R.random() < 0.7: d['indices']['savi'] = round(min(max(ndvi * 0.75 + R.gauss(0, 0.04), 0.03), 0.9), 2)
        d['cobertura_nubes_pct'] = nub
        d['calidad'] = 'buena' if nub < 20 else 'regular' if nub < 40 else 'mala'
        d['origen'] = 'sintetico'
        sat.append(d)

DATA = {'lecturas_sensores': lecturas, 'observaciones_agricolas': observaciones, 'reportes_plagas': plagas,
        'alertas_sensores': alertas, 'monitoreos_satelitales': sat}

# ======================= VALIDACIONES DE COHERENCIA =======================
ss = {s['id_sensor']: s for s in sensores}; cc = {c['id_campania']: c for c in campanias}
for n, docs in DATA.items():
    assert len(docs) >= 30, (n, len(docs))
    for d in docs:
        err = check(d, SCHEMAS[n]); assert not err, (n, err, d)
        for v in json.dumps(d, default=str, ensure_ascii=False):
            pass
for d in lecturas + alertas:
    s = ss[d['id_sensor']]; f = d.get('fecha_registro') or d['fecha']
    assert d['id_parcela'] == s['id_parcela']
    assert f.date() >= s['fecha_instalacion'] and f <= NOW, d
    if s['estado'] != 'ACTIVO' and 'fecha_registro' in d: assert f <= datetime(2026, 10, 15, 12), d
for n, k in (('observaciones_agricolas', 'fecha'), ('reportes_plagas', 'fecha_reporte'), ('monitoreos_satelitales', 'fecha_captura')):
    for d in DATA[n]:
        c = cc[d['id_campania']]
        assert c['estado'] != 'PLANIFICADA' and d['id_parcela'] == c['id_parcela']
        assert c['fecha_inicio'] <= d[k].date() <= (c['fin'] or TODAY), (n, d, c)
        if 'id_trabajador' in d: assert d['id_trabajador'] in asig[d['id_campania']]
for a in alertas:
    if a['atendida']: assert a['fecha_atencion'] >= a['fecha']
    if a['tipo_alerta'] != 'sensor_sin_senal':
        v = a['valor_detectado']
        assert (a['tipo_alerta'] in ('humedad_baja',) and v < 25) or (a['tipo_alerta'] == 'humedad_alta' and v > 55) or \
               (a['tipo_alerta'] == 'temperatura_alta' and v > 30) or (a['tipo_alerta'] == 'temperatura_baja' and v < 12)
assert sum(1 for l in lecturas if l['estado'] == 'alerta') == sum(1 for a in alertas if a['tipo_alerta'] != 'sensor_sin_senal')
for l in lecturas + alertas + observaciones + plagas + sat:
    pass

# ======================= SALIDA =======================
def conv(o, js):
    if isinstance(o, datetime):
        iso = o.strftime('%Y-%m-%dT%H:%M:%SZ'); return ('@@' + iso) if js else {'$date': iso}
    if isinstance(o, dict): return {k: conv(v, js) for k, v in o.items()}
    if isinstance(o, list): return [conv(v, js) for v in o]
    return o
def ascii_check(s):
    return all(ord(ch) < 128 or ch == '°' for ch in s)
for n, docs in DATA.items():
    txt = json.dumps(conv(docs, False), ensure_ascii=False, indent=1)
    assert ascii_check(txt), n
    open('datos_mongo/%s.json' % n, 'w', encoding='utf-8', newline='\n').write(txt + '\n')
def jsdump(o): return json.dumps(o, ensure_ascii=False, indent=2)
with open('01_crear_colecciones.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write('// =====================================================================\n// AgroSmart - 01_crear_colecciones.js\n'
            '// Crea la base "agrosmart", las 5 colecciones con validacion $jsonSchema y los 9 indices.\n'
            '// Ejecutar:  mongosh "mongodb://localhost:27017" -f 01_crear_colecciones.js\n'
            '// (o pega los bloques en la pestana MONGOSH de Compass). Es repetible: no borra datos.\n'
            '// Nota: los ids y valores numericos se validan con bsonType "number" porque mongosh guarda 101 como double.\n'
            '// MongoDB NO verifica que los ids existan en Oracle: eso lo valida la aplicacion.\n'
            '// =====================================================================\n\n'
            'var bd = db.getSiblingDB("agrosmart");\n\n')
    for n, sch in SCHEMAS.items():
        f.write('// ---- %s ----\nif (!bd.getCollectionNames().includes("%s")) {\n  bd.createCollection("%s", {\n    validator: { $jsonSchema: %s },\n'
                '    validationLevel: "strict",\n    validationAction: "error"\n  });\n}\n'
                % (n, n, n, jsdump(sch).replace('\n', '\n    ')))
        for key, name in INDICES[n]:
            f.write('bd.%s.createIndex(%s, { name: "%s" });\n' % (n, json.dumps(key).replace('"', ''), name))
        f.write('\n')
    f.write('printjson(bd.getCollectionNames());\nprintjson(bd.getCollectionNames().map(function (c) { return { coleccion: c, indices: bd.getCollection(c).getIndexes().map(function (i) { return i.name; }) }; }));\n')
with open('02_datos_mongo.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write('// AgroSmart - 02_datos_mongo.js  (DATOS SINTETICOS, semilla %d)\n// Ejecutar despues de 01_crear_colecciones.js:\n'
            '//   mongosh "mongodb://localhost:27017" -f 02_datos_mongo.js\n// Alternativa: importar datos_mongo/*.json desde Compass (ADD DATA > Import JSON file).\n'
            '// Si ya cargaste los datos y quieres repetir, ejecuta antes 99_limpieza_mongo.js y 01.\n\nvar bd = db.getSiblingDB("agrosmart");\n\n' % SEED)
    for n, docs in DATA.items():
        t = re.sub(r'"@@([^"]+)"', r'ISODate("\1")', jsdump(conv(docs, True)))
        f.write('// %s (%d documentos)\nprint("%s: " + Object.keys(bd.%s.insertMany(%s).insertedIds).length + " documentos insertados");\n\n' % (n, len(docs), n, n, t))
    f.write('printjson(["lecturas_sensores","observaciones_agricolas","reportes_plagas","alertas_sensores","monitoreos_satelitales"].map(function (c) { return { coleccion: c, documentos: bd.getCollection(c).countDocuments({}) }; }));\n')
# ids de ejemplo para los scripts de consultas y CRUD
cnt = {}
for l in lecturas: cnt[l['id_sensor']] = cnt.get(l['id_sensor'], 0) + 1
sensor_ej = max((s for s in sensores if s['estado'] == 'ACTIVO'), key=lambda s: (cnt.get(s['id_sensor'], 0), -s['id_sensor']))
camp_ej = max(activas, key=lambda c: sum(1 for o in observaciones if o['id_campania'] == c['id_campania']))
json.dump({'sensor': sensor_ej['id_sensor'], 'parcela_sensor': sensor_ej['id_parcela'], 'campania': camp_ej['id_campania'],
           'parcela_campania': camp_ej['id_parcela'], 'trabajador': sorted(asig[camp_ej['id_campania']])[0]}, open('ejemplos.json', 'w'))
print({n: len(d) for n, d in DATA.items()})
print('lecturas en alerta:', sum(1 for l in lecturas if l['estado'] == 'alerta'), '| alertas pendientes:', sum(1 for a in alertas if not a['atendida']))
print('ejemplo:', open('ejemplos.json').read())
