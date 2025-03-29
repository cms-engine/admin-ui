"use client";

import { NextIntlClientProvider } from "next-intl";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>("en");
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null); // Allow messages to be null initially

  useEffect(() => {
    // Get locale from localStorage or default to "en"
    let storedLocale = localStorage.getItem("user-locale");

    if (storedLocale == null) {
      const browserLang = navigator.language.split("-")[0];
      console.log(`Detected browser language: '${browserLang}'`);

      // Set storedLocale to either the detected language or fallback to "en"
      storedLocale = browserLang || "en"; // Fallback to English
    }

    // Dynamically import the messages based on the locale
    import(`@/messages/${storedLocale}.json`)
      .then((module) => {
        setMessages(module.default); // Set messages only if import is successful
        localStorage.setItem("user-locale", storedLocale); // Set locale in localStorage
        setLocale(storedLocale); // Now it's safe to set locale
      })
      .catch(() => {
        console.warn(`Translations not found for locale '${storedLocale}', falling back to 'en'`);
        import("@/messages/en.json").then((module) => {
          setMessages(module.default); // Set messages for English
          localStorage.setItem("user-locale", "en"); // Ensure default locale is set
          setLocale("en"); // Set locale to English
        });
      });
  }, []);

  // Prevent rendering until messages are loaded
  if (!messages) {
    return <CircularProgress />; // Show loading spinner
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
