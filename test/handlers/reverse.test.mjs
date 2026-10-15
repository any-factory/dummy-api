import assert from 'node:assert/strict';
import { test } from 'node:test';
import { reverse } from '../../src/handlers/reverse.mjs';

test('reverse handler always returns the reverse of hello', () => {
  assert.deepEqual(reverse(), { result: 'olleh' });
  assert.deepEqual(reverse(), { result: 'olleh' });
});
