"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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

export default function BeyondCoding() {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-bold mb-8">Beyond Coding 🏞️</h2>
      <p className="text-lg text-zinc-600 mb-8">
        When I&apos;m not coding, you can find me exploring nature trails and
        capturing moments through my lens.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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
      <Button
        variant="link"
        asChild
        className="p-0 h-auto font-semibold text-zinc-900 hover:no-underline group"
      >
        <Link href="/photography" className="flex items-center gap-1">
          <span className="animate-underline">View full portfolio</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </section>
  );
}
