"use client";

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, Shield, AlertTriangle, CheckCircle, Globe, BarChart3, Target, DollarSign, TrendingDown } from 'lucide-react';

export default function IntroductionToCurrencyMarketsPage() {
  const { t } = useTranslation('stock-market-course');

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
            <span className="text-gray-900">{t('introduction-to-currency-markets.title')}</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('introduction-to-currency-markets.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('introduction-to-currency-markets.description')}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('introduction-to-currency-markets.whatIsCurrencyMarket')}</h2>
              
              <p className="text-gray-700 mb-6">
                {t('introduction-to-currency-markets.whatIsCurrencyMarketP1')}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex items-start">
                  <BookOpen className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{t('introduction-to-currency-markets.keyTakeaway')}</h4>
                    <p className="text-blue-800">
                      {t('introduction-to-currency-markets.keyTakeawayP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('introduction-to-currency-markets.howCurrencyMarketsWork')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Globe className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. {t('introduction-to-currency-markets.globalNetwork')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('introduction-to-currency-markets.globalNetworkP')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. {t('introduction-to-currency-markets.priceDiscovery')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('introduction-to-currency-markets.priceDiscoveryP')}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">3. {t('introduction-to-currency-markets.continuousTrading')}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('introduction-to-currency-markets.continuousTradingP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('introduction-to-currency-markets.majorCurrencyPairs')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('introduction-to-currency-markets.eurUsd')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('introduction-to-currency-markets.eurUsdP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('introduction-to-currency-markets.eurUsdNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('introduction-to-currency-markets.usdJpy')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('introduction-to-currency-markets.usdJpyP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('introduction-to-currency-markets.usdJpyNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('introduction-to-currency-markets.gbpUsd')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('introduction-to-currency-markets.gbpUsdP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('introduction-to-currency-markets.gbpUsdNickname')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💱</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('introduction-to-currency-markets.usdChf')}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('introduction-to-currency-markets.usdChfP')}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('introduction-to-currency-markets.usdChfNickname')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('introduction-to-currency-markets.factorsAffectingCurrencyPrices')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🏦 {t('introduction-to-currency-markets.centralBankPolicies')}</h4>
                  <p className="text-green-800 text-sm">
                    {t('introduction-to-currency-markets.centralBankPoliciesP')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📊 {t('introduction-to-currency-markets.economicIndicators')}</h4>
                  <p className="text-blue-800 text-sm">
                    {t('introduction-to-currency-markets.economicIndicatorsP')}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🌍 {t('introduction-to-currency-markets.politicalEvents')}</h4>
                  <p className="text-purple-800 text-sm">
                    {t('introduction-to-currency-markets.politicalEventsP')}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">💼 {t('introduction-to-currency-markets.marketSentiment')}</h4>
                  <p className="text-orange-800 text-sm">
                    {t('introduction-to-currency-markets.marketSentimentP')}
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">🛢️ {t('introduction-to-currency-markets.commodityPrices')}</h4>
                  <p className="text-indigo-800 text-sm">
                    {t('introduction-to-currency-markets.commodityPricesP')}
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">📈 {t('introduction-to-currency-markets.technicalFactors')}</h4>
                  <p className="text-pink-800 text-sm">
                    {t('introduction-to-currency-markets.technicalFactorsP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('introduction-to-currency-markets.currencyMarketParticipants')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏦 {t('introduction-to-currency-markets.centralBanks')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('introduction-to-currency-markets.centralBanksP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏛️ {t('introduction-to-currency-markets.commercialBanks')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('introduction-to-currency-markets.commercialBanksP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💼 {t('introduction-to-currency-markets.investmentFunds')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('introduction-to-currency-markets.investmentFundsP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏢 {t('introduction-to-currency-markets.corporations')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('introduction-to-currency-markets.corporationsP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">👤 {t('introduction-to-currency-markets.retailTraders')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('introduction-to-currency-markets.retailTradersP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('introduction-to-currency-markets.currencyMarketCharacteristics')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">⏰ {t('introduction-to-currency-markets.trading24_5')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.trading24_5P')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">💧 {t('introduction-to-currency-markets.highLiquidity')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.highLiquidityP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📊 {t('introduction-to-currency-markets.leverageAvailable')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.leverageAvailableP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🌍 {t('introduction-to-currency-markets.globalMarket')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.globalMarketP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">📈 {t('introduction-to-currency-markets.lowTransactionCosts')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.lowTransactionCostsP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🎯 {t('introduction-to-currency-markets.twoWayTrading')}</h4>
                    <p className="text-gray-700 text-sm">{t('introduction-to-currency-markets.twoWayTradingP')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">{t('introduction-to-currency-markets.riskWarning')}</h4>
                    <p className="text-yellow-800">
                      {t('introduction-to-currency-markets.riskWarningP')}
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
