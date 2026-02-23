"use client";

import { useEffect } from "react";
import { CATEGORIES, type CategoryId } from "@/lib/constants/categories";
import { useTimerStore } from "@/lib/stores/timerStore";
import { formatTime, formatDate } from "@/lib/utils/time";
import { today } from "@/lib/utils/time";

export function MeasurementScreen() {
  const {
    activeCategory,
    elapsed,
    todayTotals,
    toggleCategory,
    tick,
    loadTodayTotals,
  } = useTimerStore();
  const dt = today();

  useEffect(() => {
    const id = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    const id = setInterval(() => loadTodayTotals(), 5000);
    return () => clearInterval(id);
  }, [loadTodayTotals]);

  const totalToday = [0, 1, 2, 3].reduce((s, c) => s + (todayTotals[c as CategoryId] ?? 0), 0);
  const displayTime = activeCategory !== null ? elapsed : totalToday;
  const statusText = activeCategory !== null ? "計測中..." : "待機中";
  const statusCat = activeCategory !== null ? CATEGORIES[activeCategory]?.name : "";

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-4 pb-24 w-full max-w-lg mx-auto md:max-w-2xl md:px-8 md:py-10">
      {/* 上段: 日付・タイマー・ステータス（中央揃え） */}
      <div className="mb-6 md:mb-8 text-center">
        <div className="text-sm text-white mb-2 md:text-base">
          📅 {formatDate(dt)}
        </div>
        <div
          className="text-4xl font-bold mb-2 tabular-nums text-white md:text-5xl"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatTime(displayTime)}
        </div>
        <div className="text-sm text-white/90 md:text-base">
          {statusCat ? `${statusCat} ` : ""}{statusText}
        </div>
      </div>
      {/* 2x2 グリッド（中央配置） */}
      <div className="grid grid-cols-2 gap-3 flex-1 md:gap-6 md:max-w-xl md:mx-auto md:place-items-stretch">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const total = todayTotals[cat.id] ?? 0;
          const hasActive = activeCategory !== null;
          const isDisabled = hasActive && !isActive;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl min-h-[120px] md:min-h-[160px]
                transition-all duration-200 bg-[#2a2a36]
                ${isActive ? "scale-[1.02] shadow-lg" : ""}
                ${isDisabled ? "opacity-50" : "opacity-100"}
              `}
              style={{
                boxShadow: `0 0 0 2px ${cat.color}`,
              }}
            >
              {isActive && (
                <span className="absolute top-2 right-2 text-xs font-bold text-red-500 animate-pulse">
                  ● REC
                </span>
              )}
              <span className="font-medium mb-1 text-sm text-white md:text-base">
                {cat.name}
              </span>
              <span
                className="text-2xl font-bold tabular-nums text-white md:text-3xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatTime(total + (isActive ? elapsed : 0))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
