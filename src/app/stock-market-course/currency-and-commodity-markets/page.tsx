"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function CurrencyAndCommodityMarketsPage() {
  const { t } = useTranslation('stock-market-course/currency-and-commodity-markets');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="currency-and-commodity-markets"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Currency and Commodity Markets
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Explore the basics of trading in the forex (currency) and commodity (gold, oil, etc.) markets.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Currency and commodity markets offer unique opportunities for diversification and profit from global economic trends.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Forex (Currency) Markets
              </h2>
              <p className="text-gray-700 mb-4">
                The foreign exchange market is the largest financial market in the world, where currencies are traded 24/7.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">Key Features:</h3>
                <ul className="list-disc list-inside text-green-700">
                  <li>24/7 trading across global markets</li>
                  <li>High liquidity and tight spreads</li>
                  <li>Leverage available (but risky)</li>
                  <li>Major currency pairs: EUR/USD, GBP/USD, USD/JPY</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Commodity Markets
              </h2>
              <p className="text-gray-700 mb-4">
                Commodities include precious metals, energy products, agricultural products, and other raw materials.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold mb-2 text-yellow-800">Major Categories:</h3>
                <ul className="list-disc list-inside text-yellow-700">
                  <li>Precious Metals: Gold, Silver, Platinum</li>
                  <li>Energy: Crude Oil, Natural Gas</li>
                  <li>Agriculture: Corn, Wheat, Soybeans</li>
                  <li>Industrial Metals: Copper, Aluminum</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Forex markets offer 24/7 trading opportunities</li>
                <li>Commodities provide diversification from stocks</li>
                <li>Both markets are influenced by global economic factors</li>
                <li>Risk management is crucial due to volatility</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
