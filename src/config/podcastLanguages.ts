/**
 * Language configuration for podcast generation
 * Maps website language codes to AutoContent API language strings
 */

export interface PodcastLanguage {
  code: string;           // Our website language code
  label: string;          // Display name in English
  nativeName: string;     // Display name in native language
  autoContentCode: string; // Exact string for AutoContent API (case sensitive)
  enabled: boolean;       // Whether podcast generation is enabled for this language
}

// Supported languages for podcast generation
export const PODCAST_LANGUAGES: Record<string, PodcastLanguage> = {
  en: {
    code: 'en',
    label: 'English',
    nativeName: 'English',
    autoContentCode: 'English',
    enabled: true,
  },
  hi: {
    code: 'hi',
    label: 'Hindi',
    nativeName: 'हिंदी',
    autoContentCode: 'हिन्दी',
    enabled: true,
  },
  mr: {
    code: 'mr',
    label: 'Marathi',
    nativeName: 'मराठी',
    autoContentCode: 'मराठी',
    enabled: true,
  },
  gu: {
    code: 'gu',
    label: 'Gujarati',
    nativeName: 'ગુજરાતી',
    autoContentCode: 'ગુજરાતી',
    enabled: true,
  },
  ta: {
    code: 'ta',
    label: 'Tamil',
    nativeName: 'தமிழ்',
    autoContentCode: 'தமிழ்',
    enabled: true,
  },
  te: {
    code: 'te',
    label: 'Telugu',
    nativeName: 'తెలుగు',
    autoContentCode: 'తెలుగు',
    enabled: true,
  },
  bn: {
    code: 'bn',
    label: 'Bengali',
    nativeName: 'বাংলা',
    autoContentCode: 'বাংলা',
    enabled: true,
  },
  kn: {
    code: 'kn',
    label: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    autoContentCode: 'ಕನ್ನಡ',
    enabled: true,
  },
  ml: {
    code: 'ml',
    label: 'Malayalam',
    nativeName: 'മലയാളം',
    autoContentCode: 'മലയാളം',
    enabled: true,
  },
  pa: {
    code: 'pa',
    label: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    autoContentCode: 'ਪੰਜਾਬੀ',
    enabled: true,
  },
} as const;

// Get AutoContent API language code from our website language code
export function getAutoContentLanguageCode(languageCode: string): string {
  const language = PODCAST_LANGUAGES[languageCode];
  return language?.autoContentCode || 'English'; // Default to English
}

// Get language display name for UI
export function getLanguageDisplayName(languageCode: string): string {
  const language = PODCAST_LANGUAGES[languageCode];
  return language?.nativeName || language?.label || 'English';
}

// Get list of enabled languages for UI dropdown
export function getEnabledPodcastLanguages(): PodcastLanguage[] {
  return Object.values(PODCAST_LANGUAGES).filter(lang => lang.enabled);
}

// Check if language is supported for podcast generation
export function isPodcastLanguageSupported(languageCode: string): boolean {
  const language = PODCAST_LANGUAGES[languageCode];
  return language?.enabled || false;
}

// Default language for podcast generation
export const DEFAULT_PODCAST_LANGUAGE = 'en';

// Language-specific prompt instructions
export const LANGUAGE_PROMPT_INSTRUCTIONS: Record<string, string> = {
  en: `Create an engaging and professional podcast episode discussing today's key regulatory developments in Indian financial markets. Use clear, professional English suitable for investors and financial professionals.`,
  
  hi: `आज के प्रमुख नियामक विकास पर एक आकर्षक और व्यावसायिक पॉडकास्ट एपिसोड बनाएं। भारतीय वित्तीय बाजारों के लिए स्पष्ट, व्यावसायिक हिंदी का उपयोग करें। निवेशकों और वित्तीय पेशेवरों के लिए उपयुक्त भाषा का प्रयोग करें।`,
  
  mr: `आजच्या प्रमुख नियामक घडामोडींवर आकर्षक आणि व्यावसायिक पॉडकास्ट भाग तयार करा. भारतीय वित्तीय बाजारांसाठी स्पष्ट, व्यावसायिक मराठी वापरा. गुंतवणूकदार आणि वित्तीय व्यावसायिकांसाठी योग्य भाषा वापरा.`,
  
  gu: `આજના મુખ્ય નિયમનકારી વિકાસ પર આકર્ષક અને વ્યવસાયિક પોડકાસ્ટ એપિસોડ બનાવો. ભારતીય નાણાકીય બજારો માટે સ્પષ્ટ, વ્યાવસાયિક ગુજરાતી ભાષાનો ઉપયોગ કરો. રોકાણકારો અને નાણાકીય વ્યાવસાયિકો માટે યોગ્ય ભાષાનો ઉપયોગ કરો.`,
  
  ta: `இன்றைய முக்கிய ஒழுங்குமுறை வளர்ச்சிகள் குறித்து ஈர்க்கும் மற்றும் தொழில்முறை பாட்காஸ்ட் எபிசோடை உருவாக்கவும். இந்திய நிதிச் சந்தைகளுக்கு தெளிவான, தொழில்முறை தமிழைப் பயன்படுத்தவும். முதலீட்டாளர்கள் மற்றும் நிதித் தொழில் வல்லுநர்களுக்கு பொருத்தமான மொழியைப் பயன்படுத்தவும்.`,
  
  te: `నేటి ముఖ్య నియంత్రణ అభివృద్ధిపై ఆకర్షణీయమైన మరియు వృత్తిపరమైన పాడ్‌కాస్ట్ ఎపిసోడ్ సృష్టించండి. భారతీయ ఆర్థిక మార్కెట్లకు స్పష్టమైన, వృత్తిపరమైన తెలుగును ఉపయోగించండి. పెట్టుబడిదారులు మరియు ఆర్థిక నిపుణులకు తగిన భాషను ఉపయోగించండి.`,
  
  bn: `আজকের প্রধান নিয়ন্ত্রক উন্নয়নের উপর একটি আকর্ষক এবং পেশাগত পডকাস্ট পর্ব তৈরি করুন। ভারতীয় আর্থিক বাজারের জন্য স্পষ্ট, পেশাদার বাংলা ব্যবহার করুন। বিনিয়োগকারী এবং আর্থিক পেশাদারদের জন্য উপযুক্ত ভাষা ব্যবহার করুন।`,

  kn: `ಇಂದಿನ ಪ್ರಮುಖ ನಿಯಂತ್ರಕ ಬೆಳವಣಿಗೆಗಳ ಕುರಿತು ಆಕರ್ಷಕ ಮತ್ತು ವೃತ್ತಿಪರ ಪಾಡ್‌ಕಾಸ್ಟ್ ಎಪಿಸೋಡ್ ರಚಿಸಿ. ಭಾರತೀಯ ಹಣಕಾಸು ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಸ್ಪಷ್ಟವಾದ, ವೃತ್ತಿಪರ ಕನ್ನಡವನ್ನು ಬಳಸಿ. ಹೂಡಿಕೆದಾರರು ಮತ್ತು ಹಣಕಾಸು ವೃತ್ತಿಪರರಿಗೆ ಸೂಕ್ತವಾದ ಭಾಷೆಯನ್ನು ಬಳಸಿ.`,

  ml: `ഇന്നത്തെ പ്രധാന റെഗുലേറ്ററി വികസനങ്ങളെക്കുറിച്ച് ആകര്‍ഷകവും പ്രൊഫഷണലുമായ പോഡ്‌കാസ്റ്റ് എപ്പിസോഡ് സൃഷ്ടിക്കുക. ഇന്ത്യന്‍ ധനകാര്യ വിപണികള്‍ക്കായി വ്യക്തമായ, പ്രൊഫഷണല്‍ മലയാളം ഉപയോഗിക്കുക. നിക്ഷേപകര്‍ക്കും ധനകാര്യ പ്രൊഫഷണലുകള്‍ക്കും അനുയോജ്യമായ ഭാഷ ഉപയോഗിക്കുക.`,

  pa: `ਅੱਜ ਦੇ ਮੁੱਖ ਨਿਯਮਕ ਵਿਕਾਸਾਂ ਬਾਰੇ ਇੱਕ ਆਕਰਸ਼ਕ ਅਤੇ ਪੇਸ਼ੇਵਰ ਪੌਡਕਾਸਟ ਐਪੀਸੋਡ ਬਣਾਓ। ਭਾਰਤੀ ਵਿੱਤੀ ਬਾਜ਼ਾਰਾਂ ਲਈ ਸਪਸ਼ਟ, ਪੇਸ਼ੇਵਰ ਪੰਜਾਬੀ ਦੀ ਵਰਤੋਂ ਕਰੋ। ਨਿਵੇਸ਼ਕਾਂ ਅਤੇ ਵਿੱਤੀ ਪੇਸ਼ੇਵਰਾਂ ਲਈ ਢੁਕਵੀਂ ਭਾਸ਼ਾ ਦੀ ਵਰਤੋਂ ਕਰੋ।`,
};

export type SupportedLanguageCode = keyof typeof PODCAST_LANGUAGES;
