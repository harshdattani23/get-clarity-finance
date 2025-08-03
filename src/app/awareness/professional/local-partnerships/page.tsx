import LessonLayout from "@/app/awareness/LessonLayout";
import { Users, Link2, Handshake, Map } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function LocalPartnershipsPage() {
  return (
    <LessonLayout
      title="Building Local Partnerships"
      description="In India, who you know is often as important as what you know. Forging the right local partnerships is a critical success factor."
      lessonSlug="local-partnerships"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Partnerships are Non-Negotiable</h2>
        <p className="mb-4">
          Attempting to enter the Indian market as a complete outsider is a high-risk strategy. The business landscape is deeply rooted in relationships, local nuances, and unwritten rules. A strong local partner can provide invaluable access, credibility, and operational expertise that would take years to build independently.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-blue-800">
                <strong>Core Concept:</strong> A local partner isn't just a vendor or a distributor; they are your cultural and business translator, your guide through bureaucracy, and your first bridge to the local ecosystem.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Types of Partnerships to Consider</h2>
        <p className="mb-4">
          The right partnership model depends entirely on your business objectives.
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Link2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Joint Ventures (JVs)</h3>
              <p className="text-gray-600">A formal partnership where you create a new entity with a local company. This is common in sectors with high regulatory oversight (like insurance or defense) or where deep local infrastructure is needed. It's a high-commitment, high-reward strategy.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Map className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Distribution & Channel Partners</h3>
              <p className="text-gray-600">The most common model. Partnering with established distributors who have existing networks is the fastest way to achieve scale, especially in reaching Tier-2, Tier-3, and rural markets. The key is finding a partner whose interests are aligned with yours.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Handshake className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Strategic Alliances</h3>
              <p className="text-gray-600">Less formal than a JV, these can be marketing tie-ups, technology sharing agreements, or co-branding exercises. This is a lower-risk way to test the market and build brand association with an established local player.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Conduct Rigorous Due Diligence:</span> Investigate a potential partner's reputation, financial stability, and track record. Don't rely on face value. Talk to their other partners and customers.</li>
                <li><span className="font-semibold">Define Everything in Writing:</span> While relationships are key, the contract must be watertight. Clearly outline roles, responsibilities, financial arrangements, exit clauses, and dispute resolution mechanisms.</li>
                <li><span className="font-semibold">Look for Aligned Values:</span> A mismatch in business ethics, long-term vision, or work culture can doom a partnership, even if the commercial logic is sound.</li>
                <li><span className="font-semibold">"Promoter" is a Key Concept:</span> Understand the role of the "promoter" or founding family in the partner company. Their influence and reputation are critical assets (or liabilities).</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
