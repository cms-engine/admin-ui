"use client";

import { Check as CheckIcon, Language as LanguageIcon } from "@mui/icons-material";
import { Select, MenuItem, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { useState, useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, items, label }: Props) {
  const [isPending, startTransition] = useTransition();
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  function onChange(event: SelectChangeEvent) {
    const locale = event.target.value as Locale;
    setSelectedValue(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="locale-switcher-label">{label}</InputLabel>
      <Select
        labelId="locale-switcher-label"
        value={selectedValue}
        onChange={onChange}
        disabled={isPending}
        startAdornment={isPending ? <CircularProgress size={20} /> : <LanguageIcon />}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.value === defaultValue && <CheckIcon fontSize="small" />}
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
