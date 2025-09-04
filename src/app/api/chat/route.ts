import { NextRequest, NextResponse } from 'next/server';
import GeminiChatService from '@/services/geminiChatService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, chatHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Check if Gemini API key is available
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { 
          error: 'Chat service temporarily unavailable',
          message: 'I apologize, but the chat service is currently unavailable. Please check back later or contact support if this issue persists.'
        },
        { status: 503 }
      );
    }

    // Initialize chat service
    const chatService = new GeminiChatService();

    // Let the AI handle all conversations naturally - it will stay in scope through system prompts

    // Process the message
    const response = await chatService.sendMessage(message, chatHistory);

    return NextResponse.json({
      success: true,
      message: response.message,
      sources: response.sources,
      confidence: response.confidence,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    // Return a user-friendly error message
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'I encountered an error while processing your request. Please try again, or rephrase your question about SEBI, BSE, NSE, CDSL, or NSDL.',
        confidence: 0.1
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check chat service status
export async function GET() {
  try {
    const hasGeminiKey = !!(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    if (!hasGeminiKey) {
      return NextResponse.json({
        status: 'unavailable',
        message: 'Chat service requires API configuration'
      }, { status: 503 });
    }

    const chatService = new GeminiChatService();
    const agentContexts = chatService.getAgentContexts();

    return NextResponse.json({
      status: 'available',
      model: 'gemini-2.5-flash',
      capabilities: {
        grounding: true,
        contextualResponses: true,
        sourceAttribution: true,
        scopeLimiting: true
      },
      supportedInstitutions: agentContexts.map(agent => ({
        code: agent.code,
        name: agent.name,
        description: agent.description
      })),
      features: [
        'Real-time responses about Indian capital market institutions',
        'Contextual conversation history',
        'Source attribution and confidence scoring',
        'Scope-limited responses to financial market topics',
        'Educational and regulatory information'
      ],
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat status check error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Unable to check service status'
    }, { status: 500 });
  }
}
