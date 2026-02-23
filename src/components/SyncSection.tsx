"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { syncRecords } from "@/lib/sync";
import { useTimerStore } from "@/lib/stores/timerStore";

export function SyncSection() {
  const { user, loading, configured, error, clearError, signInWithGoogle, signUpWithEmail, signInWithEmail, signOut } =
    useAuthStore();
  const loadTodayTotals = useTimerStore((s) => s.loadTodayTotals);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const result = await syncRecords();
      if (result.ok) {
        await loadTodayTotals();
        setSyncMessage(
          `同期完了（アップロード: ${result.pushed ?? 0}件 / ダウンロード: ${result.pulled ?? 0}件）`
        );
        setTimeout(() => setSyncMessage(null), 3000);
      } else {
        setSyncMessage(result.error ?? "同期に失敗しました");
      }
    } finally {
      setSyncing(false);
    }
  };

  if (!configured) {
    return (
      <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-600">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">クラウド同期</h3>
        <p className="text-xs text-zinc-500">
          Firebase設定が完了していません。.env.local を確認してください。
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-600">
      <h3 className="text-sm font-semibold text-zinc-400 mb-2">クラウド同期</h3>
      <p className="text-xs text-zinc-500 mb-3">
        メールアドレスでアカウント作成、または同一アカウントでログインすると、スマートフォンとパソコン間でデータを同期できます。
      </p>
      {user ? (
        <div className="space-y-2">
          <p className="text-sm text-zinc-300 truncate" title={user.email ?? undefined}>
            {user.email}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 rounded-lg bg-[#27AE60] text-white text-sm font-medium disabled:opacity-50"
            >
              {syncing ? "同期中..." : "今すぐ同期"}
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-zinc-500 text-zinc-300 text-sm hover:bg-zinc-700"
            >
              ログアウト
            </button>
          </div>
          {syncMessage && (
            <p className="text-xs text-zinc-400">{syncMessage}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              autoComplete="email"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="パスワード（6文字以上）"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              autoComplete="current-password"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => signUpWithEmail(email, password)}
              disabled={loading || !email.trim() || password.length < 6}
              className="flex-1 py-2 rounded-lg bg-[#27AE60] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#229954]"
            >
              {loading ? "処理中..." : "アカウント作成"}
            </button>
            <button
              type="button"
              onClick={() => signInWithEmail(email, password)}
              disabled={loading || !email.trim() || !password}
              className="flex-1 py-2 rounded-lg border border-zinc-500 text-zinc-300 text-sm hover:bg-zinc-700 disabled:opacity-50"
            >
              ログイン
            </button>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex items-center gap-2 pt-1">
            <span className="flex-1 border-t border-zinc-600" />
            <span className="text-xs text-zinc-500">または</span>
            <span className="flex-1 border-t border-zinc-600" />
          </div>
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            disabled={loading}
            className="w-full py-2 rounded-lg border border-zinc-500 hover:bg-zinc-700 flex items-center justify-center gap-2 text-sm"
          >
            <span>🔐</span>
            Googleでログイン
          </button>
        </div>
      )}
    </div>
  );
}
