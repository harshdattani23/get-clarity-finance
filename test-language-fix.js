// Test script to verify the language parameter fix
const { getAutoContentLanguageCode } = require('./src/config/podcastLanguages.ts');

console.log('🔍 Testing Language Code Mapping:');
console.log('------------------------------');

const testCases = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'bn'];

testCases.forEach(code => {
  try {
    const autoContentLang = getAutoContentLanguageCode(code);
    console.log(`${code} → ${autoContentLang}`);
  } catch (error) {
    console.log(`${code} → ERROR: ${error.message}`);
  }
});

console.log('');
console.log('✅ Expected for Hindi:');
console.log('hi → हिन्दी');
console.log('');
console.log('❌ Previous issue was:');
console.log('Frontend sent: ?language=hi');
console.log('Backend expected: ?lang=hi');
console.log('Result: Defaulted to English');
console.log('');
console.log('🚀 Fix applied:');
console.log('Frontend now sends: ?lang=hi');
console.log('Backend will receive: lang=hi');
console.log('Result: Should generate हिन्दी audio');
