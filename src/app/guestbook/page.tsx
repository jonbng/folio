"use client";

import type React from "react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Edit2 } from "lucide-react";
import Balloon, { BalloonEntry, getBalloonColor } from "@/components/balloon";
import { SessionProvider, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  AddGuestbookEntry,
  EditGuestbookEntry,
  GetAllGuestbookEntries,
} from "@/lib/guestbookActions";
import Login from "@/components/login";
import MessageInput from "@/components/message-input";
import { motion } from "motion/react";

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
  username: string;
  message: string;
  selectedColor: string;
};

function IdkMan() {
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black p-5 rounded-full shadow-lg z-50 gap-4"
    >
      {session ? (
        <MessageInput onMessageAdded={(entry) => console.log(entry)} />
      ) : (
        <Login />
      )}
    </motion.div>
  );
}
export default function Home() {
  return (
    <SessionProvider>
      <main className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Guestbook</h1>
        <BalloonGuestbook />
      </main>
      <IdkMan />
    </SessionProvider>
  );
}

function BalloonGuestbook() {
  const { data: session } = useSession();
  const [colors, setColors] = useState(colorOptions);
  const [entries, setEntries] = useState<BalloonEntry[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    message: "",
    selectedColor: "blue",
  });
  const [userEntryId, setUserEntryId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch entries and initialize form data from the session
  useEffect(() => {
    async function fetchEntries() {
      try {
        const fetchedEntries = await GetAllGuestbookEntries();
        const sortedEntries = fetchedEntries.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        setEntries(sortedEntries);

        // Load existing entry if the user has already signed the guestbook
        const existingEntry = sortedEntries.find(
          (entry) => entry.username === session?.user?.email,
        );
        if (existingEntry) {
          setUserEntryId(existingEntry.id);
          setFormData({
            name: existingEntry.name,
            username: existingEntry.username,
            message: existingEntry.message,
            selectedColor: existingEntry.color,
          });
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Failed to fetch guestbook entries:", error);
      }
    }

    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session.user?.name || "",
        username: session.user?.email || "",
        selectedColor:
          colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
      }));
      setColors([...colorOptions].sort(() => Math.random() - 0.5));
    }

    fetchEntries();
  }, [session]);

  // Handle input changes for text fields
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle balloon color selection
  const handleColorSelect = (color: string) => {
    setFormData((prev) => ({ ...prev, selectedColor: color }));
  };

  // Unified submit handler for both adding and editing entries
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, username, message, selectedColor } = formData;
    if (!name.trim() || !username.trim() || !message.trim()) return;

    const timestamp = new Date().toISOString();

    if (isEditing && userEntryId) {
      // Edit entry
      const updatedEntries = entries
        .map((entry) =>
          entry.id === userEntryId
            ? {
                ...entry,
                name: name.trim(),
                username: username.trim(),
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
          username.trim(),
          selectedColor,
        );
        console.log("Guestbook entry updated successfully.");
        setUserEntryId(userEntryId);
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update guestbook entry:", error);
        alert("Failed to update the entry. Please try again.");
      }
    } else {
      // Add new entry
      const newEntry: BalloonEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        username: username.trim(),
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
      setIsEditing(false);

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

  // Populate form for editing the user's entry
  const startEditing = () => {
    const userEntry = entries.find((entry) => entry.id === userEntryId);
    if (userEntry) {
      setFormData({
        name: userEntry.name,
        username: userEntry.username,
        message: userEntry.message,
        selectedColor: userEntry.color,
      });
      setIsEditing(true);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-zinc-100 h-screen w-screen">
      <div
        className="p-8 bg-zinc-200 backdrop-blur-sm rounded-lg shadow-lg relative"
        style={{ minHeight: "500px" }}
      >
        {entries.map((entry, index) => (
          <Balloon key={entry.id} entry={entry} index={index} />
        ))}
      </div>
      {session ? (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          {!userEntryId || isEditing ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Your Message" : "Sign the Guestbook"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Balloon Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleColorSelect(color.value)}
                          className={`w-8 h-8 rounded-full border-2 ${
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
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Leave a message"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    {isEditing ? "Update Balloon" : "Add Balloon"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Thanks for signing the guestbook! You can edit your message if
                you want.
              </p>
              <button
                onClick={startEditing}
                className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>You need to sign in</h1>
          <button onClick={() => signIn("github")}>Sign In</button>
        </div>
      )}
    </div>
  );
}
