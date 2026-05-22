export interface Project {
  title: string;
  year: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  links: {
    label: string;
    href: string;
  }[];
}

export const projects: Project[] = [
  {
    title: "Omnivest",
    year: "2026",
    description:
      "A multi-asset quant trading platform, fully self-built with AI tools, combining forecasting, risk analytics, allocation context, and strategy research in one product-facing dashboard.",
    image: "/projects/omnivest.png",
    imageAlt: "Omnivest portfolio intelligence landing page",
    tags: ["Multi-asset quant", "Forecasting", "Risk", "Strategy engines"],
    links: [
      {
        label: "Visit Omnivest",
        href: "https://omnivest.io/",
      },
    ],
  },
  {
    title: "K-Means Visualizer",
    year: "2025",
    description:
      "Interactive clustering tool that lets users place points, tune cluster count, and watch k-means converge step by step.",
    tags: ["TypeScript", "Visualization", "Algorithms"],
    links: [
      {
        label: "Live demo",
        href: "https://k-means-visualization.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/brandopakel/k-means-visualization",
      },
    ],
  },
  {
    title: "Crypto Trading Engine",
    year: "2025",
    description:
      "Python trading research engine for Coinbase market data, recommendation logic, and strategy analysis workflows.",
    tags: ["Python", "Coinbase API", "Trading systems"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/brandopakel/crypto-trading-engine",
      },
    ],
  },
  {
    title: "Python for Finance",
    year: "2025",
    description:
      "Finance-oriented Python exercises and utilities focused on market data analysis, modeling workflows, and data handling fundamentals.",
    tags: ["Python", "Finance", "Data analysis"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/brandopakel/python_for_finance",
      },
    ],
  },
];
