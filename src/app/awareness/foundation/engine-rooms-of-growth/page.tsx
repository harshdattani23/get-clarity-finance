import LessonLayout from '../../LessonLayout';
import { ChevronsRight, Laptop, Pill, Car, ShoppingBasket, Wheat } from 'lucide-react';
import AnimatedDiv from '@/components/animations/AnimatedDiv';
import React from 'react';

interface SectorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectorCard = ({ icon, title, description }: SectorCardProps) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
        <div className="bg-indigo-100 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h4 className="font-bold text-lg text-indigo-800 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);


export default function EngineRoomsOfGrowth() {
  const lessonTitle = "Engine Rooms of Growth";
  const lessonDescription = "A tour of key sectors driving the Indian economy, including IT, Pharmaceuticals, Automotive, and FMCG.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="engine-rooms-of-growth">
        <AnimatedDiv>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The IT & BPM sector is India&apos;s global face, evolving from outsourcing to high-tech innovation.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>India is the &quot;pharmacy of the world,&quot; a leading manufacturer of affordable generic drugs.</span></li>
                    <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The Automotive and FMCG sectors are driven by India&apos;s massive domestic consumer market.</span></li>
                </ul>
            </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
            <h2>Powering India&apos;s Ascent</h2>
            <p>
                While India&apos;s economy is diverse, a few key sectors have consistently outperformed and acted as the primary engines of growth, job creation, and global competitiveness.
            </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                <SectorCard icon={<Laptop className="w-8 h-8 text-indigo-700"/>} title="IT & BPM" description="India&apos;s flagship industry, evolving from outsourcing to a global hub for digital transformation."/>
                <SectorCard icon={<Pill className="w-8 h-8 text-indigo-700"/>} title="Pharmaceuticals" description="A global leader in generic drug manufacturing, making healthcare affordable worldwide."/>
                <SectorCard icon={<Car className="w-8 h-8 text-indigo-700"/>} title="Automotive" description="One of the world&apos;s largest auto markets, now rapidly pivoting towards Electric Vehicles (EVs)."/>
                <SectorCard icon={<ShoppingBasket className="w-8 h-8 text-indigo-700"/>} title="FMCG" description="Driven by a vast consumer base, this sector is a direct play on India&apos;s consumption story."/>
                <SectorCard icon={<Wheat className="w-8 h-8 text-indigo-700"/>} title="Agriculture" description="The backbone of the economy, employing a large part of the workforce and undergoing a tech transformation."/>
            </div>
        </AnimatedDiv>
    </LessonLayout>
  );
}
