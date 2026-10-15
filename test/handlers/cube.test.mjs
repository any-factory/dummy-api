import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cube } from '../../src/handlers/cube.mjs';

test('cube handler returns 27 for 3 to the power of 3', () => {
  assert.deepEqual(cube(), { result: 27 });
});
