import {
  GoogleGenAI,
  LiveServerMessage,
  MediaResolution,
  Modality,
  Session,
} from '@google/genai';
import mime from 'mime';
import { writeFile } from 'fs/promises';

interface StreamingMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
  confidence?: number;
  audioData?: string;
}

interface StreamingChatOptions {
  temperature?: number;
  maxOutputTokens?: number;
  enableVoice?: boolean;
  enableAudio?: boolean;
}

interface WavConversionOptions {
  numChannels: number;
  sampleRate: number;
  bitsPerSample: number;
}

export class GeminiLiveService {
  private ai: GoogleGenAI;
  private session: Session | undefined = undefined;
  private isStreaming: boolean = false;
  private responseQueue: LiveServerMessage[] = [];
  private audioParts: string[] = [];

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured. Live chat will not work.');
      throw new Error('GEMINI_API_KEY environment variable is required for live chat functionality');
    }

    if (apiKey.length < 30) {
      console.warn('GEMINI_API_KEY seems too short. Please verify the key is correct.');
    }

    try {
      this.ai = new GoogleGenAI({
        apiKey: apiKey,
      });
      console.log('GeminiLiveService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Google Generative AI:', error);
      throw new Error(`Failed to initialize Gemini AI service: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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

  async initializeLiveSession(options: StreamingChatOptions = {}): Promise<void> {
    try {
      console.log('Initializing live session with options:', options);
      
      // For now, let's simulate a session without actual live connection
      // to test the UI functionality first
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: simulating live session');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate connection delay
        this.session = { 
          close: () => console.log('Mock session closed'),
          sendClientContent: (content: any) => console.log('Mock send:', content)
        } as any;
        console.log('Mock live session initialized');
        return;
      }
      
      // Try native audio model first, fallback to regular model
      const model = options.enableAudio ? 
        'models/gemini-2.5-flash-preview-native-audio-dialog' : 
        'models/gemini-2.5-flash';
      
      const config = {
        responseModalities: options.enableAudio ? [Modality.AUDIO, Modality.TEXT] : [Modality.TEXT],
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
        speechConfig: options.enableAudio ? {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Zephyr',
            }
          }
        } : undefined,
        contextWindowCompression: {
          triggerTokens: '25600',
          slidingWindow: { targetTokens: '12800' },
        },
        systemInstruction: {
          parts: [{
            text: this.createLiveSystemPrompt(),
          }]
        },
      };

      console.log('Live session config:', config);
      
      this.session = await this.ai.live.connect({
        model,
        callbacks: {
          onopen: () => {
            console.log('Live session opened successfully');
          },
          onmessage: (message: LiveServerMessage) => {
            console.log('Received message:', message);
            this.responseQueue.push(message);
          },
          onerror: (e: ErrorEvent) => {
            console.error('Live session error:', e);
          },
          onclose: (e: CloseEvent) => {
            console.log('Live session closed:', e.reason);
          },
        },
        config
      });
      
      console.log('Live session initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize live session:', error);
      throw error;
    }
  }

  async sendLiveMessage(message: string): Promise<void> {
    if (!this.session) {
      throw new Error('Live session not initialized');
    }

    this.session.sendClientContent({
      turns: [message]
    });
  }

  private async waitMessage(): Promise<LiveServerMessage> {
    let done = false;
    let message: LiveServerMessage | undefined = undefined;
    
    while (!done) {
      message = this.responseQueue.shift();
      if (message) {
        done = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    
    return message!;
  }

  private async handleTurn(): Promise<LiveServerMessage[]> {
    const turn: LiveServerMessage[] = [];
    let done = false;
    
    while (!done) {
      const message = await this.waitMessage();
      turn.push(message);
      this.handleModelTurn(message);
      
      if (message.serverContent && message.serverContent.turnComplete) {
        done = true;
      }
    }
    
    return turn;
  }

  private handleModelTurn(message: LiveServerMessage) {
    if (message.serverContent?.modelTurn?.parts) {
      const part = message.serverContent?.modelTurn?.parts?.[0];

      if (part?.fileData) {
        console.log(`File: ${part?.fileData.fileUri}`);
      }

      if (part?.inlineData) {
        const fileName = `audio-${Date.now()}.wav`;
        const inlineData = part?.inlineData;

        this.audioParts.push(inlineData?.data ?? '');

        const buffer = this.convertToWav(this.audioParts, inlineData.mimeType ?? '');
        this.saveBinaryFile(fileName, buffer);
      }

      if (part?.text) {
        console.log('Received text:', part?.text);
      }
    }
  }

  private async saveBinaryFile(fileName: string, content: Buffer) {
    try {
      await writeFile(fileName, content);
      console.log(`Saved audio content to file ${fileName}`);
    } catch (err) {
      console.error(`Error writing file ${fileName}:`, err);
    }
  }

  private convertToWav(rawData: string[], mimeType: string): Buffer {
    const options = this.parseMimeType(mimeType);
    const dataLength = rawData.reduce((a, b) => a + b.length, 0);
    const wavHeader = this.createWavHeader(dataLength, options);
    const buffer = Buffer.concat(rawData.map(data => Buffer.from(data, 'base64')));

    return Buffer.concat([wavHeader, buffer]);
  }

  private parseMimeType(mimeType: string): WavConversionOptions {
    const [fileType, ...params] = mimeType.split(';').map(s => s.trim());
    const [_, format] = fileType.split('/');

    const options: Partial<WavConversionOptions> = {
      numChannels: 1,
      bitsPerSample: 16,
    };

    if (format && format.startsWith('L')) {
      const bits = parseInt(format.slice(1), 10);
      if (!isNaN(bits)) {
        options.bitsPerSample = bits;
      }
    }

    for (const param of params) {
      const [key, value] = param.split('=').map(s => s.trim());
      if (key === 'rate') {
        options.sampleRate = parseInt(value, 10);
      }
    }

    return options as WavConversionOptions;
  }

  private createWavHeader(dataLength: number, options: WavConversionOptions): Buffer {
    const {
      numChannels,
      sampleRate,
      bitsPerSample,
    } = options;

    // WAV format specification: http://soundfile.sapp.org/doc/WaveFormat
    const byteRate = sampleRate * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const buffer = Buffer.alloc(44);

    buffer.write('RIFF', 0);                      // ChunkID
    buffer.writeUInt32LE(36 + dataLength, 4);     // ChunkSize
    buffer.write('WAVE', 8);                      // Format
    buffer.write('fmt ', 12);                     // Subchunk1ID
    buffer.writeUInt32LE(16, 16);                 // Subchunk1Size (PCM)
    buffer.writeUInt16LE(1, 20);                  // AudioFormat (1 = PCM)
    buffer.writeUInt16LE(numChannels, 22);        // NumChannels
    buffer.writeUInt32LE(sampleRate, 24);         // SampleRate
    buffer.writeUInt32LE(byteRate, 28);           // ByteRate
    buffer.writeUInt16LE(blockAlign, 32);         // BlockAlign
    buffer.writeUInt16LE(bitsPerSample, 34);      // BitsPerSample
    buffer.write('data', 36);                     // Subchunk2ID
    buffer.writeUInt32LE(dataLength, 40);         // Subchunk2Size

    return buffer;
  }

  async *streamLiveResponse(
    message: string,
    chatHistory: StreamingMessage[] = [],
    options: StreamingChatOptions = {}
  ): AsyncGenerator<{type: string, content?: string, audioData?: string, fullContent?: string}, void, unknown> {
    try {
      this.isStreaming = true;

      // Initialize live session if not already done
      if (!this.session) {
        await this.initializeLiveSession(options);
      }

      // Send the message to the live session
      await this.sendLiveMessage(message);

      // Handle the response
      const turn = await this.handleTurn();
      
      let fullResponse = '';
      let audioData = '';
      
      for (const msg of turn) {
        if (msg.serverContent?.modelTurn?.parts) {
          for (const part of msg.serverContent.modelTurn.parts) {
            if (part?.text) {
              fullResponse += part.text;
              yield {
                type: 'text_chunk',
                content: part.text,
                fullContent: fullResponse
              };
            }
            
            if (part?.inlineData && part.inlineData.mimeType?.includes('audio')) {
              audioData = part.inlineData.data || '';
              yield {
                type: 'audio_chunk',
                audioData: audioData,
                fullContent: fullResponse
              };
            }
          }
        }
      }
      
      // Yield completion
      yield {
        type: 'completion',
        fullContent: fullResponse,
        audioData: audioData
      };

    } catch (error) {
      console.error('Gemini Live Streaming Error:', error);
      yield {
        type: 'error',
        content: 'I apologize, but I encountered an error while processing your request. Please try again. If you have an urgent fraud-related concern, contact SEBI immediately at 1800-266-7575.'
      };
    } finally {
      this.isStreaming = false;
    }
  }

  // Legacy method for backward compatibility
  async *streamResponse(
    message: string,
    chatHistory: StreamingMessage[] = [],
    options: StreamingChatOptions = {}
  ): AsyncGenerator<string, void, unknown> {
    const generator = this.streamLiveResponse(message, chatHistory, options);
    
    for await (const chunk of generator) {
      if (chunk.type === 'text_chunk' && chunk.content) {
        yield chunk.content;
      } else if (chunk.type === 'error' && chunk.content) {
        yield chunk.content;
      }
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
    if (this.session) {
      this.session.close();
      this.session = undefined;
    }
  }

  closeSession(): void {
    if (this.session) {
      this.session.close();
      this.session = undefined;
    }
    this.responseQueue = [];
    this.audioParts = [];
    console.log('Session closed and cleaned up');
  }

  isSessionActive(): boolean {
    return this.session !== undefined;
  }

  // Voice-to-text integration for live audio input (Browser)
  async processVoiceInput(audioBlob: Blob): Promise<string> {
    // This would integrate with the live session for real-time audio processing
    if (!this.session) {
      throw new Error('Live session not initialized');
    }
    
    // Convert blob to base64 for transmission
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    
    // Send audio data to live session
    this.session.sendClientContent({
      turns: [{
        inlineData: {
          mimeType: audioBlob.type,
          data: base64Audio
        }
      }]
    });
    
    return "Voice input sent to live session";
  };

  // Voice-to-text integration for live audio input (Node.js)
  async processVoiceInputBuffer(audioBuffer: Buffer, mimeType: string): Promise<string> {
    // This would integrate with the live session for real-time audio processing
    if (!this.session) {
      throw new Error('Live session not initialized');
    }
    
    // Convert buffer to base64 for transmission
    const base64Audio = audioBuffer.toString('base64');
    
    // Send audio data to live session
    this.session.sendClientContent({
      turns: [{
        inlineData: {
          mimeType: mimeType,
          data: base64Audio
        }
      }]
    });
    
    return "Voice input sent to live session";
  };

  // Enhanced text-to-speech with native audio from live session
  async speakResponse(text: string): Promise<void> {
    // Use Web Speech API as fallback if no native audio available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  }

  // Get audio data from the session
  getLatestAudioData(): string[] {
    return this.audioParts;
  }

  // Clear audio data buffer
  clearAudioData(): void {
    this.audioParts = [];
  }
}

export default GeminiLiveService;
