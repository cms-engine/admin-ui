import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "@/messages/en.json";
import uk from "@/messages/uk.json";

const resources = {
  en: { translation: en },
  uk: { translation: uk },
};

i18n
  .use(LanguageDetector) // Automatically detects language
  .use(initReactI18next) // Bind i18n to React
  .init({
    resources,
    fallbackLng: "en", // Default language
    detection: {
      order: ["localStorage", "navigator"], // First check localStorage, then browser settings
      caches: ["localStorage"], // Save user preference in localStorage
    },
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
