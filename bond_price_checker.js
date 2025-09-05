const fs = require('fs');
const https = require('https');

// Yahoo Finance API endpoint
const API_BASE_URL = 'https://yahoo-finance-api-124311910782.us-central1.run.app';

// Function to make API request
async function makeApiRequest(endpoint, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'yahoo-finance-api-124311910782.us-central1.run.app',
      path: endpoint,
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
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${response.message || body}`));
          }
        } catch (error) {
          reject(new Error(`Parse error: ${error.message}. Response: ${body}`));
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

// Function to get stock info
async function getStockInfo(ticker) {
  try {
    const response = await makeApiRequest('/api/stock-info', { ticker });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error.message);
    return null;
  }
}

// Function to parse CSV and get random bonds
function getRandomBonds(csvPath, count = 10) {
  try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split('\n').slice(1); // Skip header
    const bonds = [];
    
    for (const line of lines) {
      if (line.trim()) {
        const columns = line.split(',');
        if (columns.length >= 12) {
          bonds.push({
            sectype: columns[0],
            security: columns[1],
            coupon: columns[2],
            issue_name: columns[3],
            isin: columns[11],
            last_traded_price: columns[10]
          });
        }
      }
    }
    
    // Get random selection
    const randomBonds = [];
    for (let i = 0; i < Math.min(count, bonds.length); i++) {
      const randomIndex = Math.floor(Math.random() * bonds.length);
      randomBonds.push(bonds[randomIndex]);
      bonds.splice(randomIndex, 1); // Remove to avoid duplicates
    }
    
    return randomBonds;
  } catch (error) {
    console.error('Error reading CSV file:', error.message);
    return [];
  }
}

// Function to test health endpoint
async function checkApiHealth() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'yahoo-finance-api-124311910782.us-central1.run.app',
      path: '/health',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve(response);
        } catch (error) {
          resolve({ status: 'unknown', response: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Main function to test bond price fetching
async function main() {
  console.log('🔍 Testing Bond Price Fetching with Yahoo Finance API\n');
  
  // Test API health first
  console.log('1. Checking API Health...');
  try {
    const health = await checkApiHealth();
    console.log('   API Status:', health.status || 'unknown');
  } catch (error) {
    console.error('   ❌ API Health check failed:', error.message);
    return;
  }
  
  // Load random bonds from CSV
  console.log('\n2. Loading random bonds from CSV...');
  const csvPath = 'C:\\Users\\datta\\Downloads\\wdmlist_05092025.csv';
  const randomBonds = getRandomBonds(csvPath, 15);
  
  if (randomBonds.length === 0) {
    console.error('   ❌ No bonds loaded from CSV');
    return;
  }
  
  console.log(`   ✅ Loaded ${randomBonds.length} random bonds`);
  
  // Test different ticker formats for bonds
  console.log('\n3. Testing different ticker formats for bonds...\n');
  
  const results = [];
  
  for (let i = 0; i < randomBonds.length; i++) {
    const bond = randomBonds[i];
    console.log(`Testing Bond ${i + 1}:`);
    console.log(`   ISIN: ${bond.isin}`);
    console.log(`   Security: ${bond.security}`);
    console.log(`   Issue Name: ${bond.issue_name}`);
    console.log(`   CSV Price: ${bond.last_traded_price}`);
    
    // Try different ticker formats
    const tickersToTry = [
      bond.isin,                    // Full ISIN
      bond.security,                // Security symbol
      `${bond.isin}.BO`,           // ISIN with Bombay Stock Exchange suffix
      `${bond.security}.BO`,       // Security with BSE suffix
      `${bond.isin}.NS`,           // ISIN with NSE suffix  
      `${bond.security}.NS`,       // Security with NSE suffix
    ];
    
    let found = false;
    
    for (const ticker of tickersToTry) {
      if (ticker && ticker.trim()) {
        console.log(`   Trying ticker: ${ticker}`);
        const stockInfo = await getStockInfo(ticker);
        
        if (stockInfo) {
          console.log(`   ✅ SUCCESS! Found data for ${ticker}`);
          console.log(`      Name: ${stockInfo.longName || stockInfo.shortName}`);
          console.log(`      Current Price: ${stockInfo.currentPrice}`);
          console.log(`      Currency: ${stockInfo.currency}`);
          console.log(`      Exchange: ${stockInfo.exchange}`);
          
          results.push({
            bond: bond,
            ticker: ticker,
            yahoo_data: stockInfo,
            csv_price: bond.last_traded_price
          });
          
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      console.log(`   ❌ No data found for any ticker format`);
      results.push({
        bond: bond,
        ticker: null,
        yahoo_data: null,
        csv_price: bond.last_traded_price
      });
    }
    
    console.log(''); // Empty line for readability
    
    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  
  const successful = results.filter(r => r.yahoo_data !== null);
  const failed = results.filter(r => r.yahoo_data === null);
  
  console.log(`Total bonds tested: ${results.length}`);
  console.log(`Successfully found: ${successful.length} (${((successful.length/results.length)*100).toFixed(1)}%)`);
  console.log(`Not found: ${failed.length} (${((failed.length/results.length)*100).toFixed(1)}%)`);
  
  if (successful.length > 0) {
    console.log('\n✅ Successfully Found Bonds:');
    console.log('─'.repeat(80));
    successful.forEach((result, index) => {
      console.log(`${index + 1}. ${result.bond.issue_name}`);
      console.log(`   Ticker: ${result.ticker}`);
      console.log(`   Yahoo Price: ${result.yahoo_data.currentPrice} ${result.yahoo_data.currency}`);
      console.log(`   CSV Price: ₹${result.csv_price}`);
      console.log('');
    });
  }
  
  if (failed.length > 0 && failed.length <= 5) {
    console.log('\n❌ Bonds Not Found in Yahoo Finance:');
    console.log('─'.repeat(80));
    failed.forEach((result, index) => {
      console.log(`${index + 1}. ${result.bond.issue_name}`);
      console.log(`   ISIN: ${result.bond.isin}`);
      console.log(`   Security: ${result.bond.security}`);
      console.log('');
    });
  }
  
  // Save results to file
  const outputFile = 'bond_price_results.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to ${outputFile}`);
}

// Run the test
main().catch(console.error);
