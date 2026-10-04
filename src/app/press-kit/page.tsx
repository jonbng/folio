import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { EmailText } from "@/components/email-text";

export const metadata: Metadata = {
  title: "Press Kit | Jonathan Bangert",
  description:
    "Official press kit for Danish software engineer Jonathan Bangert, including his biography, downloadable photos, and contact information.",
  alternates: {
    canonical: "/press-kit",
  },
  openGraph: {
    title: "Press Kit | Jonathan Bangert",
    description:
      "Biography, downloadable photos, and contact information for Jonathan Bangert.",
    url: "/press-kit",
    type: "website",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Jonathan Bangert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit | Jonathan Bangert",
    description:
      "Biography, downloadable photos, and contact information for Jonathan Bangert.",
    images: ["/og.webp"],
  },
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
              He is the Co-Creator of{" "}
              <a href="https://betterlectio.dk" className="underline font-bold">
                BetterLectio
              </a>
              , a browser extension that modernizes the Danish school platform
              Lectio, and works as a Lead Software Engineer at Burst. He&apos;s
              always experimenting with new ideas and shares his thoughts on{" "}
              <a href="https://x.com/jonbng" className="underline font-bold">
                X
              </a>
              , and if you want to chat, you can reach him at{" "}
              <EmailText type="contact" className="underline font-bold" />.
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
                  src="/pfp.jpeg"
                  alt="Jonathan Bangert"
                  width={400}
                  height={400}
                />
                <Button variant="link" asChild>
                  <a
                    href="/pfp.jpeg"
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
              <EmailText
                type="press"
                className="text-blue-600 hover:underline"
              />
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
