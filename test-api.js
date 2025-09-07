const fetch = require('node-fetch');

async function testMarketPodcastAPI() {
  try {
    console.log('Testing market-podcast API...');
    
    const response = await fetch('http://localhost:3001/api/market-podcast?lang=en&refresh=true');
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Success! Data keys:', Object.keys(data));
      console.log('Episodes count:', data.episodes?.length || 0);
      console.log('Market summary:', data.marketSummary?.substring(0, 100) + '...');
      
      if (data.episodes?.[0]) {
        const episode = data.episodes[0];
        console.log('First episode key points:', episode.keyPoints?.length || 0);
        console.log('First episode sources:', episode.sources?.length || 0);
      }
    } else {
      const errorText = await response.text();
      console.error('Error response:', errorText);
    }
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

testMarketPodcastAPI();
