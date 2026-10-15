# Dummy API

Dummy API is a minimal Node.js project used to test the automated software factory
workflow. It provides a small codebase for implementing changes,
running automated checks, reviewing results, and verifying delivery from task to
completed change.

The project is based on `test-github-main` and preserves its routes and fixed JSON
responses, with a random-color endpoint that generates a variable response.
It uses Node.js built-ins, ES modules, and no runtime dependencies or
build step. All documentation, source code, comments, and package metadata are in
English.

## Requirements

- Node.js 24 or newer.
- npm, included with Node.js.

## Installation

Run the following command from the project directory:

```sh
npm install
```

For subsequent installs and automated factory runs, use the committed lockfile:

```sh
npm ci
```

ESLint and Prettier are development dependencies. The API itself needs no npm
packages to run.

## Running the API

```sh
npm start
```

The default address is `http://localhost:3000`. To use a different port in a POSIX
shell, including WSL:

```sh
PORT=3001 npm start
```

`PORT` must be an integer between `0` and `65535`. Setting it to `0` lets the
operating system choose an available port; the startup message prints that port.
An invalid port or a listener error causes the process to exit with a nonzero
status.

During development, restart automatically when source files change:

```sh
npm run dev
```

Stop the server with `Ctrl+C`.

## Routes

Successful responses use HTTP `200` and
`Content-Type: application/json; charset=utf-8`.

| Path               | JSON response                   | Meaning                                 |
| ------------------ | ------------------------------- | --------------------------------------- |
| `/`                | `{"hello":"world"}`             | Greeting                                |
| `/status`          | `{"ok":true}`                   | Health check                            |
| `/v2/add`          | `{"result":2}`                  | `1 + 1`                                 |
| `/v2/subtract`     | `{"result":7}`                  | `10 - 3`                                |
| `/v2/multiply`     | `{"result":42}`                 | `6 * 7`                                 |
| `/v2/divide`       | `{"result":5}`                  | `20 / 4`                                |
| `/v2/modulo`       | `{"result":2}`                  | `17 % 5`                                |
| `/v2/sqrt`         | `{"result":8}`                  | Square root of `64`                     |
| `/v2/round`        | `{"result":3.14}`               | `3.14159` rounded to two decimal places |
| `/v2/factorial`    | `{"input":5,"result":120}`      | Factorial of `5` (`5!`)                 |
| `/v2/random-color` | `{"color":"#1A2B3C"}` (example) | Random RGB color                        |

The random-color endpoint draws a fresh RGB color on every request. Its `color`
value has a `#` followed by six uppercase hexadecimal digits, preserving leading
zeros (for example, `#00000A`). All values from `#000000` through `#FFFFFF` are
possible, and colors may repeat. Query parameters and request bodies do not
configure the generator.

Routing uses only the URL pathname, as in the source project. Query parameters and
request bodies do not supply arithmetic inputs. Known routes also accept other
HTTP methods; `HEAD` returns headers without a response body.

Unknown paths return HTTP `404` with `{"error":"Not found"}`. Malformed URLs that
reach the application return HTTP `400` with `{"error":"Bad request"}`.

Example:

```sh
curl http://localhost:3000/v2/add
```

## Project structure

```text
dummy-api/
├── src/
│   ├── server.mjs          # Executable entry point and port configuration
│   ├── app.mjs             # HTTP server creation and JSON responses
│   ├── routes.mjs          # Mapping from paths to handlers
│   └── handlers/           # One function per endpoint
├── test/
│   ├── handlers/           # A separate unit test file for every handler
│   └── http.test.mjs        # HTTP integration tests
├── package.json            # Project metadata, scripts, and development tools
├── package-lock.json       # Locked development dependencies
├── eslint.config.mjs       # Source checks and statement spacing
└── README.md
```

Handlers return plain objects and do not depend on HTTP request or response
objects. Fixed-response handlers are pure; the random-color handler samples
`Math.random()` on each call. They can be imported and tested directly without
starting a server.
`createApp()` returns an HTTP server without opening a port; `server.mjs` owns
startup.

## Commands and tests

| Command                 | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `npm start`             | Start the API                               |
| `npm run dev`           | Start with automatic source watching        |
| `npm test`              | Run every unit and HTTP integration test    |
| `npm run test:handlers` | Run only the handler unit tests             |
| `npm run test:http`     | Run only the HTTP integration tests         |
| `npm run lint`          | Run ESLint                                  |
| `npm run format`        | Fix statement spacing and format text files |
| `npm run check`         | Check formatting, lint, and run all tests   |

Each handler has its own unit test asserting the expected payload. HTTP tests
verify all documented routes, status codes, JSON content types, missing paths, query
parameters, method compatibility, and malformed URLs. They listen on a local,
automatically assigned port and close the server after the suite.

To run a single handler test:

```sh
node --test test/handlers/add.test.mjs
```

## Automated software factory workflow

This repository is the target application for testing the factory process. A
typical run is:

1. Assign a small change, such as adding an endpoint or adjusting a fixed result.
2. Update the relevant handler and route mapping.
3. Add or update the handler unit tests and HTTP integration tests.
4. Update this README when the public behavior changes.
5. Install dependencies with `npm ci` and run `npm run check`.
6. Review the code changes and check results before delivering the change.

New endpoints belong in `src/handlers/`, with their path registered in
`src/routes.mjs`, direct tests in `test/handlers/`, and HTTP coverage in
`test/http.test.mjs`.

Except for random-color, the API keeps its responses deterministic so factory
runs can verify explicit expected results. Random-color tests control the random
source to verify exact formatting and generation per request. The checks are
suitable for automation and exit with a nonzero status on failure.
