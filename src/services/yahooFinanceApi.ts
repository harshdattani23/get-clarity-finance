/**
 * Yahoo Finance API Service
 * Integrates with our deployed Cloud Run API for comprehensive stock data
 */

const API_BASE_URL = 'https://yahoo-finance-api-124311910782.us-central1.run.app';

// Types for our API responses
export interface StockInfo {
  symbol: string;
  longName: string;
  shortName: string;
  currentPrice: number;
  previousClose: number;
  regularMarketOpen: number;
  dayLow: number;
  dayHigh: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  marketCap: number;
  volume: number;
  averageVolume?: number;
  currency: string;
  exchange: string;
  fullExchangeName: string;
  sector: string;
  industry: string;
  trailingPE?: number;
  forwardPE?: number;
  priceToBook: number;
  bookValue: number;
  trailingEps: number;
  dividendRate?: number;
  dividendYield?: number;
  totalRevenue: number;
  totalCash: number;
  totalDebt: number;
  debtToEquity: number;
  returnOnEquity: number;
  profitMargins: number;
  revenueGrowth: number;
  earningsGrowth: number;
  recommendationMean?: number;
  recommendationKey?: string;
  numberOfAnalystOpinions?: number;
  targetMeanPrice?: number;
  targetHighPrice?: number;
  targetLowPrice?: number;
  fullTimeEmployees?: number;
  website?: string;
  longBusinessSummary?: string;
  address1?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export interface HistoricalPrice {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  'Adj Close': number;
}

export interface NewsItem {
  title: string;
  summary: string;
  description: string;
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

class YahooFinanceService {
  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<T> = await response.json();
      return result.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Get comprehensive stock information
   */
  async getStockInfo(ticker: string): Promise<StockInfo> {
    return this.makeRequest<StockInfo>('/api/stock-info', { ticker });
  }

  /**
   * Get historical stock prices
   */
  async getHistoricalPrices(
    ticker: string,
    period: string = '1mo',
    interval: string = '1d'
  ): Promise<HistoricalPrice[]> {
    return this.makeRequest<HistoricalPrice[]>('/api/historical-prices', {
      ticker,
      period,
      interval,
    });
  }

  /**
   * Get latest news for a stock
   */
  async getStockNews(ticker: string): Promise<NewsItem[]> {
    return this.makeRequest<NewsItem[]>('/api/news', { ticker });
  }

  /**
   * Get stock actions (dividends and splits)
   */
  async getStockActions(ticker: string): Promise<any[]> {
    return this.makeRequest<any[]>('/api/stock-actions', { ticker });
  }

  /**
   * Get financial statement data
   */
  async getFinancialStatement(ticker: string, type: string): Promise<any[]> {
    return this.makeRequest<any[]>('/api/financial-statement', {
      ticker,
      financial_type: type,
    });
  }

  /**
   * Get holder information
   */
  async getHolderInfo(ticker: string, type: string): Promise<any[]> {
    return this.makeRequest<any[]>('/api/holder-info', {
      ticker,
      holder_type: type,
    });
  }

  /**
   * Get analyst recommendations
   */
  async getRecommendations(ticker: string, type: string = 'recommendations'): Promise<any[]> {
    return this.makeRequest<any[]>('/api/recommendations', {
      ticker,
      recommendation_type: type,
    });
  }

  /**
   * Check if API is healthy
   */
  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }

  /**
   * Format currency based on market
   */
  formatCurrency(value: number | null | undefined, currency: string): string {
    // Handle null, undefined, or invalid values
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    
    const numValue = Number(value);
    
    if (currency === 'INR') {
      return `₹${numValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${numValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  /**
   * Format large numbers (for market cap, revenue, etc.)
   */
  formatLargeNumber(value: number | null | undefined, currency: string = 'INR'): string {
    const symbol = currency === 'INR' ? '₹' : '$';
    
    // Handle null, undefined, or invalid values
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    
    const numValue = Number(value);
    
    if (numValue >= 1e12) {
      return `${symbol}${(numValue / 1e12).toFixed(2)}T`;
    }
    if (numValue >= 1e9) {
      return `${symbol}${(numValue / 1e9).toFixed(2)}B`;
    }
    if (numValue >= 1e6) {
      return `${symbol}${(numValue / 1e6).toFixed(2)}M`;
    }
    if (numValue >= 1e3) {
      return `${symbol}${(numValue / 1e3).toFixed(2)}K`;
    }
    return `${symbol}${numValue.toFixed(2)}`;
  }

  /**
   * Calculate percentage change
   */
  calculateChange(current: number | null | undefined, previous: number | null | undefined): { change: number; changePercent: number } {
    // Handle null, undefined, or invalid values
    if (current === null || current === undefined || previous === null || previous === undefined || 
        isNaN(current) || isNaN(previous) || previous === 0) {
      return { change: 0, changePercent: 0 };
    }
    
    const change = current - previous;
    const changePercent = (change / previous) * 100;
    return { change, changePercent };
  }

  /**
   * Get risk assessment based on financial metrics
   */
  getRiskAssessment(stock: StockInfo): {
    level: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH';
    factors: string[];
    score: number;
  } {
    const factors: string[] = [];
    let riskScore = 0;

    // Check profitability
    if (stock.trailingEps < 0) {
      factors.push('Company is loss-making');
      riskScore += 2;
    }

    // Check debt levels
    if (stock.debtToEquity > 100) {
      factors.push('High debt-to-equity ratio');
      riskScore += 1;
    }

    // Check valuation
    if (stock.priceToBook < 1) {
      factors.push('Trading below book value');
      riskScore += 0.5;
    }

    // Check PE ratio
    if (stock.trailingPE && stock.trailingPE > 50) {
      factors.push('High P/E ratio indicating expensive valuation');
      riskScore += 1;
    }

    // Check volatility (52-week range)
    const volatility = ((stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow) / stock.fiftyTwoWeekLow) * 100;
    if (volatility > 100) {
      factors.push('High price volatility');
      riskScore += 1;
    }

    // Determine risk level
    let level: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY HIGH';
    if (riskScore >= 4) level = 'VERY HIGH';
    else if (riskScore >= 2.5) level = 'HIGH';
    else if (riskScore >= 1) level = 'MEDIUM';
    else level = 'LOW';

    return { level, factors, score: riskScore };
  }

  /**
   * Get recommendation text based on score
   */
  getRecommendationText(score?: number): string {
    if (!score) return 'No recommendation available';
    
    if (score <= 1.5) return 'Strong Buy';
    if (score <= 2.0) return 'Buy';
    if (score <= 2.5) return 'Hold';
    if (score <= 3.0) return 'Sell';
    return 'Strong Sell';
  }
}

// Export singleton instance
export const yahooFinanceService = new YahooFinanceService();
export default yahooFinanceService;
