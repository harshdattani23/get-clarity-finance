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

export default function AdvancedDerivativesStrategiesPage() {
  const { t } = useTranslation('stock-market-course.advanced-derivatives-strategies');
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
      title: 'Introduction to Advanced Derivatives Strategies',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
            <p className="text-purple-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="Advanced Derivatives Strategies"
            description="Master option Greeks and multi-leg strategies with robust risk management."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-derivatives-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Option Greeks and their meaning</li>
                <li>• Multi-leg option strategies</li>
                <li>• Advanced risk management</li>
                <li>• Strategy selection criteria</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Prerequisites</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic options knowledge</li>
                <li>• Understanding of spreads</li>
                <li>• Risk management concepts</li>
                <li>• Market volatility awareness</li>
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
      id: 'option-greeks',
      title: 'Option Greeks',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">{t('optionGreeks.title') as string}</h3>
            <p className="text-blue-700 text-lg mb-4">{t('optionGreeks.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('optionGreeks.delta.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('optionGreeks.delta.description') as string}</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm text-gray-600"><strong>Example:</strong> Delta of 0.5 means for every ₹1 move in the stock, the option moves ₹0.50</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('optionGreeks.gamma.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('optionGreeks.gamma.description') as string}</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm text-gray-600"><strong>Example:</strong> High gamma means delta changes rapidly with stock price moves</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('optionGreeks.theta.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('optionGreeks.theta.description') as string}</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm text-gray-600"><strong>Example:</strong> Theta of -0.05 means the option loses ₹0.05 in value each day</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('optionGreeks.vega.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('optionGreeks.vega.description') as string}</p>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm text-gray-600"><strong>Example:</strong> Vega of 0.10 means for every 1% change in volatility, the option changes ₹0.10</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Understanding Greeks</h4>
            <div className="text-yellow-700 space-y-2">
              <p><strong>Delta:</strong> How much your option moves with the stock</p>
              <p><strong>Gamma:</strong> How fast delta changes</p>
              <p><strong>Theta:</strong> How much value you lose to time</p>
              <p><strong>Vega:</strong> How much value you gain/lose to volatility changes</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'greeks-quiz',
      title: 'Option Greeks Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'greeks-q1',
              question: "Which Greek measures how much an option's price changes when the underlying stock price moves?",
              options: [
                "Gamma",
                "Delta",
                "Theta",
                "Vega"
              ],
              correctAnswer: 1,
              explanation: "Delta measures the rate of change in the option's price relative to changes in the underlying asset's price."
            },
            {
              id: 'greeks-q2',
              question: "What does a negative Theta value indicate?",
              options: [
                "The option is gaining value over time",
                "The option is losing value over time",
                "The option is insensitive to time",
                "The option will expire worthless"
              ],
              correctAnswer: 1,
              explanation: "A negative Theta means the option is losing value as time passes, which is normal for most options."
            },
            {
              id: 'greeks-q3',
              question: "Which Greek measures the sensitivity of Delta to changes in the underlying asset price?",
              options: [
                "Gamma",
                "Theta",
                "Vega",
                "Rho"
              ],
              correctAnswer: 0,
              explanation: "Gamma measures how much Delta changes when the underlying asset price changes."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('greeks-quiz', percentage);
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
      id: 'advanced-strategies',
      title: 'Advanced Strategies',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('advancedStrategies.title') as string}</h3>
            <p className="text-green-700 text-lg mb-4">{t('advancedStrategies.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('advancedStrategies.ironCondor.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('advancedStrategies.ironCondor.description') as string}</p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700"><strong>Best for:</strong> Low volatility, sideways markets</p>
                  <p className="text-sm text-blue-700"><strong>Risk:</strong> Defined, limited</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('advancedStrategies.butterfly.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('advancedStrategies.butterfly.description') as string}</p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700"><strong>Best for:</strong> Range-bound markets, specific price targets</p>
                  <p className="text-sm text-green-700"><strong>Risk:</strong> Defined, limited</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('advancedStrategies.straddle.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('advancedStrategies.straddle.description') as string}</p>
                <div className="bg-orange-50 p-3 rounded border border-orange-200">
                  <p className="text-sm text-orange-700"><strong>Best for:</strong> High volatility, big price moves</p>
                  <p className="text-sm text-orange-700"><strong>Risk:</strong> Limited to premium paid</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-indigo-800 mb-3">Strategy Selection Guide</h4>
            <div className="grid md:grid-cols-2 gap-4 text-indigo-700">
              <div>
                <p className="font-semibold">Market Outlook:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Sideways:</strong> Iron Condor, Butterfly</li>
                  <li><strong>Volatile:</strong> Straddle, Strangle</li>
                  <li><strong>Trending:</strong> Spreads, Directional</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Risk Tolerance:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Low:</strong> Iron Condor, Butterfly</li>
                  <li><strong>Medium:</strong> Spreads, Ratio spreads</li>
                  <li><strong>High:</strong> Naked options, Straddles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'strategies-quiz',
      title: 'Advanced Strategies Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'strategies-q1',
              question: "Which strategy is best suited for a low-volatility, sideways market?",
              options: [
                "Straddle",
                "Iron Condor",
                "Naked call",
                "Long put"
              ],
              correctAnswer: 1,
              explanation: "Iron Condors are ideal for low-volatility, sideways markets as they profit from time decay and minimal price movement."
            },
            {
              id: 'strategies-q2',
              question: "What is the maximum risk for a long straddle position?",
              options: [
                "Unlimited",
                "The premium paid for both options",
                "The difference between strike prices",
                "The current stock price"
              ],
              correctAnswer: 1,
              explanation: "The maximum risk for a long straddle is limited to the premium paid for both the call and put options."
            },
            {
              id: 'strategies-q3',
              question: "Which strategy would you use if you expect the stock to stay within a specific price range?",
              options: [
                "Iron Condor",
                "Butterfly spread",
                "Both A and B",
                "Neither A nor B"
              ],
              correctAnswer: 2,
              explanation: "Both Iron Condors and Butterfly spreads are designed for range-bound markets where the stock stays within a specific price range."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('strategies-quiz', percentage);
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
      id: 'risk-management',
      title: 'Risk Management',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-4">{t('riskManagement.title') as string}</h3>
            <p className="text-red-700 text-lg mb-4">{t('riskManagement.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Position Sizing</h4>
              <div className="space-y-3 text-gray-700">
                <p>{t('riskManagement.point1') as string}</p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700"><strong>Rule:</strong> Never risk more than 1-2% of portfolio on any single trade</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Stop-Loss Rules</h4>
              <div className="space-y-3 text-gray-700">
                <p>{t('riskManagement.point2') as string}</p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700"><strong>Example:</strong> Exit if loss reaches 50% of maximum profit</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Risk Monitoring</h4>
              <div className="space-y-3 text-gray-700">
                <p>{t('riskManagement.point3') as string}</p>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-sm text-yellow-700"><strong>Events:</strong> Earnings, Fed meetings, elections</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">⚠️ Risk Management Checklist</h4>
            <div className="grid md:grid-cols-2 gap-4 text-orange-700">
              <div>
                <p className="font-semibold">Before Entering:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Calculate maximum loss</li>
                  <li>Set exit criteria</li>
                  <li>Determine position size</li>
                  <li>Check market conditions</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">While Managing:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Monitor Greeks daily</li>
                  <li>Track volatility changes</li>
                  <li>Watch for news events</li>
                  <li>Adjust if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'strategy-matching',
      title: 'Strategy Matching Exercise',
      content: (
        <InteractiveSelection
          title="Match Market Conditions with Appropriate Strategies"
          description="Select the strategies that best fit each market scenario"
          options={[
            { 
              id: 'low-volatility', 
              text: 'Low Volatility, Sideways Market', 
              isCorrect: true, 
              explanation: 'Iron Condors and Butterflies profit from low volatility and range-bound price action' 
            },
            { 
              id: 'high-volatility', 
              text: 'High Volatility, Big Moves Expected', 
              isCorrect: true, 
              explanation: 'Straddles and Strangles profit from large price movements and volatility expansion' 
            },
            { 
              id: 'trending-up', 
              text: 'Strong Uptrend', 
              isCorrect: true, 
              explanation: 'Bull call spreads and covered calls work well in trending markets' 
            },
            { 
              id: 'trending-down', 
              text: 'Strong Downtrend', 
              isCorrect: true, 
              explanation: 'Bear put spreads and protective puts help in declining markets' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('strategy-matching', percentage);
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
          description="Answer these questions to demonstrate your understanding of advanced derivatives strategies"
          questions={[
            {
              id: 'q1',
              question: "Explain how Delta and Gamma work together to affect option pricing, especially for at-the-money options.",
              hint: "Think about how Delta changes as the stock price moves",
              correctAnswer: "Delta measures the option's price sensitivity to stock moves, while Gamma measures how fast Delta changes. At-the-money options have the highest Gamma, meaning Delta changes rapidly as the stock moves.",
              explanation: "This relationship is crucial for understanding option behavior and managing risk in options trading."
            },
            {
              id: 'q2',
              question: "How would you choose between an Iron Condor and a Butterfly spread for a sideways market, and what factors would influence your decision?",
              hint: "Consider risk-reward profiles and market conditions",
              correctAnswer: "I would choose based on risk tolerance and market expectations. Iron Condors offer higher probability but lower profit potential, while Butterflies offer higher profit potential but require more precise price targeting.",
              explanation: "Understanding these trade-offs helps in strategy selection based on individual risk preferences."
            },
            {
              id: 'q3',
              question: "What are the key risk management considerations when trading complex multi-leg option strategies?",
              hint: "Think about position sizing, monitoring, and exit strategies",
              correctAnswer: "Key considerations include: 1) Position sizing to limit portfolio risk, 2) Monitoring Greeks for position adjustments, 3) Setting clear exit criteria, 4) Understanding correlation between legs, and 5) Planning for worst-case scenarios.",
              explanation: "Proper risk management is essential for long-term success in complex options trading."
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
      title: 'Key Takeaways & Next Steps',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('keyTakeaways.title') as string}</h3>
            <div className="space-y-3">
              <p className="text-green-700">• {t('keyTakeaways.takeaway1') as string}</p>
              <p className="text-green-700">• {t('keyTakeaways.takeaway2') as string}</p>
              <p className="text-green-700">• {t('keyTakeaways.takeaway3') as string}</p>
              <p className="text-green-700">• {t('keyTakeaways.takeaway4') as string}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">What's Next?</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Practice calculating Greeks with real options</p>
              <p>• Paper trade complex strategies</p>
              <p>• Study real-world examples and case studies</p>
              <p>• Learn about position adjustments and management</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Advanced Derivatives Commitment"
            description="Please confirm that you understand the risks and will apply proper risk management"
            checkboxes={[
              "I understand that advanced derivatives strategies carry substantial risk",
              "I will use proper position sizing and risk management",
              "I will monitor my positions and adjust as needed",
              "I will practice thoroughly before using real money"
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
      lessonSlug="advanced-derivatives-strategies"
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
