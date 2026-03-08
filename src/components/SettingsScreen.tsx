"use client";

import Link from "next/link";
import { SyncSection } from "./SyncSection";

export function SettingsScreen() {
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
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <Link
            href="/privacy"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/terms"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            利用規約
          </Link>
          <Link
            href="/contact"
            className="text-sm text-zinc-400 hover:text-[#27AE60] underline"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
      <SyncSection />
    </div>
  );
}
