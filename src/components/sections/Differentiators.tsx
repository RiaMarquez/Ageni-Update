"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";

const VIDEOS = [
  "/media/cards/mastery.mp4",
  "/media/cards/anti.mp4",
  "/media/cards/employer.mp4",
  "/media/cards/device.mp4",
];

const CATEGORIES = [
  "Certification",
  "Assessment",
  "Analytics",
  "Delivery",
];

export default function Differentiators() {
  return (
    <SectionWrapper
      id="differentiators"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header row */}
        <div className="flex items-end justify-between gap-6 pb-10">
          <h2 className="font-title text-5xl font-semibold leading-[0.95] text-dark sm:text-6xl lg:text-7xl">
            What makes us{" "}
            <em className="italic text-primary">different</em>
          </h2>
          <Link
            href="#contact"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-dark/15 bg-white px-5 py-2.5 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white sm:inline-flex"
          >
            Learn more
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Top divider */}
        <div className="h-px w-full bg-dark/10" />

        {/* Rows */}
        <div className="flex flex-col">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 items-center gap-6 border-b border-dark/10 py-10 lg:gap-10 lg:py-12"
            >
              {/* Thumbnail */}
              <div className="col-span-12 md:col-span-3">
                <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-dark/[0.04]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={VIDEOS[i]}
                  />
                </div>
              </div>

              {/* Title + category */}
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-title text-2xl font-semibold leading-tight text-dark lg:text-[32px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-primary">
                  {CATEGORIES[i]}
                </p>
              </div>

              {/* Description + actions */}
              <div className="col-span-12 md:col-span-5">
                <p className="text-sm leading-relaxed text-dark/60 lg:text-base">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="#contact"
                    className="rounded-full border border-dark/15 bg-white px-5 py-2 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
                  >
                    More
                  </Link>
                  <Link
                    href="#contact"
                    className="rounded-full border border-dark/15 bg-white px-5 py-2 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
                  >
                    View demo
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white px-6 py-3 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
          >
            Learn more about our platform
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
