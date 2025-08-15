// src/pages/api/news.ts
import { NextApiRequest, NextApiResponse } from 'next';
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
    // Basic parsing, assuming a structured output from Gemini
    // This might need to be made more robust
    const articles = text.split('\n\n').map((article) => {
      const lines = article.split('\n');
      return {
        headline: lines[0]?.replace('Headline: ', '').replace('**', ''),
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (typeof symbol !== 'string') {
    return res.status(400).json({ error: 'Symbol must be a string' });
  }

  try {
    const news = await getNewsFromGemini(symbol);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
