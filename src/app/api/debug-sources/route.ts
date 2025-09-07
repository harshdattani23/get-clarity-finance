import { NextRequest, NextResponse } from 'next/server';
import PodcastService from '@/lib/services/podcastService';
import { validateAllSources, filterPaywalledSources } from '@/utils/sourceFilters';

interface DebugSourcesResponse {
  totalEpisodes: number;
  episodesAnalyzed: number;
  sourceValidation: {
    totalSources: number;
    freeSourcesCount: number;
    paywalledSourcesCount: number;
    highConfidencePaywalledCount: number;
  };
  paywalledSources: Array<{
    episodeTitle: string;
    episodeDate: string;
    url: string;
    reason: string;
    confidence: string;
  }>;
  freeSourcesByDomain: Record<string, number>;
  paywalledSourcesByDomain: Record<string, number>;
  recentEpisodes: Array<{
    title: string;
    createdAt: string;
    sourcesCount: number;
    paywalledCount: number;
    sources: Array<{
      title: string;
      url: string;
      isPaywalled: boolean;
      reason: string;
    }>;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');
    const detailed = searchParams.get('detailed') === 'true';
    
    console.log(`Debug sources: analyzing last ${days} days`);

    // Get recent podcast episodes
    const episodes = await PodcastService.getRecentEpisodes(days);
    
    if (!episodes || episodes.length === 0) {
      return NextResponse.json({
        message: 'No podcast episodes found for analysis',
        totalEpisodes: 0,
        episodesAnalyzed: 0
      });
    }

    const allSources: Array<{title: string; url: string; publishedAt?: string}> = [];
    const paywalledSources: Array<{
      episodeTitle: string;
      episodeDate: string;
      url: string;
      reason: string;
      confidence: string;
    }> = [];
    
    const freeSourcesByDomain: Record<string, number> = {};
    const paywalledSourcesByDomain: Record<string, number> = {};
    const recentEpisodes = [];

    // Analyze each episode
    for (const episode of episodes) {
      if (!episode.sources) continue;

      const episodeSources = episode.sources.map(s => ({
        title: s.title,
        url: s.url,
        publishedAt: s.publishedAt
      }));

      allSources.push(...episodeSources);

      // Validate sources for this episode
      const validation = validateAllSources(episodeSources);
      
      // Track paywalled sources
      validation.results.forEach(result => {
        if (result.isPaywalled) {
          paywalledSources.push({
            episodeTitle: episode.title,
            episodeDate: episode.date?.toISOString().split('T')[0] || 'unknown',
            url: result.url,
            reason: result.reason || 'Unknown',
            confidence: result.confidence
          });

          // Count by domain
          try {
            const domain = new URL(result.url).hostname;
            paywalledSourcesByDomain[domain] = (paywalledSourcesByDomain[domain] || 0) + 1;
          } catch (e) {
            paywalledSourcesByDomain['invalid-url'] = (paywalledSourcesByDomain['invalid-url'] || 0) + 1;
          }
        } else {
          // Count free sources by domain
          try {
            const domain = new URL(result.url).hostname;
            freeSourcesByDomain[domain] = (freeSourcesByDomain[domain] || 0) + 1;
          } catch (e) {
            freeSourcesByDomain['invalid-url'] = (freeSourcesByDomain['invalid-url'] || 0) + 1;
          }
        }
      });

      // Add to recent episodes if detailed info requested
      if (detailed) {
        recentEpisodes.push({
          title: episode.title,
          createdAt: episode.date?.toISOString().split('T')[0] || 'unknown',
          sourcesCount: episodeSources.length,
          paywalledCount: validation.summary.paywalled,
          sources: validation.results.map(r => ({
            title: r.title,
            url: r.url,
            isPaywalled: r.isPaywalled,
            reason: r.reason || 'N/A'
          }))
        });
      }
    }

    // Overall validation
    const overallValidation = validateAllSources(allSources);

    const response: DebugSourcesResponse = {
      totalEpisodes: episodes.length,
      episodesAnalyzed: episodes.filter(e => e.sources && e.sources.length > 0).length,
      sourceValidation: {
        totalSources: overallValidation.summary.total,
        freeSourcesCount: overallValidation.summary.free,
        paywalledSourcesCount: overallValidation.summary.paywalled,
        highConfidencePaywalledCount: overallValidation.summary.highConfidencePaywalled
      },
      paywalledSources,
      freeSourcesByDomain,
      paywalledSourcesByDomain,
      recentEpisodes
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Debug sources API error:', error);
    return NextResponse.json({
      error: 'Failed to analyze sources',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
