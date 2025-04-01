"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("language");

  const handleChange = (event: SelectChangeEvent) => {
    const newLocale = event.target.value;
    router.push(`/${newLocale}${pathname.substring(3)}`); // Adjust for locale-prefixed paths
  };

  return (
    <Select value={locale} onChange={handleChange} size="small">
      <MenuItem value="en">{t("en")}</MenuItem>
      <MenuItem value="uk">{t("uk")}</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;
