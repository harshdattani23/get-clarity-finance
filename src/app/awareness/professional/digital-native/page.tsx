import LessonLayout from "@/app/awareness/LessonLayout";
import { Smartphone, ShoppingCart, Youtube, MessageSquare } from 'lucide-react';
import AnimatedDiv from "@/components/animations/AnimatedDiv";

export default function DigitalNativePage() {
  return (
    <LessonLayout
      title="The Rise of the Digital Native"
      description="Cheap data and affordable smartphones have created a new generation of Indian consumers who are online-first."
      lessonSlug="digital-native"
    >
      <AnimatedDiv>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">The Jio Effect</h2>
        <p className="mb-4">
          The single most transformative event in India&apos;s digital landscape was the launch of Reliance Jio in 2016. By offering free voice calls and incredibly cheap 4G data, Jio onboarded hundreds of millions of Indians onto the internet for the first time. This wasn&apos;t just an evolution; it was a revolution.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Smartphone className="h-6 w-6 text-blue-700" />
            </div>
            <div className="ml-3">
              <p className="text-md text-blue-800">
                <strong>Key Statistic:</strong> India&apos;s mobile data consumption per user is among the highest in the world, exceeding that of many developed nations. This is a direct result of the data price war initiated by Jio.
              </p>
            </div>
          </div>
        </div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2}>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Characteristics of the Digital Indian</h2>
        <p className="mb-4">
          This new wave of internet users has distinct behaviors and preferences that businesses must understand.
        </p>
        
        <ul className="space-y-4 mt-6">
          <li className="flex items-start">
            <Youtube className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Video-First Content Consumption</h3>
              <p className="text-gray-600">For many, video is the primary way of consuming information and entertainment. Platforms like YouTube, Instagram Reels, and local equivalents are dominant. Literacy is not a barrier to watching a video in a local language.</p>
            </div>
          </li>
          <li className="flex items-start">
            <ShoppingCart className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Mobile-Centric E-commerce</h3>
              <p className="text-gray-600">The primary device for online shopping is the smartphone. Desktop e-commerce is a niche. This means mobile-first design, fast-loading pages, and app-based strategies are critical. &quot;Social commerce&quot; via platforms like WhatsApp and Instagram is also huge.</p>
            </div>
          </li>
          <li className="flex items-start">
            <MessageSquare className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-800">Vernacular is Vital</h3>
              <p className="text-gray-600">While English is common in business, the vast majority of new internet users think, speak, and search in their regional languages (Hindi, Tamil, Bengali, etc.). A purely English-language strategy will miss a massive segment of the market.</p>
            </div>
          </li>
        </ul>
      </AnimatedDiv>
      
      <AnimatedDiv delay={0.4}>
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Key Takeaways for Investors</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Think Mobile-First, Always:</span> Your website, app, and marketing materials must be optimized for a small screen and potentially slow connections.</li>
                <li><span className="font-semibold">Localize Your Content:</span> Go beyond simple translation. Understand the cultural nuances and linguistic preferences of your target regions.</li>
                <li><span className="font-semibold">Leverage Video:</span> Short-form video is one of the most effective ways to reach and engage this audience.</li>
                <li><span className="font-semibold">UPI is the Standard:</span> The Unified Payments Interface (UPI) has revolutionized digital payments. Any e-commerce venture must have deep integration with UPI.</li>
            </ul>
        </div>
      </AnimatedDiv>
    </LessonLayout>
  );
}
