"use client";

import { useState } from "react";
import Link from "next/link";

const CONTACT_TYPES = [
  { value: "bug", label: "バグ報告（アプリが正常に動かない）" },
  { value: "feature", label: "機能の要望・改善提案" },
  { value: "account", label: "アカウント・データに関するトラブル" },
  { value: "privacy", label: "個人情報の削除・開示請求" },
  { value: "other", label: "その他" },
] as const;

const ENV_OPTIONS = [
  { value: "iphone_safari", label: "iPhone / Safari" },
  { value: "android_chrome", label: "Android / Chrome" },
  { value: "pc_chrome", label: "PC / Chrome" },
  { value: "pc_safari", label: "PC / Safari" },
  { value: "pc_other", label: "PC / その他ブラウザ" },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [contactType, setContactType] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [environment, setEnvironment] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = email.length === 0 || EMAIL_REGEX.test(email);
  const isFormValid =
    contactType !== "" &&
    email.trim() !== "" &&
    isValidEmail &&
    message.trim() !== "";

  const handleEnvChange = (value: string, checked: boolean) => {
    setEnvironment((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactType,
          email: email.trim(),
          name: name.trim(),
          message: message.trim(),
          environment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "送信に失敗しました。しばらくしてから再度お試しください。");
        return;
      }

      setStatus("success");
      setContactType("");
      setEmail("");
      setName("");
      setMessage("");
      setEnvironment([]);
    } catch {
      setStatus("error");
      setErrorMessage("送信に失敗しました。しばらくしてから再度お試しください。");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a22] text-[#e8e8f0]">
      <header className="bg-[#24242e] border-b border-[#3a3a46] py-3 px-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-[#27AE60] hover:text-[#2ecc71] text-sm font-medium"
          >
            ← 戻る
          </Link>
          <h1 className="text-lg font-bold text-white">お問い合わせ</h1>
        </div>
      </header>
      <main className="p-4 pb-24 max-w-2xl mx-auto">
        <p className="text-zinc-300 text-sm mb-6">
          Tap4に関するご質問・ご要望・不具合報告などはこちらからお送りください。
          内容を確認の上、tap4inquiry@gmail.com よりご返信いたします。
          <br />
          <span className="text-zinc-500">※返信までに数日かかる場合があります。</span>
        </p>

        {status === "success" ? (
          <div className="bg-[#27AE60]/20 border border-[#27AE60]/50 rounded-lg p-6 text-center">
            <p className="text-[#27AE60] font-medium">
              お問い合わせを受け付けました。数日以内にご返信いたします。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. お問い合わせの種類 */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                お問い合わせの種類 <span className="text-red-400">*</span>
              </label>
              <div className="space-y-2">
                {CONTACT_TYPES.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-start gap-3 p-3 rounded-lg border border-zinc-600 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactType"
                      value={value}
                      checked={contactType === value}
                      onChange={() => setContactType(value)}
                      className="mt-1 text-[#27AE60] focus:ring-[#27AE60]"
                    />
                    <span className="text-sm text-zinc-200">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={`w-full px-3 py-2 rounded-lg border bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 ${
                  email.length > 0 && !isValidEmail
                    ? "border-red-500 focus:ring-red-500"
                    : "border-zinc-600 focus:ring-zinc-500"
                }`}
              />
              {email.length > 0 && !isValidEmail && (
                <p className="mt-1 text-xs text-red-400">メールアドレスの形式が正しくありません</p>
              )}
            </div>

            {/* 3. お名前 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                お名前（任意）
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ニックネーム可"
                className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
              <p className="mt-1 text-xs text-zinc-500">ニックネーム可</p>
            </div>

            {/* 4. お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                お問い合わせ内容 <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="お問い合わせ内容をご記入ください"
                rows={6}
                className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 resize-y min-h-[120px]"
              />
              <p className="mt-1 text-xs text-zinc-500">できるだけ詳しくお書きください</p>
            </div>

            {/* 5. 使用環境 */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                使用環境（任意）
              </label>
              <div className="space-y-2">
                {ENV_OPTIONS.map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center gap-3 p-3 rounded-lg border border-zinc-600 bg-zinc-800/30 hover:bg-zinc-800/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={environment.includes(value)}
                      onChange={(e) => handleEnvChange(value, e.target.checked)}
                      className="rounded text-[#27AE60] focus:ring-[#27AE60]"
                    />
                    <span className="text-sm text-zinc-200">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {status === "error" && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || status === "sending"}
              className="w-full py-3 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#27AE60] transition-colors"
            >
              {status === "sending" ? "送信中..." : "送信する"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
