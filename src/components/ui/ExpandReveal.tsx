"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ExpandReveal({
  children,
  after,
}: {
  children: React.ReactNode;
  after?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  /* 75% → 100% width */
  const width = useTransform(smoothProgress, [0, 1], ["75%", "100%"]);
  /* rounded → flat */
  const borderRadius = useTransform(smoothProgress, [0, 1], [48, 0]);
  /* scale content from 88% → 100% */
  const scale = useTransform(smoothProgress, [0, 1], [0.88, 1]);

  return (
    <div className="bg-[#1E293B]">
      <div ref={ref} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 flex h-screen items-end justify-center overflow-hidden">
          <motion.div
            style={{
              width,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            }}
            className="h-full overflow-hidden rounded-b-[2.5rem] bg-white"
          >
            <motion.div style={{ scale, transformOrigin: "center top" }}>
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* sections that follow directly after */}
      <div className="bg-light">
        {after}
      </div>
    </div>
  );
}
