// src/app/stock-market-course.the-principle-of-portfolio-diversification/page.tsx
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

export default function PortfolioDiversificationPage() {
  const { t } = useTranslation('stock-market-course.the-principle-of-portfolio-diversification');
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
      title: 'Introduction to Portfolio Diversification',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 text-lg">
              {t('whatIsDiversification.content') as string}
            </p>
          </div>
          
          <AudioSummary 
            title="The Principle of Portfolio Diversification"
            description="Don't put all your eggs in one basket. Learn the most important principle for managing investment risk."
            hindiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-hi.m4a"
            englishAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-en.m4a"
            bengaliAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-bn.m4a"
            marathiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-mr.m4a"
            gujaratiAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-gu.m4a"
            tamilAudioUrl="gs://getclarity-audio-bucket/lessons/advanced-topics/portfolio-diversification-ta.m4a"
          />
          
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
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'why-diversify',
      title: 'Why is Diversification Important?',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('whyDiversify.title') as string}</h3>
            <p className="text-green-700 text-lg mb-4">{t('whyDiversify.content') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Reduces Volatility</h4>
              <div className="space-y-3 text-gray-700">
                <p>• Smooths out investment journey</p>
                <p>• Less dramatic ups and downs</p>
                <p>• More predictable returns</p>
                <p>• Better sleep at night</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Protects Against Losses</h4>
              <div className="space-y-3 text-gray-700">
                <p>• Single bad asset won't sink you</p>
                <p>• Industry downturns are cushioned</p>
                <p>• Company-specific risks are minimized</p>
                <p>• Geographic risks are spread</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Pro Tip</h4>
            <p className="text-yellow-700">
              Think of diversification like insurance for your portfolio. You pay a small "premium" in potentially lower returns 
              for the security of knowing that one bad investment won't ruin your financial future.
            </p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'types-of-risk',
      title: 'Understanding Risk: Systematic vs. Unsystematic',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{t('typesOfRisk.title') as string}</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-red-800 mb-3">Systematic Risk</h4>
              <div className="space-y-3 text-red-700">
                <p dangerouslySetInnerHTML={{ __html: t('typesOfRisk.systematic') as string }} />
                <p className="mt-3"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Interest rate changes</li>
                  <li>Inflation</li>
                  <li>Political instability</li>
                  <li>Economic recessions</li>
                </ul>
                <p className="mt-3 text-sm">⚠️ <strong>Cannot be eliminated</strong> through diversification</p>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-800 mb-3">Unsystematic Risk</h4>
              <div className="space-y-3 text-green-700">
                <p dangerouslySetInnerHTML={{ __html: t('typesOfRisk.unsystematic') as string }} />
                <p className="mt-3"><strong>Examples:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Product recalls</li>
                  <li>New competitors</li>
                  <li>Management changes</li>
                  <li>Industry-specific issues</li>
                </ul>
                <p className="mt-3 text-sm">✅ <strong>Can be reduced</strong> through diversification</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Key Takeaway</h4>
            <p className="text-blue-700">
              Diversification is most effective at reducing unsystematic risk. While you can't eliminate market-wide risks, 
              you can significantly reduce the impact of individual company or industry problems on your portfolio.
            </p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'risk-quiz',
      title: 'Risk Types Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'risk-q1',
              question: "Which type of risk can be reduced through portfolio diversification?",
              options: [
                "Systematic risk",
                "Unsystematic risk",
                "Both types of risk",
                "Neither type of risk"
              ],
              correctAnswer: 1,
              explanation: "Unsystematic risk, which is specific to individual companies or industries, can be reduced through diversification. Systematic risk affects the entire market and cannot be eliminated."
            },
            {
              id: 'risk-q2',
              question: "Which of the following is an example of systematic risk?",
              options: [
                "A company's product recall",
                "Interest rate changes by the central bank",
                "A new competitor entering the market",
                "Management changes at a company"
              ],
              correctAnswer: 1,
              explanation: "Interest rate changes affect the entire market and all investments, making it a systematic risk that cannot be diversified away."
            },
            {
              id: 'risk-q3',
              question: "What is the main goal of diversification?",
              options: [
                "To maximize returns on every investment",
                "To reduce portfolio volatility and risk",
                "To eliminate all investment risk",
                "To beat the market consistently"
              ],
              correctAnswer: 1,
              explanation: "The main goal of diversification is to reduce portfolio volatility and risk by spreading investments across different assets."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('risk-quiz', percentage);
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
      id: 'how-to-diversify',
      title: 'How to Diversify Your Portfolio',
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-orange-800 mb-4">{t('howToDiversify.title') as string}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Across Asset Classes</h4>
              <div className="space-y-3 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('howToDiversify.assetClasses') as string }} />
                <div className="mt-3 space-y-2">
                  <p>• <strong>Stocks:</strong> Growth potential, higher risk</p>
                  <p>• <strong>Bonds:</strong> Income generation, lower risk</p>
                  <p>• <strong>Cash:</strong> Safety, liquidity</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Within Asset Classes</h4>
              <div className="space-y-3 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('howToDiversify.withinAssetClasses') as string }} />
                <div className="mt-3 space-y-2">
                  <p>• <strong>Sectors:</strong> Tech, healthcare, finance, etc.</p>
                  <p>• <strong>Company Size:</strong> Large, mid, small-cap</p>
                  <p>• <strong>Growth Style:</strong> Value vs. growth</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Geographic</h4>
              <div className="space-y-3 text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('howToDiversify.geographic') as string }} />
                <div className="mt-3 space-y-2">
                  <p>• <strong>Domestic:</strong> Indian markets</p>
                  <p>• <strong>International:</strong> US, Europe, Asia</p>
                  <p>• <strong>Emerging:</strong> Developing markets</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-indigo-800 mb-3">Diversification Checklist</h4>
            <div className="grid md:grid-cols-2 gap-4 text-indigo-700">
              <div>
                <p className="font-semibold">Asset Classes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Stocks ✓</li>
                  <li>Bonds ✓</li>
                  <li>Cash ✓</li>
                  <li>Commodities (optional)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Within Stocks:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Multiple sectors ✓</li>
                  <li>Different company sizes ✓</li>
                  <li>Geographic spread ✓</li>
                  <li>Investment styles ✓</li>
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
      id: 'diversification-example',
      title: 'Example: A Simple Portfolio',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('diversificationExample.title') as string}</h3>
            <p className="text-green-700 text-lg mb-4">{t('diversificationExample.intro') as string}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-red-800 mb-3">❌ Undiversified Portfolio</h4>
              <div className="space-y-3 text-red-700">
                <p className="font-semibold">{t('diversificationExample.undiversified') as string}</p>
                <div className="bg-white p-4 rounded border border-red-300">
                  <p className="text-center font-bold text-lg">100%</p>
                  <p className="text-center">Single Tech Stock</p>
                </div>
                <div className="mt-3">
                  <p className="font-semibold">Risks:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Company goes bankrupt</li>
                    <li>Tech sector crash</li>
                    <li>Regulatory changes</li>
                    <li>Management issues</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-green-800 mb-3">✅ Diversified Portfolio</h4>
              <div className="space-y-3 text-green-700">
                <p className="font-semibold">{t('diversificationExample.diversified') as string}</p>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border border-green-300">
                    <p className="font-semibold">40% - Nifty 50 Index Fund</p>
                    <p className="text-sm text-gray-600">Large Indian companies across sectors</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-300">
                    <p className="font-semibold">20% - International Fund</p>
                    <p className="text-sm text-gray-600">Geographic diversification</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-300">
                    <p className="font-semibold">30% - Government Bonds</p>
                    <p className="text-sm text-gray-600">Asset class diversification</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-green-300">
                    <p className="font-semibold">10% - Gold ETF</p>
                    <p className="text-sm text-gray-600">Commodity diversification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Why This Works</h4>
            <p className="text-blue-700">{t('diversificationExample.outro') as string}</p>
          </div>
        </div>
      ),
      isRequired: true,
      type: 'content' as const,
      skipAllowed: false
    },
    {
      id: 'diversification-quiz',
      title: 'Diversification Quiz',
      content: (
        <InteractiveQuiz
          questions={[
            {
              id: 'diversification-q1',
              question: "Which of the following is NOT a way to diversify your portfolio?",
              options: [
                "Investing in different sectors",
                "Buying stocks from different countries",
                "Putting all your money in one company",
                "Mixing stocks, bonds, and cash"
              ],
              correctAnswer: 2,
              explanation: "Putting all your money in one company is the opposite of diversification. It concentrates risk rather than spreading it."
            },
            {
              id: 'diversification-q2',
              question: "What percentage of a diversified portfolio might typically be allocated to international investments?",
              options: [
                "0-5%",
                "10-30%",
                "50-70%",
                "80-100%"
              ],
              correctAnswer: 1,
              explanation: "A typical diversified portfolio might allocate 10-30% to international investments to provide geographic diversification without overexposure."
            },
            {
              id: 'diversification-q3',
              question: "What happens to your portfolio if you're well-diversified and one sector crashes?",
              options: [
                "Your entire portfolio will crash",
                "Only that sector will be affected",
                "You'll make money from the crash",
                "Your portfolio will be protected by other sectors"
              ],
              correctAnswer: 3,
              explanation: "A well-diversified portfolio will be protected by investments in other sectors that may not be affected by the crash."
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('diversification-quiz', percentage);
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
      id: 'portfolio-concepts',
      title: 'Portfolio Management Concepts',
      content: (
        <InteractiveSelection
          title="Match Portfolio Concepts with Their Benefits"
          description="Select the correct benefits for each portfolio management concept"
          options={[
            { 
              id: 'asset-allocation', 
              text: 'Asset Allocation', 
              isCorrect: true, 
              explanation: 'Spreading investments across different asset classes like stocks, bonds, and cash' 
            },
            { 
              id: 'sector-diversification', 
              text: 'Sector Diversification', 
              isCorrect: true, 
              explanation: 'Investing across different industry sectors to reduce sector-specific risk' 
            },
            { 
              id: 'geographic-spread', 
              text: 'Geographic Spread', 
              isCorrect: true, 
              explanation: 'Investing in different countries and regions to reduce geographic risk' 
            },
            { 
              id: 'rebalancing', 
              text: 'Portfolio Rebalancing', 
              isCorrect: true, 
              explanation: 'Periodically adjusting portfolio weights to maintain target allocations' 
            }
          ]}
          onComplete={(score, total) => {
            const percentage = Math.round((score / total) * 100);
            if ((window as any).__multiPartLessonComplete) {
              (window as any).__multiPartLessonComplete('portfolio-concepts', percentage);
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
          description="Answer these questions to demonstrate your understanding of portfolio diversification"
          questions={[
            {
              id: 'q1',
              question: "Explain why diversification is often called 'the only free lunch in investing' and what this means for your portfolio.",
              hint: "Think about risk reduction without sacrificing returns",
              correctAnswer: "Diversification is called the only free lunch because it reduces risk without necessarily reducing returns, allowing you to achieve better risk-adjusted performance.",
              explanation: "By spreading investments across different assets, you can reduce portfolio volatility and risk while potentially maintaining similar returns."
            },
            {
              id: 'q2',
              question: "How would you explain the difference between systematic and unsystematic risk to a new investor?",
              hint: "Use concrete examples and explain which can be diversified away",
              correctAnswer: "Systematic risk affects the entire market (like interest rate changes) and cannot be eliminated. Unsystematic risk affects individual companies (like product recalls) and can be reduced through diversification.",
              explanation: "Understanding this difference helps investors focus their diversification efforts on what they can actually control."
            },
            {
              id: 'q3',
              question: "What are the three main ways to diversify a portfolio, and why is each important?",
              hint: "Consider asset classes, sectors, and geography",
              correctAnswer: "The three main ways are: 1) Across asset classes (stocks, bonds, cash) for different risk-return profiles, 2) Within asset classes (different sectors, company sizes) for industry diversification, and 3) Geographic spread for country-specific risk reduction.",
              explanation: "Each type of diversification addresses different sources of risk and together creates a robust portfolio."
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
      title: 'The Bottom Line',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-2xl font-bold text-green-800 mb-4">{t('bottomLine.title') as string}</h3>
            <p className="text-green-700 text-lg">{t('bottomLine.content') as string}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Key Takeaways</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Diversification reduces portfolio volatility and risk</p>
              <p>• It's most effective against unsystematic (company-specific) risk</p>
              <p>• Diversify across asset classes, sectors, and geography</p>
              <p>• It's the cornerstone of sound investment planning</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">What's Next?</h4>
            <div className="space-y-3 text-gray-700">
              <p>• Learn about asset allocation strategies</p>
              <p>• Study portfolio rebalancing techniques</p>
              <p>• Explore different investment vehicles</p>
              <p>• Understand risk tolerance assessment</p>
            </div>
          </div>

          <ConfirmationCheck
            title="Diversification Commitment"
            description="Please confirm that you understand and will apply these portfolio diversification principles"
            checkboxes={[
              "I understand the importance of portfolio diversification",
              "I will spread my investments across different asset classes",
              "I will diversify within asset classes (sectors, company sizes)",
              "I will consider geographic diversification in my portfolio"
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
      lessonSlug="the-principle-of-portfolio-diversification"
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
