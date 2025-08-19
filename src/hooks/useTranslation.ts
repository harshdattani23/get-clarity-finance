"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

type TranslationValue = string | string[] | { [key: string]: TranslationValue };
type TranslationData = Record<string, TranslationValue>;

export const useTranslation = (namespace?: string) => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<TranslationData>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      if (!namespace) return;

      try {
        const a = await import(`@/locales/${language}/${namespace}.json`);
        setTranslations(a.default);
      } catch {
        console.warn(`Could not load translations for namespace "${namespace}" and language "${language}". Falling back to English.`);
        try {
          const a = await import(`@/locales/en/${namespace}.json`);
          setTranslations(a.default);
        } catch {
          console.error(`Failed to load fallback English translations for namespace "${namespace}".`);
        }
      }
    };

    fetchTranslations();
  }, [language, namespace]);

  const t = (key: string): string => {
    if (!namespace) {
      console.warn("No namespace provided to useTranslation hook, but t() function was called.");
      return key;
    }

    const keys = key.split('.');
    let result: TranslationValue | undefined = translations;

    for (const k of keys) {
      if (typeof result !== 'object' || result === null || Array.isArray(result)) {
        return key; // Return key if path is invalid
      }
      result = result[k];
    }

    if (typeof result === 'string') {
      return result;
    }

    // If the result is an object or something else, return the key as a fallback.
    return key;
  };

  return { t };
};
