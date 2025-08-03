"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import en from '@/locales/en/stock-market-course.json';
import hi from '@/locales/hi/stock-market-course.json';
import enIN from '@/locales/en-IN/stock-market-course.json';
import gu from '@/locales/gu/stock-market-course.json';
import mr from '@/locales/mr/stock-market-course.json';
import bn from '@/locales/bn/stock-market-course.json';
import ta from '@/locales/ta/stock-market-course.json';
import bnCourse from '@/locales/bn/course.json';
import enCourse from '@/locales/en/course.json';
import hiCourse from '@/locales/hi/course.json';
import enINCourse from '@/locales/en-IN/course.json';
import guCourse from '@/locales/gu/course.json';
import mrCourse from '@/locales/mr/course.json';
import taCourse from '@/locales/ta/course.json';

const translations = {
  en: { ...en, ...enCourse },
  hi: { ...hi, ...hiCourse },
  'en-IN': { ...enIN, ...enINCourse },
  gu: { ...gu, ...guCourse },
  mr: { ...mr, ...mrCourse },
  bn: { ...bn, ...bnCourse },
  ta: { ...ta, ...taCourse },
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      result = result[k];
      if (!result) {
        return key;
      }
    }
    return result;
  };

  return { t };
};
