"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const pos = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);
  const hoveredEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const readCursorText = (el: HTMLElement): string =>
      el.getAttribute("data-cursor-text") ||
      el.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") ||
      "";

    const onEnter = (e: Event) => {
      setHovering(true);
      const el = e.currentTarget as HTMLElement;
      hoveredEl.current = el;
      const text = readCursorText(el);
      if (text) setCursorText(text);
    };
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const parent = el.closest("[data-cursor-text]");
      const related = (e as MouseEvent).relatedTarget as HTMLElement | null;
      // Don't clear if moving to another child inside the same data-cursor-text parent
      if (parent && related && parent.contains(related)) return;
      hoveredEl.current = null;
      setHovering(false);
      setCursorText("");
    };

    const hoverSelector =
      "a, button, [role='button'], input, textarea, select, video, [data-cursor-hover], [data-cursor-text]";

    const addListeners = () => {
      document.querySelectorAll(hoverSelector).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Watch for attribute changes on data-cursor-text elements so the
    // cursor label updates live (e.g. Play ↔ Pause) without needing
    // to move the mouse out and back in.
    const observer = new MutationObserver((mutations) => {
      let needsRebind = false;
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-cursor-text") {
          const el = m.target as HTMLElement;
          if (hoveredEl.current && (el === hoveredEl.current || el.contains(hoveredEl.current) || hoveredEl.current.closest("[data-cursor-text]") === el)) {
            setCursorText(readCursorText(el));
          }
        }
        if (m.type === "childList") needsRebind = true;
      }
      if (needsRebind) addListeners();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cursor-text"],
    });

    window.addEventListener("mousemove", onMove);
    addListeners();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      rendered.current.x = lerp(rendered.current.x, pos.current.x, 0.15);
      rendered.current.y = lerp(rendered.current.y, pos.current.y, 0.15);
      const tx = `translate(${rendered.current.x}px, ${rendered.current.y}px) translate(-50%, -50%)`;
      if (dotRef.current) dotRef.current.style.transform = tx;
      if (textRef.current) textRef.current.style.transform = tx;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
      document.querySelectorAll(hoverSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  const hasText = cursorText.length > 0;

  return (
    <>
      {/* Invert dot — always visible, handles the blend effect */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference transition-[width,height] duration-300 ease-out"
        style={{
          width: hasText ? 90 : hovering ? 48 : 12,
          height: hasText ? 90 : hovering ? 48 : 12,
        }}
      />
      {/* Text label — separate layer, no blend mode, so text is readable */}
      <div
        ref={textRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center rounded-full transition-[width,height,opacity] duration-300 ease-out"
        style={{
          width: 90,
          height: 90,
          opacity: hasText ? 1 : 0,
        }}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-white">
          {cursorText}
        </span>
      </div>
    </>
  );
}
