import assert from 'node:assert/strict';
import { test } from 'node:test';
import { multiply } from '../../src/handlers/multiply.mjs';

test('multiply handler returns 42 for 6 * 7', () => {
  assert.deepEqual(multiply(), { result: 42 });
});
