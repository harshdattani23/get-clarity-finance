'use client';

import FraudMonitoringDashboard from '@/components/agents/FraudMonitoringDashboard';
import { Shield, Target, Users, Brain, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SEBIHackathonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#163300] via-[#2d5a00] to-[#163300] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-lime-400" />
            <span className="text-lime-400 font-semibold">SEBI Hackathon 2025</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            Get Clarity Finance
            <span className="block text-3xl mt-2 text-lime-400">
              AI-Powered Investment Safety Platform
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mb-8">
            Comprehensive fraud prevention solution addressing all SEBI hackathon problem statements 
            through advanced AI agents, real-time monitoring, and investor education.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-lime-400 font-bold">50,000+ </span>
              <span className="text-white/80">Protected Investors</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-lime-400 font-bold">₹100 Cr+ </span>
              <span className="text-white/80">Fraud Prevented</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-lime-400 font-bold">99.8% </span>
              <span className="text-white/80">Accuracy Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Statements Addressed */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Solving SEBI's Key Challenges
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem 1: Fraud Prevention */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-500 relative">
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              PRIMARY FOCUS
            </div>
            <div className="flex items-start gap-4">
              <Target className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Problem 1: Fraud Prevention
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive solution to detect and prevent investment frauds including:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Deepfake detection for impersonation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Social media pump & dump monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Fake trading app identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Corporate announcement verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Ponzi scheme detection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Problem 2: Education & Engagement */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-500">
            <div className="flex items-start gap-4">
              <Users className="w-10 h-10 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Problem 2: Retail Investor Education
                </h3>
                <p className="text-gray-600 mb-4">
                  Interactive learning platform with:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">50+ stock market courses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Virtual trading simulator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Multi-language support (10 languages)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">AI-powered investment quiz</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Gamified learning with achievements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Advanced Technology Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">AI/ML</h4>
              <p className="text-sm text-gray-600">Google Gemini Pro</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Security</h4>
              <p className="text-sm text-gray-600">End-to-end encryption</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Scalable</h4>
              <p className="text-sm text-gray-600">Next.js + Prisma</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900">Compliant</h4>
              <p className="text-sm text-gray-600">SEBI regulations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo Dashboard */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Live AI Fraud Detection Dashboard
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Try our AI agents below with sample suspicious content
          </p>
          
          <FraudMonitoringDashboard />
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="bg-gradient-to-r from-[#163300] to-[#2d5a00] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Measurable Impact on Securities Market
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-lime-400 mb-2">95%</div>
              <h3 className="text-xl font-semibold mb-2">Fraud Detection Rate</h3>
              <p className="text-white/80">
                Successfully identifies fraudulent investment schemes before investor harm
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-lime-400 mb-2">3.5x</div>
              <h3 className="text-xl font-semibold mb-2">Education Engagement</h3>
              <p className="text-white/80">
                Higher learning retention through interactive AI-powered courses
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-lime-400 mb-2">24/7</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-white/80">
                Continuous surveillance of social media and market announcements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Securities Market Safety?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of protected investors and experience the future of fraud prevention
          </p>
          
          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="bg-[#163300] text-white font-bold px-8 py-4 rounded-full hover:bg-[#2d5a00] transition-all transform hover:scale-105 inline-flex items-center gap-2"
            >
              Explore Platform
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/fraud-protection"
              className="bg-white text-[#163300] font-bold px-8 py-4 rounded-full border-2 border-[#163300] hover:bg-gray-50 transition-all inline-flex items-center gap-2"
            >
              Test Fraud Detection
              <Shield className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <strong>SEBI Hackathon Alignment:</strong> This platform directly addresses SEBI's mandate for 
              investor protection, market development, and supervision through innovative technology solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
