"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import { useTranslation } from '@/hooks/useTranslation';
import { BookOpen, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react';
import FloatingElementsAnimation from '@/components/animations/FloatingElementsAnimation';

export default function Home() {
  const { t } = useTranslation('home');

  const services = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: t('feature1Title'),
      description: t('feature1Description'),
      link: '/stock-market-course',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: t('feature2Title'),
      description: t('feature2Description'),
      link: '/fraud-protection',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-500" />,
      title: t('feature3Title'),
      description: t('feature3Description'),
      link: '/virtual-trading',
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#163300] text-white">
        <div className="container mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg text-white/80">
              {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="#analyzer" className="bg-lime-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-500 transition-colors">
                {t('hero.cta')}
              </Link>
              <Link href="/investment-quiz" className="bg-white/20 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition-colors">
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <FloatingElementsAnimation />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('services.title')}
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">{service.icon}</div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                 <Link href={service.link} className="text-blue-600 font-semibold mt-4 inline-block hover:underline">
                    {t('learnMore')} <ArrowRight className="inline w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Content Analyzer Section */}
      <section id="analyzer" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('analyzerTitle')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t('heroSubtitle')}</p>
            </div>
            <div className="mt-12">
                <ContentAnalyzer />
            </div>
        </div>
      </section>
    </div>
  );
}
