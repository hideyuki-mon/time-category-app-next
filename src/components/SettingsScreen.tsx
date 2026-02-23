"use client";

import { CATEGORIES } from "@/lib/constants/categories";
import { db } from "@/lib/db";
import { SyncSection } from "./SyncSection";
import { formatTime } from "@/lib/utils/time";

export function SettingsScreen() {
  const handleExportCSV = async () => {
    const records = await db.records.orderBy("startTime").toArray();
    const header = "id,category,date,startTime,endTime,duration\n";
    const BOM = "\uFEFF";
    const rows = records.map(
      (r) => `${r.id},${r.category},${r.date},${r.startTime},${r.endTime},${r.duration}`
    );
    const csv = BOM + header + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tap4_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAll = async () => {
    if (!confirm("すべてのデータを削除します。よろしいですか？")) return;
    await db.records.clear();
    await db.dailyMemos.clear();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("tap4_timer_state");
    }
    window.location.reload();
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl mb-2 bg-zinc-700 flex items-center justify-center text-2xl">
          📱
        </div>
        <h2 className="text-xl font-bold">Tap4</h2>
        <p className="text-sm text-zinc-400">Version 1.0.0</p>
        <p className="text-xs text-zinc-500 mt-2 text-center max-w-xs">
          1日の時間を4カテゴリで記録・可視化するPWAアプリ
        </p>
      </div>
      <SyncSection />
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">カテゴリ</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: cat.color }}
              />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleExportCSV}
          className="w-full py-3 rounded-lg border border-zinc-600 hover:bg-zinc-800 transition-colors"
        >
          CSVエクスポート
        </button>
        <button
          type="button"
          onClick={handleDeleteAll}
          className="w-full py-3 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors"
        >
          データ全削除
        </button>
      </div>
    </div>
  );
}
