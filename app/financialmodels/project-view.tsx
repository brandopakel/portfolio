import Link from "next/link";
import type {
  AnalysisPoint,
  FinancialModel,
  FinancialSubModel,
  ProjectMetric,
} from "app/lib/models";

type ProjectIntroProps = {
  title: string;
  eyebrow: string;
  description: string;
  summary?: string;
  metrics?: ProjectMetric[];
};

type ProjectAnalysisProps = {
  summary?: string;
  analysis?: AnalysisPoint[];
};

export function ProjectIntro({
  title,
  eyebrow,
  description,
  summary,
  metrics,
}: ProjectIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-neutral-50">
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        {summary ?? description}
      </p>
      {metrics && metrics.length > 0 ? <MetricGrid metrics={metrics} /> : null}
    </header>
  );
}

export function MetricGrid({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={`${metric.label}-${metric.value}`}
          className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950"
        >
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            {metric.label}
          </p>
          <p className="mt-2 text-xl font-semibold text-neutral-950 dark:text-neutral-50">
            {metric.value}
          </p>
          {metric.helper ? (
            <p className="mt-1 text-xs leading-5 text-neutral-600 dark:text-neutral-400">
              {metric.helper}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function WorkbookFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative left-1/2 my-8 w-screen -translate-x-1/2 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <iframe
          src={src}
          title={`${title} Excel preview`}
          width="100%"
          height="560"
          frameBorder="0"
          allowFullScreen
          className="block w-full"
        />
      </div>
    </div>
  );
}

export function DownloadLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900"
    >
      Download Excel File
    </a>
  );
}

export function ProjectAnalysis({ summary, analysis }: ProjectAnalysisProps) {
  if (!summary && (!analysis || analysis.length === 0)) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div className="max-w-3xl">
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-neutral-50">
          Written Analysis
        </h2>
        {summary ? (
          <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {summary}
          </p>
        ) : null}
        {analysis && analysis.length > 0 ? (
          <ol className="mt-6 space-y-6">
            {analysis.map((point, index) => (
              <li
                key={point.title}
                className="grid gap-4 border-t border-neutral-100 pt-6 first:border-t-0 first:pt-0 dark:border-neutral-900 sm:grid-cols-[2.5rem_1fr]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-950 text-sm font-semibold text-white dark:bg-neutral-100 dark:text-neutral-950">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-neutral-950 dark:text-neutral-50">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

export function VariantList({ model }: { model: FinancialModel }) {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
        Model Variants
      </h2>
      <div className="mt-4 grid gap-3">
        {model.subModels?.map((subModel) => (
          <VariantItem
            key={subModel.slug}
            modelSlug={model.slug}
            subModel={subModel}
          />
        ))}
      </div>
    </section>
  );
}

function VariantItem({
  modelSlug,
  subModel,
}: {
  modelSlug: string;
  subModel: FinancialSubModel;
}) {
  return (
    <Link
      href={`/financialmodels/${modelSlug}/${subModel.slug}`}
      className="block rounded-md border border-neutral-200 px-4 py-4 transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-600 dark:hover:bg-neutral-950"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-medium text-neutral-950 dark:text-neutral-50">
            {subModel.title}
          </h3>
          {subModel.summary ? (
            <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {subModel.summary}
            </p>
          ) : null}
        </div>
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Open
        </span>
      </div>
    </Link>
  );
}
