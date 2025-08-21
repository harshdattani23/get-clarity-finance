"use client";

import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' }
];

export default function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange 
}: LanguageSelectorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-800">Choose Language:</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
              currentLanguage === lang.code
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            <div className="text-center">
              <div className="font-semibold">{lang.native}</div>
              <div className="text-xs opacity-75">{lang.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
