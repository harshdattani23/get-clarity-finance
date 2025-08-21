"use client";

import { Play, BookOpen, Clock, Target, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  path: string;
}

interface ModuleNavigationProps {
  modules: Module[];
  language: string;
}

export default function ModuleNavigation({ modules, language }: ModuleNavigationProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Your Learning Path</h3>
        <p className="text-gray-600">Select a module to dive deeper into specific topics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <div key={module.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{module.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{module.title}</h4>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <Target className="w-3 h-3" />
                {module.difficulty}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
              <div className="text-xs text-gray-500">
                Module {index + 1} of {modules.length}
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href={module.path}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4" />
                Start Module
              </Link>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <BookOpen className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mt-8">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-6 h-6 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-800">Learning Tips</h4>
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            Complete modules in order for the best learning experience
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            Take notes and practice with the interactive questions
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            Use both audio and text modes to reinforce your learning
          </li>
        </ul>
      </div>
    </div>
  );
}
