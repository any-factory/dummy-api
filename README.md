# Dummy API

Dummy API is a minimal Node.js project used to test the automated software factory
workflow. It provides a small codebase for implementing changes,
running automated checks, reviewing results, and verifying delivery from task to
completed change.

The project is based on `test-github-main` and preserves its routes and fixed JSON
responses, with coin, random-color, current-week, days-in-month, UUID, and uptime endpoints that generate
variable responses.
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

| Path                | JSON response                                                 | Meaning                                                    |
| ------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| `/`                 | `{"hello":"world"}`                                           | Greeting                                                   |
| `/status`           | `{"ok":true}`                                                 | Health check                                               |
| `/v2/add`           | `{"result":2}`                                                | `1 + 1`                                                    |
| `/v2/subtract`      | `{"result":7}`                                                | `10 - 3`                                                   |
| `/v2/multiply`      | `{"result":42}`                                               | `6 * 7`                                                    |
| `/v2/divide`        | `{"result":5}`                                                | `20 / 4`                                                   |
| `/v2/modulo`        | `{"result":2}`                                                | `17 % 5`                                                   |
| `/v2/sqrt`          | `{"result":8}`                                                | Square root of `64`                                        |
| `/v2/power`         | `{"result":1024}`                                             | 2 to the power of 10 (`2 ** 10`)                           |
| `/v2/cube`          | `{"result":27}`                                               | 3 to the power of 3 (`3 ** 3`)                             |
| `/v2/square`        | `{"result":144}`                                              | Square of `12` (`12 ** 2`)                                 |
| `/v2/abs`           | `{"result":7}`                                                | Absolute value of `-7` (`Math.abs(-7)`)                    |
| `/v2/negate`        | `{"result":-7}`                                               | Negation of fixed input `7` (`-7`)                         |
| `/v2/round`         | `{"result":3.14}`                                             | `3.14159` rounded to two decimal places                    |
| `/v2/average`       | `{"result":5}`                                                | Arithmetic mean of `[2, 4, 6, 8]`                          |
| `/v2/max`           | `{"result":9}`                                                | Largest of `[3, 9, 2]`                                     |
| `/v2/min`           | `{"result":2}`                                                | Smallest of `[3, 9, 2]`                                    |
| `/v2/temperature`   | `{"celsius":100,"fahrenheit":212}`                            | Fixed 100°C converted to 212°F                             |
| `/v2/factorial`     | `{"input":5,"result":120}`                                    | Factorial of `5` (`5!`)                                    |
| `/v2/is-prime`      | `{"result":true}`                                             | Checks whether the fixed input `13` is prime               |
| `/v2/palindrome`    | `{"result":true}`                                             | Checks whether the fixed input `"racecar"` is a palindrome |
| `/v2/fibonacci`     | `{"result":13}`                                               | F(7) = 13, with F(0) = 0                                   |
| `/v2/reverse`       | `{"result":"olleh"}`                                          | Reverse of the fixed string `hello`                        |
| `/v2/length`        | `{"result":5}`                                                | Length of the fixed string `hello`                         |
| `/v2/sort`          | `{"result":[1,2,3,5,8]}`                                      | Fixed array sorted in ascending numeric order              |
| `/v2/base64`        | `{"base64":"aGVsbG8="}`                                       | Padded Base64 encoding of the fixed UTF-8 string `hello`   |
| `/v2/uppercase`     | `{"result":"HELLO"}`                                          | Uppercase of the fixed string `hello`                      |
| `/v2/lowercase`     | `{"result":"hello"}`                                          | Lowercase of the fixed string `HELLO`                      |
| `/v2/word-count`    | `{"result":4}`                                                | Word count of the fixed string `Hello from the API`        |
| `/v2/slug`          | `{"result":"hello-world"}`                                    | URL-friendly slug of the fixed string `Hello World`        |
| `/v2/unique`        | `{"result":[1,2,3,4]}`                                        | Remove duplicates from `[1, 2, 2, 3, 3, 4]`                |
| `/v2/coin`          | `{"result":"heads"}` (example)                                | Random coin flip                                           |
| `/v2/random-color`  | `{"color":"#1A2B3C"}` (example)                               | Random RGB color                                           |
| `/v2/week-number`   | `{"result":42}` (example)                                     | Current ISO week number in UTC                             |
| `/v2/days-in-month` | `{"result":31}` (example)                                     | Days in the current UTC month                              |
| `/v2/uuid`          | `{"result":"550e8400-e29b-41d4-a716-446655440000"}` (example) | Random UUID v4                                             |
| `/v2/uptime`        | `{"result":42.75}` (example)                                  | Node.js process uptime in seconds                          |

The cube endpoint calculates the fixed expression `3 ** 3`, returning `{"result":27}`.
Query parameters and request bodies do not override the base, exponent, or result.

The square endpoint squares the fixed input `12` using `12 ** 2`, returning
`{"result":144}`. Query parameters and request bodies do not override the input
or result.

The abs endpoint calculates the absolute value of the fixed input `-7` using
`Math.abs(-7)`, returning `{"result":7}`. Query parameters and request bodies do
not override the input or result.

The negate endpoint applies unary negation to the fixed input `7`, returning
`{"result":-7}`. Query parameters and request bodies do not override the input
or result.

The average endpoint calculates the arithmetic mean of the fixed array
`[2, 4, 6, 8]`: `(2 + 4 + 6 + 8) / 4 = 5`, returning `{"result":5}`.
Query parameters and request bodies do not override the fixed array.

The max endpoint calculates the maximum of the fixed array `[3, 9, 2]`,
returning `{"result":9}`. Query parameters and request bodies do not override
the array or result.

The min endpoint calculates the minimum of the fixed array `[3, 9, 2]`,
returning `{"result":2}`. Query parameters and request bodies do not override
the array or result.

The temperature endpoint converts the fixed Celsius value `100` to Fahrenheit
using `(100 * 9) / 5 + 32`, returning exactly `{"celsius":100,"fahrenheit":212}` (100°C → 212°F).
Query parameters and request bodies do not override the input, conversion
direction, or output.

The sort endpoint sorts the fixed input `[5, 2, 8, 1, 3]` in ascending numeric
order and returns `{"result":[1,2,3,5,8]}`. Query parameters and request bodies do
not override the array or sort order.

The unique endpoint removes duplicates from the fixed numeric array
`[1, 2, 2, 3, 3, 4]`, preserving first-occurrence order. Query parameters and
request bodies do not override this input.

The UUID endpoint generates a fresh UUID v4 on every request using Node's built-in
`crypto.randomUUID()`. The `result` is a lowercase, hyphenated, 36-character UUID
with the RFC variant. Query parameters and request bodies do not configure
generation or override the result. The table shows an example, not a fixed value.

The coin endpoint samples `Math.random()` once per request, returning either
`{"result":"heads"}` or `{"result":"tails"}` with equal probability. Samples below
`0.5` produce heads; samples at or above `0.5` produce tails. Consecutive outcomes
may repeat. Query parameters and request bodies do not control the outcome, seed,
or probability.

The random-color endpoint draws a fresh RGB color on every request. Its `color`
value has a `#` followed by six uppercase hexadecimal digits, preserving leading
zeros (for example, `#00000A`). All values from `#000000` through `#FFFFFF` are
possible, and colors may repeat. Query parameters and request bodies do not
configure the generator.

The week-number endpoint reads the current server clock on every request and
returns the ISO 8601 week number in UTC as an integer from 1 through 53. Weeks
begin on Monday at 00:00 UTC, and week 1 contains January 4. Near New Year, the
ISO week year can differ from the calendar year: January 1, 2021 is in week 53,
while December 31, 2018 is in week 1. Query parameters and request bodies do not
configure the date, timezone, or week number.

The days-in-month endpoint reads the current server clock on every request and
returns the total number of days in the current UTC calendar month as an integer
from 28 through 31. February has 29 days in Gregorian leap years (including 2000)
and 28 otherwise (including 1900). The current day does not change the month's
total. Query parameters and request bodies do not configure the date, year, month,
timezone, or result. The table shows an example for October 2026.

The uptime endpoint samples `process.uptime()` on every request and returns the
elapsed seconds since the running Node.js application process started. Fractional
seconds are preserved without rounding or truncation. The value resets when the
process restarts; it measures process lifetime rather than operating-system uptime
or time since the server was created. Query parameters and request bodies do not
configure the measurement.

Routing uses only the URL pathname, as in the source project. Query parameters and
request bodies do not supply arithmetic inputs or configure the fixed text
inputs of the reverse, length, Base64, uppercase, lowercase, word-count, or slug endpoints.
The length endpoint always returns `{"result":5}`, the length of the fixed string
`hello`; query parameters and request bodies do not override the source or result.
The word-count endpoint always counts the fixed phrase `Hello from the API`;
query parameters and request bodies do not override it. The slug endpoint always
converts the fixed string `Hello World` to `hello-world`; query parameters and
request bodies do not override the source or result. Known routes
also accept other HTTP methods; `HEAD` returns headers without
a response body.

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
objects. Fixed-response handlers are pure; the coin and random-color handlers sample
`Math.random()` on each call, week-number and days-in-month read the current UTC date on each
call, UUID calls `crypto.randomUUID()` on each call, and uptime samples
`process.uptime()` on each call. They can be imported and tested directly without
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

Except for coin, random-color, week-number, days-in-month, UUID, and uptime, the API keeps its responses deterministic
so factory runs can verify explicit expected results. Coin tests control the random
source to verify the heads/tails boundary, fresh sampling per request, and allowed
repeated outcomes. Random-color tests control
the random source to verify exact formatting and generation per request.
UUID tests check the version and variant and control the generator to verify
exact payloads and generation per request. Week-number tests freeze the clock to verify ISO year rollovers, leap day, and
changes at Monday midnight UTC. Run its handler tests under different host
timezones to verify UTC independence:

```sh
TZ=America/Los_Angeles node --test test/handlers/week-number.test.mjs
TZ=Asia/Tokyo node --test test/handlers/week-number.test.mjs
```

Days-in-month tests freeze the clock to verify month lengths, Gregorian leap
years, year boundaries, and per-request changes at month-end midnight UTC. Run its
handler tests under different host timezones to verify UTC independence:

```sh
TZ=America/Los_Angeles node --test test/handlers/days-in-month.test.mjs
TZ=Asia/Tokyo node --test test/handlers/days-in-month.test.mjs
```

Uptime tests control the process uptime source to verify exact fractional values
and sampling per request, and check real responses against process lifetime bounds.
The checks are suitable for automation and exit with a nonzero status on failure.
