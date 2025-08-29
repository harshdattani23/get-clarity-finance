"use client";

import { 
  Shield, 
  Brain, 
  TrendingUp, 
  BookOpen, 
  Users, 
  AlertTriangle,
  ChartBar,
  GraduationCap,
  Smartphone,
  Globe,
  Clock,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default function FeatureShowcase() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Fraud Detection",
      description: "Our advanced AI instantly analyzes messages, emails, and investment offers to detect potential scams",
      benefits: ["Real-time verification", "95% accuracy rate", "Pattern recognition"],
      link: "#analyzer",
      color: "blue"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Risk-Free Virtual Trading",
      description: "Learn by doing virtual trades in real market conditions - not with real money, completely risk-free",
      benefits: ["Real-time NSE/BSE data", "Portfolio tracking", "Performance analytics"],
      link: "/virtual-trading",
      color: "purple"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Fraud Alert System",
      description: "Stay updated with latest investment scams and fraud patterns reported across India",
      benefits: ["Daily updates", "Case studies", "Prevention tips"],
      link: "/fraud-protection",
      color: "red"
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: "Market Analysis Tools",
      description: "Professional-grade tools for technical and fundamental analysis of stocks",
      benefits: ["Live charts", "Technical indicators", "Company financials"],
      link: "/virtual-trading",
      color: "indigo"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Investment Quiz & Certification",
      description: "Test your knowledge and earn certificates to showcase your investment expertise",
      benefits: ["Skill assessment", "Personalized learning path", "Achievement badges"],
      link: "/investment-quiz",
      color: "yellow"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
      yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Invest Confidently
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A complete ecosystem of tools and resources designed to protect and empower Indian investors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div key={index} className="group hover:shadow-lg transition-shadow rounded-lg border border-gray-200 overflow-hidden">
                <div className={`p-6 ${colors.bg}`}>
                  <div className={`inline-flex p-3 rounded-lg ${colors.bg} ${colors.border} border mb-4`}>
                    <span className={colors.text}>{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <BadgeCheck className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={feature.link} 
                    className={`inline-flex items-center ${colors.text} font-semibold hover:underline`}
                  >
                    Explore Feature →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Smartphone className="w-8 h-8 text-gray-600 mb-2" />
              <h4 className="font-semibold mb-1">Mobile Optimized</h4>
              <p className="text-sm text-gray-600">Access all features on any device</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-gray-600 mb-2" />
              <h4 className="font-semibold mb-1">Multi-Language Support</h4>
              <p className="text-sm text-gray-600">Available in Hindi and English</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-gray-600 mb-2" />
              <h4 className="font-semibold mb-1">24/7 Availability</h4>
              <p className="text-sm text-gray-600">Learn and trade at your convenience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
