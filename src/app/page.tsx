"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import { BookOpen, AlertTriangle, Brain } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      
      {/* Main Content Area */}
      <main className="grid md:grid-cols-2 gap-16 items-start">
        
        {/* Left: Greeting and Prompt */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t('title')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-2">{t('subtitle')}</p>
          </div>
          
          <div id="analyzer" className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <ContentAnalyzer />
          </div>
        </div>

        {/* Right: Awareness Hub and Information */}
        <div className="space-y-8 mt-4 md:mt-0">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-900 mb-2">{t('stockMarketCourse.title')}</h2>
              <p className="text-gray-600 mb-4">
                {t('stockMarketCourse.description')}
              </p>
              <Link href="/stock-market-course" className="text-purple-600 font-semibold hover:underline">
                {t('stockMarketCourse.link')} →
              </Link>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Brain className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-2">{t('investmentQuiz.title')}</h2>
              <p className="text-gray-600 mb-4">
                {t('investmentQuiz.description')}
              </p>
              <Link href="/investment-quiz" className="text-green-600 font-semibold hover:underline">
                {t('investmentQuiz.link')} →
              </Link>
            </div>
          </div>
           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start gap-4">
             <div className="bg-yellow-100 p-3 rounded-full">
               <AlertTriangle className="w-6 h-6 text-yellow-700" />
             </div>
             <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{t('about.title')}</h2>
              <p className="text-gray-600">
                {t('about.description')}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
