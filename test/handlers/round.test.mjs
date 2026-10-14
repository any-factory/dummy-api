import assert from 'node:assert/strict';
import { test } from 'node:test';
import { round } from '../../src/handlers/round.mjs';

test('round handler returns 3.14 for 3.14159 rounded to two decimal places', () => {
  assert.deepEqual(round(), { result: 3.14 });
});
