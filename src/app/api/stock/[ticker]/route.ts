import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest
) {
  const ticker = request.nextUrl.pathname.split('/').pop();

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker symbol is required' }, { status: 400 });
  }

  try {
    const stock = await db.stock.findUnique({
      where: { ticker },
    });

    if (!stock) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }

    const stockData = {
      ...stock,
      price: stock.price ? Number(stock.price) : null,
      change: stock.change ? Number(stock.change) : null,
      percentChange: stock.percentChange ? Number(stock.percentChange) : null,
      marketCap: stock.marketCap ? Number(stock.marketCap) : null,
      volume: stock.volume ? Number(stock.volume) : null,
      avgVolume: stock.avgVolume ? Number(stock.avgVolume) : null,
      peRatio: stock.peRatio ? Number(stock.peRatio) : null,
      eps: stock.eps ? Number(stock.eps) : null,
      dividendYield: stock.dividendYield ? Number(stock.dividendYield) : null,
      beta: stock.beta ? Number(stock.beta) : null,
      high: stock.high ? Number(stock.high) : null,
      low: stock.low ? Number(stock.low) : null,
      open: stock.open ? Number(stock.open) : null,
      close: stock.close ? Number(stock.close) : null,
      week52High: stock.week52High ? Number(stock.week52High) : null,
      week52Low: stock.week52Low ? Number(stock.week52Low) : null,
    };

    return NextResponse.json(stockData);
  } catch (error) {
    console.error(`Error fetching stock data for ${ticker}:`, error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
