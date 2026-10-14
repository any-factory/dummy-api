import assert from 'node:assert/strict';
import { test } from 'node:test';
import { add } from '../../src/handlers/add.mjs';

test('add handler returns 2 for 1 + 1', () => {
  assert.deepEqual(add(), { result: 2 });
});
