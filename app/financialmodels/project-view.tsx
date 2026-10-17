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
    <header>
      <p className="font-mono text-[12.5px] text-faint">{eyebrow}</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-[34rem] text-[15px] leading-[1.6] text-muted">
        {summary ?? description}
      </p>
      {metrics && metrics.length > 0 ? <MetricGrid metrics={metrics} /> : null}
    </header>
  );
}

export function MetricGrid({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <dl className="mt-8 grid gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`}>
          <dt className="text-[13px] text-muted">{metric.label}</dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight">
            {metric.value}
          </dd>
          {metric.helper ? (
            <dd className="mt-1 text-[13px] leading-5 text-faint">
              {metric.helper}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

export function WorkbookFrame({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative left-1/2 mt-10 w-[min(100vw-2.5rem,72rem)] -translate-x-1/2 overflow-hidden rounded-[3px] border border-rule bg-white">
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
  );
}

export function DownloadLink({ href }: { href: string }) {
  return (
    <p className="mt-4">
      <a href={href} download className="link text-[15px] text-muted">
        Download Excel file
      </a>
    </p>
  );
}

export function ProjectAnalysis({ summary, analysis }: ProjectAnalysisProps) {
  if (!analysis || analysis.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <h2 className="text-[16px] font-medium">Analysis</h2>
      <ul className="mt-2 list-none p-0">
        {analysis.map((point) => (
          <li key={point.title} className="border-t border-rule py-5 first:border-t-0">
            <h3 className="text-[15px] font-medium">{point.title}</h3>
            <p className="mt-1.5 max-w-[34rem] text-[15px] leading-[1.6] text-muted">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function VariantList({ model }: { model: FinancialModel }) {
  return (
    <section className="mt-12">
      <h2 className="text-[16px] font-medium">Models</h2>
      <ul className="mt-3 list-none p-0">
        {model.subModels?.map((subModel) => (
          <VariantItem
            key={subModel.slug}
            modelSlug={model.slug}
            subModel={subModel}
          />
        ))}
      </ul>
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
    <li className="border-t border-rule">
      <Link
        href={`/financialmodels/${modelSlug}/${subModel.slug}`}
        className="group block py-5"
      >
        <h3 className="text-[15px] font-medium transition-colors group-hover:text-signal">
          {subModel.title}
        </h3>
        {subModel.summary ? (
          <p className="mt-1.5 max-w-[34rem] text-[15px] leading-[1.6] text-muted">
            {subModel.summary}
          </p>
        ) : null}
      </Link>
    </li>
  );
}
