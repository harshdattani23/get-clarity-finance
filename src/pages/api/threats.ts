import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type ThreatSummary = {
    name: string;
    count: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ThreatSummary[] | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const dbPath = path.resolve(process.cwd(), 'db.json');

  try {
    if (!fs.existsSync(dbPath)) {
      return res.status(200).json([]);
    }

    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    const dbData = JSON.parse(fileContent);
    const analyses = dbData.analyses || [];

    const scamTypeCounts = analyses.reduce((acc, analysis) => {
      const type = analysis.scamType || 'Other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const threatSummary: ThreatSummary[] = Object.entries(scamTypeCounts)
      .map(([name, count]) => ({
        name,
        count: count as number,
      }))
      .sort((a, b) => b.count - a.count); // Sort by count descending

    res.status(200).json(threatSummary);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    res.status(500).json({ message: 'Error processing threat data.' });
  }
}
