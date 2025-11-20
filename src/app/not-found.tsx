import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error: 404</h1>
        <p className="text-xl text-zinc-600 mb-8">
          Looks like you went off the map. No worries!
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-zinc-900 flex items-center justify-center gap-1 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="animate-underline">Back to home</span>
        </Link>
      </div>
    </div>
  );
}
