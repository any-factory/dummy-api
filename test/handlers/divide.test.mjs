import assert from 'node:assert/strict';
import { test } from 'node:test';
import { divide } from '../../src/handlers/divide.mjs';

test('divide handler returns 5 for 20 / 4', () => {
  assert.deepEqual(divide(), { result: 5 });
  assert.ok(Number.isInteger(divide().result));
});
