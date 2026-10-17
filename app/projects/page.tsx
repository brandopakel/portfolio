import type { Metadata } from "next";
import { socialLinks } from "app/config";
import { archive, projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects by Brando Pakel.",
};

export default function Projects() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

      <ul className="mt-8 list-none p-0">
        {projects.map((project) => (
          <li
            key={project.title}
            className="grid gap-x-6 border-t border-rule py-6 sm:grid-cols-[1fr_auto]"
          >
            <div className="min-w-0">
              <h2 className="text-[16px] font-medium">
                <a
                  href={project.links[project.links.length - 1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-signal"
                >
                  {project.title}
                </a>
              </h2>
              <p className="mt-1.5 max-w-[34rem] text-[15px] leading-[1.6] text-muted">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-mono text-[12.5px] text-faint">
                  {project.stack.join(" / ")}
                </span>
                {project.links.length > 1
                  ? project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-[14px] text-muted"
                      >
                        {link.label}
                      </a>
                    ))
                  : null}
              </div>
            </div>
            <span className="order-first font-mono text-[12.5px] text-faint sm:order-none sm:pt-1">
              {project.year}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-[16px] font-medium">Earlier</h2>
      <ul className="mt-3 list-none space-y-1.5 p-0 text-[15px] text-muted">
        {archive.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[15px] text-muted">
        Everything else is on{" "}
        <a
          href={`${socialLinks.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="link text-ink"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
