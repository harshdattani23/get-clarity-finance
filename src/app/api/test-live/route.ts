import { NextRequest } from 'next/server';

export async function GET() {
  try {
    // Test if we can import the service
    const { GeminiLiveService } = await import('@/services/geminiLiveService');
    
    // Check if API key is available
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!geminiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'No API key found',
          status: 'failed'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Try to instantiate the service
    const service = new GeminiLiveService();
    
    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'GeminiLiveService can be instantiated',
        hasApiKey: !!geminiKey,
        serviceCreated: !!service,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Service test error:', error);
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        error: error instanceof Error ? error.stack : String(error),
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
