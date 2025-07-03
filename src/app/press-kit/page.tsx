import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Kit | Jonathan Bangert",
  description: "Press kit for Jonathan Bangert.",
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

        <h1 className="text-4xl font-bold mb-8">Press Kit</h1>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bio</h2>
            <p className="text-zinc-600 text-lg pt-4">
              Jonathan Bangert has been building things for as long as he can
              remember, starting with small coding projects, breaking things
              apart just to understand how they work, and obsessing over every
              detail until it feels right.{" "}
              {/*Right now, he&apos;s working at{" "}
              <a href="https://flimmer.app" className="underline font-bold">
                Flimmer
              </a>{" "}
              as a software engineer and */}{" "}
              He is the Co-Founder of{" "}
              <a href="https://akademia.dev" className="underline font-bold">
                Akademia
              </a>
              , a reimagined platform for schools, but he&apos;s always
              experimenting with new ideas. He shares his thoughts on{" "}
              <a href="https://x.com/jonba_" className="underline font-bold">
                X
              </a>
              , and if you want to chat, you can reach him at{" "}
              <a
                href="mailto:contact@jonathanb.dk"
                className="underline font-bold"
              >
                contact@jonathanb.dk
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Images</h2>
            <p className="text-zinc-600 mb-4">
              High-resolution images for press use. Please credit &quot;Jonathan
              Bangert&quot; when using these images.
            </p>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <Image
                  src="/pfp.jpg"
                  alt="Jonathan Bangert"
                  width={400}
                  height={400}
                />
                <Button variant="link" asChild>
                  <a
                    href="/pfp.jpg"
                    download
                    className="text-blue-600 hover:underline"
                  >
                    Download Profile Picture
                  </a>
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/team.jpg"
                  alt="Jonathan Bangert & Elliott Friedrich"
                  width={400}
                  height={400}
                />
                <Button variant="link" asChild>
                  <a
                    href="/team.jpg"
                    download
                    className="text-blue-600 hover:underline"
                  >
                    Download Team Picture
                  </a>
                </Button>
              </div>
            </div>
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
