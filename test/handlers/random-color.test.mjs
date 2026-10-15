import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomColor } from '../../src/handlers/random-color.mjs';

const cases = [
  [0, '#000000'],
  [0x1a2b3c, '#1A2B3C'],
  [0x00000a, '#00000A'],
  [0xffffff, '#FFFFFF'],
];

for (const [value, color] of cases) {
  test(`random color formats the RGB value as ${color}`, (t) => {
    t.mock.method(Math, 'random', () => value / 0x1000000);

    assert.deepEqual(randomColor(), { color });
  });
}

test('random color samples again and returns a fresh object on every call', (t) => {
  const values = [0, 0x1a2b3c / 0x1000000];
  const random = t.mock.method(Math, 'random', () => values.shift());
  const first = randomColor();
  const second = randomColor();

  assert.deepEqual(first, { color: '#000000' });
  assert.deepEqual(second, { color: '#1A2B3C' });
  assert.notEqual(first, second);
  assert.equal(random.mock.callCount(), 2);
});
