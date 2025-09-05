'use client';

import { DollarSign, TrendingUp, TrendingDown, BarChart3, Activity, Target, Percent, Calendar, Users, Building } from 'lucide-react';
import { StockInfo as YahooStockInfo } from '@/services/yahooFinanceApi';
import yahooFinanceService from '@/services/yahooFinanceApi';

interface StockInfoProps {
  stock: {
    name: string;
    description: string;
    marketCap: number;
    peRatio?: number | null;
    eps?: number | null;
    dividendYield?: number | null;
    week52High?: number | null;
    week52Low?: number | null;
    sector?: string;
    industry?: string;
    website?: string;
    ceo?: string;
    headquarters?: string;
    employees?: number;
  };
  enhancedData?: YahooStockInfo | null;
}

export default function StockInfo({ stock, enhancedData }: StockInfoProps) {
  // Helper function to format large numbers
  const formatLargeNumber = (value: number | null | undefined, currency?: string) => {
    if (!value) return 'N/A';
    return yahooFinanceService.formatLargeNumber(value, currency || 'INR');
  };

  // Helper function to format currency
  const formatCurrency = (value: number | null | undefined, currency?: string) => {
    if (!value) return 'N/A';
    return yahooFinanceService.formatCurrency(value, currency || 'INR');
  };

  // Helper function to format percentage
  const formatPercentage = (value: number | null | undefined) => {
    if (!value && value !== 0) return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };

  // Helper function to get color for positive/negative values
  const getValueColor = (value: number | null | undefined) => {
    if (!value && value !== 0) return 'text-white';
    return value > 0 ? 'text-green-400' : value < 0 ? 'text-red-400' : 'text-white';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      {/* Company Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Building className="h-6 w-6 mr-2 text-blue-400" />
          About {stock.name}
        </h2>
        <p className="text-gray-400 mb-4 leading-relaxed">
          {enhancedData?.longBusinessSummary || stock.description || 'No description available.'}
        </p>
        
        {/* Company Details */}
        {(enhancedData?.sector || enhancedData?.industry || stock.ceo || enhancedData?.fullTimeEmployees) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {(enhancedData?.sector || stock.sector) && (
              <div className="text-sm">
                <span className="text-gray-500">Sector:</span>
                <p className="text-white font-medium">{enhancedData?.sector || stock.sector}</p>
              </div>
            )}
            {(enhancedData?.industry || stock.industry) && (
              <div className="text-sm">
                <span className="text-gray-500">Industry:</span>
                <p className="text-white font-medium">{enhancedData?.industry || stock.industry}</p>
              </div>
            )}
            {enhancedData?.fullTimeEmployees && (
              <div className="text-sm">
                <span className="text-gray-500 flex items-center">
                  <Users className="h-3 w-3 mr-1" />Employees:
                </span>
                <p className="text-white font-medium">{enhancedData.fullTimeEmployees.toLocaleString()}</p>
              </div>
            )}
            {(enhancedData?.city || stock.headquarters) && (
              <div className="text-sm">
                <span className="text-gray-500">Headquarters:</span>
                <p className="text-white font-medium">{enhancedData?.city || stock.headquarters}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold mb-4 flex items-center">
        <BarChart3 className="h-5 w-5 mr-2 text-green-400" />
        Key Statistics
      </h3>
      
      {/* Market Valuation Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-300 flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-blue-400" />
          Market Valuation
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Market Cap</h5>
              <DollarSign className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatLargeNumber(enhancedData?.marketCap || stock.marketCap, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Total Revenue</h5>
              <Building className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatLargeNumber(enhancedData?.totalRevenue, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Book Value</h5>
              <BarChart3 className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(enhancedData?.bookValue, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Price to Book</h5>
              <Target className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {enhancedData?.priceToBook ? enhancedData.priceToBook.toFixed(2) : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Financial Performance Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-300 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
          Financial Performance
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">P/E Ratio (TTM)</h5>
              <Activity className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {enhancedData?.trailingPE?.toFixed(2) || (stock.peRatio ? stock.peRatio.toFixed(2) : 'N/A')}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Forward P/E</h5>
              <Activity className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {enhancedData?.forwardPE ? enhancedData.forwardPE.toFixed(2) : 'N/A'}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">EPS (TTM)</h5>
              <DollarSign className="h-4 w-4 text-green-400" />
            </div>
            <p className={`text-lg font-bold ${getValueColor(enhancedData?.trailingEps)}`}>
              {formatCurrency(enhancedData?.trailingEps || stock.eps, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Total Cash</h5>
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatLargeNumber(enhancedData?.totalCash, enhancedData?.currency)}
            </p>
          </div>
        </div>
      </div>

      {/* Trading & Dividends Section */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3 text-gray-300 flex items-center">
          <Activity className="h-4 w-4 mr-2 text-yellow-400" />
          Trading & Dividends
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">52-Week High</h5>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(enhancedData?.fiftyTwoWeekHigh || stock.week52High, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">52-Week Low</h5>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {formatCurrency(enhancedData?.fiftyTwoWeekLow || stock.week52Low, enhancedData?.currency)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Dividend Yield</h5>
              <Percent className="h-4 w-4 text-blue-400" />
            </div>
            <p className={`text-lg font-bold ${getValueColor(enhancedData?.dividendYield || stock.dividendYield)}`}>
              {formatPercentage(enhancedData?.dividendYield || stock.dividendYield)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Volume</h5>
              <Activity className="h-4 w-4 text-orange-400" />
            </div>
            <p className="text-lg font-bold text-white">
              {enhancedData?.volume ? enhancedData.volume.toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Ratios */}
      <div>
        <h4 className="text-lg font-semibold mb-3 text-gray-300 flex items-center">
          <Target className="h-4 w-4 mr-2 text-purple-400" />
          Additional Metrics
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Profit Margin</h5>
              <Percent className="h-4 w-4 text-green-400" />
            </div>
            <p className={`text-lg font-bold ${getValueColor(enhancedData?.profitMargins)}`}>
              {formatPercentage(enhancedData?.profitMargins)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Revenue Growth</h5>
              <BarChart3 className="h-4 w-4 text-blue-400" />
            </div>
            <p className={`text-lg font-bold ${getValueColor(enhancedData?.revenueGrowth)}`}>
              {formatPercentage(enhancedData?.revenueGrowth)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Return on Equity</h5>
              <TrendingUp className="h-4 w-4 text-yellow-400" />
            </div>
            <p className={`text-lg font-bold ${getValueColor(enhancedData?.returnOnEquity)}`}>
              {formatPercentage(enhancedData?.returnOnEquity)}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-1">
              <h5 className="font-medium text-gray-400 text-sm">Debt to Equity</h5>
              <Activity className="h-4 w-4 text-red-400" />
            </div>
            <p className={`text-lg font-bold ${enhancedData?.debtToEquity && enhancedData.debtToEquity > 100 ? 'text-red-400' : 'text-green-400'}`}>
              {enhancedData?.debtToEquity ? enhancedData.debtToEquity.toFixed(1) : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
