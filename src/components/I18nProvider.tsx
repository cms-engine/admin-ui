"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";
import React, { useEffect, useState } from "react";

export default function IntlProviderWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true); //Wait initializing to prevent hydration error in languages
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
