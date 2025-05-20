import { models } from 'app/lib/models';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string; childslug: string };
}): Promise<Metadata | undefined> {
  const model = models.find((m) => m.slug === params.slug);
  const subModel = model?.subModels?.find((s) => s.slug === params.childslug);

  if (!subModel) return;

  return {
    title: subModel.title,
    description: `Part of ${model?.title}`,
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

export default function SubModelPage({
  params,
}: {
  params: { slug: string; childslug: string };
}) {
  const { slug, childslug } = params;
  const model = models.find((m) => m.slug === slug);
  const subModel = model?.subModels?.find((s) => s.slug === childslug);

  if (!model || !subModel) return notFound();

  return (
    <section className="w-full pt-2 pb-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{subModel.title}</h1>
        <p className="text-sm italic text-gray-500 mb-4">
          Part of {model.title}
        </p>
      </div>

      <div className="w-full flex justify-center mt-6 mb-6 px-4">
        <div className="w-full max-w-6xl">
          <iframe
            src={subModel.embedUrl}
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
            className="w-full rounded-lg shadow"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <a
          href={subModel.file}
          download
          className="text-blue-600 underline hover:text-blue-800"
        >
          Download Excel File
        </a>
      </div>
    </section>
  );
}