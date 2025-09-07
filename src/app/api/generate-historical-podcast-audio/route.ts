import { NextRequest, NextResponse } from 'next/server';
import PodcastService from '@/lib/services/podcastService';
import { getAutoContentLanguageCode, getLanguageDisplayName, isPodcastLanguageSupported } from '@/config/podcastLanguages';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, language, duration = 'default' } = body;

    if (!date || !language) {
      return NextResponse.json({
        error: 'Date and language are required'
      }, { status: 400 });
    }

    // Validate language support
    const languageCode = getLanguageCodeFromDisplayName(language);
    if (!languageCode || !isPodcastLanguageSupported(languageCode)) {
      return NextResponse.json({
        error: `Language '${language}' is not supported for podcast generation`
      }, { status: 400 });
    }

    const targetDate = new Date(date);
    const autoContentLanguage = getAutoContentLanguageCode(languageCode);
    const displayLanguage = getLanguageDisplayName(languageCode);

    console.log(`Generating historical audio for ${displayLanguage} on ${targetDate.toISOString().split('T')[0]}`);

    // Check if English content exists for that date
    const englishEpisode = await PodcastService.getEpisodeByDateAndLanguage(targetDate, 'English');
    
    if (!englishEpisode) {
      return NextResponse.json({
        error: `No English content found for ${targetDate.toISOString().split('T')[0]}. Generate base content first.`
      }, { status: 404 });
    }

    // Prepare content for AutoContent API
    const episodeContent = [
      `Title: ${englishEpisode.title}`,
      '',
      'Summary:',
      englishEpisode.summary,
      '',
      'Key Points:',
      ...englishEpisode.keyPoints.map((point, index) => `${index + 1}. ${point}`),
      '',
      'Market Summary:',
      englishEpisode.marketSummary,
      '',
      'Sources:',
      ...englishEpisode.sources.map((source, index) => `${index + 1}. ${source.title}: ${source.url}`)
    ].join('\n');

    // Call AutoContent API to generate podcast using the correct endpoint and format
    const autoContentApiKey = process.env.AUTOCONTENT_API_KEY;
    if (!autoContentApiKey) {
      return NextResponse.json({
        error: 'AutoContent API key not configured'
      }, { status: 500 });
    }

    const podcastInstructions = `Create an engaging and professional podcast episode discussing key regulatory developments in Indian financial markets. 

Focus on:
- SEBI (Securities and Exchange Board of India) updates
- RBI (Reserve Bank of India) policy changes
- Important compliance and regulatory changes
- Make it informative yet accessible for investors and financial professionals
- Use a conversational tone suitable for a daily regulatory news podcast
- Include explanations of technical regulatory terms
- Emphasize the practical impact of these changes on investors and market participants

Generate the podcast in ${autoContentLanguage} language.

Title the episode: "${englishEpisode.title}"`;

    const resources = [
      {
        type: 'text' as const,
        content: episodeContent
      }
    ];

    const axiosResponse = await axios.post('https://api.autocontentapi.com/Content/Create', {
      resources: resources,
      outputType: 'audio',
      text: podcastInstructions,
      duration: duration,
      language: autoContentLanguage
    }, {
      headers: {
        'Authorization': `Bearer ${autoContentApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
      timeout: 60000 // 60 second timeout
    });

    if (axiosResponse.status < 200 || axiosResponse.status >= 300) {
      throw new Error(`AutoContent API error: ${axiosResponse.status} - ${JSON.stringify(axiosResponse.data)}`);
    }

    const autoContentData = axiosResponse.data;
    const requestId = autoContentData.request_id;

    if (!requestId) {
      throw new Error('No request ID returned from AutoContent API');
    }

    // Create or update episode in database with request ID (use display language, not AutoContent language code)
    const episodeId = await PodcastService.createAudioEpisodeFromEnglish(
      targetDate,
      displayLanguage,
      requestId
    );

    if (!episodeId) {
      throw new Error('Failed to create audio episode in database');
    }

    console.log(`Historical audio generation started: ${requestId} for ${displayLanguage} on ${date}`);

    return NextResponse.json({
      success: true,
      requestId,
      episodeId,
      language: displayLanguage,
      date: targetDate.toISOString().split('T')[0],
      status: 0, // Pending
      message: `Audio generation started for ${displayLanguage} podcast on ${targetDate.toISOString().split('T')[0]}`
    });

  } catch (error) {
    console.error('Historical podcast audio generation error:', error);
    return NextResponse.json({
      error: 'Failed to generate historical podcast audio',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to map display names back to language codes
function getLanguageCodeFromDisplayName(displayName: string): string | null {
  const languageMap: Record<string, string> = {
    'English': 'en',
    'हिंदी': 'hi', 
    'Hindi': 'hi',
    'मराठी': 'mr',
    'Marathi': 'mr', 
    'ગુજરાતી': 'gu',
    'Gujarati': 'gu',
    'தமிழ்': 'ta',
    'Tamil': 'ta',
    'తెలుగు': 'te', 
    'Telugu': 'te',
    'বাংলা': 'bn',
    'Bengali': 'bn'
  };
  
  return languageMap[displayName] || null;
}
