import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== DEBUG PLAYLIST API ===');
    
    // Get the podcast playlist data
    const playlistUrl = `${request.nextUrl.origin}/api/podcast-playlist?days=7`;
    console.log('Fetching from:', playlistUrl);
    
    const response = await fetch(playlistUrl);
    const data = await response.json();
    
    console.log('API Response Status:', response.status);
    console.log('Total Episodes:', data.episodes?.length || 0);
    
    if (data.episodes && data.episodes.length > 0) {
      const firstEpisode = data.episodes[0];
      console.log('=== FIRST EPISODE SAMPLE ===');
      console.log('Title:', firstEpisode.title);
      console.log('Summary:', firstEpisode.summary?.substring(0, 100) + '...');
      console.log('Key Points Count:', firstEpisode.keyPoints?.length || 0);
      console.log('Key Points Sample:', firstEpisode.keyPoints?.slice(0, 3) || []);
      console.log('Sources Count:', firstEpisode.sources?.length || 0);
      console.log('Sources Sample:', firstEpisode.sources?.slice(0, 2) || []);
      console.log('Language:', firstEpisode.language);
      console.log('Created At:', firstEpisode.createdAt);
      console.log('Audio URL:', firstEpisode.audioUrl ? 'Present' : 'None');
      console.log('Market Summary:', firstEpisode.marketSummary?.substring(0, 100) + '...' || 'None');
    }
    
    // Return formatted debug info
    return NextResponse.json({
      success: true,
      totalEpisodes: data.episodes?.length || 0,
      sampleEpisode: data.episodes?.[0] ? {
        id: data.episodes[0].id,
        title: data.episodes[0].title,
        language: data.episodes[0].language,
        keyPointsCount: data.episodes[0].keyPoints?.length || 0,
        keyPointsSample: data.episodes[0].keyPoints?.slice(0, 5) || [],
        sourcesCount: data.episodes[0].sources?.length || 0,
        sourcesSample: data.episodes[0].sources?.slice(0, 3) || [],
        hasAudio: !!data.episodes[0].audioUrl,
        marketSummary: data.episodes[0].marketSummary?.substring(0, 200) || null,
        createdAt: data.episodes[0].createdAt
      } : null,
      rawApiResponse: {
        status: response.status,
        totalEpisodes: data.totalEpisodes,
        totalWithAudio: data.totalWithAudio,
        totalDates: data.totalDates,
        dateRange: data.dateRange
      }
    });
    
  } catch (error) {
    console.error('Debug playlist error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
