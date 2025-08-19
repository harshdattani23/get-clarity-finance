"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LessonLayout from '../LessonLayout';
import InteractiveQuiz from '@/components/stock-market-course/InteractiveQuiz';
import InteractiveSelection from '@/components/stock-market-course/InteractiveSelection';
import ShortQuestions from '@/components/stock-market-course/ShortQuestions';
import AudioElement from '@/components/stock-market-course/AudioElement';
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  DollarSign, 
  BookOpen, 
  AlertTriangle, 
  Lightbulb 
} from 'lucide-react';

export default function WhatIsAStockPage() {
  const { t } = useTranslation('stock-market-course.what-is-a-stock');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="what-is-a-stock"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('simpleDefinition') as string}</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: t('simpleDefinitionP1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('simpleDefinitionP2') }} />
          </div>
        </div>

        {/* Pizza Analogy Card */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-full">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-orange-800">{t('ownershipVisualTitle') as string}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <p className="text-orange-700">{t('ownershipVisualP1') as string}</p>
              <p className="text-orange-700 font-medium">{t('ownershipVisualP2') as string}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200 text-center">
              <div className="text-6xl mb-2">🍕</div>
              <p className="text-sm text-orange-600">Each slice = 1 share</p>
            </div>
          </div>
        </div>

        {/* Interactive Quiz - Understanding Ownership */}
        <InteractiveQuiz
          questions={[
            {
              id: 'ownership-1',
              question: 'If you own 10 shares of a company that has 1000 total shares, what percentage of the company do you own?',
              options: ['1%', '10%', '0.1%', '100%'],
              correctAnswer: 0,
              explanation: 'Correct! 10 shares out of 1000 total shares equals 1% ownership. This means you own 1% of the company.'
            },
            {
              id: 'ownership-2',
              question: 'What happens to your ownership percentage if the company issues more shares?',
              options: ['Your percentage increases', 'Your percentage decreases', 'Your percentage stays the same', 'You lose all ownership'],
              correctAnswer: 1,
              explanation: 'Correct! When a company issues more shares, your ownership percentage decreases because the total number of shares increases while you still own the same number.'
            },
            {
              id: 'ownership-3',
              question: 'Which of the following is NOT a right that comes with stock ownership?',
              options: ['Voting on company decisions', 'Receiving dividends', 'Guaranteed profits', 'Claiming company assets if it goes bankrupt'],
              correctAnswer: 2,
              explanation: 'Correct! Stock ownership does NOT guarantee profits. Stock prices can go up or down, and there&apos;s always a risk of losing money.'
            }
          ]}
          onComplete={(score, total) => {
            console.log(`Quiz completed! Score: ${score}/${total}`);
          }}
        />

        {/* Detailed Explanation */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{t('detailedExplanation') as string}</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>{t('detailedExplanationP1') as string}</p>
            <p>{t('detailedExplanationP2') as string}</p>
          </div>
        </div>

        {/* Interactive Selection - Stock Characteristics */}
        <InteractiveSelection
          title="Understanding Stock Characteristics"
          description="Select all the characteristics that apply to stocks. Think about what makes stocks unique as an investment."
          options={[
            {
              id: 'characteristic-1',
              text: 'Stocks represent partial ownership in a company',
              isCorrect: true,
              explanation: 'Correct! When you buy a stock, you become a partial owner of that company.'
            },
            {
              id: 'characteristic-2',
              text: 'Stock prices are guaranteed to increase over time',
              isCorrect: false,
              explanation: 'Incorrect! Stock prices are not guaranteed to increase. They can go up or down based on many factors.'
            },
            {
              id: 'characteristic-3',
              text: 'Stockholders can vote on important company decisions',
              isCorrect: true,
              explanation: 'Correct! Common stockholders typically have voting rights on major company decisions.'
            },
            {
              id: 'characteristic-4',
              text: 'Stocks provide regular fixed income payments',
              isCorrect: false,
              explanation: 'Incorrect! Stocks don\'t provide fixed income. Dividends may be paid but they\'re not guaranteed or fixed.'
            },
            {
              id: 'characteristic-5',
              text: 'Stock ownership can be transferred to others',
              isCorrect: true,
              explanation: 'Correct! Stocks are easily transferable and can be bought or sold on stock exchanges.'
            },
            {
              id: 'characteristic-6',
              text: 'Stockholders have unlimited liability for company debts',
              isCorrect: false,
              explanation: 'Incorrect! Stockholders have limited liability - they can only lose what they invested, not more.'
            }
          ]}
          onComplete={(score, total) => {
            console.log(`Selection completed! Score: ${score}/${total}`);
          }}
        />

        {/* Real World Example */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">{t('realWorldExample') as string}</h3>
          </div>
          <p className="text-green-700 mb-4">{t('realWorldExampleP1') as string}</p>
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <ul className="space-y-2 text-green-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP2') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP3') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP3') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP5') as string}
              </li>
            </ul>
          </div>
        </div>

        {/* Short Questions - Real World Application */}
        <ShortQuestions
          title="Understanding Real World Stock Examples"
          description="Answer these questions to test your understanding of how stocks work in the real world."
          questions={[
            {
              id: 'real-world-1',
              question: 'If you buy 100 shares of Reliance Industries at ₹2,500 per share, what is your total investment?',
              hint: 'Think about multiplying the number of shares by the price per share.',
              correctAnswer: '₹2,50,000',
              explanation: 'Correct! 100 shares × ₹2,500 = ₹2,50,000. This is your total investment in Reliance Industries.'
            },
            {
              id: 'real-world-2',
              question: 'What happens to your investment if Reliance Industries\' stock price increases to ₹3,000 per share?',
              hint: 'Calculate the new total value and compare it to your original investment.',
              correctAnswer: 'Your investment increases to ₹3,00,000, giving you a profit of ₹50,000',
              explanation: 'Correct! 100 shares × ₹3,000 = ₹3,00,000. Your profit is ₹3,00,000 - ₹2,50,000 = ₹50,000.'
            },
            {
              id: 'real-world-3',
              question: 'If Reliance Industries pays a dividend of ₹25 per share, how much dividend income will you receive?',
              hint: 'Multiply the dividend per share by the number of shares you own.',
              correctAnswer: '₹2,500',
              explanation: 'Correct! 100 shares × ₹25 = ₹2,500. This is additional income you receive as a shareholder.'
            }
          ]}
          onComplete={(score, total) => {
            console.log(`Short questions completed! Score: ${score}/${total}`);
          }}
        />

        {/* Ownership Rights Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('ownershipRights') as string}</h2>
            <p className="text-gray-600">{t('ownershipRightsP1') as string}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Voting Rights Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800">{t('votingRights') as string}</h3>
              </div>
              <p className="text-purple-700 text-sm mb-3">{t('votingRightsP1') as string}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP2') as string}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP3') as string}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP4') as string}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP5') as string}
                </li>
              </ul>
              <p className="text-xs text-purple-600 italic mt-3">{t('votingRightsP6') as string}</p>
            </div>

            {/* Profit Sharing Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-800">{t('profitSharing') as string}</h3>
              </div>
              <p className="text-emerald-700 text-sm mb-3">{t('profitSharingP1') as string}</p>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  <span dangerouslySetInnerHTML={{ __html: t('profitSharingP2') }} />
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  <span dangerouslySetInnerHTML={{ __html: t('profitSharingP3') }} />
                </li>
              </ul>
            </div>

            {/* Asset Claims Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-amber-800">{t('assetClaims') as string}</h3>
              </div>
              <p className="text-amber-700 text-sm mb-3">{t('assetClaimsP1') as string}</p>
              <p className="text-amber-700 text-sm">{t('assetClaimsP2') as string}</p>
            </div>
          </div>
        </div>

        {/* Why Companies Issue Stock */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('whyCompaniesIssue') as string}</h2>
          <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: t('whyCompaniesIssueP1') }} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('fundingGrowth') as string}</h3>
                <p className="text-gray-600">{t('fundingGrowthP') as string}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('goingPublic') as string}</h3>
                <p className="text-gray-600">{t('goingPublicP') as string}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">{t('additionalReasons') as string}</h3>
              <p className="text-blue-700 text-sm mb-4">{t('additionalReasonsP1') as string}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('acquisitions') as string}</h4>
                  <p className="text-blue-600 text-xs">{t('acquisitionsP1') as string}</p>
                  <p className="text-blue-600 text-xs italic">{t('acquisitionsP2') as string}</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('employeeCompensation') as string}</h4>
                  <p className="text-blue-600 text-xs">{t('employeeCompensationP1') as string}</p>
                  <p className="text-blue-600 text-xs italic">{t('employeeCompensationP2') as string}</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('debtReduction') as string}</h4>
                  <p className="text-blue-600 text-xs">{t('debtReductionP1') as string}</p>
                  <p className="text-blue-600 text-xs italic">{t('debtReductionP2') as string}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why People Buy Stock */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('whyPeopleBuy') as string}</h2>
          <p className="text-gray-700 mb-6">{t('whyPeopleBuyP') as string}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">{t('capitalGains') as string}</h3>
              <p className="text-green-700 text-sm">{t('capitalGainsP') as string}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">{t('dividends') as string}</h3>
              <p className="text-blue-700 text-sm">{t('dividendsP') as string}</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">{t('investmentMotivations') as string}</h3>
          <p className="text-gray-700 mb-4">{t('investmentMotivationsP1') as string}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">{t('wealthBuilding') as string}</h4>
              <p className="text-yellow-700 text-sm mb-2">{t('wealthBuildingP1') as string}</p>
              <p className="text-yellow-600 text-xs italic">{t('wealthBuildingP2') as string}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">{t('inflationProtection') as string}</h4>
              <p className="text-red-700 text-sm mb-2">{t('inflationProtectionP1') as string}</p>
              <p className="text-red-600 text-xs italic">{t('inflationProtectionP2') as string}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">{t('ownershipPride') as string}</h4>
              <p className="text-purple-700 text-sm mb-2">{t('ownershipPrideP1') as string}</p>
              <p className="text-purple-600 text-xs italic">{t('ownershipPrideP2') as string}</p>
            </div>
          </div>
        </div>

        {/* Stock Types Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('stockTypes') as string}</h2>
          <p className="text-gray-700 mb-6">{t('stockTypesP1') as string}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('commonStock') as string}</h3>
                <p className="text-gray-600 text-sm">{t('commonStockP1') as string}</p>
                <p className="text-gray-600 text-sm">{t('commonStockP2') as string}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('preferredStock') as string}</h3>
                <p className="text-gray-600 text-sm">{t('preferredStockP1') as string}</p>
                <p className="text-gray-600 text-sm">{t('preferredStockP2') as string}</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-3">{t('stockClasses') as string}</h3>
              <p className="text-indigo-700 text-sm mb-3">{t('stockClassesP1') as string}</p>
              <ul className="space-y-1 text-sm text-indigo-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('stockClassesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('stockClassesP3') }} />
              </ul>
              <p className="text-indigo-600 text-xs">{t('stockClassesP4') as string}</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">{t('marketCapCategories') as string}</h3>
          <p className="text-gray-700 mb-4">{t('marketCapCategoriesP1') as string}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">{t('largeCap') as string}</h4>
              <p className="text-green-700 text-sm mb-2">{t('largeCapP1') as string}</p>
              <p className="text-green-600 text-xs">{t('largeCapP2') as string}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">{t('midCap') as string}</h4>
              <p className="text-yellow-700 text-sm mb-2">{t('midCapP1') as string}</p>
              <p className="text-yellow-600 text-xs">{t('midCapP2') as string}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">{t('smallCap') as string}</h4>
              <p className="text-red-700 text-sm mb-2">{t('smallCapP1') as string}</p>
              <p className="text-red-600 text-xs">{t('smallCapP2') as string}</p>
            </div>
          </div>
        </div>

        {/* Stock Risks Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('stockRisks') as string}</h2>
          <p className="text-gray-700 mb-6">{t('stockRisksP1') as string}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-red-800">{t('marketRisk') as string}</h3>
              </div>
              <p className="text-red-700 text-sm mb-2">{t('marketRiskP1') as string}</p>
              <p className="text-red-600 text-xs">{t('marketRiskP2') as string}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-orange-800">{t('companyRisk') as string}</h3>
              </div>
              <p className="text-orange-700 text-sm mb-2">{t('companyRiskP1') as string}</p>
              <p className="text-orange-600 text-xs">{t('companyRiskP2') as string}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-800">{t('liquidityRisk') as string}</h3>
              </div>
              <p className="text-yellow-700 text-sm mb-2">{t('liquidityRiskP1') as string}</p>
              <p className="text-yellow-600 text-xs">{t('liquidityRiskP2') as string}</p>
            </div>
          </div>
        </div>

        {/* Practical Example */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-800">{t('practicalExample') as string}</h2>
          </div>
          <p className="text-emerald-700 mb-4">{t('practicalExampleP1') as string}</p>
          <div className="bg-white rounded-xl p-4 border border-emerald-200">
            <ul className="space-y-2 text-emerald-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP2') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP3') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP4') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP5') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP6') as string}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP7') as string}
              </li>
            </ul>
          </div>
        </div>

        {/* Audio Summary */}
        <AudioElement
          title="Audio Summary: What is a Stock?"
          description="Listen to a concise summary of this lesson to reinforce your understanding."
          audioUrl="/audio/what-is-a-stock-summary.mp3"
          transcript="Welcome to the world of stocks! In this lesson, we learned that a stock represents partial ownership in a company. Think of it like owning a slice of pizza - the more slices you own, the bigger your share of the company. When you buy stocks, you become a shareholder with rights to vote on company decisions and receive dividends. However, remember that stock prices can go up or down, so there's always risk involved. The key is to understand what you're investing in and never invest more than you can afford to lose. Happy investing!"
          showTranscript={true}
        />

        {/* Key Takeaways */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTakeaways') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <li className="text-gray-700 list-none" dangerouslySetInnerHTML={{ __html: t(`takeaway${num}`) }} />
              </div>
            ))}
          </div>
        </div>

        {/* Key Terms */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTerms') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="bg-gray-50 rounded-lg p-3">
                <li className="text-gray-700 list-none text-sm" dangerouslySetInnerHTML={{ __html: t(`term${num}`) }} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-800">{t('nextSteps') as string}</h3>
          </div>
          <p className="text-blue-700 mb-2">{t('nextStepsP1') as string}</p>
          <p className="text-blue-700">{t('nextStepsP2') as string}</p>
        </div>
      </div>
    </LessonLayout>
  );
}
