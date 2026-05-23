export type PortfolioHolding = {
  symbol: string;
  assetClass: "Equity" | "ETF" | "Crypto";
  seedPrice: number;
  seedPreviousClose: number;
  seedChange: number;
  seedChangePercent: number;
  forwardYield?: number;
  beta?: number;
};

export const portfolioImportedAt = "May 20, 2026";

export const portfolioHoldings: PortfolioHolding[] = [
  { symbol: "CBRS", assetClass: "Equity", seedPrice: 290.69, seedPreviousClose: 303.63, seedChange: -12.94, seedChangePercent: -4.2618 },
  { symbol: "IONQ", assetClass: "Equity", seedPrice: 52.47, seedPreviousClose: 48.44, seedChange: 4.03, seedChangePercent: 8.3196, beta: 2.94 },
  { symbol: "QUBT", assetClass: "Equity", seedPrice: 9.56, seedPreviousClose: 9.22, seedChange: 0.34, seedChangePercent: 3.6876, beta: 2.04 },
  { symbol: "IBM", assetClass: "Equity", seedPrice: 225, seedPreviousClose: 222.33, seedChange: 2.67, seedChangePercent: 1.2009, forwardYield: 3.04, beta: 0.77 },
  { symbol: "QQQI", assetClass: "ETF", seedPrice: 56.04, seedPreviousClose: 55.4811, seedChange: 0.5589, seedChangePercent: 1.0074, forwardYield: 13.46 },
  { symbol: "PANW", assetClass: "Equity", seedPrice: 246.66, seedPreviousClose: 240.13, seedChange: 6.53, seedChangePercent: 2.7194, beta: 1.37 },
  { symbol: "BLK", assetClass: "Equity", seedPrice: 1051.57, seedPreviousClose: 1036.3, seedChange: 15.27, seedChangePercent: 1.4735, forwardYield: 2.21, beta: 1.07 },
  { symbol: "BX", assetClass: "Equity", seedPrice: 116.83, seedPreviousClose: 114.26, seedChange: 2.57, seedChangePercent: 2.2493, forwardYield: 4.06, beta: 1.24 },
  { symbol: "AMD", assetClass: "Equity", seedPrice: 447.58, seedPreviousClose: 414.05, seedChange: 33.53, seedChangePercent: 8.0981, beta: 1.94 },
  { symbol: "NVDA", assetClass: "Equity", seedPrice: 215.33, seedPreviousClose: 219.51, seedChange: -4.18, seedChangePercent: -1.9042 },
  { symbol: "RDDT", assetClass: "Equity", seedPrice: 146.72, seedPreviousClose: 154.88, seedChange: -8.16, seedChangePercent: -5.2686, beta: 2.25 },
  { symbol: "XLK", assetClass: "ETF", seedPrice: 177.14, seedPreviousClose: 173.24, seedChange: 3.9, seedChangePercent: 2.2512, forwardYield: 0.39, beta: 1.49 },
  { symbol: "XLF", assetClass: "ETF", seedPrice: 51.66, seedPreviousClose: 51.1, seedChange: 0.56, seedChangePercent: 1.0959, forwardYield: 1.97, beta: 0.87 },
  { symbol: "BLOK", assetClass: "ETF", seedPrice: 62.29, seedPreviousClose: 60.74, seedChange: 1.55, seedChangePercent: 2.5519, forwardYield: 0.67 },
  { symbol: "WDC", assetClass: "Equity", seedPrice: 459.62, seedPreviousClose: 455.8, seedChange: 3.82, seedChangePercent: 0.8381, forwardYield: 0.13, beta: 2.29 },
  { symbol: "STX", assetClass: "Equity", seedPrice: 751.07, seedPreviousClose: 733.35, seedChange: 17.72, seedChangePercent: 2.4163, forwardYield: 0.4, beta: 2.07 },
  { symbol: "MU", assetClass: "Equity", seedPrice: 731.99, seedPreviousClose: 698.74, seedChange: 33.25, seedChangePercent: 4.7586, forwardYield: 0.09, beta: 2.58 },
  { symbol: "SNDK", assetClass: "Equity", seedPrice: 1392.56, seedPreviousClose: 1383.29, seedChange: 9.27, seedChangePercent: 0.6701, beta: 2.55 },
  { symbol: "COIN", assetClass: "Equity", seedPrice: 191.29, seedPreviousClose: 193.45, seedChange: -2.16, seedChangePercent: -1.1166, beta: 2.81 },
  { symbol: "ETH-USD", assetClass: "Crypto", seedPrice: 2125.164, seedPreviousClose: 2110.3216, seedChange: 14.8424, seedChangePercent: 0.7033 },
  { symbol: "BTC-USD", assetClass: "Crypto", seedPrice: 77391.0175, seedPreviousClose: 76775.5537, seedChange: 615.4638, seedChangePercent: 0.8016 },
  { symbol: "QQQ", assetClass: "ETF", seedPrice: 713.15, seedPreviousClose: 701.53, seedChange: 11.62, seedChangePercent: 1.6564, forwardYield: 0.42, beta: 1.26 },
  { symbol: "SPY", assetClass: "ETF", seedPrice: 741.25, seedPreviousClose: 733.73, seedChange: 7.52, seedChangePercent: 1.0249, forwardYield: 0.98, beta: 1 },
  { symbol: "HUT", assetClass: "Equity", seedPrice: 96.51, seedPreviousClose: 93.31, seedChange: 3.2, seedChangePercent: 3.4294, beta: 2.84 },
  { symbol: "RTX", assetClass: "Equity", seedPrice: 174.85, seedPreviousClose: 174.49, seedChange: 0.36, seedChangePercent: 0.2063, forwardYield: 1.67, beta: 0.65 },
  { symbol: "LMT", assetClass: "Equity", seedPrice: 522.59, seedPreviousClose: 526.63, seedChange: -4.04, seedChangePercent: -0.7671, forwardYield: 2.62, beta: 0.19 },
  { symbol: "CRCL", assetClass: "Equity", seedPrice: 111.62, seedPreviousClose: 111.03, seedChange: 0.59, seedChangePercent: 0.5314 },
  { symbol: "PLTR", assetClass: "Equity", seedPrice: 137.15, seedPreviousClose: 135.26, seedChange: 1.89, seedChangePercent: 1.3973, beta: 2.09 },
  { symbol: "CRM", assetClass: "Equity", seedPrice: 180.07, seedPreviousClose: 176.31, seedChange: 3.76, seedChangePercent: 2.1326 },
];
