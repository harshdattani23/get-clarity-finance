"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function ElliottWaveTheoryPage() {
  const { t } = useTranslation('stock-market-course.elliott-wave-theory');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="elliott-wave-theory"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {t('title') as string}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {t('description') as string}
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              {t('introduction') as string}
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Principles */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('basicPrinciples.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('basicPrinciples.p1') as string}
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Impulse Waves</h3>
                  <p className="text-gray-700">{t('basicPrinciples.principles.impulse') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Correction Waves</h3>
                  <p className="text-gray-700">{t('basicPrinciples.principles.correction') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Fractal Nature</h3>
                  <p className="text-gray-700">{t('basicPrinciples.principles.fractal') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Alternation</h3>
                  <p className="text-gray-700">{t('basicPrinciples.principles.alternation') as string}</p>
                </div>
              </div>
            </section>

            {/* Impulse Waves */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('impulseWaves.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('impulseWaves.p1') as string}
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Wave 1</h3>
                  <p className="text-green-700">{t('impulseWaves.waves.wave1') as string}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">Wave 2</h3>
                  <p className="text-blue-700">{t('impulseWaves.waves.wave2') as string}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold mb-2 text-purple-800">Wave 3</h3>
                  <p className="text-purple-700">{t('impulseWaves.waves.wave3') as string}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold mb-2 text-orange-800">Wave 4</h3>
                  <p className="text-orange-700">{t('impulseWaves.waves.wave4') as string}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold mb-2 text-red-800">Wave 5</h3>
                  <p className="text-red-700">{t('impulseWaves.waves.wave5') as string}</p>
                </div>
              </div>
            </section>

            {/* Correction Waves */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('correctionWaves.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('correctionWaves.p1') as string}
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Wave A</h3>
                  <p className="text-gray-700">{t('correctionWaves.waves.waveA') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Wave B</h3>
                  <p className="text-gray-700">{t('correctionWaves.waves.waveB') as string}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Wave C</h3>
                  <p className="text-gray-700">{t('correctionWaves.waves.waveC') as string}</p>
                </div>
              </div>
            </section>

            {/* Wave Characteristics */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('waveCharacteristics.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('waveCharacteristics.p1') as string}
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li><strong>Wave 1:</strong> {t('waveCharacteristics.characteristics.wave1') as string}</li>
                  <li><strong>Wave 2:</strong> {t('waveCharacteristics.characteristics.wave2') as string}</li>
                  <li><strong>Wave 3:</strong> {t('waveCharacteristics.characteristics.wave3') as string}</li>
                  <li><strong>Wave 4:</strong> {t('waveCharacteristics.characteristics.wave4') as string}</li>
                  <li><strong>Wave 5:</strong> {t('waveCharacteristics.characteristics.wave5') as string}</li>
                </ul>
              </div>
            </section>

            {/* Key Takeaways */}
            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                {t('keyTakeaways.title') as string}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>{t('keyTakeaways.takeaway1') as string}</li>
                <li>{t('keyTakeaways.takeaway2') as string}</li>
                <li>{t('keyTakeaways.takeaway3') as string}</li>
                <li>{t('keyTakeaways.takeaway4') as string}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
