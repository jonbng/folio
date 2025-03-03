"use client";

import { useState, useEffect } from "react";

export function useLastViewedPhoto() {
  const [lastViewedPhoto, setLastViewedPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a last viewed photo in localStorage
    const lastViewed = localStorage.getItem("lastViewedPhoto");
    if (lastViewed) {
      setLastViewedPhoto(lastViewed);
    }
  }, []);

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
