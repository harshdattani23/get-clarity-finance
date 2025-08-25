"use client";

import { ShieldCheck, Award, Lock, CheckCircle } from 'lucide-react';

export default function TrustIndicators() {
  const trustBadges = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Educational Platform",
      description: "Focus on investor education and awareness"
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "Bank-Grade Security",
      description: "256-bit encryption for all your data"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Certified Educators",
      description: "Learn from NISM-certified professionals"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-600" />,
      title: "100% Transparent",
      description: "No hidden fees or misleading claims"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Why Trust SEBI Verify?
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Built with security and compliance at its core, ensuring your investment journey is safe and informed
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="mb-4">{badge.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
              <p className="text-gray-600 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start">
            <ShieldCheck className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">
                Zero Investment Advisory Services
              </h4>
              <p className="text-green-800 text-sm">
                We provide education only. We never ask for money for tips, recommendations, or guaranteed returns. 
                Report any such requests immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
