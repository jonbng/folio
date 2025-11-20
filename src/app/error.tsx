"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const isProduction = process.env.NODE_ENV !== "development";

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    if (!isProduction) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isProduction, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl text-black">Error: 500</h1>
          <p className="text-black/60">
            Something went wrong. I&apos;ll take a look at it at some point :P
          </p>
          {isProduction && (
            <p className="text-sm text-black/40 mt-4">
              Redirecting in {countdown} seconds...
            </p>
          )}
        </div>

        <Link
          href="/"
          className="text-sm font-medium text-zinc-900 flex items-center justify-center gap-1 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="animate-underline">Back to home</span>
        </Link>

        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-black/60 cursor-pointer hover:text-black">
              Error Details
            </summary>
            <pre className="mt-4 text-xs text-black/80 bg-black/5 p-4 rounded overflow-auto border border-black/10">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
