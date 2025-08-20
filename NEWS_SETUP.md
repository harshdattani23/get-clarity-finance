# News Section Setup Guide

## Overview
The stock page now includes a real-time news section powered by Perplexity AI API. This provides up-to-date news about specific stocks and general market developments.

## Features
- **Real-time News**: Fetches latest news using Perplexity AI
- **Stock-Specific News**: Shows news relevant to the selected stock ticker
- **Market News**: General market updates when no specific ticker is provided
- **Auto-refresh**: Manual refresh button to get latest updates
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Graceful error handling with user-friendly messages

## Setup Instructions

### 1. Get Perplexity AI API Key
1. Visit [Perplexity AI Settings](https://www.perplexity.ai/settings/api)
2. Generate a new API key
3. Copy the API key

### 2. Configure Environment Variables
Create a `.env.local` file in your project root and add:

```bash
PERPLEXITY_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
```

## API Endpoints

### `/api/news` (POST)
Fetches news from Perplexity AI API.

**Request Body:**
```json
{
  "ticker": "RELIANCE",  // Optional: specific stock ticker
  "query": "custom query" // Optional: custom news query
}
```

**Response:**
```json
{
  "news": "Latest news content...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Usage

### In Stock Pages
The news component automatically displays stock-specific news when a ticker is provided:

```tsx
<CompanyNews ticker="RELIANCE" />
```

### For General Market News
Display general market news without a specific ticker:

```tsx
<CompanyNews />
```

## Customization

### Modifying News Queries
Edit the API route in `src/app/api/news/route.ts` to customize news queries:

```typescript
const newsQuery = ticker 
  ? `What are the latest news and developments about ${ticker} stock in the last 24 hours? Focus on financial performance, market movements, and company announcements.`
  : query || "What are the major AI developments and announcements from today across the tech industry?";
```

### Styling
The component uses Tailwind CSS classes. Modify the styling in `src/components/stock/CompanyNews.tsx` to match your design system.

## Error Handling

The component handles various error scenarios:
- API key not configured
- Network errors
- API rate limits
- Invalid responses

Users see friendly error messages and can retry failed requests.

## Performance Considerations

- News is fetched on component mount and when manually refreshed
- Consider implementing caching if you need to reduce API calls
- The API response is limited to 1000 tokens for performance

## Troubleshooting

### Common Issues

1. **"Perplexity API key not configured"**
   - Ensure `.env.local` file exists with correct API key
   - Restart development server after adding environment variable

2. **"Failed to fetch news"**
   - Check network connectivity
   - Verify API key is valid
   - Check Perplexity AI service status

3. **Rate limiting errors**
   - Perplexity AI has rate limits on free accounts
   - Consider upgrading to a paid plan for higher limits

### Debug Mode
Enable debug logging by checking the browser console for detailed error information.

## Security Notes

- API keys are stored server-side only
- Never expose API keys in client-side code
- Use environment variables for all sensitive configuration
- Consider implementing API key rotation for production use

## Future Enhancements

Potential improvements to consider:
- News caching and background refresh
- Multiple news sources integration
- Sentiment analysis of news
- News categorization and filtering
- Push notifications for breaking news
