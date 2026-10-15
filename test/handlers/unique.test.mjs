import assert from 'node:assert/strict';
import { test } from 'node:test';
import { unique } from '../../src/handlers/unique.mjs';

test('unique handler removes duplicates from the fixed array in input order', () => {
  assert.deepEqual(unique(), { result: [1, 2, 3, 4] });
});
