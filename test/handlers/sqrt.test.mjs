import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sqrt } from '../../src/handlers/sqrt.mjs';

test('sqrt handler returns 8 for the square root of 64', () => {
  assert.deepEqual(sqrt(), { result: 8 });
});
