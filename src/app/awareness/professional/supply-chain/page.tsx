import LessonLayout from "@/app/awareness/LessonLayout";
import { Truck, Warehouse, MapPin, PackageX } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function SupplyChainPage() {
  return (
    <LessonLayout
      title="Supply Chain & Logistics: The Final Frontier"
      description="India's vast geography and fragmented infrastructure make logistics a critical challenge. Mastering it is key to winning the market."
      lessonSlug="supply-chain"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The Challenge of Scale and Diversity</h2>
        <p className="mb-4">
          India&apos;s supply chain is not a single entity. It&apos;s a complex web of national highways, state roads, congested city lanes, and rural dirt tracks. What works in a metro like Mumbai will fail in a Tier-3 town in Uttar Pradesh. The sheer scale and diversity of the country are the primary logistical hurdles.
        </p>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <PackageX className="h-6 w-6 text-orange-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-orange-800">
                <strong>The &quot;Last Mile&quot; Problem:</strong> This refers to the final step of the delivery process from a distribution center to the end-user. In India, this is often the most inefficient and costly part of the entire chain due to poor addressing systems, traffic congestion, and varied local conditions.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Key Components of the Indian Logistics Puzzle</h2>
        <p className="mb-4">
          Successfully navigating India requires understanding these distinct areas:
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Truck className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Fragmented Trucking Industry</h3>
              <p className="text-gray-600">The road transport sector is dominated by small fleet owners (often single-truck owners). This creates challenges in reliability, professionalization, and technology adoption. However, a new wave of logistics startups is using technology to aggregate and organize this sector.</p>
            </div>
          </li>
          <li className="flex items-start">
            <Warehouse className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Warehousing Transformation</h3>
              <p className="text-gray-600">Post-GST, the warehousing landscape has shifted from small, state-based godowns to large, strategically located fulfillment centers. This consolidation is driving efficiency, but modern warehousing space is still concentrated around major consumption hubs.</p>
            </div>
          </li>
          <li className="flex items-start">
            <MapPin className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">The Address Problem</h3>
              <p className="text-gray-600">A lack of standardized addressing systems makes last-mile delivery incredibly difficult. Couriers often rely on landmarks and multiple phone calls to find a location. Companies are now using geospatial data and innovative location-pinning solutions to tackle this.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Logistics is a Moat:</span> Companies that build a robust and efficient supply chain (like Amazon or Flipkart) create a powerful competitive advantage that is difficult for others to replicate.</li>
                <li><span className="font-semibold">Technology is the Key:</span> The logistics sector is ripe for tech-driven disruption. From route optimization and warehouse automation to drone delivery, innovation is solving old problems.</li>
                <li><span className="font-semibold">Hyperlocal is Hot:</span> The rise of quick commerce (10-30 minute deliveries) in cities has created a new, complex hyperlocal logistics layer that is a major investment area.</li>
                <li><span className="font-semibold">Factor in Buffer Stock:</span> Due to the unpredictability of transit times, holding slightly higher inventory levels than in more developed markets is often a necessary strategy to avoid stock-outs.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
