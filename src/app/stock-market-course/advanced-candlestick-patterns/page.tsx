"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function AdvancedCandlestickPatternsPage() {
  const { t } = useTranslation('stock-market-course.advanced-candlestick-patterns');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="advanced-candlestick-patterns"
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
            {/* Reversal Patterns */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('reversalPatterns.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('reversalPatterns.p1') as string}
              </p>
              
              <div className="space-y-6">
                {/* Engulfing Pattern */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('reversalPatterns.patterns.engulfing.title') as string}</h3>
                  <p className="text-gray-700 mb-3">{t('reversalPatterns.patterns.engulfing.p1') as string}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-green-800 font-medium">{t('reversalPatterns.patterns.engulfing.bullish') as string}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-red-800 font-medium">{t('reversalPatterns.patterns.engulfing.bearish') as string}</p>
                    </div>
                  </div>
                </div>

                {/* Hammer and Hanging Man */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('reversalPatterns.patterns.hammer.title') as string}</h3>
                  <p className="text-gray-700 mb-3">{t('reversalPatterns.patterns.hammer.p1') as string}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-green-800 font-medium">{t('reversalPatterns.patterns.hammer.hammer') as string}</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-red-800 font-medium">{t('reversalPatterns.patterns.hammer.hangingMan') as string}</p>
                    </div>
                  </div>
                </div>

                {/* Doji Patterns */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('reversalPatterns.patterns.doji.title') as string}</h3>
                  <p className="text-gray-700 mb-3">{t('reversalPatterns.patterns.doji.p1') as string}</p>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Long-Legged:</strong> {t('reversalPatterns.patterns.doji.types.longLegged') as string}</p>
                    <p className="text-gray-700"><strong>Dragonfly:</strong> {t('reversalPatterns.patterns.doji.types.dragonfly') as string}</p>
                    <p className="text-gray-700"><strong>Gravestone:</strong> {t('reversalPatterns.patterns.doji.types.gravestone') as string}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continuation Patterns */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('continuationPatterns.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('continuationPatterns.p1') as string}
              </p>
              
              <div className="space-y-6">
                {/* Flags and Pennants */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('continuationPatterns.patterns.flags.title') as string}</h3>
                  <p className="text-gray-700 mb-3">{t('continuationPatterns.patterns.flags.p1') as string}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-blue-800 font-medium">{t('continuationPatterns.patterns.flags.flag') as string}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-blue-800 font-medium">{t('continuationPatterns.patterns.flags.pennant') as string}</p>
                    </div>
                  </div>
                </div>

                {/* Triangle Patterns */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('continuationPatterns.patterns.triangles.title') as string}</h3>
                  <p className="text-gray-700 mb-3">{t('continuationPatterns.patterns.triangles.p1') as string}</p>
                  <div className="space-y-2">
                    <p className="text-gray-700"><strong>Ascending:</strong> {t('continuationPatterns.patterns.triangles.ascending') as string}</p>
                    <p className="text-gray-700"><strong>Descending:</strong> {t('continuationPatterns.patterns.triangles.descending') as string}</p>
                    <p className="text-gray-700"><strong>Symmetrical:</strong> {t('continuationPatterns.patterns.triangles.symmetrical') as string}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Three-Candle Patterns */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('threeCandlePatterns.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('threeCandlePatterns.p1') as string}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('threeCandlePatterns.patterns.morningStar.title') as string}</h3>
                  <p className="text-gray-700 mb-2">{t('threeCandlePatterns.patterns.morningStar.p1') as string}</p>
                  <p className="text-green-700 font-medium">{t('threeCandlePatterns.patterns.morningStar.signal') as string}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('threeCandlePatterns.patterns.eveningStar.title') as string}</h3>
                  <p className="text-gray-700 mb-2">{t('threeCandlePatterns.patterns.eveningStar.p1') as string}</p>
                  <p className="text-red-700 font-medium">{t('threeCandlePatterns.patterns.eveningStar.signal') as string}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('threeCandlePatterns.patterns.threeWhiteSoldiers.title') as string}</h3>
                  <p className="text-gray-700 mb-2">{t('threeCandlePatterns.patterns.threeWhiteSoldiers.p1') as string}</p>
                  <p className="text-green-700 font-medium">{t('threeCandlePatterns.patterns.threeWhiteSoldiers.signal') as string}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{t('threeCandlePatterns.patterns.threeBlackCrows.title') as string}</h3>
                  <p className="text-gray-700 mb-2">{t('threeCandlePatterns.patterns.threeBlackCrows.p1') as string}</p>
                  <p className="text-red-700 font-medium">{t('threeCandlePatterns.patterns.threeBlackCrows.signal') as string}</p>
                </div>
              </div>
            </section>

            {/* Pattern Recognition Tips */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('patternRecognition.title') as string}
              </h2>
              <p className="text-gray-700 mb-4">
                {t('patternRecognition.p1') as string}
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li><strong>Context:</strong> {t('patternRecognition.tips.context') as string}</li>
                  <li><strong>Confirmation:</strong> {t('patternRecognition.tips.confirmation') as string}</li>
                  <li><strong>Volume:</strong> {t('patternRecognition.tips.volume') as string}</li>
                  <li><strong>Timeframe:</strong> {t('patternRecognition.tips.timeframe') as string}</li>
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
