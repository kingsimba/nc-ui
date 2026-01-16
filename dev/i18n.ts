import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import zh from './locales/zh.json';
import de from './locales/de.json';
import es from './locales/es.json';
import th from './locales/th.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      de: {
        translation: de,
      },
      es: {
        translation: es,
      },
      th: {
        translation: th,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

// Update HTML lang attribute when language changes (enables proper hyphenation)
const updateHtmlLang = (lng: string) => {
  document.documentElement.lang = lng;
};
updateHtmlLang(i18n.language);
i18n.on('languageChanged', updateHtmlLang);

export default i18n;
