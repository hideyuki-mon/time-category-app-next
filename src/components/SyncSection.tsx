"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { syncRecords } from "@/lib/sync";
import { useTimerStore } from "@/lib/stores/timerStore";

export function SyncSection() {
  const { t } = useTranslation();
  const { user, loading, configured, error, successMessage, clearError, signUpWithEmail, signInWithEmail, sendPasswordReset, signOut } =
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
          t("syncComplete", {
            pushed: String(result.pushed ?? 0),
            pulled: String(result.pulled ?? 0),
          })
        );
        setTimeout(() => setSyncMessage(null), 3000);
      } else {
        setSyncMessage(result.error ?? t("syncFailed"));
      }
    } finally {
      setSyncing(false);
    }
  };

  if (!configured) {
    return (
      <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-600">
        <h3 className="text-sm font-semibold text-zinc-400 mb-2">{t("cloudSync")}</h3>
        <p className="text-xs text-zinc-500">{t("firebaseNotConfigured")}</p>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 rounded-lg bg-zinc-800/50 border border-zinc-600">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-zinc-400">
          {t("cloudSync")}
          {user ? (
            <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#27AE60]/30 text-[#27AE60] text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" aria-hidden />
              {t("loggedIn")}
            </span>
          ) : (
            <span className="ml-2 text-xs text-zinc-500 font-normal">{t("notLoggedIn")}</span>
          )}
        </h3>
      </div>
      <p className="text-xs text-zinc-500 mb-3">{t("trialSyncNote")}</p>
      <p className="text-xs text-zinc-500 mb-3">{t("syncHowTo")}</p>
      {user ? (
        <div className="space-y-2">
          <p className="text-sm text-zinc-300 truncate" title={user.email ?? undefined}>
            {user.email}
          </p>
          <p className="text-xs text-zinc-400">{t("syncPullNote")}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="px-4 py-2 rounded-lg bg-[#27AE60] text-white text-sm font-medium disabled:opacity-50"
            >
              {syncing ? t("syncing") : t("syncNow")}
            </button>
            <button
              type="button"
              onClick={() => signOut()}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-zinc-500 text-zinc-300 text-sm hover:bg-zinc-700"
            >
              {t("logout")}
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
              placeholder={t("emailPlaceholder")}
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
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => sendPasswordReset(email.trim())}
              disabled={loading || !email.trim()}
              className="mt-1 text-xs text-zinc-400 hover:text-zinc-300 underline disabled:opacity-50"
            >
              {t("forgotPassword")}
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => signUpWithEmail(email, password)}
              disabled={loading || !email.trim() || password.length < 6}
              className="flex-1 py-2 rounded-lg bg-[#27AE60] text-white text-sm font-medium disabled:opacity-50 hover:bg-[#229954]"
            >
              {loading ? t("processing") : t("createAccount")}
            </button>
            <button
              type="button"
              onClick={() => signInWithEmail(email, password)}
              disabled={loading || !email.trim() || !password}
              className="flex-1 py-2 rounded-lg border border-zinc-500 text-zinc-300 text-sm hover:bg-zinc-700 disabled:opacity-50"
            >
              {t("login")}
            </button>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          {successMessage && <p className="text-xs text-green-400">{successMessage}</p>}
        </div>
      )}
    </div>
  );
}
