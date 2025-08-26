"use client";

import Link from 'next/link';
import ContentAnalyzer from '@/components/ContentAnalyzer';
import HowItWorks from '@/components/home/HowItWorks';
import { Shield, TrendingUp, BookOpen, AlertTriangle, Play } from 'lucide-react';
import HeroNewsWidget from '@/components/home/HeroNewsWidget';
import AIAgentsTabs from '@/components/agents/AIAgentsTabs';

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Enhanced Hero Section with News Widget */}
      <section className="bg-[#163300] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 py-20 md:py-24">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Content - Main Hero */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                AI-Powered Investment Safety Platform
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Protect yourself from ₹50,000+ crore annual investment frauds. Learn stock market investing the right way with 50+ courses, practice risk-free with virtual trading, and verify every investment opportunity with AI.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8 w-full">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Instant Fraud Detection</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">50+ Expert Courses</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Learn by Virtual Trading</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-lime-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">100% Safe & Secure</span>
                </div>
              </div>

              {/* Clear CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="#demo" 
                  className="bg-lime-400 text-black font-bold px-6 py-3 rounded-full hover:bg-lime-500 transition-all transform hover:scale-105 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  See How It Works
                </Link>
                <Link 
                  href="/sign-up" 
                  className="bg-white text-[#163300] font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105"
                >
                  Learn About Investing
                </Link>
                <Link 
                  href="/virtual-trading" 
                  className="bg-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
                >
                  Practice Virtual Trading
                </Link>
              </div>

            </div>
            
            {/* Right Content - News Widget Box */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 lg:p-6 h-full max-h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base lg:text-lg font-semibold text-white">Latest Market Updates</h3>
                  <span className="text-xs text-lime-400 font-medium animate-pulse">LIVE</span>
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
              AI-Powered Fraud Detection Agents
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Test our advanced AI agents that protect investors from various types of financial fraud in real-time.
            </p>
          </div>
          
          <AIAgentsTabs />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Get Clarity in Action
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Try our AI-powered fraud detection tool right now. Paste any suspicious investment message below.
            </p>
          </div>
          
          {/* Content Analyzer Demo */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <ContentAnalyzer />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Try This Example:</h3>
              <p className="text-sm text-blue-800">
                "Guaranteed 200% returns in 30 days! Join our exclusive WhatsApp group for hot stock tips."
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2">Instant Analysis</h3>
              <p className="text-sm text-green-800">
                Our AI instantly identifies red flags and explains why something might be a scam.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2">Educational Insights</h3>
              <p className="text-sm text-purple-800">
                Learn what makes an investment legitimate vs fraudulent with detailed explanations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
