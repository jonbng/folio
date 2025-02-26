"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

// Generate a large array of photos that will loop
const generatePhotos = (count: number) => {
  const basePhotos = [
    {
      id: 1,
      src: "/placeholder.svg?height=800&width=1200",
      alt: "Mountain landscape",
      name: "Mountain Vista",
      date: "2023-06-15",
      location: "Rocky Mountains, Colorado",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=800&width=1200",
      alt: "Forest trail",
      name: "Forest Path",
      date: "2023-05-22",
      location: "Redwood National Park, California",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=800&width=1200",
      alt: "Sunset over hills",
      name: "Golden Hour",
      date: "2023-04-10",
      location: "Tuscany, Italy",
    },
  ];

  return Array(Math.ceil(count / basePhotos.length))
    .fill(basePhotos)
    .flat()
    .slice(0, count)
    .map((photo, index) => ({
      ...photo,
      id: index + 1,
    }));
};

const photos = generatePhotos(30); // Generate 30 photos for infinite scroll effect

export default function PhotographyPortfolio() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    id: number;
    src: string;
    alt: string;
    name: string;
    date: string;
    location: string;
  } | null>(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll({
    container: containerRef,
  });

  // Create infinite scroll effect
  const y = useTransform(scrollY, [0, 5000], [0, -5000]);

  return (
    <main className="h-screen overflow-hidden">
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 text-sm font-medium flex items-center gap-1 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="animate-underline">Back to home</span>
      </Link>

      <div ref={containerRef} className="h-full overflow-y-auto">
        <motion.div
          style={{ y }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 p-2"
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer aspect-[4/3] overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={1200}
                height={800}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full mx-auto p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <div className="absolute bottom-8 left-8 bg-black/80 p-4 backdrop-blur-sm rounded-lg">
                <h3 className="text-2xl font-bold">{selectedPhoto.name}</h3>
                <p className="text-zinc-400 mt-2">
                  {selectedPhoto.date} • {selectedPhoto.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
