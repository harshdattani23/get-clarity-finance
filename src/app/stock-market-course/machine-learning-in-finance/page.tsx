"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function MachineLearningInFinancePage() {
  const { t } = useTranslation('stock-market-course/machine-learning-in-finance');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="machine-learning-in-finance"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Machine Learning in Finance
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Explore how artificial intelligence and machine learning are transforming financial markets and trading strategies.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Machine learning algorithms can analyze vast amounts of financial data to identify patterns, predict market movements, and optimize trading strategies.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Applications in Finance
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Price Prediction</h3>
                  <p className="text-green-700">Using historical data to forecast future price movements of stocks, currencies, and commodities.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">Risk Assessment</h3>
                  <p className="text-blue-700">Analyzing market data to identify potential risks and calculate portfolio risk metrics.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold mb-2 text-purple-800">Algorithmic Trading</h3>
                  <p className="text-purple-700">Automated trading systems that use ML to make buy/sell decisions in real-time.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold mb-2 text-yellow-800">Portfolio Optimization</h3>
                  <p className="text-yellow-700">Using ML to find optimal asset allocations that maximize returns while minimizing risk.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Common ML Techniques
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Supervised Learning</h3>
                  <p className="text-gray-700">Training models on labeled data to predict outcomes, such as stock price movements or credit default risk.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Unsupervised Learning</h3>
                  <p className="text-gray-700">Finding hidden patterns in data without predefined labels, useful for market segmentation and anomaly detection.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Reinforcement Learning</h3>
                  <p className="text-gray-700">Training agents to make sequential decisions, applicable to portfolio management and trading strategies.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Challenges and Considerations
              </h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold mb-2 text-red-800">Key Challenges:</h3>
                <ul className="list-disc list-inside text-red-700">
                  <li>Overfitting to historical data</li>
                  <li>Market regime changes making models obsolete</li>
                  <li>Data quality and availability issues</li>
                  <li>Regulatory compliance and explainability requirements</li>
                  <li>High computational costs and infrastructure needs</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>ML can analyze vast amounts of financial data for patterns</li>
                <li>Applications include prediction, risk assessment, and trading</li>
                <li>Different ML techniques serve different financial purposes</li>
                <li>Challenges include overfitting and market regime changes</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
