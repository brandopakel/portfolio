import Link from "next/link";
import { getExcelEmbedUrl, models } from "app/lib/models";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  DownloadLink,
  ProjectAnalysis,
  ProjectIntro,
  WorkbookFrame,
} from "../../project-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; childslug: string }>;
}): Promise<Metadata | undefined> {
  const { slug, childslug } = await params;
  const model = models.find((m) => m.slug === slug);
  const subModel = model?.subModels?.find((s) => s.slug === childslug);

  if (!subModel) return;

  return {
    title: subModel.title,
    description: subModel.summary ?? `Part of ${model?.title}`,
  };
}

export async function generateStaticParams() {
  const paths: { slug: string; childslug: string }[] = [];

  models.forEach((model) => {
    model.subModels?.forEach((sub) => {
      paths.push({
        slug: model.slug,
        childslug: sub.slug,
      });
    });
  });

  return paths;
}

export default async function SubModelPage({
  params,
}: {
  params: Promise<{ slug: string; childslug: string }>;
}) {
  const { slug, childslug } = await params;
  const model = models.find((m) => m.slug === slug);
  const subModel = model?.subModels?.find((s) => s.slug === childslug);

  if (!model || !subModel) return notFound();

  const embedUrl = getExcelEmbedUrl(
    subModel.file,
    subModel.embedUrl,
    subModel.embedParams
  );

  return (
    <section className="pb-10">
      <Link
        href={`/financialmodels/${model.slug}`}
        className="mb-6 inline-flex text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-50"
      >
        Back to {model.title}
      </Link>

      <ProjectIntro
        title={subModel.title}
        eyebrow={`Part of ${model.title}`}
        description={`Part of ${model.title}`}
        summary={subModel.summary}
        metrics={subModel.metrics}
      />

      <WorkbookFrame src={embedUrl} title={subModel.title} />
      <DownloadLink href={subModel.file} />
      <ProjectAnalysis summary={subModel.summary} analysis={subModel.analysis} />
    </section>
  );
}
