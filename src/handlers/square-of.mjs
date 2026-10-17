// A null payload signals an invalid value to the HTTP layer.
export function squareOf(searchParams) {
  const input = searchParams.get('value');

  if (input === null || input.trim() === '') {
    return null;
  }

  const value = Number(input.trim());
  const result = value * value;

  if (!Number.isFinite(value) || !Number.isFinite(result)) {
    return null;
  }

  return { result };
}
