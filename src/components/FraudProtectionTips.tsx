"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Eye, Phone, Globe, FileText, Users, Clock, TrendingUp } from 'lucide-react';

interface FraudTip {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  redFlags: string[];
  protectiveActions: string[];
}

const fraudTips: FraudTip[] = [
  {
    id: 'guaranteed-returns',
    title: 'Guaranteed High Returns',
    description: 'Be extremely wary of anyone promising guaranteed high returns. Legitimate investments always carry risk.',
    icon: <TrendingUp className="w-6 h-6" />,
    redFlags: [
      'Promises of 20%+ monthly returns',
      'Claims of "risk-free" investments',
      'Pressure to invest quickly',
      'Complex explanations that don\'t make sense'
    ],
    protectiveActions: [
      'Research the company thoroughly',
      'Check with regulatory authorities (SEBI, RBI)',
      'Consult with a licensed financial advisor',
      'Never invest more than you can afford to lose'
    ]
  },
  {
    id: 'urgency-pressure',
    title: 'Urgency and Pressure Tactics',
    description: 'Fraudsters often create artificial urgency to prevent you from doing proper research.',
    icon: <Clock className="w-6 h-6" />,
    redFlags: [
      '"Limited time offer" or "act now"',
      'Pressure to make immediate decisions',
      'Threats of missing out on opportunities',
      'Refusal to provide written documentation'
    ],
    protectiveActions: [
      'Take your time to research thoroughly',
      'Get everything in writing',
      'Consult with trusted advisors',
      'Walk away from high-pressure situations'
    ]
  },
  {
    id: 'unregistered-entities',
    title: 'Unregistered Investment Entities',
    description: 'Always verify that investment entities are properly registered with regulatory authorities.',
    icon: <FileText className="w-6 h-6" />,
    redFlags: [
      'Cannot provide registration numbers',
      'Not listed on official regulatory websites',
      'Vague or evasive answers about registration',
      'Claims of "special exemptions" from registration'
    ],
    protectiveActions: [
      'Check SEBI website for mutual funds and PMS',
      'Verify RBI registration for NBFCs',
      'Confirm AMFI registration for mutual funds',
      'Ask for official registration certificates'
    ]
  },
  {
    id: 'unsolicited-offers',
    title: 'Unsolicited Investment Offers',
    description: 'Be cautious of investment opportunities that come to you unsolicited.',
    icon: <Phone className="w-6 h-6" />,
    redFlags: [
      'Cold calls or unsolicited emails',
      'Social media investment opportunities',
      'Friends or family pushing investments',
      'Celebrity endorsements of investment schemes'
    ],
    protectiveActions: [
      'Never invest based on unsolicited offers',
      'Research the company independently',
      'Verify all claims independently',
      'Be skeptical of "insider information"'
    ]
  },
  {
    id: 'complex-schemes',
    title: 'Overly Complex Investment Schemes',
    description: 'Fraudsters often use complex schemes to confuse investors and hide the truth.',
    icon: <Globe className="w-6 h-6" />,
    redFlags: [
      'Investment strategies you don\'t understand',
      'Claims of "proprietary" or "secret" methods',
      'Complex fee structures',
      'Promises of tax benefits that seem too good'
    ],
    protectiveActions: [
      'If you don\'t understand it, don\'t invest',
      'Get independent professional advice',
      'Ask for simple explanations',
      'Verify all claims with experts'
    ]
  },
  {
    id: 'pyramid-schemes',
    title: 'Pyramid or Ponzi Schemes',
    description: 'These schemes rely on recruiting new investors to pay existing ones.',
    icon: <Users className="w-6 h-6" />,
    redFlags: [
      'Focus on recruiting others to invest',
      'Promises of commissions for bringing in new investors',
      'Complex compensation structures',
      'No real product or service being sold'
    ],
    protectiveActions: [
      'Avoid any scheme focused on recruitment',
      'Research the business model thoroughly',
      'Check if there\'s a real product or service',
      'Be wary of "network marketing" investment schemes'
    ]
  }
];

export default function FraudProtectionTips() {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            Investment Fraud Protection Guide
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          Learn to identify and protect yourself from common investment fraud schemes
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {fraudTips.map((tip) => (
          <motion.div
            key={tip.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 cursor-pointer hover:border-red-300 transition-colors"
            onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
          >
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          {fraudTips.map((tip) => 
            tip.id === selectedTip ? (
              <div key={tip.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-100 p-3 rounded-full">
                    {tip.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{tip.title}</h2>
                </div>
                
                <p className="text-gray-700 mb-8 text-lg">{tip.description}</p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Red Flags to Watch For
                    </h3>
                    <ul className="space-y-3">
                      {tip.redFlags.map((flag, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Protective Actions
                    </h3>
                    <ul className="space-y-3">
                      {tip.protectiveActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Remember
                  </h4>
                  <p className="text-blue-800">
                    If something sounds too good to be true, it probably is. Always do your own research (DYOR) 
                    and consult with licensed financial professionals before making investment decisions.
                  </p>
                </div>
              </div>
            ) : null
          )}
        </motion.div>
      )}

      <div className="text-center mt-12">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">
            <AlertTriangle className="w-6 h-6 inline mr-2" />
            Important Disclaimer
          </h3>
          <p className="text-yellow-700">
            This information is for educational purposes only. It does not constitute financial advice. 
            Always consult with qualified financial professionals before making investment decisions. 
            Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
}