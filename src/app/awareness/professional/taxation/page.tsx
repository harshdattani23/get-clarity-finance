import LessonLayout from "@/app/awareness/LessonLayout";
import { Percent, Banknote, Landmark, AlertCircle } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function TaxationPage() {
  return (
    <LessonLayout
      title="Taxation: The Knowns and Unknowns"
      description="A high-level overview of India's complex tax landscape, including GST, corporate tax, and the dreaded 'angel tax'."
      lessonSlug="taxation"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The GST Revolution</h2>
        <p className="mb-4">
          The Goods and Services Tax (GST), introduced in 2017, was India&apos;s most significant tax reform. It replaced a confusing web of over a dozen central and state taxes with a single, unified tax structure. The goal was to create a common market, reduce cascading taxes, and improve compliance.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Percent className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-blue-800">
                <strong>Key Concept:</strong> GST is a destination-based, multi-stage, consumption tax. In simple terms, tax is collected at each stage of the supply chain, and the end consumer bears the final cost.
              </p>
            </div>
          </div>
        </div>
        <p className="mb-4">
          However, the reality is more complex than the &apos;One Nation, One Tax&apos; slogan suggests. There are multiple tax slabs (0%, 5%, 12%, 18%, 28%), plus special rates for items like gold. Compliance can be a heavy burden, requiring monthly, quarterly, and annual filings.
        </p>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Corporate and Capital Gains Taxes</h2>
        <p className="mb-4">
          Beyond GST, businesses must navigate several other key taxes.
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Landmark className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Corporate Income Tax</h3>
              <p className="text-gray-600">The standard corporate tax rate has been progressively reduced to make India more competitive. For new manufacturing companies, the rate can be as low as 15% (plus cess and surcharge), while most domestic companies fall into a 22% or 30% slab, depending on various factors. Understanding these nuances is key for financial planning.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Banknote className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Capital Gains Tax</h3>
              <p className="text-gray-600">This is crucial for investors. Gains from selling assets are taxed. The rate depends on the asset type (e.g., equity shares, property) and the holding period. Short-term gains are generally taxed at higher rates than long-term gains.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>

      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">The Infamous &quot;Angel Tax&quot;</h2>
        <p className="mb-4">
          A significant point of concern for startups and foreign investors has been the &quot;Angel Tax&quot;. This is a tax levied on the premium paid by investors for shares in a private company, where the share price is seen as exceeding the &quot;fair market value&quot;.
        </p>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-red-800">
                While intended to prevent money laundering, this tax has often been a bottleneck for legitimate startup funding. The government has introduced several exemptions and clarifications over the years, but it remains a complex and often unpredictable area of tax law.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.6}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Tax is a State and Central Subject:</span> Be aware that rules can vary, and you&apos;ll be dealing with both central and state tax authorities.</li>
                <li><span className="font-semibold">Professional Advice is Essential:</span> The tax code is complex and changes frequently. Do not attempt to navigate it without a qualified Indian Chartered Accountant (CA).</li>
                <li><span className="font-semibold">Understand Transfer Pricing:</span> If you are a multinational company, be prepared for intense scrutiny on transfer pricing—the pricing of goods and services between your Indian subsidiary and the parent company.</li>
                <li><span className="font-semibold">Keep Impeccable Records:</span> GST and income tax authorities have extensive powers. Meticulous record-keeping is your best defense against potential disputes.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
