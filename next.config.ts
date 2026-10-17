import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root,
  },
  async redirects() {
    return [
      { source: "/codingprojects", destination: "/projects", permanent: true },
      { source: "/workwithme", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
