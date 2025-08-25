# Perplexity News Synthesis - Sector and Regulatory News Fix

## Problem Statement
The news synthesis feature was not properly handling sector-based filtering and was not emphasizing regulatory news from SEBI and RBI as required for the Indian financial market context.

## Solution Implemented

### 1. Enhanced Sector Parameter Handling
**File:** `src/lib/ai/perplexity.ts`

- Added `sector` parameter to the `NewsSynthesisParams` interface
- Updated `buildUserPrompt` function to properly handle sector filtering with detailed mappings:

```typescript
const sectorMap: Record<string, string> = {
  'banking': 'Indian banking sector, PSU banks, private banks, HDFC Bank, ICICI Bank, SBI, Axis Bank, RBI banking regulations',
  'it': 'Indian IT sector, TCS, Infosys, Wipro, HCL Tech, Tech Mahindra, IT services exports',
  'pharma': 'Indian pharmaceutical sector, Sun Pharma, Dr Reddy, Cipla, Lupin, drug approvals, FDA',
  'auto': 'Indian automobile sector, Maruti Suzuki, Tata Motors, Mahindra, Bajaj Auto, EV market',
  'energy': 'Indian energy sector, Reliance, ONGC, power companies, renewable energy, coal, oil prices',
  'fmcg': 'Indian FMCG sector, HUL, ITC, Nestle India, Britannia, consumer goods',
  'realty': 'Indian real estate sector, DLF, Godrej Properties, housing market, property prices',
  'metals': 'Indian metals and mining sector, Tata Steel, JSW Steel, Hindalco, coal mining, iron ore',
  'regulatory': 'SEBI regulations, RBI monetary policy, NSE BSE circulars, regulatory updates, compliance changes'
};
```

### 2. Added Regulatory Sector
**File:** `src/config/news.ts`

- Added a dedicated 'regulatory' sector to MARKET_SECTORS:
```typescript
{ id: 'regulatory', label: 'SEBI/RBI', icon: '📋' }
```

### 3. Updated News Widget UI
**File:** `src/components/shared/ExplainedNewsWidget.tsx`

- Prioritized the regulatory sector button by placing it first in the filter list
- Updated the sector filter to show 5 sectors including the new regulatory option
- Reordered sectors to: `['regulatory', 'banking', 'it', 'pharma', 'auto']`

### 4. Enhanced Default Prompt
When no specific sector or query is provided, the system now explicitly requests:
> "Indian stock markets including Nifty 50, Sensex, major corporate developments, AND important regulatory updates from SEBI, RBI policy decisions, NSE/BSE circulars"

## Key Features

### Sector-Specific News Synthesis
- Each sector now has tailored search terms including major companies and relevant regulatory bodies
- Sector-specific prompts ensure focused news retrieval
- The prompt explicitly instructs Perplexity to focus on the selected sector

### Regulatory News Emphasis
- Dedicated "SEBI/RBI" filter button for quick access to regulatory news
- Regulatory news is included by default in general market news
- Specific focus on:
  - SEBI regulations and circulars
  - RBI monetary policy decisions
  - NSE/BSE notifications
  - Compliance and regulatory changes

### Improved User Experience
- Visual sector filters with emojis for easy identification
- Prominent placement of regulatory filter
- Responsive loading states and error handling
- Source attribution for transparency

## Testing

### Manual Testing Steps:
1. Start the development server: `npm run dev`
2. Navigate to the home page
3. Test each sector filter:
   - Click "SEBI/RBI" → Should show regulatory news
   - Click "Banking" → Should show banking sector news
   - Click other sectors → Should show sector-specific news

### Automated Testing:
Run the test script: `node test-news-synthesis.js`

This will test:
- General market news
- SEBI/RBI regulatory news
- Banking sector news
- IT sector news
- Custom query functionality

## Configuration

### Environment Variables
Add to `.env.local`:
```
PERPLEXITY_API_KEY=your_api_key_here
```

Without the API key, the system will use mock data for development.

### Trusted News Domains
The system prioritizes news from trusted Indian financial sources:
- economictimes.indiatimes.com
- moneycontrol.com
- livemint.com
- business-standard.com
- sebi.gov.in
- rbi.org.in
- nseindia.com
- bseindia.com

## Future Enhancements

1. **Multi-language Support**: Extend regulatory news to Hindi and other regional languages
2. **Real-time Alerts**: Push notifications for critical regulatory updates
3. **Historical Analysis**: Track regulatory changes over time
4. **Smart Categorization**: Auto-categorize regulatory news by impact level
5. **Compliance Tracking**: Help users track compliance requirements based on news

## Deployment Checklist

- [ ] Set PERPLEXITY_API_KEY in production environment
- [ ] Configure rate limiting for API endpoints
- [ ] Set up caching (Redis recommended for production)
- [ ] Monitor API usage and costs
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN for static assets
- [ ] Enable analytics for user behavior tracking

## Support

For issues or questions about the news synthesis feature:
1. Check the console for API errors
2. Verify the PERPLEXITY_API_KEY is correctly set
3. Review the network tab for API response details
4. Check the build logs for TypeScript errors
