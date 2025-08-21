'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/contexts/virtual-trading/PortfolioContext';
import { diagnosePortfolioIssues, safeDecimalToNumber } from '@/utils/portfolio-debugger';
import { AlertCircle, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function PortfolioDiagnostics() {
  const { portfolio, refreshPortfolio } = usePortfolio();
  interface DiagnosticsResult {
    error?: string;
    issues: string[];
    warnings: string[];
    summary: {
      totalInvested: number;
      hasNegativeValues: boolean;
      hasPrecisionIssues: boolean;
    } | null;
  }
  
  const [diagnostics, setDiagnostics] = useState<DiagnosticsResult | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => {
    const runDiagnostics = () => {
      if (!portfolio) {
        setDiagnostics({
          error: 'Portfolio not loaded',
          issues: ['Portfolio data is not available'],
          warnings: [],
          summary: null
        });
        return;
      }

      const result = diagnosePortfolioIssues({
        cash: portfolio.cash,
        holdings: portfolio.holdings.map(h => ({
          ticker: h.ticker,
          quantity: h.quantity,
          averagePrice: h.averagePrice
        }))
      });

      setDiagnostics(result);
    };
    
    runDiagnostics();
  }, [portfolio]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshPortfolio();
      // Diagnostics will run automatically via useEffect when portfolio updates
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!diagnostics) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-500">Loading diagnostics...</p>
      </div>
    );
  }

  const hasIssues = diagnostics.issues && diagnostics.issues.length > 0;
  const hasWarnings = diagnostics.warnings && diagnostics.warnings.length > 0;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Portfolio Diagnostics</h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Status Overview */}
      <div className="mb-4">
        <div className={`flex items-center gap-2 p-2 rounded ${
          hasIssues ? 'bg-red-50 text-red-700' : 
          hasWarnings ? 'bg-yellow-50 text-yellow-700' : 
          'bg-green-50 text-green-700'
        }`}>
          {hasIssues ? (
            <AlertCircle className="w-5 h-5" />
          ) : hasWarnings ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
          <span className="font-medium">
            {hasIssues ? 'Critical Issues Detected' : 
             hasWarnings ? 'Warnings Found' : 
             'Portfolio Healthy'}
          </span>
        </div>
      </div>

      {/* Portfolio Summary */}
      {portfolio && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <h4 className="font-medium mb-2">Current State:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Cash Balance:</span>
              <span className="font-mono">₹{safeDecimalToNumber(portfolio.cash).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Holdings Count:</span>
              <span className="font-mono">{portfolio.holdings.length}</span>
            </div>
            {diagnostics.summary && (
              <>
                <div className="flex justify-between">
                  <span>Total Invested:</span>
                  <span className="font-mono">₹{diagnostics.summary.totalInvested.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Portfolio Value:</span>
                  <span className="font-mono">
                    ₹{(safeDecimalToNumber(portfolio.cash) + diagnostics.summary.totalInvested).toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Issues */}
      {hasIssues && (
        <div className="mb-4">
          <h4 className="font-medium text-red-700 mb-2">Issues ({diagnostics.issues.length}):</h4>
          <ul className="space-y-1">
            {diagnostics.issues.map((issue: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm text-red-600">
                <span className="text-red-400 mt-0.5">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {hasWarnings && (
        <div className="mb-4">
          <h4 className="font-medium text-yellow-700 mb-2">Warnings ({diagnostics.warnings.length}):</h4>
          <ul className="space-y-1">
            {diagnostics.warnings.map((warning: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm text-yellow-600">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Holdings Details */}
      {portfolio && portfolio.holdings.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Holdings Details:</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Ticker</th>
                  <th className="text-right py-1">Qty</th>
                  <th className="text-right py-1">Avg Price</th>
                  <th className="text-right py-1">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => {
                  const avgPrice = safeDecimalToNumber(holding.averagePrice);
                  const totalValue = holding.quantity * avgPrice;
                  return (
                    <tr key={holding.ticker} className="border-b">
                      <td className="py-1">{holding.ticker}</td>
                      <td className="text-right font-mono">{holding.quantity}</td>
                      <td className="text-right font-mono">₹{avgPrice.toFixed(2)}</td>
                      <td className="text-right font-mono">₹{totalValue.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {diagnostics.summary && (
        <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <div className="font-mono space-y-1">
            <div>Has Negative Values: {diagnostics.summary.hasNegativeValues ? 'Yes' : 'No'}</div>
            <div>Has Precision Issues: {diagnostics.summary.hasPrecisionIssues ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
