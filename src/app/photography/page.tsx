import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Gallery } from "@/components/gallery";
import { getSampleImages } from "@/lib/get-images";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photography | Jonathan Bangert",
  description: "My photography portfolio.",
};

export default async function Home() {
  const images = await getSampleImages();

  return (
    <main className="min-h-screen text-black bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <h1 className="text-4xl font-bold mb-2">
                <span className="block text-3xl tracking-tight">
                  Jonathan Bangert
                </span>
                <span className="text-xl tracking-wide">Gallery</span>
              </h1>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                These are some of my pictures, they&apos;re free to use for
                whatever you want under the MIT license!
              </p>
            </div>
            <Button
              variant="link"
              asChild
              className="p-0 h-auto font-semibold hover:no-underline group mb-4"
            >
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="ml-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="animate-underline" color="black">
                  Back to Folio
                </span>
              </Link>
            </Button>
          </div>
          <div className="md:col-span-3">
            <Gallery images={images} />
          </div>
        </div>
      </div>
    </main>
  );
}
