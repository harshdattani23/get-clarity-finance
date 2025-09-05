import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Decimal } from '@prisma/client/runtime/library';

// In-memory cache for stock data
interface CacheEntry {
  data: any;
  timestamp: number;
  expiry: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 120 * 1000; // 2 minutes cache for stock data (longer to reduce API calls)
const PAGINATED_CACHE_DURATION = 300 * 1000; // 5 minutes for paginated data

// Cache cleanup function
function cleanupExpiredCache() {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiry) {
      cache.delete(key);
    }
  }
}

// Get from cache
function getFromCache(key: string): any | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

// Set cache
function setCache(key: string, data: any, duration: number = CACHE_DURATION) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + duration
  });
}

// Periodically clean up expired cache entries
setInterval(cleanupExpiredCache, 60 * 1000); // Clean every minute

// Rate limiting removed for better performance in trading application

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

function deduplicate<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (pendingRequests.has(key)) {
    console.log(`[STOCK-DATA] Request deduplication hit for key: ${key}`);
    return pendingRequests.get(key)!;
  }
  
  const promise = fn().finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, promise);
  return promise;
}

// Test endpoint to verify database connection
export async function GET() {
  try {
    console.log('[STOCK-DATA] Testing database connection...');
    
    // Test basic database connection
    const stockCount = await db.stock.count();
    console.log(`[STOCK-DATA] Database connection successful. Total stocks: ${stockCount}`);
    
    // Cache statistics
    const cacheStats = {
      totalEntries: cache.size,
      cacheKeys: Array.from(cache.keys()),
      memoryUsage: process.memoryUsage()
    };
    
    return NextResponse.json({ 
      message: 'Database connection successful', 
      stockCount,
      cacheStats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[STOCK-DATA] Database connection test failed:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('[STOCK-DATA] Error name:', error.name);
      console.error('[STOCK-DATA] Error message:', error.message);
      console.error('[STOCK-DATA] Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Database connection failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const requestStart = Date.now();
  console.log(`[STOCK-DATA] New request received at ${new Date().toISOString()}`);
  
  try {
    const requestBody = await request.json();
    const { tickers, page = 1, limit = 15, sort = 'name-asc', search = '', index = 'all', industry = 'all' } = requestBody;
    
    console.log(`[STOCK-DATA] Request details:`, {
      tickers: tickers ? `${tickers.length} tickers` : 'none',
      page,
      limit,
      sort,
      search,
      index,
      industry,
      hasBody: Object.keys(requestBody).length > 0
    });

    if (tickers && Array.isArray(tickers) && tickers.length > 0) {
      // Generate cache key for specific tickers
      const cacheKey = `tickers:${tickers.sort().join(',')}`;
      
      // Check cache first
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        console.log(`[STOCK-DATA] Cache hit for tickers: ${tickers.length} stocks`);
        return NextResponse.json(cachedData);
      }
      
      console.log(`[STOCK-DATA] Cache miss, fetching ${tickers.length} stocks from database`);
      
      // Use deduplication for database query
      const stockData = await deduplicate(cacheKey, async () => {
        // Fetch specific tickers
        const stocks = await db.stock.findMany({
        where: {
          ticker: {
            in: tickers
          }
        },
        select: {
          ticker: true,
          price: true,
          change: true,
          percentChange: true,
          volume: true,
          previousClose: true,
          lastUpdatedAt: true,
        }
      });
        const stockData = stocks.map((stock: {
          ticker: string;
          price: Decimal | null;
          change: Decimal | null;
          percentChange: Decimal | null;
          volume: Decimal | null;
          previousClose: Decimal | null;
          lastUpdatedAt: Date | null;
        }) => ({
          ticker: stock.ticker,
          price: stock.price ? Number(stock.price) : 0,
          change: stock.change ? Number(stock.change) : 0,
          percentChange: stock.percentChange ? Number(stock.percentChange) : 0,
          volume: stock.volume ? Number(stock.volume) : 0,
          previousClose: stock.previousClose ? Number(stock.previousClose) : null,
          lastUpdatedAt: stock.lastUpdatedAt?.toISOString() || new Date().toISOString(),
        }));
        
        // Cache the result
        setCache(cacheKey, stockData, CACHE_DURATION);
        
        return stockData;
      });
      
      return NextResponse.json(stockData);
    } else {
      // Generate cache key for paginated data
      const cacheKey = `paginated:${page}:${limit}:${sort}:${search}:${index}:${industry}`;
      
      // Check cache first
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        console.log(`[STOCK-DATA] Cache hit for paginated data: page ${page}`);
        return NextResponse.json(cachedData);
      }
      
      console.log(`[STOCK-DATA] Cache miss, fetching paginated data from database: page ${page}`);
      
      // Use deduplication for paginated query
      const result = await deduplicate(cacheKey, async () => {
        // Fetch paginated and filtered stocks
        const where: Prisma.StockWhereInput = {};
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { ticker: { contains: search, mode: 'insensitive' } },
          ];
        }
        if (index !== 'all') {
          where.indices = { has: index };
        }
        if (industry !== 'all') {
          where.industry = industry;
        }

        const [sortKey, sortOrder] = sort.split('-');
        const orderBy: { [key: string]: string } = { [sortKey]: sortOrder };

        const totalCount = await db.stock.count({ where });
        const stocks = await db.stock.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        });
        
        const result = { stocks, totalCount };
        
        // Cache the result (longer cache for paginated data)
        setCache(cacheKey, result, PAGINATED_CACHE_DURATION);
        
        return result;
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('[STOCK-DATA] Error details:', error);
    
    // Check if it's a Prisma error
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code?: string; meta?: unknown };
      console.error('[STOCK-DATA] Prisma error code:', prismaError.code);
      console.error('[STOCK-DATA] Prisma error meta:', prismaError.meta);
    }
    
    // Check for specific database connection errors
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
        console.error('[STOCK-DATA] Database connection refused or host not found');
      } else if (error.message.includes('authentication')) {
        console.error('[STOCK-DATA] Database authentication failed');
      } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.error('[STOCK-DATA] Database table does not exist');
      }
      
      // Log detailed error information
      console.error('[STOCK-DATA] Error name:', error.name);
      console.error('[STOCK-DATA] Error message:', error.message);
      console.error('[STOCK-DATA] Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch stock data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
