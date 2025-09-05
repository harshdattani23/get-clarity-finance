/**
 * Bond Analysis Service using Yahoo Finance API
 * Since direct bond prices are not available, this service focuses on
 * analyzing bond issuers' financial health as a proxy for credit risk
 */

class BondAnalysisService {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl || 'https://yahoo-finance-api-124311910782.us-central1.run.app';
  }

  async makeRequest(endpoint, data) {
    const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Get issuer stock data for bond analysis
   */
  async getIssuerData(issuerName) {
    // Map common bond issuers to stock symbols
    const issuerMapping = {
      'IRFC': 'IRFC.NS',
      'INDIAN RAILWAY FINANCE': 'IRFC.NS',
      'NTPC': 'NTPC.NS',
      'REC': 'REC.NS', 
      'RECL': 'REC.NS',
      'PFC': 'PFC.NS',
      'POWER FINANCE': 'PFC.NS',
      'HUDCO': 'HUDCO.NS',
      'NHPC': 'NHPC.NS',
      'PGCIL': 'PGCIL.NS',
      'POWER GRID': 'PGCIL.NS',
      'IOC': 'IOC.NS',
      'INDIAN OIL': 'IOC.NS'
    };

    const normalizedIssuer = issuerName.toUpperCase();
    let ticker = null;

    // Find matching ticker
    for (const [key, value] of Object.entries(issuerMapping)) {
      if (normalizedIssuer.includes(key)) {
        ticker = value;
        break;
      }
    }

    if (!ticker) {
      throw new Error(`No stock ticker found for issuer: ${issuerName}`);
    }

    const stockData = await this.makeRequest('/api/stock-info', { ticker });
    return this.analyzeIssuerCreditworthiness(stockData);
  }

  /**
   * Analyze issuer's creditworthiness based on stock data
   */
  analyzeIssuerCreditworthiness(stockData) {
    const analysis = {
      issuer: {
        name: stockData.longName || stockData.shortName,
        symbol: stockData.symbol,
        sector: stockData.sector,
        industry: stockData.industry
      },
      financials: {
        currentPrice: stockData.currentPrice,
        marketCap: stockData.marketCap,
        currency: stockData.currency,
        trailingPE: stockData.trailingPE,
        priceToBook: stockData.priceToBook,
        debtToEquity: stockData.debtToEquity,
        returnOnEquity: stockData.returnOnEquity,
        profitMargins: stockData.profitMargins,
        totalDebt: stockData.totalDebt,
        totalCash: stockData.totalCash
      },
      creditRisk: this.assessCreditRisk(stockData),
      recommendationSummary: this.getRecommendationSummary(stockData)
    };

    return analysis;
  }

  /**
   * Assess credit risk based on financial metrics
   */
  assessCreditRisk(stockData) {
    const riskFactors = [];
    let riskScore = 0;

    // Check profitability
    if (stockData.trailingEps && stockData.trailingEps < 0) {
      riskFactors.push('Company is loss-making');
      riskScore += 3;
    }

    // Check debt levels
    if (stockData.debtToEquity && stockData.debtToEquity > 100) {
      riskFactors.push('High debt-to-equity ratio');
      riskScore += 2;
    }

    // Check liquidity (Cash vs Debt)
    if (stockData.totalDebt && stockData.totalCash) {
      const cashToDebtRatio = stockData.totalCash / stockData.totalDebt;
      if (cashToDebtRatio < 0.2) {
        riskFactors.push('Low cash-to-debt ratio');
        riskScore += 1;
      }
    }

    // Check return on equity
    if (stockData.returnOnEquity && stockData.returnOnEquity < 0.05) {
      riskFactors.push('Low return on equity');
      riskScore += 1;
    }

    // Check profit margins
    if (stockData.profitMargins && stockData.profitMargins < 0.05) {
      riskFactors.push('Low profit margins');
      riskScore += 1;
    }

    // Determine risk level
    let riskLevel;
    if (riskScore >= 5) riskLevel = 'HIGH';
    else if (riskScore >= 3) riskLevel = 'MEDIUM';
    else if (riskScore >= 1) riskLevel = 'LOW-MEDIUM';
    else riskLevel = 'LOW';

    return {
      level: riskLevel,
      score: riskScore,
      factors: riskFactors
    };
  }

  /**
   * Get recommendation summary
   */
  getRecommendationSummary(stockData) {
    const recommendations = [];

    if (stockData.recommendationKey) {
      recommendations.push(`Analyst rating: ${stockData.recommendationKey.toUpperCase()}`);
    }

    if (stockData.targetMeanPrice && stockData.currentPrice) {
      const upside = ((stockData.targetMeanPrice - stockData.currentPrice) / stockData.currentPrice * 100).toFixed(1);
      recommendations.push(`Price target upside: ${upside}%`);
    }

    return recommendations;
  }

  /**
   * Analyze multiple bonds from CSV data
   */
  async analyzeBondPortfolio(bonds) {
    const results = [];
    
    for (const bond of bonds) {
      try {
        const analysis = await this.getIssuerData(bond.issue_name);
        results.push({
          bond: bond,
          issuerAnalysis: analysis,
          status: 'success'
        });
      } catch (error) {
        results.push({
          bond: bond,
          error: error.message,
          status: 'failed'
        });
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return {
      summary: this.generatePortfolioSummary(results),
      detailed: results
    };
  }

  /**
   * Generate portfolio summary
   */
  generatePortfolioSummary(results) {
    const successful = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'failed');

    if (successful.length === 0) {
      return {
        totalBonds: results.length,
        analyzed: 0,
        failed: failed.length,
        message: 'No bonds could be analyzed'
      };
    }

    const riskDistribution = successful.reduce((acc, result) => {
      const riskLevel = result.issuerAnalysis.creditRisk.level;
      acc[riskLevel] = (acc[riskLevel] || 0) + 1;
      return acc;
    }, {});

    const avgPE = successful
      .filter(r => r.issuerAnalysis.financials.trailingPE)
      .reduce((sum, r) => sum + r.issuerAnalysis.financials.trailingPE, 0) / successful.length;

    return {
      totalBonds: results.length,
      analyzed: successful.length,
      failed: failed.length,
      riskDistribution,
      averagePE: avgPE.toFixed(2),
      highRiskBonds: successful.filter(r => r.issuerAnalysis.creditRisk.level === 'HIGH').length,
      recommendations: this.generatePortfolioRecommendations(successful)
    };
  }

  /**
   * Generate portfolio-level recommendations
   */
  generatePortfolioRecommendations(successfulAnalyses) {
    const highRisk = successfulAnalyses.filter(r => r.issuerAnalysis.creditRisk.level === 'HIGH');
    const recommendations = [];

    if (highRisk.length > 0) {
      recommendations.push(`⚠️ ${highRisk.length} bonds from high-risk issuers - consider reviewing`);
    }

    const psus = successfulAnalyses.filter(r => 
      r.issuerAnalysis.issuer.name.includes('NTPC') || 
      r.issuerAnalysis.issuer.name.includes('IRFC') ||
      r.issuerAnalysis.issuer.name.includes('REC')
    );

    if (psus.length > successfulAnalyses.length * 0.7) {
      recommendations.push('🏛️ Portfolio heavily concentrated in PSU bonds');
    }

    recommendations.push('💡 Monitor issuer stock performance for early credit risk signals');
    recommendations.push('📊 Consider diversification across different sectors and credit ratings');

    return recommendations;
  }

  /**
   * Format currency values
   */
  formatCurrency(value, currency = 'INR') {
    if (!value || isNaN(value)) return 'N/A';
    
    const symbol = currency === 'INR' ? '₹' : '$';
    if (value >= 1e12) return `${symbol}${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${symbol}${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${symbol}${(value / 1e6).toFixed(2)}M`;
    return `${symbol}${value.toLocaleString()}`;
  }
}

// Example usage
async function demonstrateUsage() {
  const bondService = new BondAnalysisService();
  
  // Example bond data from CSV
  const sampleBonds = [
    {
      security: 'IRFC27',
      issue_name: 'IRFC 10.04% 2027(S-54B)',
      coupon: '10.04%',
      maturity: '2027',
      last_traded_price: 115.93
    },
    {
      security: 'NTPC34',
      issue_name: 'NTPC 8.61% 2034 (S-LI C)',
      coupon: '8.61%', 
      maturity: '2034',
      last_traded_price: 115.57
    }
  ];

  try {
    console.log('🔍 Demonstrating Bond Analysis Service\\n');
    
    // Analyze single bond issuer
    console.log('📊 Single Issuer Analysis:');
    const singleAnalysis = await bondService.getIssuerData('IRFC 10.04% 2027');
    console.log('Issuer:', singleAnalysis.issuer.name);
    console.log('Credit Risk:', singleAnalysis.creditRisk.level);
    console.log('Market Cap:', bondService.formatCurrency(singleAnalysis.financials.marketCap));
    console.log('Debt/Equity:', singleAnalysis.financials.debtToEquity?.toFixed(2) || 'N/A');
    
    console.log('\\n📈 Portfolio Analysis:');
    const portfolioAnalysis = await bondService.analyzeBondPortfolio(sampleBonds);
    console.log('Summary:', JSON.stringify(portfolioAnalysis.summary, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BondAnalysisService;
} else if (typeof window !== 'undefined') {
  window.BondAnalysisService = BondAnalysisService;
}

// Run demonstration if called directly
if (require.main === module) {
  demonstrateUsage();
}
