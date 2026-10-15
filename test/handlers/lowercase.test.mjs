import assert from 'node:assert/strict';
import { test } from 'node:test';
import { lowercase } from '../../src/handlers/lowercase.mjs';

test('lowercase handler always returns the lowercase of HELLO', () => {
  assert.deepEqual(lowercase(), { result: 'hello' });
  assert.deepEqual(lowercase(), { result: 'hello' });
});
