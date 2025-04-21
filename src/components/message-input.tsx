"use client";

import { useState, useRef, useEffect } from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { type BalloonEntry, getBalloonColor } from "./balloon";
import { Button } from "@/components/ui/button";
import { AddGuestbookEntry } from "@/lib/guestbookActions";

const colorOptions = [
  { name: "Blue", value: "blue" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Orange", value: "orange" },
];

interface MessageInputProps {
  onMessageAdded: (entry: BalloonEntry) => void;
}

export default function MessageInput({ onMessageAdded }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Preview entry for the balloon
  const previewEntry: BalloonEntry = {
    id: "preview",
    name: name || "Your Name",
    username: "visitor",
    message: message || "Your message will appear here",
    color: selectedColor,
    timestamp: Date.now().toString(),
  };

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

  const handleSubmit = async () => {
    if (!message.trim() || !name.trim()) return;

    const newEntry: BalloonEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      username: "visitor",
      message: message.trim(),
      color: selectedColor,
      timestamp: Date.now().toString(),
    };

    try {
      await AddGuestbookEntry(
        newEntry.name,
        newEntry.message,
        newEntry.username,
        newEntry.color,
      );
      onMessageAdded(newEntry);
      setMessage("");
      setName("");
      setSelectedColor("blue");
      setIsFocused(false);
    } catch (error) {
      console.error("Failed to add guestbook entry:", error);
    }
  };

  return (
    <div className="flex items-start gap-6">
      {/* Preview balloon */}
      <AnimatePresence>
        {isFocused && (
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
          height: isFocused ? "auto" : "56px",
        }}
      >
        <div className="flex items-center p-2 relative">
          {/* Main input field */}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Enter message"
            className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-800"
          />

          {/* Action buttons */}
          {isFocused ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsFocused(false);
                  setMessage("");
                  setName("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSubmit}
                disabled={!message.trim() || !name.trim()}
                className={`${
                  message.trim() && name.trim()
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
                setIsFocused(true);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Check className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isFocused && (
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                            backgroundColor: getBalloonColor(selectedColor).bg,
                          }}
                        ></div>
                        <span className="capitalize">{selectedColor}</span>
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
                            {colorOptions.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={() => {
                                  setSelectedColor(color.value);
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
