import LessonLayout from '../../LessonLayout';
import { ChevronsRight, Building2, UserCheck, BarChart, History } from 'lucide-react';
import AnimatedDiv from '@/components/animations/AnimatedDiv';

const ConglomerateCard = ({ name, description }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Building2 className="w-5 h-5"/>{name}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);


export default function LegacyConglomerates() {
  const lessonTitle = "The Legacy Conglomerates";
  const lessonDescription = "Understanding the history and influence of groups like Tata, Reliance Industries, and Aditya Birla Group.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="legacy-conglomerates">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Much of India's economy is influenced by large, family-led conglomerates with diverse business interests.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>These groups are "promoter-led," meaning the founding family retains significant control and influence.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>Iconic groups include Tata, Reliance, Aditya Birla Group, and Mahindra, each with a vast and varied portfolio.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>The Titans of Indian Industry</h2>
            <p>
                Unlike many Western economies, a significant portion of India's business landscape is dominated by large, family-led conglomerates. These groups have a history deeply intertwined with India's own economic journey and operate across a vast array of sectors, from salt to software.
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <h3>Key Characteristics</h3>
            <ul className="space-y-4 !pl-0 my-6">
                <li className="flex items-start gap-3"><BarChart className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" /><div><strong>Diversified Interests:</strong> A presence in dozens of unrelated businesses, from salt to software.</div></li>
                <li className="flex items-start gap-3"><UserCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><strong>Promoter-Led:</strong> Controlled by a founding family with a significant stake and influence.</div></li>
                <li className="flex items-start gap-3"><History className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" /><div><strong>Long-Term Vision:</strong> Strategic decisions are often made with a multi-generational perspective.</div></li>
            </ul>
        </AnimatedDiv>


        <AnimatedDiv delay={0.5}>
            <h3>Prominent Examples</h3>
            <div className="grid md:grid-cols-2 gap-6 my-8">
                <ConglomerateCard name="Tata Group" description="Founded in 1868 and known for its strong ethical values. Owns global brands like Jaguar Land Rover."/>
                <ConglomerateCard name="Reliance Industries" description="India's largest company, with a dominant presence in petrochemicals, telecom (Jio), and retail."/>
                <ConglomerateCard name="Aditya Birla Group" description="A global conglomerate with a major presence in metals, cement, and telecommunications."/>
                <ConglomerateCard name="Mahindra Group" description="A leader in utility vehicles and tractors with a strong presence in IT and financial services."/>
            </div>
        </AnimatedDiv>
    </LessonLayout>
  );
}
