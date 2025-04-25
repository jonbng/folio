"use server";

import { Redis } from "@upstash/redis";
import { auth } from "./auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function hashEmail(email: string) {
  // Encode the email string as UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(email);

  // Hash the data using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export async function GetAllGuestbookEntries(): Promise<
  Array<{
    id: string;
    name: string;
    message: string;
    username: string;
    color: string;
    timestamp: string;
  }>
> {
  const entryIds = await redis.zrange("guestbook:entries", 0, -1);
  const entries = await Promise.all(
    entryIds.map(async (id) => {
      const entry = await redis.hgetall(`guestbook:entry:${id}`);
      if (!entry) {
        return {
          id: id as string,
          name: "",
          message: "",
          username: "",
          color: "",
          timestamp: "",
        };
      }
      return {
        id: id as string,
        name: String(entry.name || ""),
        message: String(entry.message || ""),
        username: String(entry.username || ""),
        color: String(entry.color || ""),
        timestamp: String(entry.timestamp || ""),
      };
    }),
  );
  const sortedEntries = entries.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
  return sortedEntries;
}

export async function AddGuestbookEntry(
  name: string,
  message: string,
  color: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized: No session found.");
  // Ensure the user is authorized to edit this entry by checking id
  let userId = session!.user!.id;

  console.log(session);

  if (!userId) {
    const hashedEmail = await hashEmail(session!.user!.email!);
    userId = hashedEmail;
  }

  const added = await redis.sadd("guestbook:uniqueUsernames", userId);
  if (added === 0) {
    throw new Error("Duplicate entry: Username already exists.");
  }

  const entryId = await redis.incr("guestbook:nextId");
  const timestamp = Date.now().toString();
  await redis.hset(`guestbook:entry:${entryId}`, {
    name,
    message,
    userId,
    color,
    timestamp,
  });
  await redis.zadd("guestbook:entries", {
    score: Number(timestamp),
    member: entryId.toString(),
  });
  return entryId;
}

export async function EditGuestbookEntry(
  id: string,
  name: string,
  message: string,
  color: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized: No session found.");

  // Ensure the user is authorized to edit this entry by checking id
  let userId = session!.user!.id;

  if (!userId) {
    const hashedEmail = await hashEmail(session!.user!.email!);
    userId = hashedEmail;
  }

  const entry = await redis.hgetall(`guestbook:entry:${id}`);
  if (!entry) throw new Error(`Guestbook entry with id ${id} does not exist.`);
  if (entry.username !== userId) {
    throw new Error(
      `Unauthorized: You do not have permission to edit this entry.`,
    );
  }

  await redis.hset(`guestbook:entry:${id}`, {
    name,
    message,
    color,
  });
  return true;
}
