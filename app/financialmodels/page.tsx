import Link from "next/link";
import type { Metadata } from "next";
import { models } from "app/lib/models";

export const metadata: Metadata = {
  title: "Coding Projects",
  description: "Portfolio Coding Projects",
};

export default function Models() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Financial Models</h1>
      <div>
        {models.map((model) => (
          <Link
            key={model.slug}
            href={`/financialmodels/${model.slug}`}
            className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <h2 className="text-black dark:text-white">{model.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {model.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
