import Link from 'next/link';
import { ShieldAlert, LineChart, Landmark, Users, Building, Rocket } from 'lucide-react';

interface LessonCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    isLocked?: boolean;
}

const LessonCard = ({ title, description, href, icon, isLocked = false }: LessonCardProps) => (
  <Link href={isLocked ? '#' : href} className={`block p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-indigo-100 p-3 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-indigo-900">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
    {isLocked && <span className="text-xs text-indigo-600 font-semibold mt-2 block">Coming Soon</span>}
  </Link>
);

const FoundationPage = () => {
  const foundationModules = [
    {
      title: "Module 1: India 101 - The Macro Context",
      lessons: [
        { title: "The Republic's DNA", description: "Political and administrative structure.", href: "/awareness/foundation/republic-dna", icon: <Landmark className="w-5 h-5 text-indigo-700"/> },
        { title: "The Demographic Dividend", description: "Population, youth, and diversity.", href: "/awareness/foundation/demographic-dividend", icon: <Users className="w-5 h-5 text-indigo-700"/> },
        { title: "Economic Snapshot", description: "GDP, growth drivers, and inflation.", href: "/awareness/foundation/economic-snapshot", icon: <LineChart className="w-5 h-5 text-indigo-700"/> },
      ],
    },
    {
      title: "Module 2: Pillars of the Economy",
      lessons: [
        { title: "Engine Rooms of Growth", description: "A tour of key sectors like IT, Pharma, and FMCG.", href: "/awareness/foundation/engine-rooms-of-growth", icon: <Building className="w-5 h-5 text-indigo-700"/> },
        { title: "The Indian Financial System", description: "Banking, RBI, and stock exchanges.", href: "/awareness/foundation/financial-system", icon: <ShieldAlert className="w-5 h-5 text-indigo-700"/> },
      ],
    },
    {
      title: "Module 3: Who's Who in Indian Business",
      lessons: [
        { title: "The Legacy Conglomerates", description: "Understanding giants like Tata and Reliance.", href: "/awareness/foundation/legacy-conglomerates", icon: <Building className="w-5 h-5 text-indigo-700"/> },
        { title: "The Startup Tsunami", description: "India's vibrant startup ecosystem and Unicorns.", href: "/awareness/foundation/startup-tsunami", icon: <Rocket className="w-5 h-5 text-indigo-700"/> },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-left mb-12">
        <Link href="/awareness" className="text-blue-600 font-semibold hover:underline mb-4 block">
          &larr; Back to All Levels
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Level 1: Foundation
          </span>
        </h1>
        <p className="text-xl text-gray-600 mt-2">The &quot;What&quot; of the Indian Market. A fundamental understanding of the landscape.</p>
      </header>

      <main className="space-y-12">
        {foundationModules.map((module) => (
          <section key={module.title}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">{module.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.lessons.map((lesson) => (
                <LessonCard key={lesson.title} {...lesson} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default FoundationPage;
