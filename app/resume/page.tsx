import type { Metadata } from "next";

const resumeUrl = "/resume/brando-pakel-resume.pdf";

export const metadata: Metadata = {
  title: "Resume",
  description: "Brando Pakel resume",
};

export default function ResumePage() {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Resume</h1>
        <a href={resumeUrl} download className="link text-[15px] text-muted">
          Download PDF
        </a>
      </div>

      <div className="relative left-1/2 mt-8 w-[min(100vw-2.5rem,56rem)] -translate-x-1/2 overflow-hidden rounded-[3px] border border-rule bg-white">
        <object
          data={`${resumeUrl}#toolbar=0&navpanes=0&view=FitH`}
          type="application/pdf"
          className="h-[80vh] min-h-[640px] w-full"
        >
          <p className="p-6 text-[15px] text-muted">
            This browser can&apos;t show the PDF here.{" "}
            <a href={resumeUrl} className="link text-ink">
              Open the resume
            </a>
            .
          </p>
        </object>
      </div>
    </section>
  );
}
