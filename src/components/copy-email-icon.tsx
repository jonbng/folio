"use client";

import { useState, useCallback } from "react";
import { Mail, Check } from "lucide-react";
import { copyEmail, getEmail } from "@/lib/email";

export function CopyEmailIcon() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyEmail(getEmail);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-zinc-600 hover:text-zinc-900 transition-colors hover:scale-110"
      aria-label="Copy email address"
    >
      {copied ? (
        <Check size={24} className="text-emerald-600" />
      ) : (
        <Mail size={24} />
      )}
      <span className="sr-only">Copy Email</span>
    </button>
  );
}
