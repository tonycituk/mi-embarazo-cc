import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/en.json';
import es from '../public/locales/es/es.json';

const resources = {
    en: {
    translation: en,
    },
    es: {
        translation: es,
    },
};

i18n
    .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    react: {
      useSuspense: false,
    },
    debug: true,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: true, 
    
  });

export default i18n;