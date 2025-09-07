/**
 * Frontend display translations for podcast widget
 * Provides generic localized texts while backend translations are processed
 */

export interface PodcastDisplayTexts {
  genericTitle: string;
  genericDescription: string;
  genericEpisodeTitle: string;
  todayLabel: string;
  yesterdayLabel: string;
  availableLabel: string;
  textOnlyLabel: string;
  audioNotAvailable: string;
  noPodcastsMessage: string;
  generateContentMessage: string;
  dailyPodcastStatus: string;
  liveLabel: string;
}

export const PODCAST_DISPLAY_TRANSLATIONS: Record<string, PodcastDisplayTexts> = {
  'en': {
    genericTitle: 'SEBI & Regulatory Daily Roundup',
    genericDescription: 'India\'s financial regulatory environment is undergoing dynamic transformation with key updates from regulatory bodies.',
    genericEpisodeTitle: 'Today\'s Regulatory Roundup: Key SEBI, RBI and Policy Updates',
    todayLabel: 'Today',
    yesterdayLabel: 'Yesterday', 
    availableLabel: '🎧 Available',
    textOnlyLabel: '📝 Text Only',
    audioNotAvailable: 'Audio not available',
    noPodcastsMessage: 'No podcasts available',
    generateContentMessage: 'Generate content in admin panel',
    dailyPodcastStatus: 'Daily regulatory podcasts in',
    liveLabel: 'Live'
  },
  'hi': {
    genericTitle: 'सेबी और नियामक दैनिक समाचार',
    genericDescription: 'भारत का वित्तीय नियामक वातावरण नियामक निकायों से मुख्य अपडेट के साथ गतिशील परिवर्तन से गुजर रहा है।',
    genericEpisodeTitle: 'आज के नियामक समाचार: प्रमुख सेबी, आरबीआई और नीति अपडेट',
    todayLabel: 'आज',
    yesterdayLabel: 'कल',
    availableLabel: '🎧 उपलब्ध',
    textOnlyLabel: '📝 केवल टेक्स्ट',
    audioNotAvailable: 'ऑडियो उपलब्ध नहीं',
    noPodcastsMessage: 'कोई पॉडकास्ट उपलब्ध नहीं',
    generateContentMessage: 'एडमिन पैनल में सामग्री जेनरेट करें',
    dailyPodcastStatus: 'दैनिक नियामक पॉडकास्ट',
    liveLabel: 'लाइव'
  },
  'gu': {
    genericTitle: 'સેબી અને નિયામક દૈનિક સમાચાર',
    genericDescription: 'ભારતનું નાણાકીય નિયામક વાતાવરણ નિયામક સંસ્થાઓના મુખ્ય અપડેટ્સ સાથે ગતિશીલ પરિવર્તનમાંથી પસાર થઈ રહ્યું છે।',
    genericEpisodeTitle: 'આજના નિયામક સમાચાર: મુખ્ય સેબી, આરબીઆઈ અને નીતિ અપડેટ્સ',
    todayLabel: 'આજે',
    yesterdayLabel: 'ગઈકાલે',
    availableLabel: '🎧 ઉપલબ્ધ',
    textOnlyLabel: '📝 ફક્ત ટેક્સ્ટ',
    audioNotAvailable: 'ઓડિયો ઉપલબ્ધ નથી',
    noPodcastsMessage: 'કોઈ પૉડકાસ્ટ ઉપલબ્ધ નથી',
    generateContentMessage: 'એડમિન પેનલમાં સામગ્રી બનાવો',
    dailyPodcastStatus: 'દૈનિક નિયામક પૉડકાસ્ટ',
    liveLabel: 'લાઇવ'
  },
  'mr': {
    genericTitle: 'सेबी आणि नियामक दैनिक बातम्या',
    genericDescription: 'भारताचे वित्तीय नियामक वातावरण नियामक संस्थांच्या मुख्य अपडेटसह गतिशील परिवर्तनातून जात आहे।',
    genericEpisodeTitle: 'आजच्या नियामक बातम्या: प्रमुख सेबी, आरबीआय आणि धोरण अपडेट',
    todayLabel: 'आज',
    yesterdayLabel: 'काल',
    availableLabel: '🎧 उपलब्ध',
    textOnlyLabel: '📝 फक्त मजकूर',
    audioNotAvailable: 'ऑडिओ उपलब्ध नाही',
    noPodcastsMessage: 'कोणतेही पॉडकास्ट उपलब्ध नाहीत',
    generateContentMessage: 'अॅडमिन पॅनेलमध्ये सामग्री तयार करा',
    dailyPodcastStatus: 'दैनिक नियामक पॉडकास्ट',
    liveLabel: 'थेट'
  },
  'ta': {
    genericTitle: 'செபி மற்றும் ஒழுங்குமுறை தினசரி செய்திகள்',
    genericDescription: 'இந்தியாவின் நிதி ஒழுங்குமுறை சூழல் ஒழுங்குமுறை அமைப்புகளின் முக்கிய புதுப்பிப்புகளுடன் ஆற்றல்மிக்க மாற்றத்திற்கு உட்பட்டுள்ளது।',
    genericEpisodeTitle: 'இன்றைய ஒழுங்குமுறை செய்திகள்: முக்கிய செபி, ரிசர்வ் வங்கி மற்றும் கொள்கை புதுப்பிப்புகள்',
    todayLabel: 'இன்று',
    yesterdayLabel: 'நேற்று',
    availableLabel: '🎧 கிடைக்கும்',
    textOnlyLabel: '📝 உரை மட்டும்',
    audioNotAvailable: 'ஆடியோ கிடைக்கவில்லை',
    noPodcastsMessage: 'பாட்காஸ்ட்கள் எதுவும் கிடைக்கவில்லை',
    generateContentMessage: 'நிர்வாக பேனலில் உள்ளடக்கத்தை உருவாக்கவும்',
    dailyPodcastStatus: 'தினசரி ஒழுங்குமுறை பாட்காஸ்ட்கள்',
    liveLabel: 'நேரடி'
  },
  'te': {
    genericTitle: 'సెబి మరియు నియంత్రణ దైనిక వార్తలు',
    genericDescription: 'భారతదేశ ఆర్థిక నియంత్రణ వాతావరణం నియంత్రణ సంస్థల నుండి ముఖ్య అప్‌డేట్‌లతో చైతన్య మార్పుకు లోనవుతోంది.',
    genericEpisodeTitle: 'నేటి నియంత్రణ వార్తలు: ముఖ్య సెబి, ఆర్‌బిఐ మరియు విధాన అప్‌డేట్‌లు',
    todayLabel: 'ఈరోజు',
    yesterdayLabel: 'నిన్న',
    availableLabel: '🎧 అందుబాటులో',
    textOnlyLabel: '📝 వచనం మాత్రమే',
    audioNotAvailable: 'ఆడియో అందుబాటులో లేదు',
    noPodcastsMessage: 'ఎలాంటి పోడ్‌కాస్ట్‌లు అందుబాటులో లేవు',
    generateContentMessage: 'అడ్మిన్ ప్యానెల్‌లో కంటెంట్ జనరేట్ చేయండి',
    dailyPodcastStatus: 'దైనిక నియంత్రణ పోడ్‌కాస్ట్‌లు',
    liveLabel: 'ప్రత్యక్షం'
  },
  'bn': {
    genericTitle: 'সেবি এবং নিয়ন্ত্রক দৈনিক সংবাদ',
    genericDescription: 'ভারতের আর্থিক নিয়ন্ত্রক পরিবেশ নিয়ন্ত্রক সংস্থাগুলির মূল আপডেটের সাথে গতিশীল রূপান্তরের মধ্য দিয়ে যাচ্ছে।',
    genericEpisodeTitle: 'আজকের নিয়ন্ত্রক সংবাদ: প্রধান সেবি, আরবিআই এবং নীতি আপডেট',
    todayLabel: 'আজ',
    yesterdayLabel: 'গতকাল',
    availableLabel: '🎧 উপলব্ধ',
    textOnlyLabel: '📝 শুধু টেক্সট',
    audioNotAvailable: 'অডিও উপলব্ধ নেই',
    noPodcastsMessage: 'কোন পডকাস্ট উপলব্ধ নেই',
    generateContentMessage: 'অ্যাডমিন প্যানেলে কন্টেন্ট তৈরি করুন',
    dailyPodcastStatus: 'দৈনিক নিয়ন্ত্রক পডকাস্ট',
    liveLabel: 'লাইভ'
  },
  'kn': {
    genericTitle: 'ಸೆಬಿ ಮತ್ತು ನಿಯಂತ್ರಕ ದೈನಂದಿನ ಸುದ್ದಿಗಳು',
    genericDescription: 'ಭಾರತದ ಹಣಕಾಸು ನಿಯಂತ್ರಕ ಪರಿಸರವು ನಿಯಂತ್ರಕ ಸಂಸ್ಥೆಗಳ ಮುಖ್ಯ ಅಪ್‌ಡೇಟ್‌ಗಳೊಂದಿಗೆ ಕ್ರಿಯಾತ್ಮಕ ರೂಪಾಂತರಕ್ಕೆ ಒಳಗಾಗುತ್ತಿದೆ।',
    genericEpisodeTitle: 'ಇಂದಿನ ನಿಯಂತ್ರಕ ಸುದ್ದಿಗಳು: ಪ್ರಮುಖ ಸೆಬಿ, ಆರ್‌ಬಿಐ ಮತ್ತು ನೀತಿ ಅಪ್‌ಡೇಟ್‌ಗಳು',
    todayLabel: 'ಇಂದು',
    yesterdayLabel: 'ನಿನ್ನೆ',
    availableLabel: '🎧 ಲಭ್ಯವಿದೆ',
    textOnlyLabel: '📝 ಪಠ್ಯ ಮಾತ್ರ',
    audioNotAvailable: 'ಆಡಿಯೋ ಲಭ್ಯವಿಲ್ಲ',
    noPodcastsMessage: 'ಯಾವುದೇ ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗಳು ಲಭ್ಯವಿಲ್ಲ',
    generateContentMessage: 'ಅಡ್ಮಿನ್ ಪ್ಯಾನೆಲ್‌ನಲ್ಲಿ ವಿಷಯವನ್ನು ಸೃಷ್ಟಿಸಿ',
    dailyPodcastStatus: 'ದೈನಂದಿನ ನಿಯಂತ್ರಕ ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗಳು',
    liveLabel: 'ನೇರ'
  },
  'ml': {
    genericTitle: 'സെബി, നിയന്ത്രണ ദിനംപ്രതി വാർത്തകൾ',
    genericDescription: 'ഇന്ത്യയുടെ സാമ്പത്തിക നിയന്ത്രണ പരിതസ്ഥിതി നിയന്ത്രണ സ്ഥാപനങ്ങളിൽ നിന്നുള്ള പ്രധാന അപ്‌ഡേറ്റുകളുമായി ചലനാത്മക പരിവർത്തനത്തിന് വിധേയമാകുന്നു.',
    genericEpisodeTitle: 'ഇന്നത്തെ നിയന്ത്രണ വാർത്തകൾ: പ്രധാന സെബി, ആർബിഐ, നയ അപ്‌ഡേറ്റുകൾ',
    todayLabel: 'ഇന്ന്',
    yesterdayLabel: 'ഇന്നലെ',
    availableLabel: '🎧 ലഭ്യമാണ്',
    textOnlyLabel: '📝 ടെക്സ്റ്റ് മാത്രം',
    audioNotAvailable: 'ഓഡിയോ ലഭ്യമല്ല',
    noPodcastsMessage: 'പോഡ്‌കാസ്റ്റുകളൊന്നും ലഭ്യമല്ല',
    generateContentMessage: 'അഡ്മിൻ പാനലിൽ ഉള്ളടക്കം സൃഷ്ടിക്കുക',
    dailyPodcastStatus: 'ദിനംപ്രതി നിയന്ത്രണ പോഡ്‌കാസ്റ്റുകൾ',
    liveLabel: 'തത്സമയം'
  },
  'pa': {
    genericTitle: 'ਸੇਬੀ ਅਤੇ ਨਿਯਮਕ ਰੋਜ਼ਾਨਾ ਖ਼ਬਰਾਂ',
    genericDescription: 'ਭਾਰਤ ਦਾ ਵਿੱਤੀ ਨਿਯਮਕ ਮਾਹੌਲ ਨਿਯਮਕ ਸੰਸਥਾਵਾਂ ਤੋਂ ਮੁੱਖ ਅਪਡੇਟਾਂ ਨਾਲ ਗਤੀਸ਼ੀਲ ਤਬਦੀਲੀ ਵਿੱਚੋਂ ਲੰਘ ਰਿਹਾ ਹੈ।',
    genericEpisodeTitle: 'ਅੱਜ ਦੀਆਂ ਨਿਯਮਕ ਖ਼ਬਰਾਂ: ਮੁੱਖ ਸੇਬੀ, ਆਰਬੀਆਈ ਅਤੇ ਨੀਤੀ ਅਪਡੇਟ',
    todayLabel: 'ਅੱਜ',
    yesterdayLabel: 'ਕੱਲ',
    availableLabel: '🎧 ਉਪਲਬਧ',
    textOnlyLabel: '📝 ਸਿਰਫ਼ ਟੈਕਸਟ',
    audioNotAvailable: 'ਆਡੀਓ ਉਪਲਬਧ ਨਹੀਂ',
    noPodcastsMessage: 'ਕੋਈ ਪੋਡਕਾਸਟ ਉਪਲਬਧ ਨਹੀਂ',
    generateContentMessage: 'ਐਡਮਿਨ ਪੈਨਲ ਵਿੱਚ ਸਮਗਰੀ ਬਣਾਓ',
    dailyPodcastStatus: 'ਰੋਜ਼ਾਨਾ ਨਿਯਮਕ ਪੋਡਕਾਸਟ',
    liveLabel: 'ਲਾਈਵ'
  }
};

export function getPodcastDisplayTexts(languageCode: string): PodcastDisplayTexts {
  return PODCAST_DISPLAY_TRANSLATIONS[languageCode] || PODCAST_DISPLAY_TRANSLATIONS['en'];
}

// Helper function to get generic localized title for fallback
export function getGenericPodcastTitle(languageCode: string): string {
  const texts = getPodcastDisplayTexts(languageCode);
  const currentDate = new Date().toLocaleDateString();
  return `${texts.genericTitle} - ${currentDate}`;
}

// Helper function to get generic localized episode title for fallback  
export function getGenericEpisodeTitle(languageCode: string): string {
  const texts = getPodcastDisplayTexts(languageCode);
  return texts.genericEpisodeTitle;
}

// Helper function to get generic description for fallback
export function getGenericPodcastDescription(languageCode: string): string {
  const texts = getPodcastDisplayTexts(languageCode);
  return texts.genericDescription;
}
