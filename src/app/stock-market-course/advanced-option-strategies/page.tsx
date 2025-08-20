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

export default function AdvancedOptionStrategiesPage() {
  const { t } = useTranslation('stock-market-course.advanced-option-strategies');
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
      title: 'Introduction to Advanced Option Strategies',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 text-lg">
              {t('introduction') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="Advanced Option Strategies"
            description="Master complex options strategies including Iron Condors and Butterflies for sophisticated risk management and income generation."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/advanced-option-strategies-ta.m4a"
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Iron Condor strategy mechanics</li>
                <li>• Butterfly spread implementation</li>
                <li>• Risk management for complex strategies</li>
                <li>• When to use each strategy</li>
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
      id: 'iron-condor',
      title: 'Iron Condor Strategy',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{t('ironCondor.title') as string}</h3>
            <p className="text-purple-700 text-lg mb-4">{t('ironCondor.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('ironCondor.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('ironCondor.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('ironCondor.howItWorks.p2') as string}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('ironCondor.profitLoss.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Max Profit:</strong> {t('ironCondor.profitLoss.maxProfit') as string}</p>
                <p className="text-gray-700"><strong>Max Loss:</strong> {t('ironCondor.profitLoss.maxLoss') as string}</p>
                <p className="text-gray-700"><strong>Breakeven:</strong> {t('ironCondor.profitLoss.breakeven') as string}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <p className="text-green-800"><strong>When to Use:</strong> {t('ironCondor.whenToUse') as string}</p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'iron-condor-quiz',
      title: 'Iron Condor Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'iron-condor-q1',
              question: "What type of market condition is best for an Iron Condor strategy?",
              options: [
                "High volatility with large price swings",
                "Low volatility with sideways movement",
                "Strong upward trend",
                "Strong downward trend"
              ],
              correctAnswer: 1,
              explanation: "Iron Condors profit from low volatility and sideways price movement, as they benefit from time decay and minimal price movement."
            },
            {
              id: 'iron-condor-q2',
              question: "What is the maximum profit for an Iron Condor?",
              options: [
                "Unlimited",
                "The width of the spread",
                "The net premium received",
                "The difference between strikes"
              ],
              correctAnswer: 2,
              explanation: "The maximum profit for an Iron Condor is the net premium received from selling both spreads."
            },
            {
              id: 'iron-condor-q3',
              question: "How many breakeven points does an Iron Condor have?",
              options: [
                "One",
                "Two",
                "Three",
                "Four"
              ],
              correctAnswer: 1,
              explanation: "An Iron Condor has two breakeven points - one above and one below the current stock price."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('iron-condor-quiz', percentage);
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
      id: 'butterfly',
      title: 'Butterfly Strategy',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">{t('butterfly.title') as string}</h3>
            <p className="text-orange-700 text-lg mb-4">{t('butterfly.description') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('butterfly.howItWorks.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700">{t('butterfly.howItWorks.p1') as string}</p>
                <p className="text-gray-700">{t('butterfly.howItWorks.p2') as string}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">{t('butterfly.profitLoss.title') as string}</h4>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Max Profit:</strong> {t('butterfly.profitLoss.maxProfit') as string}</p>
                <p className="text-gray-700"><strong>Max Loss:</strong> {t('butterfly.profitLoss.maxLoss') as string}</p>
                <p className="text-gray-700"><strong>Breakeven:</strong> {t('butterfly.profitLoss.breakeven') as string}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <p className="text-green-800"><strong>When to Use:</strong> {t('butterfly.whenToUse') as string}</p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'butterfly-quiz',
      title: 'Butterfly Strategy Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'butterfly-q1',
              question: "At what price does a Butterfly spread achieve maximum profit?",
              options: [
                "At the lower strike price",
                "At the middle strike price",
                "At the higher strike price",
                "At any price within the range"
              ],
              correctAnswer: 1,
              explanation: "The maximum profit for a Butterfly spread occurs when the stock is at the middle strike price at expiration."
            },
            {
              id: 'butterfly-q2',
              question: "How many options are sold at the middle strike in a Butterfly spread?",
              options: [
                "One",
                "Two",
                "Three",
                "Four"
              ],
              correctAnswer: 1,
              explanation: "In a Butterfly spread, you sell two options at the middle strike price."
            },
            {
              id: 'butterfly-q3',
              question: "What is the maximum loss for a Butterfly spread?",
              options: [
                "Unlimited",
                "The net premium paid",
                "The width of the spread",
                "The difference between strikes"
              ],
              correctAnswer: 1,
              explanation: "The maximum loss for a Butterfly spread is limited to the net premium paid to establish the position."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('butterfly-quiz', percentage);
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
      id: 'strategy-comparison',
      title: 'Strategy Comparison',
      content: (
        <InteractiveSelection
          title="Match Strategies with Their Characteristics"
          description="Select the correct characteristics for each strategy type"
          options={[
            { 
              id: 'iron-condor', 
              text: 'Iron Condor', 
              isCorrect: true, 
              explanation: 'Iron Condors profit from low volatility and sideways movement' 
            },
            { 
              id: 'butterfly', 
              text: 'Butterfly Spread', 
              isCorrect: true, 
              explanation: 'Butterfly spreads profit when stock stays at a specific price' 
            },
            { 
              id: 'straddle', 
              text: 'Straddle', 
              isCorrect: true, 
              explanation: 'Straddles profit from large price movements in either direction' 
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
      id: 'risk-management',
      title: 'Risk Management Considerations',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-4">{t('riskManagement.title') as string}</h3>
            <p className="text-red-700 text-lg mb-4">{t('riskManagement.p1') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Position Sizing</h4>
              <p className="text-gray-700">{t('riskManagement.positionSizing') as string}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Stop Losses</h4>
              <p className="text-gray-700">{t('riskManagement.stopLosses') as string}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Monitoring</h4>
              <p className="text-gray-700">{t('riskManagement.monitoring') as string}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Adjustments</h4>
              <p className="text-gray-700">{t('riskManagement.adjustments') as string}</p>
            </div>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'short-questions',
      title: 'Deep Understanding Check',
      content: (
        <ShortQuestions
          title="Deep Understanding Check"
          description="Answer these questions to demonstrate your understanding of advanced option strategies"
          questions={[
            {
              id: 'q1',
              question: "Explain why an Iron Condor strategy is considered 'neutral' and what market conditions it's designed for.",
              hint: "Think about volatility and price movement",
              correctAnswer: "An Iron Condor is neutral because it profits from low volatility and sideways price movement, not from directional price moves.",
              explanation: "Iron Condors are designed for markets with low volatility where the stock trades sideways. They profit from time decay and minimal price movement."
            },
            {
              id: 'q2',
              question: "How would you adjust a Butterfly spread if the stock price moves significantly away from your target price?",
              hint: "Consider risk management and position adjustments",
              correctAnswer: "I would consider rolling the position to a new strike price, closing early for a loss, or adding protective positions.",
              explanation: "When a Butterfly spread moves away from the target price, you can roll to new strikes, close early, or add protective positions to limit losses."
            },
            {
              id: 'q3',
              question: "What are the key differences between managing risk in simple option strategies versus complex multi-leg strategies?",
              hint: "Think about complexity, monitoring, and adjustments",
              correctAnswer: "Complex strategies require more active monitoring, have multiple risk points, and need sophisticated adjustment strategies.",
              explanation: "Complex strategies have multiple risk points, require constant monitoring, and need sophisticated adjustment strategies compared to simple strategies."
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
      id: 'key-takeaways',
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
              <p>• Practice these strategies in paper trading</p>
              <p>• Study real-world examples and case studies</p>
              <p>• Learn about position adjustments and management</p>
              <p>• Explore other advanced derivatives strategies</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Risk Acknowledgment"
            description="Please confirm that you understand the risks involved with advanced option strategies"
            checkboxes={[
              "I understand that advanced option strategies require significant experience",
              "I acknowledge that these strategies carry substantial risk",
              "I will practice thoroughly before using real money",
              "I understand the importance of proper risk management"
            ]}
            partId="key-takeaways"
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
      lessonSlug="advanced-option-strategies"
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
