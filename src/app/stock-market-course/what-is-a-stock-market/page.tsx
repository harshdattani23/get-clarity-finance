'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Building, Store, Users, TrendingUp, Shield, Target, Zap, CheckCircle, ArrowRight, BarChart3, DollarSign, BookOpen, UserCheck, AlertTriangle, MapPin, Calendar, ChartBar, Handshake, Rocket, ShieldCheck, Clock, TrendingDown } from 'lucide-react';

const WhatIsAStockMarket = () => {
  const { t, translations } = useTranslation('stock-market-course.what-is-a-stock-market');

  // Check if translations are loaded
  const isLoading = Object.keys(translations).length === 0;

  // Helper function to safely get array values
  const getArray = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  if (isLoading) {
    return (
      <LessonLayout
        title="Loading..."
        description="Loading lesson content..."
        lessonSlug="what-is-a-stock-market"
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
      lessonSlug="what-is-a-stock-market"
    >
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">{t('hero.title') as string}</h1>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t('hero.subtitle') as string}</h2>
            <p className="text-lg text-blue-800 max-w-3xl mx-auto">{t('hero.description') as string}</p>
          </div>
        </div>

        {/* What Exactly is a Stock Market */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('whatIsIt.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('whatIsIt.definition') as string}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {getArray('whatIsIt.keyPoints').map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: point }} />
              </div>
            ))}
          </div>
        </div>

        {/* Analogy Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('analogy.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('analogy.p1') as string }} />
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg border border-blue-200 bg-blue-50">
              <Store className="mx-auto w-12 h-12 text-blue-500 mb-3" />
              <h3 className="font-bold text-lg text-blue-800">{t('analogy.supermarket.title') as string}</h3>
              <p className="text-sm text-blue-700">{t('analogy.supermarket.p') as string}</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-green-200 bg-green-50">
              <Building className="mx-auto w-12 h-12 text-green-500 mb-3" />
              <h3 className="font-bold text-lg text-green-800">{t('analogy.stockMarket.title') as string}</h3>
              <p className="text-sm text-green-700">{t('analogy.stockMarket.p') as string}</p>
            </div>
          </div>
        </div>

        {/* Core Functions Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('coreFunctions.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('coreFunctions.p1') as string}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-lg text-blue-800">{t('coreFunctions.functions.capitalFormation.title') as string}</h3>
              </div>
              <p className="text-blue-700 mb-3">{t('coreFunctions.functions.capitalFormation.description') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700">
                {getArray('coreFunctions.functions.capitalFormation.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('coreFunctions.functions.liquidity.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('coreFunctions.functions.liquidity.description') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('coreFunctions.functions.liquidity.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <ChartBar className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-lg text-purple-800">{t('coreFunctions.functions.priceDiscovery.title') as string}</h3>
              </div>
              <p className="text-purple-700 mb-3">{t('coreFunctions.functions.priceDiscovery.description') as string}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                {getArray('coreFunctions.functions.priceDiscovery.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-8 h-8 text-orange-600" />
                <h3 className="font-bold text-lg text-orange-800">{t('coreFunctions.functions.wealthCreation.title') as string}</h3>
              </div>
              <p className="text-orange-700 mb-3">{t('coreFunctions.functions.wealthCreation.description') as string}</p>
              <ul className="space-y-1 text-sm text-orange-700">
                {getArray('coreFunctions.functions.wealthCreation.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Major Stock Exchanges in India */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('majorExchanges.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('majorExchanges.p1') as string}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-8 h-8 text-indigo-600" />
                <h3 className="font-bold text-lg text-indigo-800">{t('majorExchanges.exchanges.nse.title') as string}</h3>
              </div>
              <p className="text-indigo-700 mb-3">{t('majorExchanges.exchanges.nse.description') as string}</p>
              <ul className="space-y-1 text-sm text-indigo-700">
                {getArray('majorExchanges.exchanges.nse.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('majorExchanges.exchanges.bse.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('majorExchanges.exchanges.bse.description') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('majorExchanges.exchanges.bse.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Understanding Indian Market Indices */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('indices.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('indices.p1') as string}</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-lg text-blue-800">{t('indices.majorIndices.nifty50.title') as string}</h3>
              </div>
              <p className="text-blue-700 mb-3">{t('indices.majorIndices.nifty50.description') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700">
                {getArray('indices.majorIndices.nifty50.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('indices.majorIndices.sensex.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('indices.majorIndices.sensex.description') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('indices.majorIndices.sensex.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-lg text-purple-800">{t('indices.majorIndices.bankNifty.title') as string}</h3>
              </div>
              <p className="text-purple-700 mb-3">{t('indices.majorIndices.bankNifty.description') as string}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                {getArray('indices.majorIndices.bankNifty.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Indian Stock Market Trading Hours */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tradingHours.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('tradingHours.p1') as string}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-800 mb-2">{t('tradingHours.sessions.preMarket.title') as string}</h4>
              <p className="text-blue-700 text-sm mb-2">{t('tradingHours.sessions.preMarket.timing') as string}</p>
              <p className="text-blue-700 text-xs mb-3">{t('tradingHours.sessions.preMarket.description') as string}</p>
              <ul className="space-y-1 text-xs text-blue-700 text-left">
                {getArray('tradingHours.sessions.preMarket.activities').map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-800 mb-2">{t('tradingHours.sessions.marketOpen.title') as string}</h4>
              <p className="text-green-700 text-sm mb-2">{t('tradingHours.sessions.marketOpen.timing') as string}</p>
              <p className="text-green-700 text-xs mb-3">{t('tradingHours.sessions.marketOpen.description') as string}</p>
              <ul className="space-y-1 text-xs text-green-700 text-left">
                {getArray('tradingHours.sessions.marketOpen.activities').map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-purple-800 mb-2">{t('tradingHours.sessions.normalTrading.title') as string}</h4>
              <p className="text-purple-700 text-sm mb-2">{t('tradingHours.sessions.normalTrading.timing') as string}</p>
              <p className="text-purple-700 text-xs mb-3">{t('tradingHours.sessions.normalTrading.description') as string}</p>
              <ul className="space-y-1 text-xs text-purple-700 text-left">
                {getArray('tradingHours.sessions.normalTrading.activities').map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-orange-800 mb-2">{t('tradingHours.sessions.marketClose.title') as string}</h4>
              <p className="text-orange-700 text-sm mb-2">{t('tradingHours.sessions.marketClose.timing') as string}</p>
              <p className="text-orange-700 text-xs mb-3">{t('tradingHours.sessions.marketClose.description') as string}</p>
              <ul className="space-y-1 text-xs text-orange-700 text-left">
                {getArray('tradingHours.sessions.marketClose.activities').map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-orange-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-lg text-yellow-800 mb-3">{t('tradingHours.holidays.title') as string}</h3>
            <p className="text-yellow-700 mb-3">{t('tradingHours.holidays.description') as string}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {getArray('tradingHours.holidays.list').map((holiday, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-1 rounded-full mt-1">
                    <Calendar className="w-4 h-4 text-yellow-600" />
                  </div>
                  <p className="text-yellow-700">{holiday}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Types of Stock Markets */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('typesOfMarkets.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('typesOfMarkets.p1') as string}</p>
          
          {/* By Geography */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('typesOfMarkets.categories.byGeography.title') as string}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-bold text-lg text-blue-800 mb-2">{t('typesOfMarkets.categories.byGeography.domestic.title') as string}</h4>
                <p className="text-blue-700 mb-3">{t('typesOfMarkets.categories.byGeography.domestic.description') as string}</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  {getArray('typesOfMarkets.categories.byGeography.domestic.advantages').map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-blue-600" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-bold text-lg text-green-800 mb-2">{t('typesOfMarkets.categories.byGeography.international.title') as string}</h4>
                <p className="text-green-700 mb-3">{t('typesOfMarkets.categories.byGeography.international.description') as string}</p>
                <ul className="space-y-1 text-sm text-green-700">
                  {getArray('typesOfMarkets.categories.byGeography.international.advantages').map((advantage, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* By Company Size */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('typesOfMarkets.categories.byCompanySize.title') as string}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
                <h4 className="font-bold text-lg text-purple-800 mb-2">{t('typesOfMarkets.categories.byCompanySize.largeCap.title') as string}</h4>
                <p className="text-purple-700 text-sm mb-2">{t('typesOfMarkets.categories.byCompanySize.largeCap.description') as string}</p>
                <p className="text-xs text-purple-600 font-medium">{t('typesOfMarkets.categories.byCompanySize.largeCap.examples') as string}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                <h4 className="font-bold text-lg text-blue-800 mb-2">{t('typesOfMarkets.categories.byCompanySize.midCap.title') as string}</h4>
                <p className="text-blue-700 text-sm mb-2">{t('typesOfMarkets.categories.byCompanySize.midCap.description') as string}</p>
                <p className="text-xs text-blue-600 font-medium">{t('typesOfMarkets.categories.byCompanySize.midCap.examples') as string}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                <h4 className="font-bold text-lg text-green-800 mb-2">{t('typesOfMarkets.categories.byCompanySize.smallCap.title') as string}</h4>
                <p className="text-green-700 text-sm mb-2">{t('typesOfMarkets.categories.byCompanySize.smallCap.description') as string}</p>
                <p className="text-xs text-green-600 font-medium">{t('typesOfMarkets.categories.byCompanySize.smallCap.examples') as string}</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('howItWorks.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('howItWorks.p1') as string}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-purple-800 mb-2">{t('howItWorks.process.step1.title') as string}</h4>
              <p className="text-purple-700 text-sm">{t('howItWorks.process.step1.description') as string}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-blue-800 mb-2">{t('howItWorks.process.step2.title') as string}</h4>
              <p className="text-blue-700 text-sm">{t('howItWorks.process.step2.description') as string}</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">{t('howItWorks.process.step3.title') as string}</h4>
              <p className="text-green-700 text-sm">{t('howItWorks.process.step3.description') as string}</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold text-orange-800 mb-2">{t('howItWorks.process.step4.title') as string}</h4>
              <p className="text-orange-700 text-sm">{t('howItWorks.process.step4.description') as string}</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('participants.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('participants.p1') as string}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-lg text-blue-800">{t('participants.players.individualInvestors.title') as string}</h3>
              </div>
              <p className="text-blue-700 mb-3">{t('participants.players.individualInvestors.description') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700">
                {getArray('participants.players.individualInvestors.characteristics').map((characteristic, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {characteristic}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('participants.players.institutionalInvestors.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('participants.players.institutionalInvestors.description') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('participants.players.institutionalInvestors.examples').map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <Handshake className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-lg text-purple-800">{t('participants.players.companies.title') as string}</h3>
              </div>
              <p className="text-purple-700 mb-3">{t('participants.players.companies.description') as string}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                {getArray('participants.players.companies.activities').map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-8 h-8 text-orange-600" />
                <h3 className="font-bold text-lg text-orange-800">{t('participants.players.regulators.title') as string}</h3>
              </div>
              <p className="text-orange-700 mb-3">{t('participants.players.regulators.description') as string}</p>
              <ul className="space-y-1 text-sm text-orange-700">
                {getArray('participants.players.regulators.responsibilities').map((responsibility, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('benefits.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('benefits.p1') as string}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-lg text-blue-800">{t('benefits.advantages.wealthBuilding.title') as string}</h3>
              </div>
              <p className="text-blue-700 mb-3">{t('benefits.advantages.wealthBuilding.description') as string}</p>
              <ul className="space-y-1 text-sm text-blue-700">
                {getArray('benefits.advantages.wealthBuilding.examples').map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('benefits.advantages.ownership.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('benefits.advantages.ownership.description') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('benefits.advantages.ownership.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-lg text-purple-800">{t('benefits.advantages.diversification.title') as string}</h3>
              </div>
              <p className="text-purple-700 mb-3">{t('benefits.advantages.diversification.description') as string}</p>
              <ul className="space-y-1 text-sm text-purple-700">
                {getArray('benefits.advantages.diversification.advantages').map((advantage, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-600" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-8 h-8 text-orange-600" />
                <h3 className="font-bold text-lg text-orange-800">{t('benefits.advantages.liquidity.title') as string}</h3>
              </div>
              <p className="text-orange-700 mb-3">{t('benefits.advantages.liquidity.description') as string}</p>
              <ul className="space-y-1 text-sm text-orange-700">
                {getArray('benefits.advantages.liquidity.benefits').map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Risks */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('risks.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('risks.p1') as string}</p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-lg text-red-800">{t('risks.riskFactors.marketRisk.title') as string}</h3>
              </div>
              <p className="text-red-700 mb-3">{t('risks.riskFactors.marketRisk.description') as string}</p>
              <ul className="space-y-1 text-sm text-red-700">
                {getArray('risks.riskFactors.marketRisk.examples').map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-red-600" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-6 h-6 text-orange-600" />
                <h3 className="font-bold text-lg text-orange-800">{t('risks.riskFactors.companyRisk.title') as string}</h3>
              </div>
              <p className="text-orange-700 mb-3">{t('risks.riskFactors.companyRisk.description') as string}</p>
              <ul className="space-y-1 text-sm text-orange-700">
                {getArray('risks.riskFactors.companyRisk.examples').map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-orange-600" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <ChartBar className="w-6 h-6 text-yellow-600" />
                <h3 className="font-bold text-lg text-yellow-800">{t('risks.riskFactors.volatility.title') as string}</h3>
              </div>
              <p className="text-yellow-700 mb-3">{t('risks.riskFactors.volatility.description') as string}</p>
              <ul className="space-y-1 text-sm text-yellow-700">
                {getArray('risks.riskFactors.volatility.characteristics').map((characteristic, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-yellow-600" />
                    {characteristic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h3 className="font-bold text-lg text-blue-800 mb-3">{t('risks.riskManagement.title') as string}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {getArray('risks.riskManagement.strategies').map((strategy, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1 rounded-full mt-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-blue-700">{strategy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('gettingStarted.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('gettingStarted.p1') as string}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-blue-800 mb-2">{t('gettingStarted.steps.step1.title') as string}</h4>
              <p className="text-blue-700 text-sm mb-3">{t('gettingStarted.steps.step1.description') as string}</p>
              <ul className="space-y-1 text-xs text-blue-700 text-left">
                {getArray('gettingStarted.steps.step1.actions').map((action, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-600" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-green-800 mb-2">{t('gettingStarted.steps.step2.title') as string}</h4>
              <p className="text-green-700 text-sm mb-3">{t('gettingStarted.steps.step2.description') as string}</p>
              <ul className="space-y-1 text-xs text-green-700 text-left">
                {getArray('gettingStarted.steps.step2.examples').map((example, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-purple-800 mb-2">{t('gettingStarted.steps.step3.title') as string}</h4>
              <p className="text-purple-700 text-sm mb-3">{t('gettingStarted.steps.step3.description') as string}</p>
              <ul className="space-y-1 text-xs text-purple-700 text-left">
                {getArray('gettingStarted.steps.step3.requirements').map((requirement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-600" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-orange-800 mb-2">{t('gettingStarted.steps.step4.title') as string}</h4>
              <p className="text-orange-700 text-sm mb-3">{t('gettingStarted.steps.step4.description') as string}</p>
              <ul className="space-y-1 text-xs text-orange-700 text-left">
                {getArray('gettingStarted.steps.step4.approach').map((approach, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-orange-600" />
                    {approach}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('takeaways.title') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {getArray('takeaways.items').map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-yellow-100 p-1 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <li className="text-gray-700 list-none" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('nextSteps.title') as string}</h2>
          <p className="text-gray-700 mb-4">{t('nextSteps.description') as string}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {getArray('nextSteps.recommendations').map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-1">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default WhatIsAStockMarket;
