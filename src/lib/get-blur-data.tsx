// import { getPlaiceholder } from "plaiceholder";

// imageUrl: string

export async function getBlurDataUrl(): Promise<string> {
  // try {
  //   const res = await fetch(imageUrl);
  //   const buffer = await res.arrayBuffer();

  //   const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  //   return base64;
  // } catch (error) {
    // console.error("Error generating blur data:", error);
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg==";
  // }
}
