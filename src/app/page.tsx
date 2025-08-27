"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import HowItWorks from '@/components/home/HowItWorks';
import { Shield, TrendingUp, BookOpen, AlertTriangle, Play } from 'lucide-react';
import HeroNewsWidget from '@/components/home/HeroNewsWidget';
import AIAgentsTabs from '@/components/agents/AIAgentsTabs';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <div className="bg-white text-gray-800">
      {/* Enhanced Hero Section with News Widget */}
      <section className="bg-[#163300] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 pt-12 md:pt-14 pb-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Content - Main Hero */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t('hero.title')}
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {t('hero.subtitle')}
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8 w-full">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{t('hero.benefit1')}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{t('hero.benefit2')}</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{t('hero.benefit3')}</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">{t('hero.benefit4')}</span>
                </div>
              </div>

              {/* Clear CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="#demo" 
                  className="bg-lime-400 text-black font-bold px-6 py-3 rounded-full hover:bg-lime-500 transition-all transform hover:scale-105 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t('hero.cta1')}
                </Link>
                <Link 
                  href="/sign-up" 
                  className="bg-white text-[#163300] font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  {t('hero.cta2')}
                </Link>
                <Link 
                  href="/virtual-trading" 
                  className="bg-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
                >
                  {t('hero.cta3')}
                </Link>
              </div>

            </div>
            
            {/* Right Content - News Widget Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 lg:p-6 h-full max-h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base lg:text-lg font-semibold text-white">{t('news.title')}</h3>
                  <span className="text-xs text-lime-400 font-medium animate-pulse">{t('news.live')}</span>
                </div>
                <div className="bg-white rounded-xl overflow-hidden flex-1 min-h-0">
                  <div className="h-full p-3">
                    <HeroNewsWidget />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Fraud Detection Agents Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('agents.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('agents.subtitle')}
            </p>
          </div>
          
          <AIAgentsTabs />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

    </div>
  );
}
