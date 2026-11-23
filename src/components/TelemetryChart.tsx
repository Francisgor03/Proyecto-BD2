import { useState } from 'react';
import { TELEMETRY_SERIES } from '../data/seedData';
import type { TimeSeriesPoint } from '../types/telemetry';

type MetricKey = 'moisture' | 'salinity' | 'temp' | 'pressure';
type TimeRange = '6H' | '24H' | '7D';

const METRIC_META: Record<
  MetricKey,
  { label: string; unit: string; color: string; fill: string; targetLabel: string }
> = {
  moisture: {
    label: 'Soil Moisture',
    unit: '%',
    color: '#059669',
    fill: 'rgba(5, 150, 105, 0.12)',
    targetLabel: 'Optimal window: 35% – 55%',
  },
  salinity: {
    label: 'EC Salinity',
    unit: 'dS/m',
    color: '#D97706',
    fill: 'rgba(217, 119, 6, 0.12)',
    targetLabel: 'Threshold limit: 2.2 dS/m',
  },
  temp: {
    label: 'Ambient Temp',
    unit: '°C',
    color: '#006194',
    fill: 'rgba(0, 97, 148, 0.12)',
    targetLabel: 'Ideal canopy range: 18°C – 26°C',
  },
  pressure: {
    label: 'Valve Pressure',
    unit: 'bar',
    color: '#0F172A',
    fill: 'rgba(15, 23, 42, 0.08)',
    targetLabel: 'Nominal line head: 2.2 – 2.8 bar',
  },
};

export function TelemetryChart() {
  const [metric, setMetric] = useState<MetricKey>('moisture');
  const [range, setRange] = useState<TimeRange>('24H');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const series: TimeSeriesPoint[] = TELEMETRY_SERIES[range];
  const meta = METRIC_META[metric];

  const values = series.map((pt) => pt[metric]);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const pad = (maxVal - minVal) * 0.25 || 1;
  const yMax = maxVal + pad;
  const yMin = Math.max(0, minVal - pad);
  const yRange = yMax - yMin || 1;

  const svgWidth = 760;
  const svgHeight = 220;
  const padL = 44;
  const padR = 20;
  const padT = 16;
  const padB = 32;
  const plotW = svgWidth - padL - padR;
  const plotH = svgHeight - padT - padB;

  const coords = series.map((pt, i) => {
    const x = padL + (i / (series.length - 1)) * plotW;
    const y = padT + plotH - ((pt[metric] - yMin) / yRange) * plotH;
    return { x, y, point: pt };
  });

  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(padT + plotH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

  const yTicks = [0, 0.5, 1].map((t) => {
    const val = yMin + (1 - t) * yRange;
    const y = padT + t * plotH;
    return { val, y };
  });

  const activePoint = hoveredIdx !== null ? coords[hoveredIdx] : coords[coords.length - 1];

  return (
    <section
      aria-label="Field Telemetry Time-Series"
      className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-[#0F172A]">
            Multi-Zone Telemetry Stream
          </h2>
          <p className="mt-0.5 text-xs text-[#64748B]">{meta.targetLabel}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Metric selector */}
          <div
            role="tablist"
            aria-label="Select telemetry metric"
            className="flex flex-wrap items-center gap-1 rounded-lg bg-[#F1F5F9] p-1"
          >
            {(Object.keys(METRIC_META) as MetricKey[]).map((key) => {
              const active = metric === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setMetric(key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] ${
                    active
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {METRIC_META[key].label}
                </button>
              );
            })}
          </div>

          {/* Time range */}
          <div
            role="group"
            aria-label="Select timeframe"
            className="flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white p-1"
          >
            {(['6H', '24H', '7D'] as TimeRange[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  range === r
                    ? 'bg-[#0F172A] text-white'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active readout bar */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#475569]">
        <span className="font-medium text-[#0F172A]">
          {hoveredIdx !== null ? 'Selected sample:' : 'Latest reading:'}
        </span>
        <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
          {activePoint.point[metric].toFixed(metric === 'moisture' || metric === 'temp' ? 1 : 2)}{' '}
          {meta.unit}
        </span>
        <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
        <span className="font-mono text-[#64748B] tabular-nums">{activePoint.point.label}</span>
      </div>

      {/* Responsive SVG chart */}
      <div className="mt-3 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="h-56 w-full min-w-[540px]"
          role="img"
          aria-label={`${meta.label} over ${range}`}
        >
          {/* Grid lines */}
          {yTicks.map((tick, idx) => (
            <g key={idx}>
              <line
                x1={padL}
                y1={tick.y}
                x2={svgWidth - padR}
                y2={tick.y}
                stroke="#E2E8F0"
                strokeDasharray="3 3"
              />
              <text
                x={padL - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="fill-[#64748B] font-mono text-[10px]"
              >
                {tick.val.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Area & Line */}
          <path d={areaPath} fill={meta.fill} />
          <path
            d={linePath}
            fill="none"
            stroke={meta.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X labels & interactive hover targets */}
          {coords.map((c, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g key={c.point.label}>
                <text
                  x={c.x}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  className="fill-[#64748B] font-mono text-[11px]"
                >
                  {c.point.label}
                </text>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered ? 6 : 4}
                  fill="#FFFFFF"
                  stroke={meta.color}
                  strokeWidth={isHovered ? 3 : 2}
                />
                <rect
                  x={c.x - 24}
                  y={padT}
                  width={48}
                  height={plotH + 16}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
