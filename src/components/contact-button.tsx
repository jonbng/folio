"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const cursors = [
  "default",
  "pointer",
  "crosshair",
  "move",
  "text",
  "wait",
  "help",
  "progress",
  "not-allowed",
  "context-menu",
  "cell",
  "vertical-text",
  "alias",
  "copy",
  "no-drop",
  "all-scroll",
  "col-resize",
  "row-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "zoom-in",
  "zoom-out",
];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const useChangingCursor = () => {
  // mounted flag to delay randomized behavior until client-side
  const [mounted, setMounted] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [scrambledCursors, setScrambledCursors] = useState<string[]>([
    "default",
  ]);

  useEffect(() => {
    // set mounted flag to true once on client
    setMounted(true);

    // Only perform the randomization on client
    const shuffled = shuffleArray(cursors);
    setScrambledCursors(shuffled);

    // Set up the interval for changing cursor every 250ms
    const interval = setInterval(() => {
      setCursorIndex((prevIndex) => (prevIndex + 1) % shuffled.length);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // On the server (or before mounting), always return "default" to match SSR
  return mounted ? scrambledCursors[cursorIndex] : "default";
};

export const ContactButton: React.FC = () => {
  const cursor = useChangingCursor();

  return (
    <Button
      asChild
      variant="link"
      style={{ cursor }}
      className="p-0 h-auto font-semibold hidden sm:inline-flex"
    >
      <a href="mailto:contact@jonathanb.dk" className="animate-underline">
        Let&apos;s Talk
      </a>
    </Button>
  );
};
