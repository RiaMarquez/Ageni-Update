"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSplash } from "./SplashContext";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"loading" | "video" | "fadeout">("loading");
  const [hidden, setHidden] = useState(false);
  const [percent, setPercent] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { onSplashDone } = useSplash();

  // Smoothly animate displayed percentage toward actual percent
  useEffect(() => {
    if (displayPercent >= percent) return;
    const timer = setTimeout(() => {
      setDisplayPercent((prev) => Math.min(prev + 1, percent));
    }, 18);
    return () => clearTimeout(timer);
  }, [displayPercent, percent]);

  // Track page resource loading progress
  useEffect(() => {
    let cancelled = false;
    const tasks: Array<{ done: boolean }> = [];

    const updateProgress = () => {
      if (cancelled) return;
      const completed = tasks.filter((t) => t.done).length;
      const total = tasks.length || 1;
      setPercent(Math.round((completed / total) * 100));
    };

    const addTask = () => {
      const task = { done: false };
      tasks.push(task);
      return () => {
        task.done = true;
        updateProgress();
      };
    };

    // 1. Splash video itself
    const markVideo = addTask();
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 3) {
        markVideo();
      } else {
        video.addEventListener("canplaythrough", markVideo, { once: true });
      }
    }

    // 2. Fonts
    const markFonts = addTask();
    document.fonts.ready.then(markFonts);

    // 3. All images currently in DOM
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

    // 4. All videos currently in DOM (other than splash)
    const videos = Array.from(document.querySelectorAll("video")).filter(
      (v) => v !== video
    );
    videos.forEach((v) => {
      const mark = addTask();
      if (v.readyState >= 2) {
        mark();
      } else {
        v.addEventListener("loadeddata", mark, { once: true });
        v.addEventListener("error", mark, { once: true });
      }
    });

    // 5. Window load event (catches remaining resources like stylesheets, scripts)
    const markWindow = addTask();
    if (document.readyState === "complete") {
      markWindow();
    } else {
      window.addEventListener("load", markWindow, { once: true });
    }

    updateProgress();

    // Fallback: force 100% after 8s no matter what
    const fallback = setTimeout(() => {
      if (!cancelled) setPercent(100);
    }, 8000);

    return () => {
      cancelled = true;
      clearTimeout(fallback);
    };
  }, []);

  // When percent hits 100 and display catches up, transition to video phase
  const startVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setPhase("video");
    video.play().catch(() => {
      // autoplay blocked — skip to done
      setPhase("fadeout");
      setTimeout(() => {
        setHidden(true);
        onSplashDone();
      }, 600);
    });
  }, [onSplashDone]);

  useEffect(() => {
    if (displayPercent >= 100 && phase === "loading") {
      // Brief pause at 100% before starting video
      const timer = setTimeout(startVideo, 400);
      return () => clearTimeout(timer);
    }
  }, [displayPercent, phase, startVideo]);

  const handleEnded = () => {
    setPhase("fadeout");
    setTimeout(() => {
      setHidden(true);
      onSplashDone();
    }, 600);
  };

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-600 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Loading overlay */}
      {phase === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-10 pb-10 sm:px-14 sm:pb-14">
          {/* Percentage — bottom-left, large */}
          <span
            className="font-title text-[clamp(4rem,14vw,10rem)] font-semibold leading-none tracking-tight text-white/90"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {displayPercent}%
          </span>

          {/* Progress bar — full width at the bottom */}
          <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
              style={{ width: `${displayPercent}%` }}
            />
          </div>

          {/* Label — right-aligned below the bar */}
          <p className="mt-3 text-right text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/25">
            Loading
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="noplaybackrate"
        onEnded={handleEnded}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          phase === "video" || phase === "fadeout" ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/media/loadup.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
