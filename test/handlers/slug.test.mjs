import assert from 'node:assert/strict';
import { test } from 'node:test';
import { slug } from '../../src/handlers/slug.mjs';

test('slug handler always returns the slug of Hello World', () => {
  assert.deepEqual(slug(), { result: 'hello-world' });
  assert.deepEqual(slug(), { result: 'hello-world' });
});
