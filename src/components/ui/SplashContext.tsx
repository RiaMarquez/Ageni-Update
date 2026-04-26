"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface SplashContextType {
  splashDone: boolean;
  onSplashDone: () => void;
}

const SplashContext = createContext<SplashContextType>({
  splashDone: false,
  onSplashDone: () => {},
});

export function SplashProvider({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);
  const onSplashDone = useCallback(() => setSplashDone(true), []);
  return (
    <SplashContext.Provider value={{ splashDone, onSplashDone }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  return useContext(SplashContext);
}
