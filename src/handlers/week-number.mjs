export function weekNumber() {
  const date = new Date();

  date.setUTCHours(0, 0, 0, 0);
  // The Thursday determines the ISO week year, including at calendar-year boundaries.
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const result = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

  return { result };
}
