"use client";

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import LessonLayout from '../LessonLayout';
import { 
  Globe, 
  ArrowRight, 
  ArrowLeft,
  BarChart3, 
  BookOpen, 
  Target, 
  AlertTriangle 
} from 'lucide-react';

export default function IntroductionToCurrencyMarketsPage() {
  const { t, translations } = useTranslation('stock-market-course.introduction-to-currency-markets');

  // Check if translations are loaded
  const isLoading = Object.keys(translations).length === 0;



  if (isLoading) {
    return (
      <LessonLayout
        title="Loading..."
        description="Loading lesson content..."
        lessonSlug="introduction-to-currency-markets"
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/stock-market-course" className="hover:text-green-600">Stock Market Course</Link>
            <span>→</span>
            <Link href="/stock-market-course#currency-trading" className="hover:text-green-600">Currency Trading and Forex</Link>
            <span>→</span>
            <span className="text-gray-900">{t('title')}</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('description')}
            </p>
          </header>

          {/* Course Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
              <span className="text-sm text-gray-500">1 of 5 lessons completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whatIsCurrencyMarket')}</h2>
              
              <p className="text-gray-700 mb-6">
                {t('whatIsCurrencyMarketP1')}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex items-start">
                  <BookOpen className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{t('keyTakeaway')}</h4>
                    <p className="text-blue-800">
                      {t('keyTakeawayP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('howCurrencyMarketsWork')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. {t('globalNetwork')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('globalNetworkP')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. {t('priceDiscovery')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('priceDiscoveryP')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">3. {t('continuousTrading')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('continuousTradingP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('majorCurrencyPairs')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('eurUsd')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('eurUsdP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('eurUsdNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('usdJpy')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('usdJpyP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('usdJpyNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('gbpUsd')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('gbpUsdP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('gbpUsdNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('usdChf')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('usdChfP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('usdChfNickname')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('factorsAffectingCurrencyPrices')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🏦 {t('centralBankPolicies')}</h4>
                  <p className="text-green-800 text-sm">
                    {t('centralBankPoliciesP')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📊 {t('economicIndicators')}</h4>
                  <p className="text-blue-800 text-sm">
                    {t('economicIndicatorsP')}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🌍 {t('politicalEvents')}</h4>
                  <p className="text-purple-800 text-sm">
                    {t('politicalEventsP')}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">💼 {t('marketSentiment')}</h4>
                  <p className="text-orange-800 text-sm">
                    {t('marketSentimentP')}
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">🛢️ {t('commodityPrices')}</h4>
                  <p className="text-indigo-800 text-sm">
                    {t('commodityPricesP')}
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">📈 {t('technicalFactors')}</h4>
                  <p className="text-pink-800 text-sm">
                    {t('technicalFactorsP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('currencyMarketParticipants')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏦 {t('centralBanks')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('centralBanksP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏛️ {t('commercialBanks')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('commercialBanksP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💼 {t('investmentFunds')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('investmentFundsP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏢 {t('corporations')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('corporationsP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">👤 {t('retailTraders')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('retailTradersP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('currencyMarketCharacteristics')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">⏰ {t('trading24_5')}</h4>
                    <p className="text-gray-700 text-sm">{t('trading24_5P')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">💧 {t('highLiquidity')}</h4>
                    <p className="text-gray-700 text-sm">{t('highLiquidityP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📊 {t('leverageAvailable')}</h4>
                    <p className="text-gray-700 text-sm">{t('leverageAvailableP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🌍 {t('globalMarket')}</h4>
                    <p className="text-gray-700 text-sm">{t('globalMarketP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📈 {t('lowTransactionCosts')}</h4>
                    <p className="text-gray-700 text-sm">{t('lowTransactionCostsP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 {t('twoWayTrading')}</h4>
                    <p className="text-gray-700 text-sm">{t('twoWayTradingP')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">{t('riskWarning')}</h4>
                    <p className="text-yellow-800">
                      {t('riskWarningP')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/stock-market-course#currency-trading"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Currency Trading Module</span>
            </Link>
            
            <Link
              href="/stock-market-course/major-currency-pairs"
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span>Next: Major Currency Pairs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
