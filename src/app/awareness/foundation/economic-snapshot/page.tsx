import LessonLayout from '../../LessonLayout';
import { ChevronsRight, PieChart as PieIcon, ShoppingCart, Gem } from 'lucide-react';
import GdpPieChart from '@/components/infographics/GdpPieChart';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

export default function EconomicSnapshot() {
  const lessonTitle = "Economic Snapshot";
  const lessonDescription = "An introduction to India's GDP composition, key growth drivers, and inflation dynamics.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="economic-snapshot">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>India's economy is service-led, with the Services sector contributing over 50% to the GDP.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Growth is powered by strong domestic consumption, government reforms, and a world-class digital infrastructure.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Inflation is actively managed by the Reserve Bank of India (RBI) to balance growth and price stability.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>The Engine of a Rising Power</h2>
            <p>
                India's economy is one of the fastest-growing major economies in the world. Understanding its composition and key drivers is fundamental to grasping the opportunities it presents.
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <h3>GDP Composition: A Service-Led Economy</h3>
            <GdpPieChart />
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
            <h3>Key Growth Drivers</h3>
            <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><ShoppingCart className="w-5 h-5"/>Domestic Consumption</h4>
                    <p className="text-gray-600">A massive, young population with rising incomes creates strong domestic demand.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Gem className="w-5 h-5"/>Digital Infrastructure</h4>
                    <p className="text-gray-600">The "India Stack" (Aadhaar, UPI) has enabled a massive digital transformation.</p>
                </div>
            </div>
        </AnimatedDiv>
      
        <AnimatedDiv delay={0.6}>
            <h3>Inflation Dynamics</h3>
            <p>
                Inflation is a key metric monitored by the Reserve Bank of India (RBI). It is primarily measured by the Consumer Price Index (CPI). Factors influencing inflation in India include food and fuel prices, currency exchange rates, and global commodity prices. The RBI uses monetary policy, primarily by adjusting interest rates, to keep inflation within a target range, balancing economic growth with price stability.
            </p>
        </AnimatedDiv>
    </LessonLayout>
  );
}
