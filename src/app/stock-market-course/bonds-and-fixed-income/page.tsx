"use client";

import { useTranslation } from '@/hooks/useTranslation';
import LessonLayout from '../LessonLayout';

export default function BondsAndFixedIncomePage() {
  const { t } = useTranslation('stock-market-course.bonds-and-fixed-income');

  return (
    <LessonLayout
      title={t('title') as string}
      description={t('description') as string}
      lessonSlug="bonds-and-fixed-income"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bonds and Fixed Income
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Understand the basics of bonds, fixed income securities, and how they can provide stability to your investment portfolio.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-800">
              Bonds and fixed income securities are debt instruments that provide regular interest payments and return of principal at maturity.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What are Bonds?
              </h2>
              <p className="text-gray-700 mb-4">
                Bonds are debt securities issued by governments, municipalities, and corporations to raise capital. Bondholders receive regular interest payments and the return of principal at maturity.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Key Components:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Face Value (Par Value): The amount repaid at maturity</li>
                  <li>Coupon Rate: Annual interest rate paid to bondholders</li>
                  <li>Maturity Date: When the bond principal is repaid</li>
                  <li>Issuer: Entity borrowing the money</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Types of Bonds
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold mb-2 text-green-800">Government Bonds</h3>
                  <p className="text-green-700">Issued by national governments, considered low-risk investments.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800">Corporate Bonds</h3>
                  <p className="text-blue-700">Issued by companies, offer higher yields but higher risk than government bonds.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold mb-2 text-purple-800">Municipal Bonds</h3>
                  <p className="text-purple-700">Issued by local governments, often tax-exempt for residents.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold mb-2 text-yellow-800">Treasury Bonds</h3>
                  <p className="text-yellow-700">Long-term government debt with maturities of 10+ years.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Bond Risks and Returns
              </h2>
              <p className="text-gray-700 mb-4">
                Understanding the relationship between risk and return in bond investing.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <h3 className="font-semibold mb-2 text-red-800">Key Risks:</h3>
                <ul className="list-disc list-inside text-red-700">
                  <li>Interest Rate Risk: Bond prices fall when rates rise</li>
                  <li>Credit Risk: Issuer may default on payments</li>
                  <li>Inflation Risk: Purchasing power may decline</li>
                  <li>Liquidity Risk: May be difficult to sell quickly</li>
                </ul>
              </div>
            </section>

            <section className="bg-green-50 border-l-4 border-green-400 p-6">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc list-inside space-y-2 text-green-700">
                <li>Bonds provide regular income and return of principal</li>
                <li>Government bonds are generally safer than corporate bonds</li>
                <li>Bond prices move inversely to interest rates</li>
                <li>Bonds can provide portfolio stability and diversification</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </LessonLayout>
  );
}
