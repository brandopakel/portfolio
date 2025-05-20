
export const models = [
  {
    slug: 'crwd-dcf',
    title: "CrowdStrike Analysis",
    description: "DCF",
    file: '/models/crowdstrike.xlsx',
    embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/IQSSR0HOxF7uTIUI-W50AzXUAcSoBRaiCC6dTccgmUZ43ZI?em=2&AllowTyping=True&ActiveCell='CrowdStrike%20Financials'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
    date: 'May 17, 2025',
  },
  {
    slug: 'nvda-analysis',
    title: "Nvidia Analysis",
    description: "Comparables, Prescedent Transactions, DCF, LBO, M&A",
    file: '',
    embedUrl: '',
    date: 'October 20, 2023',
    subModels: [
        {
            slug: 'trading-comps',
            title: 'Trading Comparables',
            embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMBwEAAAAAADJDdwZ3ZyZGx2Q?em=2&AllowTyping=True&ActiveCell='Nvidia%20Corporation'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
            file: '/models/nvda-trading-comps.xlsx',
        },
        {
            slug: 'transaction-comps',
            title: 'Transaction Comparables',
            embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMCQEAAAAAAKV55gAkTm7o4tM?em=2&AllowTyping=True&ActiveCell='Xilinx'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
            file: '/models/nvda-transaction-comps.xlsx',
        },
        {
            slug: 'nvda-dcf',
            title: 'Nvidia DCF',
            embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMFAEAAAAAAO3eZyyyzHB8Uc8?em=2&AllowTyping=True&ActiveCell='DCF'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
            file: '/models/nvda-dcf.xlsx',
        },
        {
            slug: 'lbo',
            title: 'Sample LBO Analysis',
            embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMFgEAAAAAAKFv6JUNH0cUWjg?em=2&AllowTyping=True&ActiveCell='LBO'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
            file: '/models/nvda-lbo.xlsx',
        },
        {
            slug: 'm-a',
            title: 'Sample M&A Transaction',
            embedUrl: "https://1drv.ms/x/c/4cef457bb869b141/UQRBsWm4e0XvIIBMGAEAAAAAAPuTHtC86DYuDWw?em=2&AllowTyping=True&ActiveCell='Simple%20Acquire'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True",
            file: '/models/nvda-ma.xlsx',
        },

    ]
  },
];

//Excel Share Links -- filepaths
let CRWD = "https://1drv.ms/x/c/4cef457bb869b141/IQSSR0HOxF7uTIUI-W50AzXUAcSoBRaiCC6dTccgmUZ43ZI?em=2&AllowTyping=True&ActiveCell='CrowdStrike%20Financials'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True";
let nvdatradingcomps = "/Users/bp/Documents/portfolio/my-portfolio/public/models/nvda-trading-comps.xlsx";
let nvdatransactioncomps= "/Users/bp/Documents/portfolio/my-portfolio/public/models/nvda-transaction-comps.xlsx";
let nvdadcf = "/Users/bp/Documents/portfolio/my-portfolio/public/models/nvda-dcf.xlsx";
let nvdalbo = "/Users/bp/Documents/portfolio/my-portfolio/public/models/nvda-lbo.xlsx";
let nvdama = "/Users/bp/Documents/portfolio/my-portfolio/public/models/nvda-ma.xlsx";