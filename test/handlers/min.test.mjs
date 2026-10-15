import assert from 'node:assert/strict';
import { test } from 'node:test';
import { min } from '../../src/handlers/min.mjs';

test('min handler returns the smallest number of the fixed array on repeated calls', () => {
  assert.deepEqual(min(), { result: 2 });
  assert.deepEqual(min(), { result: 2 });
});
