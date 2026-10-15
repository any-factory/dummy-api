export function unique() {
  const input = [1, 2, 2, 3, 3, 4];

  return { result: [...new Set(input)] };
}
