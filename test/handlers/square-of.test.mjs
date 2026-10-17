import assert from 'node:assert/strict';
import { URLSearchParams } from 'node:url';
import { test } from 'node:test';
import { squareOf } from '../../src/handlers/square-of.mjs';

for (const [input, result] of [
  ['5', 25],
  ['-3', 9],
  ['0', 0],
  ['-0', 0],
  ['1.5', 2.25],
  ['1e2', 10000],
  ['+3', 9],
  [' 2 ', 4],
]) {
  test(`square-of handler squares ${JSON.stringify(input)}`, () => {
    assert.deepEqual(squareOf(new URLSearchParams({ value: input })), { result });
  });
}

for (const query of [
  '',
  'number=5',
  'value=',
  'value=++',
  'value=%09%0A',
  'value=abc',
  'value=12abc',
  'value=NaN',
  'value=Infinity',
  'value=-Infinity',
  'value=1e309',
  'value=1e200',
  'value=&value=5',
]) {
  test(`square-of handler rejects invalid query ${JSON.stringify(query)}`, () => {
    assert.equal(squareOf(new URLSearchParams(query)), null);
  });
}

test('square-of handler uses the first value parameter', () => {
  assert.deepEqual(squareOf(new URLSearchParams('value=3&value=5')), { result: 9 });
});
