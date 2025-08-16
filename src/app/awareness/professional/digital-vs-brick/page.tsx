import LessonLayout from "@/app/awareness/LessonLayout";
import { ShoppingCart, Building } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function DigitalVsBrickPage() {
  return (
    <LessonLayout
      title="Digital-First vs. Brick-and-Mortar"
      description="Choosing the right channel strategy in a market that's both hyper-digital and deeply traditional."
      lessonSlug="digital-vs-brick"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The E-commerce Boom</h2>
        <p className="mb-4">
          India&apos;s e-commerce market has exploded, driven by cheap data, a young population, and the convenience of mobile shopping. Platforms like Flipkart (owned by Walmart) and Amazon India are dominant, but a vibrant ecosystem of niche D2C (Direct-to-Consumer) brands is also thriving. A digital-first approach offers rapid market access, lower initial capital expenditure, and the ability to reach a pan-India audience from day one.
        </p>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-6 w-6 text-green-700" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-green-800">Advantages of a Digital-First Strategy</h3>
              <ul className="list-disc list-inside mt-2 text-green-900">
                <li>Lower setup costs compared to physical retail.</li>
                <li>Access to rich customer data and analytics.</li>
                <li>Ability to quickly test and iterate on products and marketing.</li>
                <li>Scalability across the entire country without a physical footprint.</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">The Enduring Power of Physical Retail</h2>
        <p className="mb-4">
          Despite the digital wave, it would be a grave mistake to underestimate the importance of brick-and-mortar retail in India. For a large segment of the population, especially in non-metro areas, the &quot;touch and feel&quot; factor is crucial. Trust is often placed in the local shopkeeper, and many complex purchases (like electronics or vehicles) still happen offline.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Building className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-blue-800">Advantages of a Brick-and-Mortar Strategy</h3>
              <ul className="list-disc list-inside mt-2 text-blue-900">
                <li>Builds tangible brand presence and trust.</li>
                <li>Caters to customers who prefer to see products before buying.</li>
                <li>Leverages the expertise and relationships of local retailers.</li>
                <li>Acts as a fulfillment and service center for online orders.</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">The Winning Strategy: Phygital (Physical + Digital)</h2>
        <p className="mb-4">
          The most successful companies in India are not choosing one or the other; they are blending both. The future is &quot;phygital&quot; - an integrated approach where the online and offline experiences complement each other.
        </p>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Examples of Phygital Models:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Click and Collect:</span> Order online, pick up in a nearby store.</li>
                <li><span className="font-semibold">Endless Aisle:</span> In-store tablets allow customers to order products that are not physically in stock.</li>
                <li><span className="font-semibold">QR Codes in Stores:</span> Scan a QR code to get more product information, read reviews, or watch videos.</li>
                <li><span className="font-semibold">Hyperlocal Delivery:</span> Using local stores as mini-warehouses to enable ultra-fast delivery (e.g., Zepto, Blinkit).</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
