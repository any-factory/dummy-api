import assert from 'node:assert/strict';
import { test } from 'node:test';
import { power } from '../../src/handlers/power.mjs';

test('power handler returns 1024 for 2 to the power of 10', () => {
  assert.deepEqual(power(), { result: 1024 });
});
