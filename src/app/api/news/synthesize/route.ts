/**
 * API Route: /api/news/synthesize
 * Synthesizes financial news using Perplexity AI
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPerplexityNewsSynthesis, validateNewsParams } from '@/lib/ai/perplexity';
import { DEFAULT_TOPICS } from '@/config/news';
import type { NewsApiResponse } from '@/types/news';

// Runtime configuration
export const runtime = 'nodejs';
export const maxDuration = 60; // Maximum 60 seconds to handle slow API responses

// Request validation schema
const requestSchema = z.object({
  topics: z.array(z.string()).optional(),
  query: z.string().optional(),
  lang: z.enum(['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn']).optional(),
  maxItems: z.number().min(1).max(20).optional(), // Increased max for pagination
  sector: z.string().optional(),
  page: z.number().min(1).optional(), // Add pagination
});

// Simple in-memory cache (replace with Redis/proper cache in production)
const cache = new Map<string, { data: NewsApiResponse; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Generate cache key from request parameters
 */
function getCacheKey(params: Record<string, unknown>): string {
  return JSON.stringify({
    topics: params.topics || [],
    query: params.query || '',
    lang: params.lang || 'en',
    maxItems: params.maxItems || 5,
    sector: params.sector || '',
  });
}

/**
 * Check if cached data is still valid
 */
function isCacheValid(timestamp: number): boolean {
  return Date.now() - timestamp < CACHE_TTL;
}

/**
 * Store news in database in background
 */
async function storeNewsInBackground(items: Array<{
  title: string;
  summary: string;
  sentiment?: string;
  keyPoints?: string[];
  tickers?: string[];
  sources?: Array<{
    url: string;
    domain?: string;
    title?: string;
  }>;
}>, sector?: string, language: string = 'en') {
  const { prisma } = await import('@/lib/prisma');
  const { NewsSentiment } = await import('@prisma/client');
  
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 8); // 8 hours expiry
  
  for (const item of items) {
    try {
      // Check if already exists
      const existing = await prisma.newsItem.findFirst({
        where: {
          title: {
            contains: item.title.substring(0, 50),
          },
          expiresAt: {
            gt: new Date(),
          },
        },
      });
      
      if (!existing) {
        await prisma.newsItem.create({
          data: {
            title: item.title,
            summary: item.summary,
            sector: sector || null,
            sentiment: item.sentiment === 'positive' ? NewsSentiment.POSITIVE : 
                      item.sentiment === 'negative' ? NewsSentiment.NEGATIVE : 
                      NewsSentiment.NEUTRAL,
            language: language,
            publishedAt: new Date(),
            fetchedAt: new Date(),
            expiresAt,
            keyPoints: {
              create: item.keyPoints?.map((point: string, index: number) => ({
                point,
                order: index,
              })) || [],
            },
            tickers: {
              create: item.tickers?.map((ticker: string) => ({
                ticker,
              })) || [],
            },
            sources: {
              create: item.sources?.map((source) => ({
                url: source.url,
                domain: source.domain || '',
                title: source.title || '',
              })) || [],
            },
          },
        });
      }
    } catch (error) {
      console.error('Failed to store news item in background:', error);
    }
  }
}

/**
 * Handle GET requests
 */
export async function GET(request: NextRequest) {
  try {
    // Import prisma dynamically to avoid initialization issues
    const { prisma } = await import('@/lib/prisma');
    
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const params = {
      topics: searchParams.get('topics')?.split(',').filter(Boolean),
      query: searchParams.get('query') || undefined,
      lang: searchParams.get('lang') || 'en',
      maxItems: searchParams.get('maxItems') ? parseInt(searchParams.get('maxItems')!) : 5,
      sector: searchParams.get('sector') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    };

    // Validate parameters
    const validationResult = requestSchema.safeParse(params);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // First, try to get news from database for the requested language
    let newsFromDb = null;
    try {
      const whereClause: Record<string, unknown> = {
        expiresAt: {
          gt: new Date(), // Only get non-expired news
        },
        language: params.lang || 'en', // Filter by requested language
      };

      // Add sector filter if specified
      if (params.sector) {
        whereClause.sector = params.sector;
      } else if (!params.query) {
        // For general news (no sector, no query), get mixed content
        whereClause.OR = [
          { sector: null },
          { sector: 'regulatory' }, // Always include some regulatory news
        ];
      }

      // Calculate pagination
      const itemsPerPage = params.maxItems || 5;
      const skip = (params.page - 1) * itemsPerPage;
      
      // Get total count for pagination metadata
      const totalCount = await prisma.newsItem.count({
        where: whereClause,
      });
      
      newsFromDb = await prisma.newsItem.findMany({
        where: whereClause,
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          tickers: true,
          sources: true,
        },
        orderBy: {
          publishedAt: 'desc',
        },
        take: itemsPerPage,
        skip: skip,
      });

      // If we have news from database, format and return it
      if (newsFromDb && newsFromDb.length > 0) {
        const items = newsFromDb.map(item => ({
          id: item.id,
          title: item.title,
          summary: item.summary,
          keyPoints: item.keyPoints.map(kp => kp.point),
          tickers: item.tickers.map(t => t.ticker),
          sentiment: item.sentiment.toLowerCase() as 'positive' | 'neutral' | 'negative',
          sources: item.sources.map(s => ({
            url: s.url,
            domain: s.domain,
            title: s.title || undefined,
          })),
        }));

        const response: NewsApiResponse = {
          items,
          lang: params.lang || 'en',
          model: 'database',
          cached: true,
          queriedAt: new Date().toISOString(),
          pagination: {
            page: params.page,
            pageSize: itemsPerPage,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / itemsPerPage),
            hasMore: params.page < Math.ceil(totalCount / itemsPerPage),
          },
        };

        return NextResponse.json(response, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
            'X-From-Cache': 'database',
          },
        });
      }
    } catch (dbError) {
      console.warn('Failed to fetch from database:', dbError);
      // Continue to try Perplexity API as fallback
    }

    // If no news in database or database failed, check in-memory cache
    const cacheKey = getCacheKey(params);
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return NextResponse.json(
        { ...cached.data, cached: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
            'X-From-Cache': 'memory',
          },
        }
      );
    }

    // Check if API key is configured for fallback to Perplexity
    if (!process.env.PERPLEXITY_API_KEY) {
      // If no API key and no database content, return empty with message
      // For non-English languages, show appropriate message
      const errorMessage = params.lang !== 'en' 
        ? `News in ${params.lang} requires API connection` 
        : 'News data is updated 3 times daily';
      
      return NextResponse.json(
        {
          items: [],
          lang: params.lang || 'en',
          model: 'none',
          cached: false,
          queriedAt: new Date().toISOString(),
          warnings: ['No cached news available. Please wait for the next update cycle.'],
          error: errorMessage,
        },
        { status: 200 } // Return 200 with empty data instead of error
      );
    }

    // As a last resort, fetch from Perplexity API directly
    // This should rarely happen if cron job is working
    console.log('Falling back to Perplexity API for fresh news...');
    const validatedParams = validateNewsParams(params);
    const synthesis = await getPerplexityNewsSynthesis({
      ...validatedParams,
      topics: validatedParams.topics || DEFAULT_TOPICS.slice(0, 3),
    });

    // Store the fresh news in database for future use
    if (synthesis.items.length > 0) {
      // Store in background, don't wait
      storeNewsInBackground(synthesis.items, params.sector, params.lang || 'en').catch(console.error);
    }

    // Prepare response
    const response: NewsApiResponse = {
      items: synthesis.items,
      lang: synthesis.lang,
      model: synthesis.model,
      cached: false,
      queriedAt: synthesis.synthesizedAt,
    };

    // Update cache
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    // Clean old cache entries (simple cleanup)
    if (cache.size > 50) {
      const entries = Array.from(cache.entries());
      entries
        .filter(([, value]) => !isCacheValid(value.timestamp))
        .forEach(([key]) => cache.delete(key));
    }

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        'X-From-Cache': 'false',
      },
    });

  } catch (error) {
    console.error('News synthesis error:', error);
    
    // Return error response
    return NextResponse.json(
      {
        items: [],
        lang: 'en',
        model: 'none',
        cached: false,
        queriedAt: new Date().toISOString(),
        warnings: ['Failed to synthesize news'],
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

/**
 * Handle POST requests
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate parameters
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = getCacheKey(body);
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return NextResponse.json(
        { ...cached.data, cached: true },
        { headers: { 'X-From-Cache': 'true' } }
      );
    }

    // Check if API key is configured
    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json(
        {
          items: [],
          warnings: ['API key not configured'],
        },
        { status: 503 }
      );
    }

    // Synthesize news
    const validatedParams = validateNewsParams(body);
    const synthesis = await getPerplexityNewsSynthesis({
      ...validatedParams,
      topics: validatedParams.topics || DEFAULT_TOPICS.slice(0, 3),
    });

    // Prepare response
    const response: NewsApiResponse = {
      items: synthesis.items,
      lang: synthesis.lang,
      model: synthesis.model,
      cached: false,
      queriedAt: synthesis.synthesizedAt,
    };

    // Update cache
    cache.set(cacheKey, {
      data: response,
      timestamp: Date.now(),
    });

    return NextResponse.json(response, {
      headers: { 'X-From-Cache': 'false' },
    });

  } catch (error) {
    console.error('News synthesis error:', error);
    
    return NextResponse.json(
      {
        items: [],
        warnings: ['Failed to synthesize news'],
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
