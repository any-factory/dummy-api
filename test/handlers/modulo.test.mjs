import assert from 'node:assert/strict';
import { test } from 'node:test';
import { modulo } from '../../src/handlers/modulo.mjs';

test('modulo handler returns 2 for 17 % 5', () => {
  assert.deepEqual(modulo(), { result: 2 });
});
