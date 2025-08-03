// src/app/awareness/professional/page.tsx
import Link from 'next/link';
import { Scale, Users, Handshake, BookOpen, FileText, BarChart, TrendingUp, AlertTriangle, Landmark, Building, Rocket, ShieldAlert } from 'lucide-react';

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
        <div className="bg-blue-100 p-3 rounded-full">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-blue-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      {isLocked && <span className="text-xs text-blue-600 font-semibold mt-2 block">Coming Soon</span>}
    </Link>
  );
  

export default function ProfessionalLevelPage() {
    const professionalModules = [
        {
          title: "Module 4: The Regulatory Maze",
          lessons: [
            { title: "Ease of Doing Business: Myth vs. Reality", description: "A deep dive into the real-world challenges of operating in India.", href: "/awareness/professional/ease-of-doing-business", icon: <Scale className="w-5 h-5 text-blue-700"/> },
            { title: "Navigating the Labyrinth of Indian Contracts", description: "Understanding the legal nuances of agreements.", href: "/awareness/professional/indian-contracts", icon: <FileText className="w-5 h-5 text-blue-700"/> },
            { title: "Taxation: The Knowns and Unknowns", description: "An overview of the GST and other key taxes.", href: "/awareness/professional/taxation", icon: <BarChart className="w-5 h-5 text-blue-700"/> },
          ],
        },
        {
          title: "Module 5: The Indian Consumer",
          lessons: [
            { title: "The Urban-Rural Divide", description: "Understanding the two distinct Indian markets.", href: "/awareness/professional/urban-rural-divide", icon: <Users className="w-5 h-5 text-blue-700"/> },
            { title: "The Rise of the Digital Native", description: "How technology is shaping consumer behavior.", href: "/awareness/professional/digital-native", icon: <TrendingUp className="w-5 h-5 text-blue-700"/> },
            { title: "Winning Trust in a Low-Trust Society", description: "Strategies for building brand loyalty.", href: "/awareness/professional/winning-trust", icon: <ShieldAlert className="w-5 h-5 text-blue-700"/> },
          ],
        },
        {
          title: "Module 6: Go-to-Market Strategy",
          lessons: [
            { title: "Building Local Partnerships", description: "Finding the right partners for success.", href: "/awareness/professional/local-partnerships", icon: <Handshake className="w-5 h-5 text-blue-700"/> },
            { title: "Supply Chain & Logistics: The Final Frontier", description: "Navigating the complexities of Indian logistics.", href: "/awareness/professional/supply-chain", icon: <Rocket className="w-5 h-5 text-blue-700"/> },
            { title: "Digital-First vs. Brick-and-Mortar", description: "Choosing the right channel strategy.", href: "/awareness/professional/digital-vs-brick", icon: <Building className="w-5 h-5 text-blue-700"/> },
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
            Level 2: Professional
          </span>
        </h1>
        <p className="text-xl text-gray-600 mt-2">Navigating the Nuances of the Indian Market.</p>
      </header>

      <main className="space-y-12">
        {professionalModules.map((module) => (
          <section key={module.title}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-200">{module.title}</h2>
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
}
