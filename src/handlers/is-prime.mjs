export function isPrime() {
  const number = 13;

  for (let divisor = 2; divisor <= Math.sqrt(number); divisor += 1) {
    if (number % divisor === 0) {
      return { result: false };
    }
  }

  return { result: true };
}
