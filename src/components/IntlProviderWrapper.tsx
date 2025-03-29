"use client";

import { NextIntlClientProvider } from "next-intl";
import React, { useEffect, useState } from "react";
import en from "@/messages/en.json";
import uk from "@/messages/uk.json";

const messages = { en, uk } as const; // Ensure messages object has fixed keys

type Locale = keyof typeof messages; // "en" | "uk"

export default function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // Get locale from localStorage or default to "en"
    let storedLocale = localStorage.getItem("user-locale") as Locale | null;

    // If not found, detect from browser language
    if (!storedLocale) {
      const browserLang = navigator.language.split("-")[0] as Locale; // Extract primary language (e.g., "en" from "en-US")

      console.log(`Detected browser language: '${browserLang}'`);

      if (messages[browserLang]) {
        storedLocale = browserLang;
      } else {
        storedLocale = "en"; // Fallback to English
      }

      // Save detected locale in localStorage
      localStorage.setItem("user-locale", storedLocale);
    }

    setLocale(storedLocale);
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}
