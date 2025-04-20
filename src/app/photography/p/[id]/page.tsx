import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSampleImages } from "@/lib/get-images";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ShareButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const images = await getSampleImages();
  const image = images.find((img) => img.id === id);

  if (!image) {
    return {};
  }
  return {
    title: `Image ${image.id} | Jonathan Bangert Gallery`,
    description: image.alt,
    openGraph: {
      images: [{ url: image.fullResUrl, width: 2560, height: 1706 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [image.fullResUrl],
    },
  };
}

export async function generateStaticParams() {
  const images = await getSampleImages();
  return images.map((image) => ({
    id: image.id,
  }));
}

export default async function ImagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const images = await getSampleImages();
  const image = images.find((img) => img.id === id);

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link href="/" className="inline-block mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-gray-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Button>
      </Link>
      <div className="max-w-5xl mx-auto">
        <Image
          src={image.fullResUrl || "/placeholder.svg"}
          alt={image.alt}
          width={2560}
          height={1706}
          className="rounded-lg"
          priority
        />
        <ShareButton imageId={image.id} />
      </div>
    </div>
  );
}
