"use client";

import { create } from "zustand";

type TabId = "measurement" | "today" | "statistics" | "settings";

interface UIState {
  currentTab: TabId;
  setTab: (tab: TabId) => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentTab: "measurement",
  setTab: (tab) => set({ currentTab: tab }),
}));
