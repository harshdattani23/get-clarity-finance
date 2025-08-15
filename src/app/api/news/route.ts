// src/app/api/news/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getNewsFromGemini(symbol: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt =
    symbol === 'general'
      ? 'Get the top 5 latest news headlines for the Indian stock market. For each headline, provide a brief summary and the source.'
      : `Get the top 3 latest news headlines for the stock with ticker ${symbol}. For each headline, provide a brief summary and the source.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const articles = text.split('\n\n').map((article) => {
      const lines = article.split('\n');
      return {
        headline: lines[0]?.replace('Headline: ', '').replace(/\*\*/g, ''),
        summary: lines[1]?.replace('Summary: ', ''),
        source: lines[2]?.replace('Source: ', ''),
      };
    });
    return articles;
  } catch (error) {
    console.error('Error fetching news from Gemini:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (typeof symbol !== 'string') {
    return NextResponse.json({ error: 'Symbol must be a string' }, { status: 400 });
  }

  try {
    const news = await getNewsFromGemini(symbol);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
