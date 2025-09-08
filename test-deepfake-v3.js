// Test script for Deepfake Detector V3 API
// This uses the new AI Studio structure with enhanced error handling

async function testDeepfakeDetectorV3() {
  const baseUrl = 'http://localhost:3000'; // Updated to correct port
  
  // Test cases - from basic text to YouTube videos
  const testCases = [
    {
      name: 'Basic Text Analysis',
      payload: {
        transcript: 'I am promising you guaranteed 200% returns in just 30 days! Transfer ₹50,000 to my account immediately.',
        mediaType: 'text'
      },
      expectedRisk: 'high'
    },
    {
      name: 'Legitimate Investment Content',
      payload: {
        transcript: 'Based on technical analysis, Nifty 50 may reach 25,000 levels by year-end. This is just a prediction based on market trends.',
        mediaType: 'text'
      },
      expectedRisk: 'low'
    },
    {
      name: 'YouTube Video Analysis',
      payload: {
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll for testing
        mediaType: 'video'
      },
      expectedRisk: 'low'
    },
    {
      name: 'SEBI Impersonation Test',
      payload: {
        transcript: 'This is official announcement from SEBI. All investors must immediately transfer funds to verify their accounts.',
        mediaType: 'text'
      },
      expectedRisk: 'critical'
    }
  ];

  console.log('🚀 Testing Deepfake Detector V3 API...\n');
  
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`📋 Test ${i + 1}: ${testCase.name}`);
    console.log(`   Input: ${JSON.stringify(testCase.payload, null, 2).substring(0, 100)}...`);
    
    try {
      const startTime = Date.now();
      
      const response = await fetch(`${baseUrl}/api/agents/deepfake-detector-v3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.payload)
      });
      
      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        console.log(`   ❌ HTTP Error: ${response.status} ${response.statusText}`);
        const errorData = await response.text();
        console.log(`   Error details: ${errorData.substring(0, 200)}...`);
        continue;
      }
      
      const data = await response.json();
      
      // Display results
      console.log(`   ✅ Response Time: ${responseTime}ms`);
      console.log(`   📊 Risk Level: ${data.analysis?.riskLevel || 'Unknown'} (Expected: ${testCase.expectedRisk})`);
      console.log(`   🎯 AI Confidence: ${data.analysis?.confidence || 0}%`);
      console.log(`   🔍 Indicators: ${data.analysis?.indicators?.length || 0} found`);
      console.log(`   📱 Report ID: ${data.reportId}`);
      console.log(`   🔧 Version: ${data.version}`);
      console.log(`   💬 Summary: ${data.message?.substring(0, 100)}...`);
      
      // Check if result matches expectation
      const riskMatch = data.analysis?.riskLevel === testCase.expectedRisk;
      console.log(`   ${riskMatch ? '✅' : '⚠️'} Risk Level ${riskMatch ? 'Matches' : 'Different from'} Expected`);
      
      // Show key findings
      if (data.analysis?.indicators?.length > 0) {
        console.log('   🔍 Key Findings:');
        data.analysis.indicators.slice(0, 3).forEach((indicator, idx) => {
          console.log(`      ${idx + 1}. ${indicator.substring(0, 60)}...`);
        });
      }
      
      // Show compliance info if high/critical risk
      if (data.detailed?.sebiReportRequired) {
        console.log('   🚨 SEBI Reporting Required!');
        console.log(`   📞 SEBI Toll-Free: ${data.detailed?.complianceInfo?.sebiTollFree}`);
      }
      
    } catch (error) {
      console.log(`   ❌ Test Failed: ${error.message}`);
      console.log(`   Stack: ${error.stack?.substring(0, 200)}...`);
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('🏁 Testing completed!');
}

// Test individual functions
async function testBasicText() {
  console.log('🧪 Quick Test - Suspicious Text Analysis');
  
  const payload = {
    transcript: 'Guaranteed 500% profit! SEBI approved scheme. Send money now to WhatsApp +91-9999999999',
    mediaType: 'text'
  };
  
  try {
    const response = await fetch('http://localhost:3000/api/agents/deepfake-detector-v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API Response:');
      console.log(`   Risk: ${data.analysis?.riskLevel}`);
      console.log(`   Confidence: ${data.analysis?.confidence}%`);
      console.log(`   Deepfake: ${data.analysis?.isDeepfake}`);
      console.log(`   Indicators: ${data.analysis?.indicators?.length} found`);
      console.log(`   SEBI Report Required: ${data.detailed?.sebiReportRequired}`);
    } else {
      console.log('❌ API Error:', data);
    }
  } catch (error) {
    console.log('❌ Connection Error:', error.message);
  }
}

// Check if script is run directly
if (typeof require !== 'undefined' && require.main === module) {
  // Run full test suite
  testDeepfakeDetectorV3().catch(console.error);
  
  // Also run quick test after 2 seconds
  setTimeout(() => {
    console.log('\n' + '='.repeat(50));
    testBasicText().catch(console.error);
  }, 2000);
}

// Export for use in other files
if (typeof module !== 'undefined') {
  module.exports = {
    testDeepfakeDetectorV3,
    testBasicText
  };
}
