export function factorial() {
  let result = 1;

  for (let number = 2; number <= 5; number += 1) {
    result *= number;
  }

  return { result };
}
