"use client";

import { useContext } from 'react';
import { Globe } from 'lucide-react';
import { LanguageContext } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' }
];

export default function LanguageSelector() {
  const context = useContext(LanguageContext);

  if (!context) {
    return null; // or a fallback UI
  }

  const { language, setLanguage } = context;

  return (
    <div className="relative">
      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
