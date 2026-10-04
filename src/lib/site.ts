import { birthDate, getAge } from "@/lib/age";
import { cacheLife } from "next/cache";

export const site = {
  name: "Jonathan Bangert",
  url: "https://jonathanbangert.com",
  profileDescription:
    "A Danish software engineer, builder, and problem solver studying the International Baccalaureate at UWC Red Cross Nordic.",
  birthDate,
  socialLinks: [
    "https://github.com/jonbng",
    "https://linkedin.com/in/jonathan-bangert/",
    "https://x.com/jonbng",
  ],
} as const;

export async function getSiteDescription() {
  "use cache";
  cacheLife("days");

  const age = await getCurrentAge();
  const article = age === 18 ? "an" : "a";

  return `I'm Jonathan Bangert, ${article} ${age}-year-old Danish software engineer. I lead engineering at Burst and study the International Baccalaureate at UWC Red Cross Nordic.`;
}

export async function getCurrentAge() {
  "use cache";
  cacheLife("days");

  return getAge(new Date());
}
