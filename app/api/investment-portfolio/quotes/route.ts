import { NextResponse } from "next/server";
import {
  portfolioHoldings,
  type PortfolioHolding,
} from "app/investmentportfolio/portfolio-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function toStooqSymbol(symbol: string) {
  if (symbol.endsWith("-USD")) {
    return symbol.replace("-USD", "USD").toLowerCase();
  }

  return `${symbol.toLowerCase()}.us`;
}

function parseNumber(value?: string) {
  if (!value || value === "N/D" || value === "-") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function fallbackQuote(holding: PortfolioHolding, source: "fallback" | "partial") {
  return {
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
    source,
  };
}

async function fetchStooqQuote(holding: PortfolioHolding) {
  const stooqSymbol = toStooqSymbol(holding.symbol);
  const url = `https://stooq.com/q/l/?s=${encodeURIComponent(
    stooqSymbol
  )}&f=snd2t2ohlcvp&h&e=csv`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Quote request failed with ${response.status}`);
  }

  const text = await response.text();
  const [, row] = text.trim().split(/\r?\n/);
  if (!row) return null;

  const [
    symbol,
    name,
    date,
    time,
    open,
    high,
    low,
    close,
    volume,
    previous,
  ] = row.split(",");

  const price = parseNumber(close);
  const previousClose = parseNumber(previous);
  if (!price || !previousClose || symbol === "N/D") {
    return null;
  }

  const change = price - previousClose;
  const changePercent = (change / previousClose) * 100;

  return {
    symbol: holding.symbol,
    name: name && name !== "N/D" ? name : holding.symbol,
    assetClass: holding.assetClass,
    price,
    previousClose,
    change,
    changePercent,
    volume: parseNumber(volume),
    open: parseNumber(open),
    dayHigh: parseNumber(high),
    dayLow: parseNumber(low),
    currency: "USD",
    marketState: date && time ? `${date} ${time}` : undefined,
    forwardYield: holding.forwardYield,
    beta: holding.beta,
    source: "live" as const,
  };
}

export async function GET() {
  try {
    const quotes = await Promise.all(
      portfolioHoldings.map(async (holding) => {
        try {
          return (await fetchStooqQuote(holding)) ?? fallbackQuote(holding, "partial");
        } catch {
          return fallbackQuote(holding, "partial");
        }
      })
    );

    return NextResponse.json({
      asOf: new Date().toISOString(),
      source: quotes.some((quote) => quote.source === "live") ? "live" : "fallback",
      quotes,
    });
  } catch (error) {
    return NextResponse.json({
      asOf: new Date().toISOString(),
      source: "fallback",
      error: error instanceof Error ? error.message : "Quote request failed",
      quotes: portfolioHoldings.map((holding) => fallbackQuote(holding, "fallback")),
    });
  }
}
