import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Coding Projects",
  description: "Portfolio Coding Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Coding Projects</h1>
      <div className="space-y-5">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700"
          >
            <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-start">
              {project.image ? (
                <a
                  href={project.links[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex h-7 items-center gap-1.5 border-b border-neutral-200 px-3 dark:border-neutral-800">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.title}
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-cover object-top"
                      priority={project.title === "Omnivest"}
                    />
                  </div>
                </a>
              ) : null}

              <div className="min-w-0">
                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-base font-medium text-black dark:text-white">
                    {project.title}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {project.year}
                  </p>
                </div>

                <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-black underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-700 dark:text-white dark:decoration-neutral-700 dark:hover:decoration-neutral-300"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
