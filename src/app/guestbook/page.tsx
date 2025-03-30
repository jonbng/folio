"use client";

import type React from "react";

import { useState } from "react";
import { Edit2 } from "lucide-react";
import Balloon, { BalloonEntry, getBalloonColor } from "@/components/balloon";


export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-8">Guestbook</h1>
      <BalloonGuestbook />
    </main>
  );
}

function BalloonGuestbook() {
  // Sample entries for the guestbook
  const defaultEntries: BalloonEntry[] = [
    {
      id: "1",
      name: "Emma Thompson",
      username: "emma_t",
      message: "Love your website! Keep up the great work.",
      color: "blue",
      timestamp: "2023-04-15T14:32:00",
    },
    {
      id: "2",
      name: "Liam Johnson",
      username: "liam_j",
      message: "Just stopping by to say hello from California!",
      color: "pink",
      timestamp: "2023-04-16T09:45:00",
    },
    {
      id: "3",
      name: "Olivia Martinez",
      username: "olivia_m",
      message: "This is such a creative guestbook idea!",
      color: "yellow",
      timestamp: "2023-04-17T16:20:00",
    },
    {
      id: "4",
      name: "Noah Williams",
      username: "noah_w",
      message: "First time visitor, definitely coming back!",
      color: "green",
      timestamp: "2023-04-18T11:15:00",
    },
    {
      id: "5",
      name: "Ava Brown",
      username: "ava_b",
      message: "Greetings from New York City!",
      color: "purple",
      timestamp: "2023-04-19T20:05:00",
    },
    {
      id: "6",
      name: "Ethan Davis",
      username: "ethan_d",
      message: "Your portfolio is inspiring!",
      color: "orange",
      timestamp: "2023-04-20T13:50:00",
    },
    {
      id: "7",
      name: "Sophia Miller",
      username: "sophia_m",
      message: "Thanks for sharing your work with us.",
      color: "blue",
      timestamp: "2023-04-21T08:30:00",
    },
    {
      id: "8",
      name: "Mason Wilson",
      username: "mason_w",
      message: "I'm impressed by your projects!",
      color: "pink",
      timestamp: "2023-04-22T15:40:00",
    },
    {
      id: "9",
      name: "Isabella Moore",
      username: "isabella_m",
      message: "Looking forward to seeing more of your work.",
      color: "yellow",
      timestamp: "2023-04-23T12:25:00",
    },
    {
      id: "10",
      name: "Logan Taylor",
      username: "logan_t",
      message: "Great design and user experience!",
      color: "green",
      timestamp: "2023-04-24T17:10:00",
    },
    {
      id: "11",
      name: "Mia Anderson",
      username: "mia_a",
      message: "Hello from a fellow developer!",
      color: "purple",
      timestamp: "2023-04-25T10:55:00",
    },
    {
      id: "12",
      name: "Lucas Thomas",
      username: "lucas_t",
      message: "Your site is awesome!",
      color: "orange",
      timestamp: "2023-04-26T19:15:00",
    },
  ];

  // Sort entries by timestamp (newest first)
  const sortedDefaultEntries = [...defaultEntries].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const [entries, setEntries] = useState<BalloonEntry[]>(sortedDefaultEntries);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [userEntryId, setUserEntryId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const colorOptions = [
    { name: "Blue", value: "blue" },
    { name: "Pink", value: "pink" },
    { name: "Yellow", value: "yellow" },
    { name: "Green", value: "green" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" },
  ];

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && username.trim() && message.trim()) {
      const timestamp = new Date().toISOString();
      const newEntry: BalloonEntry = {
        id: Date.now().toString(),
        name: name.trim(),
        username: username.trim(),
        message: message.trim(),
        color: selectedColor,
        timestamp,
      };

      // Add the new entry and sort
      const updatedEntries = [...entries, newEntry].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      setEntries(updatedEntries);
      setUserEntryId(newEntry.id);
      resetForm();
    }
  };

  const editEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEntryId && name.trim() && username.trim() && message.trim()) {
      const updatedEntries = entries
        .map((entry) => {
          if (entry.id === userEntryId) {
            return {
              ...entry,
              name: name.trim(),
              username: username.trim(),
              message: message.trim(),
              color: selectedColor,
              timestamp: new Date().toISOString(), // Update timestamp on edit
            };
          }
          return entry;
        })
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );

      setEntries(updatedEntries);
      setIsEditing(false);
    }
  };

  const startEditing = () => {
    if (userEntryId) {
      const userEntry = entries.find((entry) => entry.id === userEntryId);
      if (userEntry) {
        setName(userEntry.name);
        setUsername(userEntry.username);
        setMessage(userEntry.message);
        setSelectedColor(userEntry.color);
        setIsEditing(true);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setUsername("");
    setMessage("");
    setSelectedColor("blue");
  };

  const cancelEdit = () => {
    setIsEditing(false);
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        {!userEntryId || isEditing ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Your Message" : "Sign the Guestbook"}
            </h2>
            <form
              onSubmit={isEditing ? editEntry : addEntry}
              className="space-y-4"
            >
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Balloon Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color.value
                          ? "border-gray-800"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor: getBalloonColor(color.value).bg,
                        boxShadow:
                          selectedColor === color.value
                            ? "0 0 0 2px rgba(0,0,0,0.1)"
                            : "none",
                      }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
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
              Thanks for signing the guestbook! Your balloon has been added.
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

      <div
        className="p-8 bg-white/50 backdrop-blur-sm rounded-lg shadow-lg relative"
        style={{ minHeight: "500px" }}
      >
        {entries.map((entry, index) => (
          <Balloon key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}
