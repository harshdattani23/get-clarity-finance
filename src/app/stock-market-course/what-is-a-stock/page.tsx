"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LessonLayout from '../LessonLayout';
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
      title={t('title')}
      description={t('description')}
      lessonSlug="what-is-a-stock"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('simpleDefinition')}</h2>
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
            <h3 className="text-xl font-semibold text-orange-800">{t('ownershipVisualTitle')}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <p className="text-orange-700">{t('ownershipVisualP1')}</p>
              <p className="text-orange-700 font-medium">{t('ownershipVisualP2')}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200 text-center">
              <div className="text-6xl mb-2">🍕</div>
              <p className="text-sm text-orange-600">Each slice = 1 share</p>
            </div>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-2 rounded-full">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{t('detailedExplanation')}</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>{t('detailedExplanationP1')}</p>
            <p>{t('detailedExplanationP2')}</p>
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800">{t('realWorldExample')}</h3>
          </div>
          <p className="text-green-700 mb-4">{t('realWorldExampleP1')}</p>
          <div className="bg-white rounded-xl p-4 border border-green-200">
            <ul className="space-y-2 text-green-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP2')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP3')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP3')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('realWorldExampleP5')}
              </li>
            </ul>
          </div>
        </div>

        {/* Ownership Rights Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('ownershipRights')}</h2>
            <p className="text-gray-600">{t('ownershipRightsP1')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Voting Rights Card */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800">{t('votingRights')}</h3>
              </div>
              <p className="text-purple-700 text-sm mb-3">{t('votingRightsP1')}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP2')}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP3')}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP4')}
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" />
                  {t('votingRightsP5')}
                </li>
              </ul>
              <p className="text-xs text-purple-600 italic mt-3">{t('votingRightsP6')}</p>
            </div>

            {/* Profit Sharing Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-800">{t('profitSharing')}</h3>
              </div>
              <p className="text-emerald-700 text-sm mb-3">{t('profitSharingP1')}</p>
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
                <h3 className="font-semibold text-amber-800">{t('assetClaims')}</h3>
              </div>
              <p className="text-amber-700 text-sm mb-3">{t('assetClaimsP1')}</p>
              <p className="text-amber-700 text-sm">{t('assetClaimsP2')}</p>
            </div>
          </div>
        </div>

        {/* Why Companies Issue Stock */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('whyCompaniesIssue')}</h2>
          <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: t('whyCompaniesIssueP1') }} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('fundingGrowth')}</h3>
                <p className="text-gray-600">{t('fundingGrowthP')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('goingPublic')}</h3>
                <p className="text-gray-600">{t('goingPublicP')}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">{t('additionalReasons')}</h3>
              <p className="text-blue-700 text-sm mb-4">{t('additionalReasonsP1')}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('acquisitions')}</h4>
                  <p className="text-blue-600 text-xs">{t('acquisitionsP1')}</p>
                  <p className="text-blue-600 text-xs italic">{t('acquisitionsP2')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('employeeCompensation')}</h4>
                  <p className="text-blue-600 text-xs">{t('employeeCompensationP1')}</p>
                  <p className="text-blue-600 text-xs italic">{t('employeeCompensationP2')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 text-sm">{t('debtReduction')}</h4>
                  <p className="text-blue-600 text-xs">{t('debtReductionP1')}</p>
                  <p className="text-blue-600 text-xs italic">{t('debtReductionP2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why People Buy Stock */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('whyPeopleBuy')}</h2>
          <p className="text-gray-700 mb-6">{t('whyPeopleBuyP')}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">{t('capitalGains')}</h3>
              <p className="text-green-700 text-sm">{t('capitalGainsP')}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">{t('dividends')}</h3>
              <p className="text-blue-700 text-sm">{t('dividendsP')}</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">{t('investmentMotivations')}</h3>
          <p className="text-gray-700 mb-4">{t('investmentMotivationsP1')}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">{t('wealthBuilding')}</h4>
              <p className="text-yellow-700 text-sm mb-2">{t('wealthBuildingP1')}</p>
              <p className="text-yellow-600 text-xs italic">{t('wealthBuildingP2')}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">{t('inflationProtection')}</h4>
              <p className="text-red-700 text-sm mb-2">{t('inflationProtectionP1')}</p>
              <p className="text-red-600 text-xs italic">{t('inflationProtectionP2')}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">{t('ownershipPride')}</h4>
              <p className="text-purple-700 text-sm mb-2">{t('ownershipPrideP1')}</p>
              <p className="text-purple-600 text-xs italic">{t('ownershipPrideP2')}</p>
            </div>
          </div>
        </div>

        {/* Stock Types Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('stockTypes')}</h2>
          <p className="text-gray-700 mb-6">{t('stockTypesP1')}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('commonStock')}</h3>
                <p className="text-gray-600 text-sm">{t('commonStockP1')}</p>
                <p className="text-gray-600 text-sm">{t('commonStockP2')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{t('preferredStock')}</h3>
                <p className="text-gray-600 text-sm">{t('preferredStockP1')}</p>
                <p className="text-gray-600 text-sm">{t('preferredStockP2')}</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-3">{t('stockClasses')}</h3>
              <p className="text-indigo-700 text-sm mb-3">{t('stockClassesP1')}</p>
              <ul className="space-y-1 text-sm text-indigo-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('stockClassesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('stockClassesP3') }} />
              </ul>
              <p className="text-indigo-600 text-xs">{t('stockClassesP4')}</p>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">{t('marketCapCategories')}</h3>
          <p className="text-gray-700 mb-4">{t('marketCapCategoriesP1')}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">{t('largeCap')}</h4>
              <p className="text-green-700 text-sm mb-2">{t('largeCapP1')}</p>
              <p className="text-green-600 text-xs">{t('largeCapP2')}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2">{t('midCap')}</h4>
              <p className="text-yellow-700 text-sm mb-2">{t('midCapP1')}</p>
              <p className="text-yellow-600 text-xs">{t('midCapP2')}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <h4 className="font-medium text-red-800 mb-2">{t('smallCap')}</h4>
              <p className="text-red-700 text-sm mb-2">{t('smallCapP1')}</p>
              <p className="text-red-600 text-xs">{t('smallCapP2')}</p>
            </div>
          </div>
        </div>

        {/* Stock Risks Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('stockRisks')}</h2>
          <p className="text-gray-700 mb-6">{t('stockRisksP1')}</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-red-800">{t('marketRisk')}</h3>
              </div>
              <p className="text-red-700 text-sm mb-2">{t('marketRiskP1')}</p>
              <p className="text-red-600 text-xs">{t('marketRiskP2')}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-orange-800">{t('companyRisk')}</h3>
              </div>
              <p className="text-orange-700 text-sm mb-2">{t('companyRiskP1')}</p>
              <p className="text-orange-600 text-xs">{t('companyRiskP2')}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-yellow-800">{t('liquidityRisk')}</h3>
              </div>
              <p className="text-yellow-700 text-sm mb-2">{t('liquidityRiskP1')}</p>
              <p className="text-yellow-600 text-xs">{t('liquidityRiskP2')}</p>
            </div>
          </div>
        </div>

        {/* Practical Example */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-emerald-800">{t('practicalExample')}</h2>
          </div>
          <p className="text-emerald-700 mb-4">{t('practicalExampleP1')}</p>
          <div className="bg-white rounded-xl p-4 border border-emerald-200">
            <ul className="space-y-2 text-emerald-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP2')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP3')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP4')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP5')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP6')}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {t('practicalExampleP7')}
              </li>
            </ul>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTakeaways')}</h2>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTerms')}</h2>
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
            <h3 className="text-xl font-semibold text-blue-800">{t('nextSteps')}</h3>
          </div>
          <p className="text-blue-700 mb-2">{t('nextStepsP1')}</p>
          <p className="text-blue-700">{t('nextStepsP2')}</p>
        </div>
      </div>
    </LessonLayout>
  );
}
