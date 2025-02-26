"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const posts = [
  {
    id: 1,
    title: "The Future of AI in Education",
    excerpt:
      "Exploring how artificial intelligence is reshaping the educational landscape and what it means for students and teachers alike.",
    date: "June 15, 2023",
  },
  {
    id: 2,
    title: "Building Scalable Web Applications with Next.js",
    excerpt:
      "A deep dive into the best practices for creating high-performance, scalable web applications using Next.js and React.",
    date: "May 22, 2023",
  },
  {
    id: 3,
    title: "The Importance of Open Source in Modern Software Development",
    excerpt:
      "Discussing the role of open source software in driving innovation and collaboration in the tech industry.",
    date: "April 10, 2023",
  },
];

export default function BlogPreview() {
  return (
    <section className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium text-zinc-500 tracking-widest uppercase">
          Latest Posts
        </h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-zinc-900 flex items-center gap-1 group animate-underline"
        >
          <span>View all posts</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <motion.div
        className="space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {posts.map((post) => (
          <motion.article
            key={post.id}
            className="group"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Link href={`/blog/${post.id}`}>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-zinc-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-zinc-600 mb-4">{post.excerpt}</p>
              <time className="text-sm text-zinc-500">{post.date}</time>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
