"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";
import { ShieldCheck, Brain, BarChart3, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Brain, BarChart3, Smartphone];
const VIDEOS = [
  "/media/cards/mastery.mp4",
  "/media/cards/anti.mp4",
  "/media/cards/employer.mp4",
  "/media/cards/device.mp4",
];
const TOTAL = DIFFERENTIATORS.length;

// Seeded random offsets so each card gets a consistent "poke out" direction
const CARD_OFFSETS = [
  { x: -18, rotate: -2.5 },
  { x: 24, rotate: 3 },
  { x: -12, rotate: 1.8 },
  { x: 20, rotate: -2 },
];

function StackCard({
  item,
  index,
  progress,
  Icon,
  isHovered,
}: {
  item: (typeof DIFFERENTIATORS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  Icon: LucideIcon;
  isHovered: boolean;
}) {
  const cardStart = index / (TOTAL + 0.5);
  const cardLanded = (index + 0.7) / (TOTAL + 0.5);

  const stackOffset = -(index * 10);
  const y = useTransform(progress, [cardStart, cardLanded], [1000, stackOffset]);

  const offset = CARD_OFFSETS[index % CARD_OFFSETS.length];

  return (
    <motion.div
      className="absolute inset-x-0 top-[calc(50%+5rem)] h-[340px] -translate-y-1/2 will-change-transform lg:h-[380px]"
      style={{
        y: index === 0 ? stackOffset : y,
        zIndex: index + 1,
      }}
      animate={isHovered ? {
        x: offset.x,
        rotate: offset.rotate,
      } : {
        x: 0,
        rotate: 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="group relative flex h-full flex-col items-start justify-center overflow-hidden rounded-3xl bg-white border border-dark/10 p-8 shadow-2xl lg:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-dark lg:text-2xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-dark/50">
          {item.description}
        </p>
        <p className="mt-4 text-xs leading-relaxed text-dark/30">
          Powered by ageni.ai&apos;s proprietary assessment engine — built for scale, designed for trust.
        </p>
      </div>
    </motion.div>
  );
}

export default function Differentiators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Determine which card is currently on top
    for (let i = TOTAL - 1; i >= 0; i--) {
      const cardLanded = (i + 0.7) / (TOTAL + 0.5);
      if (v >= cardLanded) {
        setActiveIndex(i);
        return;
      }
    }
    setActiveIndex(0);
  });

  return (
    <SectionWrapper
      id="differentiators"
      className="relative -mt-8 overflow-clip rounded-[1.5rem] bg-white lg:rounded-[3rem]"
    >
      <div
        ref={containerRef}
        style={{ height: `${(TOTAL + 1) * 50}vh` }}
        className="relative"
      >
        {/* Pinned viewport — full screen height */}
        <div className="sticky top-0 h-screen">
          {/* Background videos — only load active + adjacent, crossfade */}
          {VIDEOS.map((src, i) => {
            const shouldLoad = Math.abs(activeIndex - i) <= 1;
            if (!shouldLoad) return null;
            return (
              <video
                key={src}
                autoPlay
                loop
                muted
                playsInline
                className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  activeIndex === i ? "opacity-[0.15]" : "opacity-0"
                }`}
                src={src}
              />
            );
          })}

          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* Left — Header, vertically centered */}
            <div className="flex flex-col justify-center" style={{ marginTop: "-10rem", marginLeft: "-5px" }}>
              <h2 className="font-title text-4xl font-semibold italic text-dark sm:text-5xl lg:text-7xl">
                What makes us <span className="text-primary">different</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-dark/50">
                Purpose-built intelligence for teams who need clarity, not just
                dashboards.
              </p>
            </div>

            {/* Right — Card stack area */}
            <div
              className="relative flex items-center justify-center h-full"
              onMouseEnter={() => setDeckHovered(true)}
              onMouseLeave={() => setDeckHovered(false)}
            >
              {DIFFERENTIATORS.map((item, i) => (
                <StackCard
                  key={item.title}
                  item={item}
                  index={i}
                  progress={scrollYProgress}
                  Icon={ICONS[i]}
                  isHovered={deckHovered}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
