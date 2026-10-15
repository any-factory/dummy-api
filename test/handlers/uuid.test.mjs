import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { test } from 'node:test';
import { uuid } from '../../src/handlers/uuid.mjs';

test('uuid returns a lowercase UUID v4 with the RFC variant', () => {
  const body = uuid();

  assert.deepEqual(Object.keys(body), ['result']);
  assert.equal(typeof body.result, 'string');
  assert.match(
    body.result,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  );
});

test('uuid generates once and returns a fresh object on every call', (t) => {
  const values = ['550e8400-e29b-41d4-a716-446655440000', '00000000-0000-4000-8000-000000000000'];
  const randomUUID = t.mock.method(crypto, 'randomUUID', () => values.shift());
  const first = uuid();
  const second = uuid();

  assert.deepEqual(first, { result: '550e8400-e29b-41d4-a716-446655440000' });
  assert.deepEqual(second, { result: '00000000-0000-4000-8000-000000000000' });
  assert.notEqual(first, second);
  assert.equal(randomUUID.mock.callCount(), 2);
});
