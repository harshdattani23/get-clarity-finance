'use client';

import { useState } from 'react';
import GeminiLiveChat from '@/components/GeminiLiveChat';
import { Zap, Shield, AlertTriangle, Phone, ExternalLink } from 'lucide-react';

export default function LiveChatPage() {
  const [showInfo, setShowInfo] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Real-time Streaming",
      description: "Get instant responses as they're generated, powered by Gemini 2.5 Flash"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      title: "Fraud Detection",
      description: "Automatic risk assessment and urgency classification for potential fraud"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Investment Verification",
      description: "Verify SEBI registration, check broker legitimacy, and validate platforms"
    },
    {
      icon: <Phone className="w-6 h-6 text-red-600" />,
      title: "Emergency Support",
      description: "Direct access to SEBI helpline and immediate action guidance"
    }
  ];

  const emergencyContacts = [
    {
      name: "SEBI Helpline",
      number: "1800-266-7575",
      purpose: "Investment fraud and regulatory issues"
    },
    {
      name: "Cyber Crime Helpline",
      number: "1930",
      purpose: "Online fraud and cyber crime reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Zap className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Gemini Live Chat
            </h1>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Powered by Gemini 2.5 Flash
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time AI assistance for fraud detection, investment verification, and SEBI compliance guidance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2">
            <GeminiLiveChat />
          </div>

          {/* Sidebar with Information */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Live Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border border-red-100">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {contact.name}
                      </h4>
                      <a
                        href={`tel:${contact.number}`}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                      >
                        Call {contact.number}
                      </a>
                    </div>
                    <p className="text-xs text-gray-600">
                      {contact.purpose}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Fraud Prevention Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Always verify investment platforms with SEBI database before investing</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Never share OTPs, bank details, or login credentials with anyone</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Be wary of guaranteed high returns and pressure tactics</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                  <p>Report suspicious investment schemes immediately</p>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-blue-600" />
                Official Resources
              </h3>
              <div className="space-y-2">
                <a
                  href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognised=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  SEBI Registered Intermediaries
                </a>
                <a
                  href="https://www.sebi.gov.in/enforcement/orders.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  SEBI Enforcement Orders
                </a>
                <a
                  href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doUnrecognised=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Unregistered Entities List
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Gemini Live Fraud Detection Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ask Your Question</h3>
              <p className="text-sm text-gray-600">
                Type or describe your investment concern, suspicious activity, or verification need
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk Assessment</h3>
              <p className="text-sm text-gray-600">
                AI instantly analyzes for fraud indicators and urgency levels
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Response</h3>
              <p className="text-sm text-gray-600">
                Get streaming responses with specific guidance and action items
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Take Action</h3>
              <p className="text-sm text-gray-600">
                Follow recommended steps including emergency contacts when needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
