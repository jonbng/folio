"use client";

import { motion } from "motion/react";
import Balloon from "./balloon";
import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import MessageInput from "./message-input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect, useRef } from "react";
import { GuestbookEntry } from "@/types/guestbook";

export default function GuestbookFull({
  entries,
  setEntries,
  onCollapse,
  inputOpen,
}: {
  entries: GuestbookEntry[];
  setEntries: React.Dispatch<React.SetStateAction<GuestbookEntry[]>>;
  onCollapse: () => void;
  inputOpen: boolean;
}) {
  const isMobile = useMediaQuery("(max-width: 512px)");
  const balloonLayoutMode = isMobile ? "mobile" : "desktop";
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCollapse();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Restore focus when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [onCollapse]);

  useEffect(() => {
    // Check localStorage on component mount
    const submitted = localStorage.getItem("guestbook_submitted");
    setHasSubmitted(!!submitted);
  }, []);

  const handleSubmission = () => {
    // Set localStorage flag when user submits
    localStorage.setItem("guestbook_submitted", "true");
    setHasSubmitted(true);
  };

  const calculateContainerHeight = () => {
    if (balloonLayoutMode === "mobile") return undefined;

    // Similar grid calculation logic as in balloon component
    const containerPaddingX = 32;
    const estimatedItemWidth = 165;
    let gridCols = 5;

    if (typeof window !== "undefined") {
      const availableWidth = window.innerWidth - containerPaddingX;
      gridCols = Math.max(
        1,
        Math.floor((availableWidth - containerPaddingX) / estimatedItemWidth),
      );
    }

    const rowHeight = 160;
    const initialTopOffset = 60;
    const numRows = Math.ceil(entries.length / gridCols);
    const totalHeight = numRows * rowHeight + initialTopOffset;

    // Add extra padding at the bottom
    return `${totalHeight + 100}px`;
  };

  const [containerHeight, setContainerHeight] = useState<string | undefined>(
    calculateContainerHeight(),
  );

  useEffect(() => {
    const updateHeight = () => {
      setContainerHeight(calculateContainerHeight());
    };

    updateHeight();
    if (balloonLayoutMode === "desktop") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length, balloonLayoutMode]);

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
        role="dialog"
        aria-modal="true"
        aria-labelledby="guestbook-title"
      >
        <motion.div
          ref={modalRef}
          layoutId="guestbook-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl bg-zinc-50 p-6 border-2 border-zinc-700 z-50 flex flex-col min-h-[96.85vh] sm:min-h-[95.25vh] md:min-h-[93.7vh]"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
          tabIndex={-1}
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
                className="hover:bg-zinc-900 rounded-full bg-zinc-800 transition-transform duration-200 hover:scale-110 cursor-pointer"
                onClick={onCollapse}
                aria-label="Close guestbook"
              >
                <XIcon className="h-6 w-6 text-zinc-100" strokeWidth={2} />
              </Button>
            </motion.div>
          </div>

          <div
            className={`shrink-0 flex flex-col gap-2
                ${balloonLayoutMode === "mobile" ? "mb-14" : "mb-4"}
            `}
          >
            <h2
              id="guestbook-title"
              className="text-md font-semibold text-zinc-700 tracking-widest uppercase"
            >
              Guestbook!
            </h2>
            <p className="text-md text-zinc-500 hidden sm:block">
              Thanks for visiting! Feel free to leave a message. ❤️
            </p>
            <p className="text-md text-zinc-500 block sm:hidden">
              Click on the balloons to read the messages!
            </p>
          </div>

          <div
            className={`flex-grow relative ${
              balloonLayoutMode === "mobile"
                ? "flex flex-col items-center"
                : "min-h-full"
            }`}
            style={{ minHeight: containerHeight }}
          >
            {entries.map((entry, index) => (
              <Balloon
                key={`entry-${index}`}
                entry={entry}
                index={index}
                layoutMode={balloonLayoutMode}
              />
            ))}
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

      <div className="fixed sm:fixed inset-x-0 bottom-0 z-[51] p-4 bg-gradient-to-t from-white to-transparent pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="flex justify-center items-center pointer-events-auto mx-auto max-w-3xl"
        >
          <div className="bg-zinc-50 border-2 border-zinc-700 text-black rounded-2xl shadow-lg w-full sm:w-auto">
            {hasSubmitted ? (
              <p className="text-zinc-700 p-4">
                Thank you for your message! 🎈
              </p>
            ) : (
              <MessageInput
                setEntries={setEntries}
                onSubmit={handleSubmission}
                inputOpen={inputOpen}
              />
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
