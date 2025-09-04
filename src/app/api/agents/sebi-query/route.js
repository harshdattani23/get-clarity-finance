import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';
import { logAgentQuery, getRequestMetadata } from '@/lib/agentLogger';
import { auth } from '@clerk/nextjs/server';
import { validateSebiQueryPayload } from '@/lib/agentValidation';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to perform database queries based on parsed intent
async function queryDatabase(intent) {
  const results = {
    data: [],
    count: 0,
    summary: '',
    query_type: intent.type
  };

  try {
    switch (intent.type) {
      case 'search_entity':
        // Search for specific entity by name or registration
        const searchTerm = intent.searchTerm?.toLowerCase() || '';
        results.data = await prisma.sEBIIntermediary.findMany({
          where: {
            OR: [
              { name: { contains: searchTerm, mode: 'insensitive' } },
              { registrationNumber: { contains: searchTerm, mode: 'insensitive' } },
              { email: { contains: searchTerm, mode: 'insensitive' } }
            ]
          },
          take: 10
        });
        results.count = results.data.length;
        break;

      case 'verify_registration':
        // Verify if entity is registered
        // First try exact match, then try partial match
        let verificationResult = null;
        
        if (intent.registrationNumber) {
          verificationResult = await prisma.sEBIIntermediary.findFirst({
            where: { registrationNumber: { equals: intent.registrationNumber, mode: 'insensitive' } }
          });
        }
        
        if (!verificationResult && intent.entityName) {
          // Try exact match first
          verificationResult = await prisma.sEBIIntermediary.findFirst({
            where: { name: { equals: intent.entityName, mode: 'insensitive' } }
          });
          
          // If no exact match, try contains
          if (!verificationResult) {
            verificationResult = await prisma.sEBIIntermediary.findFirst({
              where: { name: { contains: intent.entityName, mode: 'insensitive' } }
            });
          }
          
          // If still no match and we have a search term, try that too
          if (!verificationResult && intent.searchTerm) {
            const searchResults = await prisma.sEBIIntermediary.findMany({
              where: { name: { contains: intent.searchTerm, mode: 'insensitive' } },
              take: 5
            });
            if (searchResults.length > 0) {
              verificationResult = searchResults[0];
              results.alternativeMatches = searchResults.slice(1);
            }
          }
        }
        
        results.data = verificationResult;
        results.verified = !!verificationResult;
        results.searchedFor = intent.entityName || intent.searchTerm || intent.registrationNumber;
        break;

      case 'find_by_segment':
        // Find entities by segment/category
        results.data = await prisma.sEBIIntermediary.findMany({
          where: {
            segments: {
              has: intent.segment
            }
          },
          take: intent.limit || 20,
          orderBy: { name: 'asc' }
        });
        results.count = await prisma.sEBIIntermediary.count({
          where: {
            segments: {
              has: intent.segment
            }
          }
        });
        break;

      case 'multi_segment':
        // Find entities with multiple segments
        const allMultiSegment = await prisma.sEBIIntermediary.findMany({
          where: {
            segments: {
              hasSome: intent.segments || ['AIF', 'Equity Broker', 'Equity Derivative Broker']
            }
          },
          select: {
            id: true,
            name: true,
            registrationNumber: true,
            segments: true,
            email: true,
            phone: true
          }
        });
        
        // Filter for entities with multiple segments
        results.data = allMultiSegment.filter(entity => entity.segments.length > 1);
        results.count = results.data.length;
        
        if (intent.limit) {
          results.data = results.data.slice(0, intent.limit);
        }
        break;

      case 'statistics':
        // Get database statistics
        const total = await prisma.sEBIIntermediary.count();
        const byCategory = await prisma.sEBIIntermediary.groupBy({
          by: ['category'],
          _count: true
        });
        
        const allEntities = await prisma.sEBIIntermediary.findMany({
          select: { segments: true }
        });
        
        const segmentStats = {};
        allEntities.forEach(entity => {
          entity.segments.forEach(segment => {
            segmentStats[segment] = (segmentStats[segment] || 0) + 1;
          });
        });
        
        const multiSegmentCount = allEntities.filter(e => e.segments.length > 1).length;
        const withEmail = await prisma.sEBIIntermediary.count({
          where: { email: { not: null } }
        });
        
        results.data = {
          total,
          byCategory,
          bySegment: segmentStats,
          multiSegmentEntities: multiSegmentCount,
          entitiesWithEmail: withEmail
        };
        break;

      case 'similar_names':
        // Find entities with similar names
        const searchName = intent.searchTerm?.toLowerCase() || '';
        const allNames = await prisma.sEBIIntermediary.findMany({
          select: {
            id: true,
            name: true,
            registrationNumber: true,
            segments: true
          }
        });
        
        // Simple similarity check (contains search term)
        results.data = allNames.filter(entity => 
          entity.name.toLowerCase().includes(searchName)
        ).slice(0, 20);
        results.count = results.data.length;
        break;

      case 'contact_info':
        // Find entities with contact information
        results.data = await prisma.sEBIIntermediary.findMany({
          where: {
            AND: [
              { email: { not: null } },
              intent.segment ? { segments: { has: intent.segment } } : {}
            ]
          },
          select: {
            name: true,
            registrationNumber: true,
            email: true,
            phone: true,
            segments: true
          },
          take: intent.limit || 20
        });
        results.count = results.data.length;
        break;

      case 'recent_registrations':
        // This would need lastUpdated or validity dates
        results.data = await prisma.sEBIIntermediary.findMany({
          orderBy: { lastUpdated: 'desc' },
          take: intent.limit || 20
        });
        results.count = results.data.length;
        break;

      default:
        // General search fallback
        results.data = await prisma.sEBIIntermediary.findMany({
          take: 10,
          orderBy: { name: 'asc' }
        });
    }
  } catch (error) {
    console.error('Database query error:', error);
    results.error = error.message;
  }

  return results;
}

export async function POST(request) {
  const startTime = Date.now();
  let logEntry = null;
  
  try {
    const body = await request.json();
    const { question, context = {} } = body;

    const v = validateSebiQueryPayload(body);
    if (!v.valid) {
      return NextResponse.json({ error: v.error, code: 'INVALID_INPUT_NOT_CHAT' }, { status: 400 });
    }

    // Get request metadata and user info
    const { userAgent, ipAddress } = getRequestMetadata(request);
    const { userId } = await auth();
    const sessionId = request.headers.get('x-session-id') || null;

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL_NAME,
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    });

    // Parse the question to understand intent
    const intentPrompt = `
    Analyze this question about SEBI registered entities and extract the intent.
    Question: "${question}"
    
    IMPORTANT: If the question contains a URL (like play.google.com, apps.apple.com, website URL, etc.), 
    extract the company/app name from it. For example:
    - "com.dhan.live" or "Dhan" from a Play Store URL
    - Company name from website domain
    - App name from app store listings
    
    If you see URLs with app IDs like "com.dhan.live", extract "Dhan" as the entity name.
    If you see broker/trading related URLs, assume it's a verification request.
    
    Available segments in database: AIF, Equity Broker, Equity Derivative Broker
    
    Identify the query type and parameters. Return JSON only:
    {
      "type": "search_entity|verify_registration|find_by_segment|multi_segment|statistics|similar_names|contact_info|recent_registrations",
      "searchTerm": "entity name or partial name if searching",
      "registrationNumber": "registration number if mentioned",
      "entityName": "exact entity name if mentioned or extracted from URL",
      "segment": "single segment if looking for specific category",
      "segments": ["array of segments if looking for multiple"],
      "limit": number or null,
      "extractedInfo": "any additional context extracted from URLs or app IDs"
    }
    
    Examples:
    - "Is Zerodha registered?" -> type: "verify_registration", entityName: "Zerodha"
    - "https://play.google.com/store/apps/details?id=com.dhan.live" -> type: "verify_registration", entityName: "Dhan", searchTerm: "Dhan"
    - "Check this app: com.zerodha.kite" -> type: "verify_registration", entityName: "Zerodha", searchTerm: "Zerodha"
    - "Show me AIFs" -> type: "find_by_segment", segment: "AIF"
    - "Which entities operate in multiple segments?" -> type: "multi_segment"
    - "Find entities with Birla in name" -> type: "search_entity", searchTerm: "Birla"
    - "Database statistics" -> type: "statistics"
    `;

    const intentResult = await model.generateContent(intentPrompt);
    const intentText = intentResult.response.text();
    
    // Extract JSON from response
    let intent;
    try {
      const jsonMatch = intentText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        intent = JSON.parse(jsonMatch[0]);
      } else {
        intent = { type: 'search_entity', searchTerm: question.slice(0, 50) };
      }
    } catch (e) {
      console.error('Intent parsing error:', e);
      intent = { type: 'search_entity', searchTerm: question.slice(0, 50) };
    }

    // Query the database based on intent
    const queryResults = await queryDatabase(intent);

    // Generate natural language response using Gemini
    const responsePrompt = `
    User asked: "${question}"
    ${queryResults.searchedFor ? `Searched for: "${queryResults.searchedFor}"` : ''}
    
    Query type: ${queryResults.query_type}
    Database results: ${JSON.stringify(queryResults.data, null, 2).slice(0, 3000)}
    Result count: ${queryResults.count}
    ${queryResults.verified !== undefined ? `Verification status: ${queryResults.verified}` : ''}
    ${queryResults.alternativeMatches ? `Alternative matches found: ${queryResults.alternativeMatches.length}` : ''}
    
    Generate a helpful, well-formatted response following this EXACT structure:
    
    For VERIFICATION queries where entity IS FOUND:
    I analyzed the [Play Store/App Store/website] link you provided. (ONLY if URL was given)
    
    ✅ **[Entity Name] is registered with SEBI**
    
    **📋 Registration Details**
    • Registration Number: [number]
    • Entity Type: [Broker/AIF - capitalize properly]
    • Status: Active ✓
    
    **🏢 Authorized Segments**
    • [Segment 1]
    • [Segment 2]
    [Add more if applicable]
    
    **📅 Validity Period**
    • From: [date]
    • To: [date/Perpetual]
    
    [DO NOT add "Search Results: X found" for verification queries]
    
    For VERIFICATION queries where entity is NOT FOUND:
    I analyzed the [Play Store/App Store/website] link you provided. (ONLY if URL was given)
    
    ❌ **No SEBI Registration Found**
    
    I searched for "[entity name]" in the SEBI registry but could not find any matching registered entity.
    
    ⚠️ This entity does not appear in the official SEBI registered intermediaries database.
    
    For SEARCH queries (NOT verification):
    **🔍 Search Results: [X] entities found**
    
    Then list each result clearly with:
    • Entity Name
    • Registration: [number]
    • Segments: [list]
    
    For STATISTICS:
    **📊 SEBI Registry Statistics**
    
    • Total Registered Entities: [number]
    • By Category breakdown
    • Multi-segment operators
    
    IMPORTANT Rules:
    - For VERIFICATION: Never add "Search Results: X found" line
    - Use proper capitalization (Broker not broker)
    - Add subtle emojis for section headers
    - Keep response clean and professional
    - Only mention URL analysis if URL was actually provided
    - Be concise - no redundant information
    `;

    const responseResult = await model.generateContent(responsePrompt);
    const aiResponse = responseResult.response.text();

    // Prepare the final response
    const response = {
      answer: aiResponse,
      query_type: queryResults.query_type,
      data_count: queryResults.count || (Array.isArray(queryResults.data) ? queryResults.data.length : 1),
      has_data: queryResults.data && (Array.isArray(queryResults.data) ? queryResults.data.length > 0 : !!queryResults.data),
      intent: intent,
      raw_data: queryResults.data ? (Array.isArray(queryResults.data) ? queryResults.data.slice(0, 5) : queryResults.data) : null,
      timestamp: new Date().toISOString()
    };

    // Log successful query
    const executionTime = Date.now() - startTime;
    logEntry = await logAgentQuery({
      agentType: 'sebi-query',
      query: question,
      response: aiResponse,
      userAgent,
      ipAddress,
      userId,
      sessionId,
      success: true,
      metadata: {
        intent,
        query_type: queryResults.query_type,
        data_count: response.data_count,
        has_data: response.has_data,
        context
      },
      executionTime
    });

    // Add report ID to response if logging was successful
    if (logEntry) {
      response.reportId = logEntry.reportId;
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('SEBI Query Agent error:', error);
    
    // Log error query
    const executionTime = Date.now() - startTime;
    const { userAgent, ipAddress } = getRequestMetadata(request);
    
    try {
      const { question } = await request.json();
      const { userId } = await auth();
      
      await logAgentQuery({
        agentType: 'sebi-query',
        query: question || 'Unknown query',
        userAgent,
        ipAddress,
        userId,
        success: false,
        error: error.message,
        executionTime
      });
    } catch (logError) {
      console.error('Failed to log error query:', logError);
    }
    
    return NextResponse.json(
      {
        error: 'Failed to process query',
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET() {
  try {
    const stats = await prisma.sEBIIntermediary.count();
    
    return NextResponse.json({
      status: 'SEBI Query Agent is running',
      total_entities: stats,
      endpoints: {
        POST: '/api/agents/sebi-query',
        description: 'Ask complex questions about SEBI registered entities',
        example_questions: [
          "Is Zerodha registered with SEBI?",
          "Show me all Alternative Investment Funds",
          "Which entities operate in multiple segments?",
          "Find brokers with 'Capital' in their name",
          "How many registered entities are there?",
          "Show entities that are both equity and derivative brokers",
          "Find AIFs with email addresses"
        ]
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
