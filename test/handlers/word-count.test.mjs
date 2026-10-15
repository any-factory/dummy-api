import assert from 'node:assert/strict';
import { test } from 'node:test';
import { wordCount } from '../../src/handlers/word-count.mjs';

test('wordCount handler always returns the word count of Hello from the API', () => {
  assert.deepEqual(wordCount(), { result: 4 });
  assert.deepEqual(wordCount(), { result: 4 });
});
