import { Droplets, Cpu, AlertTriangle, Waves } from 'lucide-react';
import type { KpiSummary } from '../utils/telemetry';

function MiniSparkline({
  points,
  strokeColor,
}: {
  points: number[];
  strokeColor: string;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const width = 76;
  const height = 24;
  const coords = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="shrink-0 overflow-visible"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={coords}
      />
    </svg>
  );
}

export function KpiSection({ kpi }: { kpi: KpiSummary }) {
  const cards = [
    {
      label: 'Avg. Soil Moisture',
      value: `${kpi.avgMoisturePct.toFixed(1)}%`,
      delta: '+3.2% vs target',
      deltaPositive: true,
      icon: Droplets,
      sparkline: [39.1, 40.4, 38.8, 41.2, 42.0, 41.6, kpi.avgMoisturePct],
      sparkColor: '#059669',
    },
    {
      label: 'Active IoT Nodes',
      value: `${kpi.activeNodes} / ${kpi.totalNodes}`,
      delta: `${kpi.uptimePct.toFixed(1)}% link uptime`,
      deltaPositive: true,
      icon: Cpu,
      sparkline: [6, 7, 7, 8, 8, 8, kpi.activeNodes],
      sparkColor: '#059669',
    },
    {
      label: 'Critical Alerts',
      value: `${kpi.criticalAlerts}`,
      delta: `${kpi.warningAlerts} warnings active`,
      deltaPositive: kpi.criticalAlerts === 0,
      icon: AlertTriangle,
      sparkline: [4, 3, 5, 3, 2, 3, kpi.criticalAlerts],
      sparkColor: kpi.criticalAlerts > 0 ? '#DC2626' : '#059669',
    },
    {
      label: 'Daily Irrigation Flow',
      value: `${kpi.dailyFlowL.toLocaleString('en-US')} L`,
      delta: '-4.1% water saved',
      deltaPositive: true,
      icon: Waves,
      sparkline: [19400, 18900, 19100, 18600, 18200, 18500, kpi.dailyFlowL],
      sparkColor: '#006194',
    },
  ];

  return (
    <section aria-label="Key Field Telemetry Metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium tracking-wide text-[#64748B]">
                {card.label}
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] tabular-nums">
              {card.value}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span
                className={`text-xs font-medium tabular-nums ${
                  card.deltaPositive ? 'text-[#059669]' : 'text-[#DC2626]'
                }`}
              >
                {card.delta}
              </span>
              <MiniSparkline points={card.sparkline} strokeColor={card.sparkColor} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
