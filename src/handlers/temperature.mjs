export function temperature() {
  const celsius = 100;

  return { celsius, fahrenheit: (celsius * 9) / 5 + 32 };
}
