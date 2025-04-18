"use client";
import { motion } from "motion/react";
import Balloon, { BalloonEntry } from "./balloon";
import { Button } from "./ui/button";
import { Maximize } from "lucide-react";

export default function GuestbookPreview(
  {entries, onExpand}: {entries: BalloonEntry[], onExpand: () => void}
) {
  return (
    <>
      <div
        id="guestbook"
        className="relative bottom-80 invisible"
      />
      <motion.div
        layoutId="guestbook-container"
        className="overflow-hidden rounded-2xl bg-zinc-50 p-6 flex flex-col justify-between border-2 border-zinc-700 h-96"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-15">
            <div>
              <h2 className="text-md font-semibold text-zinc-700 tracking-widest uppercase">
                Guestbook!
              </h2>
              <p className="text-md text-zinc-500">
                Please consider leaving a message! It would mean a lot to me!
                <span className="animate-pulse duration-1500 from-95% to-100%">
                  {" "}
                  ❤️
                </span>
              </p>
            </div>
            <p className="text-sm text-zinc-500 p-0 h-auto">
              <span className="font-semibold text-zinc-500">
                {entries.length} messages
              </span>
              <span className="text-zinc-400"> from my lovely visitors</span>
            </p>
          </div>

          <div className={`w-full relative`}>
            <div
              className={`flex flex-row gap-8 h-0 animate-marquee`}
            >
              {[...Array(3)].flatMap((_, i) =>
                entries.map((entry, index) => (
                  <Balloon
                    key={`entry-${i}-${entry.id}`}
                    entry={entry}
                    index={index + i * entries.length}
                    inALine={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onExpand}
            variant="actualGhost"
            className="flex items-center gap-2 z-50 cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Maximize className="h-4 w-4" />
            <span>Expand Guestbook</span>
          </Button>
        </div>

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
        `}</style>
      </motion.div>
    </>
  );
}
