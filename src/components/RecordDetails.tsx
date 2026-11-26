import { useState } from 'react';
import { Braces, List, X } from 'lucide-react';
import { engineNames, type Dataset } from '../../shared/datasets.mjs';
import { recordFields, type Field } from '../../shared/recordFields.mjs';
import { formatRecordValue } from '../utils/recordDisplay';

function fieldLabel(key: string) {
  if (key === 'ndvi' || key === 'evi' || key === 'savi') return key.toUpperCase();
  const words = key.replaceAll('_', ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function fieldText(value: unknown, field: Field | undefined) {
  if (value === 'sintetico') return 'Sintético';
  if (typeof value === 'string' && /^[a-zA-Z_]{4,}$/.test(value) && field?.choices?.includes(value)) {
    return fieldLabel(value.toLocaleLowerCase('es'));
  }
  return formatRecordValue(value);
}

function DetailValue({ value, field }: { value: unknown; field?: Field }) {
  if (Array.isArray(value) && value.length > 0) {
    return (
      <ul className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <li key={index} className="min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2">
            <DetailValue value={item} field={field?.item} />
          </li>
        ))}
      </ul>
    );
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return (
      <dl className="flex flex-wrap gap-x-5 gap-y-2">
        {Object.entries(value).map(([key, item]) => (
          <div key={key} className="min-w-0">
            <dt className="text-xs font-medium text-slate-500">{field?.fields?.[key]?.label ?? fieldLabel(key)}</dt>
            <dd className="mt-0.5"><DetailValue value={item} field={field?.fields?.[key]} /></dd>
          </div>
        ))}
      </dl>
    );
  }

  return <span className="whitespace-pre-wrap [overflow-wrap:anywhere]">{Array.isArray(value) ? '—' : fieldText(value, field)}</span>;
}

export function RecordDetails({ dataset, record, onClose }: {
  dataset: Dataset;
  record: Record<string, unknown>;
  onClose: () => void;
}) {
  const [showJson, setShowJson] = useState(false);
  const fields = recordFields[dataset.id];
  const keys = [...new Set([...Object.keys(dataset.columns), ...Object.keys(record)])]
    .filter((key) => key !== dataset.key && Object.hasOwn(record, key));

  return (
    <dialog ref={(element) => { if (element && !element.open) element.showModal(); }}
      onClose={onClose} aria-labelledby="record-title"
      className="m-auto max-h-[90dvh] w-[min(94vw,44rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/40">
      <div className="flex max-h-[90dvh] flex-col">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-emerald-800">{engineNames[dataset.engine]} · {dataset.title}</p>
            <h2 id="record-title" className="mt-1 font-display text-xl font-semibold text-slate-900">Detalle del registro</h2>
            <p className="mt-1 break-all font-mono text-xs text-slate-600">ID {formatRecordValue(record[dataset.key])}</p>
          </div>
          <form method="dialog">
            <button autoFocus aria-label="Cerrar" className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-600">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </header>

        {dataset.engine === 'mongo' && (
          <div role="group" aria-label="Formato del registro" className="flex shrink-0 gap-1 border-b border-slate-200 px-5 py-2 sm:px-6">
            {[
              { json: false, label: 'Detalle', icon: List },
              { json: true, label: 'JSON', icon: Braces },
            ].map(({ json, label, icon: Icon }) => (
              <button key={label} type="button" aria-pressed={showJson === json} onClick={() => setShowJson(json)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:ring-emerald-600 ${showJson === json ? 'bg-emerald-50 text-emerald-900' : 'text-slate-600 hover:bg-slate-100'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        )}

        <div className="min-h-0 overflow-auto px-5 py-4 sm:px-6">
          {showJson ? (
            <pre className="overflow-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed text-slate-100"><code>{JSON.stringify(record, null, 2)}</code></pre>
          ) : (
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {keys.map((key) => {
                const field = fields?.[key];
                const value = record[key];
                const wide = key === 'descripcion' || (value !== null && typeof value === 'object');
                return (
                  <div key={key} className={`min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 ${wide ? 'sm:col-span-2' : ''}`}>
                    <dt className="mb-1 text-xs font-medium text-slate-600">{field?.label ?? dataset.columns[key] ?? fieldLabel(key)}</dt>
                    <dd className="text-sm font-medium text-slate-900"><DetailValue value={value} field={field} /></dd>
                  </div>
                );
              })}
            </dl>
          )}
        </div>
      </div>
    </dialog>
  );
}
