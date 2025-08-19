"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function BacktestingStrategiesPage() {
  const { t } = useTranslation('stock-market-course.backtesting-strategies');

  return (
    <LessonLayout
      title={t('title')}
      description={t('description')}
      lessonSlug="backtesting-strategies"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Backtesting Strategies
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Learn how to test trading strategies on historical data to validate their effectiveness before risking real money.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Backtesting is the process of testing a trading strategy on historical data to see how it would have performed in the past.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What is Backtesting?
              </h2>
              <p className="text-gray-700 mb-4">
                Backtesting simulates how a trading strategy would have performed using historical market data, helping traders evaluate the strategy&apos;s potential effectiveness.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Benefits:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Validate strategy logic before live trading</li>
                  <li>Optimize strategy parameters</li>
                  <li>Understand risk and return characteristics</li>
                  <li>Identify potential flaws in the strategy</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Backtesting Process
              </h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <ol className="list-decimal list-inside space-y-2 text-yellow-800">
                  <li><strong>Data Collection:</strong> Gather historical price, volume, and other relevant market data</li>
                  <li><strong>Strategy Implementation:</strong> Code the trading rules and logic</li>
                  <li><strong>Simulation:</strong> Run the strategy on historical data</li>
                  <li><strong>Performance Analysis:</strong> Calculate returns, risk metrics, and other statistics</li>
                  <li><strong>Optimization:</strong> Adjust parameters to improve performance</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Important Considerations
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Data Quality:</h3>
                  <ul className="list-disc list-inside text-green-700">
                    <li>Ensure data is accurate and complete</li>
                    <li>Account for splits, dividends, and corporate actions</li>
                    <li>Use appropriate timeframes</li>
                    <li>Consider data survivorship bias</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold mb-2 text-red-800">Common Pitfalls:</h3>
                  <ul className="list-disc list-inside text-red-700">
                    <li>Overfitting to historical data</li>
                    <li>Ignoring transaction costs and slippage</li>
                    <li>Not considering market regime changes</li>
                    <li>Failing to account for survivorship bias</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Performance Metrics
              </h2>
              <p className="text-gray-700 mb-4">
                Key metrics to evaluate when analyzing backtest results.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Return Metrics:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Total Return</li>
                    <li>Annualized Return</li>
                    <li>Sharpe Ratio</li>
                    <li>Maximum Drawdown</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Risk Metrics:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Volatility</li>
                    <li>Value at Risk (VaR)</li>
                    <li>Win Rate</li>
                    <li>Profit Factor</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Backtesting helps validate strategies before live trading</li>
                <li>Quality historical data is essential for accurate results</li>
                <li>Beware of overfitting and other common pitfalls</li>
                <li>Use multiple performance metrics to evaluate results</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
