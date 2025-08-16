import LessonLayout from "@/app/awareness/LessonLayout";
import { Handshake, ShieldCheck, Star, MessageCircle } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function WinningTrustPage() {
  return (
    <LessonLayout
      title="Winning Trust in a Low-Trust Society"
      description="In India, trust is not given; it's earned. Explore the cultural and practical steps to building a credible brand."
      lessonSlug="winning-trust"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The Trust Deficit: Why It Exists</h2>
        <p className="mb-4">
          Historically, Indian consumers have faced issues like inconsistent quality, poor customer service, and misleading advertising. This has created a &quot;trust deficit,&quot; where people are inherently skeptical of new brands and products. Unlike high-trust societies where brands are given the benefit of the doubt, in India, the default is suspicion.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-yellow-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-yellow-800">
                <strong>Key Insight:</strong> Trust is not transactional; it&apos;s relational. It is built over time through consistent, reliable, and transparent interactions. A single negative experience can undo years of brand-building.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Strategies for Building Credibility</h2>
        <p className="mb-4">
          Building trust requires a multi-faceted approach that goes beyond just marketing.
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Handshake className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Hyper-Localization and Personal Touch</h3>
              <p className="text-gray-600">Having a local presence, even a small one, matters. Using local languages, featuring local faces in advertising, and engaging with community events can build a powerful sense of &quot;this brand is for us.&quot;</p>
            </div>
          </li>
          <li className="flex items-start">
            <Star className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Leverage Social Proof and Influencers</h3>
              <p className="text-gray-600">Indians rely heavily on word-of-mouth. Customer testimonials, positive reviews, and endorsements from trusted local influencers (not just mega-celebrities) can be incredibly effective. Trust is transferred from the known person to the unknown brand.</p>
            </div>
          </li>
          <li className="flex items-start">
            <MessageCircle className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Transparent and Accessible Customer Service</h3>
              <p className="text-gray-600">A clear and easy-to-access customer service process is non-negotiable. This includes having support in multiple Indian languages and offering channels like WhatsApp, which are hugely popular for communication.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Cash on Delivery (COD) is a Trust Signal:</span> For e-commerce, offering COD was historically a key strategy to overcome the fear of online payment fraud. While digital payments are now dominant, the principle remains: reduce the consumer&apos;s perceived risk.</li>
                <li><span className="font-semibold">Build a Face for the Brand:</span> Having a visible, accessible founder or country head who communicates regularly can build immense trust and a personal connection with customers.</li>
                <li><span className="font-semibold">Consistency is Everything:</span> Ensure your product quality, service, and messaging are consistent across all touchpoints. Inconsistent experiences quickly erode trust.</li>
                <li><span className="font-semibold">Invest in Community:</span> Building a community around your brand creates advocates who will spread trust organically.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
