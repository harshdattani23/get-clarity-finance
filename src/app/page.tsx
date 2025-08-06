"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import { BookOpen, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      
      {/* Main Hero Section */}
      <main className="w-full max-w-4xl mx-auto py-20 md:py-32">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
          {t('heroTitle.line1')} <br /> {t('heroTitle.line2')}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
          {t('heroSubtitle')}
        </p>

        {/* Content Analyzer */}
        <div id="analyzer" className="w-full mt-16">
            <ContentAnalyzer />
        </div>
      </main>
      
      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto mt-24 mb-16 grid md:grid-cols-3 gap-8 text-left">
        <div className="border border-gray-800 rounded-lg p-6 hover:bg-gray-900 transition-colors">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-indigo-600/20 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{t('feature1Title')}</h3>
          </div>
          <p className="text-gray-400">
            {t('feature1Description')}
          </p>
          <Link href="/stock-market-course" className="text-indigo-400 font-semibold hover:underline mt-4 inline-block">
            {t('learnMore')} →
          </Link>
        </div>
        
        <div className="border border-gray-800 rounded-lg p-6 hover:bg-gray-900 transition-colors">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-green-600/20 p-3 rounded-full">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{t('feature2Title')}</h3>
          </div>
          <p className="text-gray-400">
            {t('feature2Description')}
          </p>
           <Link href="/fraud-protection" className="text-indigo-400 font-semibold hover:underline mt-4 inline-block">
            {t('learnMore')} →
          </Link>
        </div>

        <div className="border border-gray-800 rounded-lg p-6 hover:bg-gray-900 transition-colors">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-blue-600/20 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{t('feature3Title')}</h3>
          </div>
          <p className="text-gray-400">
            {t('feature3Description')}
          </p>
           <Link href="/virtual-trading" className="text-indigo-400 font-semibold hover:underline mt-4 inline-block">
            {t('learnMore')} →
          </Link>
        </div>
      </section>

       <footer className="w-full max-w-6xl mx-auto mt-24 pb-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} getclarity.finance. All rights reserved.</p>
      </footer>
    </div>
  );
}
