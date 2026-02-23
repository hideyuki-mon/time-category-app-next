"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
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
    <div className="flex flex-col min-h-[calc(100vh-120px)] p-4 pb-24">
      <div className="text-sm text-zinc-400 mb-4">📅 {formatDate(dt)}</div>
      <div className="flex-1 min-h-[200px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatTime(typeof v === 'number' ? v : 0)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
            データがありません
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-center my-4 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
        合計 {formatTime(total)}
      </div>
      <div className="space-y-2">
        {CATEGORIES.map((cat) => {
          const v = todayTotals[cat.id] ?? 0;
          const pct = total > 0 ? Math.round((v / total) * 100) : 0;
          return (
            <div key={cat.id} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              <span className="flex-1">{cat.name}</span>
              <span className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                {formatTime(v)} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-6">
        <label className="block text-sm text-zinc-400 mb-1">今日のひとこと</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={handleMemoBlur}
          placeholder="メモを入力..."
          className="w-full p-3 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 min-h-[80px]"
        />
      </div>
    </div>
  );
}
