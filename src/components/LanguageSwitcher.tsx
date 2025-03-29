"use client";

import { useLocale, useTranslations } from "next-intl";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
  const defaultLocale = useLocale(); // Get the current locale
  const t = useTranslations("language");

  // State to store selected locale
  const [locale, setLocale] = useState(defaultLocale);

  // Load language from local storage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("user-locale");
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value;
    setLocale(newLocale);
    localStorage.setItem("user-locale", newLocale);
    window.location.reload();
  };

  return (
    <Select value={locale} onChange={handleChange} size="small">
      <MenuItem value="en">{t("en")}</MenuItem>
      <MenuItem value="uk">{t("uk")}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
