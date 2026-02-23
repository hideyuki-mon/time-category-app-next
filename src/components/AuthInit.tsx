"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isConfigured } from "@/lib/firebase";
import { useAuthStore } from "@/lib/authStore";
import { pullRecordsFromCloud } from "@/lib/sync";
import { useTimerStore } from "@/lib/stores/timerStore";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!auth || !isConfigured) {
      setUser(null);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
    });
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (!user) return;
    pullRecordsFromCloud().then(() => {
      useTimerStore.getState().loadTodayTotals();
    });
  }, [user]);

  return <>{children}</>;
}
