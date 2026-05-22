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
            Current resume preview.
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

      <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <object
          data={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=100`}
          type="application/pdf"
          className="h-[86vh] min-h-[720px] w-full"
        >
          <div className="p-6 text-sm text-neutral-700 dark:text-neutral-300">
            The PDF preview is not available in this browser. Open or download
            the resume using the buttons above.
          </div>
        </object>
        </div>
      </div>
    </section>
  );
}
