/**
 * Test script for news synthesis API
 * Run with: node test-news-synthesis.js
 */

const testCases = [
  { 
    name: 'General Market News',
    params: {
      maxItems: 3
    }
  },
  {
    name: 'SEBI/RBI Regulatory News',
    params: {
      sector: 'regulatory',
      maxItems: 3
    }
  },
  {
    name: 'Banking Sector News',
    params: {
      sector: 'banking',
      maxItems: 3
    }
  },
  {
    name: 'IT Sector News',
    params: {
      sector: 'it',
      maxItems: 3
    }
  },
  {
    name: 'Custom Query - IPO News',
    params: {
      query: 'Indian IPO listings NSE BSE',
      maxItems: 3
    }
  }
];

async function testNewsSynthesis() {
  console.log('Testing News Synthesis API\n');
  console.log('Note: This will use mock data if PERPLEXITY_API_KEY is not set\n');
  console.log('=' .repeat(60));

  for (const testCase of testCases) {
    console.log(`\n📰 Test: ${testCase.name}`);
    console.log('-'.repeat(40));
    
    try {
      const response = await fetch('http://localhost:3000/api/news/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.params)
      });

      if (!response.ok) {
        console.error(`❌ Failed: ${response.status} ${response.statusText}`);
        const error = await response.text();
        console.error('Error:', error);
        continue;
      }

      const data = await response.json();
      
      console.log(`✅ Success! Retrieved ${data.items.length} news items`);
      
      if (data.warnings && data.warnings.length > 0) {
        console.log(`⚠️  Warnings: ${data.warnings.join(', ')}`);
      }
      
      data.items.forEach((item, index) => {
        console.log(`\n  ${index + 1}. ${item.title}`);
        console.log(`     Sentiment: ${item.sentiment || 'neutral'}`);
        if (item.tickers && item.tickers.length > 0) {
          console.log(`     Tickers: ${item.tickers.join(', ')}`);
        }
        if (item.keyPoints && item.keyPoints.length > 0) {
          console.log(`     Key Points:`);
          item.keyPoints.forEach(point => {
            console.log(`       • ${point}`);
          });
        }
      });
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Testing complete!');
  console.log('\nTo test with real Perplexity API:');
  console.log('1. Add PERPLEXITY_API_KEY to your .env.local file');
  console.log('2. Restart your Next.js dev server');
  console.log('3. Run this test again');
}

// Check if running in Node.js environment
if (typeof window === 'undefined') {
  // Running in Node.js
  const fetch = require('node-fetch');
  global.fetch = fetch;
  
  console.log('Starting test in 2 seconds...');
  console.log('Make sure your Next.js dev server is running on http://localhost:3000');
  
  setTimeout(() => {
    testNewsSynthesis().catch(console.error);
  }, 2000);
} else {
  // Running in browser
  testNewsSynthesis().catch(console.error);
}
