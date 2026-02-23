"use client";

import { create } from "zustand";
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { auth, isConfigured } from "./firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  configured: boolean;
  setUser: (u: User | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  configured: !!isConfigured,
  setUser: (u) => set({ user: u, loading: false }),

  signInWithGoogle: async () => {
    if (!auth || !isConfigured) return;
    set({ loading: true });
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign in error:", err);
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
