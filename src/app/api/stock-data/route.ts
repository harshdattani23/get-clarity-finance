import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Decimal } from '@prisma/client/runtime/library';

// Test endpoint to verify database connection
export async function GET() {
  try {
    console.log('[STOCK-DATA] Testing database connection...');
    
    // Test basic database connection
    const stockCount = await db.stock.count();
    console.log(`[STOCK-DATA] Database connection successful. Total stocks: ${stockCount}`);
    
    return NextResponse.json({ 
      message: 'Database connection successful', 
      stockCount,
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
  try {
    const { tickers, page = 1, limit = 15, sort = 'name-asc', search = '', index = 'all', industry = 'all' } = await request.json();

    if (tickers && Array.isArray(tickers) && tickers.length > 0) {
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
          lastUpdatedAt: true,
        }
      });
      const stockData = stocks.map((stock: {
        ticker: string;
        price: Decimal | null;
        change: Decimal | null;
        percentChange: Decimal | null;
        volume: Decimal | null;
        lastUpdatedAt: Date | null;
      }) => ({
        ticker: stock.ticker,
        price: stock.price ? Number(stock.price) : 0,
        change: stock.change ? Number(stock.change) : 0,
        percentChange: stock.percentChange ? Number(stock.percentChange) : 0,
        volume: stock.volume ? Number(stock.volume) : 0,
        lastUpdatedAt: stock.lastUpdatedAt?.toISOString() || new Date().toISOString(),
      }));
      return NextResponse.json(stockData);
    } else {
      // Fetch paginated and filtered stocks
      const where: any = {};
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
      const orderBy = { [sortKey]: sortOrder };

      const totalCount = await db.stock.count({ where });
      const stocks = await db.stock.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      });

      return NextResponse.json({ stocks, totalCount });
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
