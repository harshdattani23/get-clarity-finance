import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const autoContentApiKey = process.env.AUTOCONTENT_API_KEY;
    
    if (!autoContentApiKey) {
      return NextResponse.json({
        success: false,
        error: 'AutoContent API key not configured'
      }, { status: 500 });
    }

    console.log('Testing AutoContent API connectivity...');
    
    // Test basic connectivity with a simple request
    const axiosResponse = await axios.post('https://api.autocontentapi.com/Content/Create', {
      resources: [{
        type: 'text',
        content: 'Test connectivity'
      }],
      outputType: 'audio',
      text: 'Test',
      duration: 'short',
      language: 'English'
    }, {
      headers: {
        'Authorization': `Bearer ${autoContentApiKey}`,
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
      timeout: 15000 // 15 second timeout
    });
    
    const testResponse = {
      ok: axiosResponse.status >= 200 && axiosResponse.status < 300,
      status: axiosResponse.status,
      headers: new Map(Object.entries(axiosResponse.headers)),
      text: async () => JSON.stringify(axiosResponse.data)
    };

    console.log('AutoContent API test response status:', testResponse.status);
    
    const responseText = await testResponse.text();
    console.log('AutoContent API test response:', responseText.substring(0, 200));

    return NextResponse.json({
      success: testResponse.ok,
      status: testResponse.status,
      apiReachable: true,
      responsePreview: responseText.substring(0, 200),
      headers: Object.fromEntries(testResponse.headers),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AutoContent API test error:', error);
    
    let errorType = 'unknown';
    let errorMessage = 'Unknown error';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message.includes('timeout')) {
        errorType = 'timeout';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorType = 'network';
      } else if (error.message.includes('DNS') || error.message.includes('ENOTFOUND')) {
        errorType = 'dns';
      }
    }
    
    return NextResponse.json({
      success: false,
      apiReachable: false,
      errorType,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      suggestions: {
        timeout: 'API is slow or overloaded. Try again later.',
        network: 'Check internet connection and firewall settings.',
        dns: 'DNS resolution failed. Check internet connection.',
        unknown: 'Unknown connectivity issue. Check API status.'
      }
    });
  }
}
