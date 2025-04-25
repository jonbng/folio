"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import { Check, ChevronDown, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Balloon, { type BalloonEntry, getBalloonColor } from "./balloon"; // Assuming BalloonEntry doesn't require username
import { Button } from "@/components/ui/button";
import { AddGuestbookEntry, EditGuestbookEntry, hashEmail } from "@/lib/guestbookActions";
import { Session } from "next-auth";

const colorOptions = [
  { name: "Blue", value: "blue" },
  { name: "Pink", value: "pink" },
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Orange", value: "orange" },
];

// FormData no longer includes username
type FormData = {
  name: string;
  message: string;
  selectedColor: string;
};

interface MessageInputProps {
  entries: BalloonEntry[];
  setEntries: (
    entries: BalloonEntry[] | ((prevEntries: BalloonEntry[]) => BalloonEntry[]),
  ) => void;
  session: Session | null;
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
const BalloonPreview = ({ entry }: { entry: BalloonEntry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="w-32 h-32 flex-shrink-0"
    >
      {/* Assuming Balloon component doesn't strictly need username */}
      <Balloon entry={entry} index={0} layoutMode="static" />
    </motion.div>
  );
};

// Message form component (remains the same)
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
  entries,
  setEntries,
  session,
}: MessageInputProps) {
  const [userEntryId, setUserEntryId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial form state without username
  const [formData, setFormData] = useState<FormData>({
    name: "",
    message: "",
    selectedColor: "blue",
  });

  // Effect to initialize form data based on session and existing entries
  useEffect(() => {
    if (!session?.user) return;

    let userId = session.user.id;
    if (!userId) {
      hashEmail(session.user.email!).then((hashedEmail) => {
        userId = hashedEmail;
      });
    }
    // Find existing entry based on user ID (assuming BalloonEntry has a userId or similar)
    // If BalloonEntry doesn't have userId, this find logic needs adjustment
    // For now, assuming 'id' might correspond to the user's *entry* ID if they have one
    // Or perhaps the backend provides the user's entry ID separately.
    // Let's assume `entries` contains the user's entry if they have one, identified by `id`.
    // This part might need refinement based on how `entries` relates user ID to entry ID.
    // A common pattern is that `GetAllGuestbookEntries` includes the user's entry ID if logged in.
    // We'll stick to the previous logic assuming `entries` contains the user's entry.
    const existingEntry = entries.find(
      (entry) => entry.username === userId, // Assuming BalloonEntry has userId now
    ); // Adjust this find condition based on your actual data structure

    if (existingEntry) {
      setUserEntryId(existingEntry.id); // Use the entry's ID
      setFormData({
        name: existingEntry.name,
        message: existingEntry.message,
        selectedColor: existingEntry.color,
      });
      setIsEditing(false);
    } else {
      setUserEntryId(null);
      setFormData({
        name: session.user.name || "",
        message: "",
        selectedColor:
          colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
      });
      setIsEditing(true);
    }
  }, [session, entries]);

  if (!session?.user) return null;

  // Preview entry without username
  const previewEntry: BalloonEntry = {
    id: userEntryId || "preview",
    name: formData.name || "Your Name",
    username: session.user.id || "", // Add userId if needed by Balloon component
    message: formData.message || "Your message will appear here",
    color: formData.selectedColor,
    timestamp: Date.now().toString(),
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
    const { name, message, selectedColor } = formData;
    let userId = session.user?.id; // Still need user ID for association
    if (!userId) {
      hashEmail(session.user!.email!).then((hashedEmail) => {
        userId = hashedEmail;
      });
    }

    // Validation without username
    if (!name.trim() || !message.trim() || !userId) {
      console.warn("Form validation failed: Name, message, and user required");
      return;
    }

    const timestamp = new Date().toISOString();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (userEntryId) {
      // --- EDIT existing entry ---
      const optimisticUpdatedEntry: BalloonEntry = {
        id: userEntryId,
        name: trimmedName,
        username: userId, // Include userId if needed
        message: trimmedMessage,
        color: selectedColor,
        timestamp: timestamp,
      };

      setEntries((prevEntries) =>
        prevEntries
          .map((entry) =>
            entry.id === userEntryId ? optimisticUpdatedEntry : entry,
          )
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          ),
      );
      setIsEditing(false);

      try {
        await EditGuestbookEntry(
          userEntryId, // Pass the entry ID to edit
          trimmedName,
          trimmedMessage,
          selectedColor,
        );
        console.log("Guestbook entry updated successfully.");
      } catch (error) {
        console.error("Failed to update guestbook entry:", error);
        alert("Failed to update your message. Please try again.");
        // Consider reverting optimistic update here
      }
    } else {
      // --- ADD new entry ---
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimisticNewEntry: BalloonEntry = {
        id: tempId,
        name: trimmedName,
        username: userId, // Include userId if needed
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
        // Call server action and expect a number (the new ID)
        const addedEntryIdNum = await AddGuestbookEntry(
          trimmedName,
          trimmedMessage,
          selectedColor,
        );

        // Check if a valid ID number was returned
        if (typeof addedEntryIdNum === "number" && addedEntryIdNum > 0) {
          const addedEntryIdStr = addedEntryIdNum.toString();
          setUserEntryId(addedEntryIdStr); // Update state with the real ID (as string)

          // Update the temporary entry in the list with the real ID
          setEntries((prevEntries) =>
            prevEntries
              .map((entry) =>
                entry.id === tempId
                  ? { ...entry, id: addedEntryIdStr } // Update ID
                  : entry,
              )
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime(),
              ),
          );
          console.log(
            `Guestbook entry added successfully with ID: ${addedEntryIdStr}.`,
          );
        } else {
          // Handle cases where the ID might not be returned as expected
          setUserEntryId(tempId); // Fallback: keep temp ID
          console.warn(
            "Guestbook entry added, but couldn't update with real ID from server.",
          );
        }
      } catch (error) {
        console.error("Failed to add guestbook entry:", error);
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry.id !== tempId),
        );
        setIsEditing(true);
        alert("Failed to add your message. Please try again.");
      }
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
              onFocus={
                !isEditing && userEntryId ? handleStartEditing : undefined
              }
              placeholder={
                userEntryId ? "Edit your message..." : "Enter a message..."
              }
              className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              required
            />

            {isEditing ? (
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
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleStartEditing}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Edit2 className="h-5 w-5" />
              </Button>
            )}
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
