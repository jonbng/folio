"use client";

import Image from "next/image";
import { Github, Mail, Twitter, Linkedin, Clock, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WorkShowcase from "@/components/work-showcase";
import PressShowcase from "@/components/press-showcase";
// import BlogPreview from "@/components/blog-preview";
import BeyondCoding from "@/components/beyond-coding";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import ProjectSidebar from "@/components/project-sidebar";
import Link from "next/link";
import { ContactButton } from "@/components/contact-button";
import ExchangeYearBadge from "@/components/exchange-year-badge";
import CTAButton from "@/components/cta-button";
import GuestbookShowcase from "@/components/guestbookShowcase";

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
    team: { name: string; role: string; avatar?: string; link?: string }[];
    cover?: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);

  // Set mounted flag and initialize time on client-side only.
  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setTime(now);

    const timer = setInterval(() => {
      setTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // Format time for Denver
  const denverTime =
    mounted && time
      ? time.toLocaleTimeString("en-US", {
          timeZone: "America/Denver",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "Loading...";

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
          <div className="max-w-4xl mx-auto px-6 sm:px-4 pt-2 pb-10">
            <header
              className={
                "sticky top-0 z-10 flex flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 py-6 sm:mb-8" +
                (isWorkOpen ? "" : " bg-white")
              }
            >
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-lg font-semibold">Jonathan Bangert</h1>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Clock className="w-4 h-4" />
                    <span>Denver</span>
                    <span>{denverTime}</span>
                  </div>
                  <ExchangeYearBadge />
                </div>
              </div>
              <nav className="flex gap-4 items-center">
                <Link
                  href="https://x.com/jonba_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://github.com/jonbng"
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

            <section className="mb-6 sm:mt-12">
              <div className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-12 mb-5">
                <div className="flex-1">
                  <h2 className="text-4xl font-normal tracking-tight mb-8">
                    Hello, I&apos;m Jonathan! <span className="wave">👋</span>
                  </h2>
                  <p className="text-xl text-zinc-600 leading-relaxed mb-4">
                    17 y/o software engineer, builder, and problem solver. I
                    co-founded Akademia and work as a SWE @ Flimmer. I care
                    about making technology beautiful, intuitive, and actually
                    useful.
                  </p>
                  <div className="flex flex-wrap gap-4 -ml-4">
                    <CTAButton
                      text="Let's Connect"
                      href="mailto:contact@jonathanb.dk"
                      icon={<Mail className="w-5 h-5" />}
                    />
                    <CTAButton
                      text="Follow on Twitter"
                      href="https://x.com/jonba_"
                      icon={<Twitter className="w-5 h-5" />}
                    />
                  </div>
                </div>
                <div className="shrink-0 transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                  <Image
                    src="/pfp.jpg"
                    alt="Jonathan Bangert"
                    width={210}
                    height={210}
                    // blurDataURL="data:image/jpeg;base64,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"
                    // placeholder="blur"
                    loading="eager"
                    className="w-full sm:w-[210px] aspect-3/2 sm:aspect-square object-[50%_10%] sm:rounded-4xl rounded-2xl object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="space-y-4">
                  <p className="text-xl text-zinc-600 leading-relaxed">
                    I&apos;ve been passionate about technology and design since
                    getting my first computer at age 6. I started coding at 10,
                    hacked my school PC at 12 for admin access because I
                    didn&apos;t have my own, and haven&apos;t looked back since.
                    Since then, I&apos;ve developed a strong passion for
                    creating helpful products and design, contributing to
                    countless of projects over the years.
                  </p>
                </div>
                {/* <div className="space-y-4">
                  <p className="text-lg text-zinc-600 leading-relaxed">
                    Technology should work for people, not the other way around.
                    I focus on the details, the experience, and the long-term
                    impact, because great tools don&apos;t just solve problems,
                    they change what&apos;s possible.
                  </p>
                </div> */}
              </div>
            </section>

            <div className="flex items-center gap-2 mb-14 text-zinc-600">
              <Book className="w-5 h-5" />
              <span>
                Currently reading: &quot;Outliers&quot; by Malcolm Gladwell
              </span>
            </div>

            <Separator className="mb-16" />

            <WorkShowcase
              onOpenChange={setIsWorkOpen}
              onSelectWork={setSelectedWork}
            />

            <Separator className="my-14" />

            <GuestbookShowcase />

            {/* <Separator className="my-14" />

            <BeyondCoding /> */}

            <Separator className="my-20" />

            <PressShowcase />

            {/* <Separator className="my-20" /> */}

            {/* <BlogPreview /> */}

            {/* <Separator className="my-16" /> */}

            {/* <section id="contact" className="text-center">
              <h2 className="text-3xl font-bold mb-4">Let&apos;s Chat!</h2>
              <p className="text-xl text-zinc-700 mb-6">
                I&apos;m always open to collaborating or just chatting! Feel
                free to reach out.
              </p>
              <div className="flex justify-center gap-4">
                <CTAButton
                  text="Get in Touch"
                  href="mailto:contact@jonathanb.dk"
                  icon={<Mail className="w-5 h-5" />}
                />
                <CTAButton
                  text="Follow on Twitter"
                  href="https://x.com/jonba_"
                  icon={<Twitter className="w-5 h-5" />}
                />
              </div>
            </section> */}

            <footer className="mt-14 pt-10 border-t border-zinc-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500">
                  © {new Date().getFullYear()} Jonathan Bangert. All rights
                  reserved.
                </p>
                <ContactButton />
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
