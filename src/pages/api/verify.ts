import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

type Entity = {
  id: string;
  name: string;
  type: string;
  status: string;
};

type Data = {
  entities: Entity[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { query } = req.body;

    const dbPath = path.resolve(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const data: Data = JSON.parse(fileContents);

    const results = data.entities.filter(entity => 
      entity.name.toLowerCase().includes(query.toLowerCase()) || 
      entity.id.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'No matching entities found' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 