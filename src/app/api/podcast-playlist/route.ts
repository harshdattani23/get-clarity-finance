import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam) : 7;
    const language = searchParams.get('language');

    console.log(`Fetching podcast episodes for last ${days} days`);

    // Calculate date range
    const today = new Date();
    const rangeStartDate = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));

    // Simple query without complex field handling
    const whereClause: any = {
      createdAt: {
        gte: rangeStartDate,
        lte: today
      }
    };

    if (language && language !== 'all') {
      whereClause.language = language;
    }

    // Direct database query (simplified to avoid timeout issues)
    const episodes = await prisma.podcastEpisode.findMany({
      where: whereClause,
      include: {
        keyPoints: {
          orderBy: {
            order: 'asc'
          }
        },
        sources: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit results
    });

    console.log(`Found ${episodes.length} podcast episodes`);

    // Simple transformation
    const transformedEpisodes = episodes.map(episode => ({
      id: episode.id,
      date: episode.createdAt.toISOString().split('T')[0],
      language: episode.language,
      languageCode: getLanguageCodeFromName(episode.language),
      title: episode.title,
      summary: episode.summary,
      audioUrl: episode.audioUrl || null,
      audioDuration: episode.audioDuration || null,
      keyPoints: episode.keyPoints?.map(kp => kp.point) || [],
      sources: episode.sources?.map(source => ({
        title: source.title || 'Source',
        url: source.url,
        publishedAt: source.publishedAt || null
      })) || [],
      category: episode.category?.toLowerCase() || 'regulatory',
      importance: episode.importance?.toLowerCase() || 'medium',
      createdAt: episode.createdAt.toISOString(),
      podcastTitle: episode.podcastTitle,
      marketSummary: episode.marketSummary
    }));

    // Simple stats
    const totalEpisodes = transformedEpisodes.length;
    const totalWithAudio = transformedEpisodes.filter(ep => ep.audioUrl).length;
    const uniqueDates = [...new Set(transformedEpisodes.map(ep => ep.date))].length;

    const response = {
      episodes: transformedEpisodes,
      totalEpisodes,
      totalWithAudio,
      totalDates: uniqueDates,
      dateRange: {
        start: rangeStartDate.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0],
        days
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Podcast playlist API error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error,
      errorObject: error
    });
    return NextResponse.json({
      error: 'Failed to fetch podcast playlist',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Helper function to map language names back to codes
function getLanguageCodeFromName(languageName: string): string {
  const languageMap: Record<string, string> = {
    'English': 'en',
    'हिन्दी': 'hi',
    'मराठी': 'mr',
    'ગુજરાતી': 'gu',
    'தமிழ்': 'ta',
    'తెలుగు': 'te',
    'বাংলা': 'bn'
  };
  
  return languageMap[languageName] || 'en';
}
