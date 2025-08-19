'use client';
import LessonLayout from '../LessonLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Landmark, ArrowRightLeft, Users, Building, CheckCircle } from 'lucide-react';

const HowStocksAreTraded = () => {
  const { t, translations } = useTranslation('stock-market-course.how-stocks-are-traded');

  // Check if translations are loaded
  const isLoading = Object.keys(translations).length === 0;

  // Helper function to safely get array values
  const getArray = (key: string): string[] => {
    const value = t(key);
    return Array.isArray(value) ? value : [];
  };

  if (isLoading) {
    return (
      <LessonLayout
        title="Loading..."
        description="Loading lesson content..."
        lessonSlug="how-stocks-are-traded"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lesson content...</p>
          </div>
        </div>
      </LessonLayout>
    );
  }

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="how-stocks-are-traded"
    >
      <div className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-900 mb-4">{t('hero.title') as string}</h1>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">{t('hero.subtitle') as string}</h2>
            <p className="text-lg text-green-800 max-w-3xl mx-auto">{t('hero.description') as string}</p>
          </div>
        </div>

        {/* Primary vs Secondary Markets */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('primarySecondary.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t('primarySecondary.p1') as string }} />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-8 h-8 text-blue-600" />
                <h3 className="font-bold text-lg text-blue-800">{t('primarySecondary.primary.title') as string}</h3>
              </div>
              <p className="text-blue-700 mb-4">{t('primarySecondary.primary.p') as string}</p>
              <ul className="space-y-2 text-sm text-blue-700">
                {getArray('primarySecondary.primary.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('primarySecondary.secondary.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-4">{t('primarySecondary.secondary.p') as string}</p>
              <ul className="space-y-2 text-sm text-green-700">
                {getArray('primarySecondary.secondary.features').map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trading Process */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tradingProcess.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('tradingProcess.p1') as string}</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-purple-800 mb-2">{t('tradingProcess.steps.step1.title') as string}</h4>
              <p className="text-purple-700 text-sm mb-3">{t('tradingProcess.steps.step1.description') as string}</p>
              <ul className="space-y-1 text-xs text-purple-700 text-left">
                {getArray('tradingProcess.steps.step1.details').map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-purple-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-blue-800 mb-2">{t('tradingProcess.steps.step2.title') as string}</h4>
              <p className="text-blue-700 text-sm mb-3">{t('tradingProcess.steps.step2.description') as string}</p>
              <ul className="space-y-1 text-xs text-blue-700 text-left">
                {getArray('tradingProcess.steps.step2.details').map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-blue-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">{t('tradingProcess.steps.step3.title') as string}</h4>
              <p className="text-green-700 text-sm mb-3">{t('tradingProcess.steps.step3.description') as string}</p>
              <ul className="space-y-1 text-xs text-green-700 text-left">
                {getArray('tradingProcess.steps.step3.details').map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold text-lg">4</span>
              </div>
              <h4 className="font-semibold text-orange-800 mb-2">{t('tradingProcess.steps.step4.title') as string}</h4>
              <p className="text-orange-700 text-sm mb-3">{t('tradingProcess.steps.step4.description') as string}</p>
              <ul className="space-y-1 text-xs text-orange-700 text-left">
                {getArray('tradingProcess.steps.step4.details').map((detail, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-orange-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Players */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('keyPlayers.title') as string}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{t('keyPlayers.p1') as string}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <Landmark className="w-8 h-8 text-indigo-600" />
                <h3 className="font-bold text-lg text-indigo-800">{t('keyPlayers.players.exchanges.title') as string}</h3>
              </div>
              <p className="text-indigo-700 mb-3" dangerouslySetInnerHTML={{ __html: t('keyPlayers.players.exchanges.p') as string }} />
              <ul className="space-y-1 text-sm text-indigo-700">
                {getArray('keyPlayers.players.exchanges.responsibilities').map((responsibility, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-xl border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <ArrowRightLeft className="w-8 h-8 text-green-600" />
                <h3 className="font-bold text-lg text-green-800">{t('keyPlayers.players.brokers.title') as string}</h3>
              </div>
              <p className="text-green-700 mb-3">{t('keyPlayers.players.brokers.p') as string}</p>
              <ul className="space-y-1 text-sm text-green-700">
                {getArray('keyPlayers.players.brokers.services').map((service, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('takeaways.title') as string}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {getArray('takeaways.items').map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-yellow-100 p-1 rounded-full mt-1">
                  <CheckCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <li className="text-gray-700 list-none" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LessonLayout>
  );
};

export default HowStocksAreTraded;
