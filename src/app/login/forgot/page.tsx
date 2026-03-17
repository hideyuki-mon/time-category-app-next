"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { sendPasswordReset, loading, error, successMessage, clearError } = useAuthStore();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await sendPasswordReset(email.trim());
  };

  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/login" className="text-[#27AE60] text-sm hover:underline mb-4 inline-block">
          {t("backToLogin")}
        </Link>
        <h1 className="text-xl font-bold text-white mb-2">{t("resetPasswordTitle")}</h1>
        <p className="text-zinc-400 text-sm mb-4">{t("resetPasswordDesc")}</p>
        {successMessage ? (
          <div className="bg-[#27AE60]/20 border border-[#27AE60]/50 rounded-lg p-4">
            <p className="text-[#27AE60] text-sm">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              placeholder={t("emailPlaceholder")}
              className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full py-3 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] disabled:opacity-50"
            >
              {loading ? t("sending") : t("sendResetEmail")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
