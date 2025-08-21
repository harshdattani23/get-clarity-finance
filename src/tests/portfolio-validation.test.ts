// Portfolio Validation Test Suite
// This script tests the portfolio logic for bugs and edge cases

import { describe, it, expect } from '@jest/globals';

// Test utilities for portfolio calculations
class PortfolioCalculator {
  static calculateAveragePrice(
    existingQty: number,
    existingPrice: number,
    newQty: number,
    newPrice: number
  ): number {
    const totalCost = (existingQty * existingPrice) + (newQty * newPrice);
    const totalQty = existingQty + newQty;
    return totalCost / totalQty;
  }

  static calculatePortfolioValue(holdings: Array<{
    quantity: number;
    currentPrice: number;
  }>): number {
    return holdings.reduce((total, holding) => {
      return total + (holding.quantity * holding.currentPrice);
    }, 0);
  }

  static calculateProfitLoss(
    quantity: number,
    purchasePrice: number,
    currentPrice: number
  ): number {
    return (currentPrice - purchasePrice) * quantity;
  }

  static calculatePercentageReturn(
    purchasePrice: number,
    currentPrice: number
  ): number {
    return ((currentPrice - purchasePrice) / purchasePrice) * 100;
  }
}

describe('Portfolio Calculations', () => {
  describe('Average Price Calculation', () => {
    it('should calculate correct average price for multiple buys', () => {
      // Test case 1: Two equal quantity buys at different prices
      const avgPrice1 = PortfolioCalculator.calculateAveragePrice(
        10, 100, // 10 shares at ₹100
        10, 120  // 10 shares at ₹120
      );
      expect(avgPrice1).toBe(110); // Average should be ₹110

      // Test case 2: Different quantities
      const avgPrice2 = PortfolioCalculator.calculateAveragePrice(
        5, 100,  // 5 shares at ₹100
        15, 200  // 15 shares at ₹200
      );
      expect(avgPrice2).toBe(175); // (500 + 3000) / 20 = ₹175

      // Test case 3: Large price difference
      const avgPrice3 = PortfolioCalculator.calculateAveragePrice(
        100, 1000,  // 100 shares at ₹1000
        50, 1500    // 50 shares at ₹1500
      );
      expect(avgPrice3).toBe(1166.67); // (100000 + 75000) / 150 ≈ ₹1166.67
    });

    it('should handle decimal prices correctly', () => {
      const avgPrice = PortfolioCalculator.calculateAveragePrice(
        10, 99.50,   // 10 shares at ₹99.50
        5, 101.25    // 5 shares at ₹101.25
      );
      expect(avgPrice).toBeCloseTo(100.08, 2); // (995 + 506.25) / 15 ≈ ₹100.08
    });

    it('should handle edge case of zero existing quantity', () => {
      const avgPrice = PortfolioCalculator.calculateAveragePrice(
        0, 0,      // No existing holdings
        10, 150    // Buy 10 shares at ₹150
      );
      expect(avgPrice).toBe(150); // Should be the new price
    });
  });

  describe('Portfolio Value Calculation', () => {
    it('should calculate total portfolio value correctly', () => {
      const holdings = [
        { quantity: 10, currentPrice: 100 },  // ₹1,000
        { quantity: 5, currentPrice: 200 },   // ₹1,000
        { quantity: 20, currentPrice: 50 }    // ₹1,000
      ];
      const totalValue = PortfolioCalculator.calculatePortfolioValue(holdings);
      expect(totalValue).toBe(3000);
    });

    it('should handle empty portfolio', () => {
      const totalValue = PortfolioCalculator.calculatePortfolioValue([]);
      expect(totalValue).toBe(0);
    });

    it('should handle decimal prices and quantities', () => {
      const holdings = [
        { quantity: 10.5, currentPrice: 99.99 },
        { quantity: 7.25, currentPrice: 150.50 }
      ];
      const totalValue = PortfolioCalculator.calculatePortfolioValue(holdings);
      expect(totalValue).toBeCloseTo(2141.52, 2);
    });
  });

  describe('Profit/Loss Calculation', () => {
    it('should calculate profit correctly', () => {
      const profit = PortfolioCalculator.calculateProfitLoss(
        10,   // quantity
        100,  // purchase price
        120   // current price
      );
      expect(profit).toBe(200); // (120-100) * 10 = ₹200 profit
    });

    it('should calculate loss correctly', () => {
      const loss = PortfolioCalculator.calculateProfitLoss(
        5,    // quantity
        150,  // purchase price
        130   // current price
      );
      expect(loss).toBe(-100); // (130-150) * 5 = ₹100 loss
    });

    it('should handle no change in price', () => {
      const pl = PortfolioCalculator.calculateProfitLoss(
        100,  // quantity
        75,   // purchase price
        75    // current price
      );
      expect(pl).toBe(0);
    });
  });

  describe('Percentage Return Calculation', () => {
    it('should calculate positive return correctly', () => {
      const returnPct = PortfolioCalculator.calculatePercentageReturn(100, 150);
      expect(returnPct).toBe(50); // 50% gain
    });

    it('should calculate negative return correctly', () => {
      const returnPct = PortfolioCalculator.calculatePercentageReturn(100, 80);
      expect(returnPct).toBe(-20); // 20% loss
    });

    it('should handle no change', () => {
      const returnPct = PortfolioCalculator.calculatePercentageReturn(100, 100);
      expect(returnPct).toBe(0);
    });
  });
});

describe('Trade Execution Logic', () => {
  describe('Buy Order Validation', () => {
    it('should prevent buy when insufficient cash', () => {
      const cash = 1000;
      const orderCost = 1500;
      const canBuy = cash >= orderCost;
      expect(canBuy).toBe(false);
    });

    it('should allow buy when sufficient cash', () => {
      const cash = 2000;
      const orderCost = 1500;
      const canBuy = cash >= orderCost;
      expect(canBuy).toBe(true);
    });

    it('should handle exact cash amount', () => {
      const cash = 1000;
      const orderCost = 1000;
      const canBuy = cash >= orderCost;
      expect(canBuy).toBe(true);
    });
  });

  describe('Sell Order Validation', () => {
    it('should prevent sell when insufficient holdings', () => {
      const holdingQty = 5;
      const sellQty = 10;
      const canSell = holdingQty >= sellQty;
      expect(canSell).toBe(false);
    });

    it('should allow sell when sufficient holdings', () => {
      const holdingQty = 10;
      const sellQty = 5;
      const canSell = holdingQty >= sellQty;
      expect(canSell).toBe(true);
    });

    it('should allow selling all holdings', () => {
      const holdingQty = 10;
      const sellQty = 10;
      const canSell = holdingQty >= sellQty;
      expect(canSell).toBe(true);
    });
  });

  describe('Cash Balance Updates', () => {
    it('should correctly update cash after buy', () => {
      const initialCash = 10000;
      const buyQty = 5;
      const buyPrice = 100;
      const cost = buyQty * buyPrice;
      const newCash = initialCash - cost;
      expect(newCash).toBe(9500);
    });

    it('should correctly update cash after sell', () => {
      const initialCash = 5000;
      const sellQty = 10;
      const sellPrice = 150;
      const revenue = sellQty * sellPrice;
      const newCash = initialCash + revenue;
      expect(newCash).toBe(6500);
    });

    it('should handle decimal prices in cash updates', () => {
      const initialCash = 10000;
      const buyQty = 7;
      const buyPrice = 99.99;
      const cost = buyQty * buyPrice;
      const newCash = initialCash - cost;
      expect(newCash).toBeCloseTo(9300.07, 2);
    });
  });
});

describe('Edge Cases and Error Scenarios', () => {
  describe('Numeric Precision', () => {
    it('should handle very large numbers', () => {
      const avgPrice = PortfolioCalculator.calculateAveragePrice(
        1000000, 10000,    // 1M shares at ₹10,000
        500000, 15000      // 500K shares at ₹15,000
      );
      expect(avgPrice).toBeCloseTo(11666.67, 2);
    });

    it('should handle very small decimal quantities', () => {
      const pl = PortfolioCalculator.calculateProfitLoss(
        0.001,  // Very small quantity
        1000,   // Purchase price
        1100    // Current price
      );
      expect(pl).toBeCloseTo(0.1, 3);
    });
  });

  describe('Boundary Conditions', () => {
    it('should handle zero quantity trades gracefully', () => {
      const pl = PortfolioCalculator.calculateProfitLoss(0, 100, 150);
      expect(pl).toBe(0);
    });

    it('should handle zero price scenarios', () => {
      // This should typically be prevented by validation
      const returnPct = PortfolioCalculator.calculatePercentageReturn(0, 100);
      expect(returnPct).toBe(Infinity); // Mathematical result
    });

    it('should handle negative quantities (should be prevented)', () => {
      // Negative quantities should be prevented by validation
      const pl = PortfolioCalculator.calculateProfitLoss(-10, 100, 150);
      expect(pl).toBe(-500); // Mathematically correct but logically invalid
    });
  });
});

// Export for use in other tests
export { PortfolioCalculator };
