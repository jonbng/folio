"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GetAllGuestbookEntries } from "@/lib/guestbookActions";
import { DuplicateShowcasedEntries } from "@/lib/utils";
import Balloon, { BalloonEntry } from "./balloon";
import { Button } from "./ui/button";
import { Maximize, Minimize } from "lucide-react";
import MessageInput from "./message-input";
import { useSession } from "next-auth/react";
import Login from "./login";
import { useGuestbookPosition } from "@/hooks/use-guestbook-position";
import { useScrollDetection } from "@/hooks/use-scroll-detection";

type GuestbookProps = {
  guestbookReference: React.RefObject<HTMLDivElement>;
  scrollReference: React.RefObject<HTMLDivElement>;
};

export default function Guestbook({
  guestbookReference,
  scrollReference,
}: GuestbookProps) {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<BalloonEntry[]>([]);
  const [showedEntries, setShowedEntries] = useState<BalloonEntry[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Get positioning values from the custom hook
  const {
    absoluteStyle,
    fixedStyle,
    hasInitialPosition,
    updateCollapsedPosition,
  } = useGuestbookPosition(guestbookReference, isExpanded);
  const isFixed = useScrollDetection(
    guestbookReference,
    isExpanded,
    updateCollapsedPosition
  );

  // Load guestbook entries on mount
  useEffect(() => {
    async function fetchEntries() {
      try {
        const fetchedEntries = await GetAllGuestbookEntries();
        setEntries(fetchedEntries);
        setShowedEntries(DuplicateShowcasedEntries(fetchedEntries));
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
      }
    }
    fetchEntries();
  }, []);

  // Expand/collapse logic with smooth scroll when expanding
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        scrollReference.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      setShowedEntries(entries);
      return () => clearTimeout(timer);
    } else {
      setShowedEntries(DuplicateShowcasedEntries(entries));
    }
  }, [isExpanded, entries, scrollReference]);

  // Handler for when a new message is added
  const handleMessageAdded = (newEntry: BalloonEntry) => {
    setEntries((prev) => {
      const updated = [...prev, newEntry];
      setShowedEntries(DuplicateShowcasedEntries(updated));
      return updated;
    });
  };

  // Toggle expand/collapse state
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Animation variants for expanded state
  const variants = {
    expanded: {
      top: "2.5%",
      left: "2.5%",
      width: "95vw",
      height: "95vh",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Do not render until initial layout is measured
  if (!hasInitialPosition) return <div style={{ display: "none" }} />;

  return (
    <>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-white z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleExpand}
        />
      )}

      <motion.div
        className={`overflow-hidden rounded-2xl bg-zinc-50 p-6 z-50 flex flex-col justify-between border-2 border-zinc-700 ${
          isExpanded || isFixed ? "fixed" : "absolute"
        }`}
        animate={isExpanded ? "expanded" : undefined}
        variants={variants}
        style={isExpanded || isFixed ? fixedStyle : absoluteStyle}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-15">
            <div>
              <h2 className="text-md font-semibold text-zinc-700 tracking-widest uppercase">
                Guestbook!
              </h2>
              <p className="text-md text-zinc-500">
                Please consider leaving a message! It would mean a lot to me!
              </p>
            </div>
            <p className="text-sm text-zinc-500 p-0 h-auto">
              <span className="font-semibold text-zinc-500">
                {entries.length} messages
              </span>
              <span className="text-zinc-400"> from my lovely visitors</span>
            </p>
          </div>

          <div className={`w-full relative${isExpanded ? "" : " mb-48"}`}>
            <div
              className={`flex flex-row gap-8 h-0${
                !isExpanded ? " animate-marquee" : ""
              }`}
            >
              {[...Array(3)].flatMap((_, i) =>
                showedEntries.map((entry, index) => (
                  <Balloon
                    key={`entry-${i}-${entry.id}`}
                    entry={entry}
                    index={index + i * showedEntries.length}
                    inALine={!isExpanded}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {!showedEntries.length && (
          <div className="flex justify-center items-center h-32">
            <p className="text-sm text-zinc-500">
              Loading messages<span className="animate-pulse">...</span>
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            onClick={toggleExpand}
            variant="actualGhost"
            className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExpanded ? (
              <>
                <Minimize className="h-4 w-4" />
                <span>Collapse Guestbook</span>
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4" />
                <span>Expand Guestbook</span>
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed bottom-10 left-1/2 bg-white text-black p-4 rounded-full shadow-lg z-50 text-center flex flex-row items-center justify-center gap-4 px-6"
          >
            {session ? (
              <MessageInput onMessageAdded={handleMessageAdded} />
            ) : (
              <Login />
            )}
          </motion.div>
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
        `}</style>
      </motion.div>
    </>
  );
}
