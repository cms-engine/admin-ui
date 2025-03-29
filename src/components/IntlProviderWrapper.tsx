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
    const storedLocale = localStorage.getItem("user-locale") as Locale | null;
    if (storedLocale && messages[storedLocale]) {
      setLocale(storedLocale);
    }
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}
