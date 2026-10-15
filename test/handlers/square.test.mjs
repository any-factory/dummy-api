import assert from 'node:assert/strict';
import { test } from 'node:test';
import { square } from '../../src/handlers/square.mjs';

test('square handler returns 144 for the square of 12', () => {
  assert.deepEqual(square(), { result: 144 });
});
