import { Activity, Code2, Power, Search, RotateCcw } from 'lucide-react';
import type { DatabaseEngine, TelemetrySensor, TriageStatus } from '../types/telemetry';
import { EngineBadge, MonoCopyPill, StatusBadge } from './StatusBadges';

interface SensorTableProps {
  sensors: TelemetrySensor[];
  query: string;
  onQueryChange: (q: string) => void;
  statusFilter: 'All' | TriageStatus;
  onStatusFilterChange: (s: 'All' | TriageStatus) => void;
  engineFilter: 'All' | DatabaseEngine;
  onEngineFilterChange: (e: 'All' | DatabaseEngine) => void;
  onPingSensor: (id: string) => void;
  onToggleSolenoid: (id: string) => void;
  onInspectSensor: (sensor: TelemetrySensor) => void;
  pingingId: string | null;
}

export function SensorTable({
  sensors,
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  engineFilter,
  onEngineFilterChange,
  onPingSensor,
  onToggleSolenoid,
  onInspectSensor,
  pingingId,
}: SensorTableProps) {
  const statusOptions: ('All' | TriageStatus)[] = ['All', 'Normal', 'Advertencia', 'Crítico'];
  const engineOptions: ('All' | DatabaseEngine)[] = ['All', 'ORA', 'MDB'];

  const handleResetFilters = () => {
    onQueryChange('');
    onStatusFilterChange('All');
    onEngineFilterChange('All');
  };

  return (
    <section
      aria-label="Field Sensor Telemetry Matrix"
      className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b border-[#E2E8F0] p-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold text-[#0F172A]">
            Field Triage &amp; Node Matrix
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B] tabular-nums">
            Showing {sensors.length} telemetry node{sensors.length === 1 ? '' : 's'} across Oracle Enterprise &amp; MongoDB Atlas
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Search input */}
          <div className="relative flex-1 min-w-[180px] sm:flex-initial">
            <label htmlFor="sensor-search" className="sr-only">
              Search sensors by serial, ObjectId, or sector
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]"
              aria-hidden="true"
            />
            <input
              id="sensor-search"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search SN-..., sector, ObjectId"
              className="h-10 w-full sm:w-52 rounded-lg border border-[#CBD5E1] bg-white pl-9 pr-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
            />
          </div>

          {/* Status segmented control */}
          <div
            role="group"
            aria-label="Filter by triage status"
            className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] p-1"
          >
            {statusOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onStatusFilterChange(opt)}
                aria-pressed={statusFilter === opt}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  statusFilter === opt
                    ? 'bg-white text-[#0F172A] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Engine filter */}
          <div
            role="group"
            aria-label="Filter by database engine"
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white p-1"
          >
            {engineOptions.map((eng) => (
              <button
                key={eng}
                type="button"
                onClick={() => onEngineFilterChange(eng)}
                aria-pressed={engineFilter === eng}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  engineFilter === eng
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {eng}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table or empty state */}
      {sensors.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <p className="font-display text-base font-semibold text-[#0F172A]">
            No telemetry nodes match your filters
          </p>
          <p className="mt-1 text-sm text-[#64748B]">
            Adjust the search query, database engine, or triage status filter to view active sensors.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th scope="col" className="py-3 pl-5 pr-3 whitespace-nowrap">Sensor / Serial</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Engine &amp; Key</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Sector</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Moisture</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Salinity</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">Pressure</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Solenoid</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Status</th>
                <th scope="col" className="py-3 pl-3 pr-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] bg-white">
              {sensors.map((sensor) => {
                const isPinging = pingingId === sensor.id;
                return (
                  <tr
                    key={sensor.id}
                    className="h-[52px] transition-colors hover:bg-[#F8FAFC]"
                  >
                    <td className="py-2.5 pl-5 pr-3 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-xs font-semibold text-[#0F172A] tabular-nums">
                          {sensor.serial}
                        </span>
                        <span className="font-mono text-[11px] text-[#64748B] tabular-nums">
                          {sensor.macAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <EngineBadge engine={sensor.engine} />
                        <MonoCopyPill
                          value={sensor.engine === 'ORA' && sensor.oraclePk ? sensor.oraclePk : sensor.objectId}
                          truncate={sensor.engine === 'MDB'}
                          label={sensor.engine === 'ORA' ? 'Oracle Primary Key' : 'MongoDB ObjectId'}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[#0F172A]">{sensor.sector}</span>
                        <span className="font-mono text-[11px] text-[#64748B]">{sensor.cropBatch}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm font-medium text-[#0F172A] tabular-nums whitespace-nowrap">
                      {sensor.moisturePct.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm text-[#334155] tabular-nums whitespace-nowrap">
                      {sensor.salinityDsm.toFixed(2)} dS/m
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-sm text-[#334155] tabular-nums whitespace-nowrap">
                      {sensor.pressureBar.toFixed(2)} bar
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[11px] font-medium ${
                          sensor.solenoidOpen
                            ? 'bg-[#CCE5FF] text-[#004B73]'
                            : 'bg-[#F1F5F9] text-[#475569]'
                        }`}
                      >
                        {sensor.solenoidOpen ? 'OPEN' : 'CLOSED'}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <StatusBadge status={sensor.status} />
                    </td>
                    <td className="py-2.5 pl-3 pr-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onPingSensor(sensor.id)}
                          aria-label={`Ping sensor ${sensor.serial}`}
                          title={`Ping ${sensor.serial} (${sensor.latencyMs}ms)`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#475569] transition-colors hover:border-[#E2E8F0] hover:bg-white hover:text-[#059669] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
                        >
                          <Activity
                            className={`h-4 w-4 ${isPinging ? 'animate-spin text-[#059669]' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleSolenoid(sensor.id)}
                          aria-label={`Toggle solenoid valve for ${sensor.serial}`}
                          title={sensor.solenoidOpen ? 'Close irrigation solenoid' : 'Open irrigation solenoid'}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
                            sensor.solenoidOpen
                              ? 'border-[#006194]/30 bg-[#CCE5FF]/50 text-[#004B73] hover:bg-[#CCE5FF]'
                              : 'border-transparent text-[#475569] hover:border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
                          }`}
                        >
                          <Power className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onInspectSensor(sensor)}
                          aria-label={`Inspect JSON payload for ${sensor.serial}`}
                          title="Inspect JSON / Schema Payload"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#475569] transition-colors hover:border-[#E2E8F0] hover:bg-white hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]"
                        >
                          <Code2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
