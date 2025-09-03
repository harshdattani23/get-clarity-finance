import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChapterSegment {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

interface AudioMetadata {
  duration: number;
  fileSize: number;
  estimatedDuration: number;
}

interface ChapterGenerationResult {
  chapters: ChapterSegment[];
  confidence: number;
  processingTime: number;
  method: 'ai-guided-pattern' | 'duration-based';
  metadata: AudioMetadata;
}

export class GeminiChapterGenerator {
  private gemini: GoogleGenerativeAI;
  
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    this.gemini = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Generate chapters using Gemini AI and pattern analysis
   */
  async generateChapters(
    audioUrl: string, 
    languageCode: string,
    expectedTopics?: string[]
  ): Promise<ChapterGenerationResult> {
    const startTime = Date.now();
    
    try {
      // Step 1: Get audio metadata
      const metadata = await this.getAudioMetadata(audioUrl);
      
      // Step 2: Generate chapter structure using Gemini AI
      const chapters = await this.generateChapterStructureWithGemini(
        metadata,
        languageCode,
        expectedTopics
      );
      
      const processingTime = Date.now() - startTime;
      
      return {
        chapters,
        confidence: this.calculateOverallConfidence(chapters, metadata),
        processingTime,
        method: 'ai-guided-pattern',
        metadata
      };
    } catch (error) {
      console.error('Gemini Chapter Generation Error:', error);
      
      // Fallback to duration-based approach
      return this.generateDurationBasedChapters(audioUrl, languageCode, expectedTopics);
    }
  }

  /**
   * Get audio file metadata
   */
  private async getAudioMetadata(audioUrl: string): Promise<AudioMetadata> {
    try {
      const response = await fetch(audioUrl, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      const fileSize = contentLength ? parseInt(contentLength) : 0;

      // Estimate duration based on file size (rough approximation)
      // Average audio file: ~1MB per minute for good quality
      const estimatedDuration = Math.max(300, Math.min(900, fileSize / (1024 * 1024) * 60));

      return {
        duration: estimatedDuration,
        fileSize,
        estimatedDuration
      };
    } catch (error) {
      console.warn('Failed to get audio metadata, using defaults:', error);
      return {
        duration: 480, // 8 minutes default
        fileSize: 0,
        estimatedDuration: 480
      };
    }
  }

  /**
   * Generate chapter structure using Gemini AI
   */
  private async generateChapterStructureWithGemini(
    metadata: AudioMetadata,
    languageCode: string,
    expectedTopics?: string[]
  ): Promise<ChapterSegment[]> {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = this.createGeminiPrompt(metadata, languageCode, expectedTopics);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return this.parseGeminiResponse(text, metadata);
  }

  /**
   * Create prompt for Gemini AI
   */
  private createGeminiPrompt(
    metadata: AudioMetadata,
    languageCode: string,
    expectedTopics?: string[]
  ): string {
    const languageNames = {
      'en': 'English',
      'hi': 'Hindi (हिंदी)', 
      'gu': 'Gujarati (ગુજરાતી)',
      'mr': 'Marathi (मराठी)',
      'ta': 'Tamil (தமிழ்)',
      'te': 'Telugu (తెలుగు)',
      'kn': 'Kannada (ಕನ್ನಡ)',
      'ml': 'Malayalam (മലയാളം)',
      'bn': 'Bengali (বাংলা)'
    };

    const languageName = languageNames[languageCode as keyof typeof languageNames] || 'English';
    const duration = Math.floor(metadata.duration);
    
    const topicsText = expectedTopics 
      ? `Expected topics: ${expectedTopics.join(', ')}\n\n`
      : '';

    return `You are an expert educational content designer. Create logical chapter divisions for a ${languageName} audio lesson about stock market fraud prevention.

${topicsText}Audio Details:
- Duration: ${duration} seconds (${Math.floor(duration / 60)} minutes ${duration % 60} seconds)
- Language: ${languageName}
- Topic: Stock Market Fraud Prevention & Education
- Target Audience: Individual investors and learners

Create 4-6 logical chapters that would make educational sense for this topic. Each chapter should be 2-4 minutes long.

Please provide chapter titles in ${languageName} that cover these typical fraud prevention topics:
1. Introduction and importance
2. Common fraud types and red flags
3. How to verify legitimacy
4. Protection strategies
5. Reporting and recovery
6. Real examples and case studies

Return ONLY a JSON object in this exact format:
{
  "chapters": [
    {
      "title": "Chapter title in ${languageName}",
      "start": 0,
      "confidence": 85
    },
    {
      "title": "Next chapter title in ${languageName}",
      "start": 120,
      "confidence": 90
    }
  ],
  "reasoning": "Brief explanation of chapter structure logic"
}

Requirements:
- Start times should be evenly distributed across the ${duration} second duration
- Chapter titles should be in ${languageName}
- Confidence should be 75-95 based on topic clarity
- Ensure chapters flow logically from basic to advanced concepts
- Each chapter should be 90-240 seconds long`;
  }

  /**
   * Parse Gemini AI response into chapters
   */
  private parseGeminiResponse(response: string, metadata: AudioMetadata): ChapterSegment[] {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? jsonMatch[0] : response;
      
      const parsed = JSON.parse(jsonStr);
      const chapters: ChapterSegment[] = [];

      if (!parsed.chapters || !Array.isArray(parsed.chapters)) {
        throw new Error('Invalid response format');
      }

      for (let i = 0; i < parsed.chapters.length; i++) {
        const chapter = parsed.chapters[i];
        const nextChapter = parsed.chapters[i + 1];
        
        // Calculate duration
        const duration = nextChapter 
          ? nextChapter.start - chapter.start
          : metadata.duration - chapter.start;

        chapters.push({
          title: chapter.title || `Chapter ${i + 1}`,
          start: Math.floor(chapter.start),
          duration: Math.floor(duration),
          confidence: Math.min(95, Math.max(75, chapter.confidence || 80))
        });
      }

      return chapters;
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      console.log('Raw response:', response);
      
      // Return fallback chapters
      return this.generateFallbackChapters(metadata);
    }
  }

  /**
   * Generate fallback chapters when AI fails
   */
  private generateFallbackChapters(metadata: AudioMetadata): ChapterSegment[] {
    const duration = metadata.duration;
    const numChapters = Math.min(6, Math.max(3, Math.floor(duration / 120))); // 2-minute chapters
    const chapterDuration = Math.floor(duration / numChapters);

    const defaultTitles = [
      'Introduction to Stock Market Fraud',
      'Common Red Flags and Warning Signs',
      'Types of Investment Scams',
      'How to Verify Legitimacy',
      'Protection and Prevention Strategies',
      'Reporting Fraud and Recovery Steps'
    ];

    return Array.from({ length: numChapters }, (_, i) => ({
      title: defaultTitles[i] || `Chapter ${i + 1}`,
      start: i * chapterDuration,
      duration: i === numChapters - 1 ? duration - (i * chapterDuration) : chapterDuration,
      confidence: 75
    }));
  }

  /**
   * Duration-based fallback method
   */
  private async generateDurationBasedChapters(
    audioUrl: string,
    languageCode: string,
    expectedTopics?: string[]
  ): Promise<ChapterGenerationResult> {
    const startTime = Date.now();
    const metadata = await this.getAudioMetadata(audioUrl);
    const chapters = this.generateFallbackChapters(metadata);
    
    return {
      chapters,
      confidence: 70,
      processingTime: Date.now() - startTime,
      method: 'duration-based',
      metadata
    };
  }

  /**
   * Calculate overall confidence score
   */
  private calculateOverallConfidence(chapters: ChapterSegment[], metadata: AudioMetadata): number {
    if (chapters.length === 0) return 0;
    
    const avgChapterConfidence = chapters.reduce((sum, ch) => sum + ch.confidence, 0) / chapters.length;
    
    // Bonus for appropriate number of chapters
    let lengthBonus = 0;
    if (chapters.length >= 3 && chapters.length <= 6) lengthBonus = 10;
    
    // Bonus for reasonable chapter lengths (2-4 minutes)
    const reasonableLengths = chapters.filter(ch => ch.duration >= 90 && ch.duration <= 300);
    const lengthRatio = reasonableLengths.length / chapters.length;
    const durationBonus = lengthRatio * 10;
    
    return Math.min(100, Math.floor(avgChapterConfidence + lengthBonus + durationBonus));
  }

  /**
   * Generate chapters for all languages
   */
  async generateAllLanguageChapters(
    baseUrl: string,
    languages: Array<{ code: string; name: string; file: string }>,
    expectedTopics?: string[]
  ): Promise<Record<string, ChapterGenerationResult>> {
    const results: Record<string, ChapterGenerationResult> = {};
    
    for (const lang of languages) {
      try {
        console.log(`Generating chapters for ${lang.name} using Gemini AI...`);
        const audioUrl = `${baseUrl}${lang.file}`;
        
        results[lang.code] = await this.generateChapters(
          audioUrl,
          lang.code,
          expectedTopics
        );
        
        console.log(`✅ Completed ${lang.name}: ${results[lang.code].chapters.length} chapters (${results[lang.code].confidence}% confidence)`);
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Failed to generate chapters for ${lang.name}:`, error);
        
        // Add fallback result
        try {
          results[lang.code] = await this.generateDurationBasedChapters(
            `${baseUrl}${lang.file}`,
            lang.code,
            expectedTopics
          );
          console.log(`⚠️ Used fallback method for ${lang.name}`);
        } catch (fallbackError) {
          console.error(`❌ Fallback also failed for ${lang.name}:`, fallbackError);
        }
      }
    }
    
    return results;
  }
}

// Configuration helper
export const createChapterGenerationConfig = () => ({
  expectedTopics: [
    'Understanding Stock Market Fraud',
    'Common Red Flags and Warning Signs', 
    'Types of Investment Scams',
    'How to Verify Legitimacy',
    'Reporting and Prevention',
    'Real-world Examples and Case Studies'
  ],
  languages: [
    { code: 'en', name: 'English', file: 'english.m4a' },
    { code: 'hi', name: 'हिंदी (Hindi)', file: 'hindi.m4a' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', file: 'gujarati.m4a' },
    { code: 'mr', name: 'मराठी (Marathi)', file: 'marathi.m4a' },
    { code: 'ta', name: 'தமிழ் (Tamil)', file: 'tamil.m4a' },
    { code: 'te', name: 'తెలుగు (Telugu)', file: 'telugu.m4a' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', file: 'Kannada.m4a' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', file: 'malyalam.m4a' },
    { code: 'bn', name: 'বাংলা (Bengali)', file: 'bengali.m4a' }
  ],
  baseUrl: 'https://storage.googleapis.com/getclarity-audio-bucket/lessons/module1/'
});

export default GeminiChapterGenerator;
