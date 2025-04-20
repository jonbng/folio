"use client";

import { motion } from "motion/react";
import Balloon, { BalloonEntry } from "./balloon";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import MessageInput from "./message-input";
import { useSession } from "next-auth/react";
import Login from "./login";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function GuestbookFull({
  entries,
  setEntries,
  onCollapse,
}: {
  entries: BalloonEntry[];
  setEntries: (entries: BalloonEntry[]) => void;
  onCollapse: () => void;
}) {
  const { data: session } = useSession();

  const handleMessageAdded = (newEntry: BalloonEntry) => {
    setEntries([...entries, newEntry]);
  };

  const isMobile = useMediaQuery("(max-width: 512px)");
  const balloonLayoutMode = isMobile ? "mobile" : "desktop";

  return (
    <>
      <div
        className="fixed inset-0 z-40 overflow-y-auto p-4 sm:p-6 md:p-8 flex items-start justify-center bg-white/80 backdrop-blur-sm"
        onClick={(e) => {
          // Close only if clicking the backdrop itself, not the content
          if (e.target === e.currentTarget) {
            onCollapse();
          }
        }}
      >
        <motion.div
          layoutId="guestbook-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl bg-zinc-50 p-6 border-2 border-zinc-700 z-50 flex flex-col min-h-[96vh] sm:min-h-[94vh] md:min-h-[93vh]"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          <div className="absolute top-4 right-4 z-[51]">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
            >
              <Button
                variant="actualGhost"
                size="icon"
                className="hover:bg-zinc-900 rounded-full bg-zinc-800 transition-transform duration-200 hover:scale-110"
                onClick={onCollapse}
              >
                <XIcon className="h-5 w-5 text-zinc-100" />
                <span className="sr-only">Close</span>
              </Button>
            </motion.div>
          </div>

          <div
            className={`shrink-0 flex flex-col gap-2
                ${balloonLayoutMode === "mobile" ? "mb-14" : "mb-4"}
            `}
          >
            <h2 className="text-md font-semibold text-zinc-700 tracking-widest uppercase">
              Guestbook!
            </h2>
            <p className="text-md text-zinc-500">
              Thanks for visiting! Feel free to leave a message. ❤️
            </p>
          </div>

          <div
            className={`flex-grow relative ${
              balloonLayoutMode === "mobile"
                ? "flex flex-col items-center"
                : "min-h-full"
            }`}
          >
            {[...Array(1)].flatMap((_, i) =>
              entries.map((entry, index) => (
                <Balloon
                  key={`entry-${i}-${entry.id}`}
                  entry={entry}
                  index={index + i * entries.length}
                  layoutMode={balloonLayoutMode}
                />
              ))
            )}
            {!entries.length && (
              <div className="absolute inset-0 flex justify-center items-center min-h-[200px]">
                <p className="text-sm text-zinc-500">
                  Loading messages<span className="animate-pulse">...</span>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black p-3 sm:p-4 rounded-full shadow-lg z-[51] text-center flex flex-row items-center justify-center gap-4 px-6"
      >
        {session ? (
          <MessageInput onMessageAdded={handleMessageAdded} />
        ) : (
          <Login />
        )}
      </motion.div>
    </>
  );
}
