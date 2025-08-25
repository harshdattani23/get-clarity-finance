/**
 * Cron job to fetch and store news from Perplexity AI
 * Runs 3 times daily to update news database
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPerplexityNewsSynthesis } from '@/lib/ai/perplexity';
import { MARKET_SECTORS, DEFAULT_TOPICS } from '@/config/news';
import type { NewsItem as NewsItemType, NewsSentiment as SentimentType } from '@/types/news';
import { FetchStatus, NewsSentiment } from '@prisma/client';

// Protect the route with a secret
const CRON_SECRET = process.env.CRON_SECRET || 'dev-secret';

// News expiry time (8 hours - so 3 fetches per day keeps news fresh)
const NEWS_EXPIRY_HOURS = 8;

/**
 * Map sentiment from API to database enum
 */
function mapSentiment(sentiment?: string): NewsSentiment {
  switch (sentiment?.toLowerCase()) {
    case 'positive': return NewsSentiment.POSITIVE;
    case 'negative': return NewsSentiment.NEGATIVE;
    default: return NewsSentiment.NEUTRAL;
  }
}

/**
 * Store news items in database
 */
async function storeNewsItems(items: NewsItemType[], sector?: string) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + NEWS_EXPIRY_HOURS);

  const stored = [];
  
  for (const item of items) {
    try {
      // Check if similar news already exists (by title similarity)
      const existing = await prisma.newsItem.findFirst({
        where: {
          title: {
            contains: item.title.substring(0, 50), // Check first 50 chars
          },
          expiresAt: {
            gt: new Date(), // Still valid
          },
        },
      });

      if (existing) {
        console.log(`Skipping duplicate news: ${item.title.substring(0, 50)}...`);
        continue;
      }

      // Create the news item with all related data
      const newsItem = await prisma.newsItem.create({
        data: {
          title: item.title,
          summary: item.summary,
          sector: sector || null,
          sentiment: mapSentiment(item.sentiment),
          language: 'en',
          publishedAt: new Date(),
          fetchedAt: new Date(),
          expiresAt,
          keyPoints: {
            create: item.keyPoints?.map((point, index) => ({
              point,
              order: index,
            })) || [],
          },
          tickers: {
            create: item.tickers?.map(ticker => ({
              ticker,
            })) || [],
          },
          sources: {
            create: item.sources?.map(source => ({
              url: source.url,
              domain: source.domain,
              title: source.title,
            })) || [],
          },
        },
      });

      stored.push(newsItem);
    } catch (error) {
      console.error(`Failed to store news item: ${item.title}`, error);
    }
  }

  return stored;
}

/**
 * Fetch news for a specific sector or general topics
 */
async function fetchNewsForSector(sector?: string, topics?: string[]) {
  const log = await prisma.newsFetchLog.create({
    data: {
      sector: sector || null,
      topics: topics || [],
      status: FetchStatus.PENDING,
    },
  });

  try {
    console.log(`Fetching news for ${sector || 'general topics'}...`);
    
    const synthesis = await getPerplexityNewsSynthesis({
      sector,
      topics: !sector ? topics : undefined,
      maxItems: 5,
      lang: 'en',
    });

    const storedItems = await storeNewsItems(synthesis.items, sector);

    await prisma.newsFetchLog.update({
      where: { id: log.id },
      data: {
        status: FetchStatus.SUCCESS,
        itemsCount: storedItems.length,
        completedAt: new Date(),
      },
    });

    return {
      sector: sector || 'general',
      fetched: synthesis.items.length,
      stored: storedItems.length,
    };
  } catch (error) {
    await prisma.newsFetchLog.update({
      where: { id: log.id },
      data: {
        status: FetchStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      },
    });

    throw error;
  }
}

/**
 * Clean up expired news items
 */
async function cleanupExpiredNews() {
  const deleted = await prisma.newsItem.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  return deleted.count;
}

export async function GET(request: NextRequest) {
  try {
    // Verify the request is authorized (from cron service or admin)
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');
    
    if (secret !== CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Perplexity API key is configured
    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json(
        { error: 'Perplexity API key not configured' },
        { status: 503 }
      );
    }

    console.log('Starting news sync cron job...');
    const startTime = Date.now();

    // Clean up expired news first
    const cleanedUp = await cleanupExpiredNews();
    console.log(`Cleaned up ${cleanedUp} expired news items`);

    const results = [];
    const errors = [];

    // Fetch general market news
    try {
      const generalNews = await fetchNewsForSector(undefined, DEFAULT_TOPICS.slice(0, 3));
      results.push(generalNews);
    } catch (error) {
      errors.push({ sector: 'general', error: error instanceof Error ? error.message : 'Unknown error' });
    }

    // Fetch news for each sector
    const sectorsToFetch = ['regulatory', 'banking', 'it', 'pharma', 'auto'];
    
    for (const sectorId of sectorsToFetch) {
      try {
        // Add a small delay between API calls to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const sectorNews = await fetchNewsForSector(sectorId);
        results.push(sectorNews);
      } catch (error) {
        errors.push({ 
          sector: sectorId, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    const totalFetched = results.reduce((sum, r) => sum + r.fetched, 0);
    const totalStored = results.reduce((sum, r) => sum + r.stored, 0);
    const duration = Date.now() - startTime;

    console.log(`News sync completed in ${duration}ms`);
    console.log(`Fetched: ${totalFetched}, Stored: ${totalStored}, Errors: ${errors.length}`);

    return NextResponse.json({
      success: true,
      summary: {
        totalFetched,
        totalStored,
        cleanedUp,
        duration,
        timestamp: new Date().toISOString(),
      },
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('News sync cron job failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Manual trigger for testing (POST request)
export async function POST(request: NextRequest) {
  return GET(request);
}
