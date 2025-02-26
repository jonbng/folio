"use client";

import Image from "next/image";
import { Github, Mail, Twitter, Linkedin, Clock, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WorkShowcase from "@/components/work-showcase";
import PressShowcase from "@/components/press-showcase";
import BlogPreview from "@/components/blog-preview";
import BeyondCoding from "@/components/beyond-coding";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProjectSidebar from "@/components/project-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
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
      <div className="relative min-h-screen bg-white dark:bg-zinc-950">
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
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-20">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-lg font-medium">Jonathan Bangert</h1>
                <div className="hidden sm:flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <Clock className="w-4 h-4" />
                  <span>Denver</span>
                  <span>{denverTime}</span>
                </div>
              </div>
              <nav className="flex gap-4 items-center">
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://twitter.com/jonathanb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors hover:scale-110"
                  >
                    <Twitter className="w-6 h-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/jonathanb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors hover:scale-110"
                  >
                    <Github className="w-6 h-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <a
                    href="https://linkedin.com/in/jonathanb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="mailto:contact@jonathanb.dk"
                    className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors hover:scale-110"
                  >
                    <Mail className="w-6 h-6" />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
                <ThemeToggle />
              </nav>
            </header>

            <section className="mb-12">
              <div className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-12 mb-12">
                <div className="flex-1">
                  <h2 className="text-4xl font-bold tracking-tight mb-8">
                    Hello! <span className="wave">👋</span>
                  </h2>
                  <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                    I'm Jonathan — Akademia Co-Founder & SWE @ Flimmer. I've
                    been building things for as long as I can remember, focusing
                    on creating elegant solutions to complex problems.
                  </p>
                  <Button asChild className="mt-4">
                    <a
                      href="https://twitter.com/jonathanb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Twitter className="w-5 h-5 mr-2" />
                      Follow me on Twitter
                    </a>
                  </Button>
                </div>
                <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                  <Image
                    src="https://avatars.githubusercontent.com/u/74015378?v=4"
                    alt="Jonathan Bangert"
                    width={220}
                    height={220}
                    className="w-full sm:w-[220px] h-[220px] sm:rounded-full rounded-2xl object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="space-y-4">
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    With over a decade of experience in software development, I
                    specialize in building scalable web applications and
                    contributing to open source projects that make a difference.
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    My passion lies in leveraging technology to solve real-world
                    problems and create impactful solutions that enhance user
                    experiences and drive innovation.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-2 mb-12 text-zinc-600 dark:text-zinc-400">
              <Book className="w-5 h-5" />
              <span>Currently reading: "Outliers" by Malcolm Gladwell</span>
            </div>

            <Separator className="mb-20" />

            <WorkShowcase
              onOpenChange={setIsWorkOpen}
              onSelectWork={setSelectedWork}
            />

            <Separator className="my-20" />

            <BeyondCoding />

            <Separator className="my-20" />

            <PressShowcase />

            <Separator className="my-20" />

            <BlogPreview />

            <footer className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
                    Let's Talk
                  </a>
                </Button>
              </div>
            </footer>
          </div>
        </motion.main>
      </div>

      {/* Sidebar rendered outside main content */}
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
