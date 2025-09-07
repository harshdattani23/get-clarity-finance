import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import PodcastService from '@/lib/services/podcastService';
import axios from 'axios';

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

export async function GET(request: NextRequest) {
  try {
    console.log('Background audio check starting...');

    // Find all episodes with requestId but no audioUrl (still generating or failed)
    const pendingEpisodes = await prisma.podcastEpisode.findMany({
      where: {
        requestId: {
          not: null
        },
        audioStatus: {
          in: ['GENERATING', 'NOT_GENERATED']
        }
      },
      select: {
        id: true,
        requestId: true,
        language: true,
        title: true,
        audioStatus: true,
        updatedAt: true
      }
    });

    console.log(`Found ${pendingEpisodes.length} episodes with pending audio generation`);

    if (pendingEpisodes.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending audio generations found',
        updated: 0
      });
    }

    const autoContentApiKey = process.env.AUTOCONTENT_API_KEY;
    if (!autoContentApiKey) {
      return NextResponse.json({
        success: false,
        error: 'AutoContent API key not configured'
      }, { status: 500 });
    }

    let updatedCount = 0;
    const results = [];

    for (const episode of pendingEpisodes) {
      try {
        console.log(`Checking status for episode ${episode.id} (${episode.language}), requestId: ${episode.requestId}`);

        // Check status with AutoContent API
        const axiosResponse = await axios.get(
          `https://api.autocontentapi.com/content/Status/${episode.requestId}`,
          {
            headers: {
              'Authorization': `Bearer ${autoContentApiKey}`,
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },
            timeout: 30000
          }
        );

        const statusResult: PodcastStatusResponse = axiosResponse.data;
        console.log(`Status for ${episode.id}:`, {
          status: statusResult.status,
          hasAudio: !!statusResult.audio_url,
          hasError: !!statusResult.error_code
        });

        // Update database based on status
        if (statusResult.status === 100 && statusResult.audio_url) {
          // Completed successfully
          await PodcastService.updateEpisodeAudio(episode.id, {
            audioUrl: statusResult.audio_url,
            audioDuration: statusResult.audio_duration,
            audioStatus: 'COMPLETED'
          });

          updatedCount++;
          results.push({
            episodeId: episode.id,
            language: episode.language,
            status: 'completed',
            audioUrl: statusResult.audio_url
          });

          console.log(`✅ Episode ${episode.id} (${episode.language}) completed`);

        } else if (statusResult.error_code) {
          // Failed
          await PodcastService.updateEpisodeAudio(episode.id, {
            audioStatus: 'FAILED'
          });

          updatedCount++;
          results.push({
            episodeId: episode.id,
            language: episode.language,
            status: 'failed',
            error: statusResult.error_message
          });

          console.log(`❌ Episode ${episode.id} (${episode.language}) failed: ${statusResult.error_message}`);

        } else {
          // Still processing
          results.push({
            episodeId: episode.id,
            language: episode.language,
            status: 'processing',
            apiStatus: statusResult.status
          });

          console.log(`⏳ Episode ${episode.id} (${episode.language}) still processing (status: ${statusResult.status})`);
        }

      } catch (error) {
        console.error(`Error checking episode ${episode.id}:`, error);
        results.push({
          episodeId: episode.id,
          language: episode.language,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`Background check completed. Updated ${updatedCount} episodes.`);

    return NextResponse.json({
      success: true,
      message: `Background audio check completed. Updated ${updatedCount} episodes.`,
      totalChecked: pendingEpisodes.length,
      updated: updatedCount,
      results
    });

  } catch (error) {
    console.error('Background audio check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Background audio check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST endpoint to manually trigger the background check
export async function POST(request: NextRequest) {
  return GET(request);
}
