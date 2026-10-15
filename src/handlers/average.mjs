export function average() {
  const input = [2, 4, 6, 8];
  const sum = input.reduce((total, value) => total + value, 0);

  return { result: sum / input.length };
}
