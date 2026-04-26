"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";

const IMAGES: (string | null)[] = [
  "/media/cards/business-owners.png",
  "/media/cards/university.png",
  null,
  null,
];

const CATEGORIES = [
  "Management",
  "Career Credentials",
  "Workplace Skills",
  "Custom Training",
];

export default function Differentiators() {
  return (
    <div className="bg-dark">
    <SectionWrapper
      id="differentiators"
      className="relative rounded-t-[3rem] bg-white py-20 lg:py-28 sm:rounded-t-[4rem]"
    >
      <div className="mx-auto max-w-[1500px] px-[26px]">
        {/* Header row */}
        <div className="pb-10">
          <h2 className="font-title text-5xl font-semibold leading-[0.95] text-dark sm:text-6xl lg:text-7xl">
            Built for{" "}
            <em className="italic text-primary">all stages</em>
          </h2>
        </div>

        {/* Top divider */}
        <div className="h-px w-full bg-dark/10" />

        {/* Rows */}
        <div className="flex flex-col">
          {DIFFERENTIATORS.map((item, i) => {
            const href = item.href ?? "#contact";
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-b border-dark/10 transition-all duration-300 hover:rounded-3xl hover:border-transparent hover:bg-dark/[0.04]"
              >
                {/* Stretched link covering the whole row. Buttons below are raised above it via z-index so they receive their own clicks. */}
                <Link
                  href={href}
                  aria-label={`Learn more about ${item.title}`}
                  className="absolute inset-0 z-[1] rounded-3xl"
                />

                <div className="relative z-[2] grid grid-cols-12 items-center gap-3 px-4 py-5 lg:gap-5 lg:px-6 lg:py-6">
                  {/* Thumbnail */}
                  <div className="col-span-12 md:col-span-5">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-dark/[0.04] md:w-[70%]">
                      {IMAGES[i] ? (
                        <Image
                          src={IMAGES[i]!}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 768px) 30vw, 100vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-dark/[0.04]">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-dark/40">
                            Coming soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title + category */}
                  <div className="col-span-12 md:col-span-3 md:-ml-32">
                    <h3 className="font-title text-2xl font-semibold leading-tight text-dark lg:text-[32px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {CATEGORIES[i]}
                    </p>
                  </div>

                  {/* Description + actions */}
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-sm leading-relaxed text-dark/60 lg:text-base">
                      {item.description}
                    </p>
                    <div className="pointer-events-auto relative z-[3] mt-4 flex flex-wrap gap-3">
                      <Link
                        href={href}
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
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </SectionWrapper>
    </div>
  );
}
