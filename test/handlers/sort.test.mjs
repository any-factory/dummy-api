import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sort, sortNumbers } from '../../src/handlers/sort.mjs';

test('sort handler always returns the fixed numbers in ascending order', () => {
  assert.deepEqual(sort(), { result: [1, 2, 3, 5, 8] });
  assert.deepEqual(sort(), { result: [1, 2, 3, 5, 8] });
});

test('sortNumbers sorts the fixed input in ascending order', () => {
  assert.deepEqual(sortNumbers([5, 2, 8, 1, 3]), [1, 2, 3, 5, 8]);
});

test('sortNumbers returns a numerically sorted copy without mutating the input', () => {
  const values = [10, 2, -1];
  const result = sortNumbers(values);

  assert.deepEqual(result, [-1, 2, 10]);
  assert.deepEqual(values, [10, 2, -1]);
  assert.notEqual(result, values);
});

test('sortNumbers returns an empty array for empty input', () => {
  assert.deepEqual(sortNumbers([]), []);
});

test('sortNumbers preserves already-sorted input', () => {
  assert.deepEqual(sortNumbers([1, 2, 3, 5, 8]), [1, 2, 3, 5, 8]);
});

test('sortNumbers preserves duplicate values', () => {
  assert.deepEqual(sortNumbers([3, 1, 3, 2, 1]), [1, 1, 2, 3, 3]);
});
