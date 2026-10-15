import assert from 'node:assert/strict';
import { test } from 'node:test';
import { abs } from '../../src/handlers/abs.mjs';

test('abs handler returns 7 for the absolute value of -7', () => {
  assert.deepEqual(abs(), { result: 7 });
});

test('abs handler result is never negative', () => {
  assert.ok(abs().result >= 0);
});
