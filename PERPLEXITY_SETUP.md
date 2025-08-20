# Perplexity API Setup for News Integration

## Overview
The news section in the stock detail page now uses Perplexity AI's API to fetch real-time stock news with enhanced search capabilities.

## Setup Instructions

### 1. Get Perplexity API Key
1. Go to [Perplexity AI](https://www.perplexity.ai/)
2. Sign up for an account
3. Navigate to API section
4. Create a new API key
5. Copy the API key

### 2. Environment Configuration
Create a `.env.local` file in your project root and add:

```bash
PERPLEXITY_API_KEY=your_actual_perplexity_api_key_here
```

### 3. Features
- **Real-time News**: Fetches latest news using Perplexity's search capabilities
- **Three News Categories**:
  - Company News & Updates (Blue indicator)
  - Financial & Earnings (Green indicator)  
  - Market & Sector Updates (Yellow indicator)
- **Sentiment Analysis**: Automatically analyzes news sentiment (Positive/Negative/Neutral)
- **Source Attribution**: Extracts and displays news sources
- **Auto-refresh**: News loads automatically when switching to news tab
- **Manual Refresh**: Refresh button to get latest news updates

### 4. How It Works
1. When user clicks on "News" tab, the system automatically fetches news for all three categories
2. Each category makes a separate API call to `/api/news` with different `newsType` parameters
3. Perplexity API processes the queries with enhanced search prompts
4. News is displayed in a responsive 3-column grid layout
5. Sentiment analysis is performed on the content to show appropriate color coding

### 5. API Endpoints
- **POST** `/api/news`
  - `ticker`: Stock symbol (e.g., "RELIANCE")
  - `newsType`: "company" | "financial" | "market"
  - `timeframe`: "1h" | "24h" | "7d" | "30d"

### 6. Response Format
```json
{
  "news": "Full news content...",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "sentiment": "positive|negative|neutral",
  "sources": ["Reuters", "Economic Times"],
  "summary": "Brief summary of the news..."
}
```

### 7. Enhanced Queries
The system now uses enhanced search prompts for better results:
- **Company News**: Focuses on announcements, strategic updates, corporate actions, product launches
- **Financial News**: Emphasizes earnings, revenue, financial performance, quarterly results
- **Market News**: Covers trading patterns, price movements, volume analysis, market sentiment

## Testing
1. Set up your Perplexity API key
2. Navigate to any stock detail page (e.g., `/virtual-trading/stock/RELIANCE`)
3. Click on the "News" tab
4. News should load automatically with real-time data from Perplexity

## Troubleshooting
- **"Perplexity API key not configured"**: Check your `.env.local` file
- **No news loading**: Verify API key is valid and has sufficient quota
- **Slow loading**: News fetching happens in parallel for all three categories
- **API errors**: Check Perplexity API status and rate limits

## Benefits of Perplexity
- **Real-time Search**: Access to current information
- **Enhanced Queries**: Better search prompts for relevant results
- **Source Attribution**: Automatic extraction of news sources
- **Reliable API**: Stable and well-documented API endpoints
- **Cost-effective**: Competitive pricing for news search services

## Next Steps
The system is now fully integrated with Perplexity API. You can:
- Test with different stock tickers
- Adjust search prompts for better results
- Monitor API usage and performance
- Add more news categories if needed
