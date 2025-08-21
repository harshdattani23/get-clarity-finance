"use client";

import { ChevronDown, ChevronUp } from 'lucide-react';

interface TranscriptPanelProps {
  language: string;
  lessonId: string;
  isVisible: boolean;
  onToggle: (visible: boolean) => void;
}

export default function TranscriptPanel({ 
  language, 
  isVisible, 
  onToggle 
}: TranscriptPanelProps) {
  // Mock transcript data - replace with actual content
  const getTranscript = () => {
    const transcripts = {
      en: "Welcome to the Market Fundamentals course on GetClarity.finance. This comprehensive course covers the essential basics of stock markets and is perfect for beginners starting their investment journey. The course includes four key modules: What is a Stock, Different Types of Stocks, What is a Stock Market, and How Stocks Are Traded. In the first module, you'll learn what stocks represent and how they give you ownership in companies. The second module explores various stock categories including common stocks, preferred stocks, and growth versus value stocks. The third module explains how stock markets function as platforms where buyers and sellers meet. Finally, the fourth module covers the trading process, including order types and how trades are executed. This foundation will prepare you for more advanced topics in your investment education.",
      hi: "GetClarity.finance पर Market Fundamentals कोर्स में आपका स्वागत है। यह व्यापक कोर्स स्टॉक मार्केट के आवश्यक बुनियादी सिद्धांतों को कवर करता है और निवेश यात्रा शुरू करने वाले शुरुआती लोगों के लिए बिल्कुल सही है। कोर्स में चार महत्वपूर्ण मॉड्यूल शामिल हैं: स्टॉक क्या है, विभिन्न प्रकार के स्टॉक, स्टॉक मार्केट क्या है, और स्टॉक कैसे ट्रेड किए जाते हैं। पहले मॉड्यूल में, आप सीखेंगे कि स्टॉक क्या प्रतिनिधित्व करते हैं और कैसे आपको कंपनियों में स्वामित्व देते हैं। दूसरा मॉड्यूल विभिन्न स्टॉक श्रेणियों की खोज करता है जिसमें कॉमन स्टॉक, प्रेफर्ड स्टॉक, और ग्रोथ बनाम वैल्यू स्टॉक शामिल हैं। तीसरा मॉड्यूल बताता है कि स्टॉक मार्केट कैसे प्लेटफॉर्म के रूप में काम करते हैं जहां खरीदार और विक्रेता मिलते हैं। अंत में, चौथा मॉड्यूल ट्रेडिंग प्रक्रिया को कवर करता है, जिसमें ऑर्डर के प्रकार और ट्रेड कैसे निष्पादित किए जाते हैं शामिल हैं। यह आधार आपको अपने निवेश शिक्षा में अधिक उन्नत विषयों के लिए तैयार करेगा।",
      bn: "GetClarity.finance-এ Market Fundamentals কোর্সে আপনাকে স্বাগতম। এই বিস্তৃত কোর্সে স্টক মার্কেটের প্রয়োজনীয় মৌলিক বিষয়গুলি অন্তর্ভুক্ত রয়েছে এবং নবীন বিনিয়োগকারীদের জন্য উপযুক্ত। কোর্সে চারটি মূল মডিউল রয়েছে: স্টক কী, বিভিন্ন ধরনের স্টক, স্টক মার্কেট কী, এবং স্টক কীভাবে ট্রেড করা হয়। প্রথম মডিউলে, আপনি শিখবেন স্টক কী প্রতিনিধিত্ব করে এবং কীভাবে তারা আপনাকে কোম্পানিতে মালিকানা দেয়। দ্বিতীয় মডিউল বিভিন্ন স্টক বিভাগ অন্বেষণ করে যার মধ্যে কমন স্টক, প্রেফার্ড স্টক, এবং গ্রোথ বনাম ভ্যালু স্টক অন্তর্ভুক্ত। তৃতীয় মডিউল ব্যাখ্যা করে স্টক মার্কেট কীভাবে প্ল্যাটফর্ম হিসাবে কাজ করে যেখানে ক্রেতা এবং বিক্রেতারা মিলিত হয়। শেষে, চতুর্থ মডিউল ট্রেডিং প্রক্রিয়া কভার করে, যার মধ্যে অর্ডার টাইপ এবং ট্রেড কীভাবে কার্যকর করা হয় অন্তর্ভুক্ত। এই ভিত্তি আপনাকে আপনার বিনিয়োগ শিক্ষায় আরও উন্নত বিষয়গুলির জন্য প্রস্তুত করবে।",
      mr: "GetClarity.finance वर Market Fundamentals अभ्यासक्रमात आपले स्वागत आहे. या व्यापक अभ्यासक्रमात स्टॉक मार्केटच्या आवश्यक मूलभूत गोष्टींचा समावेश आहे आणि नवीन गुंतवणूकदारांसाठी योग्य आहे. अभ्यासक्रमात चार महत्त्वाचे मॉड्यूल्स आहेत: स्टॉक काय आहे, विविध प्रकारचे स्टॉक, स्टॉक मार्केट काय आहे, आणि स्टॉक कसे व्यापारले जातात. पहिल्या मॉड्यूलमध्ये, आपण शिकाल की स्टॉक काय दर्शवतात आणि कसे ते आपल्याला कंपन्यांमध्ये मालकी देतात. दुसरा मॉड्यूल विविध स्टॉक श्रेणींचा शोध घेतो ज्यामध्ये कॉमन स्टॉक, प्रेफर्ड स्टॉक, आणि ग्रोथ विरुद्ध वॅल्यू स्टॉक समाविष्ट आहेत. तिसरा मॉड्यूल स्पष्ट करतो की स्टॉक मार्केट कसे प्लॅटफॉर्म म्हणून काम करतात जिथे खरेदीदार आणि विक्रेते भेटतात. शेवटी, चौथा मॉड्यूल व्यापार प्रक्रिया कवर करतो, ज्यामध्ये ऑर्डर प्रकार आणि व्यापार कसे कार्यान्वित केले जातात यांचा समावेश आहे. हा पाया आपल्याला आपल्या गुंतवणूक शिक्षणात अधिक प्रगत विषयांसाठी तयार करेल.",
      ta: "GetClarity.finance இல் Market Fundamentals பாடத்திட்டத்திற்கு வரவேற்கிறோம். இந்த விரிவான பாடத்திட்டம் பங்கு சந்தைகளின் அத்தியாவசிய அடிப்படைகளை உள்ளடக்கியது மற்றும் புதிய முதலீட்டாளர்களுக்கு ஏற்றது. பாடத்திட்டத்தில் நான்கு முக்கிய தொகுதிகள் உள்ளன: பங்கு என்ன, பல்வேறு வகையான பங்குகள், பங்கு சந்தை என்ன, மற்றும் பங்குகள் எவ்வாறு வர்த்தகம் செய்யப்படுகின்றன. முதல் தொகுதியில், பங்குகள் எதைக் குறிக்கின்றன மற்றும் அவை எவ்வாறு நிறுவனங்களில் உங்களுக்கு உரிமையைக் கொடுக்கின்றன என்பதை நீங்கள் கற்றுக்கொள்வீர்கள். இரண்டாவது தொகுதி பல்வேறு பங்கு வகைகளை ஆராய்கிறது, இதில் பொதுவான பங்குகள், முன்னுரிமை பங்குகள் மற்றும் வளர்ச்சி மற்றும் மதிப்பு பங்குகள் அடங்கும். மூன்றாவது தொகுதி வாங்குபவர்கள் மற்றும் விற்பவர்கள் சந்திக்கும் தளங்களாக பங்கு சந்தைகள் எவ்வாறு இயங்குகின்றன என்பதை விளக்குகிறது. இறுதியாக, நான்காவது தொகுதி வர்த்தக செயல்முறையை உள்ளடக்கியது, இதில் ஆர்டர் வகைகள் மற்றும் வர்த்தகங்கள் எவ்வாறு செயல்படுத்தப்படுகின்றன என்பது அடங்கும். இந்த அடிப்படை உங்கள் முதலீட்டு கல்வியில் மேலும் மேம்பட்ட தலைப்புகளுக்கு உங்களை தயார்படுத்தும்.",
      gu: "GetClarity.finance પર Market Fundamentals કોર્સમાં આપનું સ્વાગત છે. આ વ્યાપક કોર્સ સ્ટોક માર્કેટના આવશ્યક મૂળભૂત સિદ્ધાંતોને આવરે છે અને નવા રોકાણકારો માટે યોગ્ય છે. કોર્સમાં ચાર મુખ્ય મોડ્યુલ્સ છે: સ્ટોક શું છે, વિવિધ પ્રકારના સ્ટોક, સ્ટોક માર્કેટ શું છે, અને સ્ટોક કેવી રીતે વેપાર કરવામાં આવે છે. પહેલા મોડ્યુલમાં, તમે શીખશો કે સ્ટોક શું રજૂ કરે છે અને કેવી રીતે તેઓ તમને કંપનીઓમાં માલિકી આપે છે. બીજું મોડ્યુલ વિવિધ સ્ટોક શ્રેણીઓની શોધ કરે છે જેમાં કોમન સ્ટોક, પ્રેફર્ડ સ્ટોક, અને ગ્રોથ વર્સસ વેલ્યુ સ્ટોક સમાવેશ થાય છે. ત્રીજું મોડ્યુલ સમજાવે છે કે સ્ટોક માર્કેટ કેવી રીતે પ્લેટફોર્મ તરીકે કામ કરે છે જ્યાં ખરીદદારો અને વેચનારાઓ મળે છે. છેલ્લે, ચોથું મોડ્યુલ વેપાર પ્રક્રિયા આવરે છે, જેમાં ઓર્ડર પ્રકારો અને વેપાર કેવી રીતે કરવામાં આવે છે તે સમાવેશ થાય છે. આ પાયો તમને તમારા રોકાણ શિક્ષણમાં વધુ અદ્યતન વિષયો માટે તૈયાર કરશે."
    };
    return transcripts[language as keyof typeof transcripts] || transcripts.en;
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Transcript ({language.toUpperCase()})
        </h4>
        <button
          onClick={() => onToggle(!isVisible)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isVisible ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Transcript
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Transcript
            </>
          )}
        </button>
      </div>
      
      {isVisible && (
        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
          <p className="text-gray-700 leading-relaxed text-sm">
            {getTranscript()}
          </p>
        </div>
      )}
    </div>
  );
}
