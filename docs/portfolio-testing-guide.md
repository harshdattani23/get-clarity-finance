# Portfolio Testing Guide

This guide helps you manually test the portfolio system for bugs and edge cases.

## Prerequisites
- Ensure you're logged in to the application
- Have the browser console open to monitor logs
- Initial portfolio balance should be ₹100,000

## Test Cases

### 1. Basic Buy/Sell Flow
**Purpose**: Verify basic trade execution and balance updates

**Steps**:
1. Note your current cash balance
2. Buy 10 shares of any stock at current price
3. Verify:
   - Cash balance decreased by (quantity × price)
   - Holdings show the new position
   - Average price matches purchase price
4. Sell 5 shares of the same stock
5. Verify:
   - Cash balance increased by (5 × sell price)
   - Holdings quantity reduced to 5
   - Average price unchanged

**Expected Console Logs**:
```
Trade request: BUY 10 shares of [TICKER] at ₹[PRICE]
Updated user virtualCash to: ₹[NEW_BALANCE]
Created new holding: 10 shares at ₹[PRICE]
Trade completed successfully
```

### 2. Multiple Buy Orders (Average Price Test)
**Purpose**: Verify average price calculation

**Steps**:
1. Buy 10 shares of RELIANCE at ₹2500
2. Buy 5 more shares of RELIANCE at ₹2600
3. Calculate expected average: ((10 × 2500) + (5 × 2600)) / 15 = ₹2533.33
4. Verify holdings show:
   - Quantity: 15
   - Average Price: ₹2533.33

**Console should show**:
```
Updated existing holding: 15 shares at ₹2533.33 average
  Previous: 10 shares at ₹2500.00
  Added: 5 shares at ₹2600.00
  Total cost: ₹38000.00 for 15 shares
```

### 3. Sell All Shares (Holding Deletion)
**Purpose**: Verify holding is deleted when quantity reaches zero

**Steps**:
1. Buy 10 shares of any stock
2. Sell all 10 shares
3. Verify:
   - Holdings no longer show this stock
   - Cash balance updated correctly
   - Database holding record deleted

**Expected**: Holdings table should not show the stock after selling all shares

### 4. Insufficient Funds Test
**Purpose**: Verify validation prevents overspending

**Steps**:
1. Note current cash balance
2. Try to buy shares worth more than available cash
3. Verify:
   - Error message: "Insufficient funds to complete this transaction"
   - Cash balance unchanged
   - No new holdings created

### 5. Insufficient Holdings Test
**Purpose**: Verify validation prevents overselling

**Steps**:
1. Buy 5 shares of a stock
2. Try to sell 10 shares
3. Verify:
   - Error message: "Insufficient holdings"
   - Holdings unchanged
   - Cash balance unchanged

### 6. Decimal Price Handling
**Purpose**: Test precision with decimal prices

**Steps**:
1. Buy shares with decimal price (e.g., ₹99.95)
2. Buy more at different decimal price (e.g., ₹100.15)
3. Verify:
   - Average price calculated correctly
   - No rounding errors in display
   - Cash balance accurate to 2 decimal places

### 7. Rapid Sequential Trades
**Purpose**: Test for race conditions

**Steps**:
1. Quickly execute multiple buy orders without waiting
2. Verify:
   - All trades processed correctly
   - Final balance matches expected
   - No duplicate holdings created

### 8. Portfolio Refresh Test
**Purpose**: Verify UI updates after trades

**Steps**:
1. Open portfolio in two browser tabs
2. Make a trade in Tab 1
3. Manually refresh Tab 2
4. Verify both tabs show same:
   - Cash balance
   - Holdings
   - Portfolio value

### 9. Large Value Test
**Purpose**: Test with large numbers

**Steps**:
1. Buy 1000 shares at ₹10,000 each (if possible)
2. Verify:
   - Calculations remain accurate
   - No overflow or precision errors
   - Display formatting correct

### 10. Zero/Negative Input Prevention
**Purpose**: Verify input validation

**Steps**:
1. Try to buy 0 shares
2. Try to enter negative quantity
3. Try to enter 0 or negative price
4. Verify:
   - All attempts are prevented
   - Appropriate error messages shown
   - No API calls made

## Debugging Tools

### Using Portfolio Diagnostics Component
Add the PortfolioDiagnostics component to your page:
```tsx
import { PortfolioDiagnostics } from '@/components/virtual-trading/PortfolioDiagnostics';

// In your page:
<PortfolioDiagnostics />
```

This will show:
- Current portfolio state
- Any calculation issues
- Precision warnings
- Holdings details

### Console Commands for Testing
You can run these in browser console:

```javascript
// Check portfolio state
const response = await fetch('/api/portfolio');
const data = await response.json();
console.log('Portfolio:', data);

// Simulate a buy order
const trade = await fetch('/api/trade', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ticker: 'TCS',
    quantity: 5,
    price: 3500,
    tradeType: 'BUY'
  })
});
console.log('Trade result:', await trade.json());
```

## Common Issues and Solutions

### Issue: Cash balance not updating
**Check**:
- Browser console for errors
- Network tab for failed API calls
- Database transaction logs

### Issue: Average price calculation wrong
**Check**:
- Previous holding quantity and price
- New trade quantity and price
- Formula: (oldQty × oldPrice + newQty × newPrice) / (oldQty + newQty)

### Issue: Holdings not showing
**Check**:
- Portfolio context is loaded
- API returns holdings data
- Component properly maps holdings array

### Issue: Decimal precision errors
**Check**:
- Database Decimal type handling
- JavaScript number conversion
- Display formatting (toFixed(2))

## Reporting Bugs

When reporting a bug, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Console logs
5. Network requests/responses
6. Screenshots if applicable

## Database Verification Queries

Run these in your database client:

```sql
-- Check user's cash balance
SELECT "virtualCash" FROM "User" WHERE "clerkId" = '[USER_ID]';

-- Check user's holdings
SELECT * FROM "PortfolioHolding" WHERE "userClerkId" = '[USER_ID]';

-- Check recent trades
SELECT * FROM "VirtualTrade" 
WHERE "userClerkId" = '[USER_ID]' 
ORDER BY "tradedAt" DESC 
LIMIT 10;

-- Verify holding calculations
SELECT 
  ticker,
  quantity,
  "averagePrice",
  quantity * "averagePrice" as "totalInvested"
FROM "PortfolioHolding" 
WHERE "userClerkId" = '[USER_ID]';
```
