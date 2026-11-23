import { useState, type FormEvent } from 'react';
import { Activity, Check, Copy, X } from 'lucide-react';
import { SECTORS } from '../data/seedData';
import type {
  CropBatchRecord,
  DatabaseEngine,
  TelemetrySensor,
} from '../types/telemetry';
import {
  evaluateBatchStatus,
  evaluateSensorStatus,
  generateMongoObjectId,
  validateNewBatchInput,
  validateNewSensorInput,
} from '../utils/telemetry';
import { EngineBadge, MonoCopyPill, StatusBadge } from './StatusBadges';

interface RegisterSensorModalProps {
  onClose: () => void;
  onAddSensor: (sensor: TelemetrySensor) => void;
}

export function RegisterSensorModal({ onClose, onAddSensor }: RegisterSensorModalProps) {
  const [serial, setSerial] = useState('');
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [engine, setEngine] = useState<DatabaseEngine>('MDB');
  const [moisturePct, setMoisturePct] = useState('');
  const [salinityDsm, setSalinityDsm] = useState('');
  const [pressureBar, setPressureBar] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateNewSensorInput({
      serial,
      sector,
      moisturePct,
      salinityDsm,
      pressureBar,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const moisture = Number(moisturePct);
    const salinity = Number(salinityDsm);
    const pressure = Number(pressureBar);
    const status = evaluateSensorStatus(moisture, salinity, pressure);
    const objectId = generateMongoObjectId(Math.floor(Math.random() * 999));
    const oraclePk =
      engine === 'ORA'
        ? `ORA-PK-${Math.floor(4050 + Math.random() * 900)}`
        : undefined;
    const cleanSerial = serial.trim().toUpperCase();
    const mac = `00:1B:44:${Math.floor(10 + Math.random() * 89)}:${Math.floor(10 + Math.random() * 89)}:A2`;

    const newSensor: TelemetrySensor = {
      id: `sen-${Date.now()}`,
      objectId,
      oraclePk,
      serial: cleanSerial,
      macAddress: mac,
      sector,
      cropBatch:
        sector === 'Sector Norte-A'
          ? 'LOT-AVO-26'
          : sector === 'Invernadero B2'
          ? 'LOT-TOM-14'
          : sector === 'Huerta Sur-C'
          ? 'LOT-CIT-09'
          : 'LOT-VIN-03',
      engine,
      moisturePct: moisture,
      salinityDsm: salinity,
      tempC: 22.4,
      pressureBar: pressure,
      batteryPct: 100,
      rssiDbm: -62,
      solenoidOpen: false,
      status,
      lastPingIso: new Date().toISOString(),
      latencyMs: 24,
      payload:
        engine === 'MDB'
          ? {
              _id: { $oid: objectId },
              device_serial: cleanSerial,
              gateway: 'GW-NORTH-01',
              telemetry: {
                vwc_soil_pct: moisture,
                ec_salinity_dsm: salinity,
                soil_temp_c: 22.4,
                valve_pressure_bar: pressure,
              },
            }
          : {
              ORACLE_PK: oraclePk,
              SCHEMA: 'AGRO_PROD.SENSOR_READINGS',
              SERIAL: cleanSerial,
              METRICS: {
                MOISTURE_PCT: moisture,
                SALINITY_DSM: salinity,
                PRESSURE_BAR: pressure,
              },
            },
    };

    onAddSensor(newSensor);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-sensor-title"
    >
      <div className="w-full max-w-[600px] rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 id="register-sensor-title" className="font-display text-xl font-semibold text-[#0F172A]">
              Register Telemetry Node
            </h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Provision a field probe into Oracle Enterprise or MongoDB Atlas ingestion.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Register Sensor dialog"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sensor-serial" className="block text-xs font-medium text-[#0F172A]">
                Sensor Serial
              </label>
              <input
                id="sensor-serial"
                type="text"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value);
                  if (errors.serial) setErrors((p) => ({ ...p, serial: '' }));
                }}
                placeholder="SN-9021-A"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.serial && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.serial}</p>
              )}
            </div>

            <div>
              <label htmlFor="sensor-sector" className="block text-xs font-medium text-[#0F172A]">
                Field Sector
              </label>
              <select
                id="sensor-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.sector && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.sector}</p>
              )}
            </div>
          </div>

          <div>
            <span className="block text-xs font-medium text-[#0F172A]">Storage Engine</span>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              {(['MDB', 'ORA'] as DatabaseEngine[]).map((eng) => (
                <button
                  key={eng}
                  type="button"
                  onClick={() => setEngine(eng)}
                  aria-pressed={engine === eng}
                  className={`flex h-10 items-center justify-between rounded-lg border px-3 text-sm font-medium transition-colors ${
                    engine === eng
                      ? 'border-[#059669] bg-[#059669]/8 text-[#065F46]'
                      : 'border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span>{eng === 'MDB' ? 'MongoDB Atlas' : 'Oracle Enterprise'}</span>
                  <EngineBadge engine={eng} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="sensor-moisture" className="block text-xs font-medium text-[#0F172A]">
                Soil Moisture (%)
              </label>
              <input
                id="sensor-moisture"
                type="number"
                step="0.1"
                value={moisturePct}
                onChange={(e) => {
                  setMoisturePct(e.target.value);
                  if (errors.moisturePct) setErrors((p) => ({ ...p, moisturePct: '' }));
                }}
                placeholder="42.5"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.moisturePct && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.moisturePct}</p>
              )}
            </div>

            <div>
              <label htmlFor="sensor-salinity" className="block text-xs font-medium text-[#0F172A]">
                EC Salinity (dS/m)
              </label>
              <input
                id="sensor-salinity"
                type="number"
                step="0.01"
                value={salinityDsm}
                onChange={(e) => {
                  setSalinityDsm(e.target.value);
                  if (errors.salinityDsm) setErrors((p) => ({ ...p, salinityDsm: '' }));
                }}
                placeholder="1.45"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.salinityDsm && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.salinityDsm}</p>
              )}
            </div>

            <div>
              <label htmlFor="sensor-pressure" className="block text-xs font-medium text-[#0F172A]">
                Line Pressure (bar)
              </label>
              <input
                id="sensor-pressure"
                type="number"
                step="0.01"
                value={pressureBar}
                onChange={(e) => {
                  setPressureBar(e.target.value);
                  if (errors.pressureBar) setErrors((p) => ({ ...p, pressureBar: '' }));
                }}
                placeholder="2.40"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.pressureBar && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.pressureBar}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F0] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-lg bg-[#059669] px-5 text-sm font-medium text-white hover:bg-[#047857] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2"
            >
              Provision Node
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface JsonInspectorModalProps {
  sensor: TelemetrySensor;
  onClose: () => void;
  onPingSensor: (id: string) => void;
}

export function JsonInspectorModal({
  sensor,
  onClose,
  onPingSensor,
}: JsonInspectorModalProps) {
  const [copiedJson, setCopiedJson] = useState(false);

  const formattedJson = JSON.stringify(
    {
      ...sensor.payload,
      live_state: {
        moisture_pct: sensor.moisturePct,
        salinity_dsm: sensor.salinityDsm,
        pressure_bar: sensor.pressureBar,
        solenoid_open: sensor.solenoidOpen,
        triage_status: sensor.status,
        last_ping_utc: sensor.lastPingIso,
        latency_ms: sensor.latencyMs,
      },
    },
    null,
    2
  );

  const handleCopyJson = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(formattedJson).catch(() => {});
    }
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-title"
    >
      <div className="w-full max-w-[600px] rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="inspector-title" className="font-display text-xl font-semibold text-[#0F172A]">
                {sensor.serial}
              </h2>
              <StatusBadge status={sensor.status} />
              <EngineBadge engine={sensor.engine} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
              <span>{sensor.sector}</span>
              <span aria-hidden="true">·</span>
              <MonoCopyPill
                value={sensor.engine === 'ORA' && sensor.oraclePk ? sensor.oraclePk : sensor.objectId}
                label="Record Key"
              />
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{sensor.latencyMs}ms RTT</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close payload inspector"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0F172A]">
              Raw {sensor.engine === 'MDB' ? 'BSON / JSON Document' : 'Oracle Relational Row'}
            </span>
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#334155] hover:bg-[#F1F5F9]"
            >
              {copiedJson ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#059669]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
          <pre className="mt-2 max-h-72 overflow-auto rounded-xl border border-[#E2E8F0] bg-[#0F172A] p-4 font-mono text-xs leading-relaxed text-[#E2E8F0]">
            {formattedJson}
          </pre>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#E2E8F0] pt-5">
          <button
            type="button"
            onClick={() => onPingSensor(sensor.id)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <Activity className="h-4 w-4 text-[#059669]" aria-hidden="true" />
            <span>Ping Node</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center rounded-lg bg-[#059669] px-5 text-sm font-medium text-white hover:bg-[#047857]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

interface AddBatchModalProps {
  onClose: () => void;
  onAddBatch: (batch: CropBatchRecord) => void;
}

export function AddBatchModal({ onClose, onAddBatch }: AddBatchModalProps) {
  const [batchCode, setBatchCode] = useState('');
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [cultivar, setCultivar] = useState('');
  const [areaHa, setAreaHa] = useState('');
  const [targetMoistureMin, setTargetMoistureMin] = useState('36');
  const [targetMoistureMax, setTargetMoistureMax] = useState('52');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateNewBatchInput({
      batchCode,
      sector,
      cultivar,
      areaHa,
      targetMoistureMin,
      targetMoistureMax,
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const minM = Number(targetMoistureMin);
    const maxM = Number(targetMoistureMax);
    const currentAvg = Number(((minM + maxM) / 2).toFixed(1));
    const area = Number(areaHa);

    const newBatch: CropBatchRecord = {
      oraclePk: `ORA-BAT-${Math.floor(105 + Math.random() * 890)}`,
      batchCode: batchCode.trim().toUpperCase(),
      sector,
      cultivar: cultivar.trim(),
      areaHa: area,
      plantedDate: new Date().toISOString().slice(0, 10),
      targetMoistureMin: minM,
      targetMoistureMax: maxM,
      currentMoistureAvg: currentAvg,
      yieldForecastTons: Number((area * 12.4).toFixed(1)),
      status: evaluateBatchStatus({
        currentMoistureAvg: currentAvg,
        targetMoistureMin: minM,
        targetMoistureMax: maxM,
      }),
    };

    onAddBatch(newBatch);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-batch-title"
    >
      <div className="w-full max-w-[600px] rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 id="add-batch-title" className="font-display text-xl font-semibold text-[#0F172A]">
              New Oracle Crop Batch
            </h2>
            <p className="mt-1 text-xs text-[#64748B]">
              Insert a structured planting lot into <code className="font-mono">AGRO_PROD.CROP_BATCHES</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close New Crop Batch dialog"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="batch-code" className="block text-xs font-medium text-[#0F172A]">
                Batch Code
              </label>
              <input
                id="batch-code"
                type="text"
                value={batchCode}
                onChange={(e) => {
                  setBatchCode(e.target.value);
                  if (errors.batchCode) setErrors((p) => ({ ...p, batchCode: '' }));
                }}
                placeholder="LOT-BER-31"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.batchCode && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.batchCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="batch-sector" className="block text-xs font-medium text-[#0F172A]">
                Sector
              </label>
              <select
                id="batch-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="batch-cultivar" className="block text-xs font-medium text-[#0F172A]">
              Cultivar / Variety
            </label>
            <input
              id="batch-cultivar"
              type="text"
              value={cultivar}
              onChange={(e) => {
                setCultivar(e.target.value);
                if (errors.cultivar) setErrors((p) => ({ ...p, cultivar: '' }));
              }}
              placeholder="Driscoll Albion Strawberry"
              className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
            />
            {errors.cultivar && (
              <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.cultivar}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="batch-area" className="block text-xs font-medium text-[#0F172A]">
                Area (ha)
              </label>
              <input
                id="batch-area"
                type="number"
                step="0.1"
                value={areaHa}
                onChange={(e) => {
                  setAreaHa(e.target.value);
                  if (errors.areaHa) setErrors((p) => ({ ...p, areaHa: '' }));
                }}
                placeholder="6.5"
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.areaHa && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.areaHa}</p>
              )}
            </div>

            <div>
              <label htmlFor="batch-min" className="block text-xs font-medium text-[#0F172A]">
                Min Moisture (%)
              </label>
              <input
                id="batch-min"
                type="number"
                value={targetMoistureMin}
                onChange={(e) => {
                  setTargetMoistureMin(e.target.value);
                  if (errors.targetMoistureMin) setErrors((p) => ({ ...p, targetMoistureMin: '' }));
                }}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.targetMoistureMin && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.targetMoistureMin}</p>
              )}
            </div>

            <div>
              <label htmlFor="batch-max" className="block text-xs font-medium text-[#0F172A]">
                Max Moisture (%)
              </label>
              <input
                id="batch-max"
                type="number"
                value={targetMoistureMax}
                onChange={(e) => {
                  setTargetMoistureMax(e.target.value);
                  if (errors.targetMoistureMax) setErrors((p) => ({ ...p, targetMoistureMax: '' }));
                }}
                className="mt-1.5 h-10 w-full rounded-lg border border-[#CBD5E1] bg-white px-3 font-mono text-sm text-[#0F172A] focus:border-[#059669] focus:outline-none focus:ring-3 focus:ring-[#059669]/15"
              />
              {errors.targetMoistureMax && (
                <p className="mt-1 text-xs font-medium text-[#DC2626]">{errors.targetMoistureMax}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#E2E8F0] pt-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center rounded-lg border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-lg bg-[#059669] px-5 text-sm font-medium text-white hover:bg-[#047857]"
            >
              Save Crop Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
