export function randomColor() {
  const value = Math.floor(Math.random() * 0x1000000);
  const color = `#${value.toString(16).padStart(6, '0').toUpperCase()}`;

  return { color };
}
