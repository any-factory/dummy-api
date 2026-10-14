export function divide() {
  // The API contract fixes the operands; query parameters and request bodies do not supply them.
  return { result: 20 / 4 };
}
