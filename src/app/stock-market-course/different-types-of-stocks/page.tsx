"use client";

import { useTranslation } from "@/hooks/useTranslation";
import LessonLayout from '../LessonLayout';
import { 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Users,
  Building2,
  Target,
  Lightbulb,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function DifferentTypesOfStocksPage() {
  const { t, translations } = useTranslation('stock-market-course.different-types-of-stocks');

  // Check if translations are loaded
  const isLoading = Object.keys(translations).length === 0;



  if (isLoading) {
    return (
      <LessonLayout
        title="Loading..."
        description="Loading lesson content..."
        lessonSlug="different-types-of-stocks"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lesson content...</p>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="different-types-of-stocks"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{t('introduction') as string}</h2>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>{t('introductionP1') as string}</p>
            <p>{t('introductionP2') as string}</p>
          </div>
        </div>

        {/* Common vs Preferred Stocks */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('commonVsPreferred.title') as string}</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.p1') }} />
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.p2') }} />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('commonVsPreferred.detailedComparison') as string}</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Common Stock Details */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800">{t('commonVsPreferred.commonStockDetails') as string}</h4>
              </div>
              <p className="text-blue-700 text-sm mb-3">{t('commonVsPreferred.commonStockDetailsP1') as string}</p>
              <p className="text-blue-700 text-sm mb-3">{t('commonVsPreferred.commonStockDetailsP2') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700">
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockFeatures.votingRights') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockFeatures.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockFeatures.capitalGains') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockFeatures.risk') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockFeatures.priority') }} />
              </ul>
            </div>

            {/* Preferred Stock Details */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800">{t('commonVsPreferred.preferredStockDetails') as string}</h4>
              </div>
              <p className="text-green-700 text-sm mb-3">{t('commonVsPreferred.preferredStockDetailsP1') as string}</p>
              <p className="text-green-700 text-sm mb-3">{t('commonVsPreferred.preferredStockDetailsP2') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockFeatures.fixedDividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockFeatures.priority') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockFeatures.noVoting') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockFeatures.limitedGrowth') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockFeatures.callable') }} />
              </ul>
            </div>
          </div>

          {/* Real World Examples */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('commonVsPreferred.realWorldExamples') as string}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">{t('commonVsPreferred.commonStockExamples') as string}</h4>
              <ul className="space-y-1 text-sm text-blue-700">
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.commonStockExamplesP3') }} />
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">{t('commonVsPreferred.preferredStockExamples') as string}</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('commonVsPreferred.preferredStockExamplesP3') }} />
              </ul>
            </div>
          </div>
        </div>

        {/* Market Cap Classification */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('byMarketCap.title') as string}</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('byMarketCap.p1') }} />
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('byMarketCap.p2') }} />
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('byMarketCap.p3') }} />
          </div>

          {/* Market Cap Definition */}
          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200 mb-6">
            <h3 className="text-xl font-semibold text-indigo-800 mb-3">{t('byMarketCap.marketCapDefinition') as string}</h3>
            <p className="text-indigo-700 mb-3">{t('byMarketCap.marketCapDefinitionP1') as string}</p>
            <p className="text-indigo-700 mb-3" dangerouslySetInnerHTML={{ __html: t('byMarketCap.marketCapDefinitionP2') }} />
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <h4 className="font-medium text-indigo-800 mb-2">{t('byMarketCap.marketCapExample') as string}</h4>
              <p className="text-indigo-700 text-sm mb-2">{t('byMarketCap.marketCapExampleP1') as string}</p>
              <p className="text-indigo-700 text-sm font-medium">{t('byMarketCap.marketCapExampleP2') as string}</p>
            </div>
          </div>

          {/* Market Cap Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Large Cap */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800">{t('byMarketCap.largeCapStocks') as string}</h3>
              </div>
              <p className="text-green-700 text-sm mb-3">{t('byMarketCap.largeCapStocksP1') as string}</p>
              <p className="text-green-700 text-sm mb-3">{t('byMarketCap.largeCapStocksP2') as string}</p>
              <ul className="space-y-1 text-sm text-green-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapCharacteristics.stability') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapCharacteristics.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapCharacteristics.growth') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapCharacteristics.risk') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapCharacteristics.liquidity') }} />
              </ul>
              <h4 className="font-medium text-green-800 mb-2">{t('byMarketCap.largeCapExamples') as string}</h4>
              <ul className="space-y-1 text-xs text-green-600">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapExamplesP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapExamplesP4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.largeCapExamplesP5') }} />
              </ul>
            </div>

            {/* Mid Cap */}
            <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-yellow-800">{t('byMarketCap.midCapStocks') as string}</h3>
              </div>
              <p className="text-yellow-700 text-sm mb-3">{t('byMarketCap.midCapStocksP1') as string}</p>
              <p className="text-yellow-700 text-sm mb-3">{t('byMarketCap.midCapStocksP2') as string}</p>
              <ul className="space-y-1 text-sm text-yellow-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapCharacteristics.growth') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapCharacteristics.risk') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapCharacteristics.opportunity') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapCharacteristics.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapCharacteristics.liquidity') }} />
              </ul>
              <h4 className="font-medium text-yellow-800 mb-2">{t('byMarketCap.midCapExamples') as string}</h4>
              <ul className="space-y-1 text-xs text-yellow-600">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapExamplesP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.midCapExamplesP4') }} />
              </ul>
            </div>

            {/* Small Cap */}
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-800">{t('byMarketCap.smallCapStocks') as string}</h3>
              </div>
              <p className="text-red-700 text-sm mb-3">{t('byMarketCap.smallCapStocksP1') as string}</p>
              <p className="text-red-700 text-sm mb-3">{t('byMarketCap.smallCapStocksP2') as string}</p>
              <ul className="space-y-1 text-sm text-red-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapCharacteristics.growth') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapCharacteristics.risk') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapCharacteristics.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapCharacteristics.liquidity') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapCharacteristics.opportunity') }} />
              </ul>
              <h4 className="font-medium text-red-800 mb-2">{t('byMarketCap.smallCapExamples') as string}</h4>
              <ul className="space-y-1 text-xs text-red-600">
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapExamplesP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byMarketCap.smallCapExamplesP4') }} />
              </ul>
            </div>
          </div>
        </div>

        {/* Investment Style Classification */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('byStyle.title') as string}</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('byStyle.p1') }} />
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: t('byStyle.p2') }} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Growth Stocks */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-800">{t('byStyle.growthStocks') as string}</h3>
              </div>
              <p className="text-emerald-700 text-sm mb-3">{t('byStyle.growthStocksP1') as string}</p>
              <p className="text-emerald-700 text-sm mb-3">{t('byStyle.growthStocksP2') as string}</p>
              <ul className="space-y-1 text-sm text-emerald-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthCharacteristics.revenue') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthCharacteristics.earnings') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthCharacteristics.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthCharacteristics.valuation') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthCharacteristics.risk') }} />
              </ul>
              <h4 className="font-medium text-emerald-800 mb-2">{t('byStyle.growthStockExamples') as string}</h4>
              <ul className="space-y-1 text-xs text-emerald-600">
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthStockExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthStockExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthStockExamplesP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.growthStockExamplesP4') }} />
              </ul>
            </div>

            {/* Value Stocks */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-blue-800">{t('byStyle.valueStocks') as string}</h3>
              </div>
              <p className="text-blue-700 text-sm mb-3">{t('byStyle.valueStocksP1') as string}</p>
              <p className="text-blue-700 text-sm mb-3">{t('byStyle.valueStocksP2') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700 mb-3">
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueCharacteristics.valuation') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueCharacteristics.dividends') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueCharacteristics.growth') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueCharacteristics.recognition') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueCharacteristics.opportunity') }} />
              </ul>
              <h4 className="font-medium text-blue-800 mb-2">{t('byStyle.valueStockExamples') as string}</h4>
              <ul className="space-y-1 text-xs text-blue-600">
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueStockExamplesP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueStockExamplesP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueStockExamplesP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('byStyle.valueStockExamplesP4') }} />
              </ul>
            </div>
          </div>
        </div>

        {/* Sector Classification */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('bySector.title') as string}</h2>
          <div className="space-y-4 mb-6">
            <p className="text-gray-700">{t('bySector.sectorDefinitionP1') as string}</p>
            <p className="text-gray-700">{t('bySector.sectorDefinitionP2') as string}</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('bySector.majorSectors') as string}</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Banking */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-full">
                  <Building2 className="w-4 h-4 text-green-600" />
                </div>
                <h4 className="font-medium text-green-800">{t('bySector.banking') as string}</h4>
              </div>
              <p className="text-green-700 text-sm mb-2">{t('bySector.bankingP1') as string}</p>
              <p className="text-green-700 text-sm mb-2">{t('bySector.bankingP2') as string}</p>
              <p className="text-green-600 text-xs">{t('bySector.bankingP3') as string}</p>
            </div>

            {/* Technology */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                </div>
                <h4 className="font-medium text-blue-800">{t('bySector.technology') as string}</h4>
              </div>
              <p className="text-blue-700 text-sm mb-2">{t('bySector.technologyP1') as string}</p>
              <p className="text-blue-700 text-sm mb-2">{t('bySector.technologyP2') as string}</p>
              <p className="text-blue-600 text-xs">{t('bySector.technologyP3') as string}</p>
            </div>

            {/* Consumer */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="font-medium text-purple-800">{t('bySector.consumer') as string}</h4>
              </div>
              <p className="text-purple-700 text-sm mb-2">{t('bySector.consumerP1') as string}</p>
              <p className="text-purple-700 text-sm mb-2">{t('bySector.consumerP2') as string}</p>
              <p className="text-purple-600 text-xs">{t('bySector.consumerP3') as string}</p>
            </div>

            {/* Energy */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 p-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                </div>
                <h4 className="font-medium text-orange-800">{t('bySector.energy') as string}</h4>
              </div>
              <p className="text-orange-700 text-sm mb-2">{t('bySector.energyP1') as string}</p>
              <p className="text-orange-700 text-sm mb-2">{t('bySector.energyP2') as string}</p>
              <p className="text-orange-600 text-xs">{t('bySector.energyP3') as string}</p>
            </div>

            {/* Healthcare */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-100 p-2 rounded-full">
                  <Shield className="w-4 h-4 text-red-600" />
                </div>
                <h4 className="font-medium text-red-800">{t('bySector.healthcare') as string}</h4>
              </div>
              <p className="text-red-700 text-sm mb-2">{t('bySector.healthcareP1') as string}</p>
              <p className="text-red-700 text-sm mb-2">{t('bySector.healthcareP2') as string}</p>
              <p className="text-red-600 text-xs">{t('bySector.healthcareP3') as string}</p>
            </div>

            {/* Automobile */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-yellow-600" />
                </div>
                <h4 className="font-medium text-yellow-800">{t('bySector.automobile') as string}</h4>
              </div>
              <p className="text-yellow-700 text-sm mb-2">{t('bySector.automobileP1') as string}</p>
              <p className="text-yellow-700 text-sm mb-2">{t('bySector.automobileP2') as string}</p>
              <p className="text-yellow-600 text-xs">{t('bySector.automobileP3') as string}</p>
            </div>
          </div>
        </div>

        {/* Investment Strategy */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('investmentStrategy') as string}</h2>
          <p className="text-gray-700 mb-6">{t('investmentStrategyP1') as string}</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Conservative Strategy */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800">{t('conservativeStrategy') as string}</h3>
              </div>
              <p className="text-green-700 text-sm mb-3">{t('conservativeStrategyP1') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                <li dangerouslySetInnerHTML={{ __html: t('conservativeStrategyP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('conservativeStrategyP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('conservativeStrategyP4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('conservativeStrategyP5') }} />
              </ul>
            </div>

            {/* Moderate Strategy */}
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-yellow-800">{t('moderateStrategy') as string}</h3>
              </div>
              <p className="text-yellow-700 text-sm mb-3">{t('moderateStrategyP1') as string}</p>
              <ul className="space-y-1 text-sm text-yellow-700">
                <li dangerouslySetInnerHTML={{ __html: t('moderateStrategyP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('moderateStrategyP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('moderateStrategyP4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('moderateStrategyP5') }} />
              </ul>
            </div>

            {/* Aggressive Strategy */}
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-red-800">{t('aggressiveStrategy') as string}</h3>
              </div>
              <p className="text-red-700 text-sm mb-3">{t('aggressiveStrategyP1') as string}</p>
              <ul className="space-y-1 text-sm text-red-700">
                <li dangerouslySetInnerHTML={{ __html: t('aggressiveStrategyP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('aggressiveStrategyP3') }} />
                <li dangerouslySetInnerHTML={{ __html: t('aggressiveStrategyP4') }} />
                <li dangerouslySetInnerHTML={{ __html: t('aggressiveStrategyP5') }} />
              </ul>
            </div>
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('portfolioAllocation') as string}</h2>
          <p className="text-gray-700 mb-6">{t('portfolioAllocationP1') as string}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">{t('allocationByMarketCap') as string}</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li dangerouslySetInnerHTML={{ __html: t('allocationByMarketCapP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('allocationByMarketCapP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('allocationByMarketCapP3') }} />
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-3">{t('allocationByStyle') as string}</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li dangerouslySetInnerHTML={{ __html: t('allocationByStyleP1') }} />
                <li dangerouslySetInnerHTML={{ __html: t('allocationByStyleP2') }} />
                <li dangerouslySetInnerHTML={{ __html: t('allocationByStyleP3') }} />
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 mt-6">
            <h3 className="font-semibold text-purple-800 mb-3">{t('sectorDiversification') as string}</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li dangerouslySetInnerHTML={{ __html: t('sectorDiversificationP1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('sectorDiversificationP2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('sectorDiversificationP3') }} />
              <li dangerouslySetInnerHTML={{ __html: t('sectorDiversificationP4') }} />
            </ul>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTakeaways.title') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="flex items-start gap-3">
                <div className="bg-purple-100 p-1 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                </div>
                <li className="text-gray-700 list-none" dangerouslySetInnerHTML={{ __html: t(`keyTakeaways.item${num}`) }} />
              </div>
            ))}
          </div>
        </div>

        {/* Key Terms */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyTerms.title') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <div key={num} className="bg-gray-50 rounded-lg p-3">
                <li className="text-gray-700 list-none text-sm" dangerouslySetInnerHTML={{ __html: t(`keyTerms.term${num}`) }} />
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
