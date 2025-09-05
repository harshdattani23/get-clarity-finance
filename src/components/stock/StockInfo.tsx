'use client';

import { DollarSign, TrendingUp, TrendingDown, BarChart3, Activity, Target, Percent, Calendar, Users, Building } from 'lucide-react';
import { StockInfo as YahooStockInfo } from '@/services/yahooFinanceApi';
import yahooFinanceService from '@/services/yahooFinanceApi';

// Consistent card styling component
const StatCard = ({ title, value, icon, className = "" }: {
  title: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  className?: string;
}) => (
  <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 min-h-[80px] flex flex-col justify-between">
    <div className="flex items-center justify-between mb-2">
      <h5 className="font-medium text-gray-400 text-xs leading-tight">{title}</h5>
      <div className="flex-shrink-0">{icon}</div>
    </div>
    <div className={`text-sm font-bold break-words ${className}`}>
      {value}
    </div>
  </div>
);

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
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Building className="h-5 w-5 mr-2 text-blue-400" />
          Company Overview
        </h2>
      </div>
      
      <div className="p-6">
        {/* Company Information */}
        <div className="mb-6">
          <p className="text-gray-300 mb-4 leading-relaxed text-sm">
            {enhancedData?.longBusinessSummary || stock.description || 'No description available.'}
          </p>
          
          {/* Company Details */}
          {(enhancedData?.sector || enhancedData?.industry || stock.ceo || enhancedData?.fullTimeEmployees) && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-700/30 rounded-lg">
              {(enhancedData?.sector || stock.sector) && (
                <div className="text-xs">
                  <span className="text-gray-400 block">Sector</span>
                  <p className="text-white font-medium">{enhancedData?.sector || stock.sector}</p>
                </div>
              )}
              {(enhancedData?.industry || stock.industry) && (
                <div className="text-xs">
                  <span className="text-gray-400 block">Industry</span>
                  <p className="text-white font-medium">{enhancedData?.industry || stock.industry}</p>
                </div>
              )}
              {enhancedData?.fullTimeEmployees && (
                <div className="text-xs">
                  <span className="text-gray-400 block flex items-center">
                    <Users className="h-3 w-3 mr-1" />Employees
                  </span>
                  <p className="text-white font-medium">{enhancedData.fullTimeEmployees.toLocaleString()}</p>
                </div>
              )}
              {(enhancedData?.city || stock.headquarters) && (
                <div className="text-xs">
                  <span className="text-gray-400 block">Headquarters</span>
                  <p className="text-white font-medium">{enhancedData?.city || stock.headquarters}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Key Statistics Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-green-400" />
            Key Statistics
          </h3>
        </div>
        {/* Market Valuation Section */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-gray-400 flex items-center">
            <DollarSign className="h-3 w-3 mr-1 text-blue-400" />
            Market Valuation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            <StatCard
              title="Market Cap"
              value={formatLargeNumber(enhancedData?.marketCap || stock.marketCap, enhancedData?.currency)}
              icon={<DollarSign className="h-4 w-4 text-blue-400" />}
              className="text-white"
            />
            <StatCard
              title="Total Revenue"
              value={formatLargeNumber(enhancedData?.totalRevenue, enhancedData?.currency)}
              icon={<Building className="h-4 w-4 text-purple-400" />}
              className="text-white"
            />
            <StatCard
              title="Book Value"
              value={formatCurrency(enhancedData?.bookValue, enhancedData?.currency)}
              icon={<BarChart3 className="h-4 w-4 text-green-400" />}
              className="text-white"
            />
            <StatCard
              title="Price to Book"
              value={enhancedData?.priceToBook ? enhancedData.priceToBook.toFixed(2) : 'N/A'}
              icon={<Target className="h-4 w-4 text-yellow-400" />}
              className="text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
