"use client";

import { CheckCircle, BookOpen, Lightbulb, Target } from 'lucide-react';

interface LessonContentProps {
  language: string;
  lessonId: string;
}

export default function LessonContent({ language, lessonId }: LessonContentProps) {
  // Mock content data - replace with actual content from JSON files
  const getContent = () => {
    const content = {
      en: {
        title: "Market Fundamentals",
        introduction: "Welcome to the comprehensive Market Fundamentals course on GetClarity.finance. This foundational course is designed to equip you with the essential knowledge needed to understand and participate in stock markets effectively.",
        keyConcepts: [
          "Understanding what stocks represent and their role in business ownership",
          "Different types of stocks and their characteristics",
          "How stock markets function as trading platforms",
          "The process of buying and selling stocks"
        ],
        sections: [
          {
            title: "What is a Stock?",
            content: "A stock represents ownership in a company. When you buy a stock, you're purchasing a small piece of that company, called a share. This ownership gives you certain rights, such as voting on company decisions and receiving a portion of the company's profits through dividends."
          },
          {
            title: "Types of Stocks",
            content: "There are several types of stocks: Common stocks give you voting rights and potential dividends, while preferred stocks offer fixed dividends but usually no voting rights. Growth stocks are from companies expected to grow rapidly, while value stocks are from companies that may be undervalued."
          },
          {
            title: "Stock Markets",
            content: "Stock markets are organized exchanges where buyers and sellers meet to trade stocks. Major exchanges include the New York Stock Exchange (NYSE) and NASDAQ. These markets provide liquidity, allowing investors to easily buy and sell their shares."
          },
          {
            title: "Trading Process",
            content: "Trading stocks involves placing orders through a broker. Market orders are executed immediately at current prices, while limit orders are executed only at specified prices. Understanding order types helps you trade more effectively."
          }
        ],
        examples: [
          {
            title: "Example: Buying Apple Stock",
            description: "When you buy one share of Apple stock, you own a tiny fraction of Apple Inc. If Apple makes a profit and decides to pay dividends, you'll receive a portion based on your ownership. You also get to vote on important company decisions."
          },
          {
            title: "Example: Market vs Limit Orders",
            description: "A market order to buy 10 shares of Tesla at $250 will execute immediately at the current market price. A limit order to buy 10 shares at $240 will only execute if the price drops to $240 or below."
          }
        ],
        summary: "Market fundamentals form the foundation of your investment education. Understanding stocks, markets, and trading processes will prepare you for more advanced investment strategies and help you make informed decisions."
      },
      hi: {
        title: "बाजार के मूल सिद्धांत",
        introduction: "GetClarity.finance पर व्यापक बाजार मूल सिद्धांत पाठ्यक्रम में आपका स्वागत है। यह मूलभूत पाठ्यक्रम आपको स्टॉक बाजारों को प्रभावी ढंग से समझने और भाग लेने के लिए आवश्यक ज्ञान प्रदान करने के लिए डिज़ाइन किया गया है।",
        keyConcepts: [
          "समझना कि स्टॉक क्या प्रतिनिधित्व करते हैं और व्यवसाय स्वामित्व में उनकी भूमिका",
          "विभिन्न प्रकार के स्टॉक और उनकी विशेषताएं",
          "स्टॉक बाजार कैसे ट्रेडिंग प्लेटफॉर्म के रूप में काम करते हैं",
          "स्टॉक खरीदने और बेचने की प्रक्रिया"
        ],
        sections: [
          {
            title: "स्टॉक क्या है?",
            content: "एक स्टॉक कंपनी में स्वामित्व का प्रतिनिधित्व करता है। जब आप स्टॉक खरीदते हैं, तो आप उस कंपनी का एक छोटा सा टुकड़ा खरीद रहे होते हैं, जिसे शेयर कहा जाता है। यह स्वामित्व आपको कुछ अधिकार देता है, जैसे कंपनी के निर्णयों पर मतदान करना और लाभांश के माध्यम से कंपनी के लाभ का एक हिस्सा प्राप्त करना।"
          },
          {
            title: "स्टॉक के प्रकार",
            content: "स्टॉक के कई प्रकार हैं: कॉमन स्टॉक आपको मतदान अधिकार और संभावित लाभांश देते हैं, जबकि प्रेफर्ड स्टॉक निश्चित लाभांश प्रदान करते हैं लेकिन आमतौर पर कोई मतदान अधिकार नहीं। ग्रोथ स्टॉक उन कंपनियों से हैं जो तेजी से बढ़ने की उम्मीद रखती हैं, जबकि वैल्यू स्टॉक उन कंपनियों से हैं जो कम मूल्यांकित हो सकती हैं।"
          },
          {
            title: "स्टॉक बाजार",
            content: "स्टॉक बाजार संगठित एक्सचेंज हैं जहां खरीदार और विक्रेता स्टॉक ट्रेड करने के लिए मिलते हैं। प्रमुख एक्सचेंजों में न्यूयॉर्क स्टॉक एक्सचेंज (NYSE) और NASDAQ शामिल हैं। ये बाजार तरलता प्रदान करते हैं, जिससे निवेशक आसानी से अपने शेयर खरीद और बेच सकते हैं।"
          },
          {
            title: "ट्रेडिंग प्रक्रिया",
            content: "स्टॉक ट्रेडिंग में ब्रोकर के माध्यम से ऑर्डर रखना शामिल है। मार्केट ऑर्डर वर्तमान कीमतों पर तुरंत निष्पादित होते हैं, जबकि लिमिट ऑर्डर केवल निर्दिष्ट कीमतों पर निष्पादित होते हैं। ऑर्डर प्रकारों को समझना आपको अधिक प्रभावी ढंग से ट्रेड करने में मदद करता है।"
          }
        ],
        examples: [
          {
            title: "उदाहरण: Apple स्टॉक खरीदना",
            description: "जब आप Apple स्टॉक का एक शेयर खरीदते हैं, तो आप Apple Inc. का एक छोटा सा अंश रखते हैं। यदि Apple लाभ कमाता है और लाभांश देने का फैसला करता है, तो आपको अपने स्वामित्व के आधार पर एक हिस्सा मिलेगा। आपको महत्वपूर्ण कंपनी निर्णयों पर मतदान करने का भी अधिकार मिलता है।"
          },
          {
            title: "उदाहरण: मार्केट बनाम लिमिट ऑर्डर",
            description: "Tesla के 10 शेयर $250 पर खरीदने का मार्केट ऑर्डर वर्तमान बाजार मूल्य पर तुरंत निष्पादित होगा। $240 पर 10 शेयर खरीदने का लिमिट ऑर्डर केवल तभी निष्पादित होगा जब कीमत $240 या उससे नीचे आ जाए।"
          }
        ],
        summary: "बाजार के मूल सिद्धांत आपकी निवेश शिक्षा की नींव बनाते हैं। स्टॉक, बाजार और ट्रेडिंग प्रक्रियाओं को समझना आपको अधिक उन्नत निवेश रणनीतियों के लिए तैयार करेगा और सूचित निर्णय लेने में मदद करेगा।"
      }
    };
    return content[language as keyof typeof content] || content.en;
  };

  const content = getContent();

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Introduction</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{content.introduction}</p>
      </div>

      {/* Key Concepts */}
      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-800">Key Concepts</h3>
        </div>
        <ul className="space-y-3">
          {content.keyConcepts.map((concept, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{concept}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          Detailed Learning
        </h3>
        
        {content.sections.map((section, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h4>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Examples */}
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Real-World Examples</h3>
        <div className="space-y-4">
          {content.examples.map((example, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-gray-800 mb-2">{example.title}</h4>
              <p className="text-gray-700 text-sm">{example.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Summary</h3>
        <p className="text-gray-700 leading-relaxed">{content.summary}</p>
      </div>
    </div>
  );
}
