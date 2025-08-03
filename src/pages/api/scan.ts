import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

interface SuspiciousUrl {
  url: string;
  reason: string;
}

interface Database {
  suspicious_urls: SuspiciousUrl[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ message: 'URL is required' });
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch (_) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }

  // Construct the path to the db.json file
  const dbPath = path.join(process.cwd(), 'db.json');
  const fileContents = fs.readFileSync(dbPath, 'utf8');
  const db: Database = JSON.parse(fileContents);

  const suspiciousEntry = db.suspicious_urls.find(entry => entry.url === url);

  if (suspiciousEntry) {
    return res.status(200).json({ isSuspicious: true, reason: suspiciousEntry.reason });
  }

  // Add more sophisticated checks here in the future (e.g., regex, AI analysis)

  res.status(200).json({ isSuspicious: false, reason: 'Looks Safe' });
}
