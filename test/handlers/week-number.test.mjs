import assert from 'node:assert/strict';
import { test } from 'node:test';
import { weekNumber } from '../../src/handlers/week-number.mjs';

const cases = [
  ['2026-10-15T12:00:00.000Z', 42],
  ['2021-01-01T12:00:00.000Z', 53],
  ['2021-01-03T23:59:59.999Z', 53],
  ['2021-01-04T00:00:00.000Z', 1],
  ['2018-12-31T00:00:00.000Z', 1],
  ['2020-12-31T23:59:59.999Z', 53],
  ['2024-02-29T12:00:00.000Z', 9],
  ['2024-06-02T23:59:59.999Z', 22],
  ['2024-06-03T00:00:00.000Z', 23],
];

for (const [instant, result] of cases) {
  test(`week number at ${instant} is ${result} regardless of host timezone`, (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: Date.parse(instant) });

    assert.deepEqual(weekNumber(), { result });
  });
}

test('week number reads the clock again across Monday midnight UTC', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2024-06-02T23:59:59.999Z') });

  assert.deepEqual(weekNumber(), { result: 22 });
  t.mock.timers.setTime(Date.parse('2024-06-03T00:00:00.000Z'));
  assert.deepEqual(weekNumber(), { result: 23 });
});
