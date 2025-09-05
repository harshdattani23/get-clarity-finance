const https = require('https');

// Function to make API request
async function getStockInfo(ticker) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ ticker });
    
    const options = {
      hostname: 'yahoo-finance-api-124311910782.us-central1.run.app',
      path: '/api/stock-info',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          console.log(`Full response for ${ticker}:`, JSON.stringify(response, null, 2));
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response.data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${response.message || body}`));
          }
        } catch (error) {
          console.error(`Parse error for ${ticker}:`, error.message);
          console.error('Raw response:', body);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testBonds() {
  console.log('Testing Bond Availability on Yahoo Finance API\n');
  
  // Test well-known tickers first
  const testTickers = [
    // Known Indian stocks (should work)
    'RELIANCE.NS',
    'TCS.NS',
    
    // Government securities - different formats
    'IN0020070036',  // GOI bond ISIN
    'CG2026',        // GOI bond symbol from CSV
    'IRFC27',        // IRFC bond
    'REC26',         // REC bond
    'BOI',           // Bank of India
    'NTPC',          // NTPC
    
    // Try with exchange suffixes
    'IRFC.NS',
    'REC.NS',
    'NTPC.NS',
  ];
  
  for (const ticker of testTickers) {
    console.log(`\n--- Testing: ${ticker} ---`);
    try {
      const data = await getStockInfo(ticker);
      console.log(`✅ Success for ${ticker}!`);
      
      if (data) {
        console.log('Key fields:');
        console.log('  Name:', data.longName || data.shortName || 'N/A');
        console.log('  Price:', data.currentPrice || data.regularMarketPrice || 'N/A');
        console.log('  Currency:', data.currency || 'N/A');
        console.log('  Exchange:', data.exchange || 'N/A');
      }
      
    } catch (error) {
      console.log(`❌ Failed for ${ticker}: ${error.message}`);
    }
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testBonds().catch(console.error);
