const asciiMark = String.raw`
      +---------------------+
     /|                    /|
    / |   FINANCE + AI    / |
   +---------------------+  |
   |  |                  |  |
   |  |   MODELS         |  |
   |  |   TOOLS          |  |
   |  |   PRODUCTS       |  |
   |  +------------------|--+
   | /                   | /
   |/                    |/
   +---------------------+
`;

export default function Page() {
  return (
    <section className="pb-10">
      <pre className="overflow-x-auto rounded-md border border-neutral-200 bg-neutral-50 px-4 py-4 text-[11px] leading-4 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 sm:text-xs">
        {asciiMark}
      </pre>

      <p className="mt-6 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        I build financial models, AI tools, and full-stack products at the
        intersection of finance, data, logic, and design.
      </p>
    </section>
  );
}
