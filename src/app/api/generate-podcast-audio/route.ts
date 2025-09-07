import { NextRequest, NextResponse } from 'next/server';
import { getAutoContentLanguageCode } from '@/config/podcastLanguages';
import PodcastService from '@/lib/services/podcastService';
import { databaseService } from '@/lib/services/databaseService';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

interface PodcastCreateRequest {
  resources: Array<{
    type: 'text' | 'website';
    content: string;
  }>;
  text: string; // Instructions for the podcast
  duration?: 'short' | 'default' | 'long';
  language?: string; // Language for the podcast
}

interface PodcastStatusResponse {
  id: string;
  status: number; // 0=Pending, 5=Processing, 100=Completed
  audio_url?: string;
  audio_title?: string;
  response_text?: string;
  audio_duration?: number;
  file_size?: number;
  share_url?: string;
  error_code?: number;
  error_message?: string;
  updated_on?: string;
  requested_on?: string;
}

interface AudioResponse {
  audioUrl?: string;
  audioTitle?: string;
  duration?: number;
  transcript?: string;
  shareUrl?: string;
  requestId?: string;
  status: number;
  success: boolean;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { resources, text, duration = 'default', language = 'English' }: PodcastCreateRequest = await request.json();

    if (!resources || resources.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Resources are required for podcast creation'
      }, { status: 400 });
    }

    // AutoContent API configuration
    const autoContentApiKey = process.env.AUTOCONTENT_API_KEY;
    
    if (!autoContentApiKey) {
      return NextResponse.json({
        success: false,
        error: 'AutoContent API key not configured'
      }, { status: 500 });
    }

    console.log('Creating podcast episode with AutoContent API...');
    console.log('Resources:', resources.length, 'Duration:', duration, 'Language:', language);

    // Step 1: Create podcast episode request with retry logic
    let createResponse;
    let lastError;
    
    const maxRetries = 2;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`AutoContent API attempt ${attempt}/${maxRetries}`);
        
        const axiosResponse = await axios.post('https://api.autocontentapi.com/Content/Create', {
          resources: resources,
          outputType: 'audio',
          text: text,
          duration: duration,
          language: language
        }, {
          headers: {
            'Authorization': `Bearer ${autoContentApiKey}`,
            'Content-Type': 'application/json',
            'accept': 'text/plain'
          },
          timeout: 45000, // 45 second timeout (reduced from 60s)
          maxRedirects: 3
        });
        
        // Convert axios response to fetch-like response for compatibility
        createResponse = {
          ok: axiosResponse.status >= 200 && axiosResponse.status < 300,
          status: axiosResponse.status,
          json: async () => axiosResponse.data,
          text: async () => JSON.stringify(axiosResponse.data)
        };
        
        break; // Success, exit retry loop
        
      } catch (error) {
        lastError = error;
        console.error(`AutoContent API attempt ${attempt} failed:`, error instanceof Error ? error.message : error);
        
        if (attempt < maxRetries) {
          const delay = attempt * 2000; // 2s, 4s delay
          console.log(`Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    if (!createResponse) {
      throw new Error(`AutoContent API failed after ${maxRetries} attempts. Last error: ${lastError instanceof Error ? lastError.message : lastError}`);
    }

    console.log('AutoContent API create response status:', createResponse.status);

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('AutoContent API create error:', errorText);
      throw new Error(`AutoContent API create error: ${createResponse.status} - ${errorText}`);
    }

    const createResult = await createResponse.json();
    console.log('Podcast creation initiated, request_id:', createResult.request_id);

    if (!createResult.request_id) {
      throw new Error('No request_id returned from AutoContent API');
    }

    // CRITICAL: Log ALL requests in database against their language and date
    let episodeId = null;
    try {
      const today = new Date();
      
      // Determine the correct language name for database
      let languageName = 'English'; // Default
      if (language && language !== 'English') {
        // Convert AutoContent language to language code, then to database name
        const langCode = getLanguageCodeFromAutoContent(language);
        languageName = getLanguageName(langCode);
      }
      
      console.log(`Logging ${languageName} podcast request in database with requestId: ${createResult.request_id}`);
      
      // For English, find and update existing episode
      if (languageName === 'English') {
        const existingEnglish = await databaseService.withConnection(
          async () => {
            const dateStart = new Date(today);
            dateStart.setUTCHours(0, 0, 0, 0);
            const dateEnd = new Date(today);
            dateEnd.setUTCHours(23, 59, 59, 999);
            
            return await prisma.podcastEpisode.findFirst({
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
                language: 'English',
              },
            });
          },
          10000
        );
        
        if (existingEnglish) {
          // Update existing English episode
          await databaseService.withConnection(
            () => PodcastService.updateEpisodeAudio(existingEnglish.id, {
              audioStatus: 'GENERATING',
              requestId: createResult.request_id
            }),
            10000
          );
          episodeId = existingEnglish.id;
          console.log('Updated existing English episode with requestId:', existingEnglish.id);
        } else {
          console.log('No existing English episode found - this request will be orphaned');
        }
      } else {
        // For non-English languages, create a new episode record
        const createdEpisodeId = await databaseService.withConnection(
          () => PodcastService.createAudioEpisodeFromEnglish(
            today,
            languageName,
            createResult.request_id
          ),
          15000
        );
        
        if (createdEpisodeId) {
          episodeId = createdEpisodeId;
          console.log(`Created new ${languageName} episode for request:`, createdEpisodeId);
        } else {
          console.error(`Failed to create ${languageName} episode - request will be orphaned`);
        }
      }
    } catch (dbError) {
      console.error('Failed to log request in database:', dbError);
      // Continue anyway - don't fail the audio generation
    }

    // Return the request ID for polling
    return NextResponse.json({
      requestId: createResult.request_id,
      episodeId: episodeId,
      language: language,
      status: createResult.status || 0,
      success: true,
      message: 'Podcast creation started and logged in database. Use the request ID to check status.'
    });

  } catch (error) {
    console.error('Podcast creation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create podcast episode',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to create podcast from existing regulatory news data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const duration = searchParams.get('duration') || 'default';
    const languageCode = searchParams.get('lang') || 'en';

    // First, get the podcast content with language parameter
    const podcastUrl = `${request.nextUrl.origin}/api/market-podcast?lang=${languageCode}`;
    const podcastResponse = await fetch(podcastUrl);
    if (!podcastResponse.ok) {
      throw new Error('Failed to fetch podcast content');
    }

    const podcastData = await podcastResponse.json();
    
    if (!podcastData.episodes || podcastData.episodes.length === 0) {
      throw new Error('No podcast episodes available');
    }

    const episode = podcastData.episodes[0]; // We always have one episode

    // Prepare resources for AutoContent API
    const resources = [
      {
        type: 'text' as const,
        content: `Title: ${episode.title}

Summary: ${episode.summary}

Key Points:
${episode.keyPoints.map((point: string, index: number) => `${index + 1}. ${point}`).join('\n')}

Market Summary: ${podcastData.marketSummary}`
      }
    ];

    // Sources are no longer used - content is purely bullet-point based
    // No website resources added from sources

    const autoContentLanguage = getAutoContentLanguageCode(languageCode);
    
    const podcastInstructions = `Create an engaging and professional podcast episode discussing today's key regulatory developments in Indian financial markets. 

Focus on:
- SEBI (Securities and Exchange Board of India) updates
- RBI (Reserve Bank of India) policy changes
- Important compliance and regulatory changes
- Make it informative yet accessible for investors and financial professionals
- Use a conversational tone suitable for a daily regulatory news podcast
- Include explanations of technical regulatory terms
- Emphasize the practical impact of these changes on investors and market participants

Generate the podcast in ${autoContentLanguage} language.

Title the episode: "${episode.title}"`;

    // Create podcast using the POST endpoint
    const createResponse = await fetch(`${request.nextUrl.origin}/api/generate-podcast-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resources: resources,
        text: podcastInstructions,
        duration: duration as 'short' | 'default' | 'long',
        language: autoContentLanguage
      }),
    });

    if (!createResponse.ok) {
      throw new Error('Failed to initiate podcast creation');
    }

    const createResult = await createResponse.json();
    
    // PERMANENT FIX: Create/update language-specific episode with the requestId
    if (createResult.requestId && episode.id) {
      try {
        let targetEpisodeId = episode.id;
        
        // If this is a non-English language request, create a separate episode record
        if (languageCode !== 'en') {
          const today = new Date();
          const languageName = getLanguageName(languageCode);
          
          console.log(`Creating ${languageName} episode from English content for audio generation`);
          
          const createdEpisodeId = await databaseService.withConnection(
            () => PodcastService.createAudioEpisodeFromEnglish(
              today,
              languageName,
              createResult.requestId
            ),
            15000 // 15 second timeout for database operations
          );
          
          if (createdEpisodeId) {
            targetEpisodeId = createdEpisodeId;
            console.log(`Created ${languageName} episode:`, createdEpisodeId, 'with requestId:', createResult.requestId);
          } else {
            console.error(`Failed to create ${languageName} episode, falling back to English episode`);
          }
        } else {
          // For English episodes, just update with the requestId
          await databaseService.withConnection(
            () => PodcastService.updateEpisodeAudio(episode.id, {
              audioStatus: 'GENERATING',
              requestId: createResult.requestId
            }),
            15000 // 15 second timeout for database operations
          );
          console.log('English episode updated with requestId for audio tracking:', episode.id, createResult.requestId);
        }
      } catch (error) {
        console.error('Failed to create/update episode with requestId:', error);
      }
    }
    
    return NextResponse.json({
      ...createResult,
      episode: {
        id: episode.id,
        title: episode.title
      },
      podcastTitle: podcastData.podcastTitle,
      resourcesCount: resources.length
    });

  } catch (error) {
    console.error('GET podcast creation error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create podcast episode',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to convert language codes to database language names
function getLanguageName(languageCode: string): string {
  const languageMap: Record<string, string> = {
    'en': 'English',
    'hi': 'हिन्दी',
    'mr': 'मराठी', 
    'gu': 'ગુજરાતી',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'bn': 'বাংলা'
  };
  
  return languageMap[languageCode] || 'English';
}

// Helper function to convert AutoContent language back to language code
function getLanguageCodeFromAutoContent(autoContentLanguage: string): string {
  const reverseMap: Record<string, string> = {
    'English': 'en',
    'Hindi': 'hi',
    'Marathi': 'mr',
    'Gujarati': 'gu',
    'Tamil': 'ta',
    'Telugu': 'te',
    'Bengali': 'bn'
  };
  
  return reverseMap[autoContentLanguage] || 'en';
}

function formatEpisodeForAudio(episode: any, podcastTitle: string, marketSummary: string): string {
  let script = `Welcome to ${podcastTitle}.\n\n`;
  
  // Add market summary
  if (marketSummary) {
    script += `Today's Market Overview: ${marketSummary}\n\n`;
  }
  
  // Add episode content
  script += `${episode.title}\n\n`;
  
  if (episode.summary) {
    script += `${episode.summary}\n\n`;
  }
  
  // Add key points with proper pauses
  if (episode.keyPoints && episode.keyPoints.length > 0) {
    script += `Here are today's key regulatory developments:\n\n`;
    
    episode.keyPoints.forEach((point: string, index: number) => {
      script += `Point ${index + 1}: ${point}\n\n`;
    });
  }
  
  // Closing
  script += `That's all for today's regulatory roundup. Stay informed, stay compliant. Thank you for listening.`;
  
  return script;
}
