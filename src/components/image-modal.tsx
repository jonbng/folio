"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Download, X, Twitter } from "lucide-react";
// import { useSwipeable } from "react-swipeable";

import type { ImageType } from "@/lib/types";
import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

async function downloadImage(imageUrl: string, imageName: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${imageName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}

interface ImageModalProps {
  images: ImageType[];
  currentPhoto: ImageType;
  currentPhotoIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  changePhotoId: (id: string) => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function ImageModal({
  images,
  currentPhoto,
  currentPhotoIndex,
  onClose,
  onPrevious,
  onNext,
  changePhotoId,
  hasPrevious,
  hasNext,
}: ImageModalProps) {
  // const [isLoaded, setIsLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    timeout = setTimeout(() => setShowControls(false), 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (hasPrevious) {
          onPrevious();
        }
      } else if (e.key === "ArrowRight") {
        if (hasNext) {
          onNext();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasPrevious, hasNext, onPrevious, onNext, onClose]);

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => hasNext && onNext(),
  //   onSwipedRight: () => hasPrevious && onPrevious(),
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true,
  // });

  return (
    // <TooltipProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            {/* <Tooltip>
              <TooltipTrigger asChild> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(
                      currentPhoto.fullResUrl,
                      `image-${currentPhoto.id}`,
                    );
                  }}
                >
                  <Download className="h-5 w-5" />
                </Button>
              {/* </TooltipTrigger>
              <TooltipContent>
                <p>Download image</p>
              </TooltipContent>
            </Tooltip> */}

            {/* <Tooltip>
              <TooltipTrigger asChild> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    const tweetText = encodeURIComponent(
                      `Check out this amazing photo from Jonathan Bangert's gallery!`,
                    );
                    const tweetUrl = encodeURIComponent(
                      `https://yourdomain.com/p/${currentPhoto.id}`,
                    );
                    window.open(
                      `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`,
                      "_blank",
                    );
                  }}
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              {/* </TooltipTrigger>
              <TooltipContent>
                <p>Share on Twitter</p>
              </TooltipContent>
            </Tooltip> */}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="absolute inset-0 flex items-center justify-center p-4 md:p-10"
          onClick={(e) => e.stopPropagation()}
          // {...handlers}
        >
          <div className="relative w-full max-w-5xl aspect-[3/2] overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentPhoto.modalUrl || "/placeholder.svg"}
                  alt={currentPhoto.alt || "Gallery image"}
                  className="object-contain"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  // onLoadingComplete={() => setIsLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {hasPrevious && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0",
            )}
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {hasNext && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0",
            )}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-50 overflow-x-auto py-4 px-2 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2 items-center justify-center">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={cn(
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded transition-all",
                  currentPhotoIndex === index
                    ? "ring-2 ring-white"
                    : "opacity-60 hover:opacity-100",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  changePhotoId(image.id);
                }}
              >
                <Image
                  src={image.thumbnailUrl || "/placeholder.svg"}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    // </TooltipProvider>
  );
}
