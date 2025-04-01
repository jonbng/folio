import { GetAllGuestbookEntries } from "@/lib/guestbookActions";
import { useEffect, useState } from "react";
import Balloon, { BalloonEntry } from "./balloon";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GuestbookShowcase() {
  const [entries, setEntries] = useState<BalloonEntry[]>([]);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const fetchedEntries = await GetAllGuestbookEntries();
        const sortedEntries = fetchedEntries.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setEntries(sortedEntries);
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
      }
    }
    fetchEntries();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-between items-center mb-15">
        <div>
          <h2 className="text-md font-semibold text-zinc-700 tracking-widest uppercase">
            Guestbook!
          </h2>
          {/* <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-500">
              {entries.length} messages
            </span>
            <span className="text-zinc-400"> from my lovely visitors</span>
          </p> */}
          <p className="text-md text-zinc-500">
            Please consider leaving a message! It would mean a lot to me!
          </p>
        </div>
        <Button variant="link" asChild className="p-0 h-auto font-semibold">
          <Link href="/guestbook" className="flex items-center gap-1">
            <span className="animate-underline">Open Full</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Force the container to be full width */}
      <div className="w-full relative pt-8">
        {/* Inner container animated to the left */}
        <div className="flex flex-row gap-8 animate-marquee ">
          {entries.map((entry, index) => (
            <Balloon
              key={`first-${entry.id}`}
              entry={entry}
              index={index}
              inALine={true}
            />
          ))}
          {/* Duplicate for seamless looping */}
          {entries.map((entry, index) => (
            <Balloon
              key={`second-${entry.id}`}
              entry={entry}
              index={index}
              inALine={true}
            />
          ))}
        </div>
      </div>

      {!entries.length && (
        <div className="flex justify-center items-center h-32">
          <p className="text-sm text-zinc-500">
            Loading messages
            <span className="animate-pulse">...</span>
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
