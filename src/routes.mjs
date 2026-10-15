import { add } from './handlers/add.mjs';
import { divide } from './handlers/divide.mjs';
import { factorial } from './handlers/factorial.mjs';
import { hello } from './handlers/hello.mjs';
import { isPrime } from './handlers/is-prime.mjs';
import { modulo } from './handlers/modulo.mjs';
import { multiply } from './handlers/multiply.mjs';
import { round } from './handlers/round.mjs';
import { sqrt } from './handlers/sqrt.mjs';
import { status } from './handlers/status.mjs';
import { subtract } from './handlers/subtract.mjs';

const routes = new Map([
  ['/', hello],
  ['/status', status],
  ['/v2/add', add],
  ['/v2/subtract', subtract],
  ['/v2/multiply', multiply],
  ['/v2/divide', divide],
  ['/v2/modulo', modulo],
  ['/v2/sqrt', sqrt],
  ['/v2/round', round],
  ['/v2/factorial', factorial],
  ['/v2/is-prime', isPrime],
]);

export function findHandler(pathname) {
  return routes.get(pathname);
}
