import assert from 'node:assert/strict';
import { test } from 'node:test';
import { factorial } from '../../src/handlers/factorial.mjs';

test('factorial handler returns the fixed input 5 and its factorial 120', () => {
  assert.deepEqual(factorial(), { input: 5, result: 120 });
});
