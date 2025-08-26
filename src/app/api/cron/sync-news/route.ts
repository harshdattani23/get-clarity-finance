/**
 * Cron job to fetch and store news from Perplexity AI
 * Runs 3 times daily to update news database
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPerplexityNewsSynthesis } from '@/lib/ai/perplexity';
import { DEFAULT_TOPICS, SUPPORTED_LANGUAGES } from '@/config/news';
import { FetchStatus, NewsSentiment } from '@prisma/client';
import type { NewsItem as NewsItemType } from '@/types/news';
import { prisma } from '@/lib/prisma';

// Protect the route with a secret
const CRON_SECRET = process.env.CRON_SECRET_TOKEN;

// News retention time (30 days - keep historical news)
const NEWS_RETENTION_DAYS = 30;

/**
 * Map sentiment from API to database enum
 */
function mapSentiment(sentiment?: string): NewsSentiment {
  switch (sentiment?.toLowerCase()) {
    case 'positive': return NewsSentiment.POSITIVE;
    case 'negative': return NewsSentiment.NEGATIVE;
    default: return NewsSentiment.NEUTRAL;
  }
}

/**
 * Store news items in database for a specific language
 */
async function storeNewsItems(items: NewsItemType[], sector?: string, language: string = 'en') {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + NEWS_RETENTION_DAYS); // Keep for 30 days

  const stored = [];
  const skipped = [];
  const failed = [];
  
  console.log(`\n📝 Storing ${items.length} news items for [${language}] ${sector || 'general'}...`);
  console.log('─'.repeat(80));
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      // Check if similar news already exists (by title similarity and language)
      const existing = await prisma.newsItem.findFirst({
        where: {
          title: {
            contains: item.title.substring(0, 50), // Check first 50 chars
          },
          language: language,
          expiresAt: {
            gt: new Date(), // Still valid
          },
        },
      });

      if (existing) {
        console.log(`  ⏭️  [${language}][${i+1}/${items.length}] SKIPPED (duplicate): "${item.title.substring(0, 60)}..."`);
        skipped.push(item.title);
        continue;
      }

      // Create the news item with all related data
      const newsItem = await prisma.newsItem.create({
        data: {
          title: item.title,
          summary: item.summary,
          sector: sector || null,
          sentiment: mapSentiment(item.sentiment),
          language: language,
          publishedAt: new Date(),
          fetchedAt: new Date(),
          expiresAt,
          keyPoints: {
            create: item.keyPoints?.map((point, index) => ({
              point,
              order: index,
            })) || [],
          },
          tickers: {
            create: item.tickers?.map(ticker => ({
              ticker,
            })) || [],
          },
          sources: {
            create: item.sources?.map(source => ({
              url: source.url,
              domain: source.domain || '',
              title: source.title || '',
            })) || [],
          },
        },
      });

      stored.push(newsItem);
      console.log(`  ✅ [${language}][${i+1}/${items.length}] STORED: "${item.title.substring(0, 60)}..."`);
      console.log(`     💡 Sentiment: ${item.sentiment || 'neutral'} | Tickers: ${item.tickers?.join(', ') || 'none'}`);
    } catch (error) {
      console.error(`  ❌ [${language}][${i+1}/${items.length}] FAILED: "${item.title.substring(0, 60)}..."`);
      console.error(`     Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failed.push({ title: item.title, error: error instanceof Error ? error.message : 'Unknown' });
    }
  }

  console.log(`\n📊 Storage Summary for [${language}] ${sector || 'general'}:`);
  console.log(`   ✅ Stored: ${stored.length} | ⏭️  Skipped: ${skipped.length} | ❌ Failed: ${failed.length}`);
  console.log('─'.repeat(80));

  return stored;
}

/**
 * Fetch news for a specific sector or general topics in all languages
 */
async function fetchNewsForSectorAllLanguages(sector?: string, topics?: string[]) {
  const results = [];
  const errors = [];
  
  // Always fetch English first
  const log = await prisma.newsFetchLog.create({
    data: {
      sector: sector || null,
      topics: topics || [],
      status: FetchStatus.PENDING,
    },
  });

  try {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`🌍 FETCHING NEWS FOR: ${sector || 'GENERAL TOPICS'} IN ALL LANGUAGES`);
    console.log(`${'='.repeat(80)}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    
    // First fetch in English
    console.log(`\n🇬🇧 [1/7] Fetching ENGLISH news for ${sector || 'general topics'}...`);
    const englishSynthesis = await getPerplexityNewsSynthesis({
      sector,
      topics: !sector ? topics : undefined,
      maxItems: 5,
      lang: 'en',
    });

    console.log(`   ℹ️  Fetched ${englishSynthesis.items.length} items from Perplexity API`);
    englishSynthesis.items.forEach((item, idx) => {
      console.log(`      ${idx + 1}. "${item.title.substring(0, 70)}..."`);
    });

    const englishStored = await storeNewsItems(englishSynthesis.items, sector, 'en');
    results.push({
      language: 'en',
      fetched: englishSynthesis.items.length,
      stored: englishStored.length,
    });

    // Now fetch for other languages
    const otherLanguages = Object.keys(SUPPORTED_LANGUAGES).filter(lang => lang !== 'en');
    const languageFlags: Record<string, string> = {
      'hi': '🇮🇳 HINDI',
      'mr': '🇮🇳 MARATHI', 
      'gu': '🇮🇳 GUJARATI',
      'ta': '🇮🇳 TAMIL',
      'te': '🇮🇳 TELUGU',
      'bn': '🇮🇳 BENGALI'
    };
    
    for (let langIdx = 0; langIdx < otherLanguages.length; langIdx++) {
      const lang = otherLanguages[langIdx];
      try {
        // Small delay to avoid rate limiting
        console.log(`\n⏳ Waiting 1 second before next language fetch...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log(`\n${languageFlags[lang] || lang.toUpperCase()} [${langIdx + 2}/7] Fetching news for ${sector || 'general topics'}...`);
        const synthesis = await getPerplexityNewsSynthesis({
          sector,
          topics: !sector ? topics : undefined,
          maxItems: 5,
          lang: lang as keyof typeof SUPPORTED_LANGUAGES,
        });

        console.log(`   ℹ️  Fetched ${synthesis.items.length} items from Perplexity API`);
        synthesis.items.forEach((item, idx) => {
          console.log(`      ${idx + 1}. "${item.title.substring(0, 70)}..."`);
        });

        const storedItems = await storeNewsItems(synthesis.items, sector, lang);
        results.push({
          language: lang,
          fetched: synthesis.items.length,
          stored: storedItems.length,
        });
      } catch (langError) {
        console.error(`\n❌ ERROR: Failed to fetch news in ${lang}:`, langError);
        errors.push({
          language: lang,
          error: langError instanceof Error ? langError.message : 'Unknown error',
        });
      }
    }

    const totalStored = results.reduce((sum, r) => sum + r.stored, 0);
    const totalFetched = results.reduce((sum, r) => sum + r.fetched, 0);
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`✅ COMPLETED: ${sector || 'GENERAL TOPICS'}`);
    console.log(`   Total Fetched: ${totalFetched} | Total Stored: ${totalStored}`);
    console.log(`   Languages Processed: ${results.length} | Errors: ${errors.length}`);
    console.log(`${'='.repeat(80)}\n`);
    
    await prisma.newsFetchLog.update({
      where: { id: log.id },
      data: {
        status: FetchStatus.SUCCESS,
        itemsCount: totalStored,
        completedAt: new Date(),
      },
    });

    return {
      sector: sector || 'general',
      languages: results,
      errors,
    };
  } catch (error) {
    await prisma.newsFetchLog.update({
      where: { id: log.id },
      data: {
        status: FetchStatus.FAILED,
        error: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      },
    });

    throw error;
  }
}

/**
 * Clean up very old news items (older than retention period)
 */
async function cleanupOldNews() {
  // Only delete news older than retention period
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - NEWS_RETENTION_DAYS);
  
  const deleted = await prisma.newsItem.deleteMany({
    where: {
      fetchedAt: {
        lt: cutoffDate,
      },
    },
  });

  return deleted.count;
}

export async function GET(request: NextRequest) {
  try {
    // Verify the request is authorized (from cron service or admin)
    const authHeader = request.headers.get('authorization');
    const secret = authHeader?.replace('Bearer ', '');
    
    if (!CRON_SECRET || secret !== CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Perplexity API key is configured
    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json(
        { error: 'Perplexity API key not configured' },
        { status: 503 }
      );
    }

    console.log('\n' + '🚀'.repeat(40));
    console.log('STARTING NEWS SYNC CRON JOB');
    console.log(`Time: ${new Date().toISOString()}`);
    console.log('🚀'.repeat(40) + '\n');
    const startTime = Date.now();

    // Clean up very old news (older than 30 days)
    const cleanedUp = await cleanupOldNews();
    console.log(`Cleaned up ${cleanedUp} old news items (>30 days)`);

    const results = [];
    const errors = [];

    // Fetch general market news in all languages
    try {
      console.log('\n📰 [1/4] FETCHING GENERAL MARKET NEWS');
      const generalNews = await fetchNewsForSectorAllLanguages(undefined, DEFAULT_TOPICS.slice(0, 3));
      results.push(generalNews);
    } catch (error) {
      console.error('\n❌ Failed to fetch general news:', error);
      errors.push({ sector: 'general', error: error instanceof Error ? error.message : 'Unknown error' });
    }

    // Fetch news for key sectors in all languages (limit to reduce API calls)
    const sectorsToFetch = ['regulatory', 'banking', 'it'];
    const sectorEmojis: Record<string, string> = {
      'regulatory': '⚖️',
      'banking': '🏦',
      'it': '💻'
    };
    
    for (let sIdx = 0; sIdx < sectorsToFetch.length; sIdx++) {
      const sectorId = sectorsToFetch[sIdx];
      try {
        // Add a delay between sectors to avoid rate limiting
        console.log(`\n⏳ Waiting 3 seconds before next sector...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log(`\n${sectorEmojis[sectorId] || '📊'} [${sIdx + 2}/4] FETCHING ${sectorId.toUpperCase()} SECTOR NEWS`);
        const sectorNews = await fetchNewsForSectorAllLanguages(sectorId);
        results.push(sectorNews);
      } catch (error) {
        console.error(`\n❌ Failed to fetch ${sectorId} news:`, error);
        errors.push({ 
          sector: sectorId, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    const totalFetched = results.reduce((sum, r) => {
      if (r.languages) {
        return sum + r.languages.reduce((langSum, lang) => langSum + lang.fetched, 0);
      }
      return sum;
    }, 0);
    const totalStored = results.reduce((sum, r) => {
      if (r.languages) {
        return sum + r.languages.reduce((langSum, lang) => langSum + lang.stored, 0);
      }
      return sum;
    }, 0);
    const duration = Date.now() - startTime;

    console.log('\n' + '🎯'.repeat(40));
    console.log('NEWS SYNC CRON JOB COMPLETED');
    console.log(`Duration: ${(duration / 1000).toFixed(2)} seconds (${duration}ms)`);
    console.log(`Total Fetched: ${totalFetched} | Total Stored: ${totalStored} | Errors: ${errors.length}`);
    console.log('🎯'.repeat(40) + '\n');

    return NextResponse.json({
      success: true,
      summary: {
        totalFetched,
        totalStored,
        cleanedUp,
        duration,
        timestamp: new Date().toISOString(),
      },
      results,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('News sync cron job failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Manual trigger for testing (POST request)
export async function POST(request: NextRequest) {
  return GET(request);
}
