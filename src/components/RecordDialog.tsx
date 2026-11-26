import { useEffect, useState, type FormEvent } from 'react';
import { Plus, X } from 'lucide-react';
import type { Dataset } from '../../shared/datasets.mjs';
import { recordFields, type Field, type Value } from '../../shared/recordFields.mjs';
import { fetchApi } from '../utils/api';

export type RecordAction = { kind: 'create' } | { kind: 'edit' | 'delete'; id: string };
type Draft = Record<string, Value>;

const inputClass = 'mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
const labels = new Map([
  ['humedad_suelo', 'Humedad del suelo'], ['temperatura_ambiente', 'Temperatura ambiental'],
  ['EN_CURSO', 'En curso'], ['sintetico', 'Sintético'],
]);

function optionLabel(value: string) {
  return labels.get(value) ?? value.replaceAll('_', ' ');
}

function initialValue(field: Field, value?: Value): Value {
  if (field.type === 'object') return draftFor(field.fields!, value as Draft | undefined);
  if (field.type === 'list') {
    if (Array.isArray(value)) return value.map((item) => initialValue(field.item!, item));
    return field.optional ? [] : [initialValue(field.item!)];
  }
  if (field.type === 'datetime' && typeof value === 'string') {
    const utc = Date.parse(value);
    return Number.isFinite(utc) ? new Date(utc - 18_000_000).toISOString().slice(0, -1) : '';
  }
  return value ?? field.defaultValue ?? '';
}

function draftFor(fields: Record<string, Field>, values?: Draft): Draft {
  return Object.fromEntries(Object.entries(fields).map(([name, field]) => [name, initialValue(field, values?.[name])]));
}

function serialize(field: Field, value: Value): Value {
  if (field.type === 'object') {
    return Object.fromEntries(Object.entries(field.fields!).map(([name, child]) => [name, serialize(child, (value as Draft)[name])]));
  }
  if (field.type === 'list') return (value as Value[]).map((item) => serialize(field.item!, item));
  if (value === '') return null;
  if (field.type === 'number') return Number(value);
  if (field.type === 'datetime') return `${value}-05:00`;
  return value;
}

function FormField({ field, value, onChange, required = !field.optional }: {
  field: Field;
  value: Value;
  onChange: (value: Value) => void;
  required?: boolean;
}) {
  if (field.type === 'object') {
    const draft = value as Draft;
    return (
      <fieldset className="rounded-lg border border-slate-200 px-3 pb-3 sm:col-span-2">
        <legend className="px-1 text-sm font-medium text-slate-700">{field.label}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(field.fields!).map(([name, child]) => (
            <FormField key={name} field={child} value={draft[name]} onChange={(next) => onChange({ ...draft, [name]: next })} />
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === 'list') {
    const items = value as Value[];
    return (
      <fieldset className="space-y-2 rounded-lg border border-slate-200 px-3 pb-3 sm:col-span-2">
        <legend className="px-1 text-sm font-medium text-slate-700">{field.label}</legend>
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <FormField field={field.item!} value={item}
                onChange={(next) => onChange(items.map((current, itemIndex) => itemIndex === index ? next : current))} />
            </div>
            <button type="button" disabled={required && items.length === 1} aria-label={`Quitar ${field.item!.label.toLowerCase()} ${index + 1}`}
              className="mt-2 rounded p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        ))}
        <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
          onClick={() => onChange([...items, initialValue(field.item!)])}>
          <Plus className="h-4 w-4" aria-hidden="true" /> Agregar
        </button>
      </fieldset>
    );
  }

  if (field.type === 'datetime') {
    const [day, time = ''] = String(value).split('T');
    return (
      <fieldset className="rounded-lg border border-slate-200 px-3 pb-3 sm:col-span-2">
        <legend className="px-1 text-sm font-medium text-slate-700">{field.label} (hora de Lima){required && ' *'}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-slate-700">Fecha
            <input type="date" required={required} value={day} className={inputClass}
              onChange={(event) => onChange(`${event.target.value}T${time}`)} />
          </label>
          <label className="text-sm text-slate-700">Hora
            <input type="time" required={required} value={time.slice(0, 5)} className={inputClass}
              onChange={(event) => onChange(`${day}T${event.target.value}`)} />
          </label>
        </div>
      </fieldset>
    );
  }

  return (
    <label className={`block text-sm font-medium text-slate-700 ${field.type === 'text' && (field.max ?? 0) >= 150 ? 'sm:col-span-2' : ''}`}>
      {field.label}{required && <span aria-hidden="true"> *</span>}
      {field.type === 'select' ? (
        <select required={required} value={String(value)} className={inputClass} onChange={(event) => onChange(event.target.value)}>
          <option value="">Selecciona una opción</option>
          {field.choices?.map((choice) => <option key={choice} value={choice}>{optionLabel(choice)}</option>)}
        </select>
      ) : field.type === 'boolean' ? (
        <select value={String(value)} className={inputClass} onChange={(event) => onChange(event.target.value === 'true')}>
          <option value="false">No</option><option value="true">Sí</option>
        </select>
      ) : field.type === 'text' && (field.max ?? 0) >= 150 ? (
        <textarea required={required} value={String(value)} className={inputClass}
          minLength={field.min} maxLength={field.max} rows={2} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input required={required} value={String(value)} className={inputClass}
          type={field.type}
          min={field.type === 'number' ? field.min : undefined} max={field.type === 'number' ? field.max : undefined}
          minLength={field.type === 'text' ? field.min : undefined} maxLength={field.type === 'text' ? field.max : undefined}
          step={field.type === 'number' ? (field.scale === undefined ? 'any' : 10 ** -field.scale) : undefined}
          onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

export function RecordDialog({ dataset, action, fixedParcel, close, saved }: {
  dataset: Dataset;
  action: RecordAction;
  fixedParcel?: string;
  close: () => void;
  saved: (action: RecordAction['kind'], id?: number | string) => void;
}) {
  const fields = recordFields[dataset.id];
  const endpoint = `${dataset.engine}/${dataset.id}${action.kind === 'create' ? '' : `/${encodeURIComponent(action.id)}`}`;
  const [draft, setDraft] = useState<Draft | null>(() =>
    action.kind === 'create' ? draftFor(fields, fixedParcel ? { id_parcela: fixedParcel } : undefined) : null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const attentionFields = ['fecha_atencion', 'id_trabajador_atencion'];
  const visibleFields = Object.entries(fields).filter(([name]) => !attentionFields.includes(name) || draft?.atendida === true);

  useEffect(() => {
    if (action.kind !== 'edit') return;
    const controller = new AbortController();
    fetchApi<Draft>(endpoint, controller.signal)
      .then((record) => setDraft(draftFor(fields, record)))
      .catch((reason: Error) => {
        if (!controller.signal.aborted) setError(reason.message);
      });
    return () => controller.abort();
  }, [action.kind, endpoint, fields]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      let id: number | string | undefined;
      if (action.kind === 'delete') {
        await fetchApi<void>(endpoint, undefined, { method: 'DELETE' });
      } else if (draft) {
        const payload = Object.fromEntries(visibleFields.map(([name, field]) => [name, serialize(field, draft[name])]));
        const response = await fetchApi<{ id: number | string }>(endpoint, undefined, {
          method: action.kind === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        id = response.id;
      }
      saved(action.kind, id);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'No se pudo guardar el cambio.');
    } finally {
      setBusy(false);
    }
  }

  const removing = action.kind === 'delete';
  const title = removing ? 'Eliminar registro' : action.kind === 'create' ? 'Registrar datos' : 'Editar registro';

  return (
    <dialog ref={(element) => { if (element && !element.open) element.showModal(); }}
      onCancel={(event) => { event.preventDefault(); if (!busy) close(); }}
      aria-labelledby="edit-title" className="m-auto max-h-[90dvh] w-[min(94vw,44rem)] overflow-auto rounded-xl bg-white p-0 shadow-xl backdrop:bg-slate-900/40">
      <form onSubmit={submit}>
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-5 py-4">
          <h2 id="edit-title" className="font-display text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-600">{dataset.title}</p>
        </header>
        <div className="space-y-4 p-5">
          {removing && (
            <p className="break-words text-sm text-slate-700">¿Eliminar el registro <strong>{action.id}</strong> de {dataset.title.toLowerCase()}? Esta acción es permanente.</p>
          )}
          {draft && !removing && (
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleFields.map(([name, field]) => (
                <FormField key={name} field={field} value={draft[name]}
                  required={name === 'fecha_atencion' ? draft.atendida === true : !field.optional}
                  onChange={(value) => setDraft({ ...draft, [name]: value })} />
              ))}
            </div>
          )}
          {!draft && !removing && !error && <p role="status" className="text-sm text-slate-600">Cargando el registro…</p>}
          {error && <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
        </div>
        <footer className="sticky bottom-0 flex flex-wrap justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3">
          <button type="button" onClick={close} disabled={busy} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:opacity-50">Cancelar</button>
          <button type="submit" disabled={busy || (!draft && !removing)}
            className={`rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50 ${removing ? 'bg-red-700 hover:bg-red-800' : 'bg-emerald-700 hover:bg-emerald-800'}`}>
            {busy ? 'Procesando…' : removing ? 'Eliminar definitivamente' : 'Guardar'}
          </button>
        </footer>
      </form>
    </dialog>
  );
}
