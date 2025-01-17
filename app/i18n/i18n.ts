import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
  uk: {
    translation: {
      "welcome_message": "Добро Пожаловать",
      "description": "описание"
    }
  },
  en: {
    translation: {
      "welcome_message": "Welcome to our store!",
      "description": "Explore our amazing products."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uk", // Standardsprache
  fallbackLng: "uk",
  interpolation: {
    escapeValue: false // React übernimmt Escaping
  }
});

export default i18n;
