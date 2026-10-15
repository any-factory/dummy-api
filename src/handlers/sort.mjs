export function sortNumbers(values) {
  return [...values].sort((a, b) => a - b);
}

export function sort() {
  return { result: sortNumbers([5, 2, 8, 1, 3]) };
}
