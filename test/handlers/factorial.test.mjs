import assert from 'node:assert/strict';
import { test } from 'node:test';
import { factorial } from '../../src/handlers/factorial.mjs';

test('factorial handler returns 120 for 5!', () => {
  assert.deepEqual(factorial(), { result: 120 });
});
