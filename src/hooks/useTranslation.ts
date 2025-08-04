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

// Home Page Translations
import enHome from '@/locales/en/home.json';
import hiHome from '@/locales/hi/home.json';
import enINHome from '@/locales/en-IN/home.json';
import guHome from '@/locales/gu/home.json';
import mrHome from '@/locales/mr/home.json';
import bnHome from '@/locales/bn/home.json';
import taHome from '@/locales/ta/home.json';

// Navbar Translations
import enNavbar from '@/locales/en/navbar.json';
import hiNavbar from '@/locales/hi/navbar.json';
import enINNavbar from '@/locales/en-IN/navbar.json';
import guNavbar from '@/locales/gu/navbar.json';
import mrNavbar from '@/locales/mr/navbar.json';
import bnNavbar from '@/locales/bn/navbar.json';
import taNavbar from '@/locales/ta/navbar.json';

// Fraud Protection Translations
import enFraud from '@/locales/en/fraud-protection.json';
import hiFraud from '@/locales/hi/fraud-protection.json';
import enINFraud from '@/locales/en-IN/fraud-protection.json';
import guFraud from '@/locales/gu/fraud-protection.json';
import mrFraud from '@/locales/mr/fraud-protection.json';
import bnFraud from '@/locales/bn/fraud-protection.json';
import taFraud from '@/locales/ta/fraud-protection.json';

// Investment Quiz Translations
import enQuiz from '@/locales/en/investment-quiz.json';
import hiQuiz from '@/locales/hi/investment-quiz.json';
import enINQuiz from '@/locales/en-IN/investment-quiz.json';
import guQuiz from '@/locales/gu/investment-quiz.json';
import mrQuiz from '@/locales/mr/investment-quiz.json';
import bnQuiz from '@/locales/bn/investment-quiz.json';
import taQuiz from '@/locales/ta/investment-quiz.json';

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
  },
  'home': {
    en: enHome,
    hi: hiHome,
    'en-IN': enINHome,
    gu: guHome,
    mr: mrHome,
    bn: bnHome,
    ta: taHome,
  },
  'navbar': {
    en: enNavbar,
    hi: hiNavbar,
    'en-IN': enINNavbar,
    gu: guNavbar,
    mr: mrNavbar,
    bn: bnNavbar,
    ta: taNavbar,
  },
  'fraud-protection': {
    en: enFraud,
    hi: hiFraud,
    'en-IN': enINFraud,
    gu: guFraud,
    mr: mrFraud,
    bn: bnFraud,
    ta: taFraud,
  },
  'investment-quiz': {
    en: enQuiz,
    hi: hiQuiz,
    'en-IN': enINQuiz,
    gu: guQuiz,
    mr: mrQuiz,
    bn: bnQuiz,
    ta: taQuiz,
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
      // Fallback to a default scope that merges all namespaces
      translationScope = {
        en: {...translations['course'].en, ...translations['stock-market-course'].en, ...translations['home'].en, ...translations['navbar'].en, ...translations['fraud-protection'].en, ...translations['investment-quiz'].en},
        hi: {...translations['course'].hi, ...translations['stock-market-course'].hi, ...translations['home'].hi, ...translations['navbar'].hi, ...translations['fraud-protection'].hi, ...translations['investment-quiz'].hi},
        'en-IN': {...translations['course']['en-IN'], ...translations['stock-market-course']['en-IN'], ...translations['home']['en-IN'], ...translations['navbar']['en-IN'], ...translations['fraud-protection']['en-IN'], ...translations['investment-quiz']['en-IN']},
        gu: {...translations['course'].gu, ...translations['stock-market-course'].gu, ...translations['home'].gu, ...translations['navbar'].gu, ...translations['fraud-protection'].gu, ...translations['investment-quiz'].gu},
        mr: {...translations['course'].mr, ...translations['stock-market-course'].mr, ...translations['home'].mr, ...translations['navbar'].mr, ...translations['fraud-protection'].mr, ...translations['investment-quiz'].mr},
        bn: {...translations['course'].bn, ...translations['stock-market-course'].bn, ...translations['home'].bn, ...translations['navbar'].bn, ...translations['fraud-protection'].bn, ...translations['investment-quiz'].bn},
        ta: {...translations['course'].ta, ...translations['stock-market-course'].ta, ...translations['home'].ta, ...translations['navbar'].ta, ...translations['fraud-protection'].ta, ...translations['investment-quiz'].ta},
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
