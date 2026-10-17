import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-[15px] text-muted">
        This page doesn&apos;t exist. Try{" "}
        <Link href="/projects" className="link text-ink">
          projects
        </Link>{" "}
        or the{" "}
        <Link href="/" className="link text-ink">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
