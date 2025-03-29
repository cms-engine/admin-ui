"use client";

import { useLocale, useTranslations } from "next-intl";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations("language");

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value;
    console.log(`Selected local: ${  newLocale}`);
  };

  return (
    <Select value={locale} onChange={handleChange} size="small">
      <MenuItem value="en">{t("en")}</MenuItem>
      <MenuItem value="uk">{t("uk")}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
