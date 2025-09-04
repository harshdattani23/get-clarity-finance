import { NextRequest, NextResponse } from 'next/server';
import GeminiChatService from '@/services/geminiChatService';

export async function GET() {
  try {
    // Initialize chat service to get agent contexts
    const chatService = new GeminiChatService();
    const agentContexts = chatService.getAgentContexts();

    return NextResponse.json({
      success: true,
      contexts: agentContexts,
      count: agentContexts.length,
      description: 'Financial market institutions and their functionalities in India',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Contexts API Error:', error);

    return NextResponse.json(
      { 
        error: 'Failed to retrieve agent contexts',
        contexts: [],
        count: 0
      },
      { status: 500 }
    );
  }
}

// POST endpoint to get specific agent information
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentCode } = body;

    if (!agentCode || typeof agentCode !== 'string') {
      return NextResponse.json(
        { error: 'Agent code is required and must be a string' },
        { status: 400 }
      );
    }

    const chatService = new GeminiChatService();
    const agentInfo = chatService.getAgentInfo(agentCode);

    if (!agentInfo) {
      return NextResponse.json(
        { 
          error: 'Agent not found',
          availableAgents: ['SEBI', 'BSE', 'NSE', 'CDSL', 'NSDL']
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      agent: agentInfo,
      scope: 'Indian capital markets and regulatory framework'
    });

  } catch (error) {
    console.error('Agent info API Error:', error);

    return NextResponse.json(
      { error: 'Failed to retrieve agent information' },
      { status: 500 }
    );
  }
}
