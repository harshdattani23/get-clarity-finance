import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface PodcastEpisodeData {
  id?: string;
  title: string;
  summary: string;
  keyPoints: string[];
  sources: Array<{
    title: string;
    url: string;
    publishedAt?: string;
  }>;
  category: 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY';
  importance: 'HIGH' | 'MEDIUM' | 'LOW';
  podcastTitle: string;
  marketSummary: string;
  language?: string;
  date?: Date;
  audioUrl?: string;
  audioDuration?: number;
  audioStatus?: 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED';
  requestId?: string;
}

export interface PodcastEpisodeResponse {
  episodes: PodcastEpisodeData[];
  podcastTitle: string;
  podcastDescription: string;
  totalEpisodes: number;
  lastUpdated: string;
  marketSummary: string;
  fromDatabase: boolean;
}

export class PodcastService {
  
  /**
   * Get recent podcast episode from database (within last 7 days)
   */
  static async getTodaysPodcast(language: string = 'English'): Promise<PodcastEpisodeResponse | null> {
    try {
      console.log(`Looking for ${language} podcast content in database...`);
      const today = new Date();
      const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

      // Look for the most recent episode in the last 7 days (not just today)
      let episode;
      try {
        episode = await prisma.podcastEpisode.findFirst({
          where: {
            createdAt: {
              gte: sevenDaysAgo,
            },
            language: language,
          },
          include: {
            keyPoints: {
              orderBy: {
                order: 'asc',
              },
            },
            sources: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        
        console.log(`Found ${language} episode:`, episode ? episode.id : 'None');
        
      } catch (error) {
        console.error(`Error querying ${language} episodes:`, error);
        // If it's a connection error, retry once after a short delay
        if (error instanceof Error && error.message.includes('connection')) {
          console.log('Retrying database query after connection error...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          try {
            episode = await prisma.podcastEpisode.findFirst({
              where: {
                createdAt: {
                  gte: sevenDaysAgo,
                },
                language: language,
              },
              include: {
                keyPoints: {
                  orderBy: {
                    order: 'asc',
                  },
                },
                sources: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            });
            console.log(`Retry successful for ${language}:`, episode ? episode.id : 'None');
          } catch (retryError) {
            console.error(`Retry failed for ${language}:`, retryError);
            return null;
          }
        } else {
          return null;
        }
      }

      if (!episode) {
        console.log(`No ${language} podcast found in last 7 days`);
        return null;
      }

      return {
        episodes: [
          {
            id: episode.id,
            title: episode.title,
            summary: episode.summary,
            keyPoints: episode.keyPoints.map(kp => kp.point),
            sources: episode.sources.map(s => ({
              title: s.title || 'Source',
              url: s.url,
              publishedAt: s.publishedAt || undefined,
            })),
            category: episode.category as 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY',
            importance: episode.importance as 'HIGH' | 'MEDIUM' | 'LOW',
            podcastTitle: episode.podcastTitle,
            marketSummary: episode.marketSummary,
            language: episode.language,
            audioUrl: episode.audioUrl || undefined,
            audioDuration: episode.audioDuration || undefined,
            audioStatus: episode.audioStatus as 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED',
            requestId: episode.requestId || undefined,
          },
        ],
        podcastTitle: episode.podcastTitle,
        podcastDescription: `Daily regulatory podcast covering latest SEBI announcements, RBI policy updates, and regulatory changes. Updated ${today.toLocaleDateString()}.`,
        totalEpisodes: 1,
        lastUpdated: episode.updatedAt.toISOString(),
        marketSummary: episode.marketSummary,
        fromDatabase: true,
      };

    } catch (error) {
      console.error('Error fetching today\'s podcast from database:', error);
      return null;
    }
  }

  /**
   * Save a new podcast episode to database
   */
  static async savePodcastEpisode(episodeData: PodcastEpisodeData): Promise<string> {
    try {
      // Prepare data object
      const episodeCreateData: any = {
        title: episodeData.title,
        summary: episodeData.summary,
        category: episodeData.category,
        importance: episodeData.importance,
        podcastTitle: episodeData.podcastTitle,
        marketSummary: episodeData.marketSummary,
        language: episodeData.language || 'English',
        audioUrl: episodeData.audioUrl,
        audioDuration: episodeData.audioDuration,
        audioStatus: episodeData.audioStatus || 'NOT_GENERATED',
        requestId: episodeData.requestId,
        keyPoints: {
          create: episodeData.keyPoints.map((point, index) => ({
            point,
            order: index + 1,
          })),
        },
        sources: {
          create: episodeData.sources.map(source => ({
            title: source.title,
            url: source.url,
            publishedAt: source.publishedAt,
          })),
        },
      };

      // Always set date field to today for new episodes
      try {
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        episodeCreateData.date = episodeData.date || todayStart;
      } catch (error) {
        console.log('Date field not supported, skipping');
      }

      const episode = await prisma.podcastEpisode.create({
        data: episodeCreateData,
        include: {
          keyPoints: true,
          sources: true,
        },
      });

      console.log('Podcast episode saved to database:', episode.id);
      return episode.id;

    } catch (error) {
      console.error('Error saving podcast episode to database:', error);
      throw new Error('Failed to save podcast episode');
    }
  }

  /**
   * Update audio information for an existing episode
   */
  static async updateEpisodeAudio(
    episodeId: string,
    audioData: {
      audioUrl?: string;
      audioDuration?: number;
      audioStatus: 'GENERATING' | 'COMPLETED' | 'FAILED';
      requestId?: string;
    }
  ): Promise<void> {
    try {
      await prisma.podcastEpisode.update({
        where: { id: episodeId },
        data: {
          audioUrl: audioData.audioUrl,
          audioDuration: audioData.audioDuration,
          audioStatus: audioData.audioStatus,
          requestId: audioData.requestId,
          updatedAt: new Date(),
        },
      });

      console.log('Episode audio updated:', episodeId, audioData.audioStatus);

    } catch (error) {
      console.error('Error updating episode audio:', error);
      throw new Error('Failed to update episode audio');
    }
  }

  /**
   * Get episode by request ID (for audio status updates)
   */
  static async getEpisodeByRequestId(requestId: string): Promise<PodcastEpisodeData | null> {
    try {
      const episode = await prisma.podcastEpisode.findFirst({
        where: { requestId },
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          sources: true,
        },
      });

      if (!episode) {
        return null;
      }

      return {
        id: episode.id,
        title: episode.title,
        summary: episode.summary,
        keyPoints: episode.keyPoints.map(kp => kp.point),
        sources: episode.sources.map(s => ({
          title: s.title || 'Source',
          url: s.url,
          publishedAt: s.publishedAt || undefined,
        })),
        category: episode.category as 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY',
        importance: episode.importance as 'HIGH' | 'MEDIUM' | 'LOW',
        podcastTitle: episode.podcastTitle,
        marketSummary: episode.marketSummary,
        language: episode.language,
        audioUrl: episode.audioUrl || undefined,
        audioDuration: episode.audioDuration || undefined,
        audioStatus: episode.audioStatus as 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED',
        requestId: episode.requestId || undefined,
      };

    } catch (error) {
      console.error('Error finding episode by request ID:', error);
      return null;
    }
  }

  /**
   * Get episodes for a specific date range
   */
  static async getEpisodesInDateRange(
    startDate: Date,
    endDate: Date,
    language?: string
  ): Promise<PodcastEpisodeData[]> {
    try {
      const whereClause: any = {
        date: {
          gte: startDate,
          lte: endDate,
        },
      };

      if (language) {
        whereClause.language = language;
      }

      const episodes = await prisma.podcastEpisode.findMany({
        where: whereClause,
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          sources: true,
        },
        orderBy: {
          date: 'desc',
        },
      });

      return episodes.map(episode => ({
        id: episode.id,
        title: episode.title,
        summary: episode.summary,
        keyPoints: episode.keyPoints.map(kp => kp.point),
        sources: episode.sources.map(s => ({
          title: s.title || 'Source',
          url: s.url,
          publishedAt: s.publishedAt || undefined,
        })),
        category: episode.category as 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY',
        importance: episode.importance as 'HIGH' | 'MEDIUM' | 'LOW',
        podcastTitle: episode.podcastTitle,
        marketSummary: episode.marketSummary,
        language: episode.language,
        date: episode.date,
        audioUrl: episode.audioUrl || undefined,
        audioDuration: episode.audioDuration || undefined,
        audioStatus: episode.audioStatus as 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED',
        requestId: episode.requestId || undefined,
      }));

    } catch (error) {
      console.error('Error fetching episodes in date range:', error);
      return [];
    }
  }

  /**
   * Create audio episode for a specific date and language (using existing English content)
   */
  static async createAudioEpisodeFromEnglish(
    date: Date,
    targetLanguage: string,
    requestId?: string
  ): Promise<string | null> {
    try {
      // Get English episode for the date (try both date field and createdAt with broader range)
      const dateStart = new Date(date);
      dateStart.setUTCHours(0, 0, 0, 0); // Start of day in UTC
      const dateEnd = new Date(date);
      dateEnd.setUTCHours(23, 59, 59, 999); // End of day in UTC
      
      console.log(`Searching for English episode between ${dateStart.toISOString()} and ${dateEnd.toISOString()}`);
      
      let englishEpisode = await prisma.podcastEpisode.findFirst({
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
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          sources: true,
        },
        orderBy: {
          createdAt: 'desc', // Get most recent if multiple found
        },
      });

      if (!englishEpisode) {
        console.log('No English episode found for date:', date.toISOString().split('T')[0]);
        return null;
      }

      // Check if episode already exists for this language and date
      const existingEpisode = await prisma.podcastEpisode.findFirst({
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
          language: targetLanguage,
        },
      });

      if (existingEpisode) {
        // Update existing episode with request ID for audio generation
        if (requestId) {
          await prisma.podcastEpisode.update({
            where: { id: existingEpisode.id },
            data: {
              requestId,
              audioStatus: 'GENERATING',
              updatedAt: new Date(),
            },
          });
        }
        return existingEpisode.id;
      }

      // Create new episode for the target language
      const newEpisode = await prisma.podcastEpisode.create({
        data: {
          title: englishEpisode.title,
          summary: englishEpisode.summary,
          category: englishEpisode.category,
          importance: englishEpisode.importance,
          podcastTitle: englishEpisode.podcastTitle,
          marketSummary: englishEpisode.marketSummary,
          language: targetLanguage,
          date: englishEpisode.date,
          audioStatus: requestId ? 'GENERATING' : 'NOT_GENERATED',
          requestId,
          keyPoints: {
            create: englishEpisode.keyPoints.map((point, index) => ({
              point: point.point,
              order: point.order,
            })),
          },
          sources: {
            create: englishEpisode.sources.map(source => ({
              title: source.title,
              url: source.url,
              publishedAt: source.publishedAt,
            })),
          },
        },
      });

      console.log(`Created ${targetLanguage} episode from English content:`, newEpisode.id);
      return newEpisode.id;

    } catch (error) {
      console.error('Error creating audio episode from English:', error);
      return null;
    }
  }

  /**
   * Get episode by date and language
   */
  static async getEpisodeByDateAndLanguage(
    date: Date,
    language: string
  ): Promise<PodcastEpisodeData | null> {
    try {
      const episode = await prisma.podcastEpisode.findFirst({
        where: {
          date: {
            gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
          },
          language,
        },
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          sources: true,
        },
      });

      if (!episode) {
        return null;
      }

      return {
        id: episode.id,
        title: episode.title,
        summary: episode.summary,
        keyPoints: episode.keyPoints.map(kp => kp.point),
        sources: episode.sources.map(s => ({
          title: s.title || 'Source',
          url: s.url,
          publishedAt: s.publishedAt || undefined,
        })),
        category: episode.category as 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY',
        importance: episode.importance as 'HIGH' | 'MEDIUM' | 'LOW',
        podcastTitle: episode.podcastTitle,
        marketSummary: episode.marketSummary,
        language: episode.language,
        date: episode.date,
        audioUrl: episode.audioUrl || undefined,
        audioDuration: episode.audioDuration || undefined,
        audioStatus: episode.audioStatus as 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED',
        requestId: episode.requestId || undefined,
      };

    } catch (error) {
      console.error('Error finding episode by date and language:', error);
      return null;
    }
  }

  /**
   * Get recent episodes (for debugging and analysis)
   */
  static async getRecentEpisodes(days: number = 7): Promise<PodcastEpisodeData[]> {
    try {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - days);

      const episodes = await prisma.podcastEpisode.findMany({
        where: {
          createdAt: {
            gte: daysAgo,
          },
        },
        include: {
          keyPoints: {
            orderBy: { order: 'asc' },
          },
          sources: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return episodes.map(episode => ({
        id: episode.id,
        title: episode.title,
        summary: episode.summary,
        keyPoints: episode.keyPoints.map(kp => kp.point),
        sources: episode.sources.map(s => ({
          title: s.title || 'Source',
          url: s.url,
          publishedAt: s.publishedAt || undefined,
        })),
        category: episode.category as 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY',
        importance: episode.importance as 'HIGH' | 'MEDIUM' | 'LOW',
        podcastTitle: episode.podcastTitle,
        marketSummary: episode.marketSummary,
        language: episode.language,
        date: episode.date,
        audioUrl: episode.audioUrl || undefined,
        audioDuration: episode.audioDuration || undefined,
        audioStatus: episode.audioStatus as 'NOT_GENERATED' | 'GENERATING' | 'COMPLETED' | 'FAILED',
        requestId: episode.requestId || undefined,
      }));

    } catch (error) {
      console.error('Error fetching recent episodes:', error);
      return [];
    }
  }

  /**
   * Clean up old episodes (keep last 90 days)
   */
  static async cleanupOldEpisodes(): Promise<void> {
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      const deleted = await prisma.podcastEpisode.deleteMany({
        where: {
          date: {
            lt: ninetyDaysAgo,
          },
        },
      });

      console.log(`Cleaned up ${deleted.count} old podcast episodes`);

    } catch (error) {
      console.error('Error cleaning up old episodes:', error);
    }
  }
}

export default PodcastService;
