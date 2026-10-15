export function factorial() {
  const input = 5;
  let result = 1;

  for (let number = 2; number <= input; number += 1) {
    result *= number;
  }

  return { input, result };
}
