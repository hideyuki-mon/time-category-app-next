"use client";

import { create } from "zustand";
import { db } from "../db";
import type { CategoryId } from "../constants/categories";
import { today } from "../utils/time";

const STORAGE_KEY = "tap4_timer_state";

interface TimerState {
  activeCategory: CategoryId | null;
  startTime: number | null;
  elapsed: number;
  date: string;
  todayTotals: Record<CategoryId, number>;
  loadTodayTotals: () => Promise<void>;
  toggleCategory: (catId: CategoryId) => Promise<void>;
  tick: () => void;
  restore: () => Promise<void>;
}

async function saveRecord(
  category: CategoryId,
  date: string,
  startTime: number,
  endTime: number
) {
  await db.records.add({
    category,
    date,
    startTime,
    endTime,
    duration: Math.floor((endTime - startTime) / 1000),
  });
}

export const useTimerStore = create<TimerState>((set, get) => ({
  activeCategory: null,
  startTime: null,
  elapsed: 0,
  date: today(),
  todayTotals: { 0: 0, 1: 0, 2: 0, 3: 0 },

  loadTodayTotals: async () => {
    const dt = today();
    const rows = await db.records.where("date").equals(dt).toArray();
    const totals: Record<CategoryId, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
    for (const r of rows) {
      totals[r.category as CategoryId] =
        (totals[r.category as CategoryId] || 0) + r.duration;
    }
    set({ todayTotals: totals });
  },

  toggleCategory: async (catId: CategoryId) => {
    const { activeCategory, startTime, date } = get();
    const now = Date.now();
    const todayStr = today();

    if (activeCategory !== null && startTime !== null) {
      const end = date !== todayStr ? new Date(date + "T23:59:59.999").getTime() : now;
      await saveRecord(activeCategory, date, startTime, end);
    }

    if (activeCategory === catId) {
      set({ activeCategory: null, startTime: null, elapsed: 0 });
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
      get().loadTodayTotals();
      return;
    }

    set({
      activeCategory: catId,
      startTime: now,
      elapsed: 0,
      date: todayStr,
    });
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeCategory: catId,
          startTime: now,
          date: todayStr,
        })
      );
    }
    get().loadTodayTotals();
  },

  tick: () => {
    const { startTime } = get();
    if (startTime === null) return;
    set({ elapsed: Math.floor((Date.now() - startTime) / 1000) });
  },

  restore: async () => {
    if (typeof localStorage === "undefined") return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      get().loadTodayTotals();
      return;
    }
    let data: { activeCategory: CategoryId; startTime: number; date: string };
    try {
      data = JSON.parse(raw);
    } catch {
      get().loadTodayTotals();
      return;
    }
    const todayStr = today();
    if (data.date !== todayStr) {
      const end = new Date(data.date + "T23:59:59.999").getTime();
      await saveRecord(
        data.activeCategory,
        data.date,
        data.startTime,
        end
      );
      localStorage.removeItem(STORAGE_KEY);
      set({ activeCategory: null, startTime: null, elapsed: 0, date: todayStr });
    } else {
      set({
        activeCategory: data.activeCategory,
        startTime: data.startTime,
        elapsed: Math.floor((Date.now() - data.startTime) / 1000),
        date: data.date,
      });
    }
    get().loadTodayTotals();
  },
}));
