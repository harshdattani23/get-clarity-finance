import { NextRequest, NextResponse } from 'next/server';
import clearPodcastData from '@/scripts/clearPodcastData';

/**
 * Admin API endpoint to clear all podcast data from the database
 * Use with caution - this will delete ALL podcast episodes and related data
 */
export async function DELETE(request: NextRequest) {
  try {
    // Add basic authentication check if needed
    const { searchParams } = new URL(request.url);
    const confirm = searchParams.get('confirm');
    
    if (confirm !== 'yes') {
      return NextResponse.json({
        error: 'Confirmation required. Add ?confirm=yes to proceed with deletion.',
        warning: 'This will delete ALL podcast episodes and related data permanently.'
      }, { status: 400 });
    }

    console.log('Admin request to clear all podcast data...');
    
    const deletedCount = await clearPodcastData();
    
    return NextResponse.json({
      success: true,
      message: `Successfully cleared all podcast data from database.`,
      deletedEpisodes: deletedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Admin clear podcasts API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to clear podcast data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Also support POST for consistency
export async function POST(request: NextRequest) {
  return DELETE(request);
}
