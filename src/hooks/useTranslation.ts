"use client";

import { useLanguage } from '@/contexts/LanguageContext';

// Stock Market Course Translations
import enStock from '@/locales/en/stock-market-course.json';
import hiStock from '@/locales/hi/stock-market-course.json';
import enINStock from '@/locales/en-IN/stock-market-course.json';
import guStock from '@/locales/gu/stock-market-course.json';
import mrStock from '@/locales/mr/stock-market-course.json';
import bnStock from '@/locales/bn/stock-market-course.json';
import taStock from '@/locales/ta/stock-market-course.json';

// General Course Translations
import bnCourse from '@/locales/bn/course.json';
import enCourse from '@/locales/en/course.json';
import hiCourse from '@/locales/hi/course.json';
import enINCourse from '@/locales/en-IN/course.json';
import guCourse from '@/locales/gu/course.json';
import mrCourse from '@/locales/mr/course.json';
import taCourse from '@/locales/ta/course.json';

const translations = {
  'stock-market-course': {
    en: enStock,
    hi: hiStock,
    'en-IN': enINStock,
    gu: guStock,
    mr: mrStock,
    bn: bnStock,
    ta: taStock,
  },
  'course': {
    en: enCourse,
    hi: hiCourse,
    'en-IN': enINCourse,
    gu: guCourse,
    mr: mrCourse,
    bn: bnCourse,
    ta: taCourse,
  }
};

export const useTranslation = (namespace?: keyof typeof translations) => {
  const { language } = useLanguage();
  
  const t = (key: string) => {
    const keys = key.split('.');
    let translationScope: any;

    if (namespace && translations[namespace]) {
      translationScope = translations[namespace];
    } else {
      // Fallback to a default scope or merge all scopes
      translationScope = {
        en: {...translations['course'].en, ...translations['stock-market-course'].en},
        hi: {...translations['course'].hi, ...translations['stock-market-course'].hi},
        'en-IN': {...translations['course']['en-IN'], ...translations['stock-market-course']['en-IN']},
        gu: {...translations['course'].gu, ...translations['stock-market-course'].gu},
        mr: {...translations['course'].mr, ...translations['stock-market-course'].mr},
        bn: {...translations['course'].bn, ...translations['stock-market-course'].bn},
        ta: {...translations['course'].ta, ...translations['stock-market-course'].ta},
      };
    }

    let result: any = translationScope[language as keyof typeof translationScope];
    if (!result) {
        // Fallback to English if the language is not found
        result = translationScope['en'];
    }

    for (const k of keys) {
      if (result === undefined) break;
      result = result[k];
    }

    return result || key;
  };

  return { t };
};
