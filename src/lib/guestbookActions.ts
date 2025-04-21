"use server";

import { Redis } from "@upstash/redis";
import { auth } from "./auth";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

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
  username: string,
  color: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized: No session found.");
  // Ensure the user is authorized to edit this entry by checking email
  const userEmail = session!.user!.email;

  // Check if the username matches the session email
  if (username !== userEmail) {
    throw new Error(
      `Unauthorized: You do not have permission to add an entry with username ${username}.`,
    );
  }

  const added = await redis.sadd("guestbook:uniqueUsernames", username);
  if (added === 0) {
    throw new Error("Duplicate entry: Username already exists.");
  }

  const entryId = await redis.incr("guestbook:nextId");
  const timestamp = Date.now().toString();
  await redis.hset(`guestbook:entry:${entryId}`, {
    name,
    message,
    username,
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
  username: string,
  color: string,
) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized: No session found.");

  // Ensure the user is authorized to edit this entry by checking email
  const userEmail = session!.user!.email;
  const entry = await redis.hgetall(`guestbook:entry:${id}`);
  if (!entry) throw new Error(`Guestbook entry with id ${id} does not exist.`);
  if (entry.username !== userEmail) {
    throw new Error(
      `Unauthorized: You do not have permission to edit this entry.`,
    );
  }

  await redis.hset(`guestbook:entry:${id}`, {
    name,
    message,
    username,
    color,
  });
  return true;
}
