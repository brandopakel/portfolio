import Link from "next/link";
import type { Metadata } from "next";
import { models } from "app/lib/models";

export const metadata: Metadata = {
  title: "Financial Models",
  description: "Excel financial models: DCF, LBO, M&A, comps, and cash flow.",
};

export default function Models() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Financial Models</h1>

      <ul className="mt-8 list-none p-0">
        {models.map((model) => (
          <li key={model.slug} className="border-t border-rule">
            <Link
              href={`/financialmodels/${model.slug}`}
              className="group grid gap-x-6 py-6 sm:grid-cols-[1fr_auto]"
            >
              <div className="min-w-0">
                <h2 className="text-[16px] font-medium transition-colors group-hover:text-signal">
                  {model.title}
                </h2>
                <p className="mt-1.5 max-w-[34rem] text-[15px] leading-[1.6] text-muted">
                  {model.description}
                </p>
                {model.metrics && model.metrics.length > 0 ? (
                  <p className="mt-3 font-mono text-[12.5px] text-faint">
                    {model.metrics
                      .slice(0, 3)
                      .map((metric) => `${metric.label} ${metric.value}`)
                      .join(" / ")}
                  </p>
                ) : null}
              </div>
              <span className="order-first font-mono text-[12.5px] text-faint sm:order-none sm:pt-1">
                {model.date}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
