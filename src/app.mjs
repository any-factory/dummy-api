import { createServer } from 'node:http';
import { URL } from 'node:url';
import { findHandler } from './routes.mjs';

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

export function createApp() {
  return createServer((request, response) => {
    let pathname;

    try {
      pathname = new URL(request.url, 'http://localhost').pathname;
    } catch {
      sendJson(response, 400, { error: 'Bad request' });

      return;
    }

    const handler = findHandler(pathname);

    if (!handler) {
      sendJson(response, 404, { error: 'Not found' });

      return;
    }

    sendJson(response, 200, handler());
  });
}
