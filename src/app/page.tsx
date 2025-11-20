"use client";

import Image from "next/image";
import { Github, Mail, Linkedin, Clock, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import WorkShowcase from "@/components/work-showcase";
import PressShowcase from "@/components/press-showcase";
import BeyondCoding from "@/components/beyond-coding";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, Suspense } from "react";
import ProjectSidebar from "@/components/project-sidebar";
import Link from "next/link";
import { ContactButton } from "@/components/contact-button";
import CTAButton from "@/components/cta-button";
import XIcon from "@/components/XIcon";
import { Toaster } from "@/components/ui/sonner";
import GuestbookFull from "@/components/guestbookFull";
import GuestbookPreview from "@/components/guestbookPreview";
import { GetAllGuestbookEntries } from "@/lib/guestbookActions";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { GuestbookEntry } from "@/types/guestbook";
import { WorkProject } from "@/lib/types";

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

  function handleMessage() {
    setIsGuestbookExpanded(true);
    setInputOpen(true);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Load guestbook entries on mount
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

  // Format time for Copenhagen
  const copenhagenTime =
    mounted && time
      ? time.toLocaleTimeString("en-US", {
          timeZone: "Europe/Copenhagen",
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

  // Handle guestbook URL parameter and scrolling
  useEffect(() => {
    if (searchParams.get("guestbookOpen") === "1") {
      setIsGuestbookExpanded(true);
      // Use setTimeout to ensure the element exists after state update
      setTimeout(() => {
        document
          .getElementById("guestbook")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [searchParams]);

  // Prevent scrolling when guestbook is expanded
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
      <div className="relative min-h-screen bg-white">
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
            <header
              className={
                "sticky top-0 z-10 flex flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 py-6 sm:mb-8" +
                (isWorkOpen ? "" : " bg-white")
              }
            >
              <div className="flex flex-row items-center gap-4">
                <h1
                  className="text-lg font-semibold cursor-pointer hover:text-zinc-600 transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Jonathan Bangert
                </h1>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Clock className="w-4 h-4" />
                    <span>Copenhagen</span>
                    <span>{copenhagenTime}</span>
                  </div>
                </div>
              </div>
              <nav className="flex gap-4 items-center">
                <Link
                  href="https://x.com/jonba_"
                  target="_blank"
                  key="x-link"
                  rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <XIcon size={23} className="opacity-80" />
                  <span className="sr-only">X</span>
                </Link>
                <Link
                  href="https://github.com/jonbng"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="github-link"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/jonathan-bangert/"
                  target="_blank"
                  rel="noopener noreferrer"
                  key="linkedin-link"
                  className="hidden sm:inline-flex text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:contact@jonathanb.dk"
                  key="email-link"
                  className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
                >
                  <Mail size={24} />
                  <span className="sr-only">Email</span>
                </Link>
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

            <section className="mb-6 sm:mt-12">
              <div className="flex flex-col-reverse sm:flex-row items-start gap-8 sm:gap-12 mb-4">
                <div className="flex-1">
                  <h2 className="text-4xl font-normal tracking-tight mb-8">
                    Hey, I&apos;m Jonathan! <span className="wave">👋</span>
                  </h2>
                  <p className="text-xl text-zinc-600 leading-relaxed mb-4">
                    I&apos;m a 17-year-old software engineer who cares about
                    building high-quality, thoughtful software. I co-founded
                    <strong> Akademia</strong> and currently work as a lead SWE
                    @<strong>Burst</strong>. I focus on making technology that
                    is beautiful, intuitive, and genuinely useful.
                  </p>
                  <div className="flex flex-wrap gap-4 -ml-4">
                    <CTAButton
                      text="Follow Me!"
                      href="https://x.com/jonba_"
                      icon={<XIcon className="w-5 h-5" />}
                    />
                    <CTAButton
                      text="Sign Guestbook!"
                      href="#guestbook"
                      icon={<Mail className="w-5 h-5" />}
                    />
                  </div>
                </div>
                <div className="shrink-0 transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                  <Image
                    src="/pfp.jpg"
                    alt="Jonathan Bangert"
                    width={210}
                    height={210}
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
                    I started coding at 10, hacked my school PC at 12 for admin
                    access because I didn&apos;t have my own, and haven&apos;t
                    looked back. Over the years, I&apos;ve developed a strong
                    focus on building useful, well-designed products.
                  </p>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-2 mb-14 text-zinc-600">
              <Book className="w-5 h-5" />
              <span>
                Currently reading: &quot;The Creative Act&quot; by Rick Rubin
              </span>
            </div>

            <Separator className="mb-16" />

            <WorkShowcase
              onOpenChange={setIsWorkOpen}
              onSelectWork={setSelectedWork}
            />

            <Separator className="my-14" />

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

            <Separator className="my-14" />

            <BeyondCoding />

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
                  text="Follow Me!"
                  href="https://x.com/jonba_"
                  icon={<XIcon className="w-5 h-5" />}
                />
              </div>
            </section> */}

            <footer className="mt-14 pt-10 border-t border-zinc-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-zinc-500">
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
