import { metaData } from "app/config";

type ExcelEmbedParams = Record<string, string>;

export type ProjectMetric = {
  label: string;
  value: string;
  helper?: string;
};

export type AnalysisPoint = {
  title: string;
  body: string;
};

export type FinancialSubModel = {
  slug: string;
  title: string;
  embedUrl: string;
  file: string;
  summary?: string;
  metrics?: ProjectMetric[];
  analysis?: AnalysisPoint[];
  embedParams?: ExcelEmbedParams;
};

export type FinancialModel = {
  slug: string;
  title: string;
  description: string;
  file: string;
  embedUrl: string;
  date: string;
  summary?: string;
  metrics?: ProjectMetric[];
  analysis?: AnalysisPoint[];
  embedParams?: ExcelEmbedParams;
  subModels?: FinancialSubModel[];
};

export function getExcelEmbedUrl(
  file: string,
  fallbackUrl?: string,
  embedParams?: ExcelEmbedParams
) {
  if (!file) {
    return fallbackUrl ?? "";
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? metaData.baseUrl;
  const workbookUrl = file.startsWith("http")
    ? file
    : new URL(file, baseUrl).toString();

  const params = new URLSearchParams({
    src: workbookUrl,
    ...(embedParams ?? {}),
  });

  return `https://view.officeapps.live.com/op/embed.aspx?${params.toString()}`;
}

export const models: FinancialModel[] = [
  {
    slug: "multifamily-cash-flow-budget",
    title: "Multifamily Cash Flow Budget",
    description: "Rent roll analysis, monthly pro forma, NOI, debt service, capex",
    file: "/models/multifamily-cash-flow-budget.xlsx",
    embedUrl: "",
    embedParams: {
      ActiveCell: "'Monthly Forecast'!B2",
      wdDownloadButton: "True",
      wdInConfigurator: "True",
    },
    date: "April 14, 2026",
    summary:
      "A 2026 monthly operating budget for a 100-unit multifamily property, built from rent roll inputs through NOI, debt service, capex, and net cash flow.",
    metrics: [
      { label: "Units", value: "100", helper: "95 occupied in the rent roll summary" },
      { label: "2026 NOI", value: "$2.9M", helper: "Full-year operating result" },
      { label: "Net cash flow", value: "$481.6K", helper: "After debt service and capex" },
    ],
    analysis: [
      {
        title: "Built the model from asset-level operating data.",
        body:
          "The workbook starts with the rent roll, floorplan mix, lease-end schedule, and billing summary, then converts those inputs into monthly market rent, in-place rent, gain/loss to lease, vacancy, concessions, and RUBS recovery. The model ties 100 units and 95 occupied units into a 2026 gross potential rent build of roughly $4.9M.",
      },
      {
        title: "Translated assumptions into a full property pro forma.",
        body:
          "Revenue uses 5% annual rent growth, 95% average occupancy, 60% renewal conversion, and $50K of annual concessions. Expenses flow from payroll, property taxes, insurance, utilities, R&M, turnover, G&A, marketing, landscaping, and a 3% management fee. The result is roughly $4.8M of total revenue, $1.9M of operating expenses, and $2.9M of NOI.",
      },
      {
        title: "Proved the asset remains cash-flow positive after the debt step-up.",
        body:
          "Debt service is interest-only through June at about $166.7K per month, then steps to amortizing principal and interest at about $214.7K per month. Even after that July increase and $100K of annual capex, the model produces about $481.6K of full-year net cash flow.",
      },
    ],
  },
  {
    slug: "crcl-dcf",
    title: "Circle Analysis",
    description: "AOP, DCF, reserve yield calculations",
    file: "",
    embedUrl: "",
    date: "August 19, 2025",
    summary:
      "A stablecoin issuer operating model and valuation that connects USDC circulation, reserve yields, transaction volume, partner payouts, operating expenses, and DCF output.",
    metrics: [
      { label: "Base USDC growth", value: "8.0%", helper: "Forecast circulation growth assumption" },
      { label: "2032E revenue", value: "$2.9B", helper: "Model output" },
      { label: "DCF price range", value: "$14.21-$19.50", helper: "Perpetuity to exit multiple methods" },
    ],
    analysis: [
      {
        title: "Separated the stablecoin economics into their real drivers.",
        body:
          "The model breaks revenue into reserve income and transaction revenue, then allocates reserve income across Circle, Coinbase, and outside platforms. The key assumptions are 8% base USDC circulation growth, a declining reserve return curve, a 0.02% take rate, and a 50% partner payout rate on reserve income.",
      },
      {
        title: "Showed that lower yields can offset circulation growth.",
        body:
          "Total revenue is modeled at about $2.5B in 2025E, $2.3B in 2026E, and $2.9B by 2032E. Because reserve return falls from about 4.15% in 2025E to the mid-2% range later in the forecast, the model proves Circle's near-term earnings power is highly rate-sensitive even if USDC circulation grows.",
      },
      {
        title: "Compared DCF value against market value.",
        body:
          "The valuation tab produces implied share prices of $14.21 using the perpetuity method and $19.50 using the exit multiple method, compared with a modeled market price of $134.10. The gap shows that the market case requires a materially larger growth, yield, or free-cash-flow runway than the base DCF supports.",
      },
    ],
    subModels: [
      {
        slug: "calculations",
        title: "Supported Calculations & Tables",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/IQR1iJGsMUuIQ6u9j7pcrdpyAQwzW_mFwAzesEiT7rqxG78?em=2&wdAllowInteractivity=False&ActiveCell='Circle%20Transparency%20Inputs'!A2&wdHideHeaders=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/Circle_ReserveYield_Historical_Template.xlsx",
        summary:
          "A supporting workbook that normalizes reserve transparency data and derives the operating assumptions used in the Circle forecast.",
        metrics: [
          { label: "2026E reserve return", value: "3.30%", helper: "Modeled yield driver" },
          { label: "Take rate", value: "0.02%", helper: "Weighted transaction fee driver" },
          { label: "Cost of revenue", value: "61.02%", helper: "Driver passed into forecast" },
        ],
        analysis: [
          {
            title: "Turned transparency reports into reserve economics.",
            body:
              "The workbook imports USDC circulation, reserve fair value, Treasury holdings, repo balances, cash balances, and settlement timing items. Those inputs are converted into average float, asset mix, and modeled reserve yield, which are the foundation of the Circle revenue build.",
          },
          {
            title: "Derived forecast drivers from historical data.",
            body:
              "The calculations tab derives circulation growth, average float stability, transaction volume growth, partner payout rate, take rate, cost of revenue, compensation expense, G&A, IT infrastructure, marketing, and tax assumptions. For example, it supports a 2026E reserve return of 3.30%, a 0.02% take rate, and a 61.02% cost-of-revenue ratio.",
          },
          {
            title: "Proved which assumptions matter most.",
            body:
              "The supporting schedules show that the DCF is not just a generic fintech model. The economics are mainly driven by float size, short-term rates, and reserve-income sharing, with transaction fees adding a smaller but measurable growth lever.",
          },
        ],
      },
      {
        slug: "crcl-dcf",
        title: "AOP & DCF Valuation",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/IQSsmGW1WktyQ4uLxAtkHDuiAZIYk0CoLPHgfVy16am9MwQ?em=2&wdAllowInteractivity=False&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/Circle_Analysis.xlsx",
        summary:
          "A full operating forecast and DCF valuation for Circle, linking stablecoin circulation, reserve income, transaction fees, margins, cash flow, and valuation.",
        metrics: [
          { label: "2026E revenue", value: "$2.3B", helper: "Lower than 2025E from yield compression" },
          { label: "2032E adj. EBITDA", value: "$720.9M", helper: "At a 25.0% margin" },
          { label: "Market price check", value: "$134.10", helper: "Versus $14.21-$19.50 DCF output" },
        ],
        analysis: [
          {
            title: "Built an operating model around float and rates.",
            body:
              "The revenue build separates USDC circulation, average float, reserve return, platform mix, Coinbase retained income, outside-platform economics, and transaction revenue. This structure makes the model sensitive to the actual variables that drive a stablecoin issuer.",
          },
          {
            title: "Modeled margin recovery, not unlimited operating leverage.",
            body:
              "The P&L forecasts adjusted EBITDA of about $500.5M in 2025E and $720.9M in 2032E. Margins improve from about 20.1% to 25.0%, but the operating model still carries partner payouts, cost of revenue, compensation, infrastructure, and public-company expense load.",
          },
          {
            title: "The DCF implies the public market was underwriting a bull case.",
            body:
              "The valuation produces $14.21 per share under the perpetuity method and $19.50 per share under the exit multiple method. Against the modeled market price of $134.10, the analysis indicates that the market case would need a much larger USDC growth path, reserve yield outlook, or free-cash-flow conversion than the base model assumes.",
          },
        ],
      },
    ],
  },
  {
    slug: "crwd-dcf",
    title: "CrowdStrike Analysis",
    description: "DCF, WACC, revenue forecast, free cash flow",
    file: "/models/crowdstrike.xlsx",
    embedUrl:
      "https://1drv.ms/x/c/4cef457bb869b141/IQSSR0HOxF7uTIUI-W50AzXUAcSoBRaiCC6dTccgmUZ43ZI?em=2&AllowTyping=True&ActiveCell='CrowdStrike%20Financials'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
    date: "May 17, 2025",
    summary:
      "A DCF model for CrowdStrike with a forecast build, WACC analysis, terminal value bridge, and implied equity value.",
    metrics: [
      { label: "WACC", value: "10.68%", helper: "Relevered beta and target capital structure" },
      { label: "Enterprise value", value: "$20.3B", helper: "DCF output" },
      { label: "Terminal value weight", value: "76.6%", helper: "Of enterprise value" },
    ],
    analysis: [
      {
        title: "Forecasted a high-growth cybersecurity profile.",
        body:
          "The model grows revenue from about $3.1B in 2024 to $19.6B in 2029 using a 45.1% projection-period CAGR. Gross margin is held around 75.3%, while unlevered free cash flow rises from about $792.7M in 2025E to $1.8B in 2029E.",
      },
      {
        title: "Built a WACC from capital structure and beta.",
        body:
          "The WACC tab uses a 25.3% debt-to-total-capitalization assumption, a 1.27 relevered beta, 12.41% cost of equity, and 5.58% after-tax cost of debt. That produces a 10.68% discount rate for the DCF.",
      },
      {
        title: "Showed that terminal assumptions dominate the conclusion.",
        body:
          "The exit multiple method uses a 28x terminal EBITDA multiple and produces a $25.8B terminal value. The resulting enterprise value is about $20.3B and implied equity value is about $22.8B, with the terminal value representing 76.6% of enterprise value. The model therefore proves the valuation is highly dependent on sustained growth and terminal multiple support.",
      },
    ],
  },
  {
    slug: "nvda-analysis",
    title: "Nvidia Analysis",
    description: "Trading comps, precedent transactions, DCF, LBO, M&A",
    file: "",
    embedUrl: "",
    date: "October 20, 2023",
    summary:
      "A complete investment banking-style analysis package for Nvidia, covering relative valuation, transaction comps, standalone DCF, LBO feasibility, and M&A transaction modeling.",
    metrics: [
      { label: "DCF price", value: "$99.70", helper: "Implied standalone value per share" },
      { label: "LBO IRR", value: "29.8%", helper: "At same entry and exit multiple" },
      { label: "AMD offer", value: "$142.28", helper: "30% premium in M&A model" },
    ],
    analysis: [
      {
        title: "Built several valuation lenses for the same company.",
        body:
          "The package includes trading comparables, precedent transactions, standalone DCF, LBO, and M&A models. That makes it possible to compare market pricing, intrinsic cash-flow value, financial sponsor feasibility, and strategic transaction math side by side.",
      },
      {
        title: "Showed the tension between market pricing and conservative valuation.",
        body:
          "The trading comps file shows Nvidia at about 45.0x LTM revenue and 130.1x LTM EBITDA, while the DCF produces a $99.70 implied share price versus the model's $485.09 current price. The takeaway is that Nvidia's market value depends on very aggressive growth and terminal assumptions.",
      },
      {
        title: "Used transaction models to test feasibility, not just valuation.",
        body:
          "The LBO reaches a 29.8% sponsor IRR only when the exit multiple is held at the 130x entry multiple and EBITDA expands materially. The M&A model shows that an AMD acquisition can look highly accretive in a simplified view, while the detailed model is initially dilutive before synergies and deleveraging improve the result.",
      },
    ],
    subModels: [
      {
        slug: "trading-comps",
        title: "Trading Comparables",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMBwEAAAAAADJDdwZ3ZyZGx2Q?em=2&AllowTyping=True&ActiveCell='Nvidia%20Corporation'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/nvda-trading-comps.xlsx",
        summary:
          "A public company comparable analysis benchmarking Nvidia against AMD, Intel, and Qualcomm across revenue, EBITDA, EBIT, P/E, margins, and growth.",
        metrics: [
          { label: "NVDA LTM EV/Sales", value: "45.0x", helper: "Versus ex-NVDA peer mean of 5.3x" },
          { label: "NVDA LTM EV/EBITDA", value: "130.1x", helper: "Versus ex-NVDA peer mean of 93.5x" },
          { label: "Mean LTM EBITDA price", value: "$363.00", helper: "Football field output" },
        ],
        analysis: [
          {
            title: "Benchmarked Nvidia against semiconductor peers.",
            body:
              "The comparable set includes AMD, Intel, and Qualcomm, with market data, enterprise value, LTM and forward trading multiples, profitability margins, and growth rates. Nvidia's modeled equity value is about $1.17T and enterprise value is about $1.16T.",
          },
          {
            title: "Quantified Nvidia's premium valuation.",
            body:
              "Nvidia screens at 45.0x LTM EV/Sales and 130.1x LTM EV/EBITDA. Excluding Nvidia, the peer mean is 5.3x LTM EV/Sales and 93.5x LTM EV/EBITDA, while Nvidia also posts a 34.6% LTM EBITDA margin and strong forecast growth. The model proves the stock receives a clear premium for growth and margin quality.",
          },
          {
            title: "Showed why metric choice matters.",
            body:
              "The football field produces very wide implied share price ranges. Mean LTM EV/Sales implies about $154.49 per share, mean LTM EV/EBITDA implies about $363.00, and high LTM EV/EBITDA implies about $824.75. The conclusion is that comps are useful, but Nvidia's valuation is extremely sensitive to peer selection and chosen metric.",
          },
        ],
      },
      {
        slug: "transaction-comps",
        title: "Transaction Comparables",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMCQEAAAAAAKV55gAkTm7o4tM?em=2&AllowTyping=True&ActiveCell='Xilinx'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/nvda-transaction-comps.xlsx",
        summary:
          "A precedent transaction analysis using semiconductor deals including Xilinx, Tower Semiconductor, Maxim Integrated, and Cypress.",
        metrics: [
          { label: "Mean LTM EV/Sales", value: "5.67x", helper: "Precedent transaction set" },
          { label: "Mean LTM EV/EBITDA", value: "15.53x", helper: "Precedent transaction set" },
          { label: "Mean LTM EBITDA price", value: "$57.47", helper: "Nvidia implied share price" },
        ],
        analysis: [
          {
            title: "Built a semiconductor precedent set.",
            body:
              "The workbook analyzes AMD/Xilinx, Intel/Tower Semiconductor, Analog Devices/Maxim Integrated, and Infineon/Cypress. It captures consideration mix, status, enterprise value, revenue, EBITDA, EBIT, net income, and deal premiums.",
          },
          {
            title: "Translated deal multiples into Nvidia value.",
            body:
              "The transaction set produces mean multiples of 5.67x LTM EV/Sales, 15.53x LTM EV/EBITDA, and 23.15x LTM P/E. Applying those to Nvidia implies share prices around $60.48, $57.47, and $66.45 respectively.",
          },
          {
            title: "Proved precedents do not support Nvidia's market premium.",
            body:
              "Even the high precedent cases produce implied prices far below Nvidia's modeled market price, with the high 2-year forward P/E case reaching about $303.48. The analysis shows that strategic semiconductor deal history does not explain Nvidia's trading valuation by itself.",
          },
        ],
      },
      {
        slug: "nvda-dcf",
        title: "Nvidia DCF",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMFAEAAAAAAO3eZyyyzHB8Uc8?em=2&AllowTyping=True&ActiveCell='DCF'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/nvda-dcf.xlsx",
        summary:
          "A standalone DCF model for Nvidia, including projected free cash flow, terminal value, capital structure bridge, and sensitivity analysis.",
        metrics: [
          { label: "Enterprise value", value: "$258.5B", helper: "DCF output" },
          { label: "Implied share price", value: "$99.70", helper: "After net debt bridge" },
          { label: "Terminal value share", value: "90.3%", helper: "Of enterprise value" },
        ],
        analysis: [
          {
            title: "Converted operating forecasts into intrinsic value.",
            body:
              "The DCF calculates projected free cash flow, discounts it, and adds a terminal value to produce a $258.5B enterprise value. After subtracting $8.6B of net debt and dividing by 2.5B fully diluted shares, the implied DCF price is $99.70 per share.",
          },
          {
            title: "Showed that most value comes from the terminal period.",
            body:
              "The model's present value of terminal value is $233.3B, while the present value of forecast-period free cash flow is $25.2B. That means 90.3% of enterprise value comes from terminal value, proving the conclusion is driven primarily by long-term growth and exit assumptions.",
          },
          {
            title: "Framed the downside versus the market price.",
            body:
              "The model calculates a 79.5% downside to the current share price under its assumptions. The sensitivity table still stays well below the market price across the modeled WACC and growth cases, which shows how demanding Nvidia's public valuation was relative to this DCF.",
          },
        ],
      },
      {
        slug: "lbo",
        title: "Sample LBO Analysis",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMFgEAAAAAAKFv6JUNH0cUWjg?em=2&AllowTyping=True&ActiveCell='LBO'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/nvda-lbo.xlsx",
        summary:
          "A sponsor LBO model for Nvidia with entry valuation, financing assumptions, debt schedule, exit waterfall, and return sensitivities.",
        metrics: [
          { label: "Sponsor IRR", value: "29.8%", helper: "Base case output" },
          { label: "Sponsor MoM", value: "3.68x", helper: "Base case output" },
          { label: "Exit leverage", value: "1.20x", helper: "Total debt / EBITDA by 2027" },
        ],
        analysis: [
          {
            title: "Modeled the acquisition and capital structure.",
            body:
              "The LBO uses a 130x entry multiple, producing a $925.7B enterprise value and a $366.74 offer price per share, which is a 24.4% discount to the modeled current share price. The financing stack includes about $53.4B of total debt at close.",
          },
          {
            title: "Tested deleveraging capacity.",
            body:
              "The debt schedule shows total debt/EBITDA falling from 7.25x to 1.20x by 2027 as EBITDA expands and cash flow is used for paydown. Free cash flow available for optional debt paydown increases materially over the hold period.",
          },
          {
            title: "Proved the return depends on an aggressive exit.",
            body:
              "The model produces a 29.8% IRR and 3.68x MoM, but that result assumes the exit multiple remains at the same 130x level as entry. The analysis is useful because it shows how difficult a mega-cap Nvidia take-private would be unless growth and exit valuation both remain extremely strong.",
          },
        ],
      },
      {
        slug: "m-a",
        title: "Sample M&A Transaction",
        embedUrl:
          "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMGAEAAAAAAPuTHtC86DYuDWw?em=2&AllowTyping=True&ActiveCell='Simple%20Acquire'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
        file: "/models/nvda-ma.xlsx",
        summary:
          "A transaction model analyzing Nvidia acquiring AMD, including offer price, cash-stock mix, synergies, accretion/dilution, contribution analysis, and a divestiture alternative.",
        metrics: [
          { label: "AMD offer price", value: "$142.28", helper: "30% premium" },
          { label: "Offer EV", value: "$220.1B", helper: "AMD transaction value" },
          { label: "2025E accretion", value: "80.6%", helper: "Detailed model output" },
        ],
        analysis: [
          {
            title: "Structured a strategic acquisition case.",
            body:
              "The simple acquisition model assumes Nvidia acquires AMD with 50% stock and 50% cash at a 30% premium. That produces a $142.28 offer price, $220.1B offer enterprise value, 29.27x TEV/EBITDA, and 56.77x P/E.",
          },
          {
            title: "Compared simplified and detailed accretion outcomes.",
            body:
              "The simple model shows strong cash EPS accretion, including 69.2% in the first forecast year. The detailed model is more conservative: it is initially 71.5% dilutive, then turns accretive by 24.5%, 80.6%, 125.0%, and 155.0% in later forecast years as synergy, scale, and deleveraging benefits show up.",
          },
          {
            title: "Added a divestiture alternative to test capital allocation.",
            body:
              "The NVDA Sells tab models a Taiwan business sale at a $28.8B enterprise value, with proceeds used for share repurchase and debt paydown. That alternative shows how asset sales can reduce leverage and return capital without taking on the integration risk of a large acquisition.",
          },
        ],
      },
    ],
  },
];
