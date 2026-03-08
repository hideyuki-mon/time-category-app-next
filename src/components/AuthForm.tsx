"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/authStore";

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500";

export function SignupForm() {
  const router = useRouter();
  const { signUpWithEmail, loading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) return;
    await signUpWithEmail(email, password);
    const user = useAuthStore.getState().user;
    if (user) router.push("/app");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          placeholder="example@email.com"
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">パスワード（6文字以上）</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
          placeholder="パスワード"
          className={inputClass}
          minLength={6}
          required
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !email.trim() || password.length < 6}
        className="w-full py-3 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] disabled:opacity-50"
      >
        {loading ? "登録中..." : "アカウント作成"}
      </button>
      <p className="text-center text-sm text-zinc-500">
        すでにアカウントをお持ちの方は
        <Link href="/login" className="text-[#27AE60] underline ml-1">
          ログイン
        </Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const { signInWithEmail, loading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    await signInWithEmail(email, password);
    const user = useAuthStore.getState().user;
    if (user) router.push("/app");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          placeholder="example@email.com"
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
          placeholder="パスワード"
          className={inputClass}
          required
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading || !email.trim() || !password}
        className="w-full py-3 rounded-lg bg-[#27AE60] text-white font-medium hover:bg-[#229954] disabled:opacity-50"
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>
      <p className="text-center text-sm text-zinc-500">
        アカウントをお持ちでない方は
        <Link href="/signup" className="text-[#27AE60] underline ml-1">
          新規登録
        </Link>
      </p>
      <p className="text-center">
        <Link href="/login/forgot" className="text-xs text-zinc-500 underline">
          パスワードを忘れた方
        </Link>
      </p>
    </form>
  );
}
