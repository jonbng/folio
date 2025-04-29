"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { getBalloonColor } from "./balloon";
import { Button } from "@/components/ui/button";
import { AddGuestbookEntry } from "@/lib/guestbookActions";
import { GuestbookEntry } from "@/types/guestbook";

const colorOptions = [
  { name: "Blue", value: "blue" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Orange", value: "orange" },
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

// Preview balloon component (remains the same)
const BalloonPreview = ({ entry }: { entry: GuestbookEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="w-32 h-32 pt-5 pl-12 flex-shrink-0"
    >
      <Balloon entry={entry} index={0} layoutMode="static" />
    </motion.div>
  );
};

// Main MessageInput Component
export default function MessageInput({
  setEntries,
  onSubmit,
  inputOpen,
}: MessageInputProps) {
  const [isEditing, setIsEditing] = useState(inputOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    message: "",
    selectedColor:
      colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
    notABot: "", // Initialize honeypot field as empty
  });

  // Preview entry
  const previewEntry: GuestbookEntry = {
    id: "preview",
    name: formData.name || "Your Name",
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, message, selectedColor, notABot } = formData;

    // Bot detection - if honeypot field is filled, silently reject
    if (notABot) {
      console.log("Bot submission detected and prevented");
      // Pretend success but don't actually submit
      setIsEditing(false);
      setFormData({
        name: "",
        message: "",
        selectedColor:
          colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
        notABot: "",
      });
      return;
    }

    // Validation
    if (!name.trim() || !message.trim()) {
      console.warn("Form validation failed: Name and message required");
      return;
    }

    const timestamp = new Date().toISOString();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    // --- ADD new entry ---
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
      console.log(
        `Guestbook entry added successfully with ID: ${addedEntryId}.`,
      );

      // Reset form
      setFormData({
        name: "",
        message: "",
        selectedColor:
          colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
        notABot: "",
      });

      // Call onSubmit callback if provided
      onSubmit?.();
    } catch (error) {
      console.error("Failed to add guestbook entry:", error);
      alert("Failed to add your message. Please try again.");
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
    <div className="flex items-start gap-8">
      <AnimatePresence>
        {isEditing && <BalloonPreview entry={previewEntry} />}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-hidden min-w-[350px]"
      >
        <form onSubmit={handleSubmit} className="h-full">
          <div className="p-4 flex flex-col gap-2 pb-2">
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
                      className="block text-sm font-medium text-zinc-600 mb-1.5 tracking-wide"
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
                      className="w-full px-4 py-2.5 border-2 border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 text-[15px] bg-white/50"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-600 mb-1.5 tracking-wide"
              >
                Your Message
              </label>
              <input
                ref={inputRef}
                id="message"
                name="message"
                type="text"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => !isEditing && handleStartEditing()}
                placeholder="Enter a message..."
                className="flex-1 w-full px-4 py-2.5 border-2 border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all duration-200 text-[15px] bg-white/50"
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
                className="px-4 pb-4 flex flex-col justify-between"
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
                <label className="block text-sm font-medium text-zinc-600 mb-1.5 tracking-wide">
                  Balloon Color
                </label>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => handleColorSelect(color.value)}
                        className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                          formData.selectedColor === color.value
                            ? "border-gray-800"
                            : "border-transparent"
                        }`}
                        style={{
                          backgroundColor: getBalloonColor(color.value).bg,
                          boxShadow:
                            formData.selectedColor === color.value
                              ? "0 0 0 2px rgba(0,0,0,0.1)"
                              : "none",
                        }}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={!formData.message.trim() || !formData.name.trim()}
                    className={`transition-all duration-200 rounded-lg text-zinc-300 ${
                      formData.message.trim() && formData.name.trim()
                        ? "bg-zinc-700 hover:bg-zinc-800 hover:text-white"
                        : "cursor-not-allowed bg-zinc-700"
                    }`}
                  >
                    <Send className="h-5 w-5" />
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
