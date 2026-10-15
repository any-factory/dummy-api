import assert from 'node:assert/strict';
import { test } from 'node:test';
import { isPrime } from '../../src/handlers/is-prime.mjs';

test('isPrime handler returns true because 13 is prime', () => {
  assert.deepEqual(isPrime(), { result: true });
});
