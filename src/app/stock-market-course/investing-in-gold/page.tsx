"use client";

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, Shield, AlertTriangle, CheckCircle, Coins, BarChart3, Target, DollarSign } from 'lucide-react';

export default function InvestingInGoldPage() {
  const { t } = useTranslation('stock-market-course');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/stock-market-course" className="hover:text-green-600">Stock Market Course</Link>
            <span>→</span>
            <Link href="/stock-market-course#gold-and-commodities" className="hover:text-green-600">Gold and Commodities Investing</Link>
            <span>→</span>
            <span className="text-gray-900">{t('investing-in-gold.title')}</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('investing-in-gold.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('investing-in-gold.description')}
            </p>
          </header>

          {/* Course Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
              <span className="text-sm text-gray-500">1 of 6 lessons completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('investing-in-gold.whyInvestInGold')}</h2>
              
              <p className="text-gray-700 mb-6">
                {t('investing-in-gold.whyInvestInGoldP1')}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex items-start">
                  <BookOpen className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{t('investing-in-gold.keyTakeaway')}</h4>
                    <p className="text-blue-800">
                      {t('investing-in-gold.keyTakeawayP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('investing-in-gold.benefitsOfGoldInvestment')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">🛡️ {t('investing-in-gold.inflationHedge')}</h4>
                  <p className="text-yellow-800 text-sm">
                    {t('investing-in-gold.inflationHedgeP')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📊 {t('investing-in-gold.portfolioDiversification')}</h4>
                  <p className="text-blue-800 text-sm">
                    {t('investing-in-gold.portfolioDiversificationP')}
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">💱 {t('investing-in-gold.currencyHedge')}</h4>
                  <p className="text-green-800 text-sm">
                    {t('investing-in-gold.currencyHedgeP')}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">🌍 {t('investing-in-gold.globalAcceptance')}</h4>
                  <p className="text-purple-800 text-sm">
                    {t('investing-in-gold.globalAcceptanceP')}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">📈 {t('investing-in-gold.longTermGrowth')}</h4>
                  <p className="text-orange-800 text-sm">
                    {t('investing-in-gold.longTermGrowthP')}
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">🎯 {t('investing-in-gold.culturalSignificance')}</h4>
                  <p className="text-indigo-800 text-sm">
                    {t('investing-in-gold.culturalSignificanceP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('investing-in-gold.waysToInvestInGold')}</h3>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🥇</div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('investing-in-gold.physicalGold')}</h4>
                      <p className="text-gray-700 mb-4">
                        {t('investing-in-gold.physicalGoldP')}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">✅ {t('investing-in-gold.advantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.tangibleAsset')}</li>
                            <li>• {t('investing-in-gold.noCounterpartyRisk')}</li>
                            <li>• {t('investing-in-gold.culturalValue')}</li>
                            <li>• {t('investing-in-gold.canBeUsedAsJewelry')}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">❌ {t('investing-in-gold.disadvantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.storageConcerns')}</li>
                            <li>• {t('investing-in-gold.makingCharges')}</li>
                            <li>• {t('investing-in-gold.purityVerification')}</li>
                            <li>• {t('investing-in-gold.lowerLiquidity')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">📊</div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('investing-in-gold.goldEtfs')}</h4>
                      <p className="text-gray-700 mb-4">
                        {t('investing-in-gold.goldEtfsP')}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">✅ {t('investing-in-gold.advantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.highLiquidity')}</li>
                            <li>• {t('investing-in-gold.lowerExpenseRatio')}</li>
                            <li>• {t('investing-in-gold.noStorageConcerns')}</li>
                            <li>• {t('investing-in-gold.canBeTradedAnytime')}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">❌ {t('investing-in-gold.disadvantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.requiresDematAccount')}</li>
                            <li>• {t('investing-in-gold.tradingCosts')}</li>
                            <li>• {t('investing-in-gold.noPhysicalPossession')}</li>
                            <li>• {t('investing-in-gold.marketTimingRisk')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏛️</div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('investing-in-gold.sovereignGoldBonds')}</h4>
                      <p className="text-gray-700 mb-4">
                        {t('investing-in-gold.sovereignGoldBondsP')}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">✅ {t('investing-in-gold.advantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.governmentGuarantee')}</li>
                            <li>• {t('investing-in-gold.annualInterest')}</li>
                            <li>• {t('investing-in-gold.taxBenefits')}</li>
                            <li>• {t('investing-in-gold.noStorageCosts')}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">❌ {t('investing-in-gold.disadvantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.lockInPeriod')}</li>
                            <li>• {t('investing-in-gold.limitedLiquidity')}</li>
                            <li>• {t('investing-in-gold.availableOnlyDuringIssue')}</li>
                            <li>• {t('investing-in-gold.noPhysicalDelivery')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold flex-shrink-0 mt-1">🏦</div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">{t('investing-in-gold.digitalGold')}</h4>
                      <p className="text-gray-700 mb-4">
                        {t('investing-in-gold.digitalGoldP')}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">✅ {t('investing-in-gold.advantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.startWithSmallAmounts')}</li>
                            <li>• {t('investing-in-gold.easyToBuySell')}</li>
                            <li>• {t('investing-in-gold.optionForPhysicalDelivery')}</li>
                            <li>• {t('investing-in-gold.noMakingCharges')}</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <h5 className="font-semibold text-gray-900 mb-2">❌ {t('investing-in-gold.disadvantages')}</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• {t('investing-in-gold.platformRisk')}</li>
                            <li>• {t('investing-in-gold.higherPremiums')}</li>
                            <li>• {t('investing-in-gold.limitedPlatforms')}</li>
                            <li>• {t('investing-in-gold.conversionFees')}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('investing-in-gold.factorsAffectingGoldPrices')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🌍 {t('investing-in-gold.globalFactors')}</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• {t('investing-in-gold.usDollarStrength')}</li>
                      <li>• {t('investing-in-gold.globalEconomicConditions')}</li>
                      <li>• {t('investing-in-gold.centralBankPolicies')}</li>
                      <li>• {t('investing-in-gold.geopoliticalTensions')}</li>
                      <li>• {t('investing-in-gold.oilPrices')}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">🇮🇳 {t('investing-in-gold.indianFactors')}</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• {t('investing-in-gold.rupeeDollarRate')}</li>
                      <li>• {t('investing-in-gold.domesticDemand')}</li>
                      <li>• {t('investing-in-gold.importDuties')}</li>
                      <li>• {t('investing-in-gold.rbiGoldReserves')}</li>
                      <li>• {t('investing-in-gold.seasonalPatterns')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('investing-in-gold.goldInvestmentStrategies')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📈 {t('investing-in-gold.longTermInvestment')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('investing-in-gold.longTermInvestmentP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">⚖️ {t('investing-in-gold.portfolioAllocation')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('investing-in-gold.portfolioAllocationP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🔄 {t('investing-in-gold.systematicInvestment')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('investing-in-gold.systematicInvestmentP')}
                  </p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 {t('investing-in-gold.tacticalAllocation')}</h4>
                  <p className="text-gray-700 text-sm">
                    {t('investing-in-gold.tacticalAllocationP')}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">{t('investing-in-gold.importantConsiderations')}</h4>
                    <p className="text-yellow-800">
                      {t('investing-in-gold.importantConsiderationsP')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/stock-market-course#gold-and-commodities"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gold & Commodities Module</span>
            </Link>
            
            <Link
              href="/stock-market-course/gold-etfs-and-sovereign-gold-bonds"
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span>Next: Gold ETFs and SGBs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
