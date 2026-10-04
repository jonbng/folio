import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const title = `${project.title} — ${project.role} | Jonathan Bangert`;
  const canonical = `/work/${project.slug}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: project.summary,
      url: canonical,
      type: "article",
      images: [
        {
          url: "/og.webp",
          width: 1200,
          height: 630,
          alt: "Jonathan Bangert — Software Engineer & Builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: ["/og.webp"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const canonical = `${site.url}/work/${project.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": project.schemaType,
    name: project.title,
    description: project.description,
    url: canonical,
    image: `${site.url}${project.image}`,
    creator: {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
    },
    ...(project.schemaType === "SoftwareApplication"
      ? {
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
        }
      : {}),
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <article className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to selected work
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[var(--muted-foreground)]">
            <span>{project.role}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.year}</span>
          </div>
          <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-[var(--muted-foreground)]">
            {project.summary}
          </p>
        </header>

        <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <Image
            src={project.image}
            alt={`${project.title} project`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain p-4"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-display text-3xl tracking-tight">
            About the project
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--muted-foreground)]">
            {project.description}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl tracking-tight">
            What I worked on
          </h2>
          <ul className="mt-5 space-y-3 text-lg leading-relaxed text-[var(--muted-foreground)]">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span aria-hidden="true" className="text-[var(--foreground)]">
                  —
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl tracking-tight">
            Tools and technologies
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-[var(--muted)] px-3 py-1.5 text-sm font-medium"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-2.5 font-semibold text-[var(--background)] transition-transform active:scale-[0.96]"
          >
            Visit {project.title}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
