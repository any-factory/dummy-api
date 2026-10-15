import assert from 'node:assert/strict';
import { test } from 'node:test';
import { health } from '../../src/handlers/health.mjs';

test('health handler returns a healthy status', () => {
  assert.deepEqual(health(), { status: 'ok' });
});
