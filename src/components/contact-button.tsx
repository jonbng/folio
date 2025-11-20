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
  // Start with a consistent cursor for SSR to avoid hydration mismatch
  const [cursor, setCursor] = useState("pointer");

  useEffect(() => {
    // Only run on client after mount to avoid hydration issues
    const scrambledCursors = shuffleArray(cursors);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % scrambledCursors.length;
      setCursor(scrambledCursors[index]);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return cursor;
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
