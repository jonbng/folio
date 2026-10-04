import type { MetadataRoute } from "next";
import { getSiteDescription, site } from "@/lib/site";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: site.name,
    short_name: site.name,
    description: await getSiteDescription(),
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        purpose: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "128x128",
        type: "image/x-icon",
      },
    ],
    categories: ["portfolio", "technology"],
    lang: "en-DK",
  };
}
