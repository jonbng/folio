import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const SHOWCASED_ENTRIES = [1, 2, 3];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Development-only logging
export const devLog = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

export const devWarn = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
};

export const devError = (...args: unknown[]) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

export function FilterShowcasedEntries(
  entries: Array<{
    id: string;
    name: string;
    message: string;
    username: string;
    color: string;
    timestamp: string;
  }>,
) {
  return entries
    .filter((entry, index) => SHOWCASED_ENTRIES.includes(index + 1))
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
}

export function DuplicateShowcasedEntries(
  entries: Array<{
    id: string;
    name: string;
    message: string;
    username: string;
    color: string;
    timestamp: string;
  }>,
): Array<{
  id: string;
  name: string;
  message: string;
  username: string;
  color: string;
  timestamp: string;
}> {
  const showcased = FilterShowcasedEntries(entries);
  return [
    ...showcased.map((entry, index) => ({
      ...entry,
      id: `${entry.id}-duplicate-${index + 1}`, // Append a unique suffix to the ID
    })),
    ...showcased,
  ];
}