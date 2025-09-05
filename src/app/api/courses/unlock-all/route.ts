import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Mock storage for demo purposes when database is not available
const moduleProgressStorage: Record<string, Record<string, { progress: number; completed: boolean }>> = {};

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Initialize user storage if not exists
    if (!moduleProgressStorage[userId]) {
      moduleProgressStorage[userId] = {};
    }

    // List of all modules to unlock
    const allModules = [
      'intro-to-frauds',
      'intermediate-frauds', 
      'ponzi-schemes',
      'pump-dump',
      'digital-frauds',
      'fake-advisors',
      'insider-trading',
      'spoofing-wash-trading'
    ];

    // Mark all modules as completed to unlock everything
    allModules.forEach(moduleId => {
      moduleProgressStorage[userId][moduleId] = {
        progress: 100,
        completed: true
      };
    });

    console.log(`All modules unlocked for user ${userId}`);
    console.log('Updated progress:', moduleProgressStorage[userId]);

    return NextResponse.json({
      success: true,
      message: 'All courses have been unlocked successfully!',
      unlockedModules: allModules,
      userProgress: moduleProgressStorage[userId]
    });

  } catch (error) {
    console.error('[UNLOCK_ALL_COURSES_POST]', error);
    return NextResponse.json(
      { error: 'Failed to unlock courses' },
      { status: 500 }
    );
  }
}
