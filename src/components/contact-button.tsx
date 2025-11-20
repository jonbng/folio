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
  // Initialize with a function to avoid hydration issues
  const [scrambledCursors] = useState(() => shuffleArray(cursors));
  const [cursorIndex, setCursorIndex] = useState(0);

  useEffect(() => {
    // Set up the interval for changing cursor every 250ms
    const interval = setInterval(() => {
      setCursorIndex((prevIndex) => (prevIndex + 1) % scrambledCursors.length);
    }, 250);

    return () => clearInterval(interval);
  }, [scrambledCursors.length]);

  return scrambledCursors[cursorIndex];
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
