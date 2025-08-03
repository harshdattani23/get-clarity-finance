import LessonLayout from '../../LessonLayout';
import { Zap, HandCoins, ChevronsRight, Milestone, Building2 } from 'lucide-react';

const HubCard = ({ title, description }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="font-bold text-lg text-indigo-800 flex items-center gap-2 mb-2"><Building2 className="w-5 h-5"/>{title}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default function StartupTsunami() {
  const lessonTitle = "The Startup Tsunami";
  const lessonDescription = "An introduction to India's vibrant startup ecosystem, the concept of 'Unicorns,' and key hubs.";

  return (
    <LessonLayout title={lessonTitle} description={lessonDescription} lessonSlug="startup-tsunami">
        {/* Key Takeaways Section */}
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl text-indigo-900 mb-2">Key Takeaways</h3>
            <ul className="space-y-2 text-indigo-800">
                <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>India is a global top-tier startup ecosystem, driven by cheap data, digital payments (UPI), and a massive domestic market.</span></li>
                <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>A 'Unicorn' is a startup valued at over $1 billion, and India has produced over 100 of them.</span></li>
                <li className="flex items-start gap-3"><ChevronsRight className="w-5 h-5 mt-1 flex-shrink-0" /><span>The ecosystem is centered around key hubs like Bengaluru, Delhi-NCR, and Mumbai, each with its own specialty.</span></li>
            </ul>
        </div>

        <h2>The New Engine of Innovation</h2>
        <p>
            In stark contrast to the legacy conglomerates, India has cultivated one of the world's most dynamic and fastest-growing startup ecosystems. Fueled by venture capital, a massive domestic market, and a pool of skilled tech talent, startups are now at the forefront of innovation in India.
        </p>

        <h3>Key Enablers of the Boom</h3>
        <ul className="space-y-4 !pl-0">
            <li className="flex items-start gap-3"><Zap className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" /><div><strong>Cheap Data:</strong> The rollout of affordable 4G data (led by Jio) connected hundreds of millions of Indians to the internet for the first time.</div></li>
            <li className="flex items-start gap-3"><HandCoins className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><strong>Digital Payments (UPI):</strong> The Unified Payments Interface made digital transactions seamless and ubiquitous, creating the foundation for countless fintech and e-commerce businesses.</div></li>
        </ul>

        {/* Callout Box for Unicorns */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
            <div className="flex items-center gap-4">
                <Milestone className="w-12 h-12 flex-shrink-0"/>
                <div>
                    <h3 className="font-bold text-2xl">The Rise of the Unicorns</h3>
                    <p className="mt-1 opacity-90">A "Unicorn" is a privately held startup company with a value of over $1 billion. India has become a Unicorn factory, producing over 100 of them across various sectors. These companies are not just disrupting old industries; they are creating entirely new ones.</p>
                </div>
            </div>
        </div>
        
        <h3>Key Startup Hubs</h3>
        <p>
            While startups are emerging all over the country, the ecosystem is concentrated in a few key urban centers:
        </p>
        <div className="grid md:grid-cols-3 gap-6 my-6">
            <HubCard title="Bengaluru (Bangalore)" description="The 'Silicon Valley of India,' known for deep tech talent and a strong VC presence."/>
            <HubCard title="Delhi-NCR" description="A massive consumer market with a focus on e-commerce, logistics, and fintech."/>
            <HubCard title="Mumbai" description="The financial capital, with natural strengths in fintech, media, and entertainment."/>
        </div>

        <p>
            Understanding this ecosystem is key to understanding the future of the Indian economy, as today's startups are poised to become tomorrow's industry leaders.
        </p>
    </LessonLayout>
  );
}
