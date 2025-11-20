"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PressItem {
  id: number;
  title: string;
  publication: string;
  date: string;
  image: string;
  link: string;
  type: "press";
}

interface AwardItem {
  id: number;
  title: string;
  organization: string;
  date: string;
  image: string;
  link: string;
  type: "award";
}

type Item = PressItem | AwardItem;

const pressItems: PressItem[] = [
  {
    id: 1,
    title: "Shark Tank Junior (DK) - Akademia (Episode 10)",
    publication: "DRDK",
    date: "2024-12-06",
    image: "/dr.jpg",
    link: "https://www.dr.dk/drtv/serie/loevens-hule-junior_479046",
    type: "press",
  },
  {
    id: 2,
    title: "Ung forsker nåede til tops igen (Mentioned)",
    publication: "Sjællandske Nyhedder",
    date: "2024-04-24",
    image: "/sn.jpg",
    link: "https://www.sn.dk/art245862/roskilde-kommune/uddannelse/ung-forsker-naaede-til-tops-igen/#:~:text=Hj%C3%A6lp%20til%20at,B%C3%B8rne%2D%20og%20Undervisningsministeriet.",
    type: "press",
  },
];

const awards: AwardItem[] = [
  {
    id: 4,
    title: "Junior Technology Category 1st Place",
    organization: "Astra Unge Forskere",
    date: "2024-05-01",
    image: "/uf.jpg",
    link: "https://ungeforskere.dk/finalist/forbedret-opgave-og-noteplatform-til-undervisning/",
    type: "award",
  },
  {
    id: 5,
    title: "Best overall game Coding Pirates Game Jam",
    organization: "Coding Pirates",
    date: "2021-01-01",
    image: "/codingpirates.webp",
    link: "#",
    type: "award",
  },
  {
    id: 6,
    title: "Best game design Coding Pirates Game Jam",
    organization: "Coding Pirates",
    date: "2022-01-01",
    image: "/codingpirates.webp",
    link: "https://nth1nk.itch.io/gravitydrop",
    type: "award",
  },
  {
    id: 7,
    title: "Best overall game Coding Pirates Game Jam",
    organization: "Coding Pirates",
    date: "2023-01-01",
    image: "/codingpirates.webp",
    link: "https://youtu.be/ISCwyceiP0U?feature=shared&t=482",
    type: "award",
  },
];

const allItems: Item[] = [...awards, ...pressItems].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function PressAndRecognitionShowcase() {
  const [count, setCount] = useState(3);
  const displayedItems = allItems.slice(0, count);

  const isPressItem = (item: Item): item is PressItem => item.type === "press";

  return (
    <section className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-zinc-500 tracking-widest uppercase">
          Recognition
        </h2>
        <Button variant="link" asChild className="p-0 h-auto font-semibold">
          <Link href="/press-kit" className="flex items-center gap-1">
            <span className="animate-underline">Press Kit</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <motion.div
        layout
        transition={{ layout: { duration: 0.5 } }}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <AnimatePresence initial={false}>
            {displayedItems.map((item, index) => (
              <motion.a
                layout
                key={item.id}
                href={item.link}
                className="group flex flex-row items-center gap-6 cursor-pointer mb-5"
                initial={index >= 3 ? { opacity: 0, y: -25 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.4 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-auto">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={
                      isPressItem(item) ? item.publication : item.organization
                    }
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-[100px] h-[100px]"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold group-hover:text-zinc-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 mt-1">
                    {isPressItem(item) ? (
                      <>
                        <Newspaper className="inline-block w-4 h-4 mr-1" />
                        {item.publication} • {item.date}
                      </>
                    ) : (
                      <>
                        <Award className="inline-block w-4 h-4 mr-1" />
                        {item.organization} • {item.date}
                      </>
                    )}
                  </p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
          {count < allItems.length && (
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => setCount(allItems.length)}
            >
              <span className="animate-underline">Show more</span>
            </Button>
          )}
          {count === allItems.length && (
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => setCount(3)}
            >
              <span className="animate-underline">Show less</span>
            </Button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
