"use client";
import Image from "next/image";
import { motion } from "motion/react";

const works = [
  {
    id: 1,
    title: "Akademia",
    tag: "Founder",
    tagColor: "bg-green-100 text-green-800",
    description:
      "A reimagined platform for schools that transforms how students learn and teachers teach.",
    shortDescription: "Reimagining the Danish school systems software.",
    image: "https://akademia.cc/akademia-card.png",
    year: "2023 — Present",
    detailedDescription:
      "Akademia is an innovative educational platform that leverages artificial intelligence to personalize learning experiences. It adapts to each student's pace and learning style, providing tailored content and real-time feedback. For teachers, it offers powerful analytics and automated grading tools, freeing up time for more personalized instruction.",
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
    id: 2,
    title: "Flimmer",
    tag: "Work",
    tagColor: "bg-blue-100 text-blue-800",
    description:
      "Leading software engineering initiatives and building next-generation solutions for digital experiences.",
    shortDescription: "Turning screen time to play time.",
    image:
      "https://flimmer.app/_next/static/media/figure-together-1.8e212f4e.svg",
    year: "2022 — Present",
    detailedDescription:
      "At Flimmer, we're pushing the boundaries of what's possible in digital experiences. Our team specializes in creating high-performance, scalable web applications that deliver exceptional user experiences. From e-commerce platforms to complex data visualization tools, we tackle challenges across various industries.",
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
      {
        name: "Jan-Georges Jersild Balin",
        role: "Senior Software Engineer",
        avatar:
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSycH4nNuxZY_szug1Q-ZlYQK_be-gngwghI1Zc3wI4t9dVKX_y",
        link: "https://www.linkedin.com/in/jan-georges-jersild-balin-55719a1b8/",
      },
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
    ],
  },
  {
    id: 3,
    title: "Music Assistant",
    tag: "Contributor",
    tagColor: "bg-purple-100 text-purple-800",
    description:
      "Contributing to various open source projects and creating developer tools to improve workflow efficiency.",
    shortDescription: "Empowering developers through open source.",
    image:
      "https://www.home-assistant.io/images/blog/2024-05-music-assistant/art.jpg",
    cover: "cover",
    year: "2020 — Present",
    detailedDescription:
      "My passion for open source drives me to contribute to and create projects that make developers' lives easier. From CLI tools that streamline common tasks to libraries that solve complex problems, I'm committed to giving back to the community that has given me so much.",
    technologies: ["TypeScript", "Rust", "Go", "Python"],
    team: [
      {
        name: "Jonathan Bangert",
        role: "Maintainer",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        name: "Open Source Community",
        role: "Contributors",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: 4,
    title: "Nørrebro Skakklub",
    tag: "Work",
    tagColor: "bg-orange-100 text-orange-800",
    description:
      "Leading software engineering initiatives and building next-generation solutions for digital experiences.",
    shortDescription: "Building a better chess club.",
    image: "https://nbskak.dk/card.webp",
    year: "2023 — 2024",
    detailedDescription:
      "At Nørrebro Skakklub, we're dedicated to making chess accessible and enjoyable for everyone. Our team is working on a new website that will serve as a hub for our community, providing resources, event information, and a platform for members to connect.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
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
        {works.map((work) => (
          <motion.div
            key={work.id}
            className="group cursor-pointer"
            onClick={() => handleWorkClick(work)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg">
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
      </motion.div>
    </section>
  );
}
