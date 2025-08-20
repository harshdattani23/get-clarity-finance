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

export default function BasicOptionStrategiesPage() {
  const { t } = useTranslation('stock-market-course.basic-option-strategies');
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
      title: 'Introduction to Basic Option Strategies',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="Basic Option Strategies"
            description="Learn fundamental options strategies including covered calls and protective puts to enhance your trading toolkit."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/basic-option-strategies-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Covered call strategy</li>
                <li>• Protective put strategy</li>
                <li>• Risk and reward profiles</li>
                <li>• When to use each strategy</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Why These Matter</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Foundation for complex strategies</li>
                <li>• Risk management tools</li>
                <li>• Income generation</li>
                <li>• Portfolio protection</li>
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
      id: 'covered-call',
      title: 'Covered Call Strategy',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('coveredCall.title') as string}</h3>
            <p className="text-green-700 text-lg mb-4">{t('coveredCall.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('coveredCall.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('coveredCall.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('coveredCall.howItWorks.p2') as string}</p>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-green-700"><strong>Example:</strong> Own 100 shares at ₹100, sell ₹110 call for ₹5 premium</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('coveredCall.benefits.title') as string}</h4>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-green-700"><strong>Income:</strong> {t('coveredCall.benefits.income') as string}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-blue-700"><strong>Downside Protection:</strong> {t('coveredCall.benefits.downsideProtection') as string}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-700"><strong>Reduced Cost:</strong> {t('coveredCall.benefits.reducedCost') as string}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-800 mb-3">⚠️ Risks to Consider</h4>
            <div className="space-y-3 text-red-700">
              <div className="bg-white p-3 rounded border border-red-300">
                <p><strong>Limited Upside:</strong> {t('coveredCall.risks.limitedUpside') as string}</p>
              </div>
              <div className="bg-white p-3 rounded border border-red-300">
                <p><strong>Obligation:</strong> {t('coveredCall.risks.obligation') as string}</p>
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
      id: 'covered-call-quiz',
      title: 'Covered Call Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'covered-call-q1',
              question: "What is the main benefit of a covered call strategy?",
              options: [
                "Unlimited profit potential",
                "Generating income from option premiums",
                "Protection against all downside risk",
                "No risk of losing money"
              ],
              correctAnswer: 1,
              explanation: "The main benefit of a covered call is generating income from option premiums while providing some downside protection."
            },
            {
              id: 'covered-call-q2',
              question: "What happens if the stock price rises above the strike price of your covered call?",
              options: [
                "You make unlimited profits",
                "Your upside is limited to the strike price plus premium received",
                "You lose all your money",
                "The option expires worthless"
              ],
              correctAnswer: 1,
              explanation: "Your upside is limited to the strike price plus the premium received, as you may be obligated to sell your shares."
            },
            {
              id: 'covered-call-q3',
              question: "When is a covered call strategy most beneficial?",
              options: [
                "When you're very bearish on a stock",
                "When you're moderately bullish and want income",
                "When you expect high volatility",
                "When you want unlimited profit potential"
              ],
              correctAnswer: 1,
              explanation: "Covered calls work best when you're moderately bullish on a stock and want to generate additional income."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('covered-call-quiz', percentage);
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
      id: 'protective-put',
      title: 'Protective Put Strategy',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">{t('protectivePut.title') as string}</h3>
            <p className="text-blue-700 text-lg mb-4">{t('protectivePut.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('protectivePut.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('protectivePut.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('protectivePut.howItWorks.p2') as string}</p>
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-sm text-blue-700"><strong>Example:</strong> Own 100 shares at ₹100, buy ₹90 put for ₹3 premium</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('protectivePut.benefits.title') as string}</h4>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <p className="text-blue-700"><strong>Downside Protection:</strong> {t('protectivePut.benefits.downsideProtection') as string}</p>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <p className="text-green-700"><strong>Unlimited Upside:</strong> {t('protectivePut.benefits.unlimitedUpside') as string}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                  <p className="text-yellow-700"><strong>Peace of Mind:</strong> {t('protectivePut.benefits.peaceOfMind') as string}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-800 mb-3">⚠️ Risks to Consider</h4>
            <div className="space-y-3 text-orange-700">
              <div className="bg-white p-3 rounded border border-orange-300">
                <p><strong>Premium Cost:</strong> {t('protectivePut.risks.premiumCost') as string}</p>
              </div>
              <div className="bg-white p-3 rounded border border-orange-300">
                <p><strong>Time Decay:</strong> {t('protectivePut.risks.timeDecay') as string}</p>
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
      id: 'protective-put-quiz',
      title: 'Protective Put Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'protective-put-q1',
              question: "What is the main benefit of a protective put strategy?",
              options: [
                "Generating income",
                "Providing downside protection",
                "Unlimited profit potential",
                "Reducing transaction costs"
              ],
              correctAnswer: 1,
              explanation: "The main benefit of a protective put is providing downside protection while maintaining upside potential."
            },
            {
              id: 'protective-put-q2',
              question: "What happens to your upside potential with a protective put?",
              options: [
                "It's completely eliminated",
                "It's limited to the strike price",
                "It remains unlimited",
                "It's reduced by the premium cost"
              ],
              correctAnswer: 2,
              explanation: "Your upside potential remains unlimited, though your overall returns are reduced by the premium cost of the put."
            },
            {
              id: 'protective-put-q3',
              question: "When is a protective put strategy most beneficial?",
              options: [
                "When you're very bullish on a stock",
                "When you're concerned about downside risk",
                "When you want to generate income",
                "When you expect high volatility"
              ],
              correctAnswer: 1,
              explanation: "Protective puts are most beneficial when you're concerned about downside risk but want to maintain upside potential."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('protective-put-quiz', percentage);
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
      id: 'when-to-use',
      title: 'When to Use Each Strategy',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{t('whenToUse.title') as string}</h3>
            <p className="text-purple-700 text-lg mb-4">Understanding when to use each strategy helps maximize their effectiveness</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-800 mb-3">Covered Calls</h4>
              <div className="space-y-3 text-green-700">
                <p className="font-semibold">{t('whenToUse.coveredCall') as string}</p>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p className="text-sm text-green-700"><strong>Best Market Conditions:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Moderately bullish outlook</li>
                    <li>Low to moderate volatility</li>
                    <li>Want to generate income</li>
                    <li>Willing to limit upside</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">Protective Puts</h4>
              <div className="space-y-3 text-blue-700">
                <p className="font-semibold">{t('whenToUse.protectivePut') as string}</p>
                <div className="bg-white p-3 rounded border border-blue-300">
                  <p className="text-sm text-blue-700"><strong>Best Market Conditions:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Concerned about downside</li>
                    <li>Want to maintain upside</li>
                    <li>High market uncertainty</li>
                    <li>Willing to pay for protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Strategy Selection Guide</h4>
            <div className="text-yellow-700 space-y-2">
              <p><strong>Choose Covered Calls when:</strong> You're moderately bullish and want income</p>
              <p><strong>Choose Protective Puts when:</strong> You're concerned about downside but want upside potential</p>
              <p><strong>Consider both when:</strong> You want to balance income generation with risk protection</p>
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
          title="Match Strategy Characteristics with Their Benefits"
          description="Select the correct benefits for each basic option strategy"
          options={[
            { 
              id: 'covered-call', 
              text: 'Covered Call', 
              isCorrect: true, 
              explanation: 'Generates income and provides some downside protection' 
            },
            { 
              id: 'protective-put', 
              text: 'Protective Put', 
              isCorrect: true, 
              explanation: 'Provides downside protection while maintaining upside potential' 
            },
            { 
              id: 'income-generation', 
              text: 'Income Generation', 
              isCorrect: true, 
              explanation: 'Primary benefit of covered calls through premium collection' 
            },
            { 
              id: 'risk-protection', 
              text: 'Risk Protection', 
              isCorrect: true, 
              explanation: 'Primary benefit of protective puts through downside hedging' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('strategy-comparison', percentage);
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
          description="Answer these questions to demonstrate your understanding of basic option strategies"
          questions={[
            {
              id: 'q1',
              question: "Explain the key difference between covered calls and protective puts in terms of their primary purpose and risk profile.",
              hint: "Think about what each strategy is designed to achieve",
              correctAnswer: "Covered calls are primarily income-generating strategies that limit upside potential, while protective puts are primarily risk-management strategies that maintain unlimited upside potential.",
              explanation: "Understanding this fundamental difference helps in strategy selection based on your investment goals."
            },
            {
              id: 'q2',
              question: "How would you decide between using a covered call versus a protective put for a stock you own?",
              hint: "Consider your market outlook and investment objectives",
              correctAnswer: "I would choose based on my market outlook and goals: covered calls for moderate bullishness and income generation, protective puts for bearish concerns and risk protection.",
              explanation: "Strategy selection should align with both market expectations and personal investment objectives."
            },
            {
              id: 'q3',
              question: "What are the main trade-offs investors face when using these basic option strategies?",
              hint: "Consider costs, benefits, and limitations",
              correctAnswer: "Main trade-offs include: 1) Premium costs vs. protection benefits, 2) Income generation vs. upside limitation, 3) Risk reduction vs. reduced returns, and 4) Complexity vs. simplicity.",
              explanation: "Understanding these trade-offs helps investors make informed decisions about strategy implementation."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('short-questions', percentage);
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
              <p>• Learn about more complex option strategies</p>
              <p>• Explore risk management techniques</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Basic Option Strategies Commitment"
            description="Please confirm that you understand these strategies and will apply proper risk management"
            checkboxes={[
              "I understand how covered calls and protective puts work",
              "I recognize the risks and benefits of each strategy",
              "I will use proper position sizing and risk management",
              "I will practice thoroughly before using real money"
            ]}
            partId="conclusion"
            onPartComplete={(partId, score) => {
              if ((window as any).__multiPartLessonComplete) {
                (window as any).__multiPartLessonComplete(partId, score);
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
      lessonSlug="basic-option-strategies"
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
