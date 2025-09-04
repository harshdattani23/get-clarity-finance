import { NextRequest } from 'next/server';
import GeminiLiveService from '@/services/geminiLiveService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, chatHistory = [], options = {} } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if Gemini API key is available
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Live chat service temporarily unavailable',
          message: 'I apologize, but the live chat service is currently unavailable. Please check back later or contact support if this issue persists.'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Gemini Live service
    const liveService = new GeminiLiveService();

    // Check for fraud urgency first
    const urgencyCheck = await liveService.detectFraudUrgency(message);
    
    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          // Send urgency alert first if critical
          if (urgencyCheck.isUrgent) {
            const urgencyAlert = {
              type: 'urgency_alert',
              riskLevel: urgencyCheck.riskLevel,
              action: urgencyCheck.suggestedAction,
              timestamp: new Date().toISOString()
            };
            
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(urgencyAlert)}\n\n`)
            );
          }

          // Start streaming the response
          const responseGenerator = liveService.streamResponse(message, chatHistory, options);
          
          let fullResponse = '';
          let chunkCount = 0;
          
          for await (const chunk of responseGenerator) {
            fullResponse += chunk;
            chunkCount++;
            
            const streamData = {
              type: 'text_chunk',
              content: chunk,
              fullContent: fullResponse,
              chunkIndex: chunkCount,
              isComplete: false,
              timestamp: new Date().toISOString()
            };
            
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(streamData)}\n\n`)
            );
            
            // Add a small delay to make streaming visible
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          // Send completion signal
          const completionData = {
            type: 'completion',
            fullContent: fullResponse,
            totalChunks: chunkCount,
            urgencyInfo: urgencyCheck,
            timestamp: new Date().toISOString()
          };
          
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(completionData)}\n\n`)
          );
          
        } catch (error) {
          console.error('Live streaming error:', error);
          
          const errorData = {
            type: 'error',
            message: 'I encountered an error while processing your request. If you have an urgent fraud concern, contact SEBI at 1800-266-7575.',
            timestamp: new Date().toISOString()
          };
          
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Live Chat API Error:', error);

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'I encountered an error while processing your live chat request. Please try again.'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// GET endpoint to check live chat service status
export async function GET() {
  try {
    const hasGeminiKey = !!(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    if (!hasGeminiKey) {
      return new Response(
        JSON.stringify({
          status: 'unavailable',
          message: 'Live chat service requires API configuration'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const liveService = new GeminiLiveService();
    
    return new Response(
      JSON.stringify({
        status: 'available',
        model: 'gemini-2.5-flash',
        features: {
          streaming: true,
          fraudDetection: true,
          urgencyClassification: true,
          realTimeAnalysis: true,
          voiceSupport: false, // Will be enabled in next phase
        },
        capabilities: [
          'Real-time streaming responses',
          'Fraud urgency detection and classification',
          'Live fraud prevention guidance',
          'Immediate risk assessment',
          'SEBI regulation compliance checking',
          'Investment verification assistance'
        ],
        riskLevels: ['low', 'medium', 'high', 'critical'],
        emergencyContact: {
          sebi: '1800-266-7575',
          cybercrime: '1930'
        },
        lastUpdated: new Date().toISOString()
      }),
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Live chat status check error:', error);
    
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Unable to check live service status'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
