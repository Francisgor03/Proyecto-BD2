import { useEffect, useState } from 'react';
import { ArrowRight, Database, Layers } from 'lucide-react';
import { datasets, engineNames } from '../shared/datasets.mjs';
import { RecordsView } from './components/RecordsView';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { fetchApi } from './utils/api';

type Engine = keyof typeof engineNames;
type EngineStatus = { state: 'disabled' | 'incomplete' | 'empty' | 'connected' | 'unreachable'; missing?: string[] };
type Health = Record<Engine, EngineStatus>;
const engines = ['mongo', 'oracle'] as const;
const statuses = {
  disabled: { label: 'Sin configurar', style: 'bg-slate-100 text-slate-700' },
  incomplete: { label: 'Configuración incompleta', style: 'bg-amber-100 text-amber-900' },
  empty: { label: 'Faltan colecciones', style: 'bg-amber-100 text-amber-900' },
  connected: { label: 'Conectado', style: 'bg-emerald-100 text-emerald-900' },
  unreachable: { label: 'Consulta de conexión fallida', style: 'bg-red-100 text-red-900' },
};
const historyDatasets = datasets.filter((entry) => 'id_parcela' in entry.columns);

function ParcelHistory({ revision }: { revision: number }) {
  const [parcel, setParcel] = useState('');
  const [resource, setResource] = useState('lecturas_sensores');
  const dataset = historyDatasets.find(({ id }) => id === resource)!;

  return (
    <>
      <form className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white p-4"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setParcel(String(data.get('parcela')));
        }}>
        <label className="text-xs font-medium text-slate-600">
          ID de parcela
          <input type="number" name="parcela" min="1" max="9999999999" required
            className="mt-1 block w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-xs font-medium text-slate-600">
          Datos de la parcela
          <select value={resource} onChange={(event) => setResource(event.target.value)}
            className="mt-1 block max-w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
            {engines.map((engine) => (
              <optgroup key={engine} label={engineNames[engine]}>
                {historyDatasets.filter((item) => item.engine === engine).map(({ id, title }) => (
                  <option key={id} value={id}>{title}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          Consultar parcela
        </button>
      </form>
      {parcel && (
        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold">{dataset.title} de la parcela {parcel}</h2>
          <RecordsView key={`${dataset.id}-${parcel}`} dataset={dataset} revision={revision} fixedParcel={parcel} />
        </section>
      )}
    </>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [revision, setRevision] = useState(0);
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState('');
  const activeDataset = datasets.find(({ id }) => id === activeSection);
  const title = activeDataset?.title ?? (activeSection === 'history' ? 'Historial por parcela' : 'Resumen');

  useEffect(() => {
    const controller = new AbortController();
    setHealth(null);
    setError('');
    fetchApi<Health>('health', controller.signal).then(setHealth).catch((reason: Error) => {
      if (!controller.signal.aborted) setError(reason.message);
    });
    return () => controller.abort();
  }, [revision]);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activeSection={activeSection} onSelectSection={setActiveSection}
        collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title={title} onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onRefresh={() => setRevision((value) => value + 1)} />

        <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          {activeSection === 'overview' && (
            <>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Panel de operaciones agrícolas</h1>
                <p className="mt-2 text-sm text-slate-600">Consulta las campañas y el monitoreo de campo y comprueba el estado de las dos bases de datos.</p>
              </div>
              {error && <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">{error}</p>}
              <div className="grid gap-4 lg:grid-cols-2">
                {engines.map((engine) => {
                  const connection = health?.[engine];
                  const status = connection ? statuses[connection.state] : undefined;
                  const Icon = engine === 'mongo' ? Layers : Database;
                  return (
                    <section key={engine} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="flex items-center gap-3 font-display text-lg font-semibold">
                          <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          {engineNames[engine]}
                        </h2>
                        <span role="status" className={`rounded-full px-2.5 py-1 text-xs font-medium ${status?.style ?? 'bg-slate-100 text-slate-700'}`}>
                          {status?.label ?? (error ? 'Backend sin respuesta' : 'Verificando…')}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        {engine === 'mongo'
                          ? 'Lecturas de humedad y temperatura, alertas, observaciones, plagas e índices satelitales.'
                          : 'Parcelas, cultivos, campañas, trabajadores, insumos, costos y catálogo de sensores.'}
                      </p>
                      {connection?.state === 'disabled' && (
                        <p className="mt-3 text-xs text-slate-600">
                          {engine === 'mongo' ? 'Configura MONGO_URI en .env para habilitar MongoDB.' : 'Configura las variables ORACLE en .env para habilitar Oracle.'}
                        </p>
                      )}
                      {Boolean(connection?.missing?.length) && (
                        <p className="mt-3 break-words text-xs text-amber-900">Colecciones pendientes: {connection?.missing?.join(', ')}.</p>
                      )}
                      <button type="button" onClick={() => setActiveSection(engine === 'mongo' ? 'lecturas_sensores' : 'campania')}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
                        {engine === 'mongo' ? 'Ver lecturas' : 'Ver campañas'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </section>
                  );
                })}
              </div>
            </>
          )}

          {activeSection === 'history' && (
            <>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
                <p className="mt-2 text-sm text-slate-600">Usa el mismo ID de parcela para consultar registros de Oracle y MongoDB.</p>
              </div>
              <ParcelHistory revision={revision} />
            </>
          )}

          {activeDataset && (
            <>
              <div>
                <p className="mb-1 text-sm font-medium text-emerald-800">{engineNames[activeDataset.engine]}</p>
                <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
              </div>
              <RecordsView key={activeDataset.id} dataset={activeDataset} revision={revision} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
