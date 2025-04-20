import type { ImageType } from "@/lib/types";

export async function getSampleImages(): Promise<ImageType[]> {
  // Simulate fetching images at build time
  const imageCount = 25; // Increased to simulate hundreds of images
  const images: ImageType[] = [];

  // for (let i = 1; i <= imageCount; i++) {
  //   const id = i % 1000; // To ensure we don't exceed Picsum's image count
  //   const mainUrl = `https://picsum.photos/id/${id}/720/480`;
  //   const modalUrl = `https://picsum.photos/id/${id}/1280/853`;
  //   const fullResUrl = `https://picsum.photos/id/${id}/2560/1706`;

  //   images.push({
  //     id: `image-${i}`,
  //     mainUrl,
  //     modalUrl,
  //     fullResUrl,
  //     thumbnailUrl: `https://picsum.photos/id/${id}/180/120`,
  //     alt: `Sample gallery image ${i}`,
  //     width: 720,
  //     height: 480,
  //     // Placeholder for blur data URL (to be implemented)
  //     blurDataUrl:
  //       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg==",
  //   });
  // }

  for (let i = 1; i <= imageCount; i++) {
    images.push({
      id: "image-" + i,
      mainUrl: "/pfp.jpg",
      modalUrl: "/pfp.jpg",
      fullResUrl: "/pfp.jpg",
      thumbnailUrl: "/pfp.jpg",
      alt: "wow",
      width: 720,
      height: 480,
      blurDataUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg==",
    });
  }

  return images;
}
