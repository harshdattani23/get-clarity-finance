/**
 * Perplexity API client wrapper for news synthesis
 */

import { PERPLEXITY_CONFIG, getHeaders } from '@/config/perplexity';
import { TRUSTED_NEWS_DOMAINS, SUPPORTED_LANGUAGES } from '@/config/news';
import type {
  NewsItem,
  NewsSynthesis,
  NewsSource,
  PerplexityRequest,
  PerplexityResponse,
  PerplexityMessage
} from '@/types/news';
import crypto from 'crypto';

interface NewsSynthesisParams {
  topics?: string[];
  query?: string;
  lang?: string;
  maxItems?: number;
  allowDomains?: string[];
  model?: string;
  sector?: string;
}

/**
 * Build the system prompt for news synthesis
 */
function buildSystemPrompt(lang: string): string {
  const langName = SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES]?.nativeName || 'English';
  
  return `You are a financial news synthesis assistant specialized in Indian markets. Your role is to:
1. Synthesize information from multiple trusted sources
2. Provide concise, factual summaries with key bullet points
3. Include relevant stock tickers (NSE/BSE) where applicable
4. Identify market sentiment (positive/neutral/negative)
5. Respond in ${langName} language

Output Format:
Return a JSON array with 4-6 news items. Each item should have:
- title: Clear, informative headline
- summary: 2-3 sentence overview
- keyPoints: Array of 2-4 bullet points
- tickers: Array of relevant stock symbols (optional)
- sentiment: "positive", "neutral", or "negative"
- sources: Array with at least 2 source URLs

Important: Base your synthesis on current, verified information only. Include diverse perspectives when available.`;
}

/**
 * Build the user prompt for news synthesis
 */
function buildUserPrompt(params: NewsSynthesisParams): string {
  const { topics, query, lang = 'en', maxItems = 5, sector } = params;
  const langName = SUPPORTED_LANGUAGES[lang as keyof typeof SUPPORTED_LANGUAGES]?.nativeName || 'English';
  
  let prompt = `Provide the latest ${maxItems} important news items about `;
  
  if (query) {
    prompt += query;
  } else if (sector) {
    // Map sector IDs to specific search terms
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
    prompt += sectorMap[sector] || `Indian ${sector} sector`;
  } else if (topics && topics.length > 0) {
    prompt += topics.join(', ');
  } else {
    // Default: Mix of market and regulatory news
    prompt += 'Indian stock markets including Nifty 50, Sensex, major corporate developments, AND important regulatory updates from SEBI, RBI policy decisions, NSE/BSE circulars';
  }
  
  prompt += `\n\nRequirements:
- Focus on news from the last 7 days
- Include source URLs from trusted financial news websites
- Provide analysis relevant to retail investors
- Language: ${langName}
- Format: JSON array as specified`;
  
  // Add sector-specific instruction if sector is specified
  if (sector) {
    prompt += `\n- IMPORTANT: Focus specifically on ${sector} sector news only`;
  }
  
  return prompt;
}

/**
 * Extract JSON from model response
 */
function extractJSON(text: string): unknown {
  // Try to find JSON array in the response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('Failed to parse extracted JSON:', e);
    }
  }
  
  // Fallback: try to parse the entire response
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse response as JSON:', e);
    return null;
  }
}

/**
 * Generate stable ID for a news item
 */
function generateItemId(title: string, sourceUrl?: string): string {
  const input = `${title}-${sourceUrl || Date.now()}`;
  return crypto.createHash('md5').update(input).digest('hex').substring(0, 8);
}

/**
 * Extract domain from URL
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

/**
 * Parse sources from text or citations
 */
function parseSources(text: string, citations?: string[]): NewsSource[] {
  const sources: NewsSource[] = [];
  const seenUrls = new Set<string>();
  
  // First, add citations if available
  if (citations && Array.isArray(citations)) {
    citations.forEach(url => {
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        sources.push({
          url,
          domain: extractDomain(url)
        });
      }
    });
  }
  
  // Then, extract URLs from text
  const urlRegex = /https?:\/\/[^\s\])}]+/g;
  const matches = text.match(urlRegex);
  
  if (matches) {
    matches.forEach(url => {
      // Clean up the URL
      url = url.replace(/[.,;:!?]$/, '');
      
      if (!seenUrls.has(url)) {
        seenUrls.add(url);
        sources.push({
          url,
          domain: extractDomain(url)
        });
      }
    });
  }
  
  return sources;
}

/**
 * Main function to get news synthesis from Perplexity
 */
export async function getPerplexityNewsSynthesis(
  params: NewsSynthesisParams,
  retryCount = 0
): Promise<NewsSynthesis> {
  const MAX_RETRIES = 2;
  const {
    lang = 'en',
    allowDomains = TRUSTED_NEWS_DOMAINS,
    model = PERPLEXITY_CONFIG.model
  } = params;
  
  // Build messages
  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: buildSystemPrompt(lang)
    },
    {
      role: 'user',
      content: buildUserPrompt(params)
    }
  ];
  
  // Build request
  const request: PerplexityRequest = {
    model,
    messages,
    temperature: PERPLEXITY_CONFIG.temperature,
    max_tokens: PERPLEXITY_CONFIG.max_tokens,
    top_p: PERPLEXITY_CONFIG.top_p,
    search_domain_filter: allowDomains as string[],
    return_citations: true,
    search_recency_filter: 'week',
  };
  
  // Set up timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PERPLEXITY_CONFIG.timeout);
  
  try {
    // Make API request
    const response = await fetch(PERPLEXITY_CONFIG.endpoint, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${error}`);
    }
    
    const data: PerplexityResponse = await response.json();
    
    // Extract content from response
    const content = data.choices[0]?.message?.content || '';
    const citations = data.citations || [];
    
    // Parse JSON from content
    const jsonData = extractJSON(content);
    
    // Transform to NewsItem format
    const items: NewsItem[] = [];
    
    if (jsonData && Array.isArray(jsonData)) {
      jsonData.forEach((item: unknown) => {
        const newsItem = item as Record<string, unknown>;
        // Parse sources from item and citations
        const itemSources = parseSources(
          JSON.stringify(newsItem),
          (newsItem.sources as string[]) || citations
        );
        
        items.push({
          id: generateItemId((newsItem.title as string) || '', itemSources[0]?.url),
          title: (newsItem.title as string) || 'Untitled',
          summary: (newsItem.summary as string) || '',
          keyPoints: Array.isArray(newsItem.keyPoints) ? newsItem.keyPoints as string[] : [],
          tickers: Array.isArray(newsItem.tickers) ? newsItem.tickers as string[] : undefined,
          sentiment: (newsItem.sentiment as 'positive' | 'neutral' | 'negative') || 'neutral',
          sources: itemSources,
        });
      });
    }
    
    // Return synthesis
    return {
      items,
      lang,
      model,
      citationsObserved: citations.length > 0 || items.some(item => item.sources.length > 0),
      synthesizedAt: new Date().toISOString(),
      raw: process.env.NODE_ENV === 'development' ? data : undefined,
    };
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      // Handle timeout with retry
      if (error.name === 'AbortError' && retryCount < MAX_RETRIES) {
        console.log(`Perplexity API timeout, retrying... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        return getPerplexityNewsSynthesis(params, retryCount + 1);
      }
      
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${MAX_RETRIES} retries - Perplexity API is not responding`);
      }
      
      // Handle rate limits with retry
      if (error.message.includes('429') && retryCount < MAX_RETRIES) {
        console.log(`Rate limited, waiting before retry... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
        // Wait longer for rate limits
        await new Promise(resolve => setTimeout(resolve, 5000));
        return getPerplexityNewsSynthesis(params, retryCount + 1);
      }
      
      throw error;
    }
    
    throw new Error('Unknown error occurred while fetching news');
  }
}

/**
 * Validate and sanitize input parameters
 */
export function validateNewsParams(params: unknown): NewsSynthesisParams {
  const validated: NewsSynthesisParams = {};
  const input = params as Record<string, unknown>;
  
  // Validate topics
  if (input.topics && Array.isArray(input.topics)) {
    validated.topics = input.topics
      .filter((t: unknown) => typeof t === 'string')
      .slice(0, 5) // Max 5 topics
      .map((t: string) => t.substring(0, 100)); // Max 100 chars per topic
  }
  
  // Validate query
  if (input.query && typeof input.query === 'string') {
    validated.query = input.query.substring(0, 200); // Max 200 chars
  }
  
  // Validate language
  if (input.lang && typeof input.lang === 'string' && input.lang in SUPPORTED_LANGUAGES) {
    validated.lang = input.lang;
  }
  
  // Validate maxItems
  if (input.maxItems && typeof input.maxItems === 'number') {
    validated.maxItems = Math.min(Math.max(1, input.maxItems), 6); // Between 1 and 6
  }
  
  // Validate sector
  if (input.sector && typeof input.sector === 'string') {
    validated.sector = input.sector.substring(0, 50); // Max 50 chars for sector
  }
  
  return validated;
}
