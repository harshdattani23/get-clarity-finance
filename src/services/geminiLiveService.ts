import { GoogleGenerativeAI } from '@google/generative-ai';

interface StreamingMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  confidence?: number;
}

interface StreamingChatOptions {
  temperature?: number;
  maxOutputTokens?: number;
  enableVoice?: boolean;
}

export class GeminiLiveService {
  private gemini: GoogleGenerativeAI;
  private model: any;
  private isStreaming: boolean = false;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    this.gemini = new GoogleGenerativeAI(apiKey);
    this.model = this.gemini.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });
  }

  private createLiveSystemPrompt(): string {
    return `You are a live, real-time AI assistant specializing in Indian Financial Markets and fraud detection, powered by Gemini Live. You provide instant, streaming responses to help users with:

🚨 **FRAUD DETECTION & PREVENTION:**
- Real-time analysis of suspicious investment schemes
- Identifying fake trading platforms and apps
- Detecting Ponzi schemes and pyramid schemes
- Warning about unauthorized investment advisors
- Recognizing phishing attempts and social engineering
- Alerting about fake IPOs and investment opportunities

🏛️ **REGULATORY GUIDANCE:**
- SEBI regulations and compliance requirements
- Authorized vs unauthorized financial entities
- Investor protection measures and grievance redressal
- Market manipulation detection and reporting

📈 **MARKET INTELLIGENCE:**
- Real-time market analysis and trends
- Stock exchanges (BSE, NSE) operations
- Investment product verification
- Due diligence guidance for investments

**LIVE INTERACTION GUIDELINES:**
- Provide immediate, concise responses for urgent fraud alerts
- Use clear, actionable language for fraud warnings
- Stream responses smoothly for complex explanations
- Prioritize user safety and financial security
- Include specific steps users should take immediately
- Reference official SEBI warnings and alerts when relevant

**RESPONSE STYLE:**
- Be conversational and engaging for live interaction
- Use appropriate urgency levels (🚨 for immediate threats)
- Provide step-by-step guidance in real-time
- Keep technical explanations simple but accurate
- Encourage immediate action for fraud prevention

**FRAUD ALERT PRIORITIES:**
1. Immediate financial safety concerns
2. Identity theft prevention
3. Investment verification
4. Regulatory compliance
5. Educational guidance

Remember: You're providing real-time assistance, so be direct, helpful, and focused on user protection.`;
  }

  async *streamResponse(
    message: string,
    chatHistory: StreamingMessage[] = [],
    options: StreamingChatOptions = {}
  ): AsyncGenerator<string, void, unknown> {
    try {
      this.isStreaming = true;

      // Create conversation context
      const conversationHistory = chatHistory
        .slice(-8) // Keep last 8 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      const fullPrompt = `${this.createLiveSystemPrompt()}

${conversationHistory ? `**Live Conversation History:**\n${conversationHistory}\n\n` : ''}

**Current User Message:** ${message}

Please provide a helpful, real-time streaming response. If this is related to fraud detection or financial safety, prioritize urgent guidance.`;

      // Use streaming generation
      const result = await this.model.generateContentStream(fullPrompt);
      
      let fullText = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullText += chunkText;
        yield chunkText;
      }

    } catch (error) {
      console.error('Gemini Live Streaming Error:', error);
      yield 'I apologize, but I encountered an error while processing your request. Please try again. If you have an urgent fraud-related concern, contact SEBI immediately at 1800-266-7575.';
    } finally {
      this.isStreaming = false;
    }
  }

  async detectFraudUrgency(message: string): Promise<{
    isUrgent: boolean;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    suggestedAction: string;
  }> {
    const urgentKeywords = [
      'lost money', 'scam', 'fraud', 'fake platform', 'unauthorized',
      'ponzi', 'pyramid', 'quick money', 'guaranteed returns',
      'pressure to invest', 'asked for otp', 'suspicious call',
      'fake broker', 'unregistered', 'threatening'
    ];

    const criticalKeywords = [
      'transferred money', 'gave bank details', 'shared otp',
      'invested life savings', 'borrowed to invest', 'urgent payment'
    ];

    const messageLower = message.toLowerCase();
    
    const hasCritical = criticalKeywords.some(keyword => messageLower.includes(keyword));
    const hasUrgent = urgentKeywords.some(keyword => messageLower.includes(keyword));

    if (hasCritical) {
      return {
        isUrgent: true,
        riskLevel: 'critical',
        suggestedAction: 'IMMEDIATE ACTION REQUIRED: Contact your bank, file FIR, and report to SEBI'
      };
    } else if (hasUrgent) {
      return {
        isUrgent: true,
        riskLevel: 'high',
        suggestedAction: 'Verify the entity with SEBI database and stop any ongoing transactions'
      };
    } else if (messageLower.includes('investment') || messageLower.includes('trading')) {
      return {
        isUrgent: false,
        riskLevel: 'medium',
        suggestedAction: 'Always verify before investing - check SEBI registered entities'
      };
    }

    return {
      isUrgent: false,
      riskLevel: 'low',
      suggestedAction: 'Continue with general investment education and awareness'
    };
  }

  getStreamingStatus(): boolean {
    return this.isStreaming;
  }

  stopStreaming(): void {
    this.isStreaming = false;
  }

  // Voice-to-text integration (placeholder for future voice feature)
  async processVoiceInput(audioBlob: Blob): Promise<string> {
    // This would integrate with Web Speech API or Google Speech-to-Text
    // For now, return placeholder
    return "Voice input processing will be implemented in the next phase";
  }

  // Text-to-speech for responses (placeholder for future voice feature)
  async speakResponse(text: string): Promise<void> {
    // This would use Web Speech API's speechSynthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  }
}

export default GeminiLiveService;
