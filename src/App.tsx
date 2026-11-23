import { useEffect, useMemo, useState } from 'react';
import {
  INITIAL_BATCHES,
  INITIAL_GATEWAY_LOGS,
  INITIAL_INVOICES,
  INITIAL_PARCELS,
  INITIAL_SENSORS,
  INITIAL_VALVES,
  SECTORS,
} from './data/seedData';
import type {
  CropBatchRecord,
  DatabaseEngine,
  IrrigationValve,
  NavSectionId,
  TelemetrySensor,
  TriageStatus,
} from './types/telemetry';
import {
  calculateKpiSummary,
  evaluateSensorStatus,
  filterTelemetrySensors,
  generateMongoObjectId,
} from './utils/telemetry';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { KpiSection } from './components/KpiSection';
import { TelemetryChart } from './components/TelemetryChart';
import { SensorTable } from './components/SensorTable';
import {
  OracleBatchesView,
  OracleBillingView,
  OracleIrrigationView,
} from './components/OracleViews';
import {
  MongoGeoJsonView,
  MongoLogsView,
  MongoStreamsView,
} from './components/MongoViews';
import {
  AddBatchModal,
  JsonInspectorModal,
  RegisterSensorModal,
} from './components/Modals';

const STORAGE_KEYS = {
  sensors: 'agrosmart_sensors_v1',
  batches: 'agrosmart_batches_v1',
  valves: 'agrosmart_valves_v1',
};

function loadStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSectionId>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [sensors, setSensors] = useState<TelemetrySensor[]>(() =>
    loadStored(STORAGE_KEYS.sensors, INITIAL_SENSORS)
  );
  const [batches, setBatches] = useState<CropBatchRecord[]>(() =>
    loadStored(STORAGE_KEYS.batches, INITIAL_BATCHES)
  );
  const [valves, setValves] = useState<IrrigationValve[]>(() =>
    loadStored(STORAGE_KEYS.valves, INITIAL_VALVES)
  );

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | TriageStatus>('All');
  const [engineFilter, setEngineFilter] = useState<'All' | DatabaseEngine>('All');

  const [pingingId, setPingingId] = useState<string | null>(null);
  const [inspectedSensorId, setInspectedSensorId] = useState<string | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [addBatchModalOpen, setAddBatchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.sensors, JSON.stringify(sensors));
    } catch {
      // Ignore storage quota errors
    }
  }, [sensors]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.batches, JSON.stringify(batches));
    } catch {
      // Ignore storage quota errors
    }
  }, [batches]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.valves, JSON.stringify(valves));
    } catch {
      // Ignore storage quota errors
    }
  }, [valves]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const kpi = useMemo(() => calculateKpiSummary(sensors, valves), [sensors, valves]);

  const filteredSensors = useMemo(
    () =>
      filterTelemetrySensors(sensors, {
        query,
        status: statusFilter,
        engine: engineFilter,
      }),
    [sensors, query, statusFilter, engineFilter]
  );

  const inspectedSensor = useMemo(
    () => sensors.find((s) => s.id === inspectedSensorId) ?? null,
    [sensors, inspectedSensorId]
  );

  const handlePingSensor = (id: string) => {
    setPingingId(id);
    setTimeout(() => {
      setSensors((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          const nextLatency = Math.max(16, Math.round(18 + Math.random() * 48));
          return {
            ...s,
            latencyMs: nextLatency,
            lastPingIso: new Date().toISOString(),
          };
        })
      );
      setPingingId(null);
      const target = sensors.find((s) => s.id === id);
      if (target) {
        showToast(`Ping verified for ${target.serial}`);
      }
    }, 350);
  };

  const handleToggleSolenoid = (id: string) => {
    setSensors((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextOpen = !s.solenoidOpen;
        showToast(`${s.serial} irrigation solenoid ${nextOpen ? 'opened' : 'closed'}`);
        return {
          ...s,
          solenoidOpen: nextOpen,
          pressureBar: nextOpen
            ? Number((s.pressureBar + 0.18).toFixed(2))
            : Number(Math.max(1.2, s.pressureBar - 0.14).toFixed(2)),
        };
      })
    );
  };

  const handleAddSensor = (newSensor: TelemetrySensor) => {
    setSensors((prev) => [newSensor, ...prev]);
    showToast(`Provisioned ${newSensor.serial} (${newSensor.engine})`);
  };

  const handleAddBatch = (newBatch: CropBatchRecord) => {
    setBatches((prev) => [newBatch, ...prev]);
    showToast(`Saved crop batch ${newBatch.batchCode} (${newBatch.oraclePk})`);
  };

  const handleToggleValve = (oraclePk: string) => {
    setValves((prev) =>
      prev.map((v) => {
        if (v.oraclePk !== oraclePk) return v;
        const nextOpen = !v.isOpen;
        const nextFlow = nextOpen ? 148 : 0;
        const nextPressure = nextOpen ? 2.48 : 2.15;
        showToast(`Valve ${v.valveCode} ${nextOpen ? 'opened' : 'closed'}`);
        return {
          ...v,
          isOpen: nextOpen,
          flowRateLpm: nextFlow,
          linePressureBar: v.status === 'Crítico' && nextOpen ? 1.85 : nextPressure,
          dailyVolumeL: nextOpen ? v.dailyVolumeL + 120 : v.dailyVolumeL,
          status: nextOpen && v.status === 'Crítico' ? 'Normal' : v.status,
        };
      })
    );
  };

  const handleSimulateMongoReading = () => {
    const sector = SECTORS[sensors.length % SECTORS.length];
    const moisture = Number((34 + Math.random() * 20).toFixed(1));
    const salinity = Number((1.2 + Math.random() * 1.4).toFixed(2));
    const pressure = Number((2.1 + Math.random() * 0.7).toFixed(2));
    const objectId = generateMongoObjectId(sensors.length + 11);
    const serial = `SN-${Math.floor(7000 + Math.random() * 2900)}-M`;
    const status = evaluateSensorStatus(moisture, salinity, pressure);

    const newReading: TelemetrySensor = {
      id: `sen-${Date.now()}`,
      objectId,
      serial,
      macAddress: `00:1B:44:22:${Math.floor(10 + Math.random() * 89)}:F1`,
      sector,
      cropBatch: 'LOT-AVO-26',
      engine: 'MDB',
      moisturePct: moisture,
      salinityDsm: salinity,
      tempC: 22.1,
      pressureBar: pressure,
      batteryPct: 95,
      rssiDbm: -66,
      solenoidOpen: false,
      status,
      lastPingIso: new Date().toISOString(),
      latencyMs: 26,
      payload: {
        _id: { $oid: objectId },
        device_serial: serial,
        gateway: 'GW-NORTH-01',
        telemetry: {
          vwc_soil_pct: moisture,
          ec_salinity_dsm: salinity,
          soil_temp_c: 22.1,
          valve_pressure_bar: pressure,
        },
      },
    };

    setSensors((prev) => [newReading, ...prev]);
    showToast(`Ingested BSON document ${serial}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        criticalCount={kpi.criticalAlerts}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          activeSection={activeSection}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenRegisterSensor={() => setRegisterModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto space-y-6">
          {activeSection === 'overview' && (
            <>
              <div className="flex flex-col gap-1">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-[#0F172A]">
                  Agronomic Operations Console
                </h1>
                <p className="text-sm text-[#64748B]">
                  Live soil moisture, salinity, and solenoid telemetry across Oracle Enterprise and MongoDB Atlas nodes.
                </p>
              </div>
              <KpiSection kpi={kpi} />
              <TelemetryChart />
              <SensorTable
                sensors={filteredSensors}
                query={query}
                onQueryChange={setQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                engineFilter={engineFilter}
                onEngineFilterChange={setEngineFilter}
                onPingSensor={handlePingSensor}
                onToggleSolenoid={handleToggleSolenoid}
                onInspectSensor={(s) => setInspectedSensorId(s.id)}
                pingingId={pingingId}
              />
            </>
          )}

          {activeSection === 'ora-batches' && (
            <OracleBatchesView
              batches={batches}
              onOpenAddBatch={() => setAddBatchModalOpen(true)}
            />
          )}

          {activeSection === 'ora-irrigation' && (
            <OracleIrrigationView
              valves={valves}
              onToggleValve={handleToggleValve}
            />
          )}

          {activeSection === 'ora-billing' && (
            <OracleBillingView invoices={INITIAL_INVOICES} />
          )}

          {activeSection === 'mdb-streams' && (
            <MongoStreamsView
              sensors={sensors}
              onInspectSensor={(s) => setInspectedSensorId(s.id)}
              onSimulateReading={handleSimulateMongoReading}
            />
          )}

          {activeSection === 'mdb-logs' && (
            <MongoLogsView logs={INITIAL_GATEWAY_LOGS} />
          )}

          {activeSection === 'mdb-geojson' && (
            <MongoGeoJsonView parcels={INITIAL_PARCELS} />
          )}
        </main>
      </div>

      {registerModalOpen && (
        <RegisterSensorModal
          onClose={() => setRegisterModalOpen(false)}
          onAddSensor={handleAddSensor}
        />
      )}

      {addBatchModalOpen && (
        <AddBatchModal
          onClose={() => setAddBatchModalOpen(false)}
          onAddBatch={handleAddBatch}
        />
      )}

      {inspectedSensor && (
        <JsonInspectorModal
          sensor={inspectedSensor}
          onClose={() => setInspectedSensorId(null)}
          onPingSensor={handlePingSensor}
        />
      )}

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 rounded-xl border border-[#E2E8F0] bg-[#0F172A] px-4 py-3 text-xs font-medium text-white shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
