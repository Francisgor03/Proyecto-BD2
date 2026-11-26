import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Filter, Plus } from 'lucide-react';
import type { datasets } from '../../shared/datasets.mjs';
import { recordFields } from '../../shared/recordFields.mjs';
import { fetchApi } from '../utils/api';
import { formatRecordValue } from '../utils/recordDisplay';
import { RecordDetails } from './RecordDetails';
import { RecordDialog, type RecordAction } from './RecordDialog';

type Dataset = (typeof datasets)[number];
type Row = Record<string, unknown>;
type Page = { records: Row[]; hasMore: boolean };
const pageSize = 20;
const inputClass = 'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
function display(value: unknown, field: string) {
  if (field === 'mediciones' && Array.isArray(value)) {
    return value.map(({ tipo, valor, unidad }) =>
      `${tipo === 'humedad_suelo' ? 'Humedad' : tipo === 'temperatura_ambiente' ? 'Temperatura' : tipo} ${valor} ${unidad}`
    ).join(' · ');
  }
  return formatRecordValue(value);
}

export function RecordsView({ dataset, revision, fixedParcel }: {
  dataset: Dataset;
  revision: number;
  fixedParcel?: string;
}) {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState('');
  const [result, setResult] = useState<Page | null>(null);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Row | null>(null);
  const [action, setAction] = useState<RecordAction | null>(null);
  const [notice, setNotice] = useState('');
  const [changes, setChanges] = useState(0);
  const columns = Object.entries(dataset.columns);
  const canWrite = Object.hasOwn(recordFields, dataset.id);
  const parcelFilter = 'id_parcela' in dataset.columns && !fixedParcel;
  const sensorFilter = dataset.engine === 'mongo' && 'id_sensor' in dataset.columns;
  const pendingFilter = dataset.id === 'alertas_sensores';

  useEffect(() => {
    const controller = new AbortController();
    setError('');
    setResult(null);
    const query = new URLSearchParams(filters);
    query.set('limit', String(pageSize));
    query.set('offset', String(offset));
    if (fixedParcel) query.set('parcela', fixedParcel);
    fetchApi<Page>(`${dataset.engine}/${dataset.id}?${query}`, controller.signal)
      .then(setResult)
      .catch((reason: Error) => {
        if (!controller.signal.aborted) setError(reason.message);
      });
    return () => controller.abort();
  }, [dataset, fixedParcel, filters, offset, revision, changes]);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {canWrite && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
          <button type="button" onClick={() => setAction({ kind: 'create' })}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            <Plus className="h-4 w-4" aria-hidden="true" /> Registrar
          </button>
          {notice && <p role="status" className="text-sm font-medium text-emerald-800">{notice}</p>}
        </div>
      )}
      {(parcelFilter || sensorFilter || dataset.date || pendingFilter) && (
        <form className="flex flex-wrap items-end gap-3 border-b border-slate-200 px-4 py-4 sm:px-5"
          onSubmit={(event) => {
            event.preventDefault();
            const params = new URLSearchParams();
            for (const [name, value] of new FormData(event.currentTarget)) {
              if (typeof value === 'string' && value) params.set(name, value);
            }
            setOffset(0);
            setFilters(params.toString());
          }}>
          {parcelFilter && (
            <label className="w-28 text-xs font-medium text-slate-600">
              ID de parcela
              <input name="parcela" type="number" min="1" max="9999999999" className={inputClass} />
            </label>
          )}
          {sensorFilter && (
            <label className="w-28 text-xs font-medium text-slate-600">
              ID de sensor
              <input name="sensor" type="number" min="1" max="9999999999" className={inputClass} />
            </label>
          )}
          {dataset.date && (
            <>
              <label className="text-xs font-medium text-slate-600">Desde
                <input name="desde" type="date" className={inputClass} />
              </label>
              <label className="text-xs font-medium text-slate-600">Hasta
                <input name="hasta" type="date" className={inputClass} />
              </label>
            </>
          )}
          {pendingFilter && (
            <label className="flex h-10 items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="pendientes" value="true" className="accent-emerald-600" />
              Solo pendientes
            </label>
          )}
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            <Filter className="h-4 w-4" /> Filtrar
          </button>
        </form>
      )}

      {error && <p role="alert" className="m-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">{error}</p>}
      {!error && !result && <p role="status" className="p-5 text-sm text-slate-600">Consultando la base de datos…</p>}
      {result && result.records.length === 0 && (
        <p role="status" className="p-5 text-sm text-slate-600">No se encontraron registros para esta consulta.</p>
      )}
      {result && result.records.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{dataset.title}</caption>
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                {columns.map(([key, label]) => <th key={key} scope="col" className="whitespace-nowrap px-4 py-3">{label}</th>)}
                <th scope="col" className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {result.records.map((record) => (
                <tr key={String(record[dataset.key])} className="hover:bg-slate-50">
                  {columns.map(([key]) => (
                    <td key={key} className="min-w-20 max-w-72 px-4 py-3 align-top text-slate-700">
                      <div className="line-clamp-3 break-words">{display(record[key], key)}</div>
                    </td>
                  ))}
                  <td className="px-4 py-2 align-top">
                    <div className="flex gap-1 whitespace-nowrap">
                      <button type="button" onClick={() => setSelected(record)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 font-medium text-emerald-800 hover:bg-emerald-50">
                        <Eye className="h-4 w-4" aria-hidden="true" /> Ver
                      </button>
                      {canWrite && (
                        <>
                          <button type="button" onClick={() => setAction({ kind: 'edit', id: String(record[dataset.key]) })}
                            className="rounded-lg px-2 py-1.5 font-medium text-slate-700 hover:bg-slate-100">Editar</button>
                          <button type="button" onClick={() => setAction({ kind: 'delete', id: String(record[dataset.key]) })}
                            className="rounded-lg px-2 py-1.5 font-medium text-red-700 hover:bg-red-50">Eliminar</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {result && (offset > 0 || result.hasMore) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
          <span>Página {offset / pageSize + 1}</span>
          <div className="flex gap-2">
            <button type="button" disabled={offset === 0} onClick={() => setOffset(offset - pageSize)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 disabled:opacity-40">
              <ChevronLeft className="h-4 w-4" /> Anterior
            </button>
            <button type="button" disabled={!result.hasMore} onClick={() => setOffset(offset + pageSize)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 disabled:opacity-40">
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {selected && <RecordDetails dataset={dataset} record={selected} onClose={() => setSelected(null)} />}
      {action && (
        <RecordDialog dataset={dataset} action={action} fixedParcel={fixedParcel} close={() => setAction(null)}
          saved={(kind, id) => {
            setNotice(kind === 'create' ? `Registro guardado (ID ${id}).` : kind === 'edit' ? 'Registro actualizado.' : 'Registro eliminado.');
            if (kind === 'create') setOffset(0);
            if (kind === 'delete' && result?.records.length === 1) setOffset((value) => Math.max(0, value - pageSize));
            setChanges((value) => value + 1);
            setAction(null);
          }} />
      )}
    </section>
  );
}
