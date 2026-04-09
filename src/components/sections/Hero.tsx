"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import Button from "@/components/ui/Button";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useSplash } from "@/components/ui/SplashContext";

const FEATURES = [
  {
    title: "Train and upskill",
    description:
      "Educate your workforce with AI literacy courses created to target specific learning needs. Engage large groups of learners at a time and location that is most convenient to them.",
  },
  {
    title: "Get all expertise in one place",
    description:
      "Benefit from full-cycle AI certification services that include instructional design, assessment engineering, and mastery verification.",
  },
  {
    title: "Leverage AI-powered learning",
    description:
      "Advance your training programs with the help of AI. Provide your audience with a holistic learning experience that enhances engagement and helps them grasp complex concepts more quickly.",
  },
];

export default function Hero() {
  const { splashDone } = useSplash();
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isMobile, setIsMobile] = useState(false);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const openExpanded = useCallback(() => {
    setExpanded(true);
    setPlaying(true);
    setMuted(false);
  }, []);

  const closeExpanded = useCallback(() => {
    setExpanded(false);
  }, []);

  const togglePlay = useCallback(() => {
    const v = expandedVideoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback(() => {
    const v = expandedVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const goFullscreen = useCallback(() => {
    expandedVideoRef.current?.requestFullscreen?.();
  }, []);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = expandedVideoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
  }, []);

  // Close on Escape or scroll
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
    };
    const onScroll = () => closeExpanded();
    // Use wheel to detect scroll intent even though body might not scroll
    const onWheel = () => closeExpanded();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("wheel", onWheel, { once: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, [expanded, closeExpanded]);

  // Sync playback + track progress
  useEffect(() => {
    if (expanded && expandedVideoRef.current && inlineVideoRef.current) {
      const v = expandedVideoRef.current;
      v.currentTime = inlineVideoRef.current.currentTime;
      v.muted = false;
      v.play();

      const onTime = () => {
        setProgress((v.currentTime / v.duration) * 100 || 0);
        setCurrentTime(formatTime(v.currentTime));
      };
      const onMeta = () => setDuration(formatTime(v.duration));
      v.addEventListener("timeupdate", onTime);
      v.addEventListener("loadedmetadata", onMeta);
      if (v.duration) onMeta();
      return () => {
        v.removeEventListener("timeupdate", onTime);
        v.removeEventListener("loadedmetadata", onMeta);
      };
    }
  }, [expanded]);

  return (
    <section className="relative overflow-hidden bg-dark pt-24 pb-24 mt-[88px] rounded-t-[3rem] lg:pt-32 lg:pb-40 lg:rounded-t-[5rem]">
      {/* Three.js particle wave / sphere background */}
      <ParticleBackground />

      {/* Subtle dark overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-dark/20" />

      {/* Oversized watermark behind content */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
        <span className="-translate-y-12 text-[28vw] font-bold leading-none tracking-tighter text-primary/[0.06] whitespace-nowrap">
          ageni.ai
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Hero content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={splashDone ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              AI-Powered Learning Platform
            </motion.p>

            <h1 className="font-title text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl">
              Ageni is a virtual learning platform to{" "}
              <em className="italic">power the next generation</em>,{" "}
              <em className="italic text-primary">wherever they might be.</em>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-6 max-w-lg"
            >
              <p className="font-subtitle text-base leading-relaxed text-white/50">
                Designed for students, professionals, founders, and business
                owners. Learners develop applied skills in{" "}
                <span className="text-white/70">how to prompt effectively</span>,{" "}
                <span className="text-white/70">build AI workflows</span>,{" "}
                <span className="text-white/70">automate repeatable works</span>{" "}
                and{" "}
                <span className="text-white/70">the correct use of ChatGPT, Claude & other LLMs</span>.
              </p>
              <p className="mt-4 font-subtitle text-sm italic text-white/35">
                AI adoption has outpaced practical AI skill. Ageni addresses that directly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href="#contact" variant="cta" arrow>
                Contact us
              </Button>
              <Button
                href="#pricing"
                variant="outline"
                className="border-white/15 text-white/70 hover:border-primary hover:text-primary"
              >
                View Pricing
              </Button>
            </motion.div>
          </motion.div>

          {/* Right — Stacked video collage */}
          <div className="relative aspect-[4/3] sm:aspect-video">
            {/* Bottom layer — video2 (orange), -12deg, shifted down-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={splashDone ? { opacity: 1, scale: 1, rotate: -9, x: isMobile ? -10 : -30, y: isMobile ? 40 : 100 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute inset-0 z-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <video
                autoPlay loop muted playsInline disablePictureInPicture
                className="h-full w-full object-cover"
                src="/media/video2.mp4"
              />
            </motion.div>

            {/* Middle layer — video1 (red), -4deg, shifted up-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={splashDone ? { opacity: 1, scale: 1, rotate: -4, x: isMobile ? 10 : 30, y: isMobile ? -50 : -140 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute inset-0 z-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <video
                autoPlay loop muted playsInline disablePictureInPicture
                className="h-full w-full object-cover"
                src="/media/video1.mp4"
              />
            </motion.div>

            {/* Top layer — hero-video (yellow), 12deg, centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={splashDone ? { opacity: 1, scale: 1, rotate: 10, x: isMobile ? -5 : -10, y: isMobile ? -10 : -30 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              data-cursor-text="Watch"
              onClick={openExpanded}
              className="absolute inset-0 z-20 cursor-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            >
              <video
                ref={inlineVideoRef}
                autoPlay loop muted playsInline disablePictureInPicture
                className="h-full w-full object-cover"
                src="/media/hero-video.mp4"
              />
            </motion.div>
          </div>
        </div>

        {/* Golden rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={splashDone ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-primary/60 via-primary/20 to-transparent lg:mt-16"
        />

        {/* Features row — part of hero, watermark shows through */}
        <div className="mt-10 grid gap-8 md:grid-cols-3 lg:mt-16 lg:gap-10">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1.3 + i * 0.15 }}
            >
              <h3 className="flex items-center gap-2 text-base font-bold italic text-white">
                <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/40">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen video overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 backdrop-blur-2xl"
            onClick={closeExpanded}
          >
            {/* Expanded video + custom controls */}
            <motion.div
              initial={{ scale: 0.85, rotate: 10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 10, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[92vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button — outside top-right */}
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                onClick={closeExpanded}
                className="absolute -right-3 -top-14 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/60 backdrop-blur-md transition-all hover:border-primary/40 hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </motion.button>

              {/* Video */}
              <div
                className="overflow-hidden rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)]"
                data-cursor-text={playing ? "Pause" : "Play"}
                onClick={togglePlay}
              >
                <video
                  ref={expandedVideoRef}
                  autoPlay
                  loop
                  playsInline
                  disablePictureInPicture
                  className="aspect-video w-full"
                  src="/media/hero-video.mp4"
                />
              </div>

              {/* Custom controls bar */}
              <div className="mx-auto mt-4 flex w-[96%] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-5 py-3.5 shadow-lg backdrop-blur-xl">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  {playing ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="ml-0.5 h-3.5 w-3.5" fill="currentColor" />}
                </button>

                {/* Time */}
                <span className="shrink-0 text-[11px] font-medium tabular-nums text-white/40">
                  {currentTime}
                </span>

                {/* Progress bar */}
                <div
                  ref={progressRef}
                  className="group relative flex-1 cursor-pointer py-2"
                  onClick={seekTo}
                >
                  <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-[width] duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {/* Scrub handle */}
                  <div
                    className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-primary bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                    style={{ left: `${progress}%`, marginLeft: -7 }}
                  />
                </div>

                {/* Duration */}
                <span className="shrink-0 text-[11px] font-medium tabular-nums text-white/40">
                  {duration}
                </span>

                {/* Divider */}
                <div className="h-4 w-px bg-white/10" />

                {/* Mute */}
                <button onClick={toggleMute} className="shrink-0 text-white/50 transition-colors hover:text-white">
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                {/* Fullscreen */}
                <button onClick={goFullscreen} className="shrink-0 text-white/50 transition-colors hover:text-white">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
