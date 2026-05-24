import { AsciiOrbit } from "./components/ascii-orbit";

export default function Page() {
  return (
    <section className="flex flex-col items-center pb-10 text-center">
      <AsciiOrbit />

      <p className="mt-6 max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-300">
        I build financial models, AI tools, and full-stack products at the
        intersection of finance, data, logic, and design.
      </p>
    </section>
  );
}
