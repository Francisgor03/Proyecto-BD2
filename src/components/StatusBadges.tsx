import { useState } from 'react';
import { Check, Copy, AlertTriangle, AlertOctagon, CheckCircle2 } from 'lucide-react';
import type { DatabaseEngine, TriageStatus } from '../types/telemetry';
import { truncateObjectId } from '../utils/telemetry';

export function StatusBadge({ status }: { status: TriageStatus }) {
  if (status === 'Normal') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DEF7EC] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#03543F] border border-[#059669]/20 whitespace-nowrap shrink-0">
        <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>Normal</span>
      </span>
    );
  }
  if (status === 'Advertencia') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#92400E] border border-[#D97706]/25 whitespace-nowrap shrink-0">
        <AlertTriangle className="h-3 w-3 shrink-0" aria-hidden="true" />
        <span>Advertencia</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#991B1B] border border-[#DC2626]/25 whitespace-nowrap shrink-0">
      <AlertOctagon className="h-3 w-3 shrink-0" aria-hidden="true" />
      <span>Crítico</span>
    </span>
  );
}

export function EngineBadge({ engine }: { engine: DatabaseEngine }) {
  if (engine === 'ORA') {
    return (
      <span className="inline-flex items-center rounded-full border border-[#334155]/30 bg-[#F8FAFC] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#0F172A] whitespace-nowrap shrink-0">
        ORA
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#059669]/25 bg-[#DEF7EC] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[#03543F] whitespace-nowrap shrink-0">
      MDB
    </span>
  );
}

export function MonoCopyPill({
  value,
  truncate = false,
  label,
}: {
  value: string;
  truncate?: boolean;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const display = truncate ? truncateObjectId(value) : value;

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${value}`}
      aria-label={label ? `${label}: ${value}. Click to copy` : `Copy identifier ${value}`}
      className="group inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F1F5F9] px-2 py-0.5 font-mono text-xs font-medium text-[#334155] transition-colors hover:border-[#CBD5E1] hover:bg-[#E2E8F0]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
    >
      <span className="tabular-nums">{display}</span>
      {copied ? (
        <Check className="h-3 w-3 text-[#059669] shrink-0" aria-hidden="true" />
      ) : (
        <Copy className="h-3 w-3 text-[#64748B] opacity-70 group-hover:opacity-100 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
