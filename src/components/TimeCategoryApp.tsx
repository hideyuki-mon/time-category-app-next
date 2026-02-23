"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/stores/uiStore";
import { useTimerStore } from "@/lib/stores/timerStore";
import { AuthInit } from "./AuthInit";
import { TabBar } from "./TabBar";
import { MeasurementScreen } from "./MeasurementScreen";
import { TodaySummaryScreen } from "./TodaySummaryScreen";
import { StatisticsScreen } from "./StatisticsScreen";
import { SettingsScreen } from "./SettingsScreen";

export function TimeCategoryApp() {
  const currentTab = useUIStore((s) => s.currentTab);
  const { restore, loadTodayTotals } = useTimerStore();

  useEffect(() => {
    restore();
    loadTodayTotals();
  }, [restore, loadTodayTotals]);

  return (
    <AuthInit>
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      <header className="bg-[#24242e] border-b border-[#3a3a46] py-3 px-4">
        <h1 className="text-lg font-bold text-center">Tap4</h1>
      </header>
      <main>
        {currentTab === "measurement" && <MeasurementScreen />}
        {currentTab === "today" && <TodaySummaryScreen />}
        {currentTab === "statistics" && <StatisticsScreen />}
        {currentTab === "settings" && <SettingsScreen />}
      </main>
      <TabBar />
    </div>
    </AuthInit>
  );
}
