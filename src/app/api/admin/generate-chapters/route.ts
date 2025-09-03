import { NextRequest, NextResponse } from 'next/server';
import GeminiChapterGenerator, { createChapterGenerationConfig } from '@/services/geminiChapterGenerator';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dattaniharsh12@gmail.com";

export async function POST(req: NextRequest) {
  try {
    // Admin routes are protected by middleware, no need for auth check here

    const body = await req.json();
    const { 
      audioUrl, 
      languageCode, 
      languageName,
      expectedTopics,
      mode = 'single' // 'single' or 'batch'
    } = body;

    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json({ 
        error: 'Gemini API key not configured' 
      }, { status: 500 });
    }

    const generator = new GeminiChapterGenerator();

    if (mode === 'single') {
      // Generate chapters for a single language
      if (!audioUrl || !languageCode) {
        return NextResponse.json({ 
          error: 'audioUrl and languageCode are required for single mode' 
        }, { status: 400 });
      }

      const result = await generator.generateChapters(
        audioUrl,
        languageCode,
        expectedTopics
      );

      return NextResponse.json({
        success: true,
        language: { code: languageCode, name: languageName },
        result,
        message: `Successfully generated ${result.chapters.length} chapters for ${languageName}`
      });

    } else if (mode === 'batch') {
      // Generate chapters for all languages
      const config = createChapterGenerationConfig();
      
      const results = await generator.generateAllLanguageChapters(
        config.baseUrl,
        config.languages,
        expectedTopics || config.expectedTopics
      );

      // Format results for easy consumption
      const formattedResults = Object.entries(results).map(([code, result]) => {
        const language = config.languages.find(l => l.code === code);
        return {
          languageCode: code,
          languageName: language?.name || code,
          chapters: result.chapters,
          confidence: result.confidence,
          processingTime: result.processingTime,
          success: result.chapters.length > 0
        };
      });

      const successCount = formattedResults.filter(r => r.success).length;
      const totalCount = config.languages.length;

      return NextResponse.json({
        success: true,
        results: formattedResults,
        summary: {
          successCount,
          totalCount,
          failureCount: totalCount - successCount,
          totalProcessingTime: Object.values(results).reduce(
            (sum, r) => sum + r.processingTime, 0
          )
        },
        message: `Generated chapters for ${successCount}/${totalCount} languages`
      });
    }

    return NextResponse.json({ 
      error: 'Invalid mode. Use "single" or "batch"' 
    }, { status: 400 });

  } catch (error) {
    console.error('Chapter generation error:', error);
    
    return NextResponse.json({ 
      error: 'Failed to generate chapters',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// GET endpoint to check service status
export async function GET() {
  try {
    const hasGeminiKey = !!(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    return NextResponse.json({
      status: 'available',
      services: {
        gemini: hasGeminiKey,
        'content-analysis': hasGeminiKey,
        'pattern-detection': true
      },
      supportedLanguages: createChapterGenerationConfig().languages.length,
      features: [
        'AI-guided chapter structure',
        'Educational content analysis',
        'Multi-language chapter titles',
        'Duration-based fallback',
        'Confidence scoring',
        'Batch processing'
      ]
    });
    
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      error: 'Service unavailable'
    }, { status: 500 });
  }
}
