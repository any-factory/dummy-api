import assert from 'node:assert/strict';
import { test } from 'node:test';
import { temperature } from '../../src/handlers/temperature.mjs';

test('temperature handler converts the fixed 100 Celsius to 212 Fahrenheit', () => {
  assert.deepEqual(temperature(), { celsius: 100, fahrenheit: 212 });
});
