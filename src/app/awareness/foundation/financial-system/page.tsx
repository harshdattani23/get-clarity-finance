import LessonLayout from '../../LessonLayout';
import { ChevronsRight, Landmark, Shield, Banknote, CandlestickChart } from 'lucide-react';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

export default function FinancialSystem() {
  const lessonTitle = "The Indian Financial System";
  const lessonDescription = "An overview of the banking sector, the role of the RBI, and the primary stock exchanges.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="financial-system">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The banking sector is a mix of government-owned Public Sector Banks (PSBs) and modern Private Sector Banks.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The Reserve Bank of India (RBI) is the central bank, regulating banks and managing monetary policy.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The stock market is primarily composed of the Bombay Stock Exchange (BSE) and the National Stock Exchange (NSE), regulated by SEBI.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>The Bedrock of the Economy</h2>
            <p>
                India&apos;s financial system is a complex network of institutions, markets, and instruments that mobilizes capital and facilitates economic growth. Understanding its key components is essential for any investor or business operator.
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <h3>The Banking Sector: Public vs. Private</h3>
            <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Landmark className="w-5 h-5"/>Public Sector Banks</h4>
                    <p className="text-gray-600">Majority-owned by the government (e.g., State Bank of India), these banks have historically focused on national development and financial inclusion.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Shield className="w-5 h-5"/>Private Sector Banks</h4>
                    <p className="text-gray-600">Known for efficiency and customer service (e.g., HDFC, ICICI), these banks are often more technologically advanced.</p>
                </div>
            </div>
        </AnimatedDiv>
      
        <AnimatedDiv delay={0.5}>
            <h3>The Role of the Reserve Bank of India (RBI)</h3>
            <p>The RBI is India&apos;s central bank and the primary regulator of the banking system. Its key responsibilities include:</p>
            <ul className="space-y-4 !pl-0 my-6">
                    <li className="flex items-start gap-3"><Banknote className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><strong>Monetary Policy:</strong> Controlling inflation and managing interest rates.</div></li>
                    <li className="flex items-start gap-3"><Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" /><div><strong>Supervision:</strong> Ensuring the stability and soundness of the banking sector.</div></li>
            </ul>
        </AnimatedDiv>

        <AnimatedDiv delay={0.6}>
            <h3>Primary Stock Exchanges: BSE & NSE</h3>
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <CandlestickChart className="w-12 h-12 flex-shrink-0"/>
                    <div>
                        <h3 className="font-bold text-2xl">BSE vs. NSE</h3>
                        <p className="mt-1 opacity-90">The <strong>Bombay Stock Exchange (BSE)</strong> is Asia&apos;s oldest, while the <strong>National Stock Exchange (NSE)</strong> is the largest by trading volume. Both are regulated by SEBI.</p>
                    </div>
                </div>
            </div>
        </AnimatedDiv>
    </LessonLayout>
  );
}
