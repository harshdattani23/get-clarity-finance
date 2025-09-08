// Test YouTube Video Analysis - Channel Name & Video Title Extraction
// This will test if our AI Studio integration correctly analyzes YouTube videos

async function testYouTubeVideoAnalysis() {
  console.log('🎥 Testing YouTube Video Analysis - Channel & Title Extraction\n');
  
  // Test with real financial YouTube videos
  const testVideos = [
    {
      name: 'Popular Finance Channel',
      url: 'https://www.youtube.com/watch?v=XbZ8zDpX2Mg', // Popular finance video
      expectedChannel: 'Should extract actual channel name',
      expectedTitle: 'Should extract actual video title'
    },
    {
      name: 'Stock Market Analysis Video',
      url: 'https://www.youtube.com/watch?v=1fyMfERcMdA', // Another finance video
      expectedChannel: 'Should extract actual channel name',
      expectedTitle: 'Should extract actual video title'
    },
    {
      name: 'SEBI Related Content',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll (safe test)
      expectedChannel: 'Rick Astley',
      expectedTitle: 'Never Gonna Give You Up'
    }
  ];

  for (let i = 0; i < testVideos.length; i++) {
    const video = testVideos[i];
    console.log(`🎬 Test ${i + 1}: ${video.name}`);
    console.log(`📺 URL: ${video.url}`);
    
    const payload = {
      mediaUrl: video.url,
      mediaType: 'video'
    };

    try {
      const startTime = Date.now();
      
      const response = await fetch('http://localhost:3000/api/agents/deepfake-detector-v3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        console.log(`   ❌ HTTP Error: ${response.status} ${response.statusText}`);
        const errorData = await response.text();
        console.log(`   Error: ${errorData.substring(0, 300)}...`);
        continue;
      }
      
      const data = await response.json();
      
      console.log(`   ⏱️  Response Time: ${responseTime}ms`);
      console.log(`   🔧 API Version: ${data.version}`);
      console.log(`   📊 Risk Level: ${data.analysis?.riskLevel}`);
      console.log(`   🎯 Confidence: ${data.analysis?.confidence}%`);
      
      // Check if contentSummary exists and has video details
      const contentSummary = data.analysis?.contentSummary;
      if (contentSummary) {
        console.log('\n   📋 Video Content Summary:');
        
        if (contentSummary.title) {
          console.log(`   🎬 Title: "${contentSummary.title}"`);
        } else {
          console.log('   ❌ Title: Not extracted');
        }
        
        if (contentSummary.channelName) {
          console.log(`   📺 Channel: "${contentSummary.channelName}"`);
        } else {
          console.log('   ❌ Channel: Not extracted');
        }
        
        if (contentSummary.description) {
          console.log(`   📝 Description: "${contentSummary.description.substring(0, 100)}..."`);
        }
        
        if (contentSummary.duration) {
          console.log(`   ⏳ Duration: ${contentSummary.duration}`);
        }
        
        if (contentSummary.mainTopics && contentSummary.mainTopics.length > 0) {
          console.log(`   🏷️  Topics: ${contentSummary.mainTopics.slice(0, 3).join(', ')}`);
        }
        
        if (contentSummary.speakerClaims && contentSummary.speakerClaims.length > 0) {
          console.log(`   💬 Speaker Claims: ${contentSummary.speakerClaims.length} found`);
          contentSummary.speakerClaims.slice(0, 2).forEach((claim, idx) => {
            console.log(`      ${idx + 1}. ${claim.substring(0, 80)}...`);
          });
        }
        
        if (contentSummary.investmentClaims && contentSummary.investmentClaims.length > 0) {
          console.log(`   💰 Investment Claims: ${contentSummary.investmentClaims.length} found`);
          contentSummary.investmentClaims.slice(0, 2).forEach((claim, idx) => {
            console.log(`      ${idx + 1}. ${claim.substring(0, 80)}...`);
          });
        }
      } else {
        console.log('   ❌ No content summary found in response');
      }
      
      // Show technical details if available
      const techDetails = data.analysis?.technicalDetails;
      if (techDetails && Object.keys(techDetails).length > 0) {
        console.log('\n   🔧 Technical Analysis:');
        Object.keys(techDetails).forEach(key => {
          if (Array.isArray(techDetails[key])) {
            console.log(`   ${key}: ${techDetails[key].length} items found`);
          } else {
            console.log(`   ${key}: ${JSON.stringify(techDetails[key]).substring(0, 60)}...`);
          }
        });
      }
      
      // Video validation check
      if (data.analysis?.technicalDetails?.videoValidation) {
        const validation = data.analysis.technicalDetails.videoValidation;
        console.log('\n   🔍 Video Validation:');
        console.log(`   Expected Video ID: ${validation.expectedVideoId}`);
        console.log(`   Has Video Reference: ${validation.hasVideoReference}`);
        if (validation.warning) {
          console.log(`   ⚠️  Warning: ${validation.warning}`);
        }
      }
      
      // Show all indicators
      if (data.analysis?.indicators && data.analysis.indicators.length > 0) {
        console.log('\n   🎯 Analysis Indicators:');
        data.analysis.indicators.forEach((indicator, idx) => {
          console.log(`   ${idx + 1}. ${indicator}`);
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Test Failed: ${error.message}`);
      if (error.stack) {
        console.log(`   Stack: ${error.stack.substring(0, 200)}...`);
      }
    }
    
    console.log('\n' + '='.repeat(80) + '\n');
  }
  
  console.log('🏁 YouTube Analysis Testing Completed!');
}

// Test with a specific known video
async function testSpecificVideo() {
  console.log('🎯 Testing Specific Video for Detailed Analysis\n');
  
  // Test with a known finance video
  const testUrl = 'https://www.youtube.com/watch?v=XbZ8zDpX2Mg'; // Replace with actual finance video
  
  console.log(`📺 Analyzing: ${testUrl}`);
  
  const payload = {
    mediaUrl: testUrl,
    mediaType: 'video'
  };
  
  try {
    const response = await fetch('http://localhost:3000/api/agents/deepfake-detector-v3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n📊 Full Analysis Results:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Error Response:');
      console.log(JSON.stringify(data, null, 2));
    }
    
  } catch (error) {
    console.log('❌ Request Failed:', error.message);
  }
}

// Run tests
if (typeof require !== 'undefined' && require.main === module) {
  console.log('🚀 Starting YouTube Video Analysis Tests...\n');
  
  testYouTubeVideoAnalysis().catch(console.error);
  
  // Run detailed test after 5 seconds
  setTimeout(() => {
    console.log('\n' + '🔬'.repeat(20));
    testSpecificVideo().catch(console.error);
  }, 5000);
}

module.exports = {
  testYouTubeVideoAnalysis,
  testSpecificVideo
};
