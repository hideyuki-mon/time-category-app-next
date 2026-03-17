"use client";

import { useLocaleStore } from "@/lib/stores/localeStore";
import { translations, type TranslationKey } from "./translations";

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let str: string = translations[locale][key] ?? translations.ja[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`{{${k}}}`, "g"), String(v));
      }
    }
    return str;
  };
  const categoryName = (id: 0 | 1 | 2 | 3) =>
    t(("category" + id) as TranslationKey);
  return { t, locale, categoryName };
}
