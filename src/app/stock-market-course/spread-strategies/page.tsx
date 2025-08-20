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

export default function SpreadStrategiesPage() {
  const { t } = useTranslation('stock-market-course.spread-strategies');
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
      title: 'Introduction to Spread Strategies',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="Spread Strategies"
            description="Explore bull and bear spreads, which are options strategies that limit both risk and reward for more controlled trading."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/spread-strategies-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Bull spread mechanics</li>
                <li>• Bear spread implementation</li>
                <li>• Risk-reward profiles</li>
                <li>• When to use each strategy</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Limited, defined risk</li>
                <li>• Lower cost than buying options</li>
                <li>• Controlled exposure</li>
                <li>• Clear profit/loss targets</li>
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
      id: 'bull-spread',
      title: 'Bull Spread (Call Spread)',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('bullSpread.title') as string}</h3>
            <p className="text-green-700 text-lg mb-4">{t('bullSpread.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('bullSpread.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('bullSpread.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('bullSpread.howItWorks.p2') as string}</p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700"><strong>Example:</strong> Buy ₹100 call, sell ₹110 call</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('bullSpread.profitLoss.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Max Profit:</strong> {t('bullSpread.profitLoss.maxProfit') as string}</p>
                <p className="text-gray-700"><strong>Max Loss:</strong> {t('bullSpread.profitLoss.maxLoss') as string}</p>
                <p className="text-gray-700"><strong>Breakeven:</strong> {t('bullSpread.profitLoss.breakeven') as string}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">When to Use Bull Spreads</h4>
            <p className="text-blue-700">{t('bullSpread.whenToUse') as string}</p>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Market Outlook:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Moderately bullish</li>
                  <li>Expecting gradual rise</li>
                  <li>Want to limit risk</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Risk Profile:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Defined maximum loss</li>
                  <li>Limited but significant profit</li>
                  <li>Lower cost than buying calls</li>
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
      id: 'bull-spread-quiz',
      title: 'Bull Spread Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'bull-spread-q1',
              question: "What is the maximum risk for a bull spread?",
              options: [
                "Unlimited",
                "The net premium paid",
                "The difference between strike prices",
                "The current stock price"
              ],
              correctAnswer: 1,
              explanation: "The maximum risk for a bull spread is limited to the net premium paid to establish the position."
            },
            {
              id: 'bull-spread-q2',
              question: "When do you use a bull spread?",
              options: [
                "When you're bearish on a stock",
                "When you're moderately bullish on a stock",
                "When you expect high volatility",
                "When you want unlimited profit potential"
              ],
              correctAnswer: 1,
              explanation: "Bull spreads are used when you're moderately bullish on a stock and want to limit your risk."
            },
            {
              id: 'bull-spread-q3',
              question: "What happens to a bull spread if the stock price falls significantly?",
              options: [
                "You make unlimited profits",
                "You lose the maximum amount (net premium paid)",
                "You break even",
                "You make a small profit"
              ],
              correctAnswer: 1,
              explanation: "If the stock price falls significantly, you lose the maximum amount, which is the net premium paid."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('bull-spread-quiz', percentage);
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
      id: 'bear-spread',
      title: 'Bear Spread (Put Spread)',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-4">{t('bearSpread.title') as string}</h3>
            <p className="text-red-700 text-lg mb-4">{t('bearSpread.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('bearSpread.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('bearSpread.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('bearSpread.howItWorks.p2') as string}</p>
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <p className="text-sm text-red-700"><strong>Example:</strong> Buy ₹110 put, sell ₹100 put</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('bearSpread.profitLoss.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Max Profit:</strong> {t('bearSpread.profitLoss.maxProfit') as string}</p>
                <p className="text-gray-700"><strong>Max Loss:</strong> {t('bearSpread.profitLoss.maxLoss') as string}</p>
                <p className="text-gray-700"><strong>Breakeven:</strong> {t('bearSpread.profitLoss.breakeven') as string}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">When to Use Bear Spreads</h4>
            <p className="text-orange-700">{t('bearSpread.whenToUse') as string}</p>
            <div className="mt-3 grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Market Outlook:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Moderately bearish</li>
                  <li>Expecting gradual decline</li>
                  <li>Want to limit risk</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Risk Profile:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Defined maximum loss</li>
                  <li>Limited but significant profit</li>
                  <li>Lower cost than buying puts</li>
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
      id: 'bear-spread-quiz',
      title: 'Bear Spread Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'bear-spread-q1',
              question: "What is the maximum profit for a bear spread?",
              options: [
                "Unlimited",
                "The net premium paid",
                "The difference between strike prices minus net premium paid",
                "The current stock price"
              ],
              correctAnswer: 2,
              explanation: "The maximum profit for a bear spread is the difference between strike prices minus the net premium paid."
            },
            {
              id: 'bear-spread-q2',
              question: "When do you use a bear spread?",
              options: [
                "When you're bullish on a stock",
                "When you're moderately bearish on a stock",
                "When you expect high volatility",
                "When you want unlimited profit potential"
              ],
              correctAnswer: 1,
              explanation: "Bear spreads are used when you're moderately bearish on a stock and want to limit your risk."
            },
            {
              id: 'bear-spread-q3',
              question: "What happens to a bear spread if the stock price rises significantly?",
              options: [
                "You make unlimited profits",
                "You lose the maximum amount (net premium paid)",
                "You break even",
                "You make a small profit"
              ],
              correctAnswer: 1,
              explanation: "If the stock price rises significantly, you lose the maximum amount, which is the net premium paid."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('bear-spread-quiz', percentage);
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
      id: 'advantages-disadvantages',
      title: 'Advantages and Disadvantages',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">Understanding the Trade-offs</h3>
            <p className="text-purple-700 text-lg mb-4">Every strategy has pros and cons. Understanding these helps you make informed decisions.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-800 mb-3">{t('advantages.title') as string}</h4>
              <div className="space-y-3 text-green-700">
                <div className="bg-white p-3 rounded border border-green-300">
                  <p><strong>Limited Risk:</strong> {t('advantages.limitedRisk') as string}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p><strong>Limited Reward:</strong> {t('advantages.limitedReward') as string}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p><strong>Lower Cost:</strong> {t('advantages.lowerCost') as string}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p><strong>Defined Risk:</strong> {t('advantages.definedRisk') as string}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-red-800 mb-3">{t('disadvantages.title') as string}</h4>
              <div className="space-y-3 text-red-700">
                <div className="bg-white p-3 rounded border border-red-300">
                  <p><strong>Limited Upside:</strong> {t('disadvantages.limitedUpside') as string}</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-300">
                  <p><strong>Complexity:</strong> {t('disadvantages.complexity') as string}</p>
                </div>
                <div className="bg-white p-3 rounded border border-red-300">
                  <p><strong>Commissions:</strong> {t('disadvantages.commissions') as string}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Strategy Selection Guide</h4>
            <div className="text-yellow-700 space-y-2">
              <p><strong>Choose Bull Spreads when:</strong> You're moderately bullish and want to limit risk</p>
              <p><strong>Choose Bear Spreads when:</strong> You're moderately bearish and want to limit risk</p>
              <p><strong>Consider alternatives when:</strong> You expect extreme moves or want unlimited profit potential</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'strategy-comparison',
      title: 'Strategy Comparison Exercise',
      content: (
        <InteractiveSelection
          title="Match Market Conditions with Appropriate Spread Strategies"
          description="Select the strategies that best fit each market scenario"
          options={[
            { 
              id: 'bull-spread', 
              text: 'Bull Spread', 
              isCorrect: true, 
              explanation: 'Profits when the underlying asset rises in price' 
            },
            { 
              id: 'bear-spread', 
              text: 'Bear Spread', 
              isCorrect: true, 
              explanation: 'Profits when the underlying asset falls in price' 
            },
            { 
              id: 'iron-condor', 
              text: 'Iron Condor', 
              isCorrect: true, 
              explanation: 'Profits from low volatility and sideways movement' 
            },
            { 
              id: 'straddle', 
              text: 'Straddle', 
              isCorrect: true, 
              explanation: 'Profits from large price movements in either direction' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as unknown as { __multiPartLessonComplete?: (id: string, score: number) => void }).__multiPartLessonComplete) {
              (window as unknown as { __multiPartLessonComplete: (id: string, score: number) => void }).__multiPartLessonComplete('strategy-comparison', percentage);
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
          description="Answer these questions to demonstrate your understanding of spread strategies"
          questions={[
            {
              id: 'q1',
              question: "Explain the key difference between bull spreads and bear spreads, and why you would choose one over the other.",
              hint: "Think about market direction and risk management",
              correctAnswer: "Bull spreads profit when the underlying asset rises, while bear spreads profit when it falls. I would choose based on my market outlook - bull spreads for bullish expectations, bear spreads for bearish expectations.",
              explanation: "Understanding the directional nature of these strategies is crucial for proper strategy selection."
            },
            {
              id: 'q2',
              question: "How do spread strategies compare to buying options outright in terms of risk, reward, and cost?",
              hint: "Consider the trade-offs between the approaches",
              correctAnswer: "Spread strategies have limited but defined risk and reward, while buying options outright has unlimited profit potential but also unlimited risk. Spreads typically cost less due to the premium received from selling options.",
              explanation: "This trade-off helps investors choose based on their risk tolerance and market expectations."
            },
            {
              id: 'q3',
              question: "What are the key factors to consider when deciding between a bull spread and a bear spread?",
              hint: "Think about market analysis and personal preferences",
              correctAnswer: "Key factors include: 1) Market outlook (bullish vs bearish), 2) Risk tolerance, 3) Expected price movement magnitude, 4) Time horizon, and 5) Volatility expectations.",
              explanation: "Proper strategy selection requires comprehensive market analysis and self-assessment."
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
              <p>• Practice calculating profit/loss scenarios</p>
              <p>• Study real-world examples and case studies</p>
              <p>• Learn about more complex multi-leg strategies</p>
              <p>• Explore risk management techniques</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Spread Strategies Commitment"
            description="Please confirm that you understand these strategies and will apply proper risk management"
            checkboxes={[
              "I understand how bull and bear spreads work",
              "I recognize the risk-reward trade-offs",
              "I will use proper position sizing",
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
      lessonSlug="spread-strategies"
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
