import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface Threat {
  type: string;
  count: number;
}

interface Database {
  trending_threats: Threat[];
}

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const db: Database = JSON.parse(fileContents);
    
    return NextResponse.json(db.trending_threats || []);
  } catch (error) {
    console.error('Error fetching trending threats:', error);
    return NextResponse.json({ error: 'Failed to fetch trending threats' }, { status: 500 });
  }
}
