import assert from 'node:assert/strict';
import { test } from 'node:test';
import { hello } from '../../src/handlers/hello.mjs';

test('hello handler returns the greeting', () => {
  assert.deepEqual(hello(), { hello: 'world' });
});
