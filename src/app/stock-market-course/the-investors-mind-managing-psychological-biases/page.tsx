"use client";

import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';

export default function PsychologicalBiasesPage() {
  const lessonData = {
    title: "The Investor's Mind: Managing Psychological Biases",
    description: "The biggest enemy in investing is often not the market, but yourself. Learn to overcome common psychological biases.",
    lessonSlug: "the-investors-mind-managing-psychological-biases",
    audioFiles: {
      en: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-en.m4a",
      hi: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-hi.m4a",
      bn: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-bn.m4a",
      ta: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-ta.m4a",
      mr: "https://storage.googleapis.com/getclarity-audio-bucket/lessons/advanced-topics/psychological-biases-mr.m4a"
    },
    transcript: {
      en: "The Investor's Mind: Managing Psychological Biases. The biggest enemy in investing is often not the market, but yourself. Learn to overcome common psychological biases that can derail your investment strategy.",
      hi: "निवेशक का मन: मनोवैज्ञानिक पूर्वाग्रहों का प्रबंधन। निवेश में सबसे बड़ा शत्रु अक्सर बाजार नहीं, बल्कि आप खुद होते हैं।",
      bn: "বিনিয়োগকারীর মন: মনস্তাত্ত্বিক পক্ষপাত ব্যবস্থাপনা। বিনিয়োগে সবচেয়ে বড় শত্রু প্রায়ই বাজার নয়, বরং আপনি নিজেই।",
      ta: "முதலீட்டாளரின் மனம்: உளவியல் சார்புகளை நிர்வகித்தல். முதலீட்டில் மிகப்பெரிய எதிரி பெரும்பாலும் சந்தை அல்ல, மாறாக நீங்களே.",
      mr: "गुंतवणूकदाराचे मन: मानसशास्त्रीय पूर्वाग्रह व्यवस्थापन। गुंतवणुकीत सर्वात मोठा शत्रू अनेकदा बाजार नसून तुम्ही स्वतःच असतात."
    },
    parts: [
      {
        id: 'introduction',
        title: 'Introduction to Psychological Biases',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                What You'll Learn
              </h3>
              <p className="text-blue-700">
                The biggest enemy in investing is often not the market, but yourself. Learn to overcome common psychological biases.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                What Are Psychological Biases?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Psychological biases are systematic patterns of thinking that cause people to deviate from rationality and optimal decision-making. In investing, these biases can lead to poor choices that hurt your returns.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                <p className="text-lg font-semibold text-red-800">
                  Your brain is wired for survival, not for investing!
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Common psychological biases</li>
                  <li>• Real-world examples</li>
                  <li>• Strategies to overcome biases</li>
                  <li>• Building emotional discipline</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Why It Matters</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Biases can cost you money</li>
                  <li>• Emotional decisions often fail</li>
                  <li>• Discipline leads to success</li>
                  <li>• Self-awareness is key</li>
                </ul>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'common-biases',
        title: 'Common Investment Biases',
        isRequired: true,
        type: 'content' as const,
        content: (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                The Big Three Investment Biases
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Let's explore the most common and costly psychological biases that affect investors.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h4 className="text-xl font-semibold text-red-800 mb-3">1. Loss Aversion</h4>
                <p className="text-red-700 mb-3">
                  People feel the pain of losing money twice as strongly as the pleasure of gaining the same amount. This leads to holding losing investments too long and selling winners too early.
                </p>
                <div className="bg-white p-3 rounded border border-red-200">
                  <p className="text-red-800 font-medium">Example:</p>
                  <p className="text-red-700 text-sm">Refusing to sell a stock that's down 20% while quickly selling one that's up 10%.</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="text-xl font-semibold text-blue-800 mb-3">2. Confirmation Bias</h4>
                <p className="text-blue-700 mb-3">
                  The tendency to search for and interpret information that confirms your existing beliefs while ignoring contradictory evidence.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-blue-800 font-medium">Example:</p>
                  <p className="text-blue-700 text-sm">Only reading positive news about stocks you own and dismissing negative reports.</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h4 className="text-xl font-semibold text-green-800 mb-3">3. Overconfidence Bias</h4>
                <p className="text-green-700 mb-3">
                  Believing you have superior investment skills or knowledge, leading to excessive trading and risk-taking.
                </p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-green-800 font-medium">Example:</p>
                  <p className="text-green-700 text-sm">Day trading frequently because you think you can time the market better than professionals.</p>
                </div>
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
                Psychological Biases Quiz
              </h3>
              <p className="text-purple-700 mb-4">
                Let's test your understanding of investment psychology!
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">1. What is loss aversion?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="a" className="mr-2" />
                      <span>Fear of taking any investment risk</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="b" className="mr-2" />
                      <span>Feeling losses more strongly than gains</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q1" value="c" className="mr-2" />
                      <span>Avoiding the stock market entirely</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">2. Confirmation bias involves:</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="a" className="mr-2" />
                      <span>Seeking information that confirms your beliefs</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="b" className="mr-2" />
                      <span>Double-checking all investment decisions</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q2" value="c" className="mr-2" />
                      <span>Getting confirmation from your broker</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium mb-3">3. How can you overcome psychological biases?</p>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="a" className="mr-2" />
                      <span>Trust your gut feelings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="b" className="mr-2" />
                      <span>Create rules and stick to them</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="q3" value="c" className="mr-2" />
                      <span>Trade more frequently</span>
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