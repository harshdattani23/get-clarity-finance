import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

async function getUserIdFromToken(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return null;
  }
  try {
    const ticket = await clerkClient.verifyToken(token);
    return ticket.sub;
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
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                onboarded: true,
            }
        });
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
