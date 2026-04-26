"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const PILLAR_LINKS_1 = [
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Certification", href: "/#certification" },
  { label: "PMA Assessment", href: "/#pma" },
];

const PILLAR_LINKS_2 = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "#contact" },
];

/* ─── 3D tilt card ─── */
function TiltCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), springConfig);
  const glowX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);

  function handleMouse(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    setHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(600px circle at ${gx}% ${gy}%, rgba(201,162,39,0.12), transparent 50%)`
          ),
        }}
      />
      {/* Animated border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(400px circle at ${gx}% ${gy}%, rgba(201,162,39,0.25), transparent 60%)`
          ),
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Animated link row ─── */
function PillarLink({
  href,
  label,
  index,
}: {
  href: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="group/link relative flex items-center justify-between overflow-hidden rounded-xl border border-white/[0.06] px-5 py-3.5 text-sm text-white/50 transition-all duration-300 hover:border-primary/30 hover:text-primary"
      >
        {/* Slide-in bg */}
        <span className="absolute inset-0 -translate-x-full bg-primary/[0.06] transition-transform duration-500 ease-out group-hover/link:translate-x-0" />
        <span className="relative z-10">{label}</span>
        <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

/* ─── Heading word reveal ─── */
function RevealWord({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", rotateX: -40 }}
        whileInView={{ y: "0%", rotateX: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ─── Main section ─── */
export default function ProductPillars() {
  return (
    <section id="service-pillars" className="relative overflow-hidden bg-light pb-28 lg:pb-36">
      {/* Ambient floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-[140px]"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ─── Header ─── */}
        <div className="mb-20">
          <h2
            className="font-title text-5xl font-semibold italic leading-[1.08] tracking-tight text-dark sm:text-6xl lg:text-7xl"
            style={{ perspective: "600px" }}
          >
            <RevealWord delay={0}>We</RevealWord>{" "}
            <RevealWord delay={0.06} className="text-primary">
              train
            </RevealWord>{" "}
            <RevealWord delay={0.12}>and</RevealWord>
            <br />
            <RevealWord delay={0.18} className="text-primary">
              certify
            </RevealWord>{" "}
            <RevealWord delay={0.24}>workforces</RevealWord>
          </h2>
        </div>

        {/* ─── Animated gold divider ─── */}
        <motion.div
          className="mb-12 h-px w-full origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,162,39,0.4) 20%, rgba(201,162,39,0.4) 80%, transparent)",
          }}
        />

        {/* ─── Cards ─── */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 — AI Literacy */}
          <TiltCard className="bg-dark" delay={0.1}>
            <div className="relative z-20 p-8 lg:p-10">
              {/* Top accent line */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,162,39,0.5) 50%, transparent)",
                }}
              />

              {/* Badge */}
              <motion.p
                className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(201,162,39,0.6)]" />
                AI Literacy
              </motion.p>

              <motion.h3
                className="text-2xl font-bold text-white lg:text-3xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                AI Literacy Training
              </motion.h3>

              <motion.p
                className="mt-4 text-sm leading-relaxed text-white/45 lg:text-base lg:leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Structured courses that take individuals and teams from AI-curious
                to AI-competent. Programs range from $100 to $1,000 depending on
                track and team size.
              </motion.p>

              <div className="mt-8 flex flex-col gap-2.5">
                {PILLAR_LINKS_1.map((link, i) => (
                  <PillarLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </TiltCard>

          {/* Card 2 — Custom Skills */}
          <TiltCard className="bg-dark" delay={0.25}>
            <div className="relative z-20 p-8 lg:p-10">
              {/* Top accent line */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45 }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,162,39,0.5) 50%, transparent)",
                }}
              />

              {/* Badge */}
              <motion.p
                className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(201,162,39,0.6)]" />
                Custom Skills
              </motion.p>

              <motion.h3
                className="text-2xl font-bold text-white lg:text-3xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Custom Job Skills Training
              </motion.h3>

              <motion.p
                className="mt-4 text-sm leading-relaxed text-white/45 lg:text-base lg:leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                Tailored programs built around your SOPs and workflows so your
                team learns AI in the context of the work they already do.
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {PILLAR_LINKS_2.map((link, i) => (
                  <PillarLink
                    key={link.label}
                    href={link.href}
                    label={link.label}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* ─── Bottom accent line ─── */}
        <motion.div
          className="mt-12 h-px w-full origin-right"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,162,39,0.3) 20%, rgba(201,162,39,0.3) 80%, transparent)",
          }}
        />
      </div>
    </section>
  );
}
