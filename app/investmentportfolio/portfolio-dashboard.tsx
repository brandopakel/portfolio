"use client";

import type { ReactNode } from "react";
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
    <div className="relative left-1/2 w-screen -translate-x-1/2 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            Live Portfolio
          </p>
          <h1 className="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-neutral-50">
            Investment Portfolio
          </h1>
        </header>

        <section className="mt-8 grid gap-3 md:grid-cols-4">
          <MetricCard
            label="Aggregate Return"
            value={formatPercent(stats.dailyReturn)}
            helper="Equal-weight daily move"
            tone={stats.dailyReturn >= 0 ? "positive" : "negative"}
          />
          <MetricCard
            label="Holdings Tracked"
            value={String(quotes.length)}
            helper={`${stats.positive} up / ${stats.negative} down`}
          />
          <MetricCard
            label="Avg Beta"
            value={stats.averageBeta ? stats.averageBeta.toFixed(2) : "-"}
            helper="Available equity and ETF beta"
          />
          <MetricCard
            label="Avg Fwd Yield"
            value={stats.dividendYield ? formatPercent(stats.dividendYield) : "-"}
            helper="Dividend names only"
          />
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex flex-col gap-2 border-b border-neutral-200 px-4 py-4 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-medium text-neutral-950 dark:text-neutral-50">
                  Holdings
                </h2>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {source === "live" ? "Live quote feed" : "Imported quote snapshot"} -
                  {" "}
                  {isLoading ? "Refreshing" : asOfLabel}
                </p>
              </div>
              <span className="w-fit rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                {source === "live" ? "Live" : "Fallback"}
              </span>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[820px]">
                <div className="grid grid-cols-[1.1fr_1.9fr_0.9fr_0.9fr_0.9fr_0.9fr] border-b border-neutral-100 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 dark:border-neutral-900 dark:text-neutral-400">
                  <span>Symbol</span>
                  <span>Name</span>
                  <span>Class</span>
                  <span>Price</span>
                  <span>Day</span>
                  <span>Volume</span>
                </div>
                {quotes.map((quote) => (
                  <HoldingRow key={quote.symbol} quote={quote} />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <SummaryPanel title="Leaders">
              <MoverRow label="Best" quote={stats.best} />
              <MoverRow label="Weakest" quote={stats.worst} />
            </SummaryPanel>

            <SummaryPanel title="Exposure">
              {Object.entries(stats.assetCounts).map(([assetClass, count]) => (
                <div
                  key={assetClass}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {assetClass}
                  </span>
                  <span className="font-medium text-neutral-950 dark:text-neutral-50">
                    {count}
                  </span>
                </div>
              ))}
            </SummaryPanel>
          </aside>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
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
  const valueColor =
    tone === "positive"
      ? "text-emerald-700 dark:text-emerald-300"
      : tone === "negative"
        ? "text-red-700 dark:text-red-300"
        : "text-neutral-950 dark:text-neutral-50";

  return (
    <div className="rounded-md border border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className={`mt-3 text-2xl font-semibold ${valueColor}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
        {helper}
      </p>
    </div>
  );
}

function HoldingRow({ quote }: { quote: Quote }) {
  const isPositive = quote.changePercent >= 0;

  return (
    <div className="grid grid-cols-[1.1fr_1.9fr_0.9fr_0.9fr_0.9fr_0.9fr] items-center border-b border-neutral-100 px-4 py-3 text-sm last:border-b-0 dark:border-neutral-900">
      <div>
        <p className="font-medium text-neutral-950 dark:text-neutral-50">
          {quote.symbol}
        </p>
        {quote.forwardYield ? (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            Yield {formatPercent(quote.forwardYield)}
          </p>
        ) : null}
      </div>
      <p className="truncate pr-4 text-neutral-600 dark:text-neutral-300">
        {quote.name}
      </p>
      <p className="text-neutral-600 dark:text-neutral-300">{quote.assetClass}</p>
      <p className="font-medium text-neutral-950 dark:text-neutral-50">
        {formatCurrency(quote.price)}
      </p>
      <div>
        <p
          className={
            isPositive
              ? "font-medium text-emerald-700 dark:text-emerald-300"
              : "font-medium text-red-700 dark:text-red-300"
          }
        >
          {formatPercent(quote.changePercent)}
        </p>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {quote.change >= 0 ? "+" : ""}
          {formatCurrency(quote.change)}
        </p>
      </div>
      <p className="text-neutral-600 dark:text-neutral-300">
        {formatNumber(quote.volume)}
      </p>
    </div>
  );
}

function SummaryPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function MoverRow({ label, quote }: { label: string; quote?: Quote }) {
  if (!quote) return null;

  const positive = quote.changePercent >= 0;

  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <div>
        <p className="text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="font-medium text-neutral-950 dark:text-neutral-50">
          {quote.symbol}
        </p>
      </div>
      <p
        className={
          positive
            ? "font-medium text-emerald-700 dark:text-emerald-300"
            : "font-medium text-red-700 dark:text-red-300"
        }
      >
        {formatPercent(quote.changePercent)}
      </p>
    </div>
  );
}
