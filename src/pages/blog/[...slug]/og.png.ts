import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";
import { getCollection } from "astro:content";
import type { InferGetStaticParamsType } from "astro";

import OpenGraphImage from "../../../components/ogImage";
import type { h } from "preact";

const posts = await getCollection("blog");
type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export async function GET({ params }: { params: Params }) {
  const post = posts.find((post) => post.id === params.id); // Find the specific post by ID
  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const element = OpenGraphImage(post);
  const png = await PNG(element);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function getStaticPaths() {
  return posts.map((post) => ({
    params: { id: post.id },
    props: post,
  }));
}

export async function SVG(component: h.JSX.Element) {
  return await satori(component as any, {
    width: 1200,
    height: 630,
    fonts: [],
  });
}

export async function PNG(component: h.JSX.Element) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}