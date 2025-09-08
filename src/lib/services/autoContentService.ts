/**
 * AutoContent API Service for podcast audio generation
 * Based on AutoContent API NodeJS documentation
 */

export interface AutoContentRequest {
  content: string;
  language: string;
  voice?: string;
  length?: 'short' | 'medium' | 'long';
}

export interface AutoContentResponse {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  audioUrl?: string;
  duration?: number;
  error?: string;
  progress?: number;
  estimatedCompletion?: number;
}

export class AutoContentService {
  private static readonly API_BASE_URL = 'https://api.autocontentapi.com';
  private static readonly API_KEY = process.env.AUTOCONTENT_API_KEY;

  /**
   * Generate podcast audio using AutoContent API
   */
  static async generatePodcastAudio(request: AutoContentRequest): Promise<AutoContentResponse> {
    if (!this.API_KEY) {
      throw new Error('AutoContent API key not configured');
    }

    try {
      console.log(`🎙️ Starting AutoContent API request for ${request.language}...`);

      // Prepare the request payload based on AutoContent API format
      const payload = {
        content: request.content,
        language: request.language,
        voice: request.voice || 'default',
        length: request.length || 'medium',
        format: 'mp3',
        quality: 'high'
      };

      const response = await fetch(`${this.API_BASE_URL}/v1/podcast/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`AutoContent API error (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      
      console.log(`✅ AutoContent API request submitted. Request ID: ${data.requestId}`);

      return {
        requestId: data.requestId,
        status: data.status || 'pending',
        progress: data.progress || 0,
        estimatedCompletion: data.estimatedCompletion,
      };

    } catch (error) {
      console.error('❌ AutoContent API request failed:', error);
      throw new Error(`Failed to submit audio generation request: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check the status of an audio generation request
   */
  static async checkRequestStatus(requestId: string): Promise<AutoContentResponse> {
    if (!this.API_KEY) {
      throw new Error('AutoContent API key not configured');
    }

    try {
      console.log(`🔍 Checking AutoContent request status: ${requestId}`);

      const response = await fetch(`${this.API_BASE_URL}/v1/podcast/status/${requestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`AutoContent API status check failed (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      
      console.log(`📊 AutoContent status for ${requestId}:`, data.status);

      return {
        requestId,
        status: data.status,
        audioUrl: data.audioUrl,
        duration: data.duration,
        progress: data.progress,
        error: data.error,
        estimatedCompletion: data.estimatedCompletion,
      };

    } catch (error) {
      console.error(`❌ AutoContent status check failed for ${requestId}:`, error);
      
      return {
        requestId,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Status check failed'
      };
    }
  }

  /**
   * Get available voices for a language
   */
  static async getVoicesForLanguage(language: string): Promise<Array<{id: string, name: string, gender: string}>> {
    if (!this.API_KEY) {
      throw new Error('AutoContent API key not configured');
    }

    try {
      const response = await fetch(`${this.API_BASE_URL}/v1/voices?language=${encodeURIComponent(language)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch voices for ${language}, using default`);
        return [];
      }

      const data = await response.json();
      return data.voices || [];

    } catch (error) {
      console.warn(`Error fetching voices for ${language}:`, error);
      return [];
    }
  }

  /**
   * Cancel a pending audio generation request
   */
  static async cancelRequest(requestId: string): Promise<boolean> {
    if (!this.API_KEY) {
      throw new Error('AutoContent API key not configured');
    }

    try {
      const response = await fetch(`${this.API_BASE_URL}/v1/podcast/cancel/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
      });

      return response.ok;

    } catch (error) {
      console.error(`Failed to cancel request ${requestId}:`, error);
      return false;
    }
  }

  /**
   * Build content string from podcast episode data
   */
  static buildPodcastContent(episode: {
    title: string;
    summary: string;
    keyPoints: string[];
    podcastTitle?: string;
    marketSummary?: string;
  }): string {
    const sections = [];

    // Add podcast title if available
    if (episode.podcastTitle) {
      sections.push(`Podcast Title: ${episode.podcastTitle}`);
    }

    // Add market summary if available
    if (episode.marketSummary) {
      sections.push(`Market Summary: ${episode.marketSummary}`);
    }

    // Add episode title
    sections.push(`Episode: ${episode.title}`);

    // Add summary
    sections.push(`Summary: ${episode.summary}`);

    // Add key points
    if (episode.keyPoints && episode.keyPoints.length > 0) {
      sections.push('Key Points:');
      episode.keyPoints.forEach((point, index) => {
        sections.push(`${index + 1}. ${point}`);
      });
    }

    return sections.join('\n\n');
  }

  /**
   * Get recommended voice for a language
   */
  static getRecommendedVoice(language: string): string {
    const voiceMap: Record<string, string> = {
      'English': 'en-US-male-1',
      'हिन्दी': 'hi-IN-female-1',
      'मराठी': 'mr-IN-male-1',
      'ગુજરાતી': 'gu-IN-female-1',
      'தமிழ்': 'ta-IN-male-1',
      'తెలుగు': 'te-IN-female-1',
      'বাংলা': 'bn-IN-male-1',
      'ಕನ್ನಡ': 'kn-IN-female-1',
      'മലയാളം': 'ml-IN-male-1',
      'ਪੰਜਾਬੀ': 'pa-IN-female-1',
    };

    return voiceMap[language] || 'default';
  }
}

export default AutoContentService;
