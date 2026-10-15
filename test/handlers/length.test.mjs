import assert from 'node:assert/strict';
import { test } from 'node:test';
import { length } from '../../src/handlers/length.mjs';

test('length handler always returns the length of hello', () => {
  assert.deepEqual(length(), { result: 5 });
  assert.deepEqual(length(), { result: 5 });
});
