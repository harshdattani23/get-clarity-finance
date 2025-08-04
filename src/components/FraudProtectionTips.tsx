"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Eye, Phone, Globe, FileText, Users, Clock, TrendingUp } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FraudTip {
  id: string;
  icon: React.ReactNode;
}

const fraudTipsData: FraudTip[] = [
  { id: 'guaranteed-returns', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'urgency-pressure', icon: <Clock className="w-6 h-6" /> },
  { id: 'unregistered-entities', icon: <FileText className="w-6 h-6" /> },
  { id: 'unsolicited-offers', icon: <Phone className="w-6 h-6" /> },
  { id: 'complex-schemes', icon: <Globe className="w-6 h-6" /> },
  { id: 'pyramid-schemes', icon: <Users className="w-6 h-6" /> }
];

export default function FraudProtectionTips() {
  const { t } = useTranslation('fraud-protection');
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const fraudTips = fraudTipsData.map(tip => ({
    ...tip,
    title: t(`${tip.id}.title`),
    description: t(`${tip.id}.description`),
    redFlags: Array.from({ length: 4 }, (_, i) => t(`${tip.id}.redFlags.${i}`)),
    protectiveActions: Array.from({ length: 4 }, (_, i) => t(`${tip.id}.protectiveActions.${i}`)),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            {t('mainTitle')}
          </span>
        </h1>
        <p className="text-xl text-gray-600">
          {t('mainSubtitle')}
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
                      {t('redFlagsTitle')}
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
                      {t('protectiveActionsTitle')}
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
                    {t('rememberTitle')}
                  </h4>
                  <p className="text-blue-800">
                    {t('rememberContent')}
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
            {t('disclaimerTitle')}
          </h3>
          <p className="text-yellow-700">
            {t('disclaimerContent')}
          </p>
        </div>
      </div>
    </div>
  );
}
