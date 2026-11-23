import { useState } from 'react';
import { Code2, Radio, Layers, MapPin } from 'lucide-react';
import type {
  GatewayLogEntry,
  GeoJsonParcel,
  TelemetrySensor,
  TriageStatus,
} from '../types/telemetry';
import { EngineBadge, MonoCopyPill, StatusBadge } from './StatusBadges';

export function MongoStreamsView({
  sensors,
  onInspectSensor,
  onSimulateReading,
}: {
  sensors: TelemetrySensor[];
  onInspectSensor: (sensor: TelemetrySensor) => void;
  onSimulateReading: () => void;
}) {
  const mdbSensors = sensors.filter((s) => s.engine === 'MDB');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              MongoDB Telemetry Streams
            </h1>
            <EngineBadge engine="MDB" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            Unstructured BSON document collection <code className="font-mono text-xs text-[#334155]">agro_atlas.sensor_streams</code> with 24-hex ObjectIds.
          </p>
        </div>

        <button
          type="button"
          onClick={onSimulateReading}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC] hover:border-[#CBD5E1] whitespace-nowrap shrink-0"
        >
          <Radio className="h-4 w-4 text-[#059669]" aria-hidden="true" />
          <span>Ingest Sample Document</span>
        </button>
      </div>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th scope="col" className="py-3 pl-5 pr-3 whitespace-nowrap">_id (ObjectId)</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Device Serial</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Sector</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">VWC %</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">EC (dS/m)</th>
                <th scope="col" className="px-3 py-3 text-right whitespace-nowrap">RSSI</th>
                <th scope="col" className="px-3 py-3 whitespace-nowrap">Status</th>
                <th scope="col" className="py-3 pl-3 pr-5 text-right whitespace-nowrap">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {mdbSensors.map((s) => (
                <tr key={s.id} className="h-[52px] hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-2.5 pl-5 pr-3 whitespace-nowrap">
                    <MonoCopyPill value={s.objectId} truncate label="MongoDB ObjectId" />
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                    {s.serial}
                  </td>
                  <td className="px-3 py-2.5 text-[#334155] whitespace-nowrap">{s.sector}</td>
                  <td className="px-3 py-2.5 text-right font-mono font-medium tabular-nums text-[#0F172A] whitespace-nowrap">
                    {s.moisturePct.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#334155] whitespace-nowrap">
                    {s.salinityDsm.toFixed(2)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono tabular-nums text-[#64748B] whitespace-nowrap">
                    {s.rssiDbm} dBm
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="py-2.5 pl-3 pr-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onInspectSensor(s)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2.5 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
                    >
                      <Code2 className="h-3.5 w-3.5 text-[#059669]" aria-hidden="true" />
                      <span>Inspect JSON</span>
                    </button>
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

export function MongoLogsView({ logs }: { logs: GatewayLogEntry[] }) {
  const [severity, setSeverity] = useState<'All' | TriageStatus>('All');

  const filtered = severity === 'All' ? logs : logs.filter((l) => l.status === severity);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              Device &amp; Gateway Logs
            </h1>
            <EngineBadge engine="MDB" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            LoRaWAN &amp; MQTT concentrator event stream from <code className="font-mono text-xs text-[#334155]">agro_atlas.gateway_logs</code>.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter logs by severity"
          className="flex items-center gap-1 rounded-lg bg-[#F1F5F9] p-1 self-start sm:self-auto"
        >
          {(['All', 'Normal', 'Advertencia', 'Crítico'] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSeverity(opt)}
              aria-pressed={severity === opt}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                severity === opt
                  ? 'bg-white text-[#0F172A] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <section className="rounded-2xl border border-[#E2E8F0] bg-white divide-y divide-[#F1F5F9] shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] overflow-hidden">
        {filtered.map((entry) => (
          <div key={entry.objectId} className="p-5 hover:bg-[#F8FAFC] transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge status={entry.status} />
                <span className="font-mono text-xs font-semibold text-[#0F172A]">
                  {entry.gatewayId}
                </span>
                <MonoCopyPill value={entry.objectId} truncate label="Log ObjectId" />
                <span className="font-mono text-xs text-[#64748B]">{entry.eventType}</span>
              </div>
              <span className="font-mono text-xs text-[#64748B] tabular-nums">
                {entry.timestampIso}
              </span>
            </div>
            <p className="mt-2.5 text-sm text-[#334155]">{entry.message}</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-[11px] text-[#64748B] tabular-nums">
              <span>MAC: {entry.macAddress}</span>
              <span aria-hidden="true">·</span>
              <span>FW: {entry.firmware}</span>
              <span aria-hidden="true">·</span>
              <span>RSSI: {entry.rssiDbm} dBm</span>
              <span aria-hidden="true">·</span>
              <span>Rail: {entry.batteryV.toFixed(1)} V</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export function MongoGeoJsonView({ parcels }: { parcels: GeoJsonParcel[] }) {
  const [selectedCode, setSelectedCode] = useState<string>(parcels[0]?.parcelCode ?? '');
  const [showPins, setShowPins] = useState(true);

  const selected = parcels.find((p) => p.parcelCode === selectedCode) ?? parcels[0];

  const parcelColors: Record<TriageStatus, { fill: string; stroke: string }> = {
    Normal: { fill: 'rgba(5, 150, 105, 0.14)', stroke: '#059669' },
    Advertencia: { fill: 'rgba(217, 119, 6, 0.16)', stroke: '#D97706' },
    Crítico: { fill: 'rgba(220, 38, 38, 0.16)', stroke: '#DC2626' },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
              GeoJSON Field Boundaries
            </h1>
            <EngineBadge engine="MDB" />
          </div>
          <p className="mt-1 text-sm text-[#64748B]">
            2dsphere polygon boundaries in <code className="font-mono text-xs text-[#334155]">agro_atlas.field_parcels</code>. Click a parcel to inspect coordinates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPins((prev) => !prev)}
          aria-pressed={showPins}
          className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
            showPins
              ? 'border-[#059669]/30 bg-[#DEF7EC] text-[#03543F]'
              : 'border-[#E2E8F0] bg-white text-[#475569]'
          }`}
        >
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>{showPins ? 'Sensor Pins Visible' : 'Show Sensor Pins'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Interactive SVG GeoJSON parcel map */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
          <div className="mb-3 flex items-center justify-between text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-medium text-[#0F172A]">
              <Layers className="h-4 w-4 text-[#059669]" aria-hidden="true" />
              Spatial Parcel Overlay (WGS84)
            </span>
            <span className="font-mono tabular-nums">49.5 ha total surveyed</span>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
            <svg
              viewBox="0 0 800 455"
              className="w-full h-auto block"
              role="img"
              aria-label="Interactive GeoJSON field parcel map"
            >
              {/* Coordinate grid lines */}
              {[90, 180, 270, 360].map((y) => (
                <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#E2E8F0" strokeWidth="1" />
              ))}
              {[160, 320, 480, 640].map((x) => (
                <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="455" stroke="#E2E8F0" strokeWidth="1" />
              ))}

              {/* Parcel polygons */}
              {parcels.map((parcel) => {
                const isSelected = parcel.parcelCode === selected.parcelCode;
                const style = parcelColors[parcel.status];
                return (
                  <g key={parcel.parcelCode}>
                    <polygon
                      points={parcel.svgPoints}
                      fill={style.fill}
                      stroke={style.stroke}
                      strokeWidth={isSelected ? 3 : 1.75}
                      className="cursor-pointer transition-opacity hover:opacity-90"
                      onClick={() => setSelectedCode(parcel.parcelCode)}
                    />
                    <text
                      x={parcel.labelX}
                      y={parcel.labelY - 6}
                      textAnchor="middle"
                      className="pointer-events-none fill-[#0F172A] font-display text-sm font-semibold"
                    >
                      {parcel.name}
                    </text>
                    <text
                      x={parcel.labelX}
                      y={parcel.labelY + 14}
                      textAnchor="middle"
                      className="pointer-events-none fill-[#475569] font-mono text-xs"
                    >
                      {parcel.areaHa.toFixed(1)} ha · {parcel.avgMoisturePct.toFixed(1)}% VWC
                    </text>

                    {showPins &&
                      parcel.sensors.map((pin) => {
                        const pinColor =
                          pin.status === 'Normal'
                            ? '#059669'
                            : pin.status === 'Advertencia'
                            ? '#D97706'
                            : '#DC2626';
                        return (
                          <g key={pin.serial} className="pointer-events-none">
                            <circle
                              cx={pin.x}
                              cy={pin.y}
                              r="7"
                              fill="#FFFFFF"
                              stroke={pinColor}
                              strokeWidth="3"
                            />
                            <text
                              x={pin.x}
                              y={pin.y + 20}
                              textAnchor="middle"
                              className="fill-[#0F172A] font-mono text-[10px] font-semibold"
                            >
                              {pin.serial}
                            </text>
                          </g>
                        );
                      })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Parcel quick selector buttons for keyboard accessibility */}
          <div className="mt-4 flex flex-wrap gap-2">
            {parcels.map((p) => (
              <button
                key={p.parcelCode}
                type="button"
                onClick={() => setSelectedCode(p.parcelCode)}
                aria-pressed={p.parcelCode === selected.parcelCode}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  p.parcelCode === selected.parcelCode
                    ? 'border-[#059669] bg-[#059669]/10 text-[#065F46]'
                    : 'border-[#E2E8F0] bg-white text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected parcel GeoJSON inspector */}
        <div className="lg:col-span-5 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)] flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <MonoCopyPill value={selected.objectId} truncate label="Parcel ObjectId" />
              <h2 className="mt-2 font-display text-lg font-semibold text-[#0F172A]">
                {selected.name}
              </h2>
              <p className="text-xs text-[#64748B]">
                {selected.cultivar} · {selected.activeNodes} active sensors
              </p>
            </div>
            <StatusBadge status={selected.status} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
            <div>
              <span className="text-[11px] font-medium text-[#64748B]">Surveyed Area</span>
              <p className="font-mono text-base font-semibold text-[#0F172A] tabular-nums">
                {selected.areaHa.toFixed(1)} ha
              </p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#64748B]">Mean Soil Moisture</span>
              <p className="font-mono text-base font-semibold text-[#0F172A] tabular-nums">
                {selected.avgMoisturePct.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="mt-4 flex-1 flex flex-col">
            <span className="text-xs font-semibold text-[#0F172A]">GeoJSON Feature Document</span>
            <pre className="mt-2 flex-1 overflow-x-auto rounded-xl border border-[#E2E8F0] bg-[#0F172A] p-4 font-mono text-xs leading-relaxed text-[#E2E8F0]">
              {JSON.stringify(
                {
                  _id: { $oid: selected.objectId },
                  parcelCode: selected.parcelCode,
                  type: 'Feature',
                  properties: {
                    sector: selected.name,
                    cultivar: selected.cultivar,
                    area_ha: selected.areaHa,
                  },
                  geometry: {
                    type: 'Polygon',
                    coordinates: [selected.coordinates],
                  },
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
