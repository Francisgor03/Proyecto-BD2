import { Download, Plus, Power, Droplets } from 'lucide-react';
import type {
  CropBatchRecord,
  IrrigationValve,
  ResourceQuotaInvoice,
} from '../types/telemetry';
import { EngineBadge, MonoCopyPill, StatusBadge } from './StatusBadges';
import { formatCsvExport } from '../utils/telemetry';

export function OracleBatchesView({
  batches,
  onOpenAddBatch,
}: {
  batches: CropBatchRecord[];
  onOpenAddBatch: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              Crop Batches &amp; Field Sectors
            </h1>
            <EngineBadge engine="ORA" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            Relational schema <code className="font-mono text-xs text-[#334155]">AGRO_PROD.CROP_BATCHES</code> tracking cultivar moisture envelopes and projected yield.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenAddBatch}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC] hover:border-[#CBD5E1] whitespace-nowrap shrink-0"
        >
          <Plus className="h-4 w-4 text-[#059669]" aria-hidden="true" />
          <span>New Crop Batch</span>
        </button>
      </div>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th scope="col" className="py-3 pl-5 pr-3 whitespace-nowrap">Oracle PK</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Batch &amp; Cultivar</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Sector</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Area (ha)</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Target Range</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Current Avg</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Est. Yield</th>
                <th scope="col" className="py-3 pl-3 pr-5 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {batches.map((b) => (
                <tr key={b.oraclePk} className="h-[52px] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-2.5 pl-5 pr-3 whitespace-nowrap">
                    <MonoCopyPill value={b.oraclePk} label="Oracle Batch Primary Key" />
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-semibold text-[#0F172A]">{b.batchCode}</span>
                      <span className="text-xs text-[#64748B]">{b.cultivar}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-medium text-[#0F172A] whitespace-nowrap">{b.sector}</td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#334155] whitespace-nowrap">
                    {b.areaHa.toFixed(1)} ha
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#64748B] whitespace-nowrap">
                    {b.targetMoistureMin}% – {b.targetMoistureMax}%
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono font-semibold tabular-nums text-[#0F172A] whitespace-nowrap">
                    {b.currentMoistureAvg.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#334155] whitespace-nowrap">
                    {b.yieldForecastTons.toFixed(1)} t
                  </td>
                  <td className="py-2.5 pl-3 pr-5 whitespace-nowrap">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export function OracleIrrigationView({
  valves,
  onToggleValve,
}: {
  valves: IrrigationValve[];
  onToggleValve: (oraclePk: string) => void;
}) {
  const openCount = valves.filter((v) => v.isOpen).length;
  const totalFlow = valves.reduce((sum, v) => sum + v.flowRateLpm, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              Irrigation &amp; Solenoid Valves
            </h1>
            <EngineBadge engine="ORA" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            Real-time valve actuators synchronized with <code className="font-mono text-xs text-[#334155]">AGRO_PROD.VALVE_SCHEDULES</code>.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#475569] tabular-nums">
          <span>
            Active valves: <strong className="font-mono text-[#0F172A]">{openCount}/{valves.length}</strong>
          </span>
          <span className="text-[#CBD5E1]" aria-hidden="true">·</span>
          <span>
            Live throughput: <strong className="font-mono text-[#059669]">{totalFlow} L/min</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {valves.map((v) => (
          <article
            key={v.oraclePk}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <MonoCopyPill value={v.valveCode} label="Valve code" />
                  <StatusBadge status={v.status} />
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold text-[#0F172A]">
                  {v.sector}
                </h2>
                <p className="text-xs text-[#64748B]">
                  {v.zoneType} · Next scheduled cycle {v.nextCycle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggleValve(v.oraclePk)}
                aria-pressed={v.isOpen}
                aria-label={`${v.isOpen ? 'Close' : 'Open'} valve ${v.valveCode}`}
                className={`inline-flex h-10 items-center gap-2 rounded-lg px-3.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
                  v.isOpen
                    ? 'bg-[#059669] text-white hover:bg-[#047857]'
                    : 'border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                <Power className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{v.isOpen ? 'Solenoid Open' : 'Solenoid Closed'}</span>
              </button>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#F1F5F9] pt-4">
              <div>
                <span className="block text-[11px] font-medium text-[#64748B]">Flow Rate</span>
                <span className="mt-0.5 flex items-center gap-1 font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                  <Droplets className="h-3.5 w-3.5 text-[#006194]" aria-hidden="true" />
                  {v.flowRateLpm} L/m
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-medium text-[#64748B]">Line Pressure</span>
                <span className="mt-0.5 block font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                  {v.linePressureBar.toFixed(2)} bar
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-medium text-[#64748B]">Daily Volume</span>
                <span className="mt-0.5 block font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                  {v.dailyVolumeL.toLocaleString('en-US')} L
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function OracleBillingView({
  invoices,
}: {
  invoices: ResourceQuotaInvoice[];
}) {
  const handleDownloadCsv = () => {
    const headers = [
      'OraclePK',
      'InvoiceCode',
      'Sector',
      'Period',
      'AllocatedLiters',
      'ConsumedLiters',
      'EnergyKwh',
      'EstimatedUSD',
      'Status',
    ];
    const rows = invoices.map((inv) => [
      inv.oraclePk,
      inv.invoiceCode,
      inv.sector,
      inv.period,
      inv.waterAllocatedL,
      inv.waterConsumedL,
      inv.energyKwh,
      inv.estimatedUsd.toFixed(2),
      inv.status,
    ]);
    const csv = formatCsvExport(headers, rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agrosmart-oracle-quotas-nov2026.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              Water Quotas &amp; Resource Billing
            </h1>
            <EngineBadge engine="ORA" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            Hydrological allocation ledger <code className="font-mono text-xs text-[#334155]">AGRO_FIN.SECTOR_QUOTAS</code> per irrigation sector.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownloadCsv}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC] hover:border-[#CBD5E1] whitespace-nowrap shrink-0"
        >
          <Download className="h-4 w-4 text-[#059669]" aria-hidden="true" />
          <span>Download CSV</span>
        </button>
      </div>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th scope="col" className="py-3 pl-5 pr-3 whitespace-nowrap">Invoice Key</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Sector</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Period</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Allocated</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Consumed</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Energy</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Cost (USD)</th>
                <th scope="col" className="py-3 pl-3 pr-5 whitespace-nowrap">Quota State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {invoices.map((inv) => {
                const pct = Math.round((inv.waterConsumedL / inv.waterAllocatedL) * 100);
                return (
                  <tr key={inv.oraclePk} className="h-[52px] hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-2.5 pl-5 pr-3 whitespace-nowrap">
                      <MonoCopyPill value={inv.oraclePk} label="Oracle Invoice Primary Key" />
                    </td>
                    <td className="px-3 py-2.5 font-medium text-[#0F172A] whitespace-nowrap">
                      {inv.sector}
                    </td>
                    <td className="px-3 py-2.5 text-[#64748B] whitespace-nowrap">{inv.period}</td>
                    <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#334155] whitespace-nowrap">
                      {inv.waterAllocatedL.toLocaleString('en-US')} L
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono tabular-nums whitespace-nowrap">
                      <span className="font-semibold text-[#0F172A]">
                        {inv.waterConsumedL.toLocaleString('en-US')} L
                      </span>
                      <span className="ml-1.5 text-xs text-[#64748B]">({pct}%)</span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#334155] whitespace-nowrap">
                      {inv.energyKwh} kWh
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono font-semibold tabular-nums text-[#0F172A] whitespace-nowrap">
                      ${inv.estimatedUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 pl-3 pr-5 whitespace-nowrap">
                      <StatusBadge status={inv.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
