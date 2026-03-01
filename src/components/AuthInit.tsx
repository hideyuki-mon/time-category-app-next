"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isConfigured } from "@/lib/firebase";
import { useAuthStore } from "@/lib/authStore";
import { syncRecords } from "@/lib/sync";
import { useTimerStore } from "@/lib/stores/timerStore";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const checkRedirectResult = useAuthStore((s) => s.checkRedirectResult);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!auth || !isConfigured) {
      setUser(null);
      return;
    }
    let unsubscribe: (() => void) | undefined;
    const init = async () => {
      await checkRedirectResult();
      unsubscribe = onAuthStateChanged(auth!, (u) => {
        setUser(u ?? null);
      });
    };
    init();
    return () => {
      unsubscribe?.();
    };
  }, [setUser, checkRedirectResult]);

  useEffect(() => {
    if (!user) return;
    syncRecords().then(() => {
      useTimerStore.getState().loadTodayTotals();
    });
  }, [user]);

  return <>{children}</>;
}
