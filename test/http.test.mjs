import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { once } from 'node:events';
import { request } from 'node:http';
import { after, before, test } from 'node:test';
import { createApp } from '../src/app.mjs';

let server;
let baseUrl;

before(async () => {
  server = createApp();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);

          return;
        }

        resolve();
      });
    });
  }
});

const routes = [
  ['/', { hello: 'world' }],
  ['/status', { ok: true }],
  ['/v2/add', { result: 2 }],
  ['/v2/subtract', { result: 7 }],
  ['/v2/multiply', { result: 42 }],
  ['/v2/divide', { result: 5 }],
  ['/v2/modulo', { result: 2 }],
  ['/v2/sqrt', { result: 8 }],
  ['/v2/power', { result: 1024 }],
  ['/v2/round', { result: 3.14 }],
  ['/v2/factorial', { input: 5, result: 120 }],
  ['/v2/is-prime', { result: true }],
  ['/v2/palindrome', { result: true }],
  ['/v2/fibonacci', { result: 13 }],
  ['/v2/reverse', { result: 'olleh' }],
  ['/v2/sort', { result: [1, 2, 3, 5, 8] }],
  ['/v2/base64', { base64: 'aGVsbG8=' }],
  ['/v2/uppercase', { result: 'HELLO' }],
  ['/v2/lowercase', { result: 'hello' }],
  ['/v2/word-count', { result: 4 }],
  ['/v2/slug', { result: 'hello-world' }],
  ['/v2/unique', { result: [1, 2, 3, 4] }],
];

for (const [pathname, expectedBody] of routes) {
  test(`GET ${pathname} returns 200 and the expected JSON`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), expectedBody);
  });
}

for (const [pathname, textInput, expectedBody] of [
  ['/v2/uppercase', 'world', { result: 'HELLO' }],
  ['/v2/lowercase', 'WORLD', { result: 'hello' }],
]) {
  test(`GET ${pathname} ignores text query parameters`, async () => {
    const response = await fetch(`${baseUrl}${pathname}?text=${textInput}`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), expectedBody);
  });

  test(`POST ${pathname} ignores JSON body inputs`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: textInput }),
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), expectedBody);
  });

  test(`HEAD ${pathname} returns the JSON headers without a response body`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`, { method: 'HEAD' });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.equal(await response.text(), '');
  });
}

test('GET word-count ignores text and input query parameters', async () => {
  const response = await fetch(`${baseUrl}/v2/word-count?text=one&input=one`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 4 });
});

test('POST word-count ignores JSON body inputs', async () => {
  const response = await fetch(`${baseUrl}/v2/word-count`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'one', input: 'one' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 4 });
});

test('HEAD word-count returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/word-count`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('GET slug ignores text, input, and result query parameters', async () => {
  const response = await fetch(
    `${baseUrl}/v2/slug?text=Other%20Text&input=Another&result=override`,
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 'hello-world' });
});

test('POST slug ignores JSON body inputs', async () => {
  const response = await fetch(`${baseUrl}/v2/slug`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Other Text', input: 'Another', result: 'override' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 'hello-world' });
});

test('HEAD slug returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/slug`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('GET unique ignores input query parameters', async () => {
  const response = await fetch(`${baseUrl}/v2/unique?input=%5B9%2C9%5D`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: [1, 2, 3, 4] });
});

test('POST unique ignores JSON body inputs', async () => {
  const response = await fetch(`${baseUrl}/v2/unique`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: [9, 9] }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: [1, 2, 3, 4] });
});

test('HEAD unique returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/unique`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

for (const pathname of ['/v2/uuid', '/v2/uuid?uuid=override&version=1']) {
  test(`GET ${pathname} returns a lowercase UUID v4`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(Object.keys(body), ['result']);
    assert.equal(typeof body.result, 'string');
    assert.match(
      body.result,
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });
}

test('POST uuid ignores JSON body inputs', async () => {
  const response = await fetch(`${baseUrl}/v2/uuid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid: 'override', version: 1 }),
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(Object.keys(body), ['result']);
  assert.equal(typeof body.result, 'string');
  assert.match(
    body.result,
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
  );
});

test('HEAD uuid returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/uuid`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('uuid generates once for each request', { concurrency: false }, async (t) => {
  const values = ['550e8400-e29b-41d4-a716-446655440000', '00000000-0000-4000-8000-000000000000'];
  const randomUUID = t.mock.method(crypto, 'randomUUID', () => values.shift());
  const first = await fetch(`${baseUrl}/v2/uuid`);

  assert.equal(first.status, 200);
  assert.equal(first.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await first.json(), { result: '550e8400-e29b-41d4-a716-446655440000' });

  const second = await fetch(`${baseUrl}/v2/uuid`);

  assert.equal(second.status, 200);
  assert.equal(second.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await second.json(), { result: '00000000-0000-4000-8000-000000000000' });
  assert.equal(randomUUID.mock.callCount(), 2);
});

for (const pathname of [
  '/v2/week-number',
  '/v2/week-number?date=2021-01-01&timezone=Asia%2FTokyo&week=1',
]) {
  test(`GET ${pathname} returns the current UTC ISO week`, async (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

    const response = await fetch(`${baseUrl}${pathname}`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), { result: 42 });
  });
}

test('POST week number ignores date, timezone, and week body inputs', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

  const response = await fetch(`${baseUrl}/v2/week-number`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date: '2021-01-01', timezone: 'Asia/Tokyo', week: 1 }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 42 });
});

test('HEAD week number returns the JSON headers without a response body', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

  const response = await fetch(`${baseUrl}/v2/week-number`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('week number updates across Monday midnight UTC on the same server', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2024-06-02T23:59:59.999Z') });

  const first = await fetch(`${baseUrl}/v2/week-number`);

  assert.equal(first.status, 200);
  assert.equal(first.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await first.json(), { result: 22 });
  t.mock.timers.setTime(Date.parse('2024-06-03T00:00:00.000Z'));

  const second = await fetch(`${baseUrl}/v2/week-number`);

  assert.equal(second.status, 200);
  assert.equal(second.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await second.json(), { result: 23 });
});

for (const [instant, result] of [
  ['2026-10-15T12:00:00.000Z', 31],
  ['2026-04-15T12:00:00.000Z', 30],
  ['2023-02-15T12:00:00.000Z', 28],
  ['2024-02-15T12:00:00.000Z', 29],
]) {
  test(`GET days in month at ${instant} returns ${result}`, async (t) => {
    t.mock.timers.enable({ apis: ['Date'], now: Date.parse(instant) });

    const response = await fetch(`${baseUrl}/v2/days-in-month`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), { result });
  });
}

test('GET days in month ignores date, year, month, timezone, and result query inputs', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

  const response = await fetch(
    `${baseUrl}/v2/days-in-month?date=2023-02-01&year=2023&month=2&timezone=Asia%2FTokyo&result=1`,
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 31 });
});

test('POST days in month ignores date, year, month, timezone, and result body inputs', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

  const response = await fetch(`${baseUrl}/v2/days-in-month`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date: '2023-02-01',
      year: 2023,
      month: 2,
      timezone: 'Asia/Tokyo',
      result: 1,
    }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 31 });
});

test('HEAD days in month returns the JSON headers without a response body', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-15T12:00:00.000Z') });

  const response = await fetch(`${baseUrl}/v2/days-in-month`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('days in month updates across month-end midnight UTC on the same server', async (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: Date.parse('2024-02-29T23:59:59.999Z') });

  const first = await fetch(`${baseUrl}/v2/days-in-month`);

  assert.equal(first.status, 200);
  assert.equal(first.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await first.json(), { result: 29 });
  t.mock.timers.setTime(Date.parse('2024-03-01T00:00:00.000Z'));

  const second = await fetch(`${baseUrl}/v2/days-in-month`);

  assert.equal(second.status, 200);
  assert.equal(second.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await second.json(), { result: 31 });
});

for (const pathname of ['/v2/random-color', '/v2/random-color?color=red']) {
  test(`GET ${pathname} returns an uppercase RGB color`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(Object.keys(body), ['color']);
    assert.equal(typeof body.color, 'string');
    assert.match(body.color, /^#[0-9A-F]{6}$/);
  });
}

test('POST random color ignores JSON body inputs', async () => {
  const response = await fetch(`${baseUrl}/v2/random-color`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ color: 'red' }),
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(Object.keys(body), ['color']);
  assert.equal(typeof body.color, 'string');
  assert.match(body.color, /^#[0-9A-F]{6}$/);
});

test('HEAD random color returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/random-color`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('random color draws a new sample for each request', { concurrency: false }, async (t) => {
  const values = [0, 0x1a2b3c / 0x1000000];
  const random = t.mock.method(Math, 'random', () => values.shift());
  const first = await fetch(`${baseUrl}/v2/random-color`);

  assert.deepEqual(await first.json(), { color: '#000000' });

  const second = await fetch(`${baseUrl}/v2/random-color`);

  assert.deepEqual(await second.json(), { color: '#1A2B3C' });
  assert.equal(random.mock.callCount(), 2);
});

test('GET coin returns heads or tails', async () => {
  const response = await fetch(`${baseUrl}/v2/coin`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(Object.keys(body), ['result']);
  assert.ok(['heads', 'tails'].includes(body.result));
});

test(
  'coin draws a new sample for each request and permits repeats',
  { concurrency: false },
  async (t) => {
    const values = [0, 0.5, 0.5];
    const random = t.mock.method(Math, 'random', () => values.shift());

    for (const result of ['heads', 'tails', 'tails']) {
      const response = await fetch(`${baseUrl}/v2/coin`);

      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
      assert.deepEqual(await response.json(), { result });
    }

    assert.equal(random.mock.callCount(), 3);
  },
);

test('coin ignores query parameters and JSON body inputs', { concurrency: false }, async (t) => {
  const random = t.mock.method(Math, 'random', () => 0);
  const queryResponse = await fetch(`${baseUrl}/v2/coin?result=tails&seed=1`);

  assert.equal(queryResponse.status, 200);
  assert.equal(queryResponse.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await queryResponse.json(), { result: 'heads' });

  const postResponse = await fetch(`${baseUrl}/v2/coin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ result: 'tails', seed: 1 }),
  });

  assert.equal(postResponse.status, 200);
  assert.equal(postResponse.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await postResponse.json(), { result: 'heads' });
  assert.equal(random.mock.callCount(), 2);
});

test('HEAD coin returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/coin`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('base64 query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/base64?text=world&input=world`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { base64: 'aGVsbG8=' });
});

test('POST base64 ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/base64`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'world', input: 'world' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { base64: 'aGVsbG8=' });
});

test('HEAD base64 returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/base64`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('GET uptime returns the current process lifetime in seconds', async () => {
  const before = process.uptime();
  const response = await fetch(`${baseUrl}/v2/uptime`);
  const body = await response.json();
  const after = process.uptime();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(Object.keys(body), ['result']);
  assert.equal(typeof body.result, 'number');
  assert.ok(Number.isFinite(body.result));
  assert.ok(body.result >= 0);
  assert.ok(body.result >= before);
  assert.ok(body.result <= after);
});

test('uptime samples the process lifetime for each request', { concurrency: false }, async (t) => {
  const values = [12.25, 13.5];
  const source = t.mock.method(process, 'uptime', () => values.shift());
  const first = await fetch(`${baseUrl}/v2/uptime`);

  assert.equal(first.status, 200);
  assert.equal(first.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await first.json(), { result: 12.25 });

  const second = await fetch(`${baseUrl}/v2/uptime`);

  assert.equal(second.status, 200);
  assert.equal(second.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await second.json(), { result: 13.5 });
  assert.equal(source.mock.callCount(), 2);
});

test('uptime ignores query parameters and JSON body inputs', { concurrency: false }, async (t) => {
  t.mock.method(process, 'uptime', () => 42.75);

  const queryResponse = await fetch(`${baseUrl}/v2/uptime?result=999&seconds=999`);

  assert.equal(queryResponse.status, 200);
  assert.equal(queryResponse.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await queryResponse.json(), { result: 42.75 });

  const postResponse = await fetch(`${baseUrl}/v2/uptime`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ result: 999, seconds: 999 }),
  });

  assert.equal(postResponse.status, 200);
  assert.equal(postResponse.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await postResponse.json(), { result: 42.75 });
});

test('HEAD uptime returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/uptime`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('reverse query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/reverse?text=world`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 'olleh' });
});

test('POST reverse ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/reverse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'world' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 'olleh' });
});

test('HEAD reverse returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/reverse`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('sort query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/sort?values=9,0&order=desc`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: [1, 2, 3, 5, 8] });
});

test('POST sort ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/sort`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [9, 0], order: 'desc' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: [1, 2, 3, 5, 8] });
});

test('HEAD sort returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/sort`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('fibonacci query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/fibonacci?n=10`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 13 });
});

test('POST fibonacci ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/fibonacci`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ n: 10 }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 13 });
});

test('HEAD fibonacci returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/fibonacci`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('power query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/power?base=3&exponent=2`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 1024 });
});

test('POST power ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/power`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base: 3, exponent: 2 }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: 1024 });
});

test('HEAD power returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/power`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('round ignores query parameters for the number and precision', async () => {
  const response = await fetch(`${baseUrl}/v2/round?number=9.999&decimals=0`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 3.14 });
});

test('POST round ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/round`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: 9.999, decimals: 0 }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 3.14 });
});

test('HEAD round returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/round`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('factorial ignores query parameters for the number', async () => {
  const response = await fetch(`${baseUrl}/v2/factorial?number=6`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { input: 5, result: 120 });
});

test('POST factorial ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/factorial`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: 6 }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { input: 5, result: 120 });
});

test('HEAD factorial returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/factorial`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('is-prime ignores query parameters for the number', async () => {
  const response = await fetch(`${baseUrl}/v2/is-prime?number=12`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: true });
});

test('POST is-prime ignores JSON body inputs and checks the fixed number', async () => {
  const response = await fetch(`${baseUrl}/v2/is-prime`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: 12 }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: true });
});

test('HEAD is-prime returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/is-prime`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('palindrome ignores query parameters for the text', async () => {
  const response = await fetch(`${baseUrl}/v2/palindrome?text=hello`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: true });
});

test('POST palindrome ignores JSON body inputs and checks the fixed text', async () => {
  const response = await fetch(`${baseUrl}/v2/palindrome`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'hello' }),
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { result: true });
});

test('HEAD palindrome returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/palindrome`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('modulo query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/modulo?a=100&b=3`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 2 });
});

test('POST modulo ignores JSON body inputs and preserves the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/modulo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ a: 100, b: 3 }),
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 2 });
});

test('HEAD modulo returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/modulo`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('unknown routes return a JSON 404 response', async () => {
  const response = await fetch(`${baseUrl}/v2/unknown`);

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.deepEqual(await response.json(), { error: 'Not found' });
});

test('query parameters do not change the fixed handler result', async () => {
  const response = await fetch(`${baseUrl}/v2/add?a=10&b=20`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 2 });
});

test('POST preserves the source project behavior for known routes', async () => {
  const response = await fetch(`${baseUrl}/v2/add`, { method: 'POST' });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 2 });
});

test('HEAD returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/status`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('divide query parameters do not change the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/divide?a=100&b=2`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 5 });
});

test('POST divide returns the fixed result', async () => {
  const response = await fetch(`${baseUrl}/v2/divide`, { method: 'POST' });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: 5 });
});

test('HEAD divide returns the JSON headers without a response body', async () => {
  const response = await fetch(`${baseUrl}/v2/divide`, { method: 'HEAD' });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
  assert.equal(await response.text(), '');
});

test('malformed URLs return a JSON 400 response and the server stays available', async () => {
  const response = await new Promise((resolve, reject) => {
    const clientRequest = request(
      {
        hostname: '127.0.0.1',
        port: server.address().port,
        path: 'http://[',
      },
      (incomingResponse) => {
        let body = '';

        incomingResponse.setEncoding('utf8');
        incomingResponse.on('data', (chunk) => {
          body += chunk;
        });
        incomingResponse.on('error', reject);
        incomingResponse.on('end', () => {
          resolve({ status: incomingResponse.statusCode, headers: incomingResponse.headers, body });
        });
      },
    );

    clientRequest.on('error', reject);
    clientRequest.end();
  });

  assert.equal(response.status, 400);
  assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
  assert.deepEqual(JSON.parse(response.body), { error: 'Bad request' });

  const healthResponse = await fetch(`${baseUrl}/status`);

  assert.equal(healthResponse.status, 200);
  assert.deepEqual(await healthResponse.json(), { ok: true });
});
