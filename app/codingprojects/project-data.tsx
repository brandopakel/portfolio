export interface Project {
  title: string;
  year: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "K-Means Visualizer",
    year: "2025",
    description: "K-Means Visualizer",
    url: "https://k-means-visualization.vercel.app/"
  },
  {
    title: "Crypto Dashboard",
    year: "2025",
    description: "A full suite user dashboard",
    url: "https://github.com/brandopakel/crypto-dash",
  },
  {
    title: "Crypto Trading Engine",
    year: "2025",
    description: "A trading recommender and analyzer - Coinbase API",
    url: "https://github.com/brandopakel/crypto-trading-engine",
  },
];
