export const birthDate = { year: 2008, month: 3, day: 1 } as const;

export function getAge(date = new Date()) {
  const { year, month, day } = birthDate;
  let age = date.getUTCFullYear() - year;
  const currentMonth = date.getUTCMonth() + 1;

  if (
    currentMonth < month ||
    (currentMonth === month && date.getUTCDate() < day)
  ) {
    age--;
  }

  return age;
}
