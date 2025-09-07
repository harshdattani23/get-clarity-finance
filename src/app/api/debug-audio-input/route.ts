import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('=== DEBUG AUDIO CREATION INPUT ===');
    
    // Get the latest English content (what would be sent to audio creation)
    const podcastUrl = `${request.nextUrl.origin}/api/market-podcast?lang=en`;
    console.log('Fetching English content from:', podcastUrl);
    
    const response = await fetch(podcastUrl);
    const data = await response.json();
    
    console.log('Market Podcast API Status:', response.status);
    console.log('Has Episodes:', !!data.episodes);
    console.log('Episodes Count:', data.episodes?.length || 0);
    
    let audioCreationInput = null;
    
    if (data.episodes && data.episodes.length > 0) {
      const episode = data.episodes[0];
      
      console.log('=== EPISODE FOR AUDIO CREATION ===');
      console.log('Title:', episode.title);
      console.log('Summary:', episode.summary?.substring(0, 100) + '...');
      console.log('Key Points Count:', episode.keyPoints?.length || 0);
      console.log('Key Points Sample:', episode.keyPoints?.slice(0, 3) || []);
      console.log('Sources Count:', episode.sources?.length || 0);
      console.log('Market Summary:', data.marketSummary?.substring(0, 100) + '...');
      
      // This is what gets sent to the AutoContent API
      audioCreationInput = {
        resources: [
          {
            type: 'text',
            content: `Title: ${episode.title}

Summary: ${episode.summary}

Key Points:
${episode.keyPoints?.map((point: string, index: number) => `${index + 1}. ${point}`).join('\\n') || 'No key points'}

Market Summary: ${data.marketSummary}`
          }
        ],
        text: `Create an engaging and professional podcast episode discussing today's key regulatory developments in Indian financial markets. 

Focus on:
- SEBI (Securities and Exchange Board of India) updates
- RBI (Reserve Bank of India) policy changes
- Important compliance and regulatory changes
- Make it informative yet accessible for investors and financial professionals
- Use a conversational tone suitable for a daily regulatory news podcast
- Include explanations of technical regulatory terms
- Emphasize the practical impact of these changes on investors and market participants

Generate the podcast in English language.

Title the episode: "${episode.title}"`,
        duration: 'default',
        language: 'English'
      };
      
      console.log('=== AUDIO CREATION PAYLOAD ===');
      console.log('Resources Count:', audioCreationInput.resources.length);
      console.log('Text Content Length:', audioCreationInput.resources[0].content.length);
      console.log('Instructions Length:', audioCreationInput.text.length);
    }
    
    return NextResponse.json({
      success: true,
      englishContentAvailable: !!data.episodes?.[0],
      episodeData: data.episodes?.[0] ? {
        title: data.episodes[0].title,
        summary: data.episodes[0].summary?.substring(0, 200) + '...',
        keyPointsCount: data.episodes[0].keyPoints?.length || 0,
        keyPointsFull: data.episodes[0].keyPoints || [],
        sourcesCount: data.episodes[0].sources?.length || 0,
        marketSummary: data.marketSummary?.substring(0, 200) + '...',
        fromDatabase: data.fromDatabase
      } : null,
      audioCreationPayload: audioCreationInput,
      rawContentLength: audioCreationInput?.resources?.[0]?.content?.length || 0,
      instructionsLength: audioCreationInput?.text?.length || 0
    });
    
  } catch (error) {
    console.error('Debug audio input error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
