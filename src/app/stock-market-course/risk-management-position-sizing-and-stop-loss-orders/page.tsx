"use client";

import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';
import MultiPartLesson from '@/components/stock-market-course/MultiPartLesson';
import AudioSummary from '@/components/stock-market-course/AudioSummary';
import ConfirmationCheck from '@/components/stock-market-course/ConfirmationCheck';
import InteractiveQuiz from '@/components/stock-market-course/InteractiveQuiz';
import InteractiveSelection from '@/components/stock-market-course/InteractiveSelection';
import ShortQuestions from '@/components/stock-market-course/ShortQuestions';

export default function RiskManagementPage() {
  const { t } = useTranslation('stock-market-course.risk-management-position-sizing-and-stop-loss-orders');
  const [totalScore, setTotalScore] = useState(0);
  const [partScores, setPartScores] = useState<Record<string, number>>({});

  const handleComplete = (score: number) => {
    setTotalScore(score);
    console.log(`Lesson completed with total score: ${score}`);
  };

  const handlePartComplete = (partId: string, score: number) => {
    setPartScores(prev => ({ ...prev, [partId]: score }));
    console.log(`Part ${partId} completed with score: ${score}`);
  };

  const lessonParts = [
    {
      id: 'introduction',
      title: 'Introduction to Risk Management',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <p className="text-red-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="Risk Management: Position Sizing and Stop-Loss Orders"
            description="Learn to protect your capital with two of the most critical risk management techniques: position sizing and stop-loss orders."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/risk-management-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Position sizing principles</li>
                <li>• Stop-loss order implementation</li>
                <li>• Risk calculation methods</li>
                <li>• Capital preservation strategies</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Why It Matters</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Protects your trading capital</li>
                <li>• Prevents emotional decisions</li>
                <li>• Ensures long-term survival</li>
                <li>• Builds consistent profitability</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'position-sizing',
      title: 'Position Sizing: How Much to Risk?',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">{t('section1_title') as string}</h3>
            <p className="text-blue-700 text-lg mb-4">{t('section1_p1') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">The 1% Rule</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section1_l1') as string }} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Calculating Position Size</h4>
              <div className="space-y-3">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('section1_l2') as string }} />
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <p className="text-green-800" dangerouslySetInnerHTML={{ __html: t('section1_l3') as string }} />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">Example Calculation</h4>
            <div className="text-yellow-700 space-y-2">
              <p><strong>Portfolio Value:</strong> ₹1,00,000</p>
              <p><strong>Risk Percentage:</strong> 1% = ₹1,000</p>
              <p><strong>Entry Price:</strong> ₹100</p>
              <p><strong>Stop-Loss:</strong> ₹95</p>
              <p><strong>Risk per Share:</strong> ₹5</p>
              <p><strong>Position Size:</strong> ₹1,000 ÷ ₹5 = 200 shares</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'position-sizing-quiz',
      title: 'Position Sizing Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'position-sizing-q1',
              question: "What is the maximum percentage of your trading capital you should risk on a single trade according to the 1% rule?",
              options: [
                "0.5%",
                "1%",
                "2%",
                "5%"
              ],
              correctAnswer: 1,
              explanation: "The 1% rule states that you should never risk more than 1% of your total trading capital on a single trade."
            },
            {
              id: 'position-sizing-q2',
              question: "If you have a ₹50,000 portfolio and follow the 1% rule, what is the maximum amount you should risk on one trade?",
              options: [
                "₹250",
                "₹500",
                "₹1,000",
                "₹2,500"
              ],
              correctAnswer: 1,
              explanation: "1% of ₹50,000 = ₹500. This is the maximum amount you should risk on a single trade."
            },
            {
              id: 'position-sizing-q3',
              question: "What is the main purpose of position sizing?",
              options: [
                "To maximize profits on winning trades",
                "To control risk and prevent large losses",
                "To increase the number of trades you can make",
                "To reduce trading fees"
              ],
              correctAnswer: 1,
              explanation: "Position sizing is primarily about controlling risk and preventing large losses that could wipe out a significant portion of your account."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('position-sizing-quiz', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 70,
      skipAllowed: false
    },
    {
      id: 'stop-losses',
      title: 'Stop-Loss Orders: Your Automated Safety Net',
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">{t('section2_title') as string}</h3>
            <p className="text-orange-700 text-lg mb-4">{t('section2_p1') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">How Stop-Losses Work</h4>
              <div className="space-y-3 text-gray-700">
                <p>• Automatically sell when price hits target</p>
                <p>• Removes emotion from selling decisions</p>
                <p>• Limits maximum loss on any position</p>
                <p>• Provides peace of mind</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Stop-Loss Example</h4>
              <div className="space-y-3 text-gray-700">
                <p><strong>Buy Price:</strong> ₹100</p>
                <p><strong>Stop-Loss:</strong> ₹95</p>
                <p><strong>Maximum Loss:</strong> ₹5 per share</p>
                <p><strong>Loss Percentage:</strong> 5%</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-800 mb-3">⚠️ Important Considerations</h4>
            <div className="text-red-700 space-y-2">
              <p>• Stop-losses can be triggered by temporary price spikes</p>
              <p>• Consider using trailing stop-losses for winning positions</p>
              <p>• Don't place stops too close to current price</p>
              <p>• Review and adjust stops as positions develop</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'stop-loss-quiz',
      title: 'Stop-Loss Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'stop-loss-q1',
              question: "What is the primary purpose of a stop-loss order?",
              options: [
                "To maximize profits",
                "To limit losses on a position",
                "To increase trading volume",
                "To reduce trading fees"
              ],
              correctAnswer: 1,
              explanation: "Stop-loss orders are designed to automatically sell a security when it reaches a certain price to limit an investor's loss on a position."
            },
            {
              id: 'stop-loss-q2',
              question: "If you buy a stock at ₹200 and set a stop-loss at ₹190, what is your maximum loss per share?",
              options: [
                "₹5",
                "₹10",
                "₹15",
                "₹20"
              ],
              correctAnswer: 1,
              explanation: "The maximum loss per share is the difference between the buy price (₹200) and the stop-loss price (₹190), which is ₹10."
            },
            {
              id: 'stop-loss-q3',
              question: "Which of the following is NOT a benefit of using stop-loss orders?",
              options: [
                "Removes emotion from selling decisions",
                "Automatically limits losses",
                "Guarantees profits",
                "Provides peace of mind"
              ],
              correctAnswer: 2,
              explanation: "Stop-loss orders do not guarantee profits. They only limit losses and help manage risk."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('stop-loss-quiz', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'quiz' as const,
      minScore: 70,
      skipAllowed: false
    },
    {
      id: 'synergy',
      title: 'The Synergy of Position Sizing and Stop-Losses',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{t('section3_title') as string}</h3>
            <p className="text-purple-700 text-lg mb-4">{t('section3_p1') as string}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">How They Work Together</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Step 1: Set Stop-Loss</h5>
                <p className="text-gray-600">Determine where you'll exit before entering</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Step 2: Calculate Risk</h5>
                <p className="text-gray-600">Entry price minus stop-loss price</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Step 3: Size Position</h5>
                <p className="text-gray-600">Risk amount divided by risk per share</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Step 4: Execute Trade</h5>
                <p className="text-gray-600">Buy the calculated number of shares</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">Complete Example</h4>
            <div className="text-green-700 space-y-2">
              <p><strong>Portfolio:</strong> ₹1,00,000</p>
              <p><strong>Risk per Trade:</strong> 1% = ₹1,000</p>
              <p><strong>Stock Price:</strong> ₹50</p>
              <p><strong>Stop-Loss:</strong> ₹45</p>
              <p><strong>Risk per Share:</strong> ₹5</p>
              <p><strong>Position Size:</strong> ₹1,000 ÷ ₹5 = 200 shares</p>
              <p><strong>Total Position Value:</strong> 200 × ₹50 = ₹10,000</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'risk-concepts',
      title: 'Risk Management Concepts',
      content: (
        <InteractiveSelection
          title="Match Risk Management Concepts with Their Descriptions"
          description="Select the correct descriptions for each risk management concept"
          options={[
            { 
              id: 'position-sizing', 
              text: 'Position Sizing', 
              isCorrect: true, 
              explanation: 'Determining how many shares to trade based on risk tolerance' 
            },
            { 
              id: 'stop-loss', 
              text: 'Stop-Loss Order', 
              isCorrect: true, 
              explanation: 'Automated order to sell when price reaches a predetermined level' 
            },
            { 
              id: 'risk-percentage', 
              text: 'Risk Percentage', 
              isCorrect: true, 
              explanation: 'Maximum portion of capital to risk on a single trade' 
            },
            { 
              id: 'capital-preservation', 
              text: 'Capital Preservation', 
              isCorrect: true, 
              explanation: 'Protecting your trading capital from significant losses' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('risk-concepts', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'selection' as const,
      minScore: 80,
      skipAllowed: false
    },
    {
      id: 'short-questions',
      title: 'Deep Understanding Check',
      content: (
        <ShortQuestions
          title="Deep Understanding Check"
          description="Answer these questions to demonstrate your understanding of risk management principles"
          questions={[
            {
              id: 'q1',
              question: "Explain why the 1% rule is important and how it helps protect your trading capital.",
              hint: "Think about the impact of losses on your overall portfolio",
              correctAnswer: "The 1% rule limits the maximum loss on any single trade to 1% of your total capital, ensuring that even multiple losing trades won't significantly damage your portfolio.",
              explanation: "By limiting each trade's risk to 1%, you ensure that your capital is preserved and you can continue trading even after experiencing losses."
            },
            {
              id: 'q2',
              question: "How do position sizing and stop-loss orders work together to manage risk?",
              hint: "Consider the relationship between risk amount and position size",
              correctAnswer: "Position sizing determines how many shares to trade based on your risk tolerance, while stop-loss orders define where you'll exit to limit losses.",
              explanation: "Together, they create a complete risk management system where you control both the amount at risk and the maximum loss per trade."
            },
            {
              id: 'q3',
              question: "What are the potential drawbacks of using stop-loss orders, and how can you mitigate them?",
              hint: "Think about market volatility and false signals",
              correctAnswer: "Stop-losses can be triggered by temporary price spikes or market noise. Mitigation includes using wider stops, trailing stops, and considering market conditions.",
              explanation: "While stop-losses are essential, they need to be set appropriately to avoid being triggered by normal market volatility."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('short-questions', percentage);
            }
          }}
        />
      ),
      isRequired: true,
      type: 'short-answer' as const,
      skipAllowed: false
    },
    {
      id: 'conclusion',
      title: 'Conclusion: Trade to Trade Another Day',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('conclusion_title') as string}</h3>
            <p className="text-green-700 text-lg">{t('conclusion_p1') as string}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Takeaways</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Position sizing controls how much you risk on each trade</p>
              <p>• Stop-loss orders automate your exit strategy</p>
              <p>• Together, they create a complete risk management system</p>
              <p>• The goal is capital preservation, not being right on every trade</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">What's Next?</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Practice calculating position sizes with different scenarios</p>
              <p>• Set up stop-loss orders on your next trades</p>
              <p>• Learn about advanced risk management techniques</p>
              <p>• Study portfolio diversification strategies</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Risk Management Commitment"
            description="Please confirm that you understand and will apply these risk management principles"
            checkboxes={[
              "I understand the importance of position sizing",
              "I will use stop-loss orders on my trades",
              "I will never risk more than 1% on a single trade",
              "I prioritize capital preservation over maximizing profits"
            ]}
            partId="conclusion"
                    onPartComplete={(partId, score) => {
          if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
            (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete(partId, score);
          }
        }}
          />
        </div>
      ),
      isRequired: true,
      type: 'interactive' as const,
      skipAllowed: false
    }
  ];

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="risk-management-position-sizing-and-stop-loss-orders"
    >
      <MultiPartLesson
        parts={lessonParts}
        onComplete={handleComplete}
        onPartComplete={handlePartComplete}
        className="max-w-4xl mx-auto"
      />
    </LessonLayout>
  );
}
