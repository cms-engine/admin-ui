// services/locale.ts

import { Locale, defaultLocale } from "@/i18n/config";

const COOKIE_NAME = "NEXT_LOCALE";

// Function to get the user locale from cookies
export function getUserLocale(): Locale {
  if (typeof document === "undefined") {
    // Return default locale if on the server
    return defaultLocale;
  }

  console.log("I'm here");
  const cookies = document.cookie.split("; ");
  const localeCookie = cookies.find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  return (localeCookie ? localeCookie.split("=")[1] : defaultLocale) as Locale;
}

// Function to set the user locale in cookies
export function setUserLocale(locale: Locale) {
  if (typeof document !== "undefined") {
    console.log("I'm here");
    document.cookie = `${COOKIE_NAME}=${locale}; path=/;`;
  }
}
