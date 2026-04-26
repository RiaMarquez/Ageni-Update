"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import AdvisoryParticles from "@/components/ui/AdvisoryParticles";

type Segment = { text: string; accent?: boolean; italic?: boolean };

const LINE_1: Segment[] = [
  { text: "The" },
  { text: "gap" },
  { text: "isn't" },
  { text: "awareness." },
];

const LINE_2: Segment[] = [
  { text: "It's" },
  { text: "application.", accent: true, italic: true },
];

const LINES: Segment[][] = [LINE_1, LINE_2];
const TOTAL_WORDS = LINES.reduce((sum, line) => sum + line.length, 0);

export default function Advisory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Indices for each word relative to the flat list so opacity windows stagger cleanly
  let running = 0;
  const lineOffsets = LINES.map((line) => {
    const start = running;
    running += line.length;
    return start;
  });

  return (
    <div className="bg-dark">
      <div ref={ref} className="relative" style={{ height: "260vh" }}>
        <div className="noise-bg sticky top-0 flex h-screen items-center overflow-hidden">
          <AdvisoryParticles progress={scrollYProgress} />
          <div className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center">
            <h2 className="font-title text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl">
              {LINES.map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line.map((seg, segIndex) => (
                    <RevealWord
                      key={`${lineIndex}-${segIndex}`}
                      seg={seg}
                      index={lineOffsets[lineIndex] + segIndex}
                      total={TOTAL_WORDS}
                      progress={scrollYProgress}
                    />
                  ))}
                </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevealWord({
  seg,
  index,
  total,
  progress,
}: {
  seg: Segment;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // reveal across the middle 65% of the runway — leaves room for entry and attribution fade-in
  const REVEAL_START = 0.1;
  const REVEAL_END = 0.75;
  const span = REVEAL_END - REVEAL_START;
  const start = REVEAL_START + (index / total) * span;
  const end = REVEAL_START + ((index + 0.9) / total) * span;

  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <>
      <motion.span
        style={{ opacity }}
        className={`${seg.italic ? "italic" : ""} ${
          seg.accent ? "text-primary" : "text-white"
        }`}
      >
        {seg.text}
      </motion.span>
      {" "}
    </>
  );
}
