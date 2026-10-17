import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { metaData, socialLinks } from "app/config";

const YEAR = new Date().getFullYear();

const links = [
  { href: socialLinks.github, label: "GitHub", icon: FaGithub },
  { href: socialLinks.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
  { href: socialLinks.email, label: "Email", icon: TbMailFilled },
];

export default function Footer() {
  return (
    <footer className="mt-24 flex items-center justify-between border-t border-rule py-8 text-sm text-faint">
      <span>
        © {YEAR} {metaData.title}
      </span>
      <div className="flex items-center gap-4 text-base">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
}
