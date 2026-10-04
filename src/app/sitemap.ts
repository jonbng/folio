import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/press-kit`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...projects.map(({ slug }) => ({
      url: `${site.url}/work/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
