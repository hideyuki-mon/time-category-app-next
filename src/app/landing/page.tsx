"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/authStore";

export default function LandingPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/app");
    }
  }, [user, loading, router]);

  // ログイン中はリダイレクト（読み込み中はランディングを表示して待つ）
  if (user) {
    return (
      <div className="min-h-screen bg-[#1a1a22] flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">リダイレクト中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      {/* セクション① ヒーロー */}
      <section className="pt-16 pb-12 px-4 text-center md:pt-24 md:pb-16 animate-fade-in">
        <h1 className="text-2xl font-bold text-white mb-4 md:text-3xl">
          あなたの時間、ちゃんと使えていますか？
        </h1>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto md:text-lg">
          Tap4は、1日の時間の使い方を4つに分けて記録・可視化するアプリです。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="inline-flex justify-center py-3 px-6 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] transition-colors"
          >
            無料で始める
          </Link>
          <Link
            href="/login"
            className="inline-flex justify-center py-3 px-6 rounded-lg border border-zinc-500 text-zinc-300 font-medium hover:bg-zinc-800 transition-colors"
          >
            ログインはこちら
          </Link>
        </div>
      </section>

      {/* セクション② 3つの特徴 */}
      <section className="py-12 px-4 md:py-16">
        <h2 className="text-xl font-bold text-white text-center mb-8 md:text-2xl">
          3つの特徴
        </h2>
        <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-3">
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-200">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-bold text-white mb-2">ワンタップで記録</h3>
            <p className="text-sm text-zinc-400">
              ボタンを押すだけで時間の計測スタート。面倒な入力は不要です。
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-300">
            <div className="text-3xl mb-3">🗂️</div>
            <h3 className="font-bold text-white mb-2">4つのカテゴリで整理</h3>
            <p className="text-sm text-zinc-400">
              ただの消費・生産につながる消費・生産・思考停止ルーティーンの4カテゴリで、時間の質を分類します。
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#24242e] border border-[#3a3a46] animate-fade-in md:animation-delay-400">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-white mb-2">統計・グラフで振り返る</h3>
            <p className="text-sm text-zinc-400">
              日・週・月単位で時間の使い方をグラフで確認。自分のパターンに気づくことができます。
            </p>
          </div>
        </div>
      </section>

      {/* セクション②-2 参考動画 */}
      <section className="py-12 px-4 md:py-16 bg-[#24242e]/50">
        <h2 className="text-xl font-bold text-white text-center mb-4 md:text-2xl">
          🎬 Tap4が生まれたきっかけ
        </h2>
        <p className="text-zinc-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-6">
          Tap4は、こちらのYouTube動画からインスピレーションを受けて開発しました。
          時間の使い方や自己管理に興味がある方は、ぜひご覧ください。
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

      {/* セクション③ 使い方 */}
      <section className="py-12 px-4 md:py-16 bg-[#24242e]/50">
        <h2 className="text-xl font-bold text-white text-center mb-8 md:text-2xl">
          使い方
        </h2>
        <div className="grid gap-8 max-w-3xl mx-auto md:grid-cols-3">
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              1
            </div>
            <h3 className="font-bold text-white mb-2">STEP 1</h3>
            <p className="text-sm text-zinc-400">アカウント登録（無料）</p>
          </div>
          <div className="text-center animate-fade-in md:animation-delay-100">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              2
            </div>
            <h3 className="font-bold text-white mb-2">STEP 2</h3>
            <p className="text-sm text-zinc-400">カテゴリを選んでタップするだけ</p>
          </div>
          <div className="text-center animate-fade-in md:animation-delay-200">
            <div className="w-12 h-12 rounded-full bg-[#27AE60]/30 text-[#27AE60] font-bold flex items-center justify-center mx-auto mb-3 text-lg">
              3
            </div>
            <h3 className="font-bold text-white mb-2">STEP 3</h3>
            <p className="text-sm text-zinc-400">統計ページで振り返る</p>
          </div>
        </div>
      </section>

      {/* セクション④ CTA */}
      <section className="py-12 px-4 md:py-16 text-center animate-fade-in">
        <p className="text-lg text-zinc-300 mb-6">まずは無料で試してみましょう</p>
        <Link
          href="/signup"
          className="inline-flex justify-center py-3 px-8 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] transition-colors"
        >
          無料で始める
        </Link>
      </section>

      {/* フッター */}
      <footer className="py-8 px-4 border-t border-[#3a3a46]">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500 max-w-2xl mx-auto">
          <Link href="/privacy" className="hover:text-[#27AE60] transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-[#27AE60] transition-colors">
            利用規約
          </Link>
          <Link href="/contact" className="hover:text-[#27AE60] transition-colors">
            お問い合わせ
          </Link>
        </div>
        <p className="text-center text-zinc-600 text-xs mt-4">© 2026 Tap4</p>
      </footer>
    </div>
  );
}
