import assert from 'node:assert/strict';
import { test } from 'node:test';
import { base64 } from '../../src/handlers/base64.mjs';

test('base64 handler always returns the padded Base64 encoding of hello', () => {
  assert.deepEqual(base64(), { result: 'aGVsbG8=' });
  assert.deepEqual(base64(), { result: 'aGVsbG8=' });
});
