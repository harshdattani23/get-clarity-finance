import LessonLayout from "@/app/awareness/LessonLayout";
import { Mountain, Store } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function UrbanRuralDividePage() {
  return (
    <LessonLayout
      title="The Urban-Rural Divide"
      description="India is not a monolith. Understanding the stark differences between its urban and rural consumers is fundamental to any market strategy."
      lessonSlug="urban-rural-divide"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Two Indias: A Tale of Contrasts</h2>
        <p className="mb-4">
          The most common mistake foreign businesses make is viewing India as a single market. In reality, it&apos;s a complex patchwork of many markets, with the most significant split being between urban and rural areas. Roughly 65% of India&apos;s population lives in rural areas, representing a massive, yet challenging, consumer base.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center mb-3">
              <Store className="w-8 h-8 text-blue-700 mr-4" />
              <h3 className="text-2xl font-bold text-blue-900">Urban India</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>High Disposable Income:</strong> Concentrated wealth and higher-paying jobs.</li>
              <li><strong>Brand Conscious:</strong> Aspirations are often benchmarked against global trends.</li>
              <li><strong>Digitally Savvy:</strong> High internet penetration and e-commerce adoption.</li>
              <li><strong>Time-Poor:</strong> Value convenience, speed, and service.</li>
              <li><strong>Infrastructure:</strong> Well-developed logistics, retail, and payment ecosystems.</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center mb-3">
              <Mountain className="w-8 h-8 text-green-700 mr-4" />
              <h3 className="text-2xl font-bold text-green-900">Rural India (Bharat)</h3>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Value-Driven:</strong> Price sensitivity is extremely high; focus is on utility.</li>
              <li><strong>Community-Oriented:</strong> Purchase decisions are heavily influenced by local leaders, family, and social norms.</li>
              <li><strong>Emerging Digital Access:</strong> Rapidly growing mobile internet use, but often on low-end devices with intermittent connectivity.</li>
              <li><strong>Relationship-Based:</strong> Trust in the local retailer (kirana store) is paramount.</li>
              <li><strong>Logistical Challenges:</strong> Last-mile delivery is difficult and expensive.</li>
            </ul>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-10">The &quot;Sachet Revolution&quot; and Its Legacy</h2>
        <p className="mb-4">
          A classic example of understanding the rural market is the &quot;sachet revolution.&quot; Companies like Unilever and P&G realized that rural consumers couldn&apos;t afford large bottles of shampoo or detergent. They introduced single-use sachets at very low price points (e.g., ₹1 or ₹2). This strategy unlocked a massive, previously untapped market by aligning the product size and price with the purchasing power and daily-wage earning cycles of rural consumers.
        </p>
         <div className="bg-gray-100 p-4 rounded-lg mt-4 italic">
            <p>&quot;The sachet is the single most important innovation in reaching the rural Indian consumer. It&apos;s not just about a smaller size; it&apos;s a different business model.&quot;</p>
        </div>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Don&apos;t &quot;Shrink it and Pink it&quot;:</span> You cannot simply take an urban product, make it smaller or cheaper, and expect it to sell in rural markets. The entire value proposition needs to be rethought.</li>
                <li><span className="font-semibold">Distribution is King:</span> Reaching the rural consumer requires a deep, multi-layered distribution network that leverages local partners.</li>
                <li><span className="font-semibold">Aspiration vs. Affordability:</span> While rural consumers are aspirational, their purchasing decisions are governed by immediate affordability. Products must deliver clear value for money.</li>
                <li><span className="font-semibold">The Digital Bridge:</span> Mobile payments and vernacular content are rapidly bridging the gap, creating new opportunities to engage with rural customers directly.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
