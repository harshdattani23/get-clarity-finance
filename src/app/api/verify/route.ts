import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

interface RegisteredIntermediary {
  name: string;
  reg_no: string;
}

interface Database {
  registered_intermediaries: RegisteredIntermediary[];
}

export async function POST(request: NextRequest) {
  const { reg_no } = await request.json();

  if (typeof reg_no !== 'string') {
    return NextResponse.json({ error: 'Registration number must be a string' }, { status: 400 });
  }

  try {
    const dbPath = path.join(process.cwd(), 'db.json');
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const db: Database = JSON.parse(fileContents);

    const intermediary = db.registered_intermediaries.find(
      (item) => item.reg_no.toLowerCase() === reg_no.toLowerCase()
    );

    if (intermediary) {
      return NextResponse.json({ is_registered: true, name: intermediary.name });
    } else {
      return NextResponse.json({ is_registered: false });
    }
  } catch (error) {
    console.error('Error verifying registration number:', error);
    return NextResponse.json({ error: 'Failed to verify registration number' }, { status: 500 });
  }
} 