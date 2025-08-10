import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@clerk/backend';

const SECRET_KEY = process.env.CLERK_SECRET_KEY;

async function getUserIdFromToken(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token || !SECRET_KEY) {
    return null;
  }
  try {
    const claims = await verifyToken(token, { secretKey: SECRET_KEY });
    return claims.sub;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return new NextResponse(JSON.stringify({ onboarded: false }), { status: 200 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('[ME_GET]', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
        const userId = await getUserIdFromToken(req);
        if (!userId) {
            return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        const body = await req.json();
        const updatedUser = await db.user.update({
            where: { clerkId: userId },
            data: { ...body, onboarded: true },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('[ME_PUT]', error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
