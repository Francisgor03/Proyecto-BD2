# -*- coding: utf-8 -*-
"""
AgroSmart - Generador de datos SINTETICOS para Oracle.
Produce: 02_datos_oracle.sql, datos_oracle/*.csv y referencia_mongo.json
Uso:  python generar_datos_oracle.py
Semilla fija (SEED): siempre genera los mismos datos. Todos los datos son sinteticos.
"""
import random, csv, json, os, unicodedata
from datetime import date, timedelta

SEED = 2026
TODAY = date(2026, 11, 22)          # "fecha actual" usada para decidir el estado de las campanias
random.seed(SEED)

def ascii_(s):
    return unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode('ascii')
def rd(a, b):
    return a + timedelta(days=random.randint(0, (b - a).days))
def esc(v):
    if v is None: return 'NULL'
    if isinstance(v, date): return "DATE '%s'" % v.isoformat()
    if isinstance(v, (int, float)): return repr(v)
    return "'" + str(v).replace("'", "''") + "'"

NOM_M = "Jose Luis Carlos Juan Miguel Pedro Jorge Victor Manuel Cesar Raul Hugo Oscar Ricardo Walter Fernando Alberto Roberto Daniel Marco".split()
NOM_F = "Maria Rosa Carmen Ana Luz Elena Julia Patricia Gladys Sonia Teresa Martha Silvia Paola Lucia Diana Karen Milagros Flor Yesenia".split()
APE = ("Quispe Huaman Flores Ramos Mendoza Rojas Castillo Vargas Torres Chavez Gutierrez Salazar Paredes Cardenas Medina "
       "Campos Soto Aguilar Valdivia Herrera Caceres Delgado Espinoza Palomino Ccori Condori Mamani Pacheco Zapata Ibarra "
       "Rivera Cabrera Ortiz Poma Sanchez Rodriguez Gonzales Diaz Lopez Perez").split()

def persona(i, dnis):
    pool = random.choice([NOM_M, NOM_F])
    nom = ' '.join(random.sample(pool, 2))
    ape = random.choice(APE) + ' ' + random.choice(APE)
    return nom, ape

def doc_unico(usados, ce=False):
    while True:
        d = str(random.randint(10000000, 79999999)) if not ce else str(random.randint(100000000, 999999999))
        if d not in usados:
            usados.add(d); return d

# ---------------- PROPIETARIO (30)
dnis = set(); propietarios = []
for i in range(1, 31):
    nom, ape = persona(i, dnis)
    ce = random.random() < 0.10
    correo = '%s.%s%d@example.com' % (nom.split()[0].lower(), ape.split()[0].lower(), i)
    propietarios.append(dict(id_propietario=i, nombres=nom, apellidos=ape, tipo_documento='CE' if ce else 'DNI',
        numero_documento=doc_unico(dnis, ce), telefono='9' + str(random.randint(10000000, 99999999)),
        correo=correo, fecha_registro=rd(date(2025, 1, 1), date(2026, 6, 30))))

# ---------------- TIPO_CULTIVO (30)
CULT = [('Palta Hass','FRUTAL',300),('Uva de mesa','FRUTAL',280),('Arandano','FRUTAL',240),('Mango Kent','FRUTAL',270),
 ('Mandarina','FRUTAL',260),('Limon sutil','FRUTAL',300),('Platano','FRUTAL',280),('Maracuya','FRUTAL',240),('Fresa','FRUTAL',150),
 ('Esparrago','HORTALIZA',180),('Cebolla roja','HORTALIZA',150),('Ajo','HORTALIZA',160),('Tomate','HORTALIZA',120),
 ('Pimiento piquillo','HORTALIZA',140),('Alcachofa','HORTALIZA',200),('Zapallo macre','HORTALIZA',110),('Lechuga','HORTALIZA',60),
 ('Maiz amarillo duro','CEREAL',130),('Arroz','CEREAL',150),('Quinua','CEREAL',140),('Trigo','CEREAL',160),('Cebada','CEREAL',150),
 ('Frijol canario','LEGUMINOSA',100),('Haba verde','LEGUMINOSA',130),('Arveja','LEGUMINOSA',110),
 ('Papa blanca','TUBERCULO',130),('Camote','TUBERCULO',140),('Yuca','TUBERCULO',270),
 ('Cafe','INDUSTRIAL',320),('Cacao','INDUSTRIAL',300)]
assert len(CULT) == 30
cultivos = [dict(id_tipo_cultivo=i, nombre=n, categoria=c,
    descripcion='Cultivo de categoria %s. Duracion de ciclo de referencia sintetica.' % c.lower(), duracion_dias=d)
    for i, (n, c, d) in enumerate(CULT, 1)]

# ---------------- TRABAJADOR (40)
CARGOS = ['AGRICULTOR']*16 + ['TECNICO_CAMPO']*9 + ['OPERADOR']*7 + ['ASISTENTE']*5 + ['SUPERVISOR']*3
random.shuffle(CARGOS)
trabajadores = []
for i in range(1, 41):
    nom, ape = persona(i, dnis)
    trabajadores.append(dict(id_trabajador=i, nombres=nom, apellidos=ape, numero_documento=doc_unico(dnis),
        cargo=CARGOS[i-1], telefono='9' + str(random.randint(10000000, 99999999)),
        fecha_ingreso=rd(date(2021, 1, 1), date(2024, 12, 31)), estado='ACTIVO'))
for t in random.sample(trabajadores, 4): t['estado'] = 'INACTIVO'
activos = [t for t in trabajadores if t['estado'] == 'ACTIVO']

# ---------------- INSUMO (30)
INS = [('Urea 46%','FERTILIZANTE','KG',2.10),('Nitrato de amonio','FERTILIZANTE','KG',2.40),('Fosfato diamonico','FERTILIZANTE','KG',3.20),
 ('Cloruro de potasio','FERTILIZANTE','KG',2.80),('Sulfato de potasio','FERTILIZANTE','KG',3.60),('Nitrato de calcio','FERTILIZANTE','KG',2.90),
 ('Superfosfato triple','FERTILIZANTE','KG',2.70),('Sulfato de magnesio','FERTILIZANTE','KG',1.90),('Compost','FERTILIZANTE','SACO',18.00),
 ('Guano de isla','FERTILIZANTE','SACO',45.00),('Humus de lombriz','FERTILIZANTE','SACO',25.00),
 ('Cipermetrina','PESTICIDA','L',38.00),('Clorpirifos','PESTICIDA','L',42.00),('Imidacloprid','PESTICIDA','L',95.00),('Abamectina','PESTICIDA','L',120.00),
 ('Glifosato','HERBICIDA','L',22.00),('Pendimetalina','HERBICIDA','L',48.00),('Oxifluorfen','HERBICIDA','L',85.00),
 ('Mancozeb','FUNGICIDA','KG',24.00),('Azoxistrobina','FUNGICIDA','L',160.00),('Oxicloruro de cobre','FUNGICIDA','KG',28.00),('Azufre mojable','FUNGICIDA','KG',8.50),
 ('Semilla de maiz','SEMILLA','KG',12.00),('Semilla de frijol','SEMILLA','KG',9.00),('Semilla de quinua','SEMILLA','KG',14.00),('Plantula de tomate','SEMILLA','UNIDAD',0.35),
 ('Cal agricola','ENMIENDA','SACO',15.00),('Yeso agricola','ENMIENDA','SACO',14.00),('Dolomita','ENMIENDA','SACO',16.50),('Acido humico','ENMIENDA','L',30.00)]
assert len(INS) == 30
insumos = [dict(id_insumo=i, nombre=n, tipo=t, unidad_medida=u, precio_referencial=p) for i, (n, t, u, p) in enumerate(INS, 1)]

# ---------------- PARCELA (35)
REG = [('Ica','Ica',-14.07,-75.73),('La Libertad','Trujillo',-8.11,-79.03),('Lambayeque','Chiclayo',-6.77,-79.84),
 ('Piura','Piura',-5.19,-80.63),('Arequipa','Arequipa',-16.40,-71.54),('Lima','Huaral',-11.50,-77.21),
 ('Lima','Canete',-13.08,-76.39),('San Martin','San Martin',-6.49,-76.37),('Huanuco','Huanuco',-9.93,-76.24),('Cajamarca','Jaen',-5.71,-78.81)]
NOMP = ("El Mirador|Santa Rosa|La Esperanza|San Isidro|Los Olivos|El Porvenir|La Victoria|Buenavista|San Jose|El Rosal|Las Palmeras|La Joya|"
        "Monte Verde|El Progreso|Santa Elena|Los Alamos|La Campina|San Martin|El Triunfo|Villa Hermosa|Los Sauces|La Aurora|El Naranjal|"
        "San Pedro|Las Lomas|La Quebrada|El Cerezo|Los Pinos|Santa Lucia|El Mangal|La Pradera|Alto Peru|Rio Seco|La Huaca|Pampa Grande").split('|')
assert len(NOMP) >= 35
random.shuffle(NOMP)
SUELOS = ['ARENOSO','LIMOSO','ARCILLOSO','FRANCO','FRANCO_ARENOSO','FRANCO_ARCILLOSO']
parcelas = []
for i in range(1, 36):
    reg = random.choice(REG)
    owner = i if i <= 30 else random.randint(1, 30)
    parcelas.append(dict(id_parcela=i, id_propietario=owner, nombre='Parcela ' + NOMP[i-1],
        area_hectareas=round(random.uniform(0.8, 120), 2), ubicacion='%s, %s (ficticia)' % (reg[1], reg[0]),
        latitud=round(reg[2] + random.uniform(-0.25, 0.25), 6), longitud=round(reg[3] + random.uniform(-0.25, 0.25), 6),
        tipo_suelo=random.choice(SUELOS)))

# ---------------- CAMPANIA (40)
campanias = []
def add_camp(id_parcela, cultivo, inicio, estado, fin):
    campanias.append(dict(id_campania=len(campanias) + 1, id_parcela=id_parcela, id_tipo_cultivo=cultivo['id_tipo_cultivo'],
        nombre='%s %s' % (cultivo['nombre'], inicio.strftime('%Y-%m')), fecha_inicio=inicio, fecha_fin=fin, estado=estado))
cortos = [c for c in cultivos if c['duracion_dias'] <= 200]
# estados de las primeras campanias de las parcelas 6..35 (30): 15 F, 8 E, 5 P, 2 C
estados = ['F']*15 + ['E']*8 + ['P']*5 + ['C']*2
random.shuffle(estados)
for pid in range(1, 6):      # parcelas 1..5: primera campania FINALIZADA temprana
    c = random.choice(cortos); ini = rd(date(2025, 2, 1), date(2025, 5, 31))
    add_camp(pid, c, ini, 'FINALIZADA', ini + timedelta(days=c['duracion_dias']))
for pid, est in zip(range(6, 36), estados):
    c = random.choice(cultivos); d = c['duracion_dias']
    if est == 'F':
        ini = rd(date(2025, 1, 15), date(2026, 10, 15) - timedelta(days=d)); add_camp(pid, c, ini, 'FINALIZADA', ini + timedelta(days=d))
    elif est == 'E':
        ini = rd(TODAY - timedelta(days=d - 15), TODAY - timedelta(days=7)); add_camp(pid, c, ini, 'EN_CURSO', None)
    elif est == 'P':
        ini = rd(date(2026, 12, 1), date(2027, 2, 28)); add_camp(pid, c, ini, 'PLANIFICADA', None)
    else:
        ini = rd(date(2026, 1, 10), date(2026, 8, 30)); add_camp(pid, c, ini, 'CANCELADA', ini + timedelta(days=random.randint(10, 25)))
for pid in range(1, 6):      # segunda campania de las parcelas 1..5 (estado segun fechas)
    prev = [x for x in campanias if x['id_parcela'] == pid][0]
    c = random.choice(cultivos); d = c['duracion_dias']
    ini = prev['fecha_fin'] + timedelta(days=random.randint(60, 160))
    if ini > TODAY: add_camp(pid, c, ini, 'PLANIFICADA', None)
    elif ini + timedelta(days=d) < TODAY: add_camp(pid, c, ini, 'FINALIZADA', ini + timedelta(days=d))
    else: add_camp(pid, c, ini, 'EN_CURSO', None)
assert len(campanias) == 40

def ventana(c):
    """Rango de fechas dentro del cual pueden caer asignaciones, aplicaciones y costos."""
    if c['estado'] == 'PLANIFICADA': return None
    fin = c['fecha_fin'] if c['fecha_fin'] else TODAY
    return c['fecha_inicio'], fin
def fecha_en(c):
    a, b = ventana(c); return rd(a, b)

# ---------------- SENSOR (40)
sensores = []; ab = {'HUMEDAD_SUELO': 'HS', 'TEMPERATURA': 'TE', 'MULTIPARAMETRO': 'MP'}
pids = list(range(1, 36)) + [random.randint(1, 35) for _ in range(5)]
for i, pid in enumerate(pids, 1):
    t = random.choices(['HUMEDAD_SUELO', 'TEMPERATURA', 'MULTIPARAMETRO'], [4, 3, 3])[0]
    sensores.append(dict(id_sensor=i, id_parcela=pid, tipo_sensor=t, codigo_dispositivo='AGS-%s-%04d' % (ab[t], i),
        fecha_instalacion=rd(date(2025, 1, 1), date(2026, 9, 30)),
        estado=random.choices(['ACTIVO', 'MANTENIMIENTO', 'INACTIVO'], [85, 8, 7])[0]))

# ---------------- ASIGNACION_TRABAJADOR / APLICACION_INSUMO / COSTO_PRODUCCION
ACT = ['Siembra','Riego','Fertilizacion','Control de plagas','Deshierbe','Cosecha','Supervision de campo','Mantenimiento de riego','Poda','Aplicacion de enmiendas']
asign = []; vistos = set()
for c in campanias:
    if not ventana(c): continue
    for t in random.sample(activos, random.randint(1, 2)):
        for _ in range(random.randint(1, 2)):
            f = fecha_en(c); k = (c['id_campania'], t['id_trabajador'], f)
            if k in vistos: continue
            vistos.add(k)
            asign.append(dict(id_asignacion=len(asign) + 1, id_campania=c['id_campania'], id_trabajador=t['id_trabajador'],
                fecha_asignacion=f, actividad=random.choice(ACT)))
RANGO = {'KG': (50, 2000), 'L': (5, 300), 'SACO': (5, 200), 'UNIDAD': (100, 5000)}
aplic = []
for c in campanias:
    if c['estado'] not in ('FINALIZADA', 'EN_CURSO'): continue
    for ins in random.sample(insumos, random.randint(1, 3)):
        lo, hi = RANGO[ins['unidad_medida']]
        aplic.append(dict(id_aplicacion=len(aplic) + 1, id_campania=c['id_campania'], id_insumo=ins['id_insumo'],
            cantidad=round(random.uniform(lo, hi), 2), costo_unitario=round(ins['precio_referencial'] * random.uniform(0.92, 1.10), 2),
            fecha_aplicacion=fecha_en(c)))
MONTO = {'MANO_OBRA': (800, 12000), 'RIEGO': (300, 5000), 'MAQUINARIA': (500, 9000), 'TRANSPORTE': (200, 3500), 'ALQUILER': (300, 4000), 'OTROS': (100, 2500)}
DESC = {'MANO_OBRA': 'Pago de jornales', 'RIEGO': 'Costo de agua y energia de riego', 'MAQUINARIA': 'Uso de maquinaria agricola',
        'TRANSPORTE': 'Transporte de insumos o cosecha', 'ALQUILER': 'Alquiler de equipos', 'OTROS': 'Gastos varios de campo'}
costos = []
for c in campanias:
    if not ventana(c): continue
    n = 1 if c['estado'] == 'CANCELADA' else random.randint(2, 4)
    for con in random.sample(list(MONTO), n):
        lo, hi = MONTO[con]
        costos.append(dict(id_costo=len(costos) + 1, id_campania=c['id_campania'], concepto=con, descripcion=DESC[con],
            monto=round(random.uniform(lo, hi), 2), fecha_registro=fecha_en(c)))

# ---------------- VALIDACIONES (reflejan las restricciones de Oracle)
T = dict(PROPIETARIO=propietarios, PARCELA=parcelas, TIPO_CULTIVO=cultivos, CAMPANIA=campanias, TRABAJADOR=trabajadores,
         ASIGNACION_TRABAJADOR=asign, INSUMO=insumos, APLICACION_INSUMO=aplic, COSTO_PRODUCCION=costos, SENSOR=sensores)
for n, rows in T.items():
    assert len(rows) >= 30, (n, len(rows))
ids = lambda rows, k: {r[k] for r in rows}
assert {p['id_propietario'] for p in parcelas} <= ids(propietarios, 'id_propietario')
assert ids(propietarios, 'id_propietario') <= {p['id_propietario'] for p in parcelas}      # todo propietario tiene parcela
assert len({(p['id_propietario'], p['nombre']) for p in parcelas}) == len(parcelas)
assert all(c['id_parcela'] in ids(parcelas, 'id_parcela') for c in campanias)
assert len({(c['id_parcela'], c['nombre']) for c in campanias}) == len(campanias)
assert all(c['fecha_fin'] is None or c['fecha_fin'] >= c['fecha_inicio'] for c in campanias)
cm = {c['id_campania']: c for c in campanias}
for lista, campo in ((asign, 'fecha_asignacion'), (aplic, 'fecha_aplicacion'), (costos, 'fecha_registro')):
    for r in lista:
        a, b = ventana(cm[r['id_campania']]); assert a <= r[campo] <= b, (r, a, b)
for p in set(c['id_parcela'] for c in campanias):          # RN-03: sin solapamiento por parcela
    cs = sorted([c for c in campanias if c['id_parcela'] == p and c['estado'] != 'CANCELADA'], key=lambda c: c['fecha_inicio'])
    for x, y in zip(cs, cs[1:]):
        assert x['fecha_fin'] is not None and x['fecha_fin'] < y['fecha_inicio'], (x, y)
assert sum(1 for c in campanias if c['estado'] == 'EN_CURSO') >= 1
assert all(a['id_trabajador'] in {t['id_trabajador'] for t in activos} for a in asign)
for n, rows in T.items():
    for r in rows:
        for v in r.values():
            if isinstance(v, str): assert v == ascii_(v), v

# ---------------- SALIDA
COLS = {n: list(rows[0].keys()) for n, rows in T.items()}
ORDEN = ['PROPIETARIO', 'TIPO_CULTIVO', 'TRABAJADOR', 'INSUMO', 'PARCELA', 'CAMPANIA', 'SENSOR', 'ASIGNACION_TRABAJADOR', 'APLICACION_INSUMO', 'COSTO_PRODUCCION']
with open('02_datos_oracle.sql', 'w', encoding='utf-8', newline='\n') as f:
    f.write('-- AgroSmart - Datos SINTETICOS (generados con generar_datos_oracle.py, semilla %d)\n' % SEED)
    f.write('-- Ejecutar conectado como AGROSMART_OWNER, despues de 01_creacion_tablas.sql\n')
    f.write('-- Ningun dato es real. Los ids se cargan de forma explicita (1..N); los nuevos registros usan identity desde 1000.\n\n')
    for n in ORDEN:
        f.write('-- %s (%d filas)\n' % (n, len(T[n])))
        for r in T[n]:
            f.write('INSERT INTO %s (%s) VALUES (%s);\n' % (n, ', '.join(COLS[n]), ', '.join(esc(r[c]) for c in COLS[n])))
        f.write('\n')
    f.write('COMMIT;\n')
os.makedirs('datos_oracle', exist_ok=True)
for n in ORDEN:
    with open('datos_oracle/%s.csv' % n.lower(), 'w', encoding='utf-8', newline='') as f:
        w = csv.writer(f); w.writerow(COLS[n])
        for r in T[n]: w.writerow(['' if r[c] is None else (r[c].isoformat() if isinstance(r[c], date) else r[c]) for c in COLS[n]])
def jd(o): return o.isoformat() if isinstance(o, date) else str(o)
ref = {'aviso': 'DATOS SINTETICOS. Identificadores validos de Oracle para generar los documentos de MongoDB.',
 'parcelas': [dict(id_parcela=p['id_parcela'], nombre=p['nombre'], ubicacion=p['ubicacion'], latitud=p['latitud'], longitud=p['longitud']) for p in parcelas],
 'campanias': [dict(id_campania=c['id_campania'], id_parcela=c['id_parcela'], estado=c['estado'], fecha_inicio=c['fecha_inicio'],
     fecha_fin_efectiva=(ventana(c)[1] if ventana(c) else None)) for c in campanias],
 'sensores': [dict(id_sensor=s['id_sensor'], id_parcela=s['id_parcela'], tipo_sensor=s['tipo_sensor'], estado=s['estado'], fecha_instalacion=s['fecha_instalacion']) for s in sensores],
 'trabajadores': [dict(id_trabajador=t['id_trabajador'], cargo=t['cargo'], estado=t['estado']) for t in trabajadores],
 'asignaciones': [dict(id_campania=a['id_campania'], id_trabajador=a['id_trabajador'], fecha_asignacion=a['fecha_asignacion']) for a in asign]}
with open('referencia_mongo.json', 'w', encoding='utf-8') as f: json.dump(ref, f, ensure_ascii=False, indent=1, default=jd)
print({n: len(T[n]) for n in ORDEN})
print('estados campania:', {e: sum(1 for c in campanias if c['estado'] == e) for e in ('PLANIFICADA','EN_CURSO','FINALIZADA','CANCELADA')})
print('sensores:', {e: sum(1 for s in sensores if s['estado'] == e) for e in ('ACTIVO','MANTENIMIENTO','INACTIVO')})
