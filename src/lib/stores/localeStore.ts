"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n/translations";

const STORAGE_KEY = "tap4_locale";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "ja",
      setLocale: (locale) => set({ locale }),
    }),
    { name: STORAGE_KEY }
  )
);
