export const site = {
  name: "Jonathan Bangert",
  url: "https://jonathanbangert.com",
  profileDescription:
    "A Danish software engineer, builder, and problem solver studying the International Baccalaureate at UWC Red Cross Nordic.",
  birthDate: { year: 2008, month: 3, day: 1 },
  socialLinks: [
    "https://github.com/jonbng",
    "https://linkedin.com/in/jonathan-bangert/",
    "https://x.com/jonbng",
  ],
} as const;

export function getAge(date = new Date()) {
  const { year, month, day } = site.birthDate;
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

export async function getSiteDescription() {
  "use cache";

  const age = getAge(new Date());
  const article = age === 18 ? "an" : "a";

  return `I'm ${article} ${age}-year-old software engineer, builder, and problem solver from Denmark. I currently study the International Baccalaureate at UWC Red Cross Nordic.`;
}
