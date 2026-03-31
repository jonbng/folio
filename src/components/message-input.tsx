"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { getBalloonColor } from "./balloon";
import { Button } from "@/components/ui/button";
import { AddGuestbookEntry } from "@/lib/guestbookActions";
import { GuestbookEntry } from "@/types/guestbook";
import { toast } from "sonner";

const colorOptions = [
  { name: "Blue", value: "blue" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Orange", value: "orange" },
  { name: "Teal", value: "teal" },
];

type FormData = {
  name: string;
  message: string;
  selectedColor: string;
  notABot?: string;
};

interface MessageInputProps {
  setEntries: React.Dispatch<React.SetStateAction<GuestbookEntry[]>>;
  onSubmit?: () => void;
  inputOpen: boolean;
}

const BalloonPreview = ({ entry }: { entry: GuestbookEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, marginRight: -112 }}
      animate={{ opacity: 1, scale: 1, marginRight: 0 }}
      exit={{ opacity: 0, scale: 0.8, marginRight: -112 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="w-28 h-28 pt-5 pl-11 shrink-0 hidden md:block"
    >
      <Balloon entry={entry} index={0} layoutMode="static" />
    </motion.div>
  );
};

const getRandomColor = () =>
  colorOptions[Math.floor(Math.random() * colorOptions.length)].value;

export default function MessageInput({
  setEntries,
  onSubmit,
  inputOpen,
}: MessageInputProps) {
  const [isEditing, setIsEditing] = useState(inputOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditing) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const [formData, setFormData] = useState<FormData>(() => ({
    name: "",
    message: "",
    selectedColor: getRandomColor(),
    notABot: "",
  }));

  const previewEntry: GuestbookEntry = {
    id: "preview",
    name: formData.name || "Name",
    message: formData.message || "Your message will appear here",
    color: formData.selectedColor,
    timestamp: new Date().toISOString(),
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, selectedColor: color }));
  };

  const canSubmit = formData.message.trim() && formData.name.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, message, selectedColor, notABot } = formData;

    if (notABot) {
      setIsEditing(false);
      setFormData({
        name: "",
        message: "",
        selectedColor: getRandomColor(),
        notABot: "",
      });
      return;
    }

    if (!name.trim() || !message.trim()) {
      toast.error("Name and message are required");
      return;
    }

    const timestamp = new Date().toISOString();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimisticNewEntry: GuestbookEntry = {
      id: tempId,
      name: trimmedName,
      message: trimmedMessage,
      color: selectedColor,
      timestamp: timestamp,
    };

    setEntries((prevEntries) =>
      [...prevEntries, optimisticNewEntry].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    );
    // toast.success("Message sent successfully");
    setIsEditing(false);

    try {
      const addedEntryId = await AddGuestbookEntry(
        trimmedName,
        trimmedMessage,
        selectedColor,
      );

      setEntries((prevEntries) =>
        prevEntries
          .map((entry) =>
            entry.id === tempId ? { ...entry, id: addedEntryId } : entry,
          )
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          ),
      );

      setFormData({
        name: "",
        message: "",
        selectedColor: getRandomColor(),
        notABot: "",
      });

      onSubmit?.();
    } catch (error) {
      console.error("Failed to add guestbook entry:", error);
      toast.error("Failed to add your message. Please try again.");
      setEntries((prevEntries) =>
        prevEntries
          .filter((entry) => entry.id !== tempId)
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          ),
      );
      setIsEditing(true);
    }
  };

  return (
    <div ref={formRef} className="flex items-start gap-8">
      <AnimatePresence>
        {isEditing && <BalloonPreview entry={previewEntry} />}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-hidden sm:min-w-[350px]"
      >
        <form onSubmit={handleSubmit} className="h-full">
          <div className="p-4 flex flex-col gap-3">
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20 focus:border-[var(--ring)] transition-[border-color,box-shadow] duration-150 text-[15px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-[var(--muted-foreground)] mb-1.5 uppercase tracking-wider"
              >
                Message
              </label>
              <input
                ref={inputRef}
                id="message"
                name="message"
                type="text"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => !isEditing && handleStartEditing()}
                placeholder="Leave a message..."
                className="flex-1 w-full px-3.5 py-2.5 border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20 focus:border-[var(--ring)] transition-[border-color,box-shadow] duration-150 text-[15px] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/50"
                required
              />
            </div>
          </div>
          <AnimatePresence>
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 flex flex-col gap-3"
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    padding: "0",
                    margin: "-1px",
                    overflow: "hidden",
                    clip: "rect(0, 0, 0, 0)",
                    whiteSpace: "nowrap",
                    border: "0",
                  }}
                >
                  <label htmlFor="notABot">Leave this field empty</label>
                  <input
                    type="text"
                    id="notABot"
                    name="notABot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.notABot}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row justify-between items-end">
                  <div>
                    <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-2 uppercase tracking-wider">
                      Color
                    </label>
                    <div className="flex gap-2">
                      {colorOptions.map((color) => {
                        const isSelected =
                          formData.selectedColor === color.value;
                        return (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() => handleColorSelect(color.value)}
                            className="w-7 h-7 rounded-full cursor-pointer press-scale transition-[box-shadow] duration-150"
                            style={{
                              backgroundColor: getBalloonColor(color.value).bg,
                              boxShadow: isSelected
                                ? `0 0 0 2px var(--background), 0 0 0 4px ${getBalloonColor(color.value).knot}`
                                : "0 0 0 1px rgba(0,0,0,0.06)",
                            }}
                            aria-label={`Select ${color.name} color`}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <Button
                    type="submit"
                    variant="actualGhost"
                    size="icon"
                    disabled={!canSubmit}
                    className={`rounded-xl min-w-[40px] min-h-[40px] flex-shrink-0 press-scale transition-colors duration-150 ${
                      canSubmit
                        ? "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/85"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]/40 cursor-not-allowed"
                    }`}
                  >
                    <Send className="h-4.5 w-4.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
