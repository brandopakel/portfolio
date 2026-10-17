"use client";

import { useEffect, useMemo, useState } from "react";
import { portfolioHoldings, portfolioImportedAt } from "./portfolio-data";

type Quote = {
  symbol: string;
  name: string;
  assetClass: "Equity" | "ETF" | "Crypto";
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketState?: string;
  currency?: string;
  regularMarketTime?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  forwardYield?: number;
  beta?: number;
  source: "live" | "fallback" | "partial";
};

type QuoteResponse = {
  asOf: string;
  source: "live" | "fallback";
  quotes: Quote[];
};

const initialQuotes: Quote[] = portfolioHoldings.map((holding) => ({
  symbol: holding.symbol,
  name: holding.symbol,
  assetClass: holding.assetClass,
  price: holding.seedPrice,
  previousClose: holding.seedPreviousClose,
  change: holding.seedChange,
  changePercent: holding.seedChangePercent,
  forwardYield: holding.forwardYield,
  beta: holding.beta,
  currency: "USD",
  source: "fallback",
}));

function formatCurrency(value?: number) {
  if (value === undefined || Number.isNaN(value)) return "-";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

function formatPercent(value?: number) {
  if (value === undefined || Number.isNaN(value)) return "-";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function formatNumber(value?: number) {
  if (value === undefined || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function PortfolioDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [asOf, setAsOf] = useState<string | null>(null);
  const [source, setSource] = useState<"live" | "fallback">("fallback");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadQuotes() {
      try {
        const response = await fetch("/api/investment-portfolio/quotes", {
          cache: "no-store",
        });
        const data = (await response.json()) as QuoteResponse;
        if (!isMounted) return;
        setQuotes(data.quotes);
        setAsOf(data.asOf);
        setSource(data.source);
      } catch {
        if (!isMounted) return;
        setQuotes(initialQuotes);
        setSource("fallback");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadQuotes();
    const interval = window.setInterval(loadQuotes, 60_000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const stats = useMemo(() => {
    const validQuotes = quotes.filter((quote) => Number.isFinite(quote.changePercent));
    const dailyReturn = average(validQuotes.map((quote) => quote.changePercent));
    const positive = validQuotes.filter((quote) => quote.changePercent > 0).length;
    const negative = validQuotes.filter((quote) => quote.changePercent < 0).length;
    const betas = validQuotes
      .map((quote) => quote.beta)
      .filter((beta): beta is number => typeof beta === "number");
    const yielders = validQuotes.filter(
      (quote) => typeof quote.forwardYield === "number" && quote.forwardYield > 0
    );
    const best = [...validQuotes].sort(
      (a, b) => b.changePercent - a.changePercent
    )[0];
    const worst = [...validQuotes].sort(
      (a, b) => a.changePercent - b.changePercent
    )[0];
    const assetCounts = validQuotes.reduce<Record<string, number>>((acc, quote) => {
      acc[quote.assetClass] = (acc[quote.assetClass] ?? 0) + 1;
      return acc;
    }, {});

    return {
      dailyReturn,
      positive,
      negative,
      averageBeta: average(betas),
      dividendYield: average(yielders.map((quote) => quote.forwardYield ?? 0)),
      best,
      worst,
      assetCounts,
    };
  }, [quotes]);

  const asOfLabel = asOf
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(asOf))
    : `Imported ${portfolioImportedAt}`;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Investment Portfolio
        </h1>
        <p className="font-mono text-[12.5px] text-faint">
          {isLoading
            ? "Refreshing"
            : `${source === "live" ? "Live" : "Snapshot"} / ${asOfLabel}`}
        </p>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-4">
        <Metric
          label="Day return"
          value={formatPercent(stats.dailyReturn)}
          helper="Equal-weight"
          tone={stats.dailyReturn >= 0 ? "positive" : "negative"}
        />
        <Metric
          label="Holdings"
          value={String(quotes.length)}
          helper={`${stats.positive} up / ${stats.negative} down`}
        />
        <Metric
          label="Avg beta"
          value={stats.averageBeta ? stats.averageBeta.toFixed(2) : "-"}
          helper="Equities and ETFs"
        />
        <Metric
          label="Avg yield"
          value={stats.dividendYield ? `${stats.dividendYield.toFixed(2)}%` : "-"}
          helper="Dividend payers"
        />
      </dl>

      <div className="relative left-1/2 mt-10 w-[min(100vw-2.5rem,56rem)] -translate-x-1/2 overflow-x-auto">
        <table className="w-full border-collapse text-[14px] sm:min-w-[640px]">
          <thead>
            <tr className="border-b border-rule text-left text-[13px] text-muted">
              <th className="py-2.5 pr-4 font-normal">Symbol</th>
              <th className="hidden py-2.5 pr-4 font-normal sm:table-cell">Name</th>
              <th className="py-2.5 pr-4 font-normal">Class</th>
              <th className="py-2.5 pr-4 text-right font-normal">Price</th>
              <th className="py-2.5 text-right font-normal sm:pr-4">Day</th>
              <th className="hidden py-2.5 text-right font-normal sm:table-cell">Volume</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <HoldingRow key={quote.symbol} quote={quote} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <section>
          <h2 className="text-[16px] font-medium">Leaders</h2>
          <div className="mt-2">
            <MoverRow label="Best" quote={stats.best} />
            <MoverRow label="Weakest" quote={stats.worst} />
          </div>
        </section>
        <section>
          <h2 className="text-[16px] font-medium">Exposure</h2>
          <div className="mt-2">
            {Object.entries(stats.assetCounts).map(([assetClass, count]) => (
              <div
                key={assetClass}
                className="flex items-center justify-between border-t border-rule py-2.5 text-[14px] first:border-t-0"
              >
                <span className="text-muted">{assetClass}</span>
                <span className="font-mono">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const toneClass = {
  positive: "text-emerald-700 dark:text-emerald-400",
  negative: "text-red-700 dark:text-red-400",
};

function Metric({
  label,
  value,
  helper,
  tone,
}: {
  label: string;
  value: string;
  helper: string;
  tone?: "positive" | "negative";
}) {
  return (
    <div>
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className={`mt-1 text-xl font-semibold tracking-tight ${tone ? toneClass[tone] : ""}`}>
        {value}
      </dd>
      <dd className="mt-1 text-[13px] text-faint">{helper}</dd>
    </div>
  );
}

function HoldingRow({ quote }: { quote: Quote }) {
  const tone = quote.changePercent >= 0 ? toneClass.positive : toneClass.negative;

  return (
    <tr className="border-b border-rule last:border-b-0">
      <td className="py-2.5 pr-4 font-mono font-medium">{quote.symbol}</td>
      <td className="hidden max-w-[16rem] truncate py-2.5 pr-4 text-muted sm:table-cell">{quote.name}</td>
      <td className="py-2.5 pr-4 text-muted">{quote.assetClass}</td>
      <td className="py-2.5 pr-4 text-right font-mono">{formatCurrency(quote.price)}</td>
      <td className={`py-2.5 text-right font-mono sm:pr-4 ${tone}`}>
        {formatPercent(quote.changePercent)}
      </td>
      <td className="hidden py-2.5 text-right font-mono text-muted sm:table-cell">
        {formatNumber(quote.volume)}
      </td>
    </tr>
  );
}

function MoverRow({ label, quote }: { label: string; quote?: Quote }) {
  if (!quote) return null;
  const tone = quote.changePercent >= 0 ? toneClass.positive : toneClass.negative;

  return (
    <div className="flex items-center justify-between border-t border-rule py-2.5 text-[14px] first:border-t-0">
      <span className="text-muted">
        {label} <span className="ml-2 font-mono text-ink">{quote.symbol}</span>
      </span>
      <span className={`font-mono ${tone}`}>{formatPercent(quote.changePercent)}</span>
    </div>
  );
}
