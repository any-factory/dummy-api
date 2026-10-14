import { add } from './handlers/add.mjs';
import { divide } from './handlers/divide.mjs';
import { hello } from './handlers/hello.mjs';
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
  ['/v2/sqrt', sqrt],
  ['/v2/round', round],
]);

export function findHandler(pathname) {
  return routes.get(pathname);
}
