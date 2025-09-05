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

    const body = await request.json();
    const { moduleId } = body;

    if (!moduleId) {
      return NextResponse.json(
        { error: 'moduleId is required' },
        { status: 400 }
      );
    }

    // Initialize user storage if not exists
    if (!moduleProgressStorage[userId]) {
      moduleProgressStorage[userId] = {};
    }

    // Mark module as completed
    moduleProgressStorage[userId][moduleId] = {
      progress: 100,
      completed: true
    };

    console.log(`Module ${moduleId} completed for user ${userId}`);
    console.log('Current progress:', moduleProgressStorage[userId]);

    // Determine which modules should be unlocked based on completion
    const unlockedModules = getUnlockedModules(moduleProgressStorage[userId]);

    return NextResponse.json({
      success: true,
      moduleId,
      message: `Module ${moduleId} marked as complete`,
      unlockedModules,
      userProgress: moduleProgressStorage[userId]
    });

  } catch (error) {
    console.error('[MODULE_COMPLETE_POST]', error);
    return NextResponse.json(
      { error: 'Failed to complete module' },
      { status: 500 }
    );
  }
}

function getUnlockedModules(userProgress: Record<string, { progress: number; completed: boolean }>) {
  // All modules are unlocked by default
  const modules = {
    'intro-to-frauds': { difficulty: 'beginner', unlocked: true },
    'intermediate-frauds': { difficulty: 'intermediate', unlocked: true },
    'ponzi-schemes': { difficulty: 'intermediate', unlocked: true },
    'pump-dump': { difficulty: 'intermediate', unlocked: true },
    'digital-frauds': { difficulty: 'intermediate', unlocked: true },
    'fake-advisors': { difficulty: 'intermediate', unlocked: true },
    'insider-trading': { difficulty: 'advanced', unlocked: true },
    'spoofing-wash-trading': { difficulty: 'advanced', unlocked: true }
  };

  return modules;
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userProgress = moduleProgressStorage[userId] || {};
    const unlockedModules = getUnlockedModules(userProgress);

    return NextResponse.json({
      userProgress,
      unlockedModules
    });

  } catch (error) {
    console.error('[MODULE_PROGRESS_GET]', error);
    return NextResponse.json(
      { error: 'Failed to get module progress' },
      { status: 500 }
    );
  }
}
