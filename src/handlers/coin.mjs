export function coin() {
  return { result: Math.random() < 0.5 ? 'heads' : 'tails' };
}
