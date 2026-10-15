export function timestamp() {
  return { result: Math.floor(Date.now() / 1000) };
}
