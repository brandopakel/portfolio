import { RandomAscii } from "./components/random-ascii";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <RandomAscii />

      <p className="mt-10 max-w-[34rem] text-[17px] leading-[1.6] text-ink">
        Software engineer building systems software and infrastructure. M.S.
        Computer Science at USC.
      </p>

      <div className="mt-6 flex gap-5 text-[15px] text-muted">
        <a className="link" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="link" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="link" href={socialLinks.email}>
          Email
        </a>
      </div>
    </section>
  );
}
