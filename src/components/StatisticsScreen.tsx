"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { CATEGORIES, type CategoryId } from "@/lib/constants/categories";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { db } from "@/lib/db";
import { formatHM, daysAgo, shortDate, toHours } from "@/lib/utils/time";

type Period = "day" | "week" | "month";

interface ChartItem {
  label: string;
  [key: string]: string | number;
}

export function StatisticsScreen() {
  const { t, categoryName } = useTranslation();
  const [period, setPeriod] = useState<Period>("day");
  const [data, setData] = useState<ChartItem[]>([]);
  const [averages, setAverages] = useState<Record<CategoryId, number>>({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  });

  useEffect(() => {
    async function load() {
      const records = await db.records.toArray();
      const items: ChartItem[] = [];
      const sums: Record<string, Record<CategoryId, number>> = {};

      if (period === "day") {
        for (let i = 6; i >= 0; i--) {
          const d = daysAgo(i);
          items.push({ label: shortDate(d), ...{ 0: 0, 1: 0, 2: 0, 3: 0 } });
          sums[d] = { 0: 0, 1: 0, 2: 0, 3: 0 };
        }
        for (const r of records) {
          const idx = items.findIndex((x) => x.label === shortDate(r.date));
          if (idx >= 0 && r.category in items[idx]) {
            (items[idx] as Record<number, number>)[r.category] =
              ((items[idx] as Record<number, number>)[r.category] || 0) + r.duration;
          }
        }
      } else if (period === "week") {
        for (let i = 3; i >= 0; i--) {
          const start = daysAgo(i * 7);
          const end = daysAgo(i * 7 - 6);
          items.push({
            label: `${shortDate(start)}~`,
            ...{ 0: 0, 1: 0, 2: 0, 3: 0 },
          });
          for (let j = 0; j < 7; j++) {
            const d = daysAgo(i * 7 - j);
            if (!sums[d]) sums[d] = { 0: 0, 1: 0, 2: 0, 3: 0 };
          }
        }
        const weekStarts = items.map((_, i) => shortDate(daysAgo((3 - i) * 7)));
        for (const r of records) {
          const sd = shortDate(r.date);
          const wi = weekStarts.findIndex((ws) => {
            const [m, d] = sd.split("/").map(Number);
            const [wm] = ws.split("/").map(Number);
            return m === wm || Math.abs(m - wm) === 1;
          });
          if (wi >= 0) {
            (items[wi] as Record<number, number>)[r.category] =
              ((items[wi] as Record<number, number>)[r.category] || 0) + r.duration;
          }
        }
      } else {
        for (let i = 5; i >= 0; i--) {
          const d = daysAgo(i * 30);
          const [y, m] = d.split("-");
          items.push({
            label: `${Number(m)}月`,
            ...{ 0: 0, 1: 0, 2: 0, 3: 0 },
          });
        }
        const monthKeys = items.map((_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - (5 - i));
          return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`;
        });
        for (const r of records) {
          const [y, m] = r.date.split("-");
          const mk = `${y}-${m}`;
          const wi = monthKeys.indexOf(mk);
          if (wi >= 0) {
            (items[wi] as Record<number, number>)[r.category] =
              ((items[wi] as Record<number, number>)[r.category] || 0) + r.duration;
          }
        }
      }

      // 1日24hを超えないよう正規化（重複記録などで超過した場合）
      const maxSeconds =
        period === "day"
          ? 24 * 3600
          : period === "week"
            ? 7 * 24 * 3600
            : 31 * 24 * 3600;
      for (const item of items) {
        const total = [0, 1, 2, 3].reduce((s, c) => s + ((item[c] as number) || 0), 0);
        if (total > maxSeconds && total > 0) {
          const scale = maxSeconds / total;
          for (let c = 0; c < 4; c++) {
            (item as Record<number, number>)[c] = Math.round(
              ((item[c] as number) || 0) * scale
            );
          }
        }
      }

      const avgs: Record<CategoryId, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
      const n = items.length;
      for (const item of items) {
        for (let c = 0; c < 4; c++) {
          avgs[c as CategoryId] += (item[c] as number) || 0;
        }
      }
      for (let c = 0; c < 4; c++) {
        avgs[c as CategoryId] = n > 0 ? Math.round(avgs[c as CategoryId] / n) : 0;
      }
      setData(items);
      setAverages(avgs);
    }
    load();
  }, [period]);

  const totalAvg = [0, 1, 2, 3].reduce((s, c) => s + averages[c as CategoryId], 0);

  const yAxisDomain =
    period === "day"
      ? [0, 24 * 3600]
      : period === "week"
        ? [0, 7 * 24 * 3600]
        : [0, 31 * 24 * 3600];

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] p-4 pb-24 max-w-lg mx-auto">
      <div className="flex gap-2 mb-4">
        {(["day", "week", "month"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-full text-sm ${
              period === p
                ? "bg-zinc-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {p === "day" ? t("day") : p === "week" ? t("week") : t("month")}
          </button>
        ))}
      </div>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3a46" />
            <XAxis dataKey="label" stroke="#8888a0" fontSize={12} />
            <YAxis
              stroke="#8888a0"
              fontSize={12}
              domain={yAxisDomain}
              tickFormatter={(v) => {
                if (typeof v !== "number" || v < 0) return "0h";
                const h = toHours(v);
                return h >= 1 ? `${h.toFixed(1)}h` : `${Math.round(v / 60)}m`;
              }}
            />
            <Tooltip formatter={(v) => formatHM(typeof v === 'number' ? v : 0)} />
            <Legend />
            {CATEGORIES.map((cat, i) => (
              <Bar key={cat.id} dataKey={cat.id} stackId="a" name={categoryName(cat.id)} fill={cat.color}>
                {data.map((_, idx) => (
                  <Cell key={idx} fill={cat.color} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-zinc-400">{t("periodAverage")}</div>
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between text-sm">
            <span
              className="w-3 h-3 rounded-full inline-block mr-2"
              style={{ backgroundColor: cat.color }}
            />
            {categoryName(cat.id)}: {formatHM(averages[cat.id])}
          </div>
        ))}
        <div className="pt-2 font-semibold">
          {t("totalAverage")} {formatHM(totalAvg)}
        </div>
      </div>
    </div>
  );
}
