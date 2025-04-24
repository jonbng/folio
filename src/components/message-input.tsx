"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { type BalloonEntry, getBalloonColor } from "./balloon";
import { Button } from "@/components/ui/button";
import { AddGuestbookEntry, EditGuestbookEntry } from "@/lib/guestbookActions";
import { Session } from "next-auth";

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
};

interface MessageInputProps {
  entries: BalloonEntry[];
  setEntries: (entries: BalloonEntry[]) => void;
  session: Session | null;
}

export default function MessageInput({
  entries,
  setEntries,
  session,
}: MessageInputProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colors, setColors] = useState(colorOptions);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userEntryId, setUserEntryId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    message: "",
    selectedColor: "blue",
  });

  useEffect(() => {
    console.log("Session:", session);
    console.log("Entries:", entries);
    if (!session) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: session.user?.name || "",
      username: session.user?.email || "",
      selectedColor:
        colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
    }));
    setColors([...colorOptions].sort(() => Math.random() - 0.5));

    try {
      const existingEntry = entries.find(
        (entry) => entry.username === session.user?.email,
      );
      if (existingEntry) {
        console.log("Existing entry found:", existingEntry);
        setUserEntryId(existingEntry.id);
        setFormData({
          name: existingEntry.name,
          message: existingEntry.message,
          selectedColor: existingEntry.color,
        });
        cancelEdit();
      }
    } catch (error) {
      console.error("Failed to fetch guestbook entries:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session) {
    return null;
  }

  const startEditing = () => {
    const userEntry = entries.find((entry) => entry.id === userEntryId);
    if (userEntry) {
      setFormData({
        name: userEntry.name,
        message: userEntry.message,
        selectedColor: userEntry.color,
      });
      setIsEditing(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const cancelEdit = () => {
    if (userEntryId) {
      setIsEditing(false);
    }
  };

  // Preview entry for the balloon
  const previewEntry: BalloonEntry = {
    id: "preview",
    name: formData.name || "Your Name",
    username: session.user?.id || "visitor",
    message: formData.message || "Your message will appear here",
    color: formData.selectedColor,
    timestamp: Date.now().toString(),
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, message, selectedColor } = formData;
    if (!name.trim() || !message.trim()) return;

    const timestamp = new Date().toISOString();

    if (isEditing && userEntryId) {
      // Edit entry
      const updatedEntries = entries
        .map((entry) =>
          entry.id === userEntryId
            ? {
                ...entry,
                name: name.trim(),
                username: session.user?.id || "visitor",
                message: message.trim(),
                color: selectedColor,
                timestamp,
              }
            : entry,
        )
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
      setEntries(updatedEntries);

      try {
        await EditGuestbookEntry(
          userEntryId,
          name.trim(),
          message.trim(),
          session.user?.id || "visitor",
          selectedColor,
        );
        console.log("Guestbook entry updated successfully.");
        setUserEntryId(userEntryId);
        cancelEdit();
      } catch (error) {
        console.error("Failed to update guestbook entry:", error);
        alert("Failed to update the entry. Please try again.");
      }
    } else {
      // Add new entry
      const newEntry: BalloonEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        username: session.user?.id || "visitor",
        message: message.trim(),
        color: selectedColor,
        timestamp,
      };
      const updatedEntries = [...entries, newEntry].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
      setEntries(updatedEntries);
      setUserEntryId(newEntry.id);
      cancelEdit();

      try {
        await AddGuestbookEntry(
          newEntry.name,
          newEntry.message,
          newEntry.username,
          newEntry.color,
        );
        console.log("Guestbook entry added successfully.");
      } catch (error) {
        console.error("Failed to add guestbook entry:", error);
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, selectedColor: color }));
  };

  return (
    <div className="flex items-start gap-6">
      {/* Preview balloon */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-32 h-32 flex-shrink-0"
          >
            <Balloon entry={previewEntry} index={0} layoutMode="static" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input pill */}
      <motion.div
        className={`flex-1 transition-all`}
        animate={{
          height: isEditing ? "auto" : "56px",
        }}
      >
        <div className="flex items-center p-2 relative">
          {/* Main input field */}
          <input
            ref={inputRef}
            type="text"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={() => startEditing()}
            placeholder="Enter message"
            className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-800"
          />

          {/* Action buttons */}
          {isEditing ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSubmit}
                disabled={!formData.message.trim() || !formData.name.trim()}
                className={`${
                  formData.message.trim() && formData.name.trim()
                    ? "text-green-500 hover:text-green-700"
                    : "text-gray-300"
                }`}
              >
                <Check className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                startEditing();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Check className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-4"
            >
              <div className="flex flex-col gap-4">
                {/* Name input */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Color picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Balloon Color
                  </label>
                  <div className="relative" ref={colorPickerRef}>
                    <button
                      type="button"
                      onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{
                            backgroundColor: getBalloonColor(
                              formData.selectedColor,
                            ).bg,
                          }}
                        ></div>
                        <span className="capitalize">
                          {formData.selectedColor}
                        </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </button>

                    {/* Color dropdown */}
                    <AnimatePresence>
                      {isColorPickerOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg"
                        >
                          <div className="p-2 grid grid-cols-3 gap-2">
                            {colors.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={() => {
                                  handleColorSelect(color.value);
                                  setIsColorPickerOpen(false);
                                }}
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                              >
                                <div
                                  className="w-5 h-5 rounded-full"
                                  style={{
                                    backgroundColor: getBalloonColor(
                                      color.value,
                                    ).bg,
                                  }}
                                ></div>
                                <span>{color.name}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
