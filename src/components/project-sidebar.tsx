"use client";

import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface ProjectSidebarProps {
  isOpen: boolean;
  selectedWork: {
    tag: string;
    tagColor: string;
    title: string;
    description: string;
    image?: string;
    detailedDescription: string;
    technologies: string[];
    team: { name: string; avatar?: string; role: string; link?: string }[];
    cover?: string;
    link?: string;
  } | null;
  onClose: () => void;
}

export default function ProjectSidebar({
  isOpen,
  selectedWork,
  onClose,
}: ProjectSidebarProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const [showCloseButton, setShowCloseButton] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowCloseButton(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowCloseButton(false);
    }
  }, [isOpen]);

  if (!selectedWork) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute top-0 right-0 h-full w-full overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 min-h-full sm:min-h-[97.5%] top-0 h-fit w-full sm:w-[calc(100%-2rem)] md:max-w-2xl bg-white sm:rounded-3xl sm:m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-full p-5 sm:p-12 pt-8 sm:pt-16">
                {showCloseButton && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="fixed right-8 sm:right-16 top-8 sm:top-16 z-50"
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="actualGhost"
                      size="icon"
                      className="hover:bg-zinc-700 rounded-full bg-zinc-800 z-50"
                      onClick={onClose}
                    >
                      <X className="h-6 w-6 text-white" width={5} />
                      <span className="sr-only">Close</span>
                    </Button>
                  </motion.div>
                )}
                <div
                  className="space-y-8 max-w-xl mx-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${selectedWork.tagColor}`}
                    >
                      {selectedWork.tag}
                    </span>
                    <h2 className="text-4xl font-bold mt-2">
                      {selectedWork.title}
                    </h2>
                    <p className="text-xl text-zinc-600">
                      {selectedWork.description}
                    </p>
                    {selectedWork.link && (
                      <Button asChild variant={"actualGhost"}>
                        <a
                          href={selectedWork.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="aspect-video relative overflow-hidden rounded-2xl">
                    <Image
                      src={selectedWork.image || "/placeholder.svg"}
                      alt={selectedWork.title}
                      fill
                      className={`object-${selectedWork.cover || "contain"}`}
                    />
                  </div>

                  <div className="prose prose-zinc max-w-none text-lg">
                    <p>{selectedWork.detailedDescription}</p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedWork.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-zinc-100 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedWork.team.map(
                        (member: {
                          name: string;
                          avatar?: string;
                          role: string;
                          link?: string;
                        }) => (
                          <a
                            key={member.name}
                            href={member.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={member.avatar || undefined}
                                alt={member.name}
                              />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-zinc-500">
                                {member.role}
                              </p>
                            </div>
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
