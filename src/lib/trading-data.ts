// src/lib/trading-data.ts

export const nifty50Stocks = [
  { ticker: 'ADANIENT', name: 'Adani Enterprises Ltd.', price: 2330.1, change: 1.2, marketCap: '2.65T', industry: 'Metals & Mining', indices: ['NIFTY 50'] },
  { ticker: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Ltd.', price: 1357.55, change: -0.5, marketCap: '2.93T', industry: 'Services', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Ltd.', price: 5934.3, change: 2.1, marketCap: '852B', industry: 'Healthcare', indices: ['NIFTY 50'] },
  { ticker: 'ASIANPAINT', name: 'Asian Paints Ltd.', price: 2886.5, change: -1.1, marketCap: '2.77T', industry: 'Consumer Durables', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'AXISBANK', name: 'Axis Bank Ltd.', price: 1047.85, change: 0.8, marketCap: '3.22T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'BAJAJ-AUTO', name: 'Bajaj Auto Ltd.', price: 7284.8, change: 1.5, marketCap: '2.04T', industry: 'Automobile and Auto Components', indices: ['NIFTY 50'] },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', price: 7234.25, change: -2.3, marketCap: '4.48T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'BAJAJFINSV', name: 'Bajaj Finserv Ltd.', price: 1623.4, change: 0.2, marketCap: '2.58T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'BPCL', name: 'Bharat Petroleum Corporation Ltd.', price: 605.3, change: -0.9, marketCap: '1.31T', industry: 'Oil, Gas & Consumable Fuels', indices: ['NIFTY 50', 'NIFTY NEXT 50'] },
  { ticker: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', price: 1198.4, change: 1.8, marketCap: '6.8T', industry: 'Telecommunication', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'BRITANNIA', name: 'Britannia Industries Ltd.', price: 4899.75, change: 0.4, marketCap: '1.18T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY 50', 'NIFTY NEXT 50'] },
  { ticker: 'CIPLA', name: 'Cipla Ltd.', price: 1304.85, change: -1.4, marketCap: '1.05T', industry: 'Healthcare', indices: ['NIFTY 50'] },
  { ticker: 'COALINDIA', name: 'Coal India Ltd.', price: 433.8, change: 2.5, marketCap: '2.67T', industry: 'Metals & Mining', indices: ['NIFTY 50'] },
  { ticker: 'DIVISLAB', name: 'Divi\'s Laboratories Ltd.', price: 3719.9, change: 0.1, marketCap: '988B', industry: 'Healthcare', indices: ['NIFTY 50', 'NIFTY NEXT 50'] },
  { ticker: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Ltd.', price: 5802.4, change: -0.7, marketCap: '968B', industry: 'Healthcare', indices: ['NIFTY 50'] },
  { ticker: 'EICHERMOT', name: 'Eicher Motors Ltd.', price: 3824.2, change: 1.1, marketCap: '1.05T', industry: 'Automobile and Auto Components', indices: ['NIFTY 50'] },
  { ticker: 'GRASIM', name: 'Grasim Industries Ltd.', price: 2186.4, change: 0.9, marketCap: '1.44T', industry: 'Construction Materials', indices: ['NIFTY 50'] },
  { ticker: 'HCLTECH', name: 'HCL Technologies Ltd.', price: 1642.4, change: -1.2, marketCap: '4.45T', industry: 'Information Technology', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 1447.5, change: 2.2, marketCap: '11T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'HDFCLIFE', name: 'HDFC Life Insurance Company Ltd.', price: 619.0, change: -0.3, marketCap: '1.33T', industry: 'Financial Services', indices: ['NIFTY 50'] },
  { ticker: 'HEROMOTOCO', name: 'Hero MotoCorp Ltd.', price: 4509.3, change: 1.3, marketCap: '901B', industry: 'Automobile and Auto Components', indices: ['NIFTY 50'] },
  { ticker: 'HINDALCO', name: 'Hindalco Industries Ltd.', price: 559.8, change: -2.0, marketCap: '1.26T', industry: 'Metals & Mining', indices: ['NIFTY 50'] },
  { ticker: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: 2420.0, change: 0.6, marketCap: '5.68T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 1069.95, change: 1.4, marketCap: '7.52T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'INDUSINDBK', name: 'IndusInd Bank Ltd.', price: 1495.2, change: -1.8, marketCap: '1.16T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'INFY', name: 'Infosys Ltd.', price: 1665.0, change: 0.3, marketCap: '6.91T', industry: 'Information Technology', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'ITC', name: 'ITC Ltd.', price: 429.25, change: -0.1, marketCap: '5.36T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'JSWSTEEL', name: 'JSW Steel Ltd.', price: 818.15, change: 2.3, marketCap: '2.0T', industry: 'Metals & Mining', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank Ltd.', price: 1774.8, change: -1.5, marketCap: '3.53T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'LTIM', name: 'LTIMindtree Ltd.', price: 5126.3, change: 0.5, marketCap: '1.52T', industry: 'Information Technology', indices: ['NIFTY 50', 'NIFTY NEXT 50'] },
  { ticker: 'LT', name: 'Larsen & Toubro Ltd.', price: 3418.05, change: 1.9, marketCap: '4.71T', industry: 'Construction', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'M&M', name: 'Mahindra & Mahindra Ltd.', price: 1819.1, change: -0.8, marketCap: '2.26T', industry: 'Automobile and Auto Components', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'MARUTI', name: 'Maruti Suzuki India Ltd.', price: 11489.9, change: 2.4, marketCap: '3.61T', industry: 'Automobile and Auto Components', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'NESTLEIND', name: 'Nestle India Ltd.', price: 2548.1, change: 0.0, marketCap: '2.46T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'NTPC', name: 'NTPC Ltd.', price: 337.8, change: -1.3, marketCap: '3.28T', industry: 'Power', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'ONGC', name: 'Oil & Natural Gas Corporation Ltd.', price: 268.4, change: 1.6, marketCap: '3.38T', industry: 'Oil, Gas & Consumable Fuels', indices: ['NIFTY 50'] },
  { ticker: 'POWERGRID', name: 'Power Grid Corporation of India Ltd.', price: 275.5, change: 0.7, marketCap: '2.56T', industry: 'Power', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 2959.8, change: -0.2, marketCap: '20.02T', industry: 'Oil, Gas & Consumable Fuels', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'SBILIFE', name: 'SBI Life Insurance Company Ltd.', price: 1459.4, change: 1.0, marketCap: '1.46T', industry: 'Financial Services', indices: ['NIFTY 50'] },
  { ticker: 'SBIN', name: 'State Bank of India', price: 761.6, change: -1.1, marketCap: '6.8T', industry: 'Financial Services', indices: ['NIFTY 50', 'SENSEX 30', 'BANK NIFTY'] },
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Ltd.', price: 1493.7, change: 2.0, marketCap: '3.58T', industry: 'Healthcare', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'TATACONSUM', name: 'Tata Consumer Products Ltd.', price: 1121.25, change: -0.4, marketCap: '1.05T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY 50'] },
  { ticker: 'TATAMOTORS', name: 'Tata Motors Ltd.', price: 978.8, change: 0.6, marketCap: '3.25T', industry: 'Automobile and Auto Components', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'TATASTEEL', name: 'Tata Steel Ltd.', price: 153.2, change: -1.7, marketCap: '1.91T', industry: 'Metals & Mining', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'TCS', name: 'Tata Consultancy Services Ltd.', price: 4134.8, change: 1.2, marketCap: '15T', industry: 'Information Technology', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'TECHM', name: 'Tech Mahindra Ltd.', price: 1293.0, change: -0.6, marketCap: '1.26T', industry: 'Information Technology', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'TITAN', name: 'Titan Company Ltd.', price: 3632.5, change: 2.1, marketCap: '3.23T', industry: 'Consumer Durables', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'ULTRACEMCO', name: 'UltraTech Cement Ltd.', price: 9946.5, change: -1.0, marketCap: '2.87T', industry: 'Construction Materials', indices: ['NIFTY 50', 'SENSEX 30'] },
  { ticker: 'WIPRO', name: 'Wipro Ltd.', price: 514.8, change: 0.8, marketCap: '2.69T', industry: 'Information Technology', indices: ['NIFTY 50', 'SENSEX 30'] },
];

export const bankNiftyStocks = [
  { ticker: 'AUBANK', name: 'AU Small Finance Bank Ltd.', price: 670, change: -1.2, marketCap: '498B', industry: 'Financial Services', indices: ['BANK NIFTY'] },
  { ticker: 'IDFCFIRSTB', name: 'IDFC First Bank Ltd.', price: 83, change: 0.5, marketCap: '584B', industry: 'Financial Services', indices: ['BANK NIFTY'] },
  { ticker: 'BANKBARODA', name: 'Bank of Baroda', price: 240.5, change: 1.1, marketCap: '1.24T', industry: 'Financial Services', indices: ['BANK NIFTY', 'NIFTY NEXT 50'] },
  { ticker: 'PNB', name: 'Punjab National Bank', price: 103.2, change: -0.9, marketCap: '1.19T', industry: 'Financial Services', indices: ['BANK NIFTY', 'NIFTY NEXT 50'] },
];

export const niftyNext50Stocks = [
  { ticker: 'DMART', name: 'Avenue Supermarts Ltd.', price: 4248.4, change: 1.7, marketCap: '2.76T', industry: 'Consumer Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'DLF', name: 'DLF Ltd.', price: 767.1, change: -2.1, marketCap: '1.9T', industry: 'Realty', indices: ['NIFTY NEXT 50'] },
  { ticker: 'DABUR', name: 'Dabur India Ltd.', price: 519.7, change: 0.3, marketCap: '921B', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'GODREJCP', name: 'Godrej Consumer Products Ltd.', price: 1211.6, change: 1.5, marketCap: '1.24T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'HAVELLS', name: 'Havells India Ltd.', price: 1487.1, change: -0.5, marketCap: '932B', industry: 'Consumer Durables', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ICICIPRULI', name: 'ICICI Prudential Life Insurance Company Ltd.', price: 609.2, change: 2.0, marketCap: '881B', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'INDIGO', name: 'InterGlobe Aviation Ltd.', price: 5842, change: -1.0, marketCap: '2.26T', industry: 'Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'PIDILITIND', name: 'Pidilite Industries Ltd.', price: 2983.4, change: 1.2, marketCap: '1.52T', industry: 'Chemicals', indices: ['NIFTY NEXT 50'] },
  { ticker: 'SIEMENS', name: 'Siemens Ltd.', price: 3061.8, change: -2.5, marketCap: '1.09T', industry: 'Capital Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'UNITDSPR', name: 'United Spirits Ltd.', price: 1317.2, change: 0.8, marketCap: '958B', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'AMBUJACEM', name: 'Ambuja Cements Ltd.', price: 597.1, change: 1.3, marketCap: '1.47T', industry: 'Construction Materials', indices: ['NIFTY NEXT 50'] },
  { ticker: 'BOSCHLTD', name: 'Bosch Ltd.', price: 38710, change: -1.6, marketCap: '1.14T', industry: 'Automobile and Auto Components', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ICICIGI', name: 'ICICI Lombard General Insurance Company Ltd.', price: 1866.9, change: 0.2, marketCap: '928B', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'BAJAJHLDNG', name: 'Bajaj Holdings & Investment Ltd.', price: 13797, change: 1.8, marketCap: '1.54T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ADANIENSOL', name: 'Adani Energy Solutions Ltd.', price: 791.3, change: -2.2, marketCap: '950B', industry: 'Power', indices: ['NIFTY NEXT 50'] },
  { ticker: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Ltd.', price: 3548.6, change: 0.4, marketCap: '1.2T', industry: 'Healthcare', indices: ['NIFTY NEXT 50'] },
  { ticker: 'NAUKRI', name: 'Info Edge (India) Ltd.', price: 1333, change: -1.9, marketCap: '863B', industry: 'Consumer Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ADANIGREEN', name: 'Adani Green Energy Ltd.', price: 964.1, change: 1.1, marketCap: '1.59T', industry: 'Power', indices: ['NIFTY NEXT 50'] },
  { ticker: 'VEDL', name: 'Vedanta Ltd.', price: 438.7, change: 2.4, marketCap: '1.72T', industry: 'Metals & Mining', indices: ['NIFTY NEXT 50'] },
  { ticker: 'GAIL', name: 'GAIL (India) Ltd.', price: 170.1, change: -0.3, marketCap: '1.12T', industry: 'Oil, Gas & Consumable Fuels', indices: ['NIFTY NEXT 50'] },
  { ticker: 'CHOLAFIN', name: 'Cholamandalam Investment and Finance Company Ltd.', price: 1447.9, change: 0.9, marketCap: '1.22T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'IOC', name: 'Indian Oil Corporation Ltd.', price: 142.0, change: -1.4, marketCap: '2.0T', industry: 'Oil, Gas & Consumable Fuels', indices: ['NIFTY NEXT 50'] },
  { ticker: 'TATAPOWER', name: 'Tata Power Company Ltd.', price: 382.9, change: 2.1, marketCap: '1.22T', industry: 'Power', indices: ['NIFTY NEXT 50'] },
  { ticker: 'LICI', name: 'Life Insurance Corporation of India', price: 888.6, change: -0.8, marketCap: '5.62T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'SHREECEM', name: 'Shree Cements Ltd.', price: 30230, change: 1.6, marketCap: '1.09T', industry: 'Construction Materials', indices: ['NIFTY NEXT 50'] },
  { ticker: 'MOTHERSON', name: 'Samvardhana Motherson International Ltd.', price: 95.6, change: -2.0, marketCap: '1.01T', industry: 'Automobile and Auto Components', indices: ['NIFTY NEXT 50'] },
  { ticker: 'HAL', name: 'Hindustan Aeronautics Ltd.', price: 4520, change: 0.1, marketCap: '3.02T', industry: 'Capital Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'CANBK', name: 'Canara Bank', price: 106.9, change: -1.3, marketCap: '969B', industry: 'Financial Services', indices: ['NIFTY NEXT 50', 'BANK NIFTY'] },
  { ticker: 'VBL', name: 'Varun Beverages Ltd.', price: 503.2, change: 1.0, marketCap: '1.7T', industry: 'Fast Moving Consumer Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ABB', name: 'ABB India Ltd.', price: 5033, change: -0.7, marketCap: '1.07T', industry: 'Capital Goods', indices: ['NIFTY NEXT 50'] },
  { ticker: 'JINDALSTEL', name: 'Jindal Steel & Power Ltd.', price: 993.4, change: 2.2, marketCap: '1.01T', industry: 'Metals & Mining', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ZYDUSLIFE', name: 'Zydus Lifesciences Ltd.', price: 935.5, change: -1.1, marketCap: '941B', industry: 'Healthcare', indices: ['NIFTY NEXT 50'] },
  { ticker: 'TVSMOTOR', name: 'TVS Motor Company Ltd.', price: 2960.4, change: 1.4, marketCap: '1.41T', industry: 'Automobile and Auto Components', indices: ['NIFTY NEXT 50'] },
  { ticker: 'PFC', name: 'Power Finance Corporation Ltd.', price: 407.0, change: -0.6, marketCap: '1.34T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'IRFC', name: 'Indian Railway Finance Corporation Ltd.', price: 127.5, change: 0.9, marketCap: '1.67T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'ADANIPOWER', name: 'Adani Power Ltd.', price: 571, change: -1.7, marketCap: '2.2T', industry: 'Power', indices: ['NIFTY NEXT 50'] },
  { ticker: 'RECLTD', name: 'REC Ltd.', price: 389.6, change: 1.2, marketCap: '1.03T', industry: 'Financial Services', indices: ['NIFTY NEXT 50'] },
  { ticker: 'LODHA', name: 'Macrotech Developers Ltd.', price: 1215.7, change: -2.3, marketCap: '1.21T', industry: 'Realty', indices: ['NIFTY NEXT 50'] },
  { ticker: 'JSWENERGY', name: 'JSW Energy Ltd.', price: 522.7, change: 0.6, marketCap: '913B', industry: 'Power', indices: ['NIFTY NEXT 50'] },
  { ticker: 'CGPOWER', name: 'CG Power and Industrial Solutions Ltd.', price: 677.3, change: -1.5, marketCap: '1.07T', industry: 'Capital Goods', indices: ['NIFTY NEXT 50'] },
];

export const bseMidcapStocks = [
  { ticker: 'AARTIDRUGS', name: 'Aarti Drugs Ltd.', price: 500, change: 0.0, marketCap: '45B', industry: 'Healthcare', indices: ['BSE MIDCAP'] },
  { ticker: 'ABBOTINDIA', name: 'Abbott India Ltd.', price: 26000, change: 0.0, marketCap: '550B', industry: 'Healthcare', indices: ['BSE MIDCAP'] },
  { ticker: 'ADITYABIRLA', name: 'Aditya Birla Fashion and Retail Ltd.', price: 250, change: 0.0, marketCap: '250B', industry: 'Consumer Durables', indices: ['BSE MIDCAP'] },
];

const uniqueStocks = new Map();
[...nifty50Stocks, ...bankNiftyStocks, ...niftyNext50Stocks, ...bseMidcapStocks].forEach(stock => {
  if (!uniqueStocks.has(stock.ticker)) {
    uniqueStocks.set(stock.ticker, stock);
  } else {
    const existingStock = uniqueStocks.get(stock.ticker);
    stock.indices.forEach(index => {
      if (!existingStock.indices.includes(index)) {
        existingStock.indices.push(index);
      }
    });
  }
});

export const allStocks = Array.from(uniqueStocks.values());

export const industries = [...new Set(allStocks.map(stock => stock.industry))];

export const indices = {
  nifty: { name: 'NIFTY 50', value: 22500, change: 0.0 },
  sensex: { name: 'SENSEX 30', value: 74000, change: 0.0 },
  bankNifty: { name: 'BANK NIFTY', value: 48000, change: 0.0 },
  niftyNext50: { name: 'NIFTY NEXT 50', value: 66202, change: 0.0 },
  bseMidcap: { name: 'BSE MIDCAP', value: 45217, change: 0.0 },
};

export type Stock = (typeof allStocks)[0] & {
  profile?: string;
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  news?: { title: string; source: string; date: string }[];
};
export type Index = (typeof indices);