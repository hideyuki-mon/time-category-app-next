"use client";

import { create } from "zustand";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  type User,
} from "firebase/auth";
import { auth, isConfigured } from "./firebase";

function isMobileOrNarrow(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || "ontouchstart" in window;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  configured: boolean;
  setUser: (u: User | null) => void;
  clearError: () => void;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkRedirectResult: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  configured: !!isConfigured,
  setUser: (u) => set({ user: u, loading: false, error: null }),
  clearError: () => set({ error: null }),


  checkRedirectResult: async () => {
    if (!auth || !isConfigured) return;
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        set({ user: result.user, loading: false });
      }
    } catch (err) {
      console.error("Redirect sign-in error:", err);
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    if (!auth || !isConfigured) return;
    set({ loading: true });
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      if (isMobileOrNarrow()) {
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign in error:", err);
      set({ loading: false });
    } finally {
      if (!isMobileOrNarrow()) set({ loading: false });
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    if (!auth || !isConfigured) return;
    set({ loading: true, error: null });
    try {
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const jp = msg.includes("email-already-in-use")
        ? "このメールアドレスは既に登録されています"
        : msg.includes("weak-password")
          ? "パスワードは6文字以上にしてください"
          : msg.includes("invalid-email")
            ? "有効なメールアドレスを入力してください"
            : msg;
      set({ loading: false, error: jp });
    } finally {
      set({ loading: false });
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    if (!auth || !isConfigured) return;
    set({ loading: true, error: null });
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const jp = msg.includes("invalid-credential") || msg.includes("user-not-found") || msg.includes("wrong-password")
        ? "メールアドレスまたはパスワードが正しくありません"
        : msg.includes("invalid-email")
          ? "有効なメールアドレスを入力してください"
          : msg;
      set({ loading: false, error: jp });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    if (!auth) return;
    set({ loading: true });
    try {
      await firebaseSignOut(auth);
    } finally {
      set({ loading: false });
    }
  },
}));
