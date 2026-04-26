"use client";

import { useCallback, type MouseEvent as ReactMouseEvent } from "react";

export function useRadialFill() {
  const onMouseEnter = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = 2 * Math.hypot(rect.width, rect.height);
    el.style.setProperty("--fill-x", `${x}px`);
    el.style.setProperty("--fill-y", `${y}px`);
    el.style.setProperty("--fill-w", `${diameter}px`);
    el.style.setProperty("--fill-duration", "450ms");
    el.style.setProperty("--fill-easing", "cubic-bezier(0.22,1,0.36,1)");
  }, []);

  const onMouseLeave = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--fill-x", `${x}px`);
    el.style.setProperty("--fill-y", `${y}px`);
    el.style.setProperty("--fill-w", `0px`);
    el.style.setProperty("--fill-duration", "350ms");
    el.style.setProperty("--fill-easing", "cubic-bezier(0.55,0,0.68,0.99)");
  }, []);

  return { onMouseEnter, onMouseLeave };
}

export const radialFillStyle: React.CSSProperties = {
  left: "var(--fill-x, 50%)",
  top: "var(--fill-y, 50%)",
  width: "var(--fill-w, 0px)",
  height: "var(--fill-w, 0px)",
  transition:
    "width var(--fill-duration, 450ms) var(--fill-easing, ease-out), height var(--fill-duration, 450ms) var(--fill-easing, ease-out)",
};
