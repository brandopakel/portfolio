import type { Metadata } from "next";

const resumeUrl = "/resume/brando-pakel-resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description: "Brando Pakel resume",
};

export default function ResumePage() {
  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-medium">Resume</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Current PDF resume, embedded directly on the page.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium transition-colors hover:border-neutral-700 dark:border-neutral-700 dark:hover:border-neutral-300"
          >
            Open PDF
          </a>
          <a
            href={resumeUrl}
            download
            className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
          >
            Download
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <object
          data={`${resumeUrl}#view=FitH`}
          type="application/pdf"
          className="h-[78vh] min-h-[640px] w-full"
        >
          <div className="p-6 text-sm text-neutral-700 dark:text-neutral-300">
            The PDF preview is not available in this browser. Open or download
            the resume using the buttons above.
          </div>
        </object>
      </div>
    </section>
  );
}
