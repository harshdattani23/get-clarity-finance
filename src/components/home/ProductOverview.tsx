"use client";

import { Shield, BookOpen, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function ProductOverview() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Empowering Indian Investors Through Education & Protection
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            SEBI Verify is a comprehensive investment education platform that combines 
            AI-powered fraud detection, professional trading courses, and real-time market simulation 
            to help you invest safely and confidently.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Fraud Detection</h3>
            <p className="text-gray-600 text-sm">
              Instantly verify suspicious messages and investment opportunities
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">50+ Courses</h3>
            <p className="text-gray-600 text-sm">
              From basics to advanced trading strategies
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Virtual Trading</h3>
            <p className="text-gray-600 text-sm">
              Learn by doing virtual trades - not with real money
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Community Support</h3>
            <p className="text-gray-600 text-sm">
              Learn with thousands of Indian investors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
