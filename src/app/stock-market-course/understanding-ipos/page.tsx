"use client";

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  AlertTriangle 
} from 'lucide-react';

export default function UnderstandingIPOsPage() {
  const { t } = useTranslation('stock-market-course.understanding-ipos');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/stock-market-course" className="hover:text-green-600">Stock Market Course</Link>
            <span>→</span>
            <Link href="/stock-market-course#ipos-and-new-listings" className="hover:text-green-600">IPOs and New Listings</Link>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whatIsIpo')}</h2>
              
              <p className="text-gray-700 mb-6">
                {t('whatIsIpoP1')}
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

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('whyCompaniesGoPublic')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">💰 {t('raisingCapital')}</h4>
                  <p className="text-green-800 text-sm">
                    {t('raisingCapitalP')}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🏢 {t('enhancedCredibility')}</h4>
                  <p className="text-blue-800 text-sm">
                    {t('enhancedCredibilityP')}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">📈 {t('liquidityForShareholders')}</h4>
                  <p className="text-purple-800 text-sm">
                    {t('liquidityForShareholdersP')}
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">🎯 {t('employeeBenefits')}</h4>
                  <p className="text-orange-800 text-sm">
                    {t('employeeBenefitsP')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('ipoProcessInIndia')}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('companyPreparation')}</h4>
                    <p className="text-gray-700">
                      {t('companyPreparationP')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('draftRedHerringProspectus')}</h4>
                    <p className="text-gray-700">
                      {t('draftRedHerringProspectusP')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('sebiReview')}</h4>
                    <p className="text-gray-700">
                      {t('sebiReviewP')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('ipoLaunch')}</h4>
                    <p className="text-gray-700">
                      {t('ipoLaunchP')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t('listing')}</h4>
                    <p className="text-gray-700">
                      {t('listingP')}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('typesOfIposInIndia')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 {t('bookBuildingIpo')}</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    {t('bookBuildingIpoP')}
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {t('mostCommonInIndia')}
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">💰 {t('fixedPriceIpo')}</h4>
                  <p className="text-gray-700 text-sm mb-3">
                    {t('fixedPriceIpoP')}
                  </p>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    {t('simplerProcess')}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('importantIpoTerms')}</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('faceValue')}</h4>
                    <p className="text-gray-700 text-sm">{t('faceValueP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('issuePrice')}</h4>
                    <p className="text-gray-700 text-sm">{t('issuePriceP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('lotSize')}</h4>
                    <p className="text-gray-700 text-sm">{t('lotSizeP')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('subscription')}</h4>
                    <p className="text-gray-700 text-sm">{t('subscriptionP')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <div className="flex items-start">
                  <AlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">{t('importantNote')}</h4>
                    <p className="text-yellow-800">
                      {t('importantNoteP')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/stock-market-course#ipos-and-new-listings"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to IPOs Module</span>
            </Link>
            
            <Link
              href="/stock-market-course/how-to-apply-for-ipos"
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <span>Next: How to Apply for IPOs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
