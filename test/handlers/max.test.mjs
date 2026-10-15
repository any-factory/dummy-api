import assert from 'node:assert/strict';
import { test } from 'node:test';
import { max } from '../../src/handlers/max.mjs';

test('max handler returns the largest number of the fixed array on repeated calls', () => {
  assert.deepEqual(max(), { result: 9 });
  assert.deepEqual(max(), { result: 9 });
});
