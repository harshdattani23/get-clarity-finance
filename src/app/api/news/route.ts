import { NextRequest, NextResponse } from 'next/server';

interface NewsRequest {
  ticker?: string;
  query?: string;
  newsType?: 'financial' | 'market' | 'company' | 'general';
  timeframe?: '1h' | '24h' | '7d' | '30d';
}

interface NewsSource {
  title: string;
  url: string;
  date: string;
  last_updated: string;
}

interface NewsResponse {
  news: string;
  timestamp: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  confidence?: number;
  sources: NewsSource[];
  summary?: string;
  formattedNews?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { ticker, query, newsType = 'financial', timeframe = '24h' }: NewsRequest = await request.json();
    
    // Use environment variable for API key
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Perplexity API key not configured' 
      }, { status: 500 });
    }

    // Simplified queries to avoid 400 errors
    let newsQuery = '';
    
    if (ticker) {
      // Stock-specific news with simpler format
      switch (newsType) {
        case 'financial':
          newsQuery = `Latest financial news about ${ticker} stock in the last ${timeframe}. Focus on earnings, revenue, and financial performance.`;
          break;
        case 'market':
          newsQuery = `Market analysis and trading patterns for ${ticker} stock in the last ${timeframe}. Include price movements and volume analysis.`;
          break;
        case 'company':
          newsQuery = `Company news and business developments for ${ticker} in the last ${timeframe}. Include announcements and strategic updates.`;
          break;
        default:
          newsQuery = `Latest news about ${ticker} stock in the last ${timeframe}.`;
      }
    } else {
      // General market news
      switch (newsType) {
        case 'financial':
          newsQuery = `Major financial market news in the last ${timeframe}. Focus on stock markets, earnings, and economic indicators.`;
          break;
        case 'market':
          newsQuery = `Indian stock market trends and sector performance in the last ${timeframe}. Include Nifty, Sensex, Bank Nifty movements, sector rotation, and overall market sentiment. Focus on broad market indicators, not individual stocks.`;
          break;
        case 'company':
          newsQuery = `Major corporate news and business developments in the last ${timeframe}. Include mergers, acquisitions, and leadership changes.`;
          break;
        default:
          newsQuery = `Significant news that could impact financial markets in the last ${timeframe}.`;
      }
    }

    // Use custom query if provided
    if (query) {
      newsQuery = query;
    }

    console.log('Sending query to Perplexity:', newsQuery);

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar', // Use correct sonar model
        messages: [
          {
            role: 'user',
            content: newsQuery
          }
        ],
        max_tokens: 800,
        temperature: 0.3
      })
    });

    console.log('Perplexity API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error response:', errorText);
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Perplexity API response data:', JSON.stringify(data, null, 2));
    
    if (data.error) {
      throw new Error(data.error.message || 'API error');
    }

    const newsContent = data.choices?.[0]?.message?.content || 'No news available';
    
    // Extract sources from Perplexity's search results
    const sources = extractSourcesFromResponse(data);
    
    // Create a summary
    const summary = createSummary(newsContent);

    // Format news with proper links and structure
    const formattedNews = formatNewsWithLinks(newsContent, sources);

    const responseData: NewsResponse = {
      news: newsContent,
      timestamp: new Date().toISOString(),
      sources,
      summary,
      formattedNews
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch news',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Extract sources from Perplexity's response
function extractSourcesFromResponse(data: {
  search_results?: Array<{
    title: string;
    url: string;
    date?: string;
    last_updated?: string;
  }>;
  citations?: string[];
}): NewsSource[] {
  try {
    const searchResults = data.search_results || [];
    const citations = data.citations || [];
    
    // Combine search results and citations, prioritizing search results
    const allSources = new Map<string, NewsSource>();
    
    // Add search results first
    searchResults.forEach((result, index) => {
      if (result.url && result.title) {
        allSources.set(result.url, {
          title: result.title,
          url: result.url,
          date: result.date || 'Unknown',
          last_updated: result.last_updated || result.date || 'Unknown'
        });
      }
    });
    
    // Add citations if not already present
    citations.forEach((citation, index) => {
      if (!allSources.has(citation)) {
        allSources.set(citation, {
          title: `Source ${index + 1}`,
          url: citation,
          date: 'Unknown',
          last_updated: 'Unknown'
        });
      }
    });
    
    return Array.from(allSources.values()).slice(0, 10);
  } catch (error) {
    console.error('Error extracting sources:', error);
    return [];
  }
}

// Format news content with proper links and structure
function formatNewsWithLinks(newsContent: string, sources: NewsSource[]): string {
  if (!sources || sources.length === 0) {
    return newsContent;
  }

  let formattedContent = newsContent;
  
  // Add source links at the end
  formattedContent += '\n\n**Sources:**\n';
  sources.forEach((source, index) => {
    formattedContent += `${index + 1}. [${source.title}](${source.url})`;
    if (source.date !== 'Unknown') {
      formattedContent += ` (${source.date})`;
    }
    formattedContent += '\n';
  });

  return formattedContent;
}

// Create a brief summary of the news
function createSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  if (sentences.length === 0) return text.substring(0, 200) + '...';
  
  const firstSentence = sentences[0].trim();
  const secondSentence = sentences[1]?.trim() || '';
  
  const summary = firstSentence + (secondSentence ? '. ' + secondSentence : '');
  return summary.length > 300 ? summary.substring(0, 300) + '...' : summary;
}
