// Test the specific Bitcoin video to verify it's analyzing the correct content
// Video should be "Don't Buy Bitcoin. It's Going To Crash!!!"

async function testBitcoinVideo() {
  console.log('🚀 Testing Specific Bitcoin Video Analysis\n');
  
  const bitcoinVideoUrl = 'https://www.youtube.com/watch?v=XbZ8zDpX2Mg';
  const expectedTitle = "Don't Buy Bitcoin. It's Going To Crash!!!";
  
  console.log(`🎯 Testing URL: ${bitcoinVideoUrl}`);
  console.log(`📺 Expected Title: "${expectedTitle}"`);
  console.log(`🔍 Expected Video ID: ${bitcoinVideoUrl.split('v=')[1]?.split('&')[0]}`);
  
  const payload = {
    mediaUrl: bitcoinVideoUrl,
    mediaType: 'video'
  };

  try {
    console.log('\n🔄 Sending request to deepfake detector v3...');
    const startTime = Date.now();
    
    const response = await fetch('http://localhost:3000/api/agents/deepfake-detector-v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const responseTime = Date.now() - startTime;
    
    if (!response.ok) {
      console.log(`❌ HTTP Error: ${response.status} ${response.statusText}`);
      const errorData = await response.text();
      console.log(`Error: ${errorData.substring(0, 500)}...`);
      return;
    }
    
    const data = await response.json();
    
    console.log(`\n✅ Response received in ${responseTime}ms`);
    console.log(`🔧 API Version: ${data.version}`);
    console.log(`📊 Analysis completed successfully: ${data.success}`);
    
    // Check video validation
    const analysis = data.analysis;
    if (analysis) {
      console.log('\n🎬 EXTRACTED VIDEO DETAILS:');
      console.log(`   Title: "${analysis.contentSummary?.title || 'NOT EXTRACTED'}"`);
      console.log(`   Channel: "${analysis.contentSummary?.channelName || 'NOT EXTRACTED'}"`);
      console.log(`   Duration: ${analysis.contentSummary?.duration || 'NOT EXTRACTED'}`);
      
      // Check if title matches expected
      const actualTitle = analysis.contentSummary?.title || '';
      const titleMatch = actualTitle.toLowerCase().includes('bitcoin') && 
                        (actualTitle.toLowerCase().includes('crash') || 
                         actualTitle.toLowerCase().includes("don't buy"));
      
      console.log(`\n🔍 VIDEO VALIDATION:`);
      console.log(`   Expected: "${expectedTitle}"`);
      console.log(`   Actual: "${actualTitle}"`);
      console.log(`   Match: ${titleMatch ? '✅ CORRECT' : '❌ WRONG VIDEO ANALYZED'}`);
      
      // Check AI's own validation
      if (analysis.videoValidationConfirmation) {
        console.log(`   AI Confirmation: "${analysis.videoValidationConfirmation}"`);
      }
      if (analysis.videoIdVerification) {
        console.log(`   Video ID Verified: ${analysis.videoIdVerification}`);
      }
      
      // Show technical validation details
      const techDetails = analysis.technicalDetails;
      if (techDetails?.videoValidation) {
        console.log(`\n🔧 TECHNICAL VALIDATION:`);
        const validation = techDetails.videoValidation;
        console.log(`   Verified: ${validation.verified ? '✅' : '❌'}`);
        console.log(`   Video ID Match: ${validation.videoIdMatch ? '✅' : '❌'}`);
        if (validation.warning) {
          console.log(`   ⚠️ Warning: ${validation.warning}`);
        }
      }
      
      if (techDetails?.videoValidationError) {
        console.log(`\n🚨 VALIDATION ERROR DETECTED:`);
        console.log(`   Expected Video ID: ${techDetails.expectedVideoId}`);
        console.log(`   AI Video ID: ${techDetails.aiVideoIdVerification}`);
        console.log(`   Validation Failed: ${techDetails.validationFailed}`);
      }
      
      console.log(`\n📈 ANALYSIS RESULTS:`);
      console.log(`   Risk Level: ${analysis.riskLevel}`);
      console.log(`   Confidence: ${analysis.confidence}%`);
      console.log(`   Is Deepfake: ${analysis.isDeepfake}`);
      console.log(`   Indicators Found: ${analysis.indicators?.length || 0}`);
      
      if (analysis.contentSummary?.description) {
        console.log(`\n📝 VIDEO DESCRIPTION:`);
        console.log(`   ${analysis.contentSummary.description.substring(0, 200)}...`);
      }
      
      if (analysis.contentSummary?.mainTopics?.length) {
        console.log(`\n🏷️ MAIN TOPICS:`);
        analysis.contentSummary.mainTopics.slice(0, 5).forEach((topic, i) => {
          console.log(`   ${i + 1}. ${topic}`);
        });
      }
      
      if (analysis.indicators?.length) {
        console.log(`\n⚠️ ANALYSIS INDICATORS:`);
        analysis.indicators.forEach((indicator, i) => {
          console.log(`   ${i + 1}. ${indicator}`);
        });
      }
      
      // Final validation summary
      console.log(`\n🎯 FINAL VALIDATION SUMMARY:`);
      if (titleMatch) {
        console.log('   ✅ SUCCESS: AI analyzed the correct Bitcoin video');
        console.log(`   ✅ Video contains Bitcoin crash content as expected`);
      } else {
        console.log('   ❌ FAILURE: AI analyzed wrong video');
        console.log(`   ❌ Expected Bitcoin crash content, got different video`);
        console.log('   🔧 This indicates the AI Studio integration needs fixing');
      }
      
    } else {
      console.log('❌ No analysis data found in response');
    }
    
  } catch (error) {
    console.log(`❌ Test Failed: ${error.message}`);
    if (error.stack) {
      console.log(`Stack: ${error.stack.substring(0, 300)}...`);
    }
  }
}

// Also test with a simple text case to ensure basic functionality works
async function testBasicTextFirst() {
  console.log('🧪 Quick Test - Basic Text Analysis First\n');
  
  const payload = {
    transcript: 'Bitcoin is going to crash. Do not buy it now.',
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
      console.log('✅ Basic text analysis works');
      console.log(`   Risk: ${data.analysis?.riskLevel}`);
      console.log(`   Confidence: ${data.analysis?.confidence}%`);
      console.log(`   Message: ${data.message?.substring(0, 100)}...`);
    } else {
      console.log('❌ Basic text analysis failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Basic test connection error:', error.message);
  }
}

// Run tests
if (typeof require !== 'undefined' && require.main === module) {
  console.log('🎬 Bitcoin Video Analysis Test Starting...\n');
  
  // First test basic functionality
  testBasicTextFirst().then(() => {
    console.log('\n' + '='.repeat(60));
    // Then test the Bitcoin video
    return testBitcoinVideo();
  }).catch(console.error);
}

module.exports = { testBitcoinVideo, testBasicTextFirst };
