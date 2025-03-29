"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import React, { useEffect, useState } from "react";

export default function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLocale = i18n.language || "en";
    i18n.changeLanguage(storedLocale).then(() => setReady(true));
  }, []);

  if (!ready) return null; // Prevent rendering until language is set

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
