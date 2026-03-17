"use client";

import Link from "next/link";
import { SyncSection } from "./SyncSection";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useLocaleStore } from "@/lib/stores/localeStore";
export function SettingsScreen() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl mb-2 bg-zinc-700 flex items-center justify-center text-2xl">
          📱
        </div>
        <h2 className="text-xl font-bold">Tap4</h2>
        <p className="text-sm text-zinc-400">{t("version")}</p>
        <p className="text-xs text-zinc-500 mt-2 text-center max-w-xs">
          {t("appDescription")}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <Link
            href="/privacy"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            {t("privacyPolicy")}
          </Link>
          <Link
            href="/terms"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            {t("terms")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            {t("contact")}
          </Link>
        </div>
      </div>

      {/* 言語選択 */}
      <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-600">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">
          {locale === "ja" ? "言語 / Language" : "Language / 言語"}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLocale("ja")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              locale === "ja"
                ? "bg-[#27AE60] text-white"
                : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
            }`}
          >
            日本語
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium ${
              locale === "en"
                ? "bg-[#27AE60] text-white"
                : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
            }`}
          >
            English
          </button>
        </div>
      </div>

      <SyncSection />
    </div>
  );
}
