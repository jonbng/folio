"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const photos = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=400",
    alt: "Mountain landscape",
  },
  { id: 2, src: "/placeholder.svg?height=300&width=400", alt: "Forest trail" },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=400",
    alt: "Sunset over hills",
  },
];

export default function PhotographyShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="my-32">
      <h2 className="text-2xl font-bold mb-8">Photography</h2>
      <p className="text-lg text-zinc-600 mb-8">
        When I&apos;m not coding, you can find me exploring nature trails and
        capturing moments through my lens.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={photo.src || "/placeholder.svg"}
              alt={photo.alt}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
          </motion.div>
        ))}
      </div>
      <Button onClick={() => setIsOpen(true)} className="flex items-center">
        <Camera className="w-5 h-5 mr-2" />
        View Full Portfolio
      </Button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="bg-white p-8 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Photography Portfolio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Add more photos here */}
              {[...Array(9)].map((_, index) => (
                <Image
                  key={index}
                  src={`/placeholder.svg?height=300&width=400`}
                  alt={`Portfolio image ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
