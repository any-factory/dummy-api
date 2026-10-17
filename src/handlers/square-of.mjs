// Error payloads signal invalid input or square overflow to the HTTP layer.
export function squareOf(searchParams) {
  const input = searchParams.get('value');

  if (input === null || input.trim() === '') {
    return { error: 'value must be a number' };
  }

  const value = Number(input.trim());

  if (!Number.isFinite(value)) {
    return { error: 'value must be a number' };
  }

  const result = value * value;

  if (!Number.isFinite(result)) {
    return { error: 'result out of range' };
  }

  return { result };
}
