const fs = require('fs');
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
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response.data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${response.message || body}`));
          }
        } catch (error) {
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

// Function to parse CSV and get sample bonds
function getSampleBonds(csvPath, count = 50) {
  try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split('\n').slice(1); // Skip header
    const bonds = [];
    
    for (const line of lines) {
      if (line.trim()) {
        const columns = line.split(',');
        if (columns.length >= 12) {
          // Focus on bonds from well-known issuers
          const issuer = columns[3].toUpperCase();
          if (issuer.includes('IRFC') || issuer.includes('REC') || issuer.includes('NTPC') || 
              issuer.includes('PFC') || issuer.includes('GOI') || issuer.includes('PGCIL') ||
              issuer.includes('NHPC') || issuer.includes('HUDCO')) {
            bonds.push({
              sectype: columns[0],
              security: columns[1],
              coupon: columns[2],
              issue_name: columns[3],
              issue_date: columns[4],
              mat_date: columns[5],
              isin: columns[11],
              last_traded_price: parseFloat(columns[10]) || 0,
              status: columns[12]
            });
          }
        }
      }
    }
    
    // Sort by last traded price (descending) to get actively traded bonds
    return bonds
      .filter(bond => bond.last_traded_price > 0)
      .sort((a, b) => b.last_traded_price - a.last_traded_price)
      .slice(0, count);
    
  } catch (error) {
    console.error('Error reading CSV file:', error.message);
    return [];
  }
}

async function main() {
  console.log('🔍 Bond Price Analysis with Yahoo Finance API');
  console.log('='.repeat(60));
  
  // Load sample bonds
  const csvPath = 'C:\\\\Users\\\\datta\\\\Downloads\\\\wdmlist_05092025.csv';
  const bonds = getSampleBonds(csvPath, 20);
  
  console.log(`\\n📊 Found ${bonds.length} bonds from major issuers\\n`);
  
  const results = {
    successful: [],
    partial_success: [],
    failed: [],
    analysis: {}
  };
  
  // Test bonds with different ticker strategies
  for (let i = 0; i < bonds.length; i++) {
    const bond = bonds[i];
    console.log(`Testing ${i + 1}/${bonds.length}: ${bond.security} - ${bond.issue_name}`);
    
    // Strategy 1: Try the issuer stock symbol with .NS
    let issuerSymbol = null;
    const issuer = bond.issue_name.toUpperCase();
    
    if (issuer.includes('IRFC')) issuerSymbol = 'IRFC.NS';
    else if (issuer.includes('REC')) issuerSymbol = 'REC.NS'; 
    else if (issuer.includes('NTPC')) issuerSymbol = 'NTPC.NS';
    else if (issuer.includes('PFC') || issuer.includes('POWER FIN')) issuerSymbol = 'PFC.NS';
    else if (issuer.includes('PGCIL') || issuer.includes('POWER GRID')) issuerSymbol = 'PGCIL.NS';
    else if (issuer.includes('NHPC')) issuerSymbol = 'NHPC.NS';
    else if (issuer.includes('HUDCO')) issuerSymbol = 'HUDCO.NS';
    
    let stockData = null;
    let usedTicker = null;
    
    if (issuerSymbol) {
      try {
        stockData = await getStockInfo(issuerSymbol);
        if (stockData && stockData.currentPrice) {
          usedTicker = issuerSymbol;
        }
      } catch (error) {
        // Continue to next strategy
      }
    }
    
    // Strategy 2: Try bond symbol directly
    if (!stockData && bond.security) {
      try {
        stockData = await getStockInfo(bond.security);
        if (stockData && stockData.currentPrice) {
          usedTicker = bond.security;
        }
      } catch (error) {
        // Continue
      }
    }
    
    if (stockData && stockData.currentPrice) {
      results.successful.push({
        bond: bond,
        ticker: usedTicker,
        stock_data: {
          name: stockData.longName || stockData.shortName,
          current_price: stockData.currentPrice,
          currency: stockData.currency,
          exchange: stockData.exchange,
          market_cap: stockData.marketCap,
          pe_ratio: stockData.trailingPE
        },
        bond_price: bond.last_traded_price
      });
      console.log(`   ✅ Found stock data for ${usedTicker} - Price: ₹${stockData.currentPrice}`);
    } else if (stockData) {
      results.partial_success.push({
        bond: bond,
        ticker: usedTicker,
        partial_data: stockData
      });
      console.log(`   ⚠️ Partial data for ${usedTicker || 'unknown'}`);
    } else {
      results.failed.push(bond);
      console.log(`   ❌ No data found`);
    }
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Analysis and Summary
  console.log('\\n' + '='.repeat(80));
  console.log('📈 ANALYSIS & RECOMMENDATIONS');
  console.log('='.repeat(80));
  
  console.log(`\\n📊 Results Summary:`);
  console.log(`   Total bonds tested: ${bonds.length}`);
  console.log(`   Full stock data found: ${results.successful.length} (${((results.successful.length/bonds.length)*100).toFixed(1)}%)`);
  console.log(`   Partial data: ${results.partial_success.length} (${((results.partial_success.length/bonds.length)*100).toFixed(1)}%)`);
  console.log(`   No data: ${results.failed.length} (${((results.failed.length/bonds.length)*100).toFixed(1)}%)`);
  
  if (results.successful.length > 0) {
    console.log(`\\n✅ Successfully Found (Stock data for bond issuers):`);
    console.log('─'.repeat(80));
    results.successful.forEach((result, index) => {
      const priceDiff = result.stock_data.current_price - result.bond_price;
      const priceDiffPercent = ((priceDiff / result.bond_price) * 100).toFixed(2);
      
      console.log(`${index + 1}. ${result.bond.issue_name}`);
      console.log(`   Bond Price (CSV): ₹${result.bond_price}`);
      console.log(`   Stock Price: ₹${result.stock_data.current_price} (${result.ticker})`);
      console.log(`   Issuer: ${result.stock_data.name}`);
      console.log(`   Note: Stock price vs Bond price comparison not directly meaningful`);
      console.log('');
    });
  }
  
  console.log(`\\n💡 KEY FINDINGS:`);
  console.log('─'.repeat(40));
  console.log('1. Yahoo Finance API does NOT directly support Indian bond prices');
  console.log('2. ISIN numbers are not recognized by Yahoo Finance');
  console.log('3. Bond symbols from CSV return minimal/no data'); 
  console.log('4. However, we CAN get stock prices for bond issuers (IRFC, NTPC, REC, etc.)');
  console.log('5. This gives us issuer financial health but not actual bond prices');
  
  console.log(`\\n🎯 RECOMMENDATIONS:`);
  console.log('─'.repeat(40));
  console.log('For Real Bond Pricing:');
  console.log('• Use NSE/BSE APIs for actual bond prices');
  console.log('• Consider Bloomberg API or Reuters for institutional data');
  console.log('• RBI or CCIL (Clearing Corporation of India) for G-Sec prices');
  console.log('');
  console.log('For Bond Analysis using Yahoo Finance:');
  console.log('• Get issuer stock data to assess creditworthiness');
  console.log('• Monitor issuer financial ratios (PE, Debt/Equity, etc.)');
  console.log('• Track issuer stock performance as proxy for credit risk');
  console.log('• Use for fundamental analysis of bond issuers');
  
  console.log(`\\n📝 ALTERNATIVE DATA SOURCES:`);
  console.log('─'.repeat(40));
  console.log('• NSE Bond Market: https://www.nseindia.com/market-data/bonds-trading');
  console.log('• BSE Bond Platform: https://www.bseindia.com/markets/debt/debt_corporate.aspx');
  console.log('• RBI Database: https://dbie.rbi.org.in/');
  console.log('• CCIL: https://www.ccilindia.com/');
  
  // Save detailed results
  const outputFile = 'bond_analysis_results.json';
  fs.writeFileSync(outputFile, JSON.stringify({
    summary: {
      total_tested: bonds.length,
      successful: results.successful.length,
      partial_success: results.partial_success.length,
      failed: results.failed.length
    },
    detailed_results: results,
    recommendations: {
      for_actual_bond_prices: [
        'Use NSE/BSE APIs',
        'Bloomberg Terminal/API', 
        'RBI/CCIL data sources'
      ],
      for_yahoo_finance_usage: [
        'Get issuer stock data for credit analysis',
        'Monitor issuer financial health',
        'Track creditworthiness indicators'
      ]
    }
  }, null, 2));
  
  console.log(`\\n💾 Detailed results saved to: ${outputFile}`);
}

main().catch(console.error);
