import assert from 'node:assert/strict';
import { test } from 'node:test';
import { daysInMonth } from '../../src/handlers/days-in-month.mjs';

const cases = [
  ['2026-10-15T12:00:00.000Z', 31],
  ['2026-04-15T12:00:00.000Z', 30],
  ['2023-02-01T00:00:00.000Z', 28],
  ['2023-02-28T23:59:59.999Z', 28],
  ['2024-02-01T00:00:00.000Z', 29],
  ['2024-02-29T23:59:59.999Z', 29],
  ['1900-02-15T12:00:00.000Z', 28],
  ['2000-02-15T12:00:00.000Z', 29],
  ['2024-03-01T00:00:00.000Z', 31],
  ['2024-04-30T23:59:59.999Z', 30],
  ['2024-12-31T23:59:59.999Z', 31],
  ['2025-01-01T00:00:00.000Z', 31],
];

for (const [instant, result] of cases) {
  test(`days in month at ${instant} is ${result} regardless of host timezone`, (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: new Date(instant) });

    assert.deepEqual(daysInMonth(), { result });
  });
}

test('days in month reads the clock again across month-end midnight UTC', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2024-02-29T23:59:59.999Z') });

  assert.deepEqual(daysInMonth(), { result: 29 });
  t.mock.timers.setTime(Date.parse('2024-03-01T00:00:00.000Z'));
  assert.deepEqual(daysInMonth(), { result: 31 });
});
