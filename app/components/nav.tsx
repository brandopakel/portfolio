import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";

const navItems = [
  { path: "/financialmodels", name: "Models", shortName: "Models" },
  {
    path: "/investmentportfolio",
    name: "Investing",
    shortName: "Invest",
  },
  { path: "/codingprojects", name: "Projects", shortName: "Code" },
  { path: "/workwithme", name: "Work", shortName: "Work" },
  { path: "/resume", name: "Resume", shortName: "Resume" },
];

export function Navbar() {
  return (
    <nav className="relative left-1/2 mb-12 w-screen -translate-x-1/2 px-4 py-5 sm:px-6 lg:mb-16">
      <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-3">
        <div className="flex min-w-fit items-center">
          <Link
            href="/"
            className="whitespace-nowrap text-xl font-semibold leading-tight sm:text-2xl md:text-3xl"
          >
            {metaData.title}
          </Link>
        </div>
        <div className="ml-auto flex min-w-0 flex-nowrap items-center justify-end gap-2 whitespace-nowrap text-[11px] font-medium sm:gap-3 sm:text-xs md:gap-5 md:text-sm lg:text-base">
          {navItems.map(({ path, name, shortName }) => (
            <Link
              key={path}
              href={path}
              className="relative flex shrink-0 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              <span className="hidden sm:inline">{name}</span>
              <span className="sm:hidden">{shortName}</span>
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
