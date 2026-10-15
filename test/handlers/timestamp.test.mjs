import assert from 'node:assert/strict';
import { test } from 'node:test';
import { timestamp } from '../../src/handlers/timestamp.mjs';

const cases = [
  [0, 0],
  [999, 0],
  [1000, 1],
  [1700000000999, 1700000000],
  [1700000001000, 1700000001],
];

for (const [now, result] of cases) {
  test(`timestamp at ${now} milliseconds is ${result} whole Unix seconds`, (t) => {
    t.mock.timers.enable({ apis: ['Date'], now });

    assert.deepEqual(timestamp(), { result });
  });
}

test('timestamp reads the clock again across a second boundary', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 1700000000999 });

  assert.deepEqual(timestamp(), { result: 1700000000 });
  t.mock.timers.setTime(1700000001000);
  assert.deepEqual(timestamp(), { result: 1700000001 });
});
