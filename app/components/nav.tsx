import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";

const navItems = {
  "/financialmodels": { name: "Financial Models" },
  "/investmentportfolio": { name: "Investment Portfolio" },
  "/codingprojects": { name: "Coding Projects" },
  "/resume": { name: "Resume" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-3xl font-semibold">
            {metaData.title}
          </Link>
        </div>
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mt-6 md:mt-0 md:ml-auto items-center justify-start md:justify-end text-sm sm:text-base">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
