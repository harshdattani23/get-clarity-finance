// src/lib/db/stocks.ts
// Database service for stocks

import { db } from '../db';

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  industry: string;
  marketCap: string;
  indices: string[];
  price: number | null;
  change: number | null;
  percentChange: number | null;
  volume: number | null;
  lastUpdatedAt: Date | null;
}

export interface StockWithProfile extends Stock {
  profile?: string;
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  news?: { title: string; source: string; date: string }[];
}

type PrismaStockRow = {
  id: number;
  ticker: string;
  name: string;
  industry: string;
  marketCap: string | null;
  indices: string[] | null;
  price: unknown;
  change: unknown;
  percentChange: unknown;
  volume: unknown;
  lastUpdatedAt: Date | null;
};

function mapRowToStock(row: PrismaStockRow): Stock {
  const toNum = (v: unknown): number | null => (v !== null && v !== undefined ? Number(v) : null);
  return {
    id: row.id,
    ticker: row.ticker,
    name: row.name,
    industry: row.industry,
    marketCap: row.marketCap ?? '',
    indices: row.indices ?? [],
    price: toNum(row.price),
    change: toNum(row.change),
    percentChange: toNum(row.percentChange),
    volume: toNum(row.volume),
    lastUpdatedAt: row.lastUpdatedAt,
  };
}

export async function getAllStocks(): Promise<Stock[]> {
  try {
    const stocks = await db.stock.findMany({
      orderBy: { ticker: 'asc' }
    });
    return (stocks as unknown as PrismaStockRow[]).map(mapRowToStock);
  } catch (error) {
    console.error('Error fetching stocks from database:', error);
    return [];
  }
}

export async function getStocksByIndex(index: string): Promise<Stock[]> {
  try {
    const stocks = await db.stock.findMany({
      where: {
        indices: {
          has: index
        }
      },
      orderBy: { ticker: 'asc' }
    });
    return (stocks as unknown as PrismaStockRow[]).map(mapRowToStock);
  } catch (error) {
    console.error(`Error fetching stocks for index ${index}:`, error);
    return [];
  }
}

export async function getStocksByIndustry(industry: string): Promise<Stock[]> {
  try {
    const stocks = await db.stock.findMany({
      where: { industry },
      orderBy: { ticker: 'asc' }
    });
    return (stocks as unknown as PrismaStockRow[]).map(mapRowToStock);
  } catch (error) {
    console.error(`Error fetching stocks for industry ${industry}:`, error);
    return [];
  }
}

export async function searchStocks(query: string): Promise<Stock[]> {
  try {
    const stocks = await db.stock.findMany({
      where: {
        OR: [
          { ticker: { contains: query.toUpperCase(), mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } }
        ]
      },
      orderBy: { ticker: 'asc' }
    });
    return (stocks as unknown as PrismaStockRow[]).map(mapRowToStock);
  } catch (error) {
    console.error(`Error searching stocks for query ${query}:`, error);
    return [];
  }
}

export async function getStockByTicker(ticker: string): Promise<Stock | null> {
  try {
    const stock = await db.stock.findUnique({
      where: { ticker: ticker.toUpperCase() }
    });
    if (!stock) return null;
    return mapRowToStock(stock as unknown as PrismaStockRow);
  } catch (error) {
    console.error(`Error fetching stock ${ticker}:`, error);
    return null;
  }
}

export async function getAllIndustries(): Promise<string[]> {
  try {
    const industries = await db.stock.findMany({
      select: { industry: true },
      distinct: ['industry']
    });
    return industries.map((i) => i.industry).sort();
  } catch (error) {
    console.error('Error fetching industries:', error);
    return [];
  }
}

export async function getAllIndices(): Promise<string[]> {
  try {
    const rows = await db.stock.findMany({
      select: { indices: true }
    });
    const allIndices = new Set<string>();
    rows.forEach((row) => {
      (row.indices ?? []).forEach((index) => allIndices.add(index));
    });
    return Array.from(allIndices).sort();
  } catch (error) {
    console.error('Error fetching indices:', error);
    return [];
  }
}

export async function getStocksWithPagination(
  page: number = 1,
  limit: number = 50,
  filters?: {
    index?: string;
    industry?: string;
    search?: string;
  }
): Promise<{ stocks: Stock[]; total: number; totalPages: number }> {
  try {
    const where: Record<string, unknown> = {};

    if (filters?.index && filters.index !== 'all') {
      where.indices = { has: filters.index };
    }

    if (filters?.industry && filters.industry !== 'all') {
      where.industry = filters.industry;
    }

    if (filters?.search) {
      where.OR = [
        { ticker: { contains: filters.search.toUpperCase(), mode: 'insensitive' } },
        { name: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const [stocks, total] = await Promise.all([
      db.stock.findMany({
        where: where as { [key: string]: unknown },
        orderBy: { ticker: 'asc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      db.stock.count({ where: where as { [key: string]: unknown } })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      stocks: (stocks as unknown as PrismaStockRow[]).map(mapRowToStock),
      total,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching stocks with pagination:', error);
    return { stocks: [], total: 0, totalPages: 0 };
  }
}
