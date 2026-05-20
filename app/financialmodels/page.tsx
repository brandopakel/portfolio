import Link from "next/link";
import type { Metadata } from "next";
import { models } from "app/lib/models";

export const metadata: Metadata = {
  title: "Financial Models",
  description: "Portfolio Financial Models",
};

export default function Models() {
  return (
    <section className="pb-10">
      <header className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          Finance Portfolio
        </p>
        <h1 className="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-neutral-50">
          Financial Models
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
          Excel-based analysis across real estate cash flow, public-market
          valuation, DCF, LBO, and M&A transaction modeling.
        </p>
      </header>

      <div className="grid gap-4">
        {models.map((model) => (
          <Link
            key={model.slug}
            href={`/financialmodels/${model.slug}`}
            className="block rounded-md border border-neutral-200 px-4 py-4 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-950"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  {model.date}
                </p>
                <h2 className="mt-2 font-medium text-neutral-950 dark:text-neutral-50">
                  {model.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                  {model.summary ?? model.description}
                </p>
              </div>
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Open
              </span>
            </div>

            {model.metrics && model.metrics.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {model.metrics.slice(0, 3).map((metric) => (
                  <span
                    key={`${model.slug}-${metric.label}`}
                    className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    {metric.label}: {metric.value}
                  </span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
