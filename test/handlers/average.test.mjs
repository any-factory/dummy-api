import assert from 'node:assert/strict';
import { test } from 'node:test';
import { average } from '../../src/handlers/average.mjs';

test('average handler returns the arithmetic mean of the fixed array', () => {
  assert.deepEqual(average(), { result: 5 });
});
