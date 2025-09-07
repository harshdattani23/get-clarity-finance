import { NextRequest, NextResponse } from 'next/server';
import PodcastService from '@/lib/services/podcastService';
import { getEnabledPodcastLanguages } from '@/config/podcastLanguages';

export async function GET(request: NextRequest) {
  try {
    console.log('Checking English content status for all languages...');
    
    // Only check English content once
    let cachedEnglishPodcast;
    let dbError = null;
    
    try {
      cachedEnglishPodcast = await PodcastService.getTodaysPodcast('English');
      console.log('English podcast query result:', cachedEnglishPodcast ? 'Found' : 'Not found');
    } catch (error) {
      console.error('Database error in podcast-status-all:', error);
      dbError = error instanceof Error ? error.message : 'Database connection failed';
    }
    
    const hasEnglishContent = !!cachedEnglishPodcast;
    const languages = getEnabledPodcastLanguages();
    
    console.log(`English content available: ${hasEnglishContent}, Languages: ${languages.length}`);
    
    // If database error, show appropriate error messages
    if (dbError) {
      console.log('Database error detected, marking all languages as having connection issues');
      const allStatuses: Record<string, any> = {};
      
      for (const lang of languages) {
        allStatuses[lang.code] = {
          hasContent: false,
          contentLastGenerated: null,
          totalEpisodes: 0,
          fromDatabase: false,
          error: lang.code === 'en' ? `DB Error: ${dbError}` : 'Database connection issue'
        };
      }
      
      return NextResponse.json({
        success: false,
        hasEnglishContent: false,
        englishContentLastUpdated: null,
        languages: allStatuses,
        dbError: dbError
      });
    }
    
    // Build status for all languages based on English content availability
    const allStatuses: Record<string, any> = {};
    
    for (const lang of languages) {
      allStatuses[lang.code] = {
        hasContent: hasEnglishContent, // All languages use English content
        contentLastGenerated: hasEnglishContent && cachedEnglishPodcast ? cachedEnglishPodcast.lastUpdated : null,
        totalEpisodes: hasEnglishContent && cachedEnglishPodcast ? cachedEnglishPodcast.totalEpisodes : 0,
        fromDatabase: hasEnglishContent && cachedEnglishPodcast ? cachedEnglishPodcast.fromDatabase : false,
        error: hasEnglishContent ? null : (lang.code === 'en' ? 'No content found' : 'Needs English content first')
      };
    }
    
    return NextResponse.json({
      success: true,
      hasEnglishContent,
      englishContentLastUpdated: hasEnglishContent && cachedEnglishPodcast ? cachedEnglishPodcast.lastUpdated : null,
      languages: allStatuses
    });
    
  } catch (error) {
    console.error('Podcast status check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check podcast status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
