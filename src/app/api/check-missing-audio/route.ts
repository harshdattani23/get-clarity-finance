import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEnabledPodcastLanguages } from '@/config/podcastLanguages';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking for missing audio requests for today...');

    const today = new Date();
    const dateStart = new Date(today);
    dateStart.setUTCHours(0, 0, 0, 0);
    const dateEnd = new Date(today);
    dateEnd.setUTCHours(23, 59, 59, 999);

    console.log(`Checking date range: ${dateStart.toISOString()} to ${dateEnd.toISOString()}`);

    // Get all enabled languages
    const enabledLanguages = getEnabledPodcastLanguages();
    const languageNames = enabledLanguages.map(lang => {
      const languageMap: Record<string, string> = {
        'en': 'English',
        'hi': 'हिन्दी',
        'mr': 'मराठी', 
        'gu': 'ગુજરાતી',
        'ta': 'தமிழ்',
        'te': 'తెలుగు',
        'bn': 'বাংলা'
      };
      return languageMap[lang.code] || 'English';
    });

    // Check which episodes exist for today
    const todaysEpisodes = await prisma.podcastEpisode.findMany({
      where: {
        OR: [
          {
            date: {
              gte: dateStart,
              lte: dateEnd,
            },
          },
          {
            createdAt: {
              gte: dateStart,
              lte: dateEnd,
            },
          },
          {
            publishedAt: {
              gte: dateStart,
              lte: dateEnd,
            },
          },
        ],
      },
      select: {
        id: true,
        language: true,
        requestId: true,
        audioStatus: true,
        audioUrl: true,
        createdAt: true
      }
    });

    console.log(`Found ${todaysEpisodes.length} episodes for today`);

    // Analyze what's missing
    const episodesByLanguage = todaysEpisodes.reduce((acc, episode) => {
      acc[episode.language] = episode;
      return acc;
    }, {} as Record<string, typeof todaysEpisodes[0]>);

    const analysis = languageNames.map(languageName => {
      const episode = episodesByLanguage[languageName];
      const languageCode = enabledLanguages.find(lang => {
        const langMap: Record<string, string> = {
          'en': 'English',
          'hi': 'हिन्दी',
          'mr': 'मराठी', 
          'gu': 'ગુજરાતી',
          'ta': 'தமிழ்',
          'te': 'తెলుగు',
          'bn': 'বাংলা'
        };
        return langMap[lang.code] === languageName;
      })?.code || 'en';

      if (!episode) {
        return {
          languageCode,
          languageName,
          status: 'missing_episode',
          needsGeneration: true,
          reason: 'No episode exists for today'
        };
      }

      if (!episode.requestId) {
        return {
          languageCode,
          languageName,
          status: 'missing_request_id',
          needsGeneration: true,
          reason: 'Episode exists but no audio request ID',
          episodeId: episode.id
        };
      }

      if (episode.audioStatus === 'FAILED') {
        return {
          languageCode,
          languageName,
          status: 'failed',
          needsGeneration: true,
          reason: 'Audio generation failed, needs retry',
          episodeId: episode.id,
          requestId: episode.requestId
        };
      }

      return {
        languageCode,
        languageName,
        status: episode.audioStatus?.toLowerCase() || 'unknown',
        needsGeneration: false,
        reason: `Audio ${episode.audioStatus || 'status unknown'}`,
        episodeId: episode.id,
        requestId: episode.requestId,
        hasAudio: !!episode.audioUrl
      };
    });

    const languagesNeedingGeneration = analysis.filter(lang => lang.needsGeneration);
    const languagesWithAudio = analysis.filter(lang => !lang.needsGeneration);

    console.log(`Languages needing generation: ${languagesNeedingGeneration.length}`);
    console.log(`Languages with audio/in progress: ${languagesWithAudio.length}`);

    return NextResponse.json({
      success: true,
      date: today.toISOString().split('T')[0],
      totalLanguages: languageNames.length,
      languagesNeedingGeneration: languagesNeedingGeneration.length,
      languagesWithAudio: languagesWithAudio.length,
      analysis: analysis,
      needsGeneration: languagesNeedingGeneration,
      hasAudio: languagesWithAudio,
      summary: {
        hasEnglishEpisode: !!episodesByLanguage['English'],
        totalEpisodesFound: todaysEpisodes.length,
        readyForBulkGeneration: languagesNeedingGeneration.length > 0 && !!episodesByLanguage['English']
      }
    });

  } catch (error) {
    console.error('Error checking missing audio:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check missing audio',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
