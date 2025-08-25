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
export const maxDuration = 30; // Maximum 30 seconds

// Request validation schema
const requestSchema = z.object({
  topics: z.array(z.string()).optional(),
  query: z.string().optional(),
  lang: z.enum(['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn']).optional(),
  maxItems: z.number().min(1).max(6).optional(),
  sector: z.string().optional(),
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
 * Handle GET requests
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const params = {
      topics: searchParams.get('topics')?.split(',').filter(Boolean),
      query: searchParams.get('query') || undefined,
      lang: searchParams.get('lang') || 'en',
      maxItems: searchParams.get('maxItems') ? parseInt(searchParams.get('maxItems')!) : 5,
      sector: searchParams.get('sector') || undefined,
    };

    // Validate parameters
    const validationResult = requestSchema.safeParse(params);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = getCacheKey(params);
    const cached = cache.get(cacheKey);
    
    if (cached && isCacheValid(cached.timestamp)) {
      return NextResponse.json(
        { ...cached.data, cached: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
            'X-From-Cache': 'true',
          },
        }
      );
    }

    // Check if API key is configured
    if (!process.env.PERPLEXITY_API_KEY) {
      // Return mock data if no API key
      const mockResponse: NewsApiResponse = {
        items: [
          {
            id: 'mock-1',
            title: 'Sensex Hits New All-Time High',
            summary: 'BSE Sensex crossed 75,000 mark for the first time.',
            keyPoints: ['Banking stocks led the rally', 'IT stocks showed strong performance'],
            tickers: ['SENSEX', 'NIFTY'],
            sentiment: 'positive',
            sources: [{ url: '#', domain: 'mock', title: 'Mock Source' }],
          },
        ],
        lang: params.lang || 'en',
        model: 'mock',
        cached: false,
        queriedAt: new Date().toISOString(),
        warnings: ['API key not configured - showing mock data'],
      };
      
      return NextResponse.json(mockResponse);
    }

    // Synthesize news using Perplexity
    const validatedParams = validateNewsParams(params);
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
