import { NextRequest, NextResponse } from 'next/server';
import { GeminiChapterGenerator } from '@/services/geminiChapterGenerator';
import { AudioManagementService } from '@/lib/services/audioManagementService';

// You'll need to import your database connection here
// import { db } from '@/lib/db/connection';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const audioUploadId = searchParams.get('audioUploadId');
    const status = searchParams.get('status');

    // For now, return mock data - you'll need to replace this with actual DB calls
    // const audioService = new AudioManagementService(db);
    // const chapters = await audioService.getAIChapters(audioUploadId, status);

    const mockChapters = [
      {
        id: '1',
        audio_upload_id: audioUploadId || '1',
        chapter_data: [
          { title: 'Understanding Market Fundamentals', start: 0, duration: 120, confidence: 87 },
          { title: 'Risk Management Strategies', start: 120, duration: 140, confidence: 92 },
          { title: 'Investment Planning Basics', start: 260, duration: 100, confidence: 85 }
        ],
        overall_confidence: 88,
        processing_time_ms: 2340,
        ai_model: 'gemini-pro',
        generation_method: 'pattern-analysis',
        status: 'generated' as const,
        generated_at: new Date(),
      }
    ];

    return NextResponse.json({
      success: true,
      chapters: audioUploadId ? mockChapters.filter(c => c.audio_upload_id === audioUploadId) : mockChapters
    });

  } catch (error) {
    console.error('Error fetching AI chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI chapters' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { audioUploadId, audioUrl, languageCode, languageName, courseId } = await request.json();

    if (!audioUploadId || !audioUrl || !languageCode || !languageName) {
      return NextResponse.json(
        { error: 'Missing required fields: audioUploadId, audioUrl, languageCode, languageName' },
        { status: 400 }
      );
    }

    // Check if Gemini API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini AI service not configured. Please check API key.' },
        { status: 500 }
      );
    }

    const startTime = Date.now();

    try {
      // Initialize the Gemini chapter generator
      const chapterGenerator = new GeminiChapterGenerator();
      
      // Generate chapters using Gemini AI
      const result = await chapterGenerator.generateChapters(audioUrl, languageCode, languageName);
      
      const processingTime = Date.now() - startTime;

      // Store the generated chapters in the database
      // const audioService = new AudioManagementService(db);
      // const chaptersId = await audioService.createAIChapters({
      //   audio_upload_id: audioUploadId,
      //   chapter_data: result.chapters,
      //   overall_confidence: result.confidence,
      //   processing_time_ms: processingTime,
      //   ai_model: 'gemini-pro',
      //   generation_method: 'pattern-analysis-with-ai',
      //   status: 'generated'
      // });

      // For now, return mock response with the actual generated data
      const mockChapters = {
        id: `chapters_${Date.now()}`,
        audio_upload_id: audioUploadId,
        chapter_data: result.chapters,
        overall_confidence: result.confidence,
        processing_time_ms: processingTime,
        ai_model: 'gemini-pro',
        generation_method: 'pattern-analysis-with-ai',
        status: 'generated' as const,
        generated_at: new Date(),
      };

      return NextResponse.json({
        success: true,
        message: 'AI chapters generated successfully',
        chapters: mockChapters
      });

    } catch (aiError) {
      console.error('AI chapter generation error:', aiError);
      
      // Return a fallback result with basic chapters
      const fallbackChapters = generateFallbackChapters(languageName);
      const processingTime = Date.now() - startTime;

      const mockChapters = {
        id: `chapters_fallback_${Date.now()}`,
        audio_upload_id: audioUploadId,
        chapter_data: fallbackChapters,
        overall_confidence: 60, // Lower confidence for fallback
        processing_time_ms: processingTime,
        ai_model: 'fallback',
        generation_method: 'duration-based-fallback',
        status: 'generated' as const,
        generated_at: new Date(),
      };

      return NextResponse.json({
        success: true,
        message: 'AI generation failed, using fallback chapters',
        chapters: mockChapters,
        warning: 'Generated using fallback method due to AI service error'
      });
    }

  } catch (error) {
    console.error('Error generating AI chapters:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI chapters' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { chaptersId, status, reviewNotes } = await request.json();

    if (!chaptersId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: chaptersId, status' },
        { status: 400 }
      );
    }

    const validStatuses = ['generated', 'approved', 'rejected', 'live'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      );
    }

    // Update the chapter status in the database
    // const audioService = new AudioManagementService(db);
    // await audioService.updateAIChapterStatus(chaptersId, status, session.user.id, reviewNotes);

    return NextResponse.json({
      success: true,
      message: `Chapter status updated to ${status}`,
      chaptersId,
      status,
      reviewNotes
    });

  } catch (error) {
    console.error('Error updating chapter status:', error);
    return NextResponse.json(
      { error: 'Failed to update chapter status' },
      { status: 500 }
    );
  }
}

// Helper function to generate fallback chapters when AI fails
function generateFallbackChapters(languageName: string) {
  const baseChapters = [
    { title: 'Introduction and Overview', start: 0, duration: 120 },
    { title: 'Key Concepts and Fundamentals', start: 120, duration: 150 },
    { title: 'Practical Examples and Applications', start: 270, duration: 130 },
    { title: 'Summary and Conclusion', start: 400, duration: 80 }
  ];

  // Translate chapter titles based on language (basic translations)
  const translations: { [key: string]: string[] } = {
    'हिंदी (Hindi)': [
      'परिचय और अवलोकन',
      'मुख्य अवधारणाएं और बुनियादी बातें', 
      'व्यावहारिक उदाहरण और अनुप्रयोग',
      'सारांश और निष्कर्ष'
    ],
    'ગુજરાતી (Gujarati)': [
      'પરિચય અને અવલોકન',
      'મુખ્ય ખ્યાલો અને મૂળભૂત બાબતો',
      'વ્યવહારિક ઉદાહરણો અને અરજીઓ',
      'સારાંશ અને નિષ્કર્ષ'
    ],
    // Add more translations as needed
  };

  const translatedTitles = translations[languageName] || baseChapters.map(c => c.title);

  return baseChapters.map((chapter, index) => ({
    ...chapter,
    title: translatedTitles[index] || chapter.title,
    confidence: 60 // Lower confidence for fallback chapters
  }));
}
