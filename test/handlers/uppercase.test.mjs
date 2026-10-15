import assert from 'node:assert/strict';
import { test } from 'node:test';
import { uppercase } from '../../src/handlers/uppercase.mjs';

test('uppercase handler always returns the uppercase of hello', () => {
  assert.deepEqual(uppercase(), { result: 'HELLO' });
  assert.deepEqual(uppercase(), { result: 'HELLO' });
});
