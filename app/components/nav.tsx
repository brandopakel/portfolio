import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";

const navItems = [
  { path: "/projects", name: "Projects" },
  { path: "/resume", name: "Resume" },
];

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8 sm:py-10">
      <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink">
        {metaData.title}
      </Link>
      <div className="flex items-center gap-5 text-[15px] text-muted">
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
