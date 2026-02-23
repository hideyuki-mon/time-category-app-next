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
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-4 pb-24 max-w-lg mx-auto bg-[#1a1a22] text-[#e8e8f0]">
      {/* 1. アプリタイトル（中央） */}
      <h2 className="text-lg font-bold text-center pt-6 pb-2 text-white">
        時間カテゴリ管理アプリ
      </h2>

      {/* 2. 日付（カレンダーアイコン + 日付、中央） */}
      <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 mb-6">
        <span>📅</span>
        <span>{formatDate(dt)}</span>
      </div>

      {/* 3. ドーナツグラフ（中央、内側に文字なし） */}
      <div className="flex justify-center px-4">
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

      {/* 4. 凡例（グラフ直下・中央）：色丸 + カテゴリ名 */}
      {chartData.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 mb-2">
          {chartData.map((entry, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-zinc-100">{entry.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* 5. 合計時間（中央） 「合計 0:02」形式 */}
      <div className="text-center mb-4">
        <span className="text-sm text-zinc-400">
          合計 <span className="font-semibold text-white tabular-nums">{formatTime(total)}</span>
        </span>
      </div>

      {/* 6. 区切り線 */}
      <hr className="border-zinc-600 mx-4 mb-4" />

      {/* 7. カテゴリ内訳（左：色+名前、右：時間(割合%)） */}
      <div className="space-y-3 px-4 mb-6">
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
                <span className="text-zinc-100">{cat.name}</span>
              </div>
              <span className="tabular-nums text-zinc-300" style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatTime(v)} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* 8. 今日のひとこと（吹き出しアイコン + ラベル、左揃え） */}
      <div className="px-4 pb-24">
        <label className="flex items-center gap-2 text-sm text-zinc-100 mb-2">
          <span>💬</span>
          今日のひとこと
        </label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={handleMemoBlur}
          placeholder="振り返りメモを入力..."
          className="w-full p-3 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
}
