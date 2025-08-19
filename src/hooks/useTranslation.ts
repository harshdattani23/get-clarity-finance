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
        // First try to load from the nested stock-market-course directory
        if (namespace.includes('.')) {
          const [course, lesson] = namespace.split('.');
          const a = await import(`@/locales/${language}/${course}/${lesson}.json`);
          setTranslations(a.default);
        } else {
          // Try to load from the root locales directory
          const a = await import(`@/locales/${language}/${namespace}.json`);
          setTranslations(a.default);
        }
      } catch {
        console.warn(`Could not load translations for namespace "${namespace}" and language "${language}". Falling back to English.`);
        try {
          // First try to load from the nested stock-market-course directory
          if (namespace.includes('.')) {
            const [course, lesson] = namespace.split('.');
            const a = await import(`@/locales/en/${course}/${lesson}.json`);
            setTranslations(a.default);
          } else {
            // Try to load from the root locales directory
            const a = await import(`@/locales/en/${namespace}.json`);
            setTranslations(a.default);
          }
        } catch {
          console.error(`Failed to load fallback English translations for namespace "${namespace}".`);
        }
      }
    };

    fetchTranslations();
  }, [language, namespace]);

  const t = (key: string): TranslationValue => {
    if (!namespace) {
      console.warn("No namespace provided to useTranslation hook, but t() function was called.");
      return key;
    }

    const keys = key.split('.');
    let result: TranslationValue | undefined = translations;

    for (const k of keys) {
      if (typeof result !== 'object' || result === null) {
        return key; // Return key if path is invalid
      }
      result = result[k];
    }

    if (result !== undefined) {
      return result;
    }

    // If the result is undefined, return the key as a fallback.
    return key;
  };

  return { t, translations };
};
