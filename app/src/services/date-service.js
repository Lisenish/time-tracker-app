export function toDayStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toDayEnd(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
}

export function getMonday(date) {
  const day = date.getDay() || 7;
  var result = new Date(date);

  if (day !== 1) {
    result.setHours(-24 * (day - 1));
  }

  return result;
}

export function getSunday(date) {
  const result = getMonday(date);

  result.setHours(24 * 7);

  return result;
}

export function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
