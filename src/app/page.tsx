"use client";

import Image from "next/image";
import { Github, Mail, Linkedin, Clock, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WorkShowcase from "@/components/work-showcase";
import PressShowcase from "@/components/press-showcase";
import BeyondCoding from "@/components/beyond-coding";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, Suspense, useCallback } from "react";
import ProjectSidebar from "@/components/project-sidebar";
import Link from "next/link";
import { ContactButton } from "@/components/contact-button";
import CTAButton from "@/components/cta-button";
import { CopyEmailIcon } from "@/components/copy-email-icon";
import XIcon from "@/components/XIcon";
import { Toaster } from "@/components/ui/sonner";
import GuestbookFull from "@/components/guestbookFull";
import GuestbookPreview from "@/components/guestbookPreview";
import { GetAllGuestbookEntries } from "@/lib/guestbookActions";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { GuestbookEntry } from "@/types/guestbook";
import { WorkProject } from "@/lib/types";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  },
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkProject | null>(null);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<Date | null>(null);
  const [isGuestbookExpanded, setIsGuestbookExpanded] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [inputOpen, setInputOpen] = useState(false);

  const handleMessage = useCallback(() => {
    setIsGuestbookExpanded(true);
    setInputOpen(true);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setTime(now);

    const timer = setInterval(() => {
      setTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchEntries() {
      try {
        setIsLoading(true);
        const fetchedEntries = await GetAllGuestbookEntries();
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntries();
  }, [isGuestbookExpanded]);

  const copenhagenTime =
    mounted && time
      ? time.toLocaleTimeString("en-US", {
          timeZone: "Europe/Copenhagen",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "Loading...";

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

  useEffect(() => {
    if (searchParams.get("guestbookOpen") === "1") {
      setIsGuestbookExpanded(true);
      setTimeout(() => {
        document
          .getElementById("guestbook")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  useEffect(() => {
    if (isGuestbookExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isGuestbookExpanded]);

  return (
    <>
      <Toaster />
      <div className="relative min-h-screen bg-[var(--background)]">
        <motion.main
          animate={{
            scale: isWorkOpen || isGuestbookExpanded ? 0.93 : 1,
            filter:
              isWorkOpen || isGuestbookExpanded
                ? "blur(3px) brightness(0.8)"
                : "blur(0px) brightness(1)",
            pointerEvents: isGuestbookExpanded ? "none" : "auto",
            userSelect: isGuestbookExpanded ? "none" : "auto",
          }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: "center" }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto px-6 sm:px-4 pt-2 pb-10">
            <header className="sticky top-0 z-10 flex flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 py-6 sm:mb-8 bg-[var(--background)]">
              <div className="flex flex-row items-center gap-4">
                <h1
                  className="text-lg font-semibold cursor-pointer transition-colors duration-200 hover:text-[var(--muted-foreground)] press-scale"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Jonathan Bangert
                </h1>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <Clock className="w-4 h-4" />
                    <span>Copenhagen</span>
                    <span className="tabular-nums">{copenhagenTime}</span>
                  </div>
                </div>
              </div>
              <nav className="flex gap-4 items-center">
                <Link
                  href="https://x.com/jonbng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 press-scale"
                >
                  <XIcon size={23} className="opacity-80" />
                  <span className="sr-only">X</span>
                </Link>
                <Link
                  href="https://github.com/jonbng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 press-scale"
                >
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/jonathan-bangert/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200 press-scale"
                >
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <CopyEmailIcon key="email-link" />
              </nav>
            </header>
            <p className="absolute left-[-99999px]">
              Hey! I&apos;m Jonathan Bangert, im an innovate software engineer
              whos really passionate and curious about the world and technology.
              I love working on projects that are actually used by people and
              make a difference. I love using ai to help creativity and
              experimenting with things. I have worked with AI for several years
              now feel very fluent in AI/ML. I tought programming to students,
              won several game jams and contributed to open source projects.
            </p>

            {/* Hero with stagger animation */}
            <motion.section
              className="mb-6 sm:mt-12"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <div className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-12 mb-4">
                <div className="flex-1">
                  <motion.h2
                    variants={fadeUp}
                    className="font-display text-5xl sm:text-6xl tracking-tight mb-8 text-[var(--foreground)]"
                  >
                    Hey, I&apos;m Jonathan! <span className="wave">👋</span>
                  </motion.h2>
                  <motion.p
                    variants={fadeUp}
                    className="text-xl text-[var(--muted-foreground)] leading-relaxed mb-4"
                  >
                    <strong className="text-[var(--foreground)]">
                      I build software that makes complex things simple.
                    </strong>
                    <br className="mb-1.5" />
                    I&apos;m an 18-year-old software engineer based in
                    Copenhagen. I co-founded{" "}
                    <strong className="text-[var(--foreground)]">
                      Akademia
                    </strong>{" "}
                    and work as a Lead SWE at{" "}
                    <strong className="text-[var(--foreground)]">Burst</strong>.
                  </motion.p>
                  <motion.div
                    variants={fadeUp}
                    className="flex flex-wrap gap-4 -ml-4"
                  >
                    <CTAButton
                      text="Follow Me!"
                      href="https://x.com/jonbng"
                      icon={<XIcon className="w-5 h-5" />}
                    />
                    <CTAButton
                      text="Sign Guestbook!"
                      href="#guestbook"
                      icon={<Mail className="w-5 h-5" />}
                    />
                  </motion.div>
                </div>
                <motion.div
                  variants={fadeUp}
                  className="shrink-0 w-full sm:w-auto"
                >
                  <div className="relative w-full sm:w-[190px] aspect-3/4 overflow-hidden sm:rounded-4xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] hover-lift transition-transform duration-300">
                    <Image
                      src="/pfp-tall.jpeg"
                      alt="Jonathan Bangert"
                      fill
                      sizes="(min-width: 640px) 190px, 100vw"
                      loading="eager"
                      className="object-cover object-[50%_10%]"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
              <motion.div variants={fadeUp} className="mt-4">
                <ul className="list-disc pl-6 text-xl text-[var(--muted-foreground)] leading-relaxed space-y-2">
                  <li>I make complex systems simple to use.</li>
                  <li>
                    I started coding at 10 and broke into my school&apos;s
                    system at 12.
                  </li>
                  <li>I care a lot about getting the details right.</li>
                </ul>
              </motion.div>
            </motion.section>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 mb-14 text-[var(--muted-foreground)]"
            >
              <Book className="w-5 h-5" />
              <span>
                Currently reading: &quot;Nexus&quot; by Yuval Noah Harari
              </span>
            </motion.div>

            <Separator className="mb-16 bg-[var(--border)]" />

            <WorkShowcase
              onOpenChange={setIsWorkOpen}
              onSelectWork={setSelectedWork}
            />

            <Separator className="my-14 bg-[var(--border)]" />

            <div className="relative h-96">
              {!isGuestbookExpanded && (
                <GuestbookPreview
                  key="guestbook-preview"
                  entries={entries}
                  onExpand={() => setIsGuestbookExpanded(true)}
                  onMessage={handleMessage}
                  isLoading={isLoading}
                />
              )}
            </div>

            <Separator className="my-14 bg-[var(--border)]" />

            <BeyondCoding />

            <Separator className="my-20 bg-[var(--border)]" />

            <PressShowcase />

            <footer className="mt-14 pt-10 border-t border-[var(--border)]">
              <div className="flex justify-between items-center">
                <p className="text-sm text-[var(--muted-foreground)]">
                  Designed with ❤️ by Jonathan Bangert. ©{" "}
                  {new Date().getFullYear()} All rights reserved.
                </p>
                <ContactButton />
              </div>
            </footer>
          </div>
        </motion.main>
      </div>
      {isClient &&
        isGuestbookExpanded &&
        createPortal(
          <AnimatePresence>
            {isGuestbookExpanded && (
              <GuestbookFull
                key="guestbook-full"
                inputOpen={inputOpen}
                entries={entries}
                setEntries={setEntries}
                onCollapse={() => setIsGuestbookExpanded(false)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}

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

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
