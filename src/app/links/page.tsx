import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links | Jonathan Bangert",
  description: "Links for Jonathan Bangert.",
};

export default function PressKit() {
  return (
    <main className="min-h-screen bg-white selection:bg-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-900 flex items-center gap-1 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="animate-underline">Back to home</span>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Links</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bio</h2>
          </div>
        </section>
      </div>
    </main>
  );
}
