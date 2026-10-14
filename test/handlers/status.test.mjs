import assert from 'node:assert/strict';
import { test } from 'node:test';
import { status } from '../../src/handlers/status.mjs';

test('status handler returns a healthy status', () => {
  assert.deepEqual(status(), { ok: true });
});
