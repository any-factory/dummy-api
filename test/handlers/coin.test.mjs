import assert from 'node:assert/strict';
import { test } from 'node:test';
import { coin } from '../../src/handlers/coin.mjs';

const cases = [
  [0, 'heads'],
  [0.49999999999999994, 'heads'],
  [0.5, 'tails'],
  [0.9999999999999999, 'tails'],
];

for (const [value, result] of cases) {
  test(`coin returns ${result} for a sample of ${value}`, (t) => {
    const random = t.mock.method(Math, 'random', () => value);
    const actual = coin();

    assert.deepEqual(actual, { result });
    assert.equal(Object.getPrototypeOf(actual), Object.prototype);
    assert.equal(random.mock.callCount(), 1);
  });
}

test('coin samples again, permits repeats, and returns a fresh object on every call', (t) => {
  const values = [0, 0.5, 0.5];
  const random = t.mock.method(Math, 'random', () => values.shift());
  const first = coin();
  const second = coin();
  const third = coin();

  assert.deepEqual(first, { result: 'heads' });
  assert.deepEqual(second, { result: 'tails' });
  assert.deepEqual(third, { result: 'tails' });
  assert.notEqual(first, second);
  assert.notEqual(first, third);
  assert.notEqual(second, third);
  assert.equal(random.mock.callCount(), 3);
});
