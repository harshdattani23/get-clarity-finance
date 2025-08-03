"use client";

import Link from 'next/link';
import { BookOpen, CheckCircle } from 'lucide-react';
import { stockMarketCourseStructure } from '@/lib/stockMarketCourse';
import { useTranslation } from '@/hooks/useTranslation';

interface Lesson {
    slug: string;
    title: string;
    href: string;
}

interface Module {
    title:string;
    description:string;
    lessons: Lesson[];
}

interface ModuleCardProps {
    module: Module;
    moduleNumber: number;
}

const ModuleCard = ({ module, moduleNumber }: ModuleCardProps) => {
    const { t } = useTranslation();
    const completedLessons = module.lessons.filter(l => l.href !== '#').length;
    const totalLessons = module.lessons.length;
    const progress = (completedLessons / totalLessons) * 100;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
            <div className="flex items-start gap-6 mb-6">
                <div className="text-5xl font-bold text-gray-200">
                    {moduleNumber}
                </div>
                <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800">{t(module.title)}</h3>
                    <p className="text-gray-600 mt-1">{t(module.description)}</p>
                </div>
            </div>
            
            <div className="space-y-4 flex-grow">
                {module.lessons.map((lesson, index) => (
                    <Link 
                        href={lesson.href} 
                        key={index} 
                        className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${lesson.href === '#' ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-green-50 text-green-800 hover:bg-green-100'}`}
                    >
                        <div className="p-2 bg-white rounded-full shadow-sm">
                            {lesson.href === '#' ? 
                                <BookOpen className="w-5 h-5" /> : 
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            }
                        </div>
                        <span className="font-semibold">{t(lesson.title)}</span>
                        {lesson.href === '#' && <span className="text-xs ml-auto font-medium">[Coming Soon]</span>}
                    </Link>
                ))}
            </div>

            <div className="mt-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-2">{completedLessons} of {totalLessons} lessons complete</p>
            </div>
        </div>
    );
};

export default function StockMarketCoursePage() {
    const { t } = useTranslation();
    const modules = stockMarketCourseStructure;

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
                    {t('stockMarketCourse.title')}
                </span>
            </h1>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">{t('stockMarketCourse.description')}</p>
        </header>
        <main className="grid lg:grid-cols-2 gap-12">
            {modules.map((mod, index) => (
            <ModuleCard key={mod.title} module={mod} moduleNumber={index + 1} />
            ))}
        </main>
        </div>
    </div>
  );
}
