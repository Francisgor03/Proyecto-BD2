export type TriageStatus = 'Normal' | 'Advertencia' | 'Crítico';
export type DatabaseEngine = 'ORA' | 'MDB';

export type NavSectionId =
  | 'overview'
  | 'ora-batches'
  | 'ora-irrigation'
  | 'ora-billing'
  | 'mdb-streams'
  | 'mdb-logs'
  | 'mdb-geojson';

export interface TelemetrySensor {
  id: string;
  objectId: string; // 24-char hex MongoDB ObjectId or Oracle PK ref
  oraclePk?: string;
  serial: string; // e.g., SN-7749-X
  macAddress: string;
  sector: string;
  cropBatch: string;
  engine: DatabaseEngine;
  moisturePct: number;
  salinityDsm: number;
  tempC: number;
  pressureBar: number;
  batteryPct: number;
  rssiDbm: number;
  solenoidOpen: boolean;
  status: TriageStatus;
  lastPingIso: string;
  latencyMs: number;
  payload: Record<string, unknown>;
}

export interface CropBatchRecord {
  oraclePk: string;
  batchCode: string;
  sector: string;
  cultivar: string;
  areaHa: number;
  plantedDate: string;
  targetMoistureMin: number;
  targetMoistureMax: number;
  currentMoistureAvg: number;
  yieldForecastTons: number;
  status: TriageStatus;
}

export interface IrrigationValve {
  oraclePk: string;
  valveCode: string;
  sector: string;
  zoneType: string;
  isOpen: boolean;
  flowRateLpm: number;
  linePressureBar: number;
  dailyVolumeL: number;
  nextCycle: string;
  status: TriageStatus;
}

export interface ResourceQuotaInvoice {
  oraclePk: string;
  invoiceCode: string;
  sector: string;
  period: string;
  waterAllocatedL: number;
  waterConsumedL: number;
  energyKwh: number;
  estimatedUsd: number;
  status: TriageStatus;
}

export interface GatewayLogEntry {
  objectId: string;
  timestampIso: string;
  gatewayId: string;
  macAddress: string;
  firmware: string;
  rssiDbm: number;
  batteryV: number;
  eventType: string;
  message: string;
  status: TriageStatus;
}

export interface GeoJsonParcel {
  objectId: string;
  parcelCode: string;
  name: string;
  cultivar: string;
  areaHa: number;
  avgMoisturePct: number;
  activeNodes: number;
  status: TriageStatus;
  svgPoints: string; // Polygon points in 0..800 x 0..460 viewBox
  labelX: number;
  labelY: number;
  coordinates: [number, number][]; // Real lon/lat ring
  sensors: {
    serial: string;
    x: number;
    y: number;
    moisturePct: number;
    status: TriageStatus;
  }[];
}

export interface TimeSeriesPoint {
  label: string;
  moisture: number;
  salinity: number;
  temp: number;
  pressure: number;
}
