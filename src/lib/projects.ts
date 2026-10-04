export interface ProjectCaseStudy {
  slug: string;
  title: string;
  role: string;
  year: string;
  summary: string;
  description: string;
  image: string;
  externalUrl?: string;
  technologies: string[];
  highlights: string[];
  schemaType: "SoftwareApplication" | "CreativeWork";
}

export const projects: ProjectCaseStudy[] = [
  {
    slug: "betterlectio",
    title: "BetterLectio",
    role: "Co-Founder",
    year: "2026 — Present",
    summary:
      "A cleaner, faster interface for the Danish school platform Lectio.",
    description:
      "BetterLectio is a browser extension that modernizes Lectio with a clearer interface and faster everyday workflows for Danish students.",
    image: "/betterlectio.webp",
    externalUrl: "https://betterlectio.dk",
    technologies: ["WXT", "Preact", "TypeScript", "Tailwind CSS", "Radix UI"],
    highlights: [
      "Added fast search, keyboard shortcuts, and smart prefetching.",
      "Redesigned navigation, messages, loading states, and profile presentation.",
      "Released for both Chrome and Firefox.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "burst",
    title: "Burst",
    role: "Lead Software Engineer",
    year: "2025 — Present",
    summary: "Infrastructure for brands to work with creators.",
    description:
      "Burst connects brands with creators and pays creators based on the views their campaign videos receive. I joined in summer 2025 as a lead software engineer.",
    image: "/burst-transparent.webp",
    externalUrl: "https://burstcreators.com/",
    technologies: [
      "Next.js",
      "Expo",
      "TypeScript",
      "Supabase",
      "Stripe",
      "OpenAI SDK",
    ],
    highlights: [
      "Build product infrastructure across web, mobile, and backend systems.",
      "Work on campaign workflows, payments, and creator-facing experiences.",
      "Turn complex operational requirements into simple product flows.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "music-assistant",
    title: "Music Assistant",
    role: "Core Contributor",
    year: "2023 — 2025",
    summary: "An open-source music library manager for Home Assistant.",
    description:
      "Music Assistant combines online and offline music sources and streams them to a wide range of supported players. It was my first major open-source project.",
    image: "/musicassistant.png",
    externalUrl: "https://music-assistant.io/",
    technologies: ["Python", "Rust", "Vue", "Tauri", "AsyncIO", "Deezer API"],
    highlights: [
      "Created and maintained the Deezer provider.",
      "Built and maintained the companion application.",
      "Collaborated as a core member of an international open-source team.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "akademia",
    title: "Akademia",
    role: "Co-Founder",
    year: "2023 — 2024",
    summary: "A simpler operating system for schools.",
    description:
      "Akademia brought assignments, grading, communication, deadlines, and feedback into one platform for students and teachers.",
    image: "/akademia.webp",
    externalUrl: "https://akademia.cc",
    technologies: [
      "Svelte",
      "Rust",
      "Supabase",
      "Kubernetes",
      "Cloudflare",
      "TipTap",
    ],
    highlights: [
      "Won first place in the Junior Technology category at Unge Forskere.",
      "Presented the product on Shark Tank Junior Denmark.",
      "Designed a unified workflow for teachers and students.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "flimmer",
    title: "Flimmer",
    role: "Software Engineer",
    year: "2024 — 2025",
    summary: "Turning screen time into active play for children.",
    description:
      "Flimmer is a safe social video app for children aged 6 to 12. Videos encourage offline tasks, quizzes, creativity, and real-world play instead of endless scrolling.",
    image: "/flimmer.svg",
    externalUrl: "https://flimmer.app",
    technologies: ["React Native", "Expo", "Convex", "Cloudflare", "Clerk"],
    highlights: [
      "Worked across the mobile frontend and backend.",
      "Maintained existing systems and shipped new product features.",
      "Helped build age-appropriate interactions and community features.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "scanshop",
    title: "ScanShop",
    role: "Designer & Developer",
    year: "2024",
    summary: "Remove shopping-list items by scanning their barcodes.",
    description:
      "ScanShop was a weekend experiment that connects barcode scanning with a Microsoft To Do shopping list and uses an LLM to match products to list items.",
    image: "/scanshop.webp",
    externalUrl: "https://scanshop.arctix.dev/",
    technologies: [
      "Next.js",
      "Microsoft Graph",
      "Kroger API",
      "OpenAI",
      "MSAL",
    ],
    highlights: [
      "Combined camera input, product data, task data, and language models.",
      "Built the complete experiment over a weekend.",
      "Explored where AI can simplify an otherwise tedious interaction.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "alfabeta",
    title: "AlfaBeta",
    role: "Designer & Developer",
    year: "2024",
    summary: "A focused link shortener with custom aliases and analytics.",
    description:
      "AlfaBeta was built as a simpler alternative to feature-heavy link platforms, with custom aliases, custom domains, and useful performance tracking.",
    image: "/alfabeta.webp",
    externalUrl: "https://alfabeta.dk",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
    ],
    highlights: [
      "Focused the product around fast link creation.",
      "Supported custom aliases and domains.",
      "Added straightforward link-performance analytics.",
    ],
    schemaType: "SoftwareApplication",
  },
  {
    slug: "tars-mono",
    title: "Tars Mono",
    role: "Type Designer",
    year: "2025",
    summary: "A monospaced display typeface with three distinct styles.",
    description:
      "Tars Mono is a monospaced typeface created during my graphic design course. It explores sharp, rounded, and smooth forms for titles and coding contexts.",
    image: "/tars-mono.webp",
    technologies: ["Figma", "Adobe Illustrator", "IcoMoon", "Next.js"],
    highlights: [
      "Designed sharp, rounded, and smooth variants.",
      "Developed the type system in Figma and Adobe Illustrator.",
      "Created a web specimen to present the family in context.",
    ],
    schemaType: "CreativeWork",
  },
  {
    slug: "norrebro-skakklub",
    title: "Nørrebro Skakklub",
    role: "Developer",
    year: "2023 — 2024",
    summary:
      "A more useful and maintainable website for a Copenhagen chess club.",
    description:
      "The club needed a modern website that made events and information easier to find while remaining simple and inexpensive for volunteers to maintain.",
    image: "/nbskak.webp",
    externalUrl: "https://nbskak.dk",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Static CMS",
      "Cloudflare",
    ],
    highlights: [
      "Worked with the club to define a fitting visual direction.",
      "Simplified publishing and ongoing maintenance.",
      "Moved the site to a modern, free-to-host architecture.",
    ],
    schemaType: "CreativeWork",
  },
  {
    slug: "gravitydrop",
    title: "GravityDrop",
    role: "Developer",
    year: "2023 — 2024",
    summary: "A casual puzzle game built around manipulating gravity.",
    description:
      "GravityDrop is a Unity puzzle game where players manipulate gravity to solve challenges and progress through levels.",
    image: "/gravitydrop.webp",
    externalUrl: "https://nth1nk.itch.io/gravitydrop",
    technologies: ["Unity", "C#", "Figma", "Google Analytics"],
    highlights: [
      "Won best overall game at Coding Pirates Game Jam 2023.",
      "Designed puzzle mechanics around changing gravity.",
      "Built the project collaboratively for mobile platforms.",
    ],
    schemaType: "SoftwareApplication",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function toProjectSlug(title: string) {
  return title
    .replace(/[øØ]/g, "o")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
