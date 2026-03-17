"use client";

import Link from "next/link";
import { SignupForm } from "@/components/AuthForm";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function SignupPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0] flex flex-col">
      <header className="p-4 border-b border-[#3a3a46] flex justify-between items-center">
        <Link href="/landing" className="text-[#27AE60] text-sm hover:underline">
          {t("backToTop")}
        </Link>
        <Link href="/app" className="text-zinc-400 text-sm hover:text-zinc-300">
          {t("tryWithoutAccount")}
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-bold text-white text-center mb-6">{t("signupTitle")}</h1>
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
