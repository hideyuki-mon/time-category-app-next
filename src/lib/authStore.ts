"use client";

import { create } from "zustand";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
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
  configured: boolean;
  setUser: (u: User | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkRedirectResult: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  configured: !!isConfigured,
  setUser: (u) => set({ user: u, loading: false }),

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
