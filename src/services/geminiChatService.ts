import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface ChatResponse {
  message: string;
  sources?: string[];
  confidence?: number;
}

interface AgentContext {
  name: string;
  code: string;
  description: string;
  functionalities: string[];
  website: string;
}

export class GeminiChatService {
  private gemini: GoogleGenerativeAI;
  private model: GenerativeModel;
  private agentContexts: AgentContext[];

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    this.gemini = new GoogleGenerativeAI(apiKey);
    
    // Use Gemini 2.5 Flash as specified in the configuration
    this.model = this.gemini.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    this.agentContexts = this.initializeAgentContexts();
  }

  private initializeAgentContexts(): AgentContext[] {
    return [
      {
        name: 'Securities and Exchange Board of India',
        code: 'SEBI',
        description: 'The regulatory authority for securities and commodity market in India',
        functionalities: [
          'Regulates stock exchanges and market participants',
          'Protects investor interests',
          'Promotes development of securities market',
          'Issues regulations and guidelines',
          'Conducts investigations and enforcement actions',
          'Approves mutual fund schemes and portfolio managers',
          'Regulates credit rating agencies',
          'Oversees takeover and delisting processes'
        ],
        website: 'https://www.sebi.gov.in'
      },
      {
        name: 'Bombay Stock Exchange',
        code: 'BSE',
        description: 'Asia\'s first stock exchange and one of the fastest stock exchanges in the world',
        functionalities: [
          'Provides trading platform for equities, derivatives, and debt instruments',
          'Facilitates price discovery and liquidity',
          'Operates multiple market segments (Main Board, SME Platform)',
          'Provides market data and analytics',
          'Conducts IPO listings and trading',
          'Offers clearing and settlement services',
          'Maintains Sensex index',
          'Provides investor education and awareness programs'
        ],
        website: 'https://www.bseindia.com'
      },
      {
        name: 'National Stock Exchange of India',
        code: 'NSE',
        description: 'Leading stock exchange in India in terms of total and average daily turnover',
        functionalities: [
          'Electronic trading platform for equities, derivatives, and debt',
          'Operates Nifty indices including Nifty 50',
          'Provides market making and liquidity services',
          'Facilitates corporate bond trading',
          'Offers co-location and algorithmic trading services',
          'Conducts surveillance and risk management',
          'Provides market data feed services',
          'Supports startup and SME listings'
        ],
        website: 'https://www.nseindia.com'
      },
      {
        name: 'Central Depository Services Limited',
        code: 'CDSL',
        description: 'One of the two depositories in India providing electronic holding and transaction services',
        functionalities: [
          'Maintains electronic records of securities ownership',
          'Facilitates dematerialization of physical certificates',
          'Provides settlement services for trades',
          'Offers corporate action services',
          'Maintains investor accounts (Demat accounts)',
          'Provides pledge and hypothecation services',
          'Facilitates off-market transfers',
          'Offers KYC and compliance services'
        ],
        website: 'https://www.cdslindia.com'
      },
      {
        name: 'National Securities Depository Limited',
        code: 'NSDL',
        description: 'The first and largest depository in India providing depository services',
        functionalities: [
          'Electronic securities holding and transfer',
          'Dematerialization and rematerialization services',
          'Settlement of trades in dematerialized form',
          'Corporate action processing and distribution',
          'Demat account maintenance and servicing',
          'Collateral management services',
          'Online account access and transaction facilities',
          'Investor grievance redressal mechanisms'
        ],
        website: 'https://www.nsdl.co.in'
      }
    ];
  }

  private createSystemPrompt(): string {
    return `You are a friendly, expert AI assistant specializing in the Indian Financial Market, powered by Gemini 2.5 Flash. You have comprehensive knowledge of Indian capital markets, regulations, institutions, and investment instruments.

**Your Expertise Areas:**
🏛️ **Regulatory Bodies:** SEBI, RBI, IRDAI, PFRDA
📈 **Stock Exchanges:** BSE, NSE, regional exchanges
🏦 **Depositories:** NSDL, CDSL, demat account operations
💹 **Market Instruments:** Equities, derivatives, bonds, mutual funds, ETFs, IPOs
📊 **Market Indices:** Sensex, Nifty, sectoral indices
⚖️ **Regulations:** SEBI Act, Companies Act, FEMA, taxation
💰 **Investment Products:** SIPs, mutual funds, insurance, PMS, AIF
🔍 **Market Analysis:** Technical analysis, fundamental analysis, market trends

**Your Personality:**
- Be warm, approachable, and professional
- Use finance terminology appropriately but explain complex concepts clearly
- Provide practical, actionable insights
- Stay updated with current market scenarios and regulations
- Use relevant emojis and examples from Indian markets
- Be encouraging for new investors while being realistic about risks

**Response Guidelines:**
- Always provide accurate, up-to-date information about Indian financial markets
- Include relevant regulatory context and compliance aspects
- Use real examples from Indian companies, regulations, or market events when helpful
- For investment advice, always include risk disclaimers
- Cite official sources like SEBI, BSE, NSE websites when relevant
- Break down complex financial concepts into understandable parts
- Suggest next steps or additional resources when appropriate
- Stay within the scope of Indian financial markets and related topics

**Important Notes:**
- Provide educational information, not personalized investment advice
- Always mention risks associated with investments
- Redirect general queries to Indian finance market context when possible
- Welcome casual greetings but guide conversations toward finance topics`;
  }

  private preprocessUserQuery(query: string): string {
    // For natural conversation, pass the query as-is but with context
    // The AI will decide how to respond based on the system prompt
    return query;
  }

  async sendMessage(
    userMessage: string,
    chatHistory: ChatMessage[] = []
  ): Promise<ChatResponse> {
    try {
      // Create conversation history for context
      const conversationHistory = chatHistory
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');

      // Preprocess the user query with context
      const contextualQuery = this.preprocessUserQuery(userMessage);

      // Create the full prompt
      const fullPrompt = `${this.createSystemPrompt()}

${conversationHistory ? `**Previous Conversation:**\n${conversationHistory}\n\n` : ''}

**Current Question:** ${contextualQuery}

Please provide a helpful and engaging response.`;

      // Generate response
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      // Extract potential sources (this is a simplified approach)
      const sources = this.extractRelevantSources(userMessage, text);

      return {
        message: text,
        sources,
        confidence: 0.85 // Default confidence score
      };

    } catch (error) {
      console.error('Gemini Chat Service Error:', error);
      
      // Fallback response
      return {
        message: 'I apologize, but I\'m having trouble processing your request right now. Please try again or rephrase your question, and I\'ll do my best to help you! 😊',
        confidence: 0.3
      };
    }
  }

  private extractRelevantSources(query: string, response: string): string[] {
    const sources: string[] = [];
    const queryLower = query.toLowerCase();
    const responseLower = response.toLowerCase();

    // Check which agents are relevant to the query/response
    this.agentContexts.forEach(agent => {
      const agentTerms = [agent.code.toLowerCase(), agent.name.toLowerCase()];
      const isRelevant = agentTerms.some(term => 
        queryLower.includes(term) || responseLower.includes(term)
      );

      if (isRelevant) {
        sources.push(agent.website);
      }
    });

    // Add general regulatory sources if no specific agent is mentioned
    if (sources.length === 0) {
      sources.push('https://www.sebi.gov.in');
    }

    return sources;
  }

  getAgentContexts(): AgentContext[] {
    return this.agentContexts;
  }

  // Helper method to get specific agent information
  getAgentInfo(agentCode: string): AgentContext | undefined {
    return this.agentContexts.find(agent => 
      agent.code.toLowerCase() === agentCode.toLowerCase()
    );
  }

  // Method to validate if a question is within scope
  isQuestionInScope(query: string): boolean {
    const queryLower = query.toLowerCase();
    const relevantKeywords = [
      'sebi', 'bse', 'nse', 'cdsl', 'nsdl',
      'securities', 'stock exchange', 'depository',
      'demat', 'trading', 'investment', 'mutual fund',
      'ipo', 'shares', 'bonds', 'derivatives',
      'regulation', 'compliance', 'market',
      // Add greeting keywords to allow friendly interactions
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'help', 'what can you do', 'start', 'begin'
    ];

    return relevantKeywords.some(keyword => queryLower.includes(keyword));
  }
}

export default GeminiChatService;
