"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";

const works = [
  {
    id: 1,
    title: "Akademia",
    tag: "Founder",
    link: "https://akademia.cc",
    tagColor: "bg-green-100 text-green-800",
    description:
      "A reimagined platform for schools that transforms how students learn and teachers teach.",
    shortDescription: "Reimagining the Danish school systems software.",
    image: "/akademia.png",
    year: "2023 — Present",
    detailedDescription:
      "Akademia simplifies how schools handle learning. It brings assignments, grading, and communication into one platform, replacing the need for multiple tools. Teachers can create assignments, track progress, and give feedback in one place. Students get a clear view of their coursework, deadlines, and feedback, making it easier to stay organized and focused. This project won 1st place in the Junior Technology category at Unge Forskere, and we got to present it at Shark Tank Junior where we got a mentor.",
    technologies: [
      "Svelte",
      "Kubernetes",
      "Supabase",
      "Express.js",
      "Tailwind CSS",
      "TipTap",
      "Rust",
      "Cloudflare",
    ],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Co-Founder",
        avatar: "/pfp.jpg",
      },
      {
        name: "Elliott Friedrich",
        role: "Co-Founder",
        avatar: "/elliott.jpg",
        link: "https://www.linkedin.com/in/elliott-friedrich-0460962b0/",
      },
    ],
  },
  {
    id: 6,
    cover: "cover",
    title: "AlfaBeta",
    tag: "For fun 😎",
    link: "https://alfabeta.dk",
    tagColor: "bg-yellow-100 text-yellow-800",
    shortDescription: "The only link shortener you'll ever need.",
    image: "/alfabeta.png",
    year: "2024",
    detailedDescription:
      "I made AlfaBeta because I needed a link shortener that was better than other sites such as bit.ly and tinyurl, yet simpler than dub.co. I wanted to be able to create short links with custom aliases and domains and track their performance. It was also just made as a fun side project.",
    description:
      "AlfaBeta is a link shortener that allows you to create short links with custom aliases and track their performance.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Supabase",
      "ShadCN UI",
      "Vercel",
    ],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Designer & Developer",
        avatar: "/pfp.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Flimmer",
    tag: "Work",
    link: "https://flimmer.app",
    tagColor: "bg-blue-100 text-blue-800",
    description:
      "Flimmer is a video app for kids that turns screen time into active play with interactive tasks and a safe community.",
    shortDescription: "Turning screen time to play time.",
    image: "/flimmer.svg",
    year: "2022 — Present",
    detailedDescription:
      "Flimmer is a social video app designed for children aged 6 to 12, aiming to transform screen time into active play. It offers a curated selection of child-friendly videos from trusted creators, each encouraging offline activities through engaging tasks and quizzes. Children can share photos, earn points, and participate in a safe, age-appropriate community. Flimmer avoids features like endless feeds, focusing instead on promoting real-world play and learning.",
    technologies: [
      "React Native",
      "Expo",
      "Convex",
      "Cloudflare",
      "Graphite",
      "Clerk",
      "Turbo",
    ],
    team: [
      {
        name: "Rasmus Kolbe",
        role: "Founder",
        avatar:
          "https://flimmer.app/_next/image?url=%2Fteam-pics%2Frasmus.png&w=3840&q=75",
        link: "https://www.linkedin.com/in/rasmus-kolbe-761a7453",
      },
      {
        name: "Maria Baagøe Bove",
        role: "Chief Operating Officer",
        avatar:
          "https://flimmer.app/_next/image?url=%2Fteam-pics%2Fmaria.png&w=3840&q=75",
        link: "https://www.linkedin.com/in/maria-baag%C3%B8e-bove-11611687",
      },
      {
        name: "Mark Pallisgaard",
        role: "Head of Content",
        avatar:
          "https://flimmer.app/_next/image?url=%2Fteam-pics%2Fmark.png&w=3840&q=75",
        link: "https://www.linkedin.com/in/mark-pallisgaard-hansen-74235583",
      },
      {
        name: "Emma Illgner",
        role: "SoMe Manager",
        avatar:
          "https://ca.slack-edge.com/T6U833XV2-U0894V6AYUA-19543bcf68d3-512",
        link: "https://www.linkedin.com/in/emma-illgner-8527a7222/",
      },
      {
        name: "Jan-Georges Jersild Balin",
        role: "Senior Software Engineer",
        avatar:
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSycH4nNuxZY_szug1Q-ZlYQK_be-gngwghI1Zc3wI4t9dVKX_y",
        link: "https://www.linkedin.com/in/jan-georges-jersild-balin-55719a1b8/",
      },
      {
        name: "Jonathan Bangert",
        role: "Software Engineer",
        avatar: "/pfp.jpg",
      },
      {
        name: "Elliott Friedrich",
        role: "Software Engineer",
        avatar: "/elliott.jpg",
        link: "https://www.linkedin.com/in/elliott-friedrich-0460962b0/",
      },
      {
        name: "Oscar Landmark",
        role: "Senior Software Engineer",
        avatar: "https://avatars.githubusercontent.com/u/22825865?v=4",
        link: "https://www.linkedin.com/in/oscdot//",
      },
    ],
  },
  {
    id: 5,
    title: "Tars Mono",
    link: "https://tars.jonathanb.dk/",
    tag: "For fun 😎",
    tagColor: "bg-yellow-100 text-yellow-800",
    description:
      "A monospaced typeface designed for titles and beyond. Featuring three distinct styles: sharp for precision, rounded for warmth, and smooth for elegance.",
    shortDescription: "A monospaced font designed with precision.",
    image: "/tars-mono.png",
    year: "January — February 2025",
    detailedDescription: "Made as a part of my Graphics Design course, ",
    technologies: [
      "Figma",
      "Adobe Illustrator",
      "IcoMoon",
      "Next.js",
      "Tailwind",
      "Framer Motion",
      "Cloudflare",
    ],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Designer & Developer",
        avatar: "/pfp.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Music Assistant",
    tag: "Contributor",
    tagColor: "bg-purple-100 text-purple-800",
    link: "https://music-assistant.io/",
    description:
      "Music Assistant is a music library manager for your offline and online music sources which can easily stream your favourite music to a wide range of supported players and be combined with the power of Home Assistant!",
    shortDescription: "Open source music library manager.",
    image: "/music-assistant.jpg",
    cover: "cover",
    year: "2020 — Present",
    detailedDescription:
      "I joined this project fairly early on, initally only working on the Deezer provider, but later creating and maintaining the Companion app as well. This was my first time contributing to open source project, and on a personal note a really awesome team to be working with, and thought me a ton. I am one of the core members, sadly being less active at the moment.",
    technologies: ["Rust", "Vue", "Tauri", "Python", "AsyncIO", "Deezer API"],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Maintainer",
        avatar: "/pfp.jpg",
      },
      {
        name: "Marcel Van Der Veldt",
        role: "Contributors",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Micha",
        role: "Maintainer",
      },
      {
        name: "TODO, add other maintainers",
        role: "yup"
      }
    ],
  },
  {
    id: 4,
    title: "Nørrebro Skakklub",
    tag: "Contract",
    link: "https://nbskak.dk",
    tagColor: "bg-orange-100 text-orange-800",
    description:
      "We built a new website for Nørrebro Skakklub, making it easier for members to stay updated, find events, and connect with the club.",
    shortDescription: "Building a better chess club website.",
    image: "/nbskak.webp",
    year: "2023 — 2024",
    detailedDescription:
      "Nørrebro Skakklub needed a modern, functional website to better serve its members and attract new players. We designed and developed a clean, easy-to-navigate platform where users can find event schedules, club news, and essential information at a glance. The site simplifies communication, improves accessibility, and ensures that both new and existing members can engage with the club effortlessly.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "StaticCMS",
      "Cloudflare",
    ],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Developer",
        avatar: "/pfp.jpg",
      },
      {
        name: "Elliott Friedrich",
        role: "Developer",
        avatar: "elliott.jpg",
        link: "https://www.linkedin.com/in/elliott-friedrich-0460962b0/",
      },
      {
        name: "Johannes Børresen",
        role: "Developer",
        avatar: "/johannes.jpg",
        link: "https://www.linkedin.com/in/johannes-boerresen/",
      },
    ],
  },
  {
    id: 7,
    title: "ScanShop",
    link: "https://scanshop.arctix.dev/",
    tag: "For fun 😎",
    tagColor: "bg-yellow-100 text-yellow-800",
    shortDescription: "Remove items from your shopping list by easily.",
    description:
      "ScanShop is a web app that allows you to scan items in your shopping cart and automatically remove them from your shopping list.",
    detailedDescription:
      "Built in a weekend to make shopping easier for personal use, ScanShop uses the camera on your device to scan barcodes and match them with items on your list. More specifically, its built by combining MSAL, Microsoft ToDo API, Kroger API and the OpenAI API. When a user scan the barcode, the UPC number is sent to Kroger to fetch an Image, Price and Name of the Item, we then fetch microsoft (authenticated with MSAL) for the users updated shoppinglist, we then format and send all the data to OpenAI and get an LLM to detect if the item from the kroger api is present in the Shopping List, if it is, we allow the user to effortlessly remove the item in one click. yes i do know this is pretty useless ;)",
    image: "/scanshop.png",
    year: "2024",
    cover: "cover",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Kroger API",
      "Microsoft API",
      "MSAL",
      "OpenAI",
      "Vercel",
    ],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Designer & Developer",
        avatar: "/pfp.jpg",
      },
    ],
  },
  {
    id: 8,
    title: "GravityDrop",
    tag: "For fun 😎",
    tagColor: "bg-yellow-100 text-yellow-800",
    shortDescription: "A casual puzzle game about playing with gravity.",
    image: "/gravitydrop.png",
    year: "2023",
    description: "A casual puzzle game about playing with gravity.",
    detailedDescription:
      "GravityDrop is a casual puzzle game where players manipulate gravity to solve challenges and progress through levels. With simple mechanics and engaging gameplay, it offers a fun way to unwind while exercising your brain.",
    technologies: [
      "Unity",
      "C#",
      "IronSource",
      "Google Analytics",
      "Google Play SDK",
      "Figma",
    ],
    cover: "cover",
    team: [
      {
        name: "Jonathan Bangert",
        role: "Developer",
        avatar: "/pfp.jpg",
      },
      {
        name: "Elliott Friedrich",
        role: "Designer & Developer",
        avatar: "elliott.jpg",
        link: "https://www.linkedin.com/in/elliott-friedrich-0460962b0/",
      },
      {
        name: "Johannes Børresen",
        role: "Developer",
        avatar: "/johannes.jpg",
        link: "https://www.linkedin.com/in/johannes-boerresen/",
      },
      {
        name: "Aron",
        role: "Developer",
      },
    ],
  },
];

interface WorkShowcaseProps {
  onOpenChange?: (open: boolean) => void;
  onSelectWork?: (work: (typeof works)[number]) => void;
}

export default function WorkShowcase({
  onOpenChange,
  onSelectWork,
}: WorkShowcaseProps) {
  const handleWorkClick = (work: (typeof works)[number]) => {
    onSelectWork?.(work);
    onOpenChange?.(true);
  };

  let isMobile = false;

  if (typeof window !== "undefined") {
    isMobile = window.matchMedia("(max-width: 600px)").matches;
  }
  const [showedWork, setShowedWork] = useState(
    isMobile ? works.slice(0, 4) : works,
  );

  return (
    <section className="space-y-12">
      <h2 className="text-sm font-medium text-zinc-500 tracking-widest uppercase">
        Selected Work
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {showedWork.map((work) => (
          <motion.div
            key={work.id}
            className="group cursor-pointer"
            onClick={() => handleWorkClick(work)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  width={600}
                  height={400}
                  className={`object-${work.cover || "contain"} w-full h-48 transition-transform duration-300 group-hover:scale-105`}
                />
              </div>
              <div className="space-y-2">
                <span
                  className={`text-sm font-medium px-2  py-1 rounded-full ${work.tagColor}`}
                >
                  {work.tag}
                </span>
                <h3 className="text-2xl font-semibold group-hover:text-zinc-600 transition-colors mt-2">
                  {work.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {work.shortDescription}
                </p>
              </div>
            </div>
            <div className="text-sm text-zinc-500 mt-4">{work.year}</div>
          </motion.div>
        ))}
        {showedWork.length < works.length ? (
          <Button
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={() => setShowedWork(works)}
          >
            <span className="animate-underline">Show more</span>
          </Button>
        ) : isMobile ? (
          <Button
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={() => setShowedWork(works.slice(0, 4))}
          >
            <span className="animate-underline">Show less</span>
          </Button>
        ) : null}
      </motion.div>
    </section>
  );
}
