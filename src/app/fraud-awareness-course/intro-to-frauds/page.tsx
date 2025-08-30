"use client";

import { useState } from 'react';
import Link from 'next/link';
import FraudSimulator from '@/components/fraud-awareness/FraudSimulator';
import Module1AudioPlayer from '@/components/stock-market-course/Module1AudioPlayer';
import Module1VideoPlayer from '@/components/fraud-awareness-course/Module1VideoPlayer';
import ClientOnly from '@/components/ClientOnly';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  AlertTriangle,
  Shield,
  CheckCircle,
  Trophy,
  TrendingUp,
  Users,
  Zap,
  Lock,
  Repeat,
  Briefcase
} from 'lucide-react';

export default function IntroToFraudsPage() {
  const { t } = useTranslation('courses.intro-to-frauds');
  const [currentSection, setCurrentSection] = useState<'overview' | 'simulator' | 'quiz'>('overview');
  const [lessonProgress, setLessonProgress] = useState(33);

  const handleCompleteLesson = async () => {
    try {
      await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: 'intro-to-frauds', // Assuming the lesson slug is the ID
          courseId: 'clx2no2g0000008l8g8r8g8r8', // The ID from the seed script
        }),
      });
    } catch (error) {
      console.error('Failed to mark lesson as complete', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/fraud-awareness-course"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs text-gray-500">{t('header.module') as string}</p>
                <h1 className="text-lg font-semibold">{t('header.title') as string}</h1>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-48">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>{t('header.progress') as string}</span>
                  <span>{lessonProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${lessonProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{t('header.xp') as string}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentSection('overview')}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t('tabs.overview') as string}
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('simulator');
                setLessonProgress(66);
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'simulator'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t('tabs.simulator') as string}
              </div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('quiz');
              }}
              className={`py-3 px-4 border-b-2 transition-colors ${
                currentSection === 'quiz'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {t('tabs.quiz') as string}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {currentSection === 'overview' && (
          <div className="max-w-4xl mx-auto">
            {/* Video Section */}
            <ClientOnly>
              <Module1VideoPlayer className="mb-8" />
            </ClientOnly>

            {/* Audio Content Section */}
            <ClientOnly>
              <Module1AudioPlayer className="mb-8" />
            </ClientOnly>

            {/* Content Sections */}
            <div className="space-y-8">
              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  {t('overview.section1.title') as string}
                </h2>
                <p className="text-gray-700 mb-4">
                  {t('overview.section1.p1') as string}
                </p>
                <p className="text-gray-700 mb-4">
                  {t('overview.section1.p2') as string}
                </p>
                <p className="text-gray-700 font-semibold mb-4">
                  {t('overview.section1.p3') as string}
                </p>
                <ul className="space-y-2 ml-6">
                  {Array.isArray(t('overview.section1.list')) ? (t('overview.section1.list') as string[]).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  )) : (
                    // Fallback content if translation fails
                    <>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>WhatsApp and Telegram groups offering "guaranteed returns".</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Fake investment advisory websites and social media profiles.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Sophisticated Ponzi and pyramid schemes disguised as legitimate investments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Pump and dump operations coordinated through online forums.</span>
                      </li>
                    </>
                  )}
                </ul>
              </section>

              <section className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{t('overview.section2.title') as string}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-6 h-6 text-red-600" />
                      <h3 className="font-semibold text-red-600">{t('overview.section2.ponzi.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.ponzi.description') as string}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-600">{t('overview.section2.pump_dump.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.pump_dump.description') as string}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Lock className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-purple-600">{t('overview.section2.insider_trading.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.insider_trading.description') as string}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-600">{t('overview.section2.fake_advisors.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.fake_advisors.description') as string}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Repeat className="w-6 h-6 text-cyan-600" />
                      <h3 className="font-semibold text-cyan-600">{t('overview.section2.circular_trading.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.circular_trading.description') as string}
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                      <h3 className="font-semibold text-indigo-600">{t('overview.section2.front_running.title') as string}</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t('overview.section2.front_running.description') as string}
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  {t('overview.section3.title') as string}
                </h2>
                <p className="text-gray-700 mb-3">
                  {t('overview.section3.p1') as string}
                </p>
                <p className="text-gray-700 font-semibold mb-3">
                  {t('overview.section3.p2') as string}
                </p>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  {Array.isArray(t('overview.section3.list')) ? (t('overview.section3.list') as string[]).map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : (
                    // Fallback content
                    <>
                      <li>Registering and regulating all market intermediaries, such as brokers, investment advisers, and mutual funds.</li>
                      <li>Prohibiting fraudulent and unfair trade practices.</li>
                      <li>Promoting investor education and awareness.</li>
                      <li>Investigating cases of market manipulation and insider trading.</li>
                      <li>Issuing guidelines and regulations to ensure market integrity.</li>
                    </>
                  )}
                </ul>
                <div className="mt-4">
                  <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">
                    {t('overview.section3.link') as string}
                  </a>
                </div>
              </section>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setCurrentSection('simulator');
                    setLessonProgress(66);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  {t('overview.button.practice') as string}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentSection === 'simulator' && (
          <div>
            <FraudSimulator />
            <div className="max-w-4xl mx-auto mt-8 flex justify-end">
              <button
                onClick={() => {
                  setCurrentSection('quiz');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {t('simulator.button.quiz') as string}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">{t('quiz.title') as string}</h2>
              <p className="text-gray-600 mb-8">
                {t('quiz.subtitle') as string}
              </p>
              
              {/* Sample quiz questions */}
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <p className="font-semibold mb-4">{t('quiz.q1.question') as string}</p>
                  <div className="space-y-2">
                    {Array.isArray(t('quiz.q1.options')) ? (t('quiz.q1.options') as string[]).map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="q1" className="w-4 h-4" />
                        <span>{option}</span>
                      </label>
                    )) : (
                      // Fallback quiz options
                      <>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q1" className="w-4 h-4" />
                          <span>Guaranteeing investment returns</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q1" className="w-4 h-4" />
                          <span>Regulating and monitoring market participants</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q1" className="w-4 h-4" />
                          <span>Providing stock tips</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <p className="font-semibold mb-4">{t('quiz.q2.question') as string}</p>
                  <div className="space-y-2">
                    {Array.isArray(t('quiz.q2.options')) ? (t('quiz.q2.options') as string[]).map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="q2" className="w-4 h-4" />
                        <span>{option}</span>
                      </label>
                    )) : (
                      // Fallback quiz options
                      <>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q2" className="w-4 h-4" />
                          <span>Guaranteed high returns with no risk</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q2" className="w-4 h-4" />
                          <span>SEBI registration number provided</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input type="radio" name="q2" className="w-4 h-4" />
                          <span>Transparent fee structure</span>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <button 
                    onClick={() => {
                      setLessonProgress(100);
                      handleCompleteLesson();
                    }}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    {t('quiz.button.submit') as string}
                  </button>
                </div>
              </div>
            </div>

            {/* Completion Card */}
            {lessonProgress === 100 && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center mt-8">
                <Trophy className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t('completion.title') as string}</h3>
                <p className="mb-4">{t('completion.subtitle') as string}</p>
                <Link
                  href="/fraud-awareness-course"
                  className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  {t('completion.button') as string}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}