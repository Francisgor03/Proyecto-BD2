import test from 'node:test';
import assert from 'node:assert/strict';
import {
  truncateObjectId,
  evaluateSensorStatus,
  filterTelemetrySensors,
  calculateKpiSummary,
  validateNewSensorInput,
  formatCsvExport,
} from './telemetry';
import type { IrrigationValve, TelemetrySensor } from '../types/telemetry';

test('truncateObjectId shortens 24-char MongoDB ObjectIds cleanly', () => {
  assert.equal(truncateObjectId('507f191e810c19729de860ea'), '507f...60ea');
  assert.equal(truncateObjectId('ORA-4012'), 'ORA-4012');
});

test('evaluateSensorStatus classifies Normal, Advertencia, and Crítico thresholds', () => {
  assert.equal(evaluateSensorStatus(44.2, 1.4, 2.4), 'Normal');
  assert.equal(evaluateSensorStatus(29.5, 1.5, 2.3), 'Advertencia');
  assert.equal(evaluateSensorStatus(43.0, 2.5, 2.3), 'Advertencia');
  assert.equal(evaluateSensorStatus(19.0, 1.4, 2.3), 'Crítico');
  assert.equal(evaluateSensorStatus(45.0, 3.6, 2.3), 'Crítico');
  assert.equal(evaluateSensorStatus(45.0, 1.2, 0.8), 'Crítico');
});

const mockSensors: TelemetrySensor[] = [
  {
    id: '1',
    objectId: '507f191e810c19729de860ea',
    serial: 'SN-7749-X',
    macAddress: '00:1B:44:11:3A:B7',
    sector: 'Sector Norte-A',
    cropBatch: 'LOT-AVO-26',
    engine: 'MDB',
    moisturePct: 44.5,
    salinityDsm: 1.3,
    tempC: 21.4,
    pressureBar: 2.5,
    batteryPct: 92,
    rssiDbm: -68,
    solenoidOpen: false,
    status: 'Normal',
    lastPingIso: '2026-11-22T15:30:00Z',
    latencyMs: 28,
    payload: {},
  },
  {
    id: '2',
    objectId: '65a1b2c3d4e5f60718293a4b',
    oraclePk: 'ORA-PK-4012',
    serial: 'SN-3310-K',
    macAddress: '00:1B:44:11:9F:02',
    sector: 'Invernadero B2',
    cropBatch: 'LOT-TOM-14',
    engine: 'ORA',
    moisturePct: 19.2,
    salinityDsm: 3.4,
    tempC: 27.8,
    pressureBar: 0.9,
    batteryPct: 41,
    rssiDbm: -88,
    solenoidOpen: true,
    status: 'Crítico',
    lastPingIso: '2026-11-22T15:29:00Z',
    latencyMs: 112,
    payload: {},
  },
];

const mockValves: IrrigationValve[] = [
  {
    oraclePk: 'ORA-VLV-01',
    valveCode: 'VLV-N-01',
    sector: 'Sector Norte-A',
    zoneType: 'Drip Line',
    isOpen: true,
    flowRateLpm: 145,
    linePressureBar: 2.5,
    dailyVolumeL: 8400,
    nextCycle: '18:00',
    status: 'Normal',
  },
  {
    oraclePk: 'ORA-VLV-02',
    valveCode: 'VLV-B2-04',
    sector: 'Invernadero B2',
    zoneType: 'Micro-Mist',
    isOpen: false,
    flowRateLpm: 0,
    linePressureBar: 0.9,
    dailyVolumeL: 3200,
    nextCycle: '16:30',
    status: 'Crítico',
  },
];

test('filterTelemetrySensors filters by status, engine, and search query', () => {
  assert.equal(
    filterTelemetrySensors(mockSensors, { query: '', status: 'All', engine: 'All' }).length,
    2
  );
  assert.equal(
    filterTelemetrySensors(mockSensors, { query: '', status: 'Crítico', engine: 'All' }).length,
    1
  );
  assert.equal(
    filterTelemetrySensors(mockSensors, { query: '', status: 'All', engine: 'MDB' }).length,
    1
  );
  assert.equal(
    filterTelemetrySensors(mockSensors, { query: '7749', status: 'All', engine: 'All' })[0].serial,
    'SN-7749-X'
  );
});

test('calculateKpiSummary aggregates moisture, node counts, alerts, and flow', () => {
  const kpi = calculateKpiSummary(mockSensors, mockValves);
  assert.equal(kpi.avgMoisturePct, 31.9);
  assert.equal(kpi.activeNodes, 2);
  assert.equal(kpi.totalNodes, 2);
  assert.equal(kpi.criticalAlerts, 1);
  assert.equal(kpi.dailyFlowL, 11600);
});

test('validateNewSensorInput rejects empty/invalid values and accepts valid telemetry', () => {
  const emptyErrs = validateNewSensorInput({
    serial: '',
    sector: '',
    moisturePct: '',
    salinityDsm: '',
    pressureBar: '',
  });
  assert.ok(emptyErrs.serial);
  assert.ok(emptyErrs.sector);
  assert.ok(emptyErrs.moisturePct);

  const validErrs = validateNewSensorInput({
    serial: 'SN-9021-A',
    sector: 'Sector Norte-A',
    moisturePct: '42.5',
    salinityDsm: '1.4',
    pressureBar: '2.4',
  });
  assert.deepEqual(validErrs, {});
});

test('formatCsvExport properly escapes commas and quotes', () => {
  const csv = formatCsvExport(['Sector', 'Notes'], [['Norte, A', 'Valve "OK"']]);
  assert.equal(csv, 'Sector,Notes\n"Norte, A","Valve ""OK"""');
});
