"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/authStore";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useLocaleStore } from "@/lib/stores/localeStore";

export default function LandingPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale, setLocale } = useLocaleStore();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/app");
    }
  }, [user, loading, router]);

  if (user) {
    return (
      <div className="min-h-screen bg-[#1a1a22] flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">{t("redirecting")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      <section className="pt-16 pb-12 px-4 text-center md:pt-24 md:pb-16 animate-fade-in">
        <h1 className="text-2xl font-bold text-white mb-4 md:text-3xl">
          {t("heroTitle")}
        </h1>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto md:text-lg">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/app"
            className="inline-flex justify-center py-3 px-6 rounded-lg border-2 border-[#27AE60] text-[#27AE60] font-medium hover:bg-[#27AE60]/10 transition-colors"
          >
            {t("tryIt")}
          </Link>
          <Link
            href="/signup"
            className="inline-flex justify-center py-3 px-6 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] transition-colors"
          >
            {t("signupWithSave")}
          </Link>
          <Link
            href="/login"
            className="inline-flex justify-center py-3 px-6 rounded-lg border border-zinc-500 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
          >
            {t("loginLink")}
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 md:py-16">
        <h2 className="text-xl font-bold text-white text-center mb-8 md:text-2xl">
          {t("featuresTitle")}
        </h2>
        <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-3">
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-200">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-bold text-white mb-2">{t("feature1Title")}</h3>
            <p className="text-sm text-zinc-400">{t("feature1Desc")}</p>
          </div>
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-300">
            <div className="text-3xl mb-3">🗂️</div>
            <h3 className="font-bold text-white mb-2">{t("feature2Title")}</h3>
            <p className="text-sm text-zinc-400">{t("feature2Desc")}</p>
          </div>
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-400">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-white mb-2">{t("feature3Title")}</h3>
            <p className="text-sm text-zinc-400">{t("feature3Desc")}</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:py-16 bg-[#24242e]/50">
        <h2 className="text-xl font-bold text-white text-center mb-4 md:text-2xl">
          {t("videoTitle")}
        </h2>
        <p className="text-zinc-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-6">
          {t("videoDesc")}
        </p>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl overflow-hidden border border-[#3a3a46] bg-[#1a1a22] p-2 md:p-4">
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/d_CP5kGAW9s"
                title="Tap4 参考動画"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:py-16 bg-[#24242e]/50">
        <h2 className="text-xl font-bold text-white text-center mb-8 md:text-2xl">
          {t("howToTitle")}
        </h2>
        <div className="grid gap-8 max-w-3xl mx-auto md:grid-cols-3">
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              1
            </div>
            <h3 className="font-bold text-white mb-2">STEP 1</h3>
            <p className="text-sm text-zinc-400">{t("step1")}</p>
          </div>
          <div className="text-center animate-fade-in md:animation-delay-100">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              2
            </div>
            <h3 className="font-bold text-white mb-2">STEP 2</h3>
            <p className="text-sm text-zinc-400">{t("step2")}</p>
          </div>
          <div className="text-center animate-fade-in md:animation-delay-200">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              3
            </div>
            <h3 className="font-bold text-white mb-2">STEP 3</h3>
            <p className="text-sm text-zinc-400">{t("step3")}</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:py-16 text-center animate-fade-in">
        <p className="text-lg text-zinc-300 mb-4">{t("ctaTry")}</p>
        <p className="text-sm text-zinc-500 mb-6">{t("ctaNote")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/app"
            className="inline-flex justify-center py-3 px-8 rounded-lg border-2 border-[#27AE60] text-[#27AE60] font-medium hover:bg-[#27AE60]/10 transition-colors"
          >
            {t("tryIt")}
          </Link>
          <Link
            href="/signup"
            className="inline-flex justify-center py-3 px-8 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] transition-colors"
          >
            {t("ctaSignup")}
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-[#3a3a46]">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-zinc-500 max-w-2xl mx-auto">
          <Link href="/privacy" className="hover:text-[#27AE60] transition-colors">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms" className="hover:text-[#27AE60] transition-colors">
            {t("terms")}
          </Link>
          <Link href="/contact" className="hover:text-[#27AE60] transition-colors">
            {t("contact")}
          </Link>
          <span className="flex gap-2">
            <button
              type="button"
              onClick={() => setLocale("ja")}
              className={`hover:text-[#27AE60] transition-colors ${locale === "ja" ? "text-[#27AE60] font-medium" : ""}`}
            >
              日本語
            </button>
            <span className="text-zinc-600">|</span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`hover:text-[#27AE60] transition-colors ${locale === "en" ? "text-[#27AE60] font-medium" : ""}`}
            >
              English
            </button>
          </span>
        </div>
        <p className="text-center text-zinc-600 text-xs mt-4">© 2026 Tap4</p>
      </footer>
    </div>
  );
}
