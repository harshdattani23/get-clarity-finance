import LessonLayout from '../../LessonLayout';
import { ChevronsRight, Building, Globe, Star } from 'lucide-react';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

export default function DemographicDividend() {
  const lessonTitle = "The Demographic Dividend (and Dilemma)";
  const lessonDescription = "Understanding India's scale - its population, youth bulge, urban/rural divide, and linguistic diversity.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="demographic-dividend">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Over half of India&apos;s 1.4 billion people are under 25, creating a huge consumer market and workforce.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The market is split between high-income urban centers and the vast, untapped rural market known as &apos;Bharat&apos;.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>With 22 official languages, a &apos;vernacular&apos; or regional language strategy is crucial for effective marketing.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>A Nation of a Billion Aspirations</h2>
            <p>
                India&apos;s population is its most defining characteristic. This scale presents both a massive opportunity—the &quot;dividend&quot;—and a significant challenge—the &quot;dilemma.&quot;
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <Star className="w-12 h-12 flex-shrink-0"/>
                    <div>
                        <h3 className="font-bold text-2xl">The Youth Bulge</h3>
                        <p className="mt-1 opacity-90">Over 50% of the population is below 25 years old. This creates a massive, young workforce and a consumer base with growing aspirations, but also the challenge of creating enough jobs.</p>
                    </div>
                </div>
            </div>
        </AnimatedDiv>
      
        <AnimatedDiv delay={0.5}>
            <h3>The Urban/Rural Divide</h3>
            <p>Understanding the distinction between the two Indias is key to any market strategy.</p>
            <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Building className="w-5 h-5"/>Urban India</h4>
                    <p className="text-gray-600">Higher incomes, modern retail, and greater access to technology. The primary target for most international brands.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Globe className="w-5 h-5"/>Rural India (Bharat)</h4>
                    <p className="text-gray-600">A vast, largely untapped market with different needs, lower price points, and complex distribution networks.</p>
                </div>
            </div>
        </AnimatedDiv>
      
        <AnimatedDiv delay={0.6}>
            <h3>Linguistic Diversity</h3>
            <p>
                India has 22 official languages and hundreds of dialects. While English is widely used in business and among the urban elite, a &quot;one-size-fits-all&quot; language strategy will fail. Successful marketing and product design require a deep understanding of regional languages and cultural nuances to truly connect with the consumer. This is often referred to as a &quot;vernacular&quot; strategy.
            </p>
        </AnimatedDiv>
    </LessonLayout>
  );
}
