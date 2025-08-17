import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { tickers } = await request.json();

    if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
      return NextResponse.json(
        { error: 'Tickers array is required' },
        { status: 400 }
      );
    }

    // Fetch stock data from database
    const stocks = await prisma.stock.findMany({
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

    // Convert Decimal types to numbers for JSON serialization
    const stockData = stocks.map(stock => ({
      ticker: stock.ticker,
      price: stock.price ? Number(stock.price) : 0,
      change: stock.change ? Number(stock.change) : 0,
      percentChange: stock.percentChange ? Number(stock.percentChange) : 0,
      volume: stock.volume ? Number(stock.volume) : 0,
      lastUpdatedAt: stock.lastUpdatedAt?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json(stockData);

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
