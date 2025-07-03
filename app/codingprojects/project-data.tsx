export interface Project {
  title: string;
  year: string;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Crypto Trading Engine",
    year: "2025",
    description: "A trading recommender and analyzer written in Python with Coinbase API",
    url: "https://github.com/brandopakel/crypto-trading-engine",
  },
  {
    title: "Crypto Dashboard",
    year: "2025",
    description: "A full user dashboard. You can access a full suite of coin data, as well as defi data and other user wallet data. You can manage your own coin holdings as well as interact with the trading view to incorporate technical strategies into your analysis. You can utilize the ML/AI platform built within to test user selected strategies, as well as let the dashboard trade for you.",
    url: "https://github.com/brandopakel/crypto-dash",
  },
];
