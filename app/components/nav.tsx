import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";

const navItems = [
  { path: "/projects", name: "Projects" },
  { path: "/financialmodels", name: "Models" },
  { path: "/investmentportfolio", name: "Investing" },
  { path: "/resume", name: "Resume" },
];

export function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-8 sm:py-10">
      <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
        {metaData.title}
      </Link>
      <div className="flex items-center gap-4 text-[15px] text-muted sm:gap-5">
        {navItems.map(({ path, name }) => (
          <Link key={path} href={path} className="transition-colors hover:text-ink">
            {name}
          </Link>
        ))}
        <ThemeSwitch />
      </div>
    </nav>
  );
}
