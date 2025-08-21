import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string; lesson: string }> }
) {
  try {
    const { lang, lesson } = await params;
    
    // Define the path to the locale file
    const filePath = path.join(
      process.cwd(),
      'src',
      'locales',
      lang,
      'courses',
      `${lesson}.json`
    );
    
    try {
      // Try to read the requested language file
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      return NextResponse.json(data);
    } catch {
      // If the file doesn't exist, try to fallback to English
      if (lang !== 'en') {
        const fallbackPath = path.join(
          process.cwd(),
          'src',
          'locales',
          'en',
          'courses',
          `${lesson}.json`
        );
        
        try {
          const fallbackContent = await fs.readFile(fallbackPath, 'utf-8');
          const fallbackData = JSON.parse(fallbackContent);
          
          return NextResponse.json({
            ...fallbackData,
            _fallback: true,
            _requestedLang: lang
          });
        } catch {
          // Fallback also failed
        }
      }
      
      // No file found
      return NextResponse.json(
        { error: 'Course content not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error loading course content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
