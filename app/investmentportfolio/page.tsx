import type { Metadata } from "next";
import { PortfolioDashboard } from "./portfolio-dashboard";

export const metadata: Metadata = {
  title: "Investment Portfolio",
  description: "Live investment portfolio holdings dashboard",
};

export default function InvestmentPortfolioPage() {
  return (
    <section className="pb-10">
      <PortfolioDashboard />
    </section>
  );
}
