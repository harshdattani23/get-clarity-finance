// Test script to verify language mapping for Tamil
console.log('🔍 Testing Language Mapping for Tamil');
console.log('=====================================');

// Simulate the function calls
const PODCAST_LANGUAGES = {
  ta: {
    code: 'ta',
    label: 'Tamil',
    nativeName: 'தமிழ்',
    autoContentCode: 'தமிழ்',
    enabled: true,
    flag: '🇮🇳',
    displayName: 'Tamil',
  }
};

function getAutoContentLanguageCode(languageCode) {
  const language = PODCAST_LANGUAGES[languageCode];
  return language?.autoContentCode || 'English';
}

function getLanguageLabelForDatabase(languageCode) {
  const language = PODCAST_LANGUAGES[languageCode];
  return language?.label || 'English';
}

// Test the mappings
console.log('Input language code: ta');
console.log('AutoContent language:', getAutoContentLanguageCode('ta'));
console.log('Database label:', getLanguageLabelForDatabase('ta'));
console.log('');

// Test URL generation
const languageCode = 'ta';
const params = new URLSearchParams({ 
  lang: languageCode,
  duration: 'default'
});
console.log('Generated URL params:', params.toString());
console.log('Expected backend to receive:', { lang: 'ta', duration: 'default' });
console.log('');

// Test what backend should process
console.log('Backend processing simulation:');
console.log('1. searchParams.get("lang") should return:', 'ta');
console.log('2. getAutoContentLanguageCode("ta") should return:', 'தமிழ்');
console.log('3. AutoContent API should receive language:', 'தமிழ்');
console.log('');

// Check if there are any encoding issues
const tamilText = 'தமிழ்';
console.log('Tamil text encoded as URI component:', encodeURIComponent(tamilText));
console.log('Tamil text length:', tamilText.length);
console.log('Tamil text char codes:', Array.from(tamilText).map(c => c.charCodeAt(0)));

console.log('');
console.log('✅ If Tamil is still being generated in English, the issue is either:');
console.log('1. 📡 Parameter not being sent correctly from frontend');
console.log('2. 🔧 Backend not processing the parameter correctly');  
console.log('3. 🌐 AutoContent API not recognizing the Tamil language string');
console.log('4. 📝 Database episode creation using wrong language');
