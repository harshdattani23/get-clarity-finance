import { GoogleGenerativeAI } from '@google/generative-ai';
import { getLanguageDisplayName } from '@/config/podcastLanguages';

export interface TranslatableContent {
  title: string;
  summary: string;
  keyPoints: string[];
  podcastTitle: string;
  marketSummary: string;
}

export interface TranslatedContent extends TranslatableContent {
  language: string;
}

/**
 * Translation service using Gemini AI for high-quality podcast translations
 */
export class TranslationService {
  private static genAI: GoogleGenerativeAI | null = null;

  private static getGeminiAI(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key not configured for translation service');
      }
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI;
  }

  /**
   * Translate podcast content from English to target language
   */
  static async translateContent(
    englishContent: TranslatableContent,
    targetLanguageCode: string
  ): Promise<TranslatedContent> {
    const targetLanguage = getLanguageDisplayName(targetLanguageCode);
    
    console.log(`🌐 Translating content from English to ${targetLanguage}...`);

    const genAI = this.getGeminiAI();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a professional translator specializing in financial and regulatory content. Translate the following podcast content from English to ${targetLanguage}.

IMPORTANT GUIDELINES:
1. Maintain the professional tone and financial terminology
2. Keep all regulatory terms (SEBI, RBI, etc.) as they are
3. Ensure cultural appropriateness for Indian ${targetLanguage} speakers
4. Preserve the meaning and context accurately
5. Use formal language appropriate for financial podcasts

Original English Content:
---
PODCAST TITLE: "${englishContent.podcastTitle}"

MARKET SUMMARY: "${englishContent.marketSummary}"

EPISODE TITLE: "${englishContent.title}"

EPISODE SUMMARY: "${englishContent.summary}"

KEY POINTS:
${englishContent.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}
---

Please provide the translation in this exact format:

TRANSLATED_PODCAST_TITLE: "[Translated podcast title in ${targetLanguage}]"

TRANSLATED_MARKET_SUMMARY: "[Translated market summary in ${targetLanguage}]"

TRANSLATED_EPISODE_TITLE: "[Translated episode title in ${targetLanguage}]"

TRANSLATED_EPISODE_SUMMARY: "[Translated episode summary in ${targetLanguage}]"

TRANSLATED_KEY_POINTS:
[Provide each key point translated to ${targetLanguage}, maintaining the same numbering]

Ensure all content is accurately translated while maintaining professional financial language.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const translatedText = response.text();
      
      console.log(`📝 Raw translation response for ${targetLanguage}:`, translatedText.substring(0, 200) + '...');

      // Parse the translated response
      const translatedContent = this.parseTranslatedResponse(translatedText, targetLanguageCode);
      
      console.log(`✅ Successfully translated content to ${targetLanguage}`);
      return translatedContent;

    } catch (error) {
      console.error(`❌ Translation failed for ${targetLanguage}:`, error);
      throw new Error(`Translation to ${targetLanguage} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse the translated response from Gemini
   */
  private static parseTranslatedResponse(text: string, languageCode: string): TranslatedContent {
    const language = getLanguageDisplayName(languageCode);

    try {
      // Extract translated podcast title
      const podcastTitleMatch = text.match(/TRANSLATED_PODCAST_TITLE:\s*"([^"]+)"/i) ||
                               text.match(/TRANSLATED_PODCAST_TITLE:\s*\[([^\]]+)\]/i);
      const podcastTitle = podcastTitleMatch ? podcastTitleMatch[1] : `SEBI & Regulatory Daily Roundup`;

      // Extract translated market summary
      const marketSummaryMatch = text.match(/TRANSLATED_MARKET_SUMMARY:\s*"([^"]+)"/i) ||
                                text.match(/TRANSLATED_MARKET_SUMMARY:\s*\[([^\]]+)\]/i);
      const marketSummary = marketSummaryMatch ? marketSummaryMatch[1] : 'Market summary translation unavailable';

      // Extract translated episode title
      const episodeTitleMatch = text.match(/TRANSLATED_EPISODE_TITLE:\s*"([^"]+)"/i) ||
                               text.match(/TRANSLATED_EPISODE_TITLE:\s*\[([^\]]+)\]/i);
      const title = episodeTitleMatch ? episodeTitleMatch[1] : `Today's Regulatory Updates`;

      // Extract translated episode summary
      const episodeSummaryMatch = text.match(/TRANSLATED_EPISODE_SUMMARY:\s*"([^"]+)"/i) ||
                                 text.match(/TRANSLATED_EPISODE_SUMMARY:\s*\[([^\]]+)\]/i);
      const summary = episodeSummaryMatch ? episodeSummaryMatch[1] : 'Episode summary translation unavailable';

      // Extract translated key points
      const keyPointsSection = text.match(/TRANSLATED_KEY_POINTS:\s*([\s\S]*?)(?=\n\n|$)/i);
      let keyPoints: string[] = [];
      
      if (keyPointsSection) {
        const pointsText = keyPointsSection[1];
        // Look for numbered points (1., 2., etc.) or bullet points (-, •, etc.)
        const points = pointsText
          .split(/\n/)
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-•]\s*/, '').trim())
          .filter(line => line.length > 10); // Filter out very short lines
        
        keyPoints = points.length > 0 ? points : ['Translation of key points unavailable'];
      } else {
        keyPoints = ['Translation of key points unavailable'];
      }

      return {
        podcastTitle,
        marketSummary,
        title,
        summary,
        keyPoints,
        language: languageCode
      };

    } catch (parseError) {
      console.error(`❌ Failed to parse translation for ${language}:`, parseError);
      
      // Return fallback content
      return {
        podcastTitle: `SEBI & Regulatory Daily Roundup - ${language}`,
        marketSummary: `Market summary in ${language} (translation processing)`,
        title: `Today's Regulatory Updates - ${language}`,
        summary: `Episode summary in ${language} (translation processing)`,
        keyPoints: [`Key points in ${language} (translation processing)`],
        language: languageCode
      };
    }
  }

  /**
   * Batch translate content to multiple languages
   */
  static async translateToMultipleLanguages(
    englishContent: TranslatableContent,
    targetLanguageCodes: string[]
  ): Promise<Record<string, TranslatedContent>> {
    const translations: Record<string, TranslatedContent> = {};
    
    console.log(`🌐 Starting batch translation to ${targetLanguageCodes.length} languages...`);

    // Translate to each language sequentially to avoid rate limits
    for (const languageCode of targetLanguageCodes) {
      try {
        console.log(`🔄 Translating to ${getLanguageDisplayName(languageCode)}...`);
        
        const translated = await this.translateContent(englishContent, languageCode);
        translations[languageCode] = translated;
        
        console.log(`✅ Completed translation for ${getLanguageDisplayName(languageCode)}`);
        
        // Small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Failed to translate to ${getLanguageDisplayName(languageCode)}:`, error);
        
        // Create fallback content for failed translations
        translations[languageCode] = {
          podcastTitle: `SEBI & Regulatory Daily Roundup - ${getLanguageDisplayName(languageCode)}`,
          marketSummary: `Market summary (translation failed)`,
          title: `Today's Regulatory Updates`,
          summary: `Episode summary (translation failed)`,
          keyPoints: ['Translation service temporarily unavailable'],
          language: languageCode
        };
      }
    }

    console.log(`🎉 Batch translation completed. ${Object.keys(translations).length}/${targetLanguageCodes.length} successful.`);
    
    return translations;
  }
}

export default TranslationService;
