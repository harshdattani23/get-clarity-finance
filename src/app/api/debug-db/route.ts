import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('=== DEBUGGING DATABASE CONTENT ===');
    
    // Get all episodes in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const allEpisodes = await prisma.podcastEpisode.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        keyPoints: {
          orderBy: { order: 'asc' }
        },
        sources: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    
    console.log(`Found ${allEpisodes.length} episodes in last 30 days`);
    
    // Check for today's episodes specifically
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todaysEpisodes = await prisma.podcastEpisode.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      },
      include: {
        keyPoints: true,
        sources: true
      }
    });
    
    // Check for English episodes specifically
    const englishEpisodes = await prisma.podcastEpisode.findMany({
      where: {
        language: 'English',
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        keyPoints: true,
        sources: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
    
    console.log(`Today's episodes: ${todaysEpisodes.length}`);
    console.log(`English episodes in last 30 days: ${englishEpisodes.length}`);
    
    // Check what dates episodes were created
    const episodeDates = allEpisodes.map(ep => ({
      id: ep.id,
      language: ep.language,
      createdAt: ep.createdAt,
      date: ep.date,
      title: ep.title.substring(0, 50)
    }));
    
    return NextResponse.json({
      success: true,
      summary: {
        totalEpisodes: allEpisodes.length,
        todaysEpisodes: todaysEpisodes.length,
        englishEpisodes: englishEpisodes.length,
        latestEpisodeDate: allEpisodes[0]?.createdAt || null,
        oldestEpisodeDate: allEpisodes[allEpisodes.length - 1]?.createdAt || null
      },
      todayDateRange: {
        start: startOfDay.toISOString(),
        end: endOfDay.toISOString(),
        currentTime: new Date().toISOString()
      },
      allEpisodes: episodeDates,
      latestEnglishEpisode: englishEpisodes[0] ? {
        id: englishEpisodes[0].id,
        title: englishEpisodes[0].title,
        language: englishEpisodes[0].language,
        createdAt: englishEpisodes[0].createdAt,
        date: englishEpisodes[0].date,
        keyPointsCount: englishEpisodes[0].keyPoints?.length || 0,
        sourcesCount: englishEpisodes[0].sources?.length || 0,
        marketSummary: englishEpisodes[0].marketSummary?.substring(0, 100) + '...'
      } : null,
      debugQuery: {
        searchingFor: 'English episodes created today',
        todayStart: startOfDay.toISOString(),
        todayEnd: endOfDay.toISOString()
      }
    });
    
  } catch (error) {
    console.error('Debug DB error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
