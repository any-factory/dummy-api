import assert from 'node:assert/strict';
import { test } from 'node:test';
import { uptime } from '../../src/handlers/uptime.mjs';

for (const value of [0, 0.125, 42.75, 90061.5]) {
  test(`uptime returns exactly ${value} seconds`, (t) => {
    const source = t.mock.method(process, 'uptime', () => value);

    assert.deepEqual(uptime(), { result: value });
    assert.equal(source.mock.callCount(), 1);
  });
}

test('uptime samples again and returns a fresh object on every call', (t) => {
  const values = [12.25, 13.5];
  const source = t.mock.method(process, 'uptime', () => values.shift());
  const first = uptime();
  const second = uptime();

  assert.deepEqual(first, { result: 12.25 });
  assert.deepEqual(second, { result: 13.5 });
  assert.notEqual(first, second);
  assert.equal(source.mock.callCount(), 2);
});
