// Portfolio Debugging Utilities
// This script helps identify and fix calculation issues in the portfolio

import { Decimal } from '@prisma/client/runtime/library';

export class PortfolioDebugger {
  /**
   * Validates that the average price calculation is correct
   * Formula: newAvgPrice = (oldPrice * oldQty + newPrice * newQty) / (oldQty + newQty)
   */
  static validateAveragePrice(
    existingQty: number,
    existingPrice: number | Decimal,
    newQty: number,
    newPrice: number | Decimal
  ): {
    isValid: boolean;
    calculatedAvg: number;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Convert Decimal to number if needed
    const oldPrice = typeof existingPrice === 'number' ? existingPrice : existingPrice.toNumber();
    const buyPrice = typeof newPrice === 'number' ? newPrice : newPrice.toNumber();
    
    // Validate inputs
    if (existingQty < 0) errors.push('Existing quantity cannot be negative');
    if (newQty <= 0) errors.push('New quantity must be positive');
    if (oldPrice < 0) errors.push('Existing price cannot be negative');
    if (buyPrice <= 0) errors.push('New price must be positive');
    
    // Calculate average price
    const totalCost = (existingQty * oldPrice) + (newQty * buyPrice);
    const totalQty = existingQty + newQty;
    const calculatedAvg = totalQty > 0 ? totalCost / totalQty : 0;
    
    // Check for NaN or Infinity
    if (isNaN(calculatedAvg)) {
      errors.push('Calculated average price is NaN');
    }
    if (!isFinite(calculatedAvg)) {
      errors.push('Calculated average price is Infinity');
    }
    
    return {
      isValid: errors.length === 0,
      calculatedAvg,
      errors
    };
  }

  /**
   * Validates cash balance updates for buy orders
   */
  static validateBuyOrder(
    currentCash: number | Decimal,
    orderQuantity: number,
    orderPrice: number | Decimal
  ): {
    isValid: boolean;
    totalCost: number;
    remainingCash: number;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Convert Decimal to number if needed
    const cash = typeof currentCash === 'number' ? currentCash : currentCash.toNumber();
    const price = typeof orderPrice === 'number' ? orderPrice : orderPrice.toNumber();
    
    // Validate inputs
    if (cash < 0) errors.push('Current cash cannot be negative');
    if (orderQuantity <= 0) errors.push('Order quantity must be positive');
    if (price <= 0) errors.push('Order price must be positive');
    
    // Calculate cost
    const totalCost = orderQuantity * price;
    const remainingCash = cash - totalCost;
    
    // Check if sufficient funds
    if (remainingCash < 0) {
      errors.push(`Insufficient funds: Need ₹${totalCost.toFixed(2)}, Have ₹${cash.toFixed(2)}`);
    }
    
    // Check for precision issues
    if (totalCost !== Math.round(totalCost * 100) / 100) {
      console.warn(`Precision warning: Total cost ${totalCost} may have rounding issues`);
    }
    
    return {
      isValid: errors.length === 0,
      totalCost,
      remainingCash,
      errors
    };
  }

  /**
   * Validates sell order and cash updates
   */
  static validateSellOrder(
    currentHoldings: number,
    currentCash: number | Decimal,
    sellQuantity: number,
    sellPrice: number | Decimal
  ): {
    isValid: boolean;
    revenue: number;
    newCash: number;
    remainingHoldings: number;
    errors: string[];
  } {
    const errors: string[] = [];
    
    // Convert Decimal to number if needed
    const cash = typeof currentCash === 'number' ? currentCash : currentCash.toNumber();
    const price = typeof sellPrice === 'number' ? sellPrice : sellPrice.toNumber();
    
    // Validate inputs
    if (currentHoldings < 0) errors.push('Current holdings cannot be negative');
    if (cash < 0) errors.push('Current cash cannot be negative');
    if (sellQuantity <= 0) errors.push('Sell quantity must be positive');
    if (price <= 0) errors.push('Sell price must be positive');
    
    // Check if sufficient holdings
    if (currentHoldings < sellQuantity) {
      errors.push(`Insufficient holdings: Have ${currentHoldings}, Trying to sell ${sellQuantity}`);
    }
    
    // Calculate revenue
    const revenue = sellQuantity * price;
    const newCash = cash + revenue;
    const remainingHoldings = currentHoldings - sellQuantity;
    
    return {
      isValid: errors.length === 0,
      revenue,
      newCash,
      remainingHoldings,
      errors
    };
  }

  /**
   * Checks for common portfolio calculation issues
   */
  static diagnosePortfolioIssues(portfolio: {
    cash: number | Decimal;
    holdings: Array<{
      ticker: string;
      quantity: number;
      averagePrice: number | Decimal;
    }>;
  }): {
    issues: string[];
    warnings: string[];
    summary: {
      totalInvested: number;
      holdingsCount: number;
      hasNegativeValues: boolean;
      hasPrecisionIssues: boolean;
    };
  } {
    const issues: string[] = [];
    const warnings: string[] = [];
    
    const cash = typeof portfolio.cash === 'number' ? portfolio.cash : portfolio.cash.toNumber();
    
    // Check cash balance
    if (cash < 0) {
      issues.push('Negative cash balance detected');
    }
    if (isNaN(cash)) {
      issues.push('Cash balance is NaN');
    }
    if (!isFinite(cash)) {
      issues.push('Cash balance is Infinity');
    }
    
    // Check holdings
    let totalInvested = 0;
    let hasNegativeValues = false;
    let hasPrecisionIssues = false;
    
    portfolio.holdings.forEach(holding => {
      const avgPrice = typeof holding.averagePrice === 'number' 
        ? holding.averagePrice 
        : holding.averagePrice.toNumber();
      
      // Check for negative values
      if (holding.quantity < 0) {
        issues.push(`${holding.ticker}: Negative quantity (${holding.quantity})`);
        hasNegativeValues = true;
      }
      if (avgPrice < 0) {
        issues.push(`${holding.ticker}: Negative average price (₹${avgPrice})`);
        hasNegativeValues = true;
      }
      
      // Check for NaN or Infinity
      if (isNaN(avgPrice)) {
        issues.push(`${holding.ticker}: Average price is NaN`);
      }
      if (!isFinite(avgPrice)) {
        issues.push(`${holding.ticker}: Average price is Infinity`);
      }
      
      // Check for precision issues
      const invested = holding.quantity * avgPrice;
      if (invested !== Math.round(invested * 100) / 100) {
        warnings.push(`${holding.ticker}: Potential precision issue in invested amount`);
        hasPrecisionIssues = true;
      }
      
      totalInvested += invested;
    });
    
    // Check total portfolio value
    const totalValue = cash + totalInvested;
    if (totalValue < 0) {
      issues.push('Total portfolio value is negative');
    }
    
    return {
      issues,
      warnings,
      summary: {
        totalInvested,
        holdingsCount: portfolio.holdings.length,
        hasNegativeValues,
        hasPrecisionIssues
      }
    };
  }

  /**
   * Formats decimal values consistently
   */
  static formatDecimal(value: number | Decimal, decimals: number = 2): string {
    const num = typeof value === 'number' ? value : value.toNumber();
    return num.toFixed(decimals);
  }

  /**
   * Safely converts Decimal to number with validation
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  static safeDecimalToNumber(value: unknown): number {
    if (typeof value === 'number') return value;
    if (value && typeof (value as any).toNumber === 'function') return (value as any).toNumber();
    if (value && typeof (value as any).toString === 'function') {
      const parsed = parseFloat((value as any).toString());
      if (!isNaN(parsed)) return parsed;
    }
    console.error('Failed to convert value to number:', value);
    return 0;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

// Export utility functions for use in components
export const {
  validateAveragePrice,
  validateBuyOrder,
  validateSellOrder,
  diagnosePortfolioIssues,
  formatDecimal,
  safeDecimalToNumber
} = PortfolioDebugger;
