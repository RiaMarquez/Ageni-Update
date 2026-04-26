"use client";

import { useState, useEffect, useRef, useMemo, memo } from "react";
import { BookOpen, Brain, Award, type LucideIcon } from "lucide-react";
import { useSplash } from "./SplashContext";

type Phase = "loading" | "fadeout";

const ROULETTE_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Single character that loops: shows target → scrolls through random letters
 * → lands back on target → repeats. Both ends of the reel are the target
 * letter so the looping snap is invisible.
 *
 * Keyframes live in globals.css under `.animate-reel-shuffle`.
 *
 * Memoized so parent re-renders during loading don't reconcile this subtree.
 */
const RouletteChar = memo(function RouletteChar({
  target,
  animationDelay,
}: {
  target: string;
  animationDelay: number;
}) {
  const reel = useMemo(() => {
    if (target === " ") return [" "];
    const random = Array.from(
      { length: 5 },
      () => ROULETTE_CHARSET[Math.floor(Math.random() * ROULETTE_CHARSET.length)],
    );
    return [target, ...random, target];
  }, [target]);

  if (target === " ") {
    return (
      <span
        style={{ display: "inline-block", width: "0.5em", marginRight: "0.35em" }}
      >
        &nbsp;
      </span>
    );
  }

  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: "1em",
        verticalAlign: "bottom",
        lineHeight: 1,
        marginRight: "0.35em",
      }}
    >
      <span
        className="animate-reel-shuffle"
        style={{
          display: "block",
          animationDelay: `${animationDelay}ms`,
        }}
      >
        {reel.map((c, i) => (
          <span key={i} style={{ display: "block", height: "1em" }}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
});

const CHECKPOINTS: { at: number; threshold: number; icon: LucideIcon; label: string }[] = [
  { at: 25, threshold: 25, icon: BookOpen, label: "Learn" },
  { at: 50, threshold: 50, icon: Brain, label: "Think" },
  { at: 75, threshold: 75, icon: Award, label: "Master" },
];

const MIN_DURATION_MS = 3500;

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [hidden, setHidden] = useState(false);
  const [activated, setActivated] = useState<Set<number>>(new Set());
  const [lineComplete, setLineComplete] = useState(false);
  const { onSplashDone } = useSplash();

  // Refs hold the values rAF reads each frame. Using refs (not React state)
  // means the rAF loop runs once and is never restarted by progress updates,
  // and the line's width is written directly to the DOM — no per-frame
  // React render. The only state changes are: 3 checkpoint activations and
  // a single lineComplete flip at the end.
  const lineRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(0);
  const percentRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  // Single rAF loop, set up once on mount
  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    startTimeRef.current = performance.now();

    const tick = () => {
      if (cancelled) return;
      const elapsed = performance.now() - (startTimeRef.current ?? 0);
      const timeCap = Math.min(100, (elapsed / MIN_DURATION_MS) * 100);
      const target = Math.min(percentRef.current, timeCap);
      const diff = target - animatedRef.current;

      if (Math.abs(diff) < 0.05) {
        animatedRef.current = target;
      } else {
        animatedRef.current += diff * 0.08;
      }

      // Drive the line width via direct DOM write — no React render.
      if (lineRef.current) {
        lineRef.current.style.width = `${animatedRef.current}%`;
      }

      // Check for checkpoint activations. setActivated returns prev when
      // unchanged, so React only re-renders on actual threshold crossings.
      setActivated((prev) => {
        let changed = false;
        const next = new Set(prev);
        CHECKPOINTS.forEach((cp, i) => {
          if (animatedRef.current >= cp.threshold && !next.has(i)) {
            next.add(i);
            changed = true;
          }
        });
        return changed ? next : prev;
      });

      if (animatedRef.current >= 100) {
        setLineComplete(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  // Track page resource loading progress
  useEffect(() => {
    let cancelled = false;
    const tasks: Array<{ done: boolean }> = [];

    const updateProgress = () => {
      if (cancelled) return;
      const completed = tasks.filter((t) => t.done).length;
      const total = tasks.length || 1;
      percentRef.current = Math.round((completed / total) * 100);
    };

    const addTask = () => {
      const task = { done: false };
      tasks.push(task);
      return () => {
        task.done = true;
        updateProgress();
      };
    };

    // 1. Fonts
    const markFonts = addTask();
    document.fonts.ready.then(markFonts);

    // 2. All images currently in DOM
    const images = Array.from(document.images);
    images.forEach((img) => {
      const mark = addTask();
      if (img.complete) {
        mark();
      } else {
        img.addEventListener("load", mark, { once: true });
        img.addEventListener("error", mark, { once: true });
      }
    });

    // 3. All videos currently in DOM
    const videos = Array.from(document.querySelectorAll("video"));
    videos.forEach((v) => {
      const mark = addTask();
      if (v.readyState >= 2) {
        mark();
      } else {
        v.addEventListener("loadeddata", mark, { once: true });
        v.addEventListener("error", mark, { once: true });
      }
    });

    // 4. Window load event (catches remaining resources like stylesheets, scripts)
    const markWindow = addTask();
    if (document.readyState === "complete") {
      markWindow();
    } else {
      window.addEventListener("load", markWindow, { once: true });
    }

    updateProgress();

    // Fallback: force 100% after 8s no matter what
    const fallback = setTimeout(() => {
      if (!cancelled) percentRef.current = 100;
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  // When line reaches the right edge, hold briefly, then fade out
  useEffect(() => {
    if (!lineComplete || phase !== "loading") return;
    const hold = setTimeout(() => setPhase("fadeout"), 400);
    return () => clearTimeout(hold);
  }, [lineComplete, phase]);

  useEffect(() => {
    if (phase !== "fadeout") return;
    const t = setTimeout(() => {
      setHidden(true);
      onSplashDone();
    }, 600);
    return () => clearTimeout(t);
  }, [phase, onSplashDone]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center bg-dark transition-opacity duration-600 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Full-bleed track group, vertically centered */}
      <div className="relative w-full">
        {/* Label — looping slot-machine reel, sits just above the line on the left */}
        <p
          aria-label="Initializing Ageni"
          className="absolute -top-7 left-6 font-title text-[0.7rem] font-medium uppercase text-white/55 sm:left-10"
        >
          {"Initializing Ageni".split("").map((c, i) => (
            <RouletteChar
              key={i}
              target={c}
              animationDelay={750 + i * 50}
            />
          ))}
        </p>

        {/* Track */}
        <div className="relative h-36">
          {/* Active line — width is set directly on the DOM node by the rAF
              loop via `lineRef`, so the splash doesn't re-render every frame. */}
          <div
            ref={lineRef}
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-primary"
            style={{ width: "0%" }}
          />

          {/* Checkpoints (each contains a line-breaking spacer + the circle) */}
          {CHECKPOINTS.map((cp, i) => {
            const isActive = activated.has(i);
            const Icon = cp.icon;
            return (
              <div
                key={cp.label}
                className="absolute top-1/2 flex h-36 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${cp.at}%` }}
              >
                {/* Spacer that punches through the line, leaving visible gaps either side of the circle */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-dark"
                />

                {/* Circle */}
                <div
                  className={`relative flex h-36 w-36 items-center justify-center rounded-full bg-primary shadow-[0_0_60px_-8px_var(--color-primary)] motion-reduce:transition-opacity motion-reduce:duration-300 ${
                    isActive
                      ? "scale-100 rotate-0 opacity-100"
                      : "scale-[0.55] -rotate-45 opacity-0 motion-reduce:rotate-0 motion-reduce:scale-100"
                  }`}
                  style={{
                    transition: "all 1100ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <Icon className="h-12 w-12 text-dark" strokeWidth={2} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
