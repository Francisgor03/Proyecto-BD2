import type {
  CropBatchRecord,
  DatabaseEngine,
  IrrigationValve,
  TelemetrySensor,
  TriageStatus,
} from '../types/telemetry';

export function truncateObjectId(objectId: string): string {
  const clean = objectId.trim();
  if (clean.length <= 12) return clean;
  return `${clean.slice(0, 4)}...${clean.slice(-4)}`;
}

export function evaluateSensorStatus(
  moisturePct: number,
  salinityDsm: number,
  pressureBar: number
): TriageStatus {
  if (
    moisturePct < 24 ||
    moisturePct > 72 ||
    salinityDsm >= 3.2 ||
    pressureBar < 1.1 ||
    pressureBar > 4.5
  ) {
    return 'Crítico';
  }
  if (
    moisturePct < 32 ||
    moisturePct > 62 ||
    salinityDsm >= 2.2 ||
    pressureBar < 1.6 ||
    pressureBar > 3.8
  ) {
    return 'Advertencia';
  }
  return 'Normal';
}

export interface SensorFilterCriteria {
  query: string;
  status: 'All' | TriageStatus;
  engine: 'All' | DatabaseEngine;
  sector?: string;
}

export function filterTelemetrySensors(
  sensors: TelemetrySensor[],
  criteria: SensorFilterCriteria
): TelemetrySensor[] {
  const q = criteria.query.trim().toLowerCase();
  return sensors.filter((s) => {
    if (criteria.status !== 'All' && s.status !== criteria.status) {
      return false;
    }
    if (criteria.engine !== 'All' && s.engine !== criteria.engine) {
      return false;
    }
    if (criteria.sector && criteria.sector !== 'All' && s.sector !== criteria.sector) {
      return false;
    }
    if (!q) return true;
    return (
      s.serial.toLowerCase().includes(q) ||
      s.objectId.toLowerCase().includes(q) ||
      (s.oraclePk && s.oraclePk.toLowerCase().includes(q)) ||
      s.sector.toLowerCase().includes(q) ||
      s.cropBatch.toLowerCase().includes(q) ||
      s.macAddress.toLowerCase().includes(q)
    );
  });
}

export interface KpiSummary {
  avgMoisturePct: number;
  activeNodes: number;
  totalNodes: number;
  uptimePct: number;
  criticalAlerts: number;
  warningAlerts: number;
  dailyFlowL: number;
}

export function calculateKpiSummary(
  sensors: TelemetrySensor[],
  valves: IrrigationValve[]
): KpiSummary {
  const totalNodes = sensors.length;
  const activeNodes = sensors.filter((s) => s.batteryPct > 0 && s.latencyMs > 0).length;
  const avgMoisturePct =
    totalNodes > 0
      ? Number(
          (sensors.reduce((acc, s) => acc + s.moisturePct, 0) / totalNodes).toFixed(1)
        )
      : 0;
  const uptimePct =
    totalNodes > 0 ? Number(((activeNodes / totalNodes) * 100).toFixed(1)) : 0;
  const criticalAlerts = sensors.filter((s) => s.status === 'Crítico').length;
  const warningAlerts = sensors.filter((s) => s.status === 'Advertencia').length;
  const dailyFlowL = valves.reduce((acc, v) => acc + v.dailyVolumeL, 0);

  return {
    avgMoisturePct,
    activeNodes,
    totalNodes,
    uptimePct,
    criticalAlerts,
    warningAlerts,
    dailyFlowL,
  };
}

export function generateMongoObjectId(seedOffset = 0): string {
  const timestampHex = Math.floor(Date.now() / 1000 + seedOffset)
    .toString(16)
    .padStart(8, '0')
    .slice(0, 8);
  const chars = '0123456789abcdef';
  let rest = '';
  for (let i = 0; i < 16; i++) {
    rest += chars[(Math.floor(Math.random() * 16) + i + seedOffset) % 16];
  }
  return `${timestampHex}${rest}`;
}

export function validateNewSensorInput(input: {
  serial: string;
  sector: string;
  moisturePct: string;
  salinityDsm: string;
  pressureBar: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const serialTrim = input.serial.trim();
  if (!serialTrim) {
    errors.serial = 'Sensor serial is required (e.g. SN-9021-A).';
  } else if (!/^[A-Z0-9-]{5,20}$/i.test(serialTrim)) {
    errors.serial = 'Serial must be 5–20 alphanumeric/hyphen characters.';
  }

  if (!input.sector.trim()) {
    errors.sector = 'Select a target field sector.';
  }

  const moisture = Number(input.moisturePct);
  if (input.moisturePct.trim() === '' || Number.isNaN(moisture) || moisture < 0 || moisture > 100) {
    errors.moisturePct = 'Moisture must be between 0 and 100%.';
  }

  const salinity = Number(input.salinityDsm);
  if (input.salinityDsm.trim() === '' || Number.isNaN(salinity) || salinity < 0 || salinity > 15) {
    errors.salinityDsm = 'Salinity must be between 0 and 15 dS/m.';
  }

  const pressure = Number(input.pressureBar);
  if (input.pressureBar.trim() === '' || Number.isNaN(pressure) || pressure < 0 || pressure > 10) {
    errors.pressureBar = 'Line pressure must be between 0 and 10 bar.';
  }

  return errors;
}

export function validateNewBatchInput(input: {
  batchCode: string;
  sector: string;
  cultivar: string;
  areaHa: string;
  targetMoistureMin: string;
  targetMoistureMax: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!input.batchCode.trim()) errors.batchCode = 'Batch code is required.';
  if (!input.sector.trim()) errors.sector = 'Sector is required.';
  if (!input.cultivar.trim()) errors.cultivar = 'Cultivar name is required.';

  const area = Number(input.areaHa);
  if (input.areaHa.trim() === '' || Number.isNaN(area) || area <= 0) {
    errors.areaHa = 'Area must be greater than 0 ha.';
  }

  const minM = Number(input.targetMoistureMin);
  const maxM = Number(input.targetMoistureMax);
  if (input.targetMoistureMin.trim() === '' || Number.isNaN(minM) || minM < 0 || minM > 100) {
    errors.targetMoistureMin = 'Enter valid min moisture (0-100%).';
  }
  if (input.targetMoistureMax.trim() === '' || Number.isNaN(maxM) || maxM < 0 || maxM > 100) {
    errors.targetMoistureMax = 'Enter valid max moisture (0-100%).';
  } else if (!Number.isNaN(minM) && maxM <= minM) {
    errors.targetMoistureMax = 'Max moisture must exceed min moisture.';
  }
  return errors;
}

export function evaluateBatchStatus(batch: Pick<CropBatchRecord, 'currentMoistureAvg' | 'targetMoistureMin' | 'targetMoistureMax'>): TriageStatus {
  if (
    batch.currentMoistureAvg < batch.targetMoistureMin - 6 ||
    batch.currentMoistureAvg > batch.targetMoistureMax + 8
  ) {
    return 'Crítico';
  }
  if (
    batch.currentMoistureAvg < batch.targetMoistureMin ||
    batch.currentMoistureAvg > batch.targetMoistureMax
  ) {
    return 'Advertencia';
  }
  return 'Normal';
}

export function formatCsvExport(headers: string[], rows: (string | number | boolean)[][]): string {
  const escapeCell = (val: string | number | boolean): string => {
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  return [
    headers.map(escapeCell).join(','),
    ...rows.map((r) => r.map(escapeCell).join(',')),
  ].join('\n');
}
