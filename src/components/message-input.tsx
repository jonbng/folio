"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
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
  notABot?: string; // Honeypot field
};

interface MessageInputProps {
  setEntries: React.Dispatch<React.SetStateAction<GuestbookEntry[]>>;
  onSubmit?: () => void;
}

// Color picker component (remains the same)
const ColorPicker = ({
  selectedColor,
  onSelectColor,
}: {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState(colorOptions);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColors([...colorOptions].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: getBalloonColor(selectedColor).bg }}
          ></div>
          <span className="capitalize">{selectedColor}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
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
                    onSelectColor(color.value);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  <div
                    className="w-5 h-5 rounded-full"
                    style={{ backgroundColor: getBalloonColor(color.value).bg }}
                  ></div>
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Preview balloon component (remains the same)
const BalloonPreview = ({ entry }: { entry: GuestbookEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="w-32 h-32 flex-shrink-0"
    >
      <Balloon entry={entry} index={0} layoutMode="static" />
    </motion.div>
  );
};

// Message form component
const MessageForm = ({
  formData,
  onInputChange,
  onColorSelect,
}: {
  formData: FormData;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onColorSelect: (color: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="px-6 pb-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-500 mb-1"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Honeypot field - hidden from real users */}
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
            onChange={onInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Balloon Color
          </label>
          <ColorPicker
            selectedColor={formData.selectedColor}
            onSelectColor={onColorSelect}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Main MessageInput Component
export default function MessageInput({
  setEntries,
  onSubmit,
}: MessageInputProps) {
  const [isEditing, setIsEditing] = useState(false);
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
    <div className="flex items-start gap-6">
      <AnimatePresence>
        {isEditing && <BalloonPreview entry={previewEntry} />}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ duration: 0.2 }}
        className="flex-1 bg-white rounded-lg shadow-sm border overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="h-full">
          <div className="flex items-center p-2 relative">
            <input
              ref={inputRef}
              id="message"
              name="message"
              type="text"
              value={formData.message}
              onChange={handleInputChange}
              onFocus={() => !isEditing && handleStartEditing()}
              placeholder="Enter a message..."
              className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              required
            />

            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={!formData.message.trim() || !formData.name.trim()}
              className={`transition-colors ${
                formData.message.trim() && formData.name.trim()
                  ? "text-green-500 hover:text-green-700 hover:bg-green-100"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <Check className="h-5 w-5" />
            </Button>
          </div>

          <AnimatePresence>
            {isEditing && (
              <MessageForm
                formData={formData}
                onInputChange={handleInputChange}
                onColorSelect={handleColorSelect}
              />
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
