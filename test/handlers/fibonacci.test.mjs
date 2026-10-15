import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fibonacci } from '../../src/handlers/fibonacci.mjs';

test('fibonacci handler returns F(7) = 13 with F(0) = 0', () => {
  assert.deepEqual(fibonacci(), { result: 13 });
});
