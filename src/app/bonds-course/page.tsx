"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  DollarSign, 
  RefreshCw, 
  BookOpen,
  Shield,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  TrendingDown,
  Building2,
  PieChart,
  Activity,
  FileText,
  Info,
  Upload,
  Database
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { yahooFinanceService, type StockInfo } from '@/services/yahooFinanceApi';
import bondInstruments from '@/data/bonds/bond-instruments.json';

interface BondCalculation {
  bondPrice: number;
  yield: number;
  maturityValue: number;
  totalReturn: number;
  annualizedReturn: number;
}

interface BondInstrument {
  name: string;
  symbol: string;
  type: string;
  rating?: string;
  issuer: string;
  currency: string;
  coupon?: number;
  maturity?: string;
  sector?: string;
  focus?: string;
  tax_benefit?: boolean;
  tax_exempt?: boolean;
  expense_ratio?: number;
  maturity_days?: number;
}

interface BondMetadata extends BondInstrument {
  category: string;
}

interface IssuerAnalysis {
  name: string;
  symbol: string;
  currentPrice: number;
  marketCap: number;
  sector: string;
  industry: string;
  trailingPE: number;
  priceToBook: number;
  debtToEquity: number;
  returnOnEquity: number;
  profitMargins: number;
  totalDebt: number;
  totalCash: number;
  creditRisk: {
    level: 'LOW' | 'LOW-MEDIUM' | 'MEDIUM' | 'HIGH';
    score: number;
    factors: string[];
  };
}

interface BondAnalysisResult {
  bond: {
    security: string;
    issue_name: string;
    coupon: string;
    maturity: string;
    last_traded_price: number;
    isin: string;
  };
  issuerAnalysis: IssuerAnalysis | null;
  status: 'success' | 'failed' | 'loading';
  error?: string;
}

export default function BondsCoursePage() {
  const { t } = useTranslation('bonds-course');
  const [bondPrices, setBondPrices] = useState<StockInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Calculator states
  const [faceValue, setFaceValue] = useState(1000);
  const [couponRate, setCouponRate] = useState(8);
  const [yearsToMaturity, setYearsToMaturity] = useState(10);
  const [marketPrice, setMarketPrice] = useState(950);
  const [calculation, setCalculation] = useState<BondCalculation | null>(null);

  // Bond Analysis states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBond, setSelectedBond] = useState<BondAnalysisResult | null>(null);
  const [analysisResults, setAnalysisResults] = useState<BondAnalysisResult[]>([]);
  const [analyzingBond, setAnalyzingBond] = useState(false);
  const [csvBonds, setCsvBonds] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'calculator' | 'analyzer' | 'portfolio'>('calculator');

  // Extract symbols from bond instruments JSON data
  const getBondSymbols = (): string[] => {
    const symbols: string[] = [];
    bondInstruments.forEach(category => {
      category.instruments.forEach((instrument: BondInstrument) => {
        symbols.push(instrument.symbol);
      });
    });
    return symbols;
  };
  
  const bondSymbols = getBondSymbols();

  useEffect(() => {
    setMounted(true);
    fetchBondPrices();
    const interval = setInterval(fetchBondPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateBond();
  }, [faceValue, couponRate, yearsToMaturity, marketPrice]);

  const fetchBondPrices = async () => {
    try {
      setLoading(true);
      const promises = bondSymbols.map(symbol => 
        yahooFinanceService.getStockInfo(symbol).catch(err => {
          console.warn(`Failed to fetch ${symbol}:`, err);
          return null;
        })
      );
      
      const results = await Promise.all(promises);
      const validResults = results.filter((result): result is StockInfo => result !== null);
      setBondPrices(validResults);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching bond prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBond = () => {
    try {
      const annualCoupon = (faceValue * couponRate) / 100;
      const totalCoupons = annualCoupon * yearsToMaturity;
      const maturityValue = faceValue + totalCoupons;
      const totalReturn = maturityValue - marketPrice;
      const annualizedReturn = (Math.pow(faceValue / marketPrice, 1 / yearsToMaturity) - 1) * 100;
      
      // Current Yield calculation
      const currentYield = (annualCoupon / marketPrice) * 100;
      
      // Yield to Maturity (simplified calculation)
      const ytm = ((annualCoupon + (faceValue - marketPrice) / yearsToMaturity) / ((faceValue + marketPrice) / 2)) * 100;

      setCalculation({
        bondPrice: marketPrice,
        yield: ytm,
        maturityValue,
        totalReturn,
        annualizedReturn
      });
    } catch (error) {
      console.error('Error calculating bond metrics:', error);
      setCalculation(null);
    }
  };

  // Bond Analysis Functions
  const getIssuerMapping = (issuerName: string): string | null => {
    const issuerMapping: Record<string, string> = {
      'IRFC': 'IRFC.NS',
      'INDIAN RAILWAY FINANCE': 'IRFC.NS',
      'NTPC': 'NTPC.NS',
      'REC': 'REC.NS',
      'RECL': 'REC.NS',
      'PFC': 'PFC.NS',
      'POWER FINANCE': 'PFC.NS',
      'POWER FIN': 'PFC.NS',
      'HUDCO': 'HUDCO.NS',
      'NHPC': 'NHPC.NS',
      'PGCIL': 'PGCIL.NS',
      'POWER GRID': 'PGCIL.NS',
      'IOC': 'IOC.NS',
      'INDIAN OIL': 'IOC.NS'
    };

    const normalizedIssuer = issuerName.toUpperCase();
    for (const [key, value] of Object.entries(issuerMapping)) {
      if (normalizedIssuer.includes(key)) {
        return value;
      }
    }
    return null;
  };

  const assessCreditRisk = (stockData: StockInfo) => {
    const riskFactors: string[] = [];
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
    let riskLevel: 'LOW' | 'LOW-MEDIUM' | 'MEDIUM' | 'HIGH';
    if (riskScore >= 5) riskLevel = 'HIGH';
    else if (riskScore >= 3) riskLevel = 'MEDIUM';
    else if (riskScore >= 1) riskLevel = 'LOW-MEDIUM';
    else riskLevel = 'LOW';

    return { level: riskLevel, score: riskScore, factors: riskFactors };
  };

  const analyzeBondIssuer = async (bondName: string): Promise<IssuerAnalysis | null> => {
    const ticker = getIssuerMapping(bondName);
    if (!ticker) return null;

    try {
      const stockData = await yahooFinanceService.getStockInfo(ticker);
      const creditRisk = assessCreditRisk(stockData);

      return {
        name: stockData.longName || stockData.shortName || ticker,
        symbol: stockData.symbol,
        currentPrice: stockData.currentPrice || 0,
        marketCap: stockData.marketCap || 0,
        sector: stockData.sector || 'Unknown',
        industry: stockData.industry || 'Unknown',
        trailingPE: stockData.trailingPE || 0,
        priceToBook: stockData.priceToBook || 0,
        debtToEquity: stockData.debtToEquity || 0,
        returnOnEquity: stockData.returnOnEquity || 0,
        profitMargins: stockData.profitMargins || 0,
        totalDebt: stockData.totalDebt || 0,
        totalCash: stockData.totalCash || 0,
        creditRisk
      };
    } catch (error) {
      console.error('Error analyzing issuer:', error);
      return null;
    }
  };

  const searchBonds = (query: string) => {
    // Sample CSV bond data - in real implementation, this would come from your CSV file
    const sampleBonds = [
      {
        security: 'IRFC27',
        issue_name: 'IRFC 10.04% 2027(S-54B)',
        coupon: '10.04%',
        maturity: '2027',
        last_traded_price: 115.93,
        isin: 'INE053F09EO6'
      },
      {
        security: 'NTPC34',
        issue_name: 'NTPC 8.61% 2034 (S-LI C)',
        coupon: '8.61%',
        maturity: '2034',
        last_traded_price: 115.57,
        isin: 'INE733E07JM3'
      },
      {
        security: 'NHPC33',
        issue_name: 'NHPC 8.67% 2033',
        coupon: '8.67%',
        maturity: '2033',
        last_traded_price: 129.10,
        isin: 'INE848E07534'
      },
      {
        security: 'REC28',
        issue_name: 'RECL 8.46% 2028 SERIES 3B',
        coupon: '8.46%',
        maturity: '2028',
        last_traded_price: 119.54,
        isin: 'INE020B07HN3'
      },
      {
        security: 'HUD27',
        issue_name: 'HUDCO 8.20% 2027 TF S2',
        coupon: '8.20%',
        maturity: '2027',
        last_traded_price: 114.22,
        isin: 'INE031A07840'
      }
    ];

    return sampleBonds.filter(bond => 
      bond.issue_name.toLowerCase().includes(query.toLowerCase()) ||
      bond.security.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleBondAnalysis = async (bond: any) => {
    setAnalyzingBond(true);
    
    const result: BondAnalysisResult = {
      bond,
      issuerAnalysis: null,
      status: 'loading'
    };

    try {
      const analysis = await analyzeBondIssuer(bond.issue_name);
      result.issuerAnalysis = analysis;
      result.status = analysis ? 'success' : 'failed';
      result.error = analysis ? undefined : 'Issuer not found in stock market';
    } catch (error) {
      result.status = 'failed';
      result.error = error instanceof Error ? error.message : 'Analysis failed';
    }

    setSelectedBond(result);
    setAnalyzingBond(false);
  };

  const getPriceChangeIcon = (current: number | null | undefined, previous: number | null | undefined) => {
    if (!current || !previous) return <Minus className="w-4 h-4 text-gray-500" />;
    const change = current - previous;
    if (change > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getPriceChangeColor = (current: number | null | undefined, previous: number | null | undefined) => {
    if (!current || !previous) return "text-gray-500";
    const change = current - previous;
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <DollarSign className="w-8 h-8 mr-3 text-blue-600" />
                {t('title') as string}
              </h1>
              <p className="text-gray-600 mt-2">{t('subtitle') as string}</p>
            </div>
            <button
              onClick={fetchBondPrices}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Prices</span>
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Last updated: {mounted && lastUpdated ? lastUpdated.toLocaleTimeString() : 'Loading...'}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calculator'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calculator className="w-4 h-4 inline-block mr-2" />
                Bond Calculator
              </button>
              <button
                onClick={() => setActiveTab('analyzer')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analyzer'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Search className="w-4 h-4 inline-block mr-2" />
                Bond Analyzer
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'portfolio'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <PieChart className="w-4 h-4 inline-block mr-2" />
                Live Prices
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Calculator Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Modules */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  Bond Learning Modules
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/investment-security-course/intro-to-bonds"
                    className="border border-blue-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        Bond Investment Fundamentals
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Master the basics of bonds, types, and market structure
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      Beginner • 30 min • 100 XP
                    </div>
                  </Link>

                  <Link
                    href="/investment-security-course/comprehensive-bond-strategies"
                    className="border border-green-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 transition-all group"
                  >
                    <div className="flex items-center mb-2">
                      <Target className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                        Advanced Bond Strategies
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Professional bond portfolio construction and management
                    </p>
                    <div className="text-xs text-green-600 font-medium">
                      Advanced • 2 hours • 250 XP
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Bond Calculator */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-600" />
                  Bond Calculator
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Face Value (₹)
                    </label>
                    <input
                      type="number"
                      value={faceValue}
                      onChange={(e) => setFaceValue(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="100"
                      step="100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Coupon Rate (%)
                    </label>
                    <input
                      type="number"
                      value={couponRate}
                      onChange={(e) => setCouponRate(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years to Maturity
                    </label>
                    <input
                      type="number"
                      value={yearsToMaturity}
                      onChange={(e) => setYearsToMaturity(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Market Price (₹)
                    </label>
                    <input
                      type="number"
                      value={marketPrice}
                      onChange={(e) => setMarketPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="100"
                      step="1"
                    />
                  </div>
                </div>

                {calculation && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Calculation Results
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Coupon:</span>
                        <span className="font-semibold">₹{((faceValue * couponRate) / 100).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Yield:</span>
                        <span className="font-semibold">{(((faceValue * couponRate) / 100 / marketPrice) * 100).toFixed(2)}%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yield to Maturity:</span>
                        <span className="font-semibold text-blue-600">{calculation.yield.toFixed(2)}%</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Return:</span>
                        <span className={`font-semibold ${calculation.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{calculation.totalReturn.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maturity Value:</span>
                        <span className="font-semibold">₹{calculation.maturityValue.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between pt-2 border-t border-blue-200">
                        <span className="text-gray-600">Annualized Return:</span>
                        <span className={`font-bold ${calculation.annualizedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {calculation.annualizedReturn.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-xs text-yellow-800">
                          This is a simplified calculation. Actual returns may vary based on market conditions, 
                          reinvestment rates, and other factors.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-600" />
                    Quick Tips
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Higher coupon rates provide more regular income</li>
                    <li>• Longer maturity typically means higher interest rate risk</li>
                    <li>• Buy below face value to enhance yield</li>
                    <li>• Consider tax implications of bond investments</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            {/* Bond Search */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-600" />
                Bond Issuer Analysis
              </h2>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bonds by name or symbol (e.g., IRFC, NTPC, REC)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {searchQuery && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">Available Bonds:</h3>
                  {searchBonds(searchQuery).map((bond) => (
                    <div
                      key={bond.security}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleBondAnalysis(bond)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{bond.issue_name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>{bond.security}</span>
                            <span>•</span>
                            <span>{bond.coupon} coupon</span>
                            <span>•</span>
                            <span>Maturity: {bond.maturity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">₹{bond.last_traded_price}</div>
                          <div className="text-xs text-gray-500">Last Traded</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Analysis Results */}
            {selectedBond && (
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-blue-600" />
                  Issuer Analysis: {selectedBond.bond.issue_name}
                </h2>

                {analyzingBond ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Analyzing bond issuer...</span>
                  </div>
                ) : selectedBond.status === 'failed' ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
                    <p className="text-gray-600">{selectedBond.error}</p>
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
                      <h4 className="font-semibold text-gray-900 mb-2">Why this might happen:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• The bond issuer is not a publicly traded company</li>
                        <li>• Government bonds (GOI) don't have stock equivalents</li>
                        <li>• Private companies or unlisted entities</li>
                        <li>• Symbol mapping not available in our database</li>
                      </ul>
                    </div>
                  </div>
                ) : selectedBond.issuerAnalysis && (
                  <div className="space-y-6">
                    {/* Issuer Overview */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Company Overview</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Company:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stock Symbol:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Sector:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.sector}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Industry:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.industry}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Market Data</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Stock Price:</span>
                            <span className="font-medium">₹{selectedBond.issuerAnalysis.currentPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Market Cap:</span>
                            <span className="font-medium">
                              {yahooFinanceService.formatLargeNumber(selectedBond.issuerAnalysis.marketCap)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">P/E Ratio:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.trailingPE.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">P/B Ratio:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.priceToBook.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Credit Risk Assessment */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Credit Risk Assessment
                      </h3>
                      
                      <div className="flex items-center mb-4">
                        <span className="text-gray-600 mr-3">Risk Level:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedBond.issuerAnalysis.creditRisk.level === 'LOW' ? 'bg-green-100 text-green-800' :
                          selectedBond.issuerAnalysis.creditRisk.level === 'LOW-MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          selectedBond.issuerAnalysis.creditRisk.level === 'MEDIUM' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedBond.issuerAnalysis.creditRisk.level}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">
                          (Score: {selectedBond.issuerAnalysis.creditRisk.score})
                        </span>
                      </div>

                      {selectedBond.issuerAnalysis.creditRisk.factors.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Risk Factors:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {selectedBond.issuerAnalysis.creditRisk.factors.map((factor, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedBond.issuerAnalysis.creditRisk.factors.length === 0 && (
                        <div className="flex items-center text-green-700">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm">No major risk factors identified</span>
                        </div>
                      )}
                    </div>

                    {/* Financial Metrics */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Profitability</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">ROE:</span>
                            <span className="font-medium">{(selectedBond.issuerAnalysis.returnOnEquity * 100).toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Profit Margin:</span>
                            <span className="font-medium">{(selectedBond.issuerAnalysis.profitMargins * 100).toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Financial Health</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Debt/Equity:</span>
                            <span className="font-medium">{selectedBond.issuerAnalysis.debtToEquity.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cash:</span>
                            <span className="font-medium">
                              {yahooFinanceService.formatLargeNumber(selectedBond.issuerAnalysis.totalCash)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Bond Info</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Coupon:</span>
                            <span className="font-medium">{selectedBond.bond.coupon}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-medium">₹{selectedBond.bond.last_traded_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Investment Recommendation */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        Investment Perspective
                      </h3>
                      
                      <div className="text-sm text-gray-700 space-y-2">
                        <p>
                          <strong>Credit Quality:</strong> Based on the issuer's financial metrics, this bond shows{' '}
                          <span className={selectedBond.issuerAnalysis.creditRisk.level === 'LOW' ? 'text-green-600' : 
                                        selectedBond.issuerAnalysis.creditRisk.level === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}>
                            {selectedBond.issuerAnalysis.creditRisk.level.toLowerCase()}
                          </span> credit risk.
                        </p>
                        
                        <p>
                          <strong>Issuer Strength:</strong> The company has a market cap of{' '}
                          {yahooFinanceService.formatLargeNumber(selectedBond.issuerAnalysis.marketCap)} and operates in the{' '}
                          {selectedBond.issuerAnalysis.sector.toLowerCase()} sector.
                        </p>

                        <div className="mt-3 p-3 bg-white rounded-lg border">
                          <p className="text-xs text-gray-600">
                            <Info className="w-4 h-4 inline mr-1" />
                            <strong>Disclaimer:</strong> This analysis is based on the bond issuer's stock market data and should be used alongside traditional credit ratings and bond-specific factors for investment decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Live Bond Prices */}
            <div className="lg:col-span-2 space-y-6">
            {/* Live Bond Prices */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                  Live Bond & ETF Prices
                </h2>
                <div className="text-sm text-gray-500">
                  Updated every minute
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading bond prices...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {bondPrices.map((bond, index) => {
                    // Find metadata for this bond
                    const getBondMetadata = (symbol: string): BondMetadata | null => {
                      for (const category of bondInstruments) {
                        const instrument = category.instruments.find((inst: BondInstrument) => inst.symbol === symbol);
                        if (instrument) {
                          return { ...instrument, category: category.category } as BondMetadata;
                        }
                      }
                      return null;
                    };
                    
                    const metadata = getBondMetadata(bond.symbol);
                    
                    return (
                      <motion.div
                        key={bond.symbol}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{metadata?.name || bond.shortName}</h3>
                              {metadata?.rating && (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  metadata.rating === 'AAA' ? 'bg-green-100 text-green-800' :
                                  metadata.rating.startsWith('AA') ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {metadata.rating}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{bond.symbol}</span>
                              {metadata && (
                                <>
                                  <span>•</span>
                                  <span>{metadata.type}</span>
                                  {metadata.issuer && (
                                    <>
                                      <span>•</span>
                                      <span>{metadata.issuer}</span>
                                    </>
                                  )}
                                  {metadata.coupon && (
                                    <>
                                      <span>•</span>
                                      <span>{metadata.coupon}% coupon</span>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {bond.currentPrice && bond.previousClose ? getPriceChangeIcon(bond.currentPrice, bond.previousClose) : null}
                            <span className="text-xl font-bold text-gray-900">
                              {bond.currentPrice ? yahooFinanceService.formatCurrency(bond.currentPrice, bond.currency) : 'N/A'}
                            </span>
                          </div>
                          <div className={`text-sm ${getPriceChangeColor(bond.currentPrice, bond.previousClose)}`}>
                            {bond.currentPrice && bond.previousClose ? (
                              <>
                                {yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).change >= 0 ? '+' : ''}
                                {yahooFinanceService.formatCurrency(
                                  yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).change, 
                                  bond.currency
                                )} 
                                ({yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).changePercent.toFixed(2)}%)
                              </>
                            ) : (
                              'N/A'
                            )}
                          </div>
                          </div>
                        </div>
                        
                        {/* Additional bond-specific information */}
                        {metadata && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {metadata.tax_benefit && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                  Tax Benefit
                                </span>
                              )}
                              {metadata.tax_exempt && (
                                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                                  Tax Exempt
                                </span>
                              )}
                              {metadata.maturity && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                  Maturity: {metadata.maturity}
                                </span>
                              )}
                              {metadata.focus && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {metadata.focus}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">High:</span>
                          <span className="ml-1 font-medium">
                            {bond.dayHigh ? yahooFinanceService.formatCurrency(bond.dayHigh, bond.currency) : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Low:</span>
                          <span className="ml-1 font-medium">
                            {bond.dayLow ? yahooFinanceService.formatCurrency(bond.dayLow, bond.currency) : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Volume:</span>
                          <span className="ml-1 font-medium">{bond.volume ? bond.volume.toLocaleString() : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Market Cap:</span>
                          <span className="ml-1 font-medium">
                            {bond.marketCap ? yahooFinanceService.formatLargeNumber(bond.marketCap, bond.currency) : 'N/A'}
                          </span>
                        </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

              {/* Live Bond Prices */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                    Live Bond & ETF Prices
                  </h2>
                  <div className="text-sm text-gray-500">
                    Updated every minute
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading bond prices...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bondPrices.map((bond, index) => {
                      // Find metadata for this bond
                      const getBondMetadata = (symbol: string): BondMetadata | null => {
                        for (const category of bondInstruments) {
                          const instrument = category.instruments.find((inst: BondInstrument) => inst.symbol === symbol);
                          if (instrument) {
                            return { ...instrument, category: category.category } as BondMetadata;
                          }
                        }
                        return null;
                      };
                      
                      const metadata = getBondMetadata(bond.symbol);
                      
                      return (
                        <motion.div
                          key={bond.symbol}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold text-gray-900">{metadata?.name || bond.shortName}</h3>
                                {metadata?.rating && (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    metadata.rating === 'AAA' ? 'bg-green-100 text-green-800' :
                                    metadata.rating.startsWith('AA') ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {metadata.rating}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{bond.symbol}</span>
                                {metadata && (
                                  <>
                                    <span>•</span>
                                    <span>{metadata.type}</span>
                                    {metadata.issuer && (
                                      <>
                                        <span>•</span>
                                        <span>{metadata.issuer}</span>
                                      </>
                                    )}
                                    {metadata.coupon && (
                                      <>
                                        <span>•</span>
                                        <span>{metadata.coupon}% coupon</span>
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              {bond.currentPrice && bond.previousClose ? getPriceChangeIcon(bond.currentPrice, bond.previousClose) : null}
                              <span className="text-xl font-bold text-gray-900">
                                {bond.currentPrice ? yahooFinanceService.formatCurrency(bond.currentPrice, bond.currency) : 'N/A'}
                              </span>
                            </div>
                            <div className={`text-sm ${getPriceChangeColor(bond.currentPrice, bond.previousClose)}`}>
                              {bond.currentPrice && bond.previousClose ? (
                                <>
                                  {yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).change >= 0 ? '+' : ''}
                                  {yahooFinanceService.formatCurrency(
                                    yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).change, 
                                    bond.currency
                                  )} 
                                  ({yahooFinanceService.calculateChange(bond.currentPrice, bond.previousClose).changePercent.toFixed(2)}%)
                                </>
                              ) : (
                                'N/A'
                              )}
                            </div>
                            </div>
                          </div>
                          
                          {/* Additional bond-specific information */}
                          {metadata && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex flex-wrap gap-2">
                                {metadata.tax_benefit && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                    Tax Benefit
                                  </span>
                                )}
                                {metadata.tax_exempt && (
                                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                                    Tax Exempt
                                  </span>
                                )}
                                {metadata.maturity && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                                    Maturity: {metadata.maturity}
                                  </span>
                                )}
                                {metadata.focus && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {metadata.focus}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">High:</span>
                            <span className="ml-1 font-medium">
                              {bond.dayHigh ? yahooFinanceService.formatCurrency(bond.dayHigh, bond.currency) : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Low:</span>
                            <span className="ml-1 font-medium">
                              {bond.dayLow ? yahooFinanceService.formatCurrency(bond.dayLow, bond.currency) : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Volume:</span>
                            <span className="ml-1 font-medium">{bond.volume ? bond.volume.toLocaleString() : 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Market Cap:</span>
                            <span className="ml-1 font-medium">
                              {bond.marketCap ? yahooFinanceService.formatLargeNumber(bond.marketCap, bond.currency) : 'N/A'}
                            </span>
                          </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Learning Modules */}
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
                  Bond Learning Modules
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    href="/investment-security-course/intro-to-bonds"
                    className="border border-blue-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        Bond Investment Fundamentals
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Master the basics of bonds, types, and market structure
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      Beginner • 30 min • 100 XP
                    </div>
                  </Link>

                  <Link
                    href="/investment-security-course/comprehensive-bond-strategies"
                    className="border border-green-200 rounded-lg p-4 hover:shadow-md hover:border-green-300 transition-all group"
                  >
                    <div className="flex items-center mb-2">
                      <Target className="w-5 h-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                        Advanced Bond Strategies
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Professional bond portfolio construction and management
                    </p>
                    <div className="text-xs text-green-600 font-medium">
                      Advanced • 2 hours • 250 XP
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Upload CSV for Analysis */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-6 sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-blue-600" />
                  CSV Bond Analysis
                </h2>

                <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Bond CSV
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload your bond CSV file to analyze issuer creditworthiness using our Yahoo Finance API
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => alert('CSV upload feature - integrate with file input')}
                  >
                    Choose File
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">What we analyze:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Bond issuer financial health</li>
                    <li>• Credit risk assessment</li>
                    <li>• Market performance metrics</li>
                    <li>• Portfolio concentration analysis</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Sample Analysis Available
                  </h4>
                  <p className="text-sm text-gray-700">
                    Try the Bond Analyzer tab to see how our system works with sample bonds from IRFC, NTPC, REC, and other major issuers.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
