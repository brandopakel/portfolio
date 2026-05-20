import { getExcelEmbedUrl, models } from "app/lib/models";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  DownloadLink,
  ProjectAnalysis,
  ProjectIntro,
  VariantList,
  WorkbookFrame,
} from "../project-view";

export async function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return;

  return {
    title: model.title,
    description: model.summary ?? model.description,
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return notFound();

  const hasSubModels = Array.isArray(model.subModels) && model.subModels.length > 0;
  const embedUrl = getExcelEmbedUrl(model.file, model.embedUrl, model.embedParams);

  return (
    <section className="pb-10">
      <ProjectIntro
        title={model.title}
        eyebrow={`Created ${model.date}`}
        description={model.description}
        summary={model.summary}
        metrics={model.metrics}
      />

      {hasSubModels ? (
        <VariantList model={model} />
      ) : (
        <>
          <WorkbookFrame src={embedUrl} title={model.title} />
          <DownloadLink href={model.file} />
        </>
      )}

      <ProjectAnalysis summary={model.summary} analysis={model.analysis} />
    </section>
  );
}
