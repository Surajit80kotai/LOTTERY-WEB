import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const Languages = ['en', 'fr']
const option = {
  // order: ['navigator', 'htmlTag', 'path', 'subdomain'],
  // checkWhitelist: true
  order: ['localStorage', 'navigator'],
  caches: ['localStorage']
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    logLevel: 'error',
    whitelist: Languages,
    detection: option,
    interpolation: {
      escapeValue: false,
    }
  });


export default i18n;