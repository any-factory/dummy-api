export function daysInMonth() {
  const date = new Date();

  date.setUTCMonth(date.getUTCMonth() + 1, 0);

  return { result: date.getUTCDate() };
}
