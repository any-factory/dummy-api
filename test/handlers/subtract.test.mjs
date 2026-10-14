import assert from 'node:assert/strict';
import { test } from 'node:test';
import { subtract } from '../../src/handlers/subtract.mjs';

test('subtract handler returns 7 for 10 - 3', () => {
  assert.deepEqual(subtract(), { result: 7 });
});
