import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    
    // Fetch user from database
    const dbUser = await db.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) {
      return new NextResponse(JSON.stringify({ onboarded: false }), { status: 200 });
    }
    
    // Fetch full user data from Clerk
    let clerkUser = null;
    try {
      const client = await clerkClient();
      clerkUser = await client.users.getUser(userId);
    } catch (clerkError) {
      // Silently handle Clerk errors
    }
    
    // Merge database user with Clerk user data
    const mergedUser = {
      ...dbUser,
      // Add Clerk fields that might not be in the database
      firstName: clerkUser?.firstName || null,
      lastName: clerkUser?.lastName || null,
      fullName: clerkUser?.fullName || null,
      name: clerkUser?.fullName || (clerkUser?.firstName && clerkUser?.lastName ? `${clerkUser.firstName} ${clerkUser.lastName}` : null),
      primaryEmailAddress: clerkUser?.primaryEmailAddress?.emailAddress || dbUser.email,
      // Keep database fields as primary
      username: dbUser.username || clerkUser?.username,
      email: dbUser.email || clerkUser?.primaryEmailAddress?.emailAddress
    };
    
    return NextResponse.json(mergedUser);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
        const { userId } = await auth();
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
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
