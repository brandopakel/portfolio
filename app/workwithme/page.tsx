import type { Metadata } from "next";
import Link from "next/link";
import { metaData } from "app/config";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Finance, automation, AI workflow, and full-stack software services by Brando Pakel.",
};

const offers = [
  {
    title: "Financial Model Automation",
    body:
      "Clean up Excel-heavy workflows, connect assumptions to outputs, build reusable reporting packages, and turn manual monthly analysis into repeatable systems.",
    examples: "FP&A templates, budget vs. actuals, DCF updates, variance commentary",
  },
  {
    title: "Dashboards and Internal Tools",
    body:
      "Build focused web apps for teams that need to track data, compare scenarios, manage operations, or replace scattered spreadsheets.",
    examples: "KPI dashboards, deal trackers, inventory views, customer or revenue dashboards",
  },
  {
    title: "AI Workflow Prototypes",
    body:
      "Design practical AI-assisted tools that summarize, classify, extract, draft, or reason over business data without turning the process into a black box.",
    examples: "Document analysis, CRM notes, reporting copilots, research assistants",
  },
  {
    title: "Model-to-Product Builds",
    body:
      "Take an existing spreadsheet, analyst workflow, or business logic process and translate it into a cleaner, more usable software experience.",
    examples: "Excel-to-web dashboards, calculators, client portals, workflow apps",
  },
];

const process = [
  {
    step: "1",
    title: "Diagnose",
    body:
      "Map the current workflow, define what success looks like, and identify what can be automated without losing control of the business logic.",
  },
  {
    step: "2",
    title: "Prototype",
    body:
      "Ship a working first version quickly: clean data model, useful interface, core calculations, and enough polish to test with real users.",
  },
  {
    step: "3",
    title: "Harden",
    body:
      "Refine edge cases, improve reliability, document assumptions, and make the tool understandable enough for someone else to operate.",
  },
];

const proofLinks = [
  {
    label: "Financial Models",
    href: "/financialmodels",
    body:
      "Valuation, operating models, comparable company analysis, real estate cash flow, and AI infrastructure scenario work.",
  },
  {
    label: "Omnivest",
    href: "/codingprojects",
    body:
      "A self-built multi-asset quant platform with forecasting, allocation, risk, and strategy research workflows.",
  },
  {
    label: "Investment Dashboard",
    href: "/investmentportfolio",
    body:
      "A live market-data dashboard that tracks holdings, quote changes, leaders, and exposure categories.",
  },
];

export default function WorkWithMePage() {
  return (
    <section className="pb-12">
      <header className="max-w-3xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          Work With Me
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-neutral-50">
          Practical finance, automation, AI, and software help for teams that
          need useful tools fast.
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          I help turn manual workflows, spreadsheet logic, and business data
          into models, dashboards, and web tools that are easier to trust and
          easier to use.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${metaData.email}?subject=Project%20Inquiry`}
            className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85 dark:bg-neutral-50 dark:text-neutral-950"
          >
            Start a Project
          </a>
          <Link
            href="/financialmodels"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-900"
          >
            See Proof
          </Link>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
          Offers
        </h2>
        <div className="mt-4 grid gap-3">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="rounded-md border border-neutral-200 px-4 py-4 dark:border-neutral-800"
            >
              <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
                {offer.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                {offer.body}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
                {offer.examples}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
          How I Work
        </h2>
        <div className="mt-5 grid gap-5">
          {process.map((item) => (
            <div
              key={item.step}
              className="grid gap-4 sm:grid-cols-[2.5rem_1fr]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-950 text-sm font-semibold text-white dark:bg-neutral-100 dark:text-neutral-950">
                {item.step}
              </span>
              <div>
                <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
          Relevant Work
        </h2>
        <div className="mt-4 grid gap-3">
          {proofLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md border border-neutral-200 px-4 py-4 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-950"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
                    {link.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {link.body}
                  </p>
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Open
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
