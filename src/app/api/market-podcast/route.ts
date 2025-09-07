import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PodcastService from '@/lib/services/podcastService';
import { databaseService } from '@/lib/services/databaseService';
import { getAutoContentLanguageCode, getLanguageDisplayName, isPodcastLanguageSupported, DEFAULT_PODCAST_LANGUAGE, LANGUAGE_PROMPT_INSTRUCTIONS } from '@/config/podcastLanguages';

interface PodcastNewsItem {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  category: 'sebi' | 'rbi' | 'policy';
  importance: 'high' | 'medium' | 'low';
  sources: Array<{
    title: string;
    url: string;
    publishedAt?: string;
  }>;
  timestamp: string;
}

interface MarketPodcastResponse {
  episodes: PodcastNewsItem[];
  podcastTitle: string;
  podcastDescription: string;
  totalEpisodes: number;
  lastUpdated: string;
  marketSummary: string;
  fromDatabase?: boolean;
  episodeId?: string;
  selectedLanguage?: string;
  audioLanguage?: string;
  hasAudio?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit') || '10');
    const forceRefresh = searchParams.get('refresh') === 'true';
    const languageCode = searchParams.get('lang') || DEFAULT_PODCAST_LANGUAGE;
    const statusOnly = searchParams.get('statusOnly') === 'true';
    
    // Validate language support
    if (!isPodcastLanguageSupported(languageCode)) {
      return NextResponse.json({
        error: `Language '${languageCode}' is not supported for podcast generation`
      }, { status: 400 });
    }
    
    const autoContentLanguage = getAutoContentLanguageCode(languageCode);
    const displayLanguage = getLanguageDisplayName(languageCode);
    
    console.log(`Processing podcast request for language: ${displayLanguage} (${autoContentLanguage})`);

    // Check for language-specific episode first, fallback to English content
    if (!forceRefresh) {
      console.log(`Checking database for ${displayLanguage} podcast content first...`);
      
      // Step 1: Check if there's a language-specific episode with audio
      const languageSpecificPodcast = await databaseService.withConnection(
        () => PodcastService.getTodaysPodcast(autoContentLanguage)
      );
      
      if (languageSpecificPodcast && languageSpecificPodcast.episodes.length > 0) {
        const episode = languageSpecificPodcast.episodes[0];
        
        // If this episode has audio, return it directly
        if (episode.audioUrl) {
          console.log(`Found ${displayLanguage} episode with audio, returning directly`);
          if (statusOnly) {
            return NextResponse.json({
              hasContent: true,
              totalEpisodes: languageSpecificPodcast.totalEpisodes,
              lastUpdated: languageSpecificPodcast.lastUpdated,
              fromDatabase: true,
              podcastTitle: await translatePodcastTitle(languageSpecificPodcast.podcastTitle, languageCode, displayLanguage),
              selectedLanguage: displayLanguage,
              audioLanguage: autoContentLanguage,
              hasAudio: true
            });
          }
          
          const adaptedPodcast = {
            ...languageSpecificPodcast,
            podcastTitle: await translatePodcastTitle(languageSpecificPodcast.podcastTitle, languageCode, displayLanguage),
            podcastDescription: await translatePodcastDescription(languageSpecificPodcast.podcastDescription, languageCode, displayLanguage),
            selectedLanguage: displayLanguage,
            audioLanguage: autoContentLanguage,
            hasAudio: true,
            episodes: languageSpecificPodcast.episodes.map(episode => ({
              ...episode,
              title: translateEpisodeTitle(episode.title, languageCode),
              summary: episode.summary // Keep original for now, can translate if needed
            }))
          };
          return NextResponse.json(adaptedPodcast);
        }
      }
      
      // Step 2: Fallback to English content if no language-specific episode or no audio
      console.log(`Checking database for English podcast content (used for ${displayLanguage} audio generation)`);
      const cachedPodcast = await databaseService.withConnection(
        () => PodcastService.getTodaysPodcast('English')
      );
      
      if (cachedPodcast) {
        console.log(`Found cached English podcast content, available for ${displayLanguage} audio generation`);
        // If only status is requested, return lightweight response
        if (statusOnly) {
          return NextResponse.json({
            hasContent: true,
            totalEpisodes: cachedPodcast.totalEpisodes,
            lastUpdated: cachedPodcast.lastUpdated,
            fromDatabase: true,
            podcastTitle: await translatePodcastTitle(cachedPodcast.podcastTitle, languageCode, displayLanguage),
            selectedLanguage: displayLanguage,
            audioLanguage: autoContentLanguage
          });
        }
        // Translate title and description for non-English languages
        const adaptedPodcast = {
          ...cachedPodcast,
          podcastTitle: await translatePodcastTitle(cachedPodcast.podcastTitle, languageCode, displayLanguage),
          podcastDescription: await translatePodcastDescription(cachedPodcast.podcastDescription, languageCode, displayLanguage),
          selectedLanguage: displayLanguage,
          audioLanguage: autoContentLanguage,
          episodes: cachedPodcast.episodes.map(episode => ({
            ...episode,
            title: translateEpisodeTitle(episode.title, languageCode),
            summary: episode.summary // Keep original for now, can translate if needed
          }))
        };
        return NextResponse.json(adaptedPodcast);
      }
      
      // Only generate new English content if this is an English request or force refresh
      // For other languages, show error that English content is needed first
      if (languageCode !== 'en') {
        console.log(`No English content available for ${displayLanguage} audio generation`);
        if (statusOnly) {
          return NextResponse.json({
            hasContent: false,
            totalEpisodes: 0,
            lastUpdated: null,
            fromDatabase: false,
            error: 'No cached English content found - need to generate base content first'
          });
        }
        return NextResponse.json({
          error: 'No English content available. Please generate English content first.',
          needsEnglishContent: true
        }, { status: 400 });
      }
      
      console.log('No cached English podcast content found, will generate new English content...');
      
      // If only status is requested and no cached data, return not found status
      if (statusOnly) {
        return NextResponse.json({
          hasContent: false,
          totalEpisodes: 0,
          lastUpdated: null,
          fromDatabase: false,
          error: 'No cached English content found - need to generate base content first'
        });
      }
    } else {
      console.log('Force refresh requested, generating new English content');
      
      // If only status is requested during force refresh, return generating status
      if (statusOnly) {
        return NextResponse.json({
          hasContent: false,
          totalEpisodes: 0,
          lastUpdated: null,
          fromDatabase: false,
          isGenerating: true
        });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured' 
      }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Use Gemini Pro with grounding for real-time search
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      tools: [{
        googleSearchRetrieval: {}
      }]
    });

    const currentDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Get language-specific prompt instructions
    // Always generate English content; audio can be multi-language
    const languageInstructions = LANGUAGE_PROMPT_INSTRUCTIONS['en'];

    // Create comprehensive prompt for single consolidated regulatory episode
    const prompt = `Today is ${currentDate}. You have access to Google Search and real-time information. Please search the internet NOW for the latest regulatory news from India.

You are a regulatory news analyst creating a comprehensive daily regulatory podcast episode. Use your Google Search capability to find and compile ALL the latest regulatory news from India from TODAY and the last 24-48 hours. Consolidate everything into ONE SINGLE EPISODE with multiple news points as bullets.

${languageInstructions}

IMPORTANT: Use Google Search to find real, current news from these sources:
- sebi.gov.in (official SEBI website)
- rbi.org.in (official RBI website)
- economictimes.indiatimes.com
- livemint.com
- business-standard.com
- moneycontrol.com

Focus on:
1. SEBI (Securities and Exchange Board of India) latest announcements, regulations, policy changes, and circulars
2. RBI (Reserve Bank of India) policy decisions, banking regulations, and monetary policy updates
3. Government financial policy changes, budget announcements, and regulatory framework updates
4. Compliance requirements, new rules for financial institutions
5. Regulatory enforcement actions and penalties
6. Changes to investment guidelines and investor protection measures

Provide EXACTLY ONE EPISODE with this structure (NO SOURCES REQUIRED):

PODCAST TITLE: "SEBI & Regulatory Daily Roundup - ${currentDate}"

REGULATORY SUMMARY: 
[Provide a comprehensive 3-4 sentence overview of ALL today's regulatory developments found through search]

SINGLE EPISODE:
- title: "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates"
- summary: [Comprehensive 5-6 sentence summary covering ALL major regulatory developments found today]
- keyPoints: [Create 8-12 detailed bullet points, each covering a different regulatory development from SEBI, RBI, or policy changes found through search. Each bullet should be specific, actionable, and informative. Format as clear bullet points with important details]
- category: sebi (primary category)
- importance: high

DO NOT include any sources or URLs. Focus on providing detailed, informative bullet points with the key regulatory information.`;

    console.log('Generating market podcast with Gemini...');

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Raw Gemini response:', text);

    // Parse the response to extract structured data
    const podcastData = parseGeminiResponse(text);

    // Save to database for future use
    try {
      if (podcastData.episodes && podcastData.episodes.length > 0) {
        const episode = podcastData.episodes[0];
        
        const episodeData = {
          title: episode.title,
          summary: episode.summary,
          keyPoints: episode.keyPoints,
          sources: [], // No sources - content is bullet points only
          category: mapCategoryToEnum(episode.category),
          importance: mapImportanceToEnum(episode.importance),
          podcastTitle: podcastData.podcastTitle,
          marketSummary: podcastData.marketSummary,
          language: 'English', // Always store as English content
        };
        
        const savedEpisodeId = await databaseService.withConnection(
          () => PodcastService.savePodcastEpisode(episodeData)
        );
        console.log('Podcast episode saved to database with ID:', savedEpisodeId);
        
        // Add database metadata to response
        podcastData.fromDatabase = false;
        podcastData.episodeId = savedEpisodeId;
      }
    } catch (error) {
      console.error('Error saving podcast to database:', error);
      // Continue without failing the API call
    }

    return NextResponse.json(podcastData);

  } catch (error) {
    console.error('Market Podcast API error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate market podcast',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function parseGeminiResponse(text: string): MarketPodcastResponse {
  const lines = text.split('\n');
  const episodes: PodcastNewsItem[] = [];
  
  let podcastTitle = "SEBI & Regulatory Daily Roundup - " + new Date().toLocaleDateString();
  let marketSummary = "";
  
  // Extract podcast title
  const titleMatch = text.match(/PODCAST TITLE:\s*"([^"]+)"/i);
  if (titleMatch) {
    podcastTitle = titleMatch[1];
  }

  // Extract regulatory summary
  const summaryMatch = text.match(/REGULATORY SUMMARY:[\s\S]*?(?=SINGLE EPISODE|$)/);
  if (summaryMatch) {
    const summary = summaryMatch[0].replace(/^REGULATORY SUMMARY:\s*/, '').trim();
    marketSummary = summary.replace(/\n\n/g, ' ');
  }

  // Extract the single episode content
  const episodeMatch = text.match(/SINGLE EPISODE:[\s\S]*?(?=- category:|$)/);
  if (episodeMatch) {
    const episodeContent = episodeMatch[0].replace(/^SINGLE EPISODE:\s*/, '');
    
    // Extract title
    const episodeTitleMatch = episodeContent.match(/- title:\s*"([^"]+)"/i);
    const episodeTitle = episodeTitleMatch ? episodeTitleMatch[1] : "Today's Regulatory Roundup";
    
    // Extract summary
    const episodeSummaryMatch = episodeContent.match(/- summary:[\s\S]*?(?=- keyPoints:|$)/);
    const episodeSummary = episodeSummaryMatch ? episodeSummaryMatch[0].replace(/^- summary:\s*/, '').trim().replace(/\n/g, ' ') : "Regulatory updates for today";
    
    // Extract key points - look for bullet points in various formats
    const keyPointsSection = text.match(/- keyPoints:[\s\S]*?(?=- category:|$)/);
    let keyPoints: string[] = [];
    
    if (keyPointsSection) {
      const keyPointsText = keyPointsSection[0].replace(/^- keyPoints:\s*/, '');
      
      // First try: Extract points that start with * and have **bold** formatting
      const bulletMatches = keyPointsText.match(/\*\s*\*\*[^*]+\*\*[^*]+/g);
      if (bulletMatches) {
        keyPoints = bulletMatches.map(point => 
          point.replace(/^\*\s*/, '').replace(/\*\*/g, '').trim()
        ).filter(point => point.length > 10);
      }
      
      // Second try: Look for any lines that start with * (without bold)
      if (keyPoints.length === 0) {
        const fallbackMatches = keyPointsText.match(/\*[^\n]+/g);
        if (fallbackMatches) {
          keyPoints = fallbackMatches.map(point => 
            point.replace(/^\*\s*/, '').replace(/\*\*/g, '').trim()
          ).filter(point => point.length > 10);
        }
      }
      
      // Third try: Look for numbered points (1., 2., etc.)
      if (keyPoints.length === 0) {
        const numberedMatches = keyPointsText.match(/\d+\.[^\n]+/g);
        if (numberedMatches) {
          keyPoints = numberedMatches.map(point => 
            point.replace(/^\d+\.\s*/, '').trim()
          ).filter(point => point.length > 10);
        }
      }
      
      // Fourth try: Look for lines with bullet points or dashes
      if (keyPoints.length === 0) {
        const dashMatches = keyPointsText.match(/[-•]\s*[^\n]+/g);
        if (dashMatches) {
          keyPoints = dashMatches.map(point => 
            point.replace(/^[-•]\s*/, '').trim()
          ).filter(point => point.length > 10);
        }
      }
    }
    
    // No sources extraction - set empty array
    const sources: Array<{title: string; url: string; publishedAt?: string}> = [];
    
    // Create the single episode
    episodes.push({
      id: 'episode-1',
      title: episodeTitle,
      summary: episodeSummary,
      keyPoints: keyPoints.length > 0 ? keyPoints : ['Regulatory developments for today', 'Policy updates from financial regulators'],
      category: 'sebi',
      importance: 'high',
      sources: sources,
      timestamp: new Date().toISOString()
    });
  }

  // If no episodes found, create fallback from raw text
  if (episodes.length === 0) {
    // Try to extract key points from raw text as fallback
    const bulletPoints = text.match(/\*[^\n]*(?:RBI|SEBI|policy|regulatory|compliance)[^\n]*/gi) || [];
    const keyPoints = bulletPoints.length > 0 
      ? bulletPoints.map(point => point.replace(/^\*\s*/, '').trim()).slice(0, 8)
      : ['No specific regulatory updates found for today'];
    
    episodes.push({
      id: 'episode-1',
      title: 'Today\'s Regulatory Roundup: Key SEBI, RBI and Policy Updates',
      summary: marketSummary || 'Regulatory updates for today',
      keyPoints,
      category: 'sebi',
      importance: 'medium',
      sources: [],
      timestamp: new Date().toISOString()
    });
  }

  return {
    episodes: [episodes[0]], // Always return exactly one episode
    podcastTitle,
    podcastDescription: `Daily consolidated regulatory podcast covering all major SEBI announcements, RBI policy updates, and regulatory changes in a single comprehensive episode. Updated ${new Date().toLocaleDateString()}.`,
    totalEpisodes: 1,
    lastUpdated: new Date().toISOString(),
    marketSummary: marketSummary || "Today's comprehensive roundup of all regulatory developments and compliance requirements in Indian financial markets."
  };
}

// Helper functions to map categories and importance to database enums
function mapCategoryToEnum(category: string): 'SEBI' | 'RBI' | 'POLICY' | 'REGULATORY' {
  const normalizedCategory = category.toLowerCase();
  switch (normalizedCategory) {
    case 'sebi':
      return 'SEBI';
    case 'rbi':
      return 'RBI';
    case 'policy':
      return 'POLICY';
    default:
      return 'REGULATORY';
  }
}

function mapImportanceToEnum(importance: string): 'HIGH' | 'MEDIUM' | 'LOW' {
  const normalizedImportance = importance.toLowerCase();
  switch (normalizedImportance) {
    case 'high':
      return 'HIGH';
    case 'low':
      return 'LOW';
    default:
      return 'MEDIUM';
  }
}

// Translation helper functions for podcast metadata
async function translatePodcastTitle(originalTitle: string, languageCode: string, displayLanguage: string): Promise<string> {
  if (languageCode === 'en') {
    return originalTitle;
  }
  
  // Language-specific titles for common podcast formats
  const titleTranslations: Record<string, Record<string, string>> = {
    'hi': {
      'SEBI & Regulatory Daily Roundup': 'सेबी और नियामक दैनिक समाचार',
      'Regulatory Daily Roundup': 'नियामक दैनिक समाचार',
      'Daily Regulatory Updates': 'दैनिक नियामक अपडेट'
    },
    'gu': {
      'SEBI & Regulatory Daily Roundup': 'સેબી અને નિયામક દૈનિક સમાચાર',
      'Regulatory Daily Roundup': 'નિયામક દૈનિક સમાચાર', 
      'Daily Regulatory Updates': 'દૈનિક નિયામક અપડેટ્સ'
    },
    'mr': {
      'SEBI & Regulatory Daily Roundup': 'सेबी आणि नियामक दैनिक बातम्या',
      'Regulatory Daily Roundup': 'नियामक दैनिक बातम्या',
      'Daily Regulatory Updates': 'दैनिक नियामक अपडेट'
    },
    'ta': {
      'SEBI & Regulatory Daily Roundup': 'செபி மற்றும் ஒழுங்குமுறை தினசரி செய்திகள்',
      'Regulatory Daily Roundup': 'ஒழுங்குமுறை தினசரி செய்திகள்',
      'Daily Regulatory Updates': 'தினசரி ஒழுங்குமுறை புதுப்பிப்புகள்'
    },
    'te': {
      'SEBI & Regulatory Daily Roundup': 'సెబి మరియు నియంత్రణ దైనిక వార్తలు',
      'Regulatory Daily Roundup': 'నియంత్రణ దైనిక వార్తలు',
      'Daily Regulatory Updates': 'దైనిక నియంత్రణ అప్‌డేట్‌లు'
    },
    'bn': {
      'SEBI & Regulatory Daily Roundup': 'সেবি এবং নিয়ন্ত্রক দৈনিক সংবাদ',
      'Regulatory Daily Roundup': 'নিয়ন্ত্রক দৈনিক সংবাদ',
      'Daily Regulatory Updates': 'দৈনিক নিয়ন্ত্রক আপডেট'
    },
    'kn': {
      'SEBI & Regulatory Daily Roundup': 'ಸೆಬಿ ಮತ್ತು ನಿಯಂತ್ರಕ ದೈನಂದಿನ ಸುದ್ದಿಗಳು',
      'Regulatory Daily Roundup': 'ನಿಯಂತ್ರಕ ದೈನಂದಿನ ಸುದ್ದಿಗಳು',
      'Daily Regulatory Updates': 'ದೈನಂದಿನ ನಿಯಂತ್ರಕ ನವೀಕರಣಗಳು'
    },
    'ml': {
      'SEBI & Regulatory Daily Roundup': 'സെബി, നിയന്ത്രണ ദിനംപ്രതി വാർത്തകൾ',
      'Regulatory Daily Roundup': 'നിയന്ത്രണ ദിനംപ്രതി വാർത്തകൾ',
      'Daily Regulatory Updates': 'ദിനംപ്രതി നിയന്ത്രണ അപ്‌ഡേറ്റുകൾ'
    },
    'pa': {
      'SEBI & Regulatory Daily Roundup': 'ਸੇਬੀ ਅਤੇ ਨਿਯਮਕ ਰੋਜ਼ਾਨਾ ਖ਼ਬਰਾਂ',
      'Regulatory Daily Roundup': 'ਨਿਯਮਕ ਰੋਜ਼ਾਨਾ ਖ਼ਬਰਾਂ',
      'Daily Regulatory Updates': 'ਰੋਜ਼ਾਨਾ ਨਿਯਮਕ ਅਪਡੇਟ'
    }
  };
  
  // Extract base title without date
  const baseTitle = originalTitle.replace(/ - .*$/, '');
  const translations = titleTranslations[languageCode];
  
  if (translations && translations[baseTitle]) {
    // Add date in the format for the language
    const currentDate = new Date().toLocaleDateString();
    return `${translations[baseTitle]} - ${currentDate}`;
  }
  
  // Fallback: return original title with language indicator
  return `${originalTitle} (${displayLanguage})`;
}

async function translatePodcastDescription(originalDescription: string, languageCode: string, displayLanguage: string): Promise<string> {
  if (languageCode === 'en') {
    return originalDescription;
  }
  
  // Generic translated descriptions
  const descriptionTranslations: Record<string, string> = {
    'hi': 'भारतीय वित्तीय बाजारों में नियामक विकास, अनुपालन आवश्यकताओं और नीति परिवर्तनों पर दैनिक पॉडकास्ट।',
    'gu': 'ભારતીય નાણાકીય બજારોમાં નિયામક વિકાસ, અનુપાલન આવશ્યકતાઓ અને નીતિ ફેરફારો પર દૈનિક પોડકાસ્ટ।',
    'mr': 'भारतीय वित्तीय बाजारांतील नियामक विकास, अनुपालन आवश्यकता आणि धोरण बदलांवर दैनिक पॉडकास्ट।',
    'ta': 'இந்திய நிதிச் சந்தைகளில் ஒழுங்குமுறை மேம்பாடுகள், இணக்கத் தேவைகள் மற்றும் கொள்கை மாற்றங்கள் குறித்த தினசரி பாட்காஸ்ட்.',
    'te': 'భారతీయ ఆర్థిక మార్కెట్లలో నియంత్రణ అభివృద్ధులు, అనుపాలన అవసరాలు మరియు విధాన మార్పులపై రోజువారీ పోడ్‌కాస్ట్.',
    'bn': 'ভারতীয় আর্থিক বাজারে নিয়ন্ত্রক উন্নয়ন, সম্মতি প্রয়োজনীয়তা এবং নীতি পরিবর্তনের উপর দৈনিক পডকাস্ট।',
    'kn': 'ಭಾರತೀಯ ಹಣಕಾಸು ಮಾರುಕಟ್ಟೆಗಳಲ್ಲಿ ನಿಯಂತ್ರಕ ಅಭಿವೃದ್ಧಿ, ಅನುಸರಣೆ ಅವಶ್ಯಕತೆಗಳು ಮತ್ತು ನೀತಿ ಬದಲಾವಣೆಗಳ ಕುರಿತು ದೈನಂದಿನ ಪಾಡ್‌ಕಾಸ್ಟ್.',
    'ml': 'ഇന്ത്യൻ സാമ്പത്തിക വിപണികളിലെ നിയന്ത്രണ വികസനങ്ങൾ, അനുസരണ ആവശ്യകതകൾ, നയ മാറ്റങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള ദിനംപ്രതി പോഡ്‌കാസ്റ്റ്.',
    'pa': 'ਭਾਰਤੀ ਵਿੱਤੀ ਬਾਜ਼ਾਰਾਂ ਵਿੱਚ ਨਿਯਮਕ ਵਿਕਾਸ, ਪਾਲਣਾ ਲੋੜਾਂ ਅਤੇ ਨੀਤੀ ਤਬਦੀਲੀਆਂ ਬਾਰੇ ਰੋਜ਼ਾਨਾ ਪੋਡਕਾਸਟ।'
  };
  
  return descriptionTranslations[languageCode] || originalDescription;
}

function translateEpisodeTitle(originalTitle: string, languageCode: string): string {
  if (languageCode === 'en') {
    return originalTitle;
  }
  
  // Translate common episode title patterns
  const episodeTitleTranslations: Record<string, Record<string, string>> = {
    'hi': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "आज के नियामक समाचार: प्रमुख सेबी, आरबीआई और नीति अपडेट",
      "Today's Regulatory Roundup": "आज के नियामक समाचार"
    },
    'gu': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "આજના નિયામક સમાચાર: મુખ્ય સેબી, આરબીઆઈ અને નીતિ અપડેટ્સ",
      "Today's Regulatory Roundup": "આજના નિયામક સમાચાર"
    },
    'mr': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "आजच्या नियामक बातम्या: प्रमुख सेबी, आरबीआय आणि धोरण अपडेट",
      "Today's Regulatory Roundup": "आजच्या नियामक बातम्या"
    },
    'ta': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "இன்றைய ஒழுங்குமுறை செய்திகள்: முக்கிய செபி, ரிசர்வ் வங்கி மற்றும் கொள்கை புதுப்பிப்புகள்",
      "Today's Regulatory Roundup": "இன்றைய ஒழுங்குமுறை செய்திகள்"
    },
    'te': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "నేటి నియంత्रण వార్తలు: ముఖ్య సెబి, ఆర్‌బిఐ మరియు విధాన అప్‌డేట్‌లు",
      "Today's Regulatory Roundup": "నేటి నియంత్రణ వార్తలు"
    },
    'bn': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "আজকের নিয়ন্ত্রক সংবাদ: প্রধান সেবি, আরবিআই এবং নীতি আপডেট",
      "Today's Regulatory Roundup": "আজকের নিয়ন্ত্রক সংবাদ"
    },
    'kn': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "ಇಂದಿನ ನಿಯಂತ್ರಕ ಸುದ್ದಿಗಳು: ಪ್ರಮುಖ ಸೆಬಿ, ಆರ್‌ಬಿಐ ಮತ್ತು ನೀತಿ ಅಪ್‌ಡೇಟ್‌ಗಳು",
      "Today's Regulatory Roundup": "ಇಂದಿನ ನಿಯಂತ್ರಕ ಸುದ್ದಿಗಳು"
    },
    'ml': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "ഇന്നത്തെ നിയന്ത്രണ വാർത്തകൾ: പ്രധാന സെബി, ആർബിഐ, നയ അപ്‌ഡേറ്റുകൾ",
      "Today's Regulatory Roundup": "ഇന്നത്തെ നിയന്ത്രണ വാർത്തകൾ"
    },
    'pa': {
      "Today's Regulatory Roundup: Key SEBI, RBI and Policy Updates": "ਅੱਜ ਦੀਆਂ ਨਿਯਮਕ ਖ਼ਬਰਾਂ: ਮੁੱਖ ਸੇਬੀ, ਆਰਬੀਆਈ ਅਤੇ ਨੀਤੀ ਅਪਡੇਟ",
      "Today's Regulatory Roundup": "ਅੱਜ ਦੀਆਂ ਨਿਯਮਕ ਖ਼ਬਰਾਂ"
    }
  };
  
  const translations = episodeTitleTranslations[languageCode];
  return translations?.[originalTitle] || originalTitle;
}
