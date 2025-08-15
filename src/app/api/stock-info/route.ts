import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getStockInfoFromGemini(symbol: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    Provide a brief overview of the company with ticker symbol ${symbol}, including its business, sector, and key financial highlights.
    Format the output as a JSON object with the following keys: "companyProfile", "sector", "financialHighlights".
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = await response.text();
    const jsonString = responseText.replace(/```json\n|```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error fetching stock info from Gemini:', error);
    throw new Error('Failed to fetch stock info');
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (typeof symbol !== 'string') {
    return NextResponse.json({ error: 'Symbol must be a string' }, { status: 400 });
  }

  try {
    const stockInfo = await getStockInfoFromGemini(symbol);
    return NextResponse.json(stockInfo);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock info' }, { status: 500 });
  }
}
