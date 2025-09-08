import { NextRequest, NextResponse } from 'next/server';

const RSS_FEED_URL = 'https://api.autocontentapi.com/podcast/rss/08D34B04-D849-43CC-BC65-2449D575B630';

interface RSSItem {
  title: string;
  description: string;
  enclosure: {
    url: string;
    length: string;
    type: string;
  };
  guid: string;
  pubDate: string;
  duration: string;
  episodeType: string;
  explicit: string;
}

interface PodcastEpisode {
  id: string;
  date: string;
  language: string;
  languageCode: string;
  title: string;
  summary: string;
  audioUrl: string;
  audioDuration: number;
  keyPoints: string[];
  category: string;
  importance: string;
  createdAt: string;
  podcastTitle: string;
  marketSummary: string;
}

// Language detection based on title content
function detectLanguage(title: string): { language: string; code: string } {
  // Check for Hindi/Devanagari script
  if (/[\u0900-\u097F]/.test(title)) {
    return { language: 'Hindi', code: 'hi' };
  }
  // Check for Bengali script
  if (/[\u0980-\u09FF]/.test(title)) {
    return { language: 'Bengali', code: 'bn' };
  }
  // Check for Tamil script
  if (/[\u0B80-\u0BFF]/.test(title)) {
    return { language: 'Tamil', code: 'ta' };
  }
  // Check for Gujarati script
  if (/[\u0A80-\u0AFF]/.test(title)) {
    return { language: 'Gujarati', code: 'gu' };
  }
  // Default to English
  return { language: 'English', code: 'en' };
}

// Convert duration string (MM:SS) to seconds
function durationToSeconds(duration: string): number {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  return 0;
}

// Decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&apos;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"'
  };
  
  return text.replace(/&[a-z]+;/g, (entity) => entities[entity] || entity);
}

// Parse RSS XML content
function parseRSSContent(xmlContent: string): RSSItem[] {
  const items: RSSItem[] = [];
  
  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1];
    
    // Extract fields using regex (handle both CDATA and regular content)
    const titleMatch = itemContent.match(/<itunes:title>(.*?)<\/itunes:title>/) || 
                      itemContent.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/);
    const descriptionMatch = itemContent.match(/<description>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/description>/);
    const enclosureMatch = itemContent.match(/<enclosure url="(.*?)" length="(.*?)" type="(.*?)"/);
    const guidMatch = itemContent.match(/<guid.*?>(.*?)<\/guid>/);
    const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
    const durationMatch = itemContent.match(/<itunes:duration>(.*?)<\/itunes:duration>/);
    
    if (titleMatch && enclosureMatch && guidMatch && pubDateMatch && durationMatch) {
      items.push({
        title: decodeHtmlEntities(titleMatch[1]),
        description: descriptionMatch ? decodeHtmlEntities(descriptionMatch[1]) : decodeHtmlEntities(titleMatch[1]),
        enclosure: {
          url: enclosureMatch[1],
          length: enclosureMatch[2],
          type: enclosureMatch[3]
        },
        guid: guidMatch[1],
        pubDate: pubDateMatch[1],
        duration: durationMatch[1],
        episodeType: 'full',
        explicit: 'no'
      });
    }
  }
  
  return items;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    
    console.log('Fetching RSS feed:', RSS_FEED_URL);
    
    // Fetch RSS feed with timeout and error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    let response;
    try {
      response = await fetch(RSS_FEED_URL, {
        headers: {
          'User-Agent': 'GetClarity.Finance Podcast Reader/1.0',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }
    
    if (!response.ok) {
      throw new Error(`RSS feed fetch failed: ${response.status} ${response.statusText}`);
    }
    
    const xmlContent = await response.text();
    console.log('RSS feed fetched successfully, length:', xmlContent.length);
    
    if (!xmlContent || xmlContent.length === 0) {
      throw new Error('RSS feed is empty');
    }
    
    // Basic XML validation
    if (!xmlContent.includes('<rss') && !xmlContent.includes('<feed')) {
      throw new Error('Invalid RSS/XML format');
    }
    
    // Parse RSS content
    const rssItems = parseRSSContent(xmlContent);
    console.log('Parsed RSS items:', rssItems.length);
    
    if (rssItems.length === 0) {
      console.warn('No RSS items found, returning empty result');
    }
    
    // Transform to our podcast episode format
    const transformedEpisodes: PodcastEpisode[] = rssItems.map((item, index) => {
      const languageInfo = detectLanguage(item.title);
      const pubDate = new Date(item.pubDate);
      
      return {
        id: item.guid,
        date: pubDate.toISOString().split('T')[0],
        language: languageInfo.language,
        languageCode: languageInfo.code,
        title: item.title,
        summary: item.description,
        audioUrl: item.enclosure.url,
        audioDuration: durationToSeconds(item.duration),
        keyPoints: [
          'Market analysis and insights',
          'SEBI, RBI, and Government updates',
          'Investment opportunities and risks'
        ],
        category: 'market',
        importance: 'high',
        createdAt: pubDate.toISOString(),
        podcastTitle: 'Market Clarity Daily',
        marketSummary: `Daily market update covering key regulatory and financial developments in India.`
      };
    });
    
    // Filter by language if specified
    let filteredEpisodes = transformedEpisodes;
    if (language && language !== 'all') {
      const languageMap: Record<string, string> = {
        'en': 'English',
        'hi': 'Hindi', 
        'bn': 'Bengali',
        'ta': 'Tamil',
        'gu': 'Gujarati'
      };
      
      const targetLanguage = languageMap[language] || 'English';
      filteredEpisodes = transformedEpisodes.filter(ep => ep.language === targetLanguage);
    }
    
    // Calculate stats
    const totalEpisodes = filteredEpisodes.length;
    const totalWithAudio = filteredEpisodes.filter(ep => ep.audioUrl).length;
    const uniqueDates = [...new Set(filteredEpisodes.map(ep => ep.date))].length;
    
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    const responseData = {
      episodes: filteredEpisodes,
      totalEpisodes,
      totalWithAudio,
      totalDates: uniqueDates,
      dateRange: {
        start: sevenDaysAgo.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0],
        days: 7
      }
    };
    
    console.log('Returning podcast data:', {
      totalEpisodes: responseData.totalEpisodes,
      totalWithAudio: responseData.totalWithAudio,
      languages: [...new Set(transformedEpisodes.map(ep => ep.language))]
    });
    
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('RSS podcast API error:', error);
    return NextResponse.json({
      error: 'Failed to fetch RSS podcast data',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      episodes: [],
      totalEpisodes: 0,
      totalWithAudio: 0,
      totalDates: 0,
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
        days: 7
      }
    }, { status: 500 });
  }
}
