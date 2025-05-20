import {models} from 'app/lib/models';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';


/*export interface Model {
  title: string;
  year: number;
  description: string;
  url: string;
}*/

/*export const models = [
  {
    slug: 'nvda-dcf',
    title: "Nvidia Analysis",
    year: 2024,
    description: "Comparables, Prescedent Transactions, DCF, LBO, M&A",
    file: "/public/models/",
  },
  {
    slug: 'crwd-dcf',
    title: "CrowdStrike Analysis",
    year: 2025,
    description: "DCF",
    file: "/public/models/",
  },
];*/

/*export function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
};

type PageProps = {
  params: {
    slug: string;
  };
};

/*type PageProps = {
  params: {
    slug: string;
  };
};*/


/*type Props = {
  params: {slug : string;};
};*/


/*export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const slug = await params.slug;

  const model = models.find((m) => m.slug === slug);
  //const { params } = await props;
  //const { params } = await propsPromise;
  //const model = models.find((m) => m.slug === params.slug);

  if(!model) return notFound();

  //const fileURL = `${process.env.NEXT_PUBLIC_SITE_URL}${model.file}`;

  return(
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-2">{model.title}</h1>
      <p className="text-gray-600 mb-6">{model.description}</p>

      <div className="aspect-video mb-6">
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(model.embedUrl)}`}
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <a
        href={model.file}
        download
        className="text-blue-600 underline hover:text-blue-800"
      >
        Download Excel File
      </a>
    </section>
  );
}*/

// ✅ Step 1: generate static slugs
export async function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
}

// ✅ Step 2: dynamic metadata (SEO-friendly)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return;

  return {
    title: model.title,
    description: model.description,
  };
}

// ✅ Step 3: the actual model page
export default async function ModelPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return notFound();

  const hasSubModels = Array.isArray(model.subModels) && model.subModels.length > 0;

  return (
    <section className="w-full pt-2 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{model.title}</h1>
          <p className="text-sm italic text-gray-500 mb-4">
            Created on {model.date}
          </p>
          <p className="text-gray-600 mb-6">{model.description}</p>
        </div>

      {hasSubModels ? (
        <div className="max-w-3xl mx-auto mt-6 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Model Variants:</h2>
            <ul className="space-y-2">
              {Array.isArray(model.subModels) &&
                model.subModels.map((sub) => (
                  <li key={sub.slug}>
                    <a
                      href={`/financialmodels/${model.slug}/${sub.slug}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {sub.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ) :  (
        <>
        <div className="w-full overflow-x-auto mt-6 mb-6">
          <div className="w-[900px] mx-auto">
            <iframe
              src={model.embedUrl}
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
            href={model.file}
            download
            className="text-blue-600 underline hover:text-blue-800"
          >
            Download Excel File
          </a>
        </div>
        </>
      )}
    </section>
  );
}