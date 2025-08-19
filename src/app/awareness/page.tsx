"use client"
import Link from 'next/link';
import { Layers, Briefcase, BarChart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { courseStructure } from '@/lib/course';

interface LevelCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    level: string;
    lessons: { href: string }[];
}

const LevelCard = ({ icon, title, description, href, lessons }: Omit<LevelCardProps, 'level'>) => {
  const { t } = useTranslation('course');
  const isLocked = !lessons.some(lesson => lesson.href !== '#');

  return (
    <Link 
      href={isLocked ? "#" : href} 
      className={`block bg-white p-8 rounded-2xl shadow-lg border border-gray-200  transition-all ${isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-blue-100 p-4 rounded-full">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-900">{t(title)}</h2>
        </div>
      </div>
      <p className="text-gray-600 mt-4">{t(description)}</p>
      <div className="text-right mt-4">
        <span className={`font-semibold ${isLocked ? 'text-gray-400' : 'text-blue-600 hover:underline'}`}>
          {isLocked ? 'Coming Soon' : 'Start Learning →'}
        </span>
      </div>
    </Link>
  );
};

export default function AwarenessHub() {
    const { t } = useTranslation('course');
  const courseLevels = [
    {
      icon: <Layers className="w-8 h-8 text-blue-700" />,
      title: "awareness_hub.level_1_title",
      description: "awareness_hub.level_1_description",
      href: "/awareness/foundation",
      level: "foundation"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-700" />,
      title: "awareness_hub.level_2_title",
      description: "awareness_hub.level_2_description",
      href: "/awareness/professional",
      level: "professional"
    },
    {
      icon: <BarChart className="w-8 h-8 text-blue-700" />,
      title: "awareness_hub.level_3_title",
      description: "awareness_hub.level_3_description",
      href: "#", // Will be /awareness/strategic
      level: "strategic"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {t('awareness_hub.title')}
          </span>
        </h1>
        <p className="text-xl text-gray-600 mt-2 max-w-3xl mx-auto">
          {t('awareness_hub.description')}
        </p>
      </header>
      
      <main className="grid lg:grid-cols-3 gap-8">
        {courseLevels.map((level) => {
            const levelData = courseStructure.find(l => l.level === level.level);
            return <LevelCard key={level.title} {...level} lessons={levelData ? levelData.modules.flatMap(m => m.lessons) : []} />
        })}
      </main>
    </div>
  );
}
