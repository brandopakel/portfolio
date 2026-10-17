# brandopakel — personal site

Personal site and project index, built with **Next.js (App Router)**, TypeScript,
and Tailwind.

- Project list (`/projects`) driven by a typed data file: `app/projects/project-data.tsx`
- Resume (`/resume`) served from `public/resume/brando-pakel-resume.pdf`
- Dependency-free ASCII renderer on the home page (`app/components/ascii-orbit.tsx`)
- Light/dark theme, OG-image generation

## Develop

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

Deployed on Vercel.
