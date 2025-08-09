import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = auth();
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
        const { userId } = auth();
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
