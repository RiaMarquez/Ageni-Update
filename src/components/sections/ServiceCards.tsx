"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const CARD_1 = {
  title: "AI Literacy\nTraining",
  initials: "AL",
  description:
    "We close the gap between AI adoption and real-world AI skill. Our structured programs blend instructional design, mastery-verified assessments, and AI avatar tutors to take individuals and teams from AI-curious to AI-competent.",
  categoryLabel: "Training services",
  tags: [
    { label: "Prompt Mastery Assessment", href: "/#pricing" },
    { label: "AI Foundations Course", href: "/#how-it-works" },
    { label: "AI for Business Leaders", href: "/#pricing" },
    { label: "Self-Paced Learning Modules", href: "/#how-it-works" },
    { label: "AI Avatar Tutoring", href: "/#differentiators" },
  ],
};

const CARD_2 = {
  title: "Custom Job\nSkills Training",
  initials: "JS",
  description:
    "We build role-specific AI training programs tailored to your SOPs and workflows. Organizations get measurable upskilling with analytics-backed reporting so every team member learns AI in the context of the work they already do.",
  categoryLabel: "Upskilling services",
  tags: [
    { label: "Role-Based Assessments", href: "/#industries" },
    { label: "Team Upskilling Programs", href: "/#pricing" },
    { label: "Enterprise Packages", href: "/#pricing" },
    { label: "SOP-Tailored Curricula", href: "/#faq" },
    { label: "Employer Mastery Dashboard", href: "/#differentiators" },
  ],
  secondaryLabel: "By audience",
  secondaryTags: [
    { label: "Enterprise / Corporate", href: "/#industries" },
    { label: "BPO / Operations", href: "/#industries" },
    { label: "Universities", href: "/#industries" },
    { label: "Government / NGO", href: "/#industries" },
  ],
};

function TagPill({ label, href, index }: { label: string; href: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
    >
      <Link
        href={href}
        className="group/pill relative flex items-center justify-between gap-4 overflow-hidden rounded-full bg-light px-5 py-3.5 text-sm font-medium text-dark/80 transition-all duration-300 hover:bg-primary/10 hover:text-dark"
      >
        <span className="absolute inset-0 -translate-x-full bg-primary/[0.06] transition-transform duration-500 ease-out group-hover/pill:translate-x-0" />
        <span className="relative z-10">{label}</span>
        <ArrowUpRight className="relative z-10 h-4 w-4 shrink-0 text-dark/30 transition-all duration-300 group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5 group-hover/pill:text-primary" />
      </Link>
    </motion.div>
  );
}

export default function ServiceCards() {
  return (
    <section className="relative z-10 bg-light pb-10 rounded-b-[3rem] lg:pb-14 lg:rounded-b-[5rem]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl font-title text-4xl font-semibold italic leading-[1.08] text-dark sm:text-5xl lg:text-7xl"
          >
            We train and
            <br />
            certify workforces
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 — AI Literacy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl bg-dark/[0.04] p-8 lg:p-10"
          >
            {/* Card header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="font-title text-3xl font-semibold italic leading-tight text-dark lg:text-4xl">
                {CARD_1.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h3>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-[2.5px] border-primary">
                <Image src="/media/icons/guy.png" alt={CARD_1.initials} fill className="object-cover" />
              </div>
            </div>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-dark/60 lg:text-base lg:leading-relaxed">
              {CARD_1.description}
            </p>

            {/* Category label */}
            <p className="mb-4 text-sm font-semibold text-dark/40">
              {CARD_1.categoryLabel}
            </p>

            {/* Tags */}
            <div className="flex flex-col gap-2.5">
              {CARD_1.tags.map((tag, i) => (
                <TagPill key={tag.label} label={tag.label} href={tag.href} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Card 2 — Custom Job Skills */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-dark/[0.04] p-8 lg:p-10"
          >
            {/* Card header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="font-title text-3xl font-semibold italic leading-tight text-dark lg:text-4xl">
                {CARD_2.title.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h3>
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-[2.5px] border-primary">
                <Image src="/media/icons/lady.png" alt={CARD_2.initials} fill className="object-cover" />
              </div>
            </div>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-dark/60 lg:text-base lg:leading-relaxed">
              {CARD_2.description}
            </p>

            {/* Category label */}
            <p className="mb-4 text-sm font-semibold text-dark/40">
              {CARD_2.categoryLabel}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5">
              {CARD_2.tags.map((tag, i) => (
                <TagPill key={tag.label} label={tag.label} href={tag.href} index={i} />
              ))}
            </div>

            {/* Secondary category */}
            <p className="mb-4 mt-8 text-sm font-semibold text-dark/40">
              {CARD_2.secondaryLabel}
            </p>

            <div className="flex flex-wrap gap-2.5">
              {CARD_2.secondaryTags.map((tag, i) => (
                <TagPill key={tag.label} label={tag.label} href={tag.href} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
