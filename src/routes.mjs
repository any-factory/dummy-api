import { abs } from './handlers/abs.mjs';
import { add } from './handlers/add.mjs';
import { average } from './handlers/average.mjs';
import { base64 } from './handlers/base64.mjs';
import { coin } from './handlers/coin.mjs';
import { cube } from './handlers/cube.mjs';
import { daysInMonth } from './handlers/days-in-month.mjs';
import { divide } from './handlers/divide.mjs';
import { factorial } from './handlers/factorial.mjs';
import { fibonacci } from './handlers/fibonacci.mjs';
import { hello } from './handlers/hello.mjs';
import { isPrime } from './handlers/is-prime.mjs';
import { length } from './handlers/length.mjs';
import { lowercase } from './handlers/lowercase.mjs';
import { max } from './handlers/max.mjs';
import { modulo } from './handlers/modulo.mjs';
import { multiply } from './handlers/multiply.mjs';
import { palindrome } from './handlers/palindrome.mjs';
import { power } from './handlers/power.mjs';
import { randomColor } from './handlers/random-color.mjs';
import { reverse } from './handlers/reverse.mjs';
import { round } from './handlers/round.mjs';
import { slug } from './handlers/slug.mjs';
import { sort } from './handlers/sort.mjs';
import { sqrt } from './handlers/sqrt.mjs';
import { square } from './handlers/square.mjs';
import { status } from './handlers/status.mjs';
import { subtract } from './handlers/subtract.mjs';
import { temperature } from './handlers/temperature.mjs';
import { unique } from './handlers/unique.mjs';
import { uppercase } from './handlers/uppercase.mjs';
import { uptime } from './handlers/uptime.mjs';
import { uuid } from './handlers/uuid.mjs';
import { weekNumber } from './handlers/week-number.mjs';
import { wordCount } from './handlers/word-count.mjs';

const routes = new Map([
  ['/', hello],
  ['/status', status],
  ['/v2/add', add],
  ['/v2/subtract', subtract],
  ['/v2/multiply', multiply],
  ['/v2/divide', divide],
  ['/v2/modulo', modulo],
  ['/v2/sqrt', sqrt],
  ['/v2/power', power],
  ['/v2/cube', cube],
  ['/v2/square', square],
  ['/v2/abs', abs],
  ['/v2/round', round],
  ['/v2/average', average],
  ['/v2/max', max],
  ['/v2/temperature', temperature],
  ['/v2/factorial', factorial],
  ['/v2/is-prime', isPrime],
  ['/v2/palindrome', palindrome],
  ['/v2/fibonacci', fibonacci],
  ['/v2/reverse', reverse],
  ['/v2/length', length],
  ['/v2/sort', sort],
  ['/v2/base64', base64],
  ['/v2/uppercase', uppercase],
  ['/v2/lowercase', lowercase],
  ['/v2/word-count', wordCount],
  ['/v2/slug', slug],
  ['/v2/unique', unique],
  ['/v2/random-color', randomColor],
  ['/v2/coin', coin],
  ['/v2/week-number', weekNumber],
  ['/v2/days-in-month', daysInMonth],
  ['/v2/uuid', uuid],
  ['/v2/uptime', uptime],
]);

export function findHandler(pathname) {
  return routes.get(pathname);
}
