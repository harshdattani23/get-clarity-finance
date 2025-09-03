import { GoogleGenerativeAI } from '@google/generative-ai';

interface TranscriptionSegment {
  text: string;
  start: number;
  end: number;
}

interface ChapterSegment {
  title: string;
  start: number;
  duration: number;
  confidence: number;
}

interface AudioMetadata {
  duration: number;
  sampleRate?: number;
  channels?: number;
}

interface ChapterGenerationResult {
  chapters: ChapterSegment[];
  confidence: number;
  processingTime: number;
  method: 'pattern-analysis' | 'duration-based';
  metadata: AudioMetadata;
}

export class AIChapterGenerator {
  private gemini: GoogleGenerativeAI;
  
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    this.gemini = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Generate chapters from audio file using AI
   */
  async generateChapters(
    audioUrl: string, 
    languageCode: string,
    expectedTopics?: string[]
  ): Promise<ChapterGenerationResult> {
    const startTime = Date.now();
    
    try {
      // Step 1: Transcribe audio with timestamps
      const transcription = await this.transcribeWithTimestamps(audioUrl);
      
      // Step 2: Analyze transcript for chapter breaks
      const chapters = await this.analyzeTranscriptForChapters(
        transcription.segments,
        languageCode,
        expectedTopics
      );
      
      // Step 3: Refine and validate chapters
      const refinedChapters = await this.refineChapterBoundaries(chapters, transcription.segments);
      
      const processingTime = Date.now() - startTime;
      
      return {
        chapters: refinedChapters,
        confidence: this.calculateOverallConfidence(refinedChapters),
        processingTime,
        method: 'pattern-analysis',
        metadata: { duration: 0 } // TODO: Calculate actual audio duration
      };
    } catch (error) {
      console.error('AI Chapter Generation Error:', error);
      throw new Error(`Failed to generate chapters: ${error}`);
    }
  }

  /**
   * Transcribe audio with word-level timestamps - Stub implementation
   */
  private async transcribeWithTimestamps(audioUrl: string): Promise<{
    text: string;
    segments: TranscriptionSegment[];
  }> {
    // TODO: Implement actual audio transcription service
    // This is a stub implementation to avoid build errors
    return {
      text: "Sample transcript for chapter generation.",
      segments: [
        { text: "Sample transcript for chapter generation.", start: 0, end: 10 }
      ]
    };
  }

  /**
   * Analyze transcript segments to identify chapter boundaries - Stub implementation
   */
  private async analyzeTranscriptForChapters(
    segments: TranscriptionSegment[],
    languageCode: string,
    expectedTopics?: string[]
  ): Promise<ChapterSegment[]> {
    // TODO: Implement actual AI analysis using Gemini
    // This is a stub implementation to avoid build errors
    const mockAnalysisResult = JSON.stringify({
      chapters: [
        {
          title: "Introduction to Stock Market Fraud",
          start: 0,
          confidence: 90
        },
        {
          title: "Common Red Flags",
          start: 120,
          confidence: 85
        },
        {
          title: "Protection Strategies",
          start: 240,
          confidence: 88
        }
      ],
      reasoning: "Sample chapter analysis for build compatibility"
    });
    
    return this.parseChapterAnalysis(mockAnalysisResult, segments);
  }

  /**
   * Create prompt for AI chapter analysis
   */
  private createChapterAnalysisPrompt(
    transcript: string,
    languageCode: string,
    expectedTopics?: string[]
  ): string {
    const languageNames = {
      'en': 'English',
      'hi': 'Hindi', 
      'gu': 'Gujarati',
      'mr': 'Marathi',
      'ta': 'Tamil',
      'te': 'Telugu',
      'kn': 'Kannada',
      'ml': 'Malayalam',
      'bn': 'Bengali'
    };

    const expectedTopicsText = expectedTopics 
      ? `Expected topics that should be covered: ${expectedTopics.join(', ')}\n\n`
      : '';

    return `Analyze this ${languageNames[languageCode as keyof typeof languageNames] || 'audio'} transcript of a stock market fraud education lesson and identify logical chapter boundaries.

${expectedTopicsText}Context: This is an educational audio lesson about stock market fraud prevention, covering topics like identifying red flags, understanding common scams, and protection strategies.

Transcript with timestamps:
${transcript}

Please identify 3-6 logical chapter breaks where the topic or focus significantly changes. For each chapter, provide:
1. A descriptive title (in the same language as the content)
2. Start timestamp (in seconds)
3. Confidence level (0-100)

Format your response as JSON:
{
  "chapters": [
    {
      "title": "Chapter Title",
      "start": 0,
      "confidence": 95
    }
  ],
  "reasoning": "Brief explanation of your chapter identification logic"
}

Guidelines:
- Chapters should be 2-4 minutes long ideally
- Focus on natural topic transitions
- Use clear, descriptive titles
- Ensure smooth narrative flow
- Consider educational pacing`;
  }

  /**
   * Parse AI analysis result into chapter segments
   */
  private parseChapterAnalysis(
    analysisResult: string | null,
    segments: TranscriptionSegment[]
  ): ChapterSegment[] {
    if (!analysisResult) {
      throw new Error('No analysis result received from AI');
    }

    try {
      const parsed = JSON.parse(analysisResult);
      const chapters: ChapterSegment[] = [];

      for (let i = 0; i < parsed.chapters.length; i++) {
        const chapter = parsed.chapters[i];
        const nextChapter = parsed.chapters[i + 1];
        
        // Calculate duration
        const duration = nextChapter 
          ? nextChapter.start - chapter.start
          : this.getLastSegmentEnd(segments) - chapter.start;

        chapters.push({
          title: chapter.title,
          start: Math.floor(chapter.start),
          duration: Math.floor(duration),
          confidence: chapter.confidence || 80
        });
      }

      return chapters;
    } catch (error) {
      console.error('Failed to parse AI analysis:', error);
      throw new Error('Invalid AI analysis format');
    }
  }

  /**
   * Refine chapter boundaries using audio analysis
   */
  private async refineChapterBoundaries(
    chapters: ChapterSegment[],
    segments: TranscriptionSegment[]
  ): Promise<ChapterSegment[]> {
    return chapters.map((chapter, index) => {
      // Find natural pause points near the suggested timestamp
      const idealStart = chapter.start;
      const searchWindow = 15; // seconds
      
      // Look for sentence boundaries or longer pauses
      const nearbySegments = segments.filter(seg => 
        Math.abs(seg.start - idealStart) <= searchWindow
      );
      
      let refinedStart = idealStart;
      let maxPauseLength = 0;
      
      // Find the longest pause (gap between segments) near the ideal start
      for (let i = 0; i < nearbySegments.length - 1; i++) {
        const currentEnd = nearbySegments[i].end;
        const nextStart = nearbySegments[i + 1].start;
        const pauseLength = nextStart - currentEnd;
        
        if (pauseLength > maxPauseLength) {
          maxPauseLength = pauseLength;
          refinedStart = Math.floor(nextStart);
        }
      }
      
      // Recalculate duration
      const nextChapter = chapters[index + 1];
      const duration = nextChapter 
        ? nextChapter.start - refinedStart
        : this.getLastSegmentEnd(segments) - refinedStart;

      return {
        ...chapter,
        start: refinedStart,
        duration: Math.floor(duration),
        confidence: chapter.confidence * 0.95 // Slight confidence boost for refinement
      };
    });
  }

  /**
   * Download audio file as buffer
   */
  private async downloadAudio(audioUrl: string): Promise<ArrayBuffer> {
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to download audio: ${response.statusText}`);
    }
    return response.arrayBuffer();
  }

  /**
   * Calculate overall confidence score
   */
  private calculateOverallConfidence(chapters: ChapterSegment[]): number {
    if (chapters.length === 0) return 0;
    
    const averageConfidence = chapters.reduce((sum, ch) => sum + ch.confidence, 0) / chapters.length;
    
    // Bonus for having a good number of chapters (3-6)
    const lengthBonus = chapters.length >= 3 && chapters.length <= 6 ? 5 : 0;
    
    return Math.min(100, Math.floor(averageConfidence + lengthBonus));
  }

  /**
   * Get the end time of the last segment
   */
  private getLastSegmentEnd(segments: TranscriptionSegment[]): number {
    if (segments.length === 0) return 0;
    return segments[segments.length - 1].end;
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
        console.log(`Generating chapters for ${lang.name}...`);
        const audioUrl = `${baseUrl}${lang.file}`;
        
        results[lang.code] = await this.generateChapters(
          audioUrl,
          lang.code,
          expectedTopics
        );
        
        console.log(`✅ Completed ${lang.name}: ${results[lang.code].chapters.length} chapters`);
        
        // Add delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Failed to generate chapters for ${lang.name}:`, error);
        // Continue with other languages even if one fails
      }
    }
    
    return results;
  }
}

// Usage example and utility functions
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

export default AIChapterGenerator;
