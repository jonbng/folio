import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

        <h1 className="text-4xl font-bold mb-8">Press Kit</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bio</h2>
            <p className="text-zinc-600">
              Jonathan Bangert is a software engineer, educator, and
              entrepreneur. He is the co-founder of Akademia, an AI-powered
              learning platform, and a senior software engineer at Flimmer. With
              over a decade of experience in the tech industry, Jonathan is
              passionate about leveraging technology to solve real-world
              problems and improve education.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Images</h2>
            <p className="text-zinc-600 mb-4">
              High-resolution images for press use. Please credit &quot;Jonathan
              Bangert&quot; when using these images.
            </p>
            {/* Add your press images here */}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-zinc-600">
              For press inquiries, please contact:{" "}
              <a
                href="mailto:press@jonathanb.dk"
                className="text-blue-600 hover:underline"
              >
                press@jonathanb.dk
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
