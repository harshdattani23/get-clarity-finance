import { NextRequest } from 'next/server';
import GeminiLiveService from '@/services/geminiLiveService';

// Global service instance for session persistence
let globalLiveService: GeminiLiveService | null = null;

function getLiveService(): GeminiLiveService {
  if (!globalLiveService) {
    globalLiveService = new GeminiLiveService();
  }
  return globalLiveService;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, chatHistory = [], options = {}, action = 'chat' } = body;

    // Handle different actions
    if (action === 'initialize') {
      return await handleInitialize(options);
    } else if (action === 'close') {
      return await handleClose();
    } else if (action === 'voice') {
      return await handleVoiceInput(body);
    }

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

    // Get live service instance with error handling
    let liveService;
    try {
      liveService = getLiveService();
    } catch (error) {
      console.error('Failed to initialize live service:', error);
      
      // Return error response immediately
      return new Response(
        JSON.stringify({ 
          error: 'Live service initialization failed',
          message: 'I apologize, but the live chat service is currently experiencing technical difficulties. Please try the regular chat or contact SEBI at 1800-266-7575.',
          details: error instanceof Error ? error.message : 'Unknown error'
        }),
        { 
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

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

          // Start streaming the live response
          const responseGenerator = liveService.streamLiveResponse(message, chatHistory, options);
          
          let fullResponse = '';
          let chunkCount = 0;
          
          for await (const chunk of responseGenerator) {
            if (chunk.type === 'text_chunk') {
              fullResponse = chunk.fullContent || fullResponse;
              chunkCount++;
              
              const streamData = {
                type: 'text_chunk',
                content: chunk.content,
                fullContent: fullResponse,
                chunkIndex: chunkCount,
                isComplete: false,
                timestamp: new Date().toISOString()
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(streamData)}\n\n`)
              );
              
            } else if (chunk.type === 'audio_chunk') {
              const audioData = {
                type: 'audio_chunk',
                audioData: chunk.audioData,
                fullContent: fullResponse,
                timestamp: new Date().toISOString()
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(audioData)}\n\n`)
              );
              
            } else if (chunk.type === 'completion') {
              fullResponse = chunk.fullContent || fullResponse;
              
              // Send completion signal
              const completionData = {
                type: 'completion',
                fullContent: fullResponse,
                audioData: chunk.audioData,
                totalChunks: chunkCount,
                urgencyInfo: urgencyCheck,
                timestamp: new Date().toISOString()
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(completionData)}\n\n`)
              );
              
            } else if (chunk.type === 'error') {
              const errorData = {
                type: 'error',
                message: chunk.content,
                timestamp: new Date().toISOString()
              };
              
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`)
              );
            }
            
            // Add a small delay to make streaming visible
            await new Promise(resolve => setTimeout(resolve, 30));
          }
          
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

// Handler for initializing live session
async function handleInitialize(options: any) {
  try {
    const liveService = getLiveService();
    await liveService.initializeLiveSession(options);
    
    return new Response(
      JSON.stringify({
        status: 'initialized',
        message: 'Live session initialized successfully',
        sessionActive: liveService.isSessionActive(),
        audioEnabled: options.enableAudio || false
      }),
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Session initialization error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to initialize live session'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handler for closing live session
async function handleClose() {
  try {
    const liveService = getLiveService();
    liveService.closeSession();
    globalLiveService = null; // Reset global instance
    
    return new Response(
      JSON.stringify({
        status: 'closed',
        message: 'Live session closed successfully'
      }),
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Session close error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Error closing live session'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handler for voice input
async function handleVoiceInput(body: any) {
  try {
    const { audioData, mimeType } = body;
    
    if (!audioData) {
      return new Response(
        JSON.stringify({ error: 'Audio data is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const liveService = getLiveService();
    
    // Convert base64 audio data for processing
    const binaryData = Buffer.from(audioData, 'base64');
    // Note: Blob is not available in Node.js, but we can still process the data
    
    const result = await liveService.processVoiceInputBuffer(binaryData, mimeType || 'audio/wav');
    
    return new Response(
      JSON.stringify({
        status: 'processed',
        message: result
      }),
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Voice input error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Failed to process voice input'
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
