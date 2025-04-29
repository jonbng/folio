"use server";

import { Redis } from "@upstash/redis";
import { GuestbookEntry } from "@/types/guestbook";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GetAllGuestbookEntries(): Promise<Array<GuestbookEntry>> {
  const entryIds = await redis.zrange("guestbook:entries", 0, -1);
  const entries = await Promise.all(
    entryIds.map(async (id) => {
      const entry = await redis.hgetall(`guestbook:entry:${id}`);
      if (!entry) {
        return {
          id: String(id),
          name: "",
          message: "",
          color: "",
          timestamp: new Date().toISOString(),
        };
      }
      return {
        id: String(id),
        name: String(entry.name || ""),
        message: String(entry.message || ""),
        color: String(entry.color || ""),
        // Convert numeric timestamp to ISO string if it's numeric
        timestamp: !isNaN(Number(entry.timestamp))
          ? new Date(Number(entry.timestamp)).toISOString()
          : String(entry.timestamp || new Date().toISOString()),
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
): Promise<string> {
  const entryId = await redis.incr("guestbook:nextId");
  const timestamp = new Date().toISOString();

  await redis.hset(`guestbook:entry:${entryId}`, {
    name,
    message,
    color,
    timestamp,
  });

  await redis.zadd("guestbook:entries", {
    score: new Date(timestamp).getTime(),
    member: entryId.toString(),
  });

  return entryId.toString();
}

// export async function EditGuestbookEntry(
//   id: string,
//   name: string,
//   message: string,
//   color: string,
// ) {
//   const entry = await redis.hgetall(`guestbook:entry:${id}`);
//   if (!entry) throw new Error(`Guestbook entry with id ${id} does not exist.`);

//   await redis.hset(`guestbook:entry:${id}`, {
//     name,
//     message,
//     color,
//   });
//   return true;
// }
