"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function PortfolioDiversificationPage() {
  const lessonData = {
    title: "The Principle of Portfolio Diversification",
    description: "Don't put all your eggs in one basket. Learn the most important principle for managing investment risk.",
    lessonSlug: "the-principle-of-portfolio-diversification",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-mr.m4a"
    },
    transcript: {
      en: "The Principle of Portfolio Diversification: Don't put all your eggs in one basket. Learn the most important principle for managing investment risk and how to diversify effectively.",
      hi: "पोर्टफोलियो विविधीकरण का सिद्धांत: अपने सभी अंडे एक टोकरी में न रखें। निवेश जोखिम का प्रबंधन करने के लिए सबसे महत्वपूर्ण सिद्धांत सीखें।",
      bn: "পোর্টফোলিও বৈচিত্র্যের নীতি: আপনার সমস্ত ডিম একটি ঝুড়িতে রাখবেন না। বিনিয়োগের ঝুঁকি পরিচালনার জন্য সবচেয়ে গুরুত্বপূর্ণ নীতি শিখুন।",
      ta: "போர்ட்ஃபோலியோ பல்வகைப்படுத்தலின் கோட்பாடு: உங்கள் எல்லா முட்டைகளையும் ஒரே கூடையில் வைக்காதீர்கள். முதலீட்டு அபாயத்தை நிர்வகிப்பதற்கான மிக முக்கியமான கொள்கையைக் கற்றுக்கொள்ளுங்கள்।",
      mr: "पोर्टफोलिओ विविधीकरणाचे तत्त्व: तुमची सर्व अंडी एकाच टोपलीत ठेवू नका. गुंतवणूक जोखीम व्यवस्थापनासाठी सर्वात महत्वाचे तत्त्व शिका।"
    },
    parts: [
      {
        id: 'introduction',
        title: 'Introduction to Portfolio Diversification',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                Don't put all your eggs in one basket. Learn the most important principle for managing investment risk.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What is Portfolio Diversification?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Portfolio diversification is the practice of spreading investments across various financial instruments, industries, and other categories to reduce exposure to any single asset or risk.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                <p className="text-lg font-semibold text-green-800">
                  The golden rule: "Don't put all your eggs in one basket!"
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• What portfolio diversification means</li>
                  <li>• Why diversification is crucial</li>
                  <li>• Types of investment risk</li>
                  <li>• How to diversify effectively</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduces portfolio volatility</li>
                  <li>• Protects against single-asset losses</li>
                  <li>• Improves long-term returns</li>
                  <li>• Provides peace of mind</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'quiz',
        title: 'Test Your Knowledge',
        isRequired: true,
        type: 'quiz' as const,
        minScore: 70,
        content: (
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">
                Portfolio Diversification Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of portfolio diversification!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is the main goal of portfolio diversification?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Maximize returns</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Reduce risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Minimize taxes</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Which saying best describes diversification?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Don't put all your eggs in one basket</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Time is money</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Buy low, sell high</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. Diversification helps reduce which type of risk?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Systematic risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Unsystematic risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Inflation risk</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  };

  const handleComplete = () => {
    console.log('Lesson completed!');
  };

  const handlePartComplete = (partId: string) => {
    console.log(`Part ${partId} completed!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {lessonData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {lessonData.description}
          </p>
          
          <AudioSummary
            title={lessonData.title}
            description={lessonData.description}
            hindiAudioUrl={lessonData.audioFiles.hi}
            englishAudioUrl={lessonData.audioFiles.en}
            bengaliAudioUrl={lessonData.audioFiles.bn}
            tamilAudioUrl={lessonData.audioFiles.ta}
            marathiAudioUrl={lessonData.audioFiles.mr}
            hindiTranscript={lessonData.transcript.hi}
            englishTranscript={lessonData.transcript.en}
            bengaliTranscript={lessonData.transcript.bn}
            tamilTranscript={lessonData.transcript.ta}
            marathiTranscript={lessonData.transcript.mr}
          />
        </div>
        
        <MultiPartLesson
          parts={lessonData.parts}
          onComplete={handleComplete}
          onPartComplete={handlePartComplete}
        />
      </div>
    </div>
  );
}