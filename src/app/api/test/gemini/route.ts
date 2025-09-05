import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(req: NextRequest) {
  try {
    // Test basic Gemini AI functionality
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'GEMINI_API_KEY not configured',
          timestamp: new Date().toISOString()
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Test with the regular @google/generative-ai package
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = "Hello, just testing the API connection. Respond with 'API connection successful'.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Gemini API is working correctly',
        testResponse: text,
        apiKeyLength: apiKey.length,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Gemini test error:', error);
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to test Gemini API',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
