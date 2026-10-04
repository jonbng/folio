"use client";

import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "/1.jpg",
    alt: "Lofoten, Norway",
  },
  { id: 2, src: "/2.jpg", alt: "Narvik, Norway" },
  {
    id: 3,
    src: "/3.jpg",
    alt: "Festvågtinden, Norway",
  },
];

export default function BeyondCoding() {
  return (
    <section className="my-16">
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-[var(--foreground)] mb-2">
        Beyond Coding 🏞️
      </h2>
      <p className="text-lg text-[var(--muted-foreground)] mb-8">
        When I&apos;m not coding, you can find me exploring nature trails and
        capturing moments with my camera.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {photos.map((photo) => (
          <div key={photo.id}>
            <div className="group overflow-hidden rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                width={400}
                height={300}
                className="rounded-xl object-cover w-full h-48 transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              {photo.alt}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
