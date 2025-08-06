// src/pages/api/stock-info.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stock_name, stats } = req.query;

  if (!stock_name || typeof stock_name !== 'string') {
    return res.status(400).json({ error: 'stock_name is required' });
  }

  const cleanedStockName = stock_name.replace(/ Ltd\.$/, '').replace(/ /g, '+');

  let url;
  if (stats && typeof stats === 'string') {
    url = `${process.env.INDIAN_API_BASE_URL}/historical_stats?stock_name=${cleanedStockName}&stats=${stats}`;
  } else {
    url = `${process.env.INDIAN_API_BASE_URL}/stock?name=${cleanedStockName}`;
  }

  console.log('Fetching data from URL:', url);

  const options = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.INDIAN_API_KEY || ''
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`External API Error: Status ${response.status}, Body: ${errorBody}`);
      return res.status(response.status).json({ error: `Failed to fetch stock data: ${errorBody}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data', details: error.message });
  }
}
