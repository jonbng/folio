"use client";

import { useState, useEffect, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { copyEmail, getEmail, getPressEmail, getPrivacyEmail } from "@/lib/email";

const emailMap: Record<string, () => string> = {
  contact: getEmail,
  press: getPressEmail,
  privacy: getPrivacyEmail,
};

interface EmailTextProps {
  /** Key identifying which email to resolve: "contact" | "press" | "privacy" */
  type: keyof typeof emailMap;
  className?: string;
}

/** Renders an email address as text (client-only) with click-to-copy. */
export function EmailText({ type, className = "" }: EmailTextProps) {
  const emailFn = emailMap[type];
  const [email, setEmail] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Resolve email only on the client — never in SSR HTML
  useEffect(() => {
    setEmail(emailFn());
  }, [emailFn]);

  const handleCopy = useCallback(async () => {
    const ok = await copyEmail(emailFn);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [emailFn]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 group ${className}`}
      aria-label="Copy email address"
    >
      <span suppressHydrationWarning>{email ?? "\u00A0"}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-600" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity duration-150 ease-out" />
      )}
      {copied ? (
        <span className="text-xs text-emerald-600 font-medium">Copied!</span>
      ) : null}
    </button>
  );
}
