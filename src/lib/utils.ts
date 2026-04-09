export function isSameDate(isoA: string, isoB: string) {
  const a = new Date(isoA);
  const b = new Date(isoB);
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
}

export function getTodayISO() {
  return new Date().toISOString();
}

export function getRandomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[Math.floor(Math.random() * items.length)];
}

export function getWeekLabel(dateString: string) {
  const date = new Date(dateString);
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return `Week of ${startOfWeek.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`;
}

export function getBrowserSafeUrl(path: string) {
  return `${window.location.origin}${path}`;
}
