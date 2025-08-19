"use client";

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft,
  BarChart3, 
  BookOpen, 
  Target, 
  AlertTriangle, 
  PieChart
} from 'lucide-react';

export default function IntroductionToMutualFundsPage() {
  const { t } = useTranslation('stock-market-course.introduction-to-mutual-funds');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/stock-market-course" className="hover:text-green-600">Stock Market Course</Link>
            <span>→</span>
            <Link href="/stock-market-course#mutual-funds" className="hover:text-green-600">Mutual Funds and ETFs</Link>
            <span>→</span>
            <span className="text-gray-900">{t('title') as string}</span>
          </nav>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('title') as string}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('description') as string}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whatAreMutualFunds') as string}</h2>
              
              <p className="text-gray-700 mb-6">
                {t('whatAreMutualFundsP1') as string}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex items-start">
                  <BookOpen className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900">{t('keyTakeaway') as string}</h4>
                    <p className="text-blue-800">
                      {t('keyTakeawayP') as string}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('howMutualFundsWork') as string}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <PieChart className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. {t('pooling') as string}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('poolingP') as string}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. {t('professionalManagement') as string}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('professionalManagementP') as string}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">3. {t('diversification') as string}</h4>
                    <p className="text-gray-700 text-sm">
                      {t('diversificationP') as string}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('benefitsOfMutualFunds') as string}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">🎯 {t('diversificationBenefit') as string}</h4>
                  <p className="text-green-800 text-sm">
                    {t('diversificationBenefitP') as string}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">👨‍💼 {t('professionalManagementBenefit') as string}</h4>
                  <p className="text-blue-800 text-sm">
                    {t('professionalManagementBenefitP') as string}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">💰 {t('affordability') as string}</h4>
                  <p className="text-purple-800 text-sm">
                    {t('affordabilityP') as string}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">📊 {t('liquidity') as string}</h4>
                  <p className="text-orange-800 text-sm">
                    {t('liquidityP') as string}
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-2">📈 {t('systematicInvesting') as string}</h4>
                  <p className="text-indigo-800 text-sm">
                    {t('systematicInvestingP') as string}
                  </p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-pink-900 mb-2">🏛️ {t('regulatoryOversight') as string}</h4>
                  <p className="text-pink-800 text-sm">
                    {t('regulatoryOversightP') as string}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('typesByAssetClass') as string}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">📈</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('equityFunds') as string}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('equityFundsP') as string}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('equityFundsExamples') as string}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">💰</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('debtFunds') as string}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('debtFundsP') as string}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('debtFundsExamples') as string}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">⚖️</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('hybridFunds') as string}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('hybridFundsP') as string}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('hybridFundsExamples') as string}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">🌍</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t('internationalFunds') as string}</h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {t('internationalFundsP') as string}
                      </p>
                      <div className="text-xs text-gray-500">
                        {t('internationalFundsExamples') as string}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('keyTerms') as string}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('nav') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('navP') as string}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('expenseRatio') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('expenseRatioP') as string}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('entryLoad') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('entryLoadP') as string}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('exitLoad') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('exitLoadP') as string}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('sip') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('sipP') as string}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('lumpSum') as string}</h4>
                    <p className="text-gray-700 text-sm">{t('lumpSumP') as string}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">{t('importantNote') as string}</h4>
                    <p className="text-yellow-800">
                      {t('importantNoteP') as string}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/stock-market-course#mutual-funds"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Mutual Funds Module</span>
            </Link>
            
            <Link
              href="/stock-market-course/types-of-mutual-funds"
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span>Next: Types of Mutual Funds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
