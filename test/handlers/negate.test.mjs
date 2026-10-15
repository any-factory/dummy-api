import assert from 'node:assert/strict';
import { test } from 'node:test';
import { negate } from '../../src/handlers/negate.mjs';

test('negate handler returns -7 for the negation of 7', () => {
  assert.deepEqual(negate(), { result: -7 });
});
