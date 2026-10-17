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
    let url;

    try {
      url = new URL(request.url, 'http://localhost');
    } catch {
      sendJson(response, 400, { error: 'Bad request' });

      return;
    }

    const handler = findHandler(url.pathname);

    if (!handler) {
      sendJson(response, 404, { error: 'Not found' });

      return;
    }

    const payload = handler(url.searchParams);

    if (payload === null) {
      sendJson(response, 400, { error: 'value' });

      return;
    }

    sendJson(response, 200, payload);
  });
}
