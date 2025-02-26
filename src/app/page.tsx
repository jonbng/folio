"use client";

import Image from "next/image";
import { Github, Mail, Twitter, Linkedin, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WorkShowcase from "@/components/work-showcase";
import PressShowcase from "@/components/press-showcase";
// import BlogPreview from "@/components/blog-preview";
import BeyondCoding from "@/components/beyond-coding";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import ProjectSidebar from "@/components/project-sidebar";
import Link from "next/link";

export default function Home() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<{
    id: number;
    title: string;
    tag: string;
    tagColor: string;
    description: string;
    shortDescription: string;
    image: string;
    year: string;
    detailedDescription: string;
    technologies: string[];
    link?: string;
    team: { name: string; role: string; avatar: string; link?: string }[];
  } | null>(null);
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time for Denver
  const denverTime = time.toLocaleTimeString("en-US", {
    timeZone: "America/Denver",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isWorkOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isWorkOpen]);

  return (
    <>
      <div className="relative min-h-screen bg-white">
        <motion.main
          animate={{
            scale: isWorkOpen ? 0.93 : 1,
            filter: isWorkOpen
              ? "blur(3px) brightness(0.8)"
              : "blur(0px) brightness(1)",
          }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: "center" }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-4 py-20">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-16">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-lg font-medium">Jonathan Bangert</h1>
                <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500">
                  <Clock className="w-4 h-4" />
                  <span>Denver</span>
                  <span>{denverTime}</span>
                </div>
              </div>
              <nav className="flex gap-4 items-center">
                <Link
                  href="https://twitter.com/arctixdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://github.com/arctixdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/jonathan-bangert/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:contact@jonathanb.dk"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Mail size={24} />
                  <span className="sr-only">Email</span>
                </Link>
              </nav>
            </header>

            <section className="mb-10">
              <div className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-12 mb-8">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold tracking-tight mb-8">
                    Hello! <span className="wave">👋</span>
                  </h2>
                  <p className="text-xl text-zinc-600 leading-relaxed mb-6">
                    I&apos;m Jonathan — software engineer, builder, and problem
                    solver. I co-founded Akademia and work as a SWE @ Flimmer. I
                    care about making technology simple, intuitive, and actually
                    useful.
                  </p>
                  <div className="flex flex-row items-start gap-2 mt-6">
                    <Twitter className="w-6 h-6" />
                    <Button
                      asChild
                      className="p-0 h-auto my-auto"
                      variant={"link"}
                    >
                      <Link
                        href="https://twitter.com/arctixdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="items-center flex gap-1"
                      >
                        <span className="animate-underline">
                          Follow me on Twitter
                        </span>
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="shrink-0 transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                  <Image
                    src="/pfp.jpg"
                    alt="Jonathan Bangert"
                    width={210}
                    height={210}
                    className="w-full sm:w-[210px] aspect-3/2 sm:aspect-square object-[50%_10%] sm:rounded-full rounded-2xl object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    I care about building things that last. Not just in terms of
                    code, but in how they impact people. The best products
                    aren&apos;t just functional—they become part of how we work,
                    think, and create.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    Technology should work for people, not the other way around.
                    I focus on the details, the experience, and the long-term
                    impact, because great tools don&apos;t just solve problems,
                    they change what&apos;s possible.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-2 mb-12 text-zinc-600">
              <Book className="w-5 h-5" />
              <span>
                Currently reading: &quot;Outliers&quot; by Malcolm Gladwell
              </span>
            </div>

            <Separator className="mb-14" />

            <WorkShowcase
              onOpenChange={setIsWorkOpen}
              onSelectWork={setSelectedWork}
            />

            <Separator className="my-14" />

            <BeyondCoding />

            <Separator className="my-20" />

            <PressShowcase />

            {/* <Separator className="my-20" /> */}

            {/* <BlogPreview /> */}

            <footer className="mt-14 pt-8 border-t border-zinc-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500">
                  © {new Date().getFullYear()} Jonathan Bangert. All rights
                  reserved.
                </p>
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto font-semibold hidden sm:inline-flex"
                >
                  <a
                    href="mailto:contact@jonathanb.dk"
                    className="animate-underline"
                  >
                    Let&apos;s Talk
                  </a>
                </Button>
              </div>
            </footer>
          </div>
        </motion.main>
      </div>

      <ProjectSidebar
        isOpen={isWorkOpen}
        selectedWork={selectedWork}
        onClose={() => {
          setIsWorkOpen(false);
          setSelectedWork(null);
        }}
      />
    </>
  );
}
