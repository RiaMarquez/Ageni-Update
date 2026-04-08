"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";


const INDUSTRIES = [
  {
    name: "Enterprise / Corporate",
    description:
      "We train executive teams and departments to leverage AI across their organization:",
    useCases: [
      { label: "Strategic planning:", text: "AI-driven scenario modeling, competitive analysis, and long-range forecasting for leadership teams;" },
      { label: "Workflow automation:", text: "identifying repetitive processes and deploying AI tools to eliminate bottlenecks;" },
      { label: "Knowledge management:", text: "building internal AI assistants that surface institutional knowledge on demand;" },
      { label: "Decision support:", text: "training teams to use AI for data synthesis, reporting, and real-time analytics." },
    ],
    video: "enterprise.mp4",
  },
  {
    name: "Education / Universities",
    description:
      "Our programs help faculty and students adopt AI responsibly for teaching and research:",
    useCases: [
      { label: "Personalized learning:", text: "adaptive content paths that meet each student where they are;" },
      { label: "AI-assisted research:", text: "literature review, data analysis, and hypothesis generation with AI tools;" },
      { label: "Automated assessment:", text: "AI-powered grading, rubric alignment, and feedback loops;" },
      { label: "Curriculum design:", text: "embedding AI literacy across disciplines, not just computer science." },
    ],
    video: "education.mp4",
  },
  {
    name: "BPO / Operations",
    description:
      "We deliver training that integrates AI into daily operations without disrupting SLAs:",
    useCases: [
      { label: "Quality assurance:", text: "automated call scoring, compliance monitoring, and performance benchmarking;" },
      { label: "Ticket resolution:", text: "AI-assisted triage, response drafting, and escalation routing;" },
      { label: "Agent upskilling:", text: "moving agents from transactional tasks to higher-value consultative roles;" },
      { label: "Process optimization:", text: "mapping workflows to identify AI automation opportunities." },
    ],
    video: "bpo.mp4",
  },
  {
    name: "Healthcare",
    description:
      "Our training ensures teams adopt AI safely within regulatory frameworks:",
    useCases: [
      { label: "Clinical documentation:", text: "automated charting, note summarization, and discharge instructions;" },
      { label: "Diagnostics support:", text: "AI-aided imaging analysis, symptom triage, and pattern recognition;" },
      { label: "Patient data analysis:", text: "population health insights, readmission prediction, and resource allocation;" },
      { label: "Compliance:", text: "HIPAA-safe AI adoption, audit trails, and regulatory alignment." },
    ],
    video: "healthcare.mp4",
  },
  {
    name: "Finance / Fintech",
    description:
      "We train analysts and compliance officers to use AI tools confidently:",
    useCases: [
      { label: "Risk modeling:", text: "AI-powered credit scoring, market analysis, and stress testing;" },
      { label: "Fraud detection:", text: "real-time transaction monitoring and anomaly identification;" },
      { label: "Portfolio management:", text: "AI-assisted asset allocation, rebalancing, and client reporting;" },
      { label: "Regulatory compliance:", text: "automated reporting, audit preparation, and policy monitoring." },
    ],
    video: "finance.mp4",
  },
  {
    name: "Technology / SaaS",
    description:
      "We help engineering and product teams adopt AI that accelerates shipping:",
    useCases: [
      { label: "Dev workflows:", text: "AI-assisted coding, debugging, and pull request review;" },
      { label: "Code review:", text: "automated quality checks, vulnerability scanning, and style enforcement;" },
      { label: "Product AI:", text: "embedding intelligence into features — search, recommendations, content generation;" },
      { label: "Documentation:", text: "auto-generating API docs, changelogs, and user guides from code." },
    ],
    video: "technology.mp4",
  },
  {
    name: "Government / NGO",
    description:
      "We provide training that accounts for transparency and public trust requirements:",
    useCases: [
      { label: "Policy analysis:", text: "AI-driven impact modeling, legislative comparison, and public sentiment analysis;" },
      { label: "Citizen services:", text: "chatbots, form processing, and automated case management;" },
      { label: "Data governance:", text: "responsible AI frameworks, bias audits, and data stewardship;" },
      { label: "Reporting:", text: "automated compliance reports, grant tracking, and performance dashboards." },
    ],
    video: "government.mp4",
  },
  {
    name: "Manufacturing",
    description:
      "Our training equips floor managers and operations teams with practical AI skills:",
    useCases: [
      { label: "Predictive maintenance:", text: "sensor data analysis, failure prediction, and maintenance scheduling;" },
      { label: "Supply chain:", text: "demand forecasting, inventory optimization, and supplier risk assessment;" },
      { label: "Quality control:", text: "computer vision inspection, defect classification, and process adjustment;" },
      { label: "Safety monitoring:", text: "real-time hazard detection, compliance tracking, and incident analysis." },
    ],
    video: "manufacturing.mp4",
  },
];

function IndustryRow({ industry, index, open, onToggle }: { industry: (typeof INDUSTRIES)[number]; index: number; open: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    videoRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.06 * index }}
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-accent border border-white/[0.06] transition-shadow hover:shadow-md"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
    >
      {/* Video — absolutely positioned top-right, always in the same spot */}
      <div
        className="pointer-events-auto absolute right-6 top-4 z-10 hidden lg:block lg:right-8 lg:top-5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={`/media/industries/${industry.video}`}
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="noplaybackrate"
          className={`h-auto w-[280px] rounded-xl object-cover transition-all duration-500 lg:w-[320px] ${
            hovered ? "grayscale-0" : "grayscale"
          }`}
        />
      </div>

      {/* Content — left side, with right padding to avoid overlapping the image */}
      <div className="px-6 py-6 lg:px-8 lg:py-7 lg:pr-[360px]">
        {/* Header row — icon + name */}
        <div className="flex items-center gap-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-dark">
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative flex h-5 w-5 items-center justify-center"
            >
              {/* Horizontal bar (always visible) */}
              <span className="absolute h-[2.5px] w-5 rounded-full bg-current" />
              {/* Vertical bar (fades + rotates out when open) */}
              <motion.span
                animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute h-[2.5px] w-5 rotate-90 rounded-full bg-current"
              />
            </motion.span>
          </span>

          <span className={`transition-all duration-300 ${open ? "font-title text-2xl font-semibold italic text-white lg:text-3xl" : "text-lg font-semibold text-white lg:text-xl"}`}>
            {industry.name}
          </span>
        </div>

        {/* Expandable description + use cases */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 lg:pl-[60px]">
                <p className="mb-6 text-sm leading-relaxed text-white/50 lg:text-base lg:leading-relaxed">
                  {industry.description}
                </p>

                <div className="flex flex-col gap-5">
                  {industry.useCases.map((uc) => (
                    <div key={uc.label} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-primary">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-white/45">
                        <strong className="font-semibold text-white">{uc.label}</strong>{" "}
                        {uc.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function useInteractiveGradient() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const gradient = gradientRef.current;
    if (!section || !gradient) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      rendered.current.x = lerp(rendered.current.x, mouse.current.x, 0.08);
      rendered.current.y = lerp(rendered.current.y, mouse.current.y, 0.08);
      gradient.style.background = `radial-gradient(600px circle at ${rendered.current.x}px ${rendered.current.y}px, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.04) 35%, transparent 70%)`;
      raf.current = requestAnimationFrame(animate);
    };

    section.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return { sectionRef, gradientRef };
}

const VIDEOS = INDUSTRIES.map((i) => `/media/industries/${i.video}`);

function CyclingBackground({ openIndex }: { openIndex: number | null }) {
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    if (openIndex !== null) return;
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [openIndex]);

  const activeIndex = openIndex !== null ? openIndex : cycleIndex;
  const boosted = openIndex !== null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
            i === activeIndex
              ? boosted
                ? "opacity-[0.18]"
                : "opacity-[0.14]"
              : "opacity-0"
          }`}
        />
      ))}
      {/* Darken edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />
    </div>
  );
}

export default function CTABanner() {
  const { sectionRef, gradientRef } = useInteractiveGradient();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="industries" className="relative bg-dark -mt-10 pt-20 pb-22 lg:-mt-20 lg:pt-36 lg:pb-40 overflow-hidden">
      {/* Cycling background videos */}
      <CyclingBackground openIndex={openIndex} />
      {/* Interactive gradient overlay */}
      <div ref={gradientRef} className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-title text-4xl font-semibold italic leading-[1.05] text-white sm:text-5xl lg:text-7xl"
        >
          Industries <span className="text-primary">we cover</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 mb-10 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base lg:mt-6 lg:mb-16"
        >
          Our AI literacy programs adapt to the language, workflows, and compliance
          needs of your sector — so every team learns AI in context.
        </motion.p>

        {/* Expandable rows */}
        <div className="flex flex-col gap-4">
          {INDUSTRIES.map((industry, i) => (
            <IndustryRow key={industry.name} industry={industry} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
