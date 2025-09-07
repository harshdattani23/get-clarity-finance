import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import PodcastService from '@/lib/services/podcastService';
import { databaseService } from '@/lib/services/databaseService';

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { requestId } = await params;

    if (!requestId) {
      return NextResponse.json({
        success: false,
        error: 'Request ID is required'
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

    console.log('Checking podcast status for request:', requestId);

    // Step 2: Check status using the request ID with retry logic
    let axiosResponse;
    const maxRetries = 2;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`AutoContent status API attempt ${attempt}/${maxRetries}`);
        
        axiosResponse = await axios.get(`https://api.autocontentapi.com/content/Status/${requestId}`, {
          headers: {
            'Authorization': `Bearer ${autoContentApiKey}`,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          timeout: 20000, // 20 second timeout (reduced from 30s)
          maxRedirects: 2
        });
        
        break; // Success, exit retry loop
        
      } catch (error) {
        console.error(`AutoContent status API attempt ${attempt} failed:`, error instanceof Error ? error.message : error);
        
        if (attempt < maxRetries) {
          const delay = attempt * 1500; // 1.5s, 3s delay
          console.log(`Retrying status check in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error; // Re-throw on final attempt
        }
      }
    }

    if (!axiosResponse) {
      throw new Error('Failed to get response from AutoContent API after all retries');
    }

    console.log('AutoContent API status response status:', axiosResponse.status);

    const statusResult: PodcastStatusResponse = axiosResponse.data;
    console.log('Status result:', { 
      id: statusResult.id, 
      status: statusResult.status,
      hasAudio: !!statusResult.audio_url 
    });

    // Update database if audio is completed or failed
    if (statusResult.status === 100 && statusResult.audio_url) {
      try {
        const episode = await databaseService.withConnection(
          () => PodcastService.getEpisodeByRequestId(requestId),
          10000 // 10 second timeout
        );
        
        if (episode && episode.id) {
          await databaseService.withConnection(
            () => PodcastService.updateEpisodeAudio(episode.id!, {
              audioUrl: statusResult.audio_url,
              audioDuration: statusResult.audio_duration,
              audioStatus: 'COMPLETED'
            }),
            10000 // 10 second timeout
          );
          console.log('Database updated with completed audio for episode:', episode.id);
        }
      } catch (error) {
        console.error('Error updating database with audio completion:', error);
      }
    } else if (statusResult.error_code) {
      try {
        const episode = await databaseService.withConnection(
          () => PodcastService.getEpisodeByRequestId(requestId),
          10000 // 10 second timeout
        );
        
        if (episode && episode.id) {
          await databaseService.withConnection(
            () => PodcastService.updateEpisodeAudio(episode.id!, {
              audioStatus: 'FAILED'
            }),
            10000 // 10 second timeout
          );
          console.log('Database updated with failed audio for episode:', episode.id);
        }
      } catch (error) {
        console.error('Error updating database with audio failure:', error);
      }
    }

    // Map the response to our format
    const response = {
      requestId: statusResult.id,
      status: statusResult.status,
      success: true,
      ...(statusResult.status === 100 && {
        // Only include these fields when completed
        audioUrl: statusResult.audio_url,
        audioTitle: statusResult.audio_title,
        transcript: statusResult.response_text,
        duration: statusResult.audio_duration,
        fileSize: statusResult.file_size,
        shareUrl: statusResult.share_url
      }),
      ...(statusResult.error_code && {
        // Include error details if present
        errorCode: statusResult.error_code,
        errorMessage: statusResult.error_message
      }),
      updatedOn: statusResult.updated_on,
      requestedOn: statusResult.requested_on
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Podcast status check error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check podcast status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
