"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import type { ImageType } from "@/lib/types";

interface GalleryGridProps {
  images: ImageType[];
  lastViewedPhoto: string | null;
  setLastViewedPhoto: (id: string) => void;
  openModal: (id: string) => void;
}

export function GalleryGrid({
  images,
  lastViewedPhoto,
  setLastViewedPhoto,
  openModal,
}: GalleryGridProps) {
  const lastViewedPhotoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && lastViewedPhotoRef.current) {
      lastViewedPhotoRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      setLastViewedPhoto("");
    }
  }, [lastViewedPhoto, setLastViewedPhoto]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          ref={image.id === lastViewedPhoto ? lastViewedPhotoRef : null}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={`/?photoId=${image.id}`}
            as={`/p/${image.id}`}
            className="relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer block"
            onClick={(e) => {
              e.preventDefault();
              openModal(image.id);
            }}
          >
            <Image
              src={image.mainUrl || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover transition-all duration-200 brightness-90 hover:brightness-110"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4}
              placeholder={image.blurDataUrl ? "blur" : "empty"}
              blurDataURL={image.blurDataUrl}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
