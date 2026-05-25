import type { Metadata } from "next";
import { metaData } from "app/config";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Finance, automation, AI workflow, and full-stack software services by Brando Pakel.",
};

const offers = [
  "Financial models, reporting templates, and Excel cleanup",
  "Dashboards, internal tools, and lightweight web apps",
  "AI-assisted workflows for research, documents, and operations",
  "Spreadsheet logic turned into cleaner software tools",
];

export default function WorkWithMePage() {
  return (
    <section className="mx-auto max-w-2xl pb-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-neutral-50">
          Work With Me
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          I build practical finance, automation, AI, and software tools for
          people who need something useful, clean, and reliable.
        </p>
      </header>

      <section className="mt-9 border-t border-neutral-200 pt-7 dark:border-neutral-800">
        <h2 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
          I Can Help With
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          {offers.map((offer) => (
            <li key={offer}>{offer}</li>
          ))}
        </ul>
      </section>

      <section className="mt-9 border-t border-neutral-200 pt-7 dark:border-neutral-800">
        <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          If you have a workflow, model, or tool idea that needs to become real,
          send me a note.
        </p>
        <a
          href={`mailto:${metaData.email}?subject=Project%20Inquiry`}
          className="mt-5 inline-flex rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 dark:bg-neutral-50 dark:text-neutral-950"
        >
          Email Me
        </a>
      </section>
    </section>
  );
}
