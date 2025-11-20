"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="text-7xl animate-bounce">😅</div>
        </div>
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold text-zinc-900">
            Well, that&apos;s unexpected
          </h2>
          <p className="text-xl text-zinc-600 leading-relaxed">
            Something broke. Let&apos;s give that another shot.
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            className="bg-zinc-900 hover:bg-zinc-800 text-white inline-flex items-center gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-zinc-500 cursor-pointer hover:text-zinc-700">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs text-zinc-600 bg-zinc-50 p-4 rounded-lg overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
