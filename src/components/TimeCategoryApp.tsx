"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useUIStore } from "@/lib/stores/uiStore";
import { useTimerStore } from "@/lib/stores/timerStore";
import { useAuthStore } from "@/lib/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { TabBar } from "./TabBar";
import { MeasurementScreen } from "./MeasurementScreen";
import { TodaySummaryScreen } from "./TodaySummaryScreen";
import { StatisticsScreen } from "./StatisticsScreen";
import { SettingsScreen } from "./SettingsScreen";

export function TimeCategoryApp() {
  const { t } = useTranslation();
  const currentTab = useUIStore((s) => s.currentTab);
  const user = useAuthStore((s) => s.user);
  const { restore, loadTodayTotals } = useTimerStore();

  useEffect(() => {
    restore();
    loadTodayTotals();
  }, [restore, loadTodayTotals]);

  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      <header
        className="bg-[#24242e] border-b border-[#3a3a46] py-3 px-4"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <h1 className="text-lg font-bold text-center text-white md:text-xl">Tap4</h1>
      </header>
      {!user && (
        <div className="bg-amber-900/40 border-b border-amber-700/50 px-4 py-2 text-center">
          <span className="text-amber-200 text-sm">{t("trialMode")}</span>
          <span className="text-amber-200/80 text-sm">
            {" — "}
            {t("trialBanner")}
            <Link href="/signup" className="text-amber-300 underline font-medium mx-1">
              {t("accountRegistration")}
            </Link>
            {t("trialBannerSuffix")}
          </span>
        </div>
      )}
      <main style={{ backgroundColor: "#1a1a22" }}>
        {currentTab === "measurement" && <MeasurementScreen />}
        {currentTab === "today" && <TodaySummaryScreen />}
        {currentTab === "statistics" && <StatisticsScreen />}
        {currentTab === "settings" && <SettingsScreen />}
      </main>
      <TabBar />
    </div>
  );
}
