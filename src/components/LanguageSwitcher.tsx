"use client";

import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation(undefined, { keyPrefix: "language" });

  // State to store selected locale
  const [locale, setLocale] = useState<string | null>();

  useEffect(() => {
    // Use the detected or saved language
    const savedLocale = i18n.language;
    setLocale(savedLocale);
  }, [i18n.language]);

  const handleChange = async (event: SelectChangeEvent) => {
    const newLocale = event.target.value;

    try {
      await i18n.changeLanguage(newLocale); // Ensure language change completes
      setLocale(newLocale);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  if (!locale) return null;

  return (
    <Select value={locale} onChange={handleChange} size="small">
      <MenuItem value="en">{t("en")}</MenuItem>
      <MenuItem value="uk">{t("uk")}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
