import assert from 'node:assert/strict';
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
  ['/v2/round', { result: 3.14 }],
  ['/v2/factorial', { input: 5, result: 120 }],
];

for (const [pathname, expectedBody] of routes) {
  test(`GET ${pathname} returns 200 and the expected JSON`, async () => {
    const response = await fetch(`${baseUrl}${pathname}`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.deepEqual(await response.json(), expectedBody);
  });
}

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
