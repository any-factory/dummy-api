import assert from 'node:assert/strict';
import { test } from 'node:test';
import { palindrome } from '../../src/handlers/palindrome.mjs';

test('palindrome handler returns true because racecar is a palindrome', () => {
  assert.deepEqual(palindrome(), { result: true });
});
