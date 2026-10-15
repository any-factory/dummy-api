import assert from 'node:assert/strict';
import { test } from 'node:test';
import { year } from '../../src/handlers/year.mjs';

const cases = [
  ['2026-10-15T12:00:00.000Z', 2026],
  ['2021-01-01T00:00:00.000Z', 2021],
  ['2018-12-31T12:00:00.000Z', 2018],
  ['2026-01-01T00:30:00.000Z', 2026],
  ['2026-12-31T23:30:00.000Z', 2026],
];

for (const [instant, result] of cases) {
  test(
    `year at ${instant} is ${result} regardless of host timezone`,
    { concurrency: false },
    (t) => {
      t.mock.timers.enable({ apis: ['Date'], now: Date.parse(instant) });

      const body = year();

      assert.deepEqual(body, { result });
      assert.ok(Number.isInteger(body.result));
    },
  );
}

test('year reads the clock again across New Year midnight UTC', { concurrency: false }, (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-12-31T23:59:59.999Z') });

  assert.deepEqual(year(), { result: 2026 });
  t.mock.timers.setTime(Date.parse('2027-01-01T00:00:00.000Z'));
  assert.deepEqual(year(), { result: 2027 });
});
