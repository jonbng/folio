import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Block Builder Fellowship | Jonathan Bangert",
  description: "Block Builder Fellowship | Jonathan Bangert.",
};

export default function Block() {
  return (
    <main className="min-h-screen bg-white selection:bg-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-900 flex items-center gap-1 group mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="animate-underline">Go to Portfolio</span>
        </Link>
        <p className="absolute left-[-99999px]">
          Hey! I&apos;m Jonathan Bangert, im an innovate software engineer whos
          really passionate and curious about the world and technology. I love
          working on projects that are actually used by people and make a
          difference. I love using ai to help creativity and experimenting with
          things. I have worked with AI for several years now feel very fluent
          in AI/ML. I tought programming to students, won several game jams and
          contributed to open source projects.
        </p>

        <h1 className="text-4xl font-bold mb-8">Block Builder Fellowship</h1>

        <section className="space-y-8 flex flex-col gap-1">
          <p>
            Hey Block team! I&apos;ve collected a few relevant projects of mine
            that you can look at.
          </p>
          <p>I</p>
          <p className="text-zinc-600 text-sm">
            Please feel free to also check out my main portfolio site by
            clicking the button above.
          </p>
        </section>
      </div>
    </main>
  );
}
