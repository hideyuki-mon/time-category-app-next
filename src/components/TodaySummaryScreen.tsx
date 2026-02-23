"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CATEGORIES, type CategoryId } from "@/lib/constants/categories";
import { useTimerStore } from "@/lib/stores/timerStore";
import { db } from "@/lib/db";
import { formatTime, formatDate } from "@/lib/utils/time";
import { today } from "@/lib/utils/time";

export function TodaySummaryScreen() {
  const { todayTotals, loadTodayTotals } = useTimerStore();
  const [memo, setMemo] = useState("");

  const dt = today();

  useEffect(() => {
    loadTodayTotals();
  }, [loadTodayTotals]);

  useEffect(() => {
    db.dailyMemos.get(dt).then((row) => {
      setMemo(row?.memo ?? "");
    });
  }, [dt]);

  useEffect(() => {
    const id = setInterval(() => loadTodayTotals(), 3000);
    return () => clearInterval(id);
  }, [loadTodayTotals]);

  const total = [0, 1, 2, 3].reduce((s, c) => s + (todayTotals[c as CategoryId] ?? 0), 0);
  const chartData = CATEGORIES.map((cat) => ({
    name: cat.name,
    value: todayTotals[cat.id] ?? 0,
    color: cat.color,
  })).filter((d) => d.value > 0);

  const handleMemoBlur = () => {
    db.dailyMemos.put({ date: dt, memo });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-4 pb-24 max-w-lg mx-auto">
      {/* 1. 日付（中央） */}
      <div className="text-sm text-zinc-400 mb-6 text-center">
        📅 {formatDate(dt)}
      </div>

      {/* 2. ドーナツグラフ（中央、文字なし） */}
      <div className="flex justify-center">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart margin={{ top: 0, right: 16, bottom: 0, left: 16 }}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatTime(typeof v === "number" ? v : 0)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-zinc-500 text-sm">
            <span className="mb-2">データがありません</span>
          </div>
        )}
      </div>

      {/* 3. 凡例（グラフ直下・中央）：色つき丸 + カテゴリ名 */}
      {chartData.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 mb-2">
          {chartData.map((entry, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{entry.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* 4. 合計時間（中央） */}
      <div className="text-center mb-6">
        <span className="text-sm text-zinc-400 mr-2">合計</span>
        <span
          className="text-2xl font-bold tabular-nums text-white"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatTime(total)}
        </span>
      </div>

      {/* 5. 区切り線 */}
      <hr className="border-zinc-600 mb-4" />

      {/* 6. カテゴリ内訳：左に色+名前、右に時間(割合%) */}
      <div className="space-y-3 mb-6">
        {CATEGORIES.map((cat) => {
          const v = todayTotals[cat.id] ?? 0;
          const pct = total > 0 ? Math.round((v / total) * 100) : 0;
          return (
            <div
              key={cat.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span>{cat.name}</span>
              </div>
              <span
                className="tabular-nums text-zinc-300"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatTime(v)} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* 7. 今日のひとこと（吹き出しアイコン + ラベル） */}
      <div>
        <label className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
          <span>💬</span>
          今日のひとこと
        </label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={handleMemoBlur}
          placeholder="振り返りメモを入力..."
          className="w-full p-3 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-zinc-500"
        />
      </div>
    </div>
  );
}
