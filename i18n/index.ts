import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'
import enLocale from './en'
import viLocale from './vi'

const resources = {
  en: {
    translation: enLocale
  },
  vi: {
    translation: viLocale
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
  })

export default i18n
