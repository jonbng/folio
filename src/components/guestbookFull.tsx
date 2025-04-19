"use client";

import { motion } from "motion/react";
import Balloon, { BalloonEntry } from "./balloon";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import MessageInput from "./message-input";
import { useSession } from "next-auth/react";
import Login from "./login";

export default function GuestbookFull({entries, setEntries, onCollapse}: {entries: BalloonEntry[], setEntries: (entries: BalloonEntry[]) => void, onCollapse: () => void}) {
  const { data: session } = useSession();

  // Handler for when a new message is added
  const handleMessageAdded = (newEntry: BalloonEntry) => {
    setEntries([...entries, newEntry]);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onCollapse}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="fixed right-8 sm:right-24 top-8 sm:top-16 z-50 cursor-pointer"
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="actualGhost"
            size="icon"
            className="hover:bg-zinc-700 rounded-full bg-zinc-800 z-50 cursor-pointer"
            onClick={onCollapse}
          >
            <XIcon className="h-6 w-6 text-white" width={5} />
            <span className="sr-only">Close</span>
          </Button>
        </motion.div>

      <motion.div
        layoutId="guestbook-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-4 sm:inset-6 md:inset-8 rounded-2xl bg-zinc-50 p-6 border-2 border-zinc-700 z-40 flex flex-col overflow-hidden"
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
          </div>

          <div className="w-full relative">
            <div
              className="flex flex-row gap-8 h-0"
            >
              {[...Array(3)].flatMap((_, i) =>
                entries.map((entry, index) => (
                  <Balloon
                    key={`entry-${i}-${entry.id}`}
                    entry={entry}
                    index={index + i * entries.length}
                    inALine={false}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {!entries.length && (
          <div className="flex justify-center items-center h-32">
            <p className="text-sm text-zinc-500">
              Loading messages<span className="animate-pulse">...</span>
            </p>
          </div>
        )}

        <motion.div
          initial={{ y: 50, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          transition={{ type: "spring", stiffness: 100 }}
            className="fixed bottom-12 left-1/2 bg-white text-black p-4 rounded-full shadow-lg z-50 text-center flex flex-row items-center justify-center gap-4 px-6"
          >
            {session ? (
              <MessageInput onMessageAdded={handleMessageAdded} />
            ) : (
            <Login />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
