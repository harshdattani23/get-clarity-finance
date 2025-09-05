import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Check environment variables
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const nodeEnv = process.env.NODE_ENV;
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: nodeEnv,
      geminiApiKeyConfigured: !!geminiKey,
      geminiApiKeyLength: geminiKey ? geminiKey.length : 0,
      services: {
        liveChat: {
          available: !!geminiKey,
          reason: geminiKey ? 'API key configured' : 'Missing GEMINI_API_KEY'
        }
      },
      endpoints: {
        '/api/chat/live': !!geminiKey ? 'available' : 'unavailable'
      }
    };

    const statusCode = geminiKey ? 200 : 503;

    return new Response(
      JSON.stringify(health, null, 2),
      { 
        status: statusCode,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );

  } catch (error) {
    console.error('Health check error:', error);
    
    return new Response(
      JSON.stringify({ 
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        geminiApiKeyConfigured: false
      }, null, 2),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
