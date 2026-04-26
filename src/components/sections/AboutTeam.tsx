"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRadialFill, radialFillStyle } from "@/components/ui/useRadialFill";

const TEAM = [
  { name: "Timothy Ngo", role: "CEO & Founder", initials: "TN" },
  { name: "Chandana Hiram", role: "Head of Content", initials: "CH" },
  { name: "Maria Marquez", role: "Lead of Development", initials: "MM" },
  { name: "Sofia Yehia", role: "Media Direction", initials: "SY" },
  { name: "Ihna Simons", role: "Curriculum Designer", initials: "IS" },
  { name: "Sue Torio", role: "Partnerships & Growth", initials: "ST" },
];

const AGENI_FONTS = [
  "'Playwrite IE', cursive",
  "'Mea Culpa', cursive",
  "'Saira Stencil One', sans-serif",
  "'Orbitron', sans-serif",
  "'Boldonse', sans-serif",
  "'Source Serif 4', serif",
];

const STATS = [
  { value: "4+", label: "university partners" },
  { value: "4", label: "audience tiers" },
  { value: "24/7", label: "AI avatar tutor" },
  { value: "2026", label: "year of launch" },
];

function AnimatedAgeniText() {
  const [fontIndex, setFontIndex] = useState(0);
  const [italic, setItalic] = useState(true);
  const [bold, setBold] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % AGENI_FONTS.length);
      setItalic(Math.random() > 0.5);
      setBold(Math.random() > 0.5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={fontIndex}
        id="ageni-word"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="text-primary"
        style={{
          fontFamily: AGENI_FONTS[fontIndex],
          fontStyle: italic ? "italic" : "normal",
          fontWeight: bold ? 700 : 400,
        }}
      >
        ageni
      </motion.span>
    </AnimatePresence>
  );
}

function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEAM.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Get 3 visible members: prev, active, next
  const getIndex = (offset: number) =>
    (activeIndex + offset + TEAM.length) % TEAM.length;

  const visible = [getIndex(-1), getIndex(0), getIndex(1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col items-center gap-3 lg:items-end"
    >
      <div className="flex items-center -space-x-3">
        <AnimatePresence mode="popLayout">
          {visible.map((idx, pos) => {
            const member = TEAM[idx];
            const isCenter = pos === 1;
            return (
              <motion.div
                key={member.initials + idx}
                layout
                initial={{ opacity: 0, scale: 0.6, x: 20 }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  scale: isCenter ? 1.15 : 0.9,
                  x: 0,
                }}
                exit={{ opacity: 0, scale: 0.6, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`relative z-${isCenter ? "10" : "0"} flex items-center justify-center rounded-full border-2 ${
                  isCenter
                    ? "h-[72px] w-[72px] border-primary bg-dark text-base"
                    : "h-16 w-16 border-light bg-dark/80 text-sm"
                } font-bold text-primary`}
                title={`${member.name} — ${member.role}`}
              >
                {member.initials}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted"
        >
          {TEAM[activeIndex].name} — {TEAM[activeIndex].role}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutTeam() {
  const moreFill = useRadialFill();
  return (
    <section className="bg-light pt-12 pb-12 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top row — title + team avatars */}
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-title text-4xl font-semibold italic leading-[1.1] text-dark sm:text-5xl lg:text-7xl"
          >
            <AnimatedAgeniText />
          </motion.h2>

          <TeamCarousel />
        </div>

        {/* Description columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-20"
        >
          <p className="text-base leading-relaxed text-dark/70">
            Ageni is an AI-powered virtual learning platform that closes the
            gap between AI adoption and practical AI skill. Built for students,
            professionals, founders, and enterprise teams, it delivers
            structured courses, mastery-verified certification, and hands-on
            training in prompting, AI workflows, and real-world automation.
          </p>
          <p className="text-base leading-relaxed text-dark/70">
            From self-paced AI literacy tracks to custom corporate upskilling
            programs tailored to your SOPs, ageni equips learners at every
            level — whether you&apos;re earning your first credential or
            certifying an entire workforce. Powered by proprietary AI avatar
            tutors available 24/7, the platform scales from individual
            learners to thousands across Southeast Asia and beyond.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px bg-dark/10" />

        {/* Stats row + button */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid flex-1 grid-cols-2 gap-y-10 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <p className="font-title text-4xl font-bold text-dark lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="shrink-0"
          >
            <Link
              href="/"
              onMouseEnter={moreFill.onMouseEnter}
              onMouseLeave={moreFill.onMouseLeave}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-dark/20 px-7 py-3.5 text-sm font-medium text-dark transition-colors duration-300 hover:border-primary"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 motion-reduce:hidden"
                style={radialFillStyle}
              />
              <span className="relative z-10">More about us</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
