function isPrime(n) {
  if (n < 2) {
    return false;
  }

  for (let divisor = 2; divisor <= Math.sqrt(n); divisor += 1) {
    if (n % divisor === 0) {
      return false;
    }
  }

  return true;
}

function isPrimeHandler() {
  return { result: isPrime(13) };
}

export { isPrimeHandler as isPrime };
