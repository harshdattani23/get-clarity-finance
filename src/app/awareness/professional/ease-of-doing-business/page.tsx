import LessonLayout from "@/app/awareness/LessonLayout";
import { Shield, FileText, BarChart, TrendingUp, AlertTriangle } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function EaseOfDoingBusinessPage() {
  return (
    <LessonLayout
      title="Ease of Doing Business: Myth vs. Reality"
      description="India has surged in global rankings, but what is the on-ground reality for businesses? We dissect the hype from the hurdles."
      lessonSlug="ease-of-doing-business"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The Official Narrative: A Remarkable Climb</h2>
        <p className="mb-4">
          India&apos;s jump in the World Bank&apos;s &apos;Ease of Doing Business&apos; rankings has been a significant headline. From ranking 142nd in 2014 to 63rd in 2019, the improvement is statistically impressive. This leap was driven by key reforms aimed at streamlining business operations.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <BarChart className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-blue-800">
                Key reforms included the Insolvency and Bankruptcy Code (IBC), Goods and Services Tax (GST), and digitalization of government processes. These were game-changers in creating a more unified, predictable national market.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">The Ground Reality: Navigating the Hurdles</h2>
        <p className="mb-4">
          While the high-level picture has improved, micro, small, and medium enterprises (MSMEs) and foreign investors still face significant on-ground challenges. The reality is often a story of contrasts.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><TrendingUp className="w-5 h-5 mr-2" />The Myth: Seamless Digital Processes</h3>
            <p className="text-gray-700">Starting a business is now a single-day affair online.</p>
            <hr className="my-2"/>
            <p className="text-gray-600"><span className="font-semibold">The Reality:</span> While registration is faster, obtaining all necessary licenses, permits (especially from state and municipal levels), and environmental clearances remains a complex and time-consuming web of interactions, often requiring physical follow-ups.</p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg text-red-800 flex items-center mb-2"><AlertTriangle className="w-5 h-5 mr-2" />The Myth: Quick Contract Enforcement</h3>
            <p className="text-gray-700">The IBC has made resolving insolvency straightforward.</p>
            <hr className="my-2"/>
            <p className="text-gray-600"><span className="font-semibold">The Reality:</span> While the IBC is a monumental reform, judicial backlogs mean that contract enforcement and dispute resolution can still take years. The legal system is overburdened, leading to significant delays and costs.</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-lg text-green-800 flex items-center mb-2"><FileText className="w-5 h-5 mr-2" />The Myth: Simplified Taxation under GST</h3>
            <p className="text-gray-700">GST is a &apos;one nation, one tax&apos; system that&apos;s easy to comply with.</p>
            <hr className="my-2"/>
            <p className="text-gray-600"><span className="font-semibold">The Reality:</span> GST has multiple slabs, complex input tax credit rules, and frequent amendments. Compliance requires sophisticated software and expert guidance, posing a significant challenge for smaller businesses.</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-lg text-red-800 flex items-center mb-2"><Shield className="w-5 h-5 mr-2" />The Myth: Land Acquisition is Easy</h3>
            <p className="text-gray-700">Clear land titles are readily available for industrial projects.</p>
            <hr className="my-2"/>
            <p className="text-gray-600"><span className="font-semibold">The Reality:</span> Land records are often outdated and unclear, leading to disputes. Acquisition is a major bottleneck for large-scale manufacturing and infrastructure projects, often involving lengthy negotiations and legal challenges.</p>
          </div>
        </div>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Acknowledge the Duality:</span> Celebrate the macro-level improvements but prepare for micro-level friction.</li>
                <li><span className="font-semibold">Due Diligence is Non-Negotiable:</span> Thoroughly investigate every aspect of a deal, from land titles to local permits. Do not rely solely on national-level declarations.</li>
                <li><span className="font-semibold">Local Expertise is Key:</span> Partner with on-the-ground experts—lawyers, accountants, and consultants—who understand the nuances of the local state and city-level bureaucracy.</li>
                <li><span className="font-semibold">Factor in Delays:</span> Build buffers into your timelines and budgets for unforeseen regulatory and legal delays. Patience is a critical asset.</li>
                <li><i className="fas fa-balance-scale"></i><span className="font-semibold">Leverage Digital, But Don&apos;t Abandon Physical:</span> Use online portals for everything you can, but be prepared to send a representative to a government office to move a file from one desk to another.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
