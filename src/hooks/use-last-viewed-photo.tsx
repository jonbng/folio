"use client";

import { useState } from "react";

export function useLastViewedPhoto() {
  // Initialize state with localStorage value
  const [lastViewedPhoto, setLastViewedPhoto] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lastViewedPhoto");
    }
    return null;
  });

  const setLastViewedPhotoWithStorage = (id: string) => {
    if (id) {
      localStorage.setItem("lastViewedPhoto", id);
    } else {
      localStorage.removeItem("lastViewedPhoto");
    }
    setLastViewedPhoto(id);
  };

  return [lastViewedPhoto, setLastViewedPhotoWithStorage] as const;
}
