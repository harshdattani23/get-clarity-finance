"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function RealEstateInvestingPage() {
  const { t } = useTranslation('stock-market-course/real-estate-investing');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="real-estate-investing"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Real Estate Investing
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn about different ways to invest in real estate, from direct property ownership to REITs and real estate funds.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Real estate investing offers potential for income generation, capital appreciation, and portfolio diversification.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Direct Property Investment
              </h2>
              <p className="text-gray-700 mb-4">
                Owning physical real estate properties for rental income or capital appreciation.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold mb-2 text-green-800">Advantages:</h3>
                <ul className="list-disc list-inside text-green-700">
                  <li>Direct control over the investment</li>
                  <li>Potential for rental income</li>
                  <li>Tax benefits and deductions</li>
                  <li>Tangible asset ownership</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                REITs (Real Estate Investment Trusts)
              </h2>
              <p className="text-gray-700 mb-4">
                Companies that own, operate, or finance income-producing real estate and trade on stock exchanges.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold mb-2 text-blue-800">Advantages:</h3>
                <ul className="list-disc list-inside text-blue-700">
                  <li>Liquidity and easy trading</li>
                  <li>Diversified real estate exposure</li>
                  <li>Professional management</li>
                  <li>Regular dividend income</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Real Estate Funds
              </h2>
              <p className="text-gray-700 mb-4">
                Pooled investment vehicles that invest in real estate assets and are managed by professionals.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-800">Types:</h3>
                <ul className="list-disc list-inside text-purple-700">
                  <li>Private equity real estate funds</li>
                  <li>Real estate mutual funds</li>
                  <li>Real estate ETFs</li>
                  <li>Crowdfunding platforms</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Direct ownership provides control but requires management</li>
                <li>REITs offer liquidity and professional management</li>
                <li>Real estate funds provide diversification</li>
                <li>Consider your time, capital, and expertise when choosing</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
