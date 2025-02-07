import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import webmanifest from 'astro-webmanifest';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./src/consts";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    mdx(),
    sitemap(),
    webmanifest({
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      display: "browser",
      start_url: "/",
      categories: ["blog", "portfolio"],
      lang: "en",
      orientation: "portrait",
      shortcuts: [
        {
          name: "Blog",
          url: "/blog",
        },
        {
          name: "Portfolio",
          url: "/",
        },
      ],
      icon: "public/favicon.svg",
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});