"use client";

import Link from 'next/link';
import { UserPlus, BookOpen, Shield, TrendingUp, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Sign Up Free",
      description: "Create your account in 30 seconds. No credit card required.",
      color: "blue"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verify Messages",
      description: "Use our AI to check suspicious investment offers instantly.",
      color: "green"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Learn Market Basics",
      description: "Understand stock market fundamentals and trading strategies.",
      color: "purple"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Practice Trading",
      description: "Use virtual money to practice in real market conditions.",
      color: "orange"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Invest Confidently",
      description: "Apply your knowledge to make informed investment decisions.",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to Smart Investing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and begin your path to becoming a confident investor
          </p>
        </div>

        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              return (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-white shadow-lg`}>
                      <span className={colors.text}>{step.icon}</span>
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 mt-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Ready to start your investment journey?</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/sign-up" 
              className="bg-[#163300] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1a4000] transition-colors"
            >
              Get Started Free
            </Link>
            <Link 
              href="/virtual-trading" 
              className="bg-white text-[#163300] border-2 border-[#163300] px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Trading
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
