import LessonLayout from '../../LessonLayout';
import { ChevronsRight, Scale, Gavel, Map, Landmark } from 'lucide-react';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

export default function RepublicDna() {
  const lessonTitle = "The Republic's DNA";
  const lessonDescription = "Understanding India's political structure and administrative geography.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="republic-dna">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>India is a federal parliamentary democratic republic, with power shared between the central and state governments.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The government has three pillars: the Legislature (makes laws), the Executive (implements laws), and the Judiciary (interprets laws).</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Operating in India requires navigating different regulations across its 28 states and 8 union territories.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>A Sovereign, Socialist, Secular, and Democratic Republic</h2>
            <p>
                To understand how to operate in India, one must first understand how it is governed. India&apos;s political structure is a parliamentary democratic republic, where the President of India is the head of state and the Prime Minister of India is the head of government. It is based on the principle of **federalism**, where power is divided between the central government and the individual state governments.
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <h3>The Three Pillars of Government</h3>
            <div className="grid md:grid-cols-3 gap-6 my-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Gavel className="w-5 h-5"/>The Legislature</h4>
                    <p className="text-gray-600">The Parliament, which makes the laws. Composed of the Lok Sabha and Rajya Sabha.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Landmark className="w-5 h-5"/>The Executive</h4>
                    <p className="text-gray-600">Implements the laws, headed by the President and Prime Minister.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Scale className="w-5 h-5"/>The Judiciary</h4>
                    <p className="text-gray-600">Interprets the laws, headed by the Supreme Court.</p>
                </div>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
            <h3>Administrative Geography: States vs. Union Territories</h3>
            <p>
                India&apos;s administrative geography is crucial for business strategy. Regulations, licenses, and taxes can vary significantly between its 28 states and 8 union territories.
            </p>
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg">
                <div className="flex items-center gap-4">
                    <Map className="w-12 h-12 flex-shrink-0"/>
                    <div>
                        <h3 className="font-bold text-2xl">States vs. UTs: What&apos;s the difference?</h3>
                        <p className="mt-1 opacity-90"><strong>States</strong> have their own elected governments and significant autonomy. <strong>Union Territories (UTs)</strong> are administered directly by the central government, leading to different regulatory landscapes.</p>
                    </div>
                </div>
            </div>
        </AnimatedDiv>
      
    </LessonLayout>
  );
}
