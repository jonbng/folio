"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";

import type { ImageType } from "@/lib/types";
import { GalleryGrid } from "@/components/gallery-grid";
import { ImageModal } from "@/components/image-modal";
import { useLastViewedPhoto } from "@/hooks/use-last-viewed-photo";

interface GalleryProps {
  images: ImageType[];
}

export function Gallery({ images }: GalleryProps) {
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null);

  const currentPhotoIndex = currentPhotoId
    ? images.findIndex((img) => img.id === currentPhotoId)
    : -1;

  const currentPhoto =
    currentPhotoIndex >= 0 ? images[currentPhotoIndex] : null;

  const closeModal = useCallback(() => {
    setCurrentPhotoId(null);
  }, []);

  const openModal = useCallback(
    (id: string) => {
      setCurrentPhotoId(id);
      setLastViewedPhoto(id);
    },
    [setLastViewedPhoto],
  );

  const changePhotoId = useCallback(
    (newId: string) => {
      setCurrentPhotoId(newId);
      setLastViewedPhoto(newId);
    },
    [setLastViewedPhoto],
  );

  const goToPrevious = useCallback(() => {
    if (currentPhotoIndex > 0) {
      changePhotoId(images[currentPhotoIndex - 1].id);
    }
  }, [currentPhotoIndex, images, changePhotoId]);

  const goToNext = useCallback(() => {
    if (currentPhotoIndex < images.length - 1) {
      changePhotoId(images[currentPhotoIndex + 1].id);
    }
  }, [currentPhotoIndex, images, changePhotoId]);

  return (
    <>
      <GalleryGrid
        images={images}
        lastViewedPhoto={lastViewedPhoto}
        setLastViewedPhoto={setLastViewedPhoto}
        openModal={openModal}
      />

      <AnimatePresence>
        {currentPhoto && (
          <ImageModal
            images={images}
            currentPhoto={currentPhoto}
            currentPhotoIndex={currentPhotoIndex}
            onClose={closeModal}
            onPrevious={goToPrevious}
            onNext={goToNext}
            changePhotoId={changePhotoId}
            hasPrevious={currentPhotoIndex > 0}
            hasNext={currentPhotoIndex < images.length - 1}
          />
        )}
      </AnimatePresence>
    </>
  );
}
