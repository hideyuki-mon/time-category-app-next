"use client";

import { useUIStore } from "@/lib/stores/uiStore";

const TABS = [
  { id: "measurement" as const, label: "計測", icon: "⏱️" },
  { id: "today" as const, label: "今日", icon: "📊" },
  { id: "statistics" as const, label: "統計", icon: "📈" },
  { id: "settings" as const, label: "設定", icon: "⚙️" },
];

export function TabBar() {
  const { currentTab, setTab } = useUIStore();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-[#24242e] border-t border-[#3a3a46] flex justify-around py-2 safe-bottom"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setTab(tab.id)}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all min-w-[64px] ${
            currentTab === tab.id
              ? "opacity-100 text-white"
              : "opacity-50 hover:opacity-70 text-[#a0a0b0]"
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          <span className="text-xs font-medium">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
