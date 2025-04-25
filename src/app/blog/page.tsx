import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Blog | Jonathan Bangert",
  description: "My thoughts on software development, education, and technology.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-zinc-100">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <header className="mb-16">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-900 flex items-center gap-1 group mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="animate-underline">Back to home</span>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-zinc-600">
            Thoughts on software development, education, and technology.
          </p>
        </header>

        <section className="space-y-16">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-zinc-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-600 mb-4">{post.excerpt}</p>
                <time className="text-sm text-zinc-500">{post.date}</time>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
