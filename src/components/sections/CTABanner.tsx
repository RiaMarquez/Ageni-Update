"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import IndustriesParticles from "@/components/ui/IndustriesParticles";

/* ── data ── */
const INDUSTRIES = [
  {
    name: "Enterprise",
    overview:
      "AI-driven scenario modeling, workflow automation, knowledge management, and decision support for leadership teams.",
    tags: ["Workflow Automation", "Decision Support", "Knowledge Management"],
    sector: "Corporate",
    programs: "AI Literacy · Custom Skills",
    video: "enterprise.mp4",
  },
  {
    name: "Education",
    overview:
      "Adaptive learning paths, AI-assisted research, automated assessment, and AI literacy across disciplines.",
    tags: ["Adaptive Learning", "AI Research", "Automated Assessment"],
    sector: "Universities & Institutions",
    programs: "AI Literacy · Faculty Training",
    video: "education.mp4",
  },
  {
    name: "BPO",
    overview:
      "Automated quality assurance, AI-assisted ticket resolution, agent upskilling, and workflow optimization.",
    tags: ["Quality Assurance", "Agent Upskilling", "Process Optimization"],
    sector: "Operations & Outsourcing",
    programs: "Agent Upskilling · QA Automation",
    video: "bpo.mp4",
  },
  {
    name: "Healthcare",
    overview:
      "Clinical documentation, diagnostic support, patient data analysis, and HIPAA-safe AI adoption.",
    tags: ["Clinical AI", "Diagnostic Support", "HIPAA Compliance"],
    sector: "Medical & Pharma",
    programs: "AI Literacy · Compliance Training",
    video: "healthcare.mp4",
  },
  {
    name: "Finance",
    overview:
      "AI-powered risk modeling, real-time fraud detection, portfolio management, and regulatory compliance.",
    tags: ["Risk Modeling", "Fraud Detection", "Regulatory Compliance"],
    sector: "Banking & Fintech",
    programs: "AI Literacy · Risk Intelligence",
    video: "finance.mp4",
  },
  {
    name: "Technology",
    overview:
      "AI-assisted dev workflows, automated code review, product intelligence, and documentation generation.",
    tags: ["Dev Workflows", "Code Review", "Product Intelligence"],
    sector: "SaaS & Software",
    programs: "AI Literacy · Dev Productivity",
    video: "technology.mp4",
  },
  {
    name: "Government",
    overview:
      "Policy analysis, citizen service automation, responsible AI frameworks, and transparent reporting.",
    tags: ["Policy Analysis", "Citizen Services", "Responsible AI"],
    sector: "Public Sector & NGO",
    programs: "AI Literacy · Responsible AI",
    video: "government.mp4",
  },
  {
    name: "Manufacturing",
    overview:
      "Predictive maintenance, supply chain optimization, computer vision QC, and real-time safety monitoring.",
    tags: ["Predictive Maintenance", "Supply Chain", "Computer Vision QC"],
    sector: "Industrial & Production",
    programs: "AI Literacy · Predictive Systems",
    video: "manufacturing.mp4",
  },
];

/* ── main ── */
export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* video entrance: clip-reveal after section fills viewport */
  const videoClipPath = useTransform(
    scrollYProgress,
    [0, 0.06],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  const count = INDUSTRIES.length;
  /* tight trigger — industries start switching almost immediately */
  const indexProgress = useTransform(scrollYProgress, [0.08, 0.92], [0, count - 0.01]);

  useMotionValueEvent(indexProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v), count - 1);
    setActiveIndex(Math.max(0, idx));
  });

  /* smooth scroll-driven Y offset for the name stack (rem units) */
  const LINE_H = 6.5; // height per item in rem — matches the font leading
  const nameStackY = useTransform(indexProgress, (v) => `${-v * LINE_H}rem`);

  const active = INDUSTRIES[activeIndex];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      id="industries"
      ref={containerRef}
      className="relative rounded-t-[2rem] bg-[#1E293B] lg:rounded-t-[3rem]"
      style={{ height: `${count * 35}vh` }}
    >
      {/* ── sticky viewport ── */}
      <div className="sticky top-0 flex h-screen w-full overflow-hidden">

        {/* Drifting dot field — sits behind everything inside the sticky viewport */}
        <IndustriesParticles color="175, 222, 218" />

        {/* ═══════════════ LEFT COLUMN ═══════════════ */}
        <div className="relative flex w-full flex-col lg:w-[45%]">

          {/* video — flush, no frame, clip-reveal on scroll */}
          <motion.div
            style={{ clipPath: videoClipPath }}
            className="relative z-10 ml-4 mt-4 aspect-square w-full max-w-[380px] overflow-hidden bg-white/[0.02]"
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={active.video}
                src={`/media/industries/${active.video}`}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {/* metadata rows */}
          <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-8 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm"
              >
                {/* Overview */}
                <div className="flex gap-6 border-t border-white/[0.08] py-4">
                  <p className="w-20 shrink-0 text-[12px] font-semibold text-white/70">Overview</p>
                  <p className="text-[12px] leading-[1.65] text-white/40">
                    {active.overview}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex gap-6 border-t border-white/[0.08] py-4">
                  <p className="w-20 shrink-0 text-[12px] font-semibold text-white/70">Tags</p>
                  <div className="flex flex-col gap-0.5">
                    {active.tags.map((tag) => (
                      <span key={tag} className="text-[12px] text-white/40">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div className="flex gap-6 border-t border-white/[0.08] py-4">
                  <p className="w-20 shrink-0 text-[12px] font-semibold text-white/70">Industry</p>
                  <p className="text-[12px] text-white/40">{active.sector}</p>
                </div>

                {/* Client */}
                <div className="flex gap-6 border-t border-white/[0.08] py-4">
                  <p className="w-20 shrink-0 text-[12px] font-semibold text-white/70">Client</p>
                  <p className="text-[12px] text-white/40">{active.name}</p>
                </div>

                {/* Explore */}
                <div className="border-t border-white/[0.08] pt-4">
                  <button className="group flex items-center gap-2 text-[12px] font-medium text-white/60 transition-colors hover:text-primary">
                    Explore the sector
                    <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ═══════════════ CENTER: counter ═══════════════ */}
        <div className="hidden items-center lg:flex">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-sm tabular-nums text-white/25"
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ═══════════════ RIGHT COLUMN: name stack ═══════════════ */}
        <div className="hidden flex-1 flex-col lg:flex">

          {/* menu button + dropdown — top right */}
          <div className="relative z-20 flex justify-end px-8 pt-12 lg:px-12 xl:px-16">
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/25 hover:bg-white/5"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X className="h-4 w-4 text-white/70" />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-4 w-4 text-white/50 transition-colors group-hover:text-white/80" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* glass mini-menu — landscape, to the left of button */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 12, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 12, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-14 top-0 origin-right overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.06] shadow-2xl backdrop-blur-xl"
                  >
                    <nav className="flex items-center gap-1 px-2 py-1.5">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.label}
                          href={"hasDropdown" in link ? "/#services" : link.href}
                          onClick={() => setMenuOpen(false)}
                          className="whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white/90"
                        >
                          {link.label}
                        </Link>
                      ))}
                      <div className="mx-1 h-5 w-px bg-white/[0.08]" />
                      <Link
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="whitespace-nowrap rounded-full bg-primary/15 px-5 py-2 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/25"
                      >
                        Get Started
                      </Link>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* names — same size, only opacity changes, scroll-driven vertical slide */}
          <div className="relative flex flex-1 overflow-hidden pl-8 lg:pl-12 xl:pl-16">
            <motion.div
              className="flex flex-col will-change-transform"
              style={{ y: nameStackY, paddingTop: "calc(50vh - 3.25rem)" }}
            >
              {INDUSTRIES.map((ind, i) => {
                const distance = Math.abs(i - activeIndex);
                const isActive = i === activeIndex;
                const opacity = isActive ? 1 : distance === 1 ? 0.2 : distance === 2 ? 0.1 : 0.05;

                return (
                  <motion.span
                    key={ind.name}
                    animate={{ opacity }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="font-title block font-bold"
                    style={{
                      fontSize: "clamp(3.2rem, 5.5vw, 6.5rem)",
                      lineHeight: "6.5rem",
                      color: isActive ? "#ffffff" : `rgba(255,255,255,${opacity})`,
                      transition: "color 0.4s ease-out",
                    }}
                  >
                    {ind.name}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* mobile: active industry name at bottom */}
        <div className="absolute bottom-20 right-8 z-10 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="font-title block text-right text-4xl font-bold leading-none text-white sm:text-6xl"
            >
              {active.name}
            </motion.span>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
