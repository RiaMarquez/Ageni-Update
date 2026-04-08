"use client";

import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AdvisoryParticles from "@/components/ui/AdvisoryParticles";

export default function Advisory() {
  return (
    <SectionWrapper className="noise-bg relative -mt-6 overflow-hidden bg-dark pt-22 pb-16 lg:-mt-12 lg:pt-40 lg:pb-28">
      {/* Floating particle field */}
      <AdvisoryParticles />
      {/* Golden accent line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Quote */}
          <div>
            <span className="mb-2 block text-7xl font-bold leading-none text-primary/20">
              &ldquo;
            </span>
            <blockquote className="font-title text-2xl font-medium italic leading-relaxed text-white sm:text-3xl">
              Most AI training is built for developers. ageni.ai is built
              for everyone else&nbsp;&mdash; the employees who use AI every day
              but have no training built for them.
            </blockquote>
            <div className="mt-8">
              <p className="text-base font-semibold text-white">Timothy Ngo</p>
              <p className="text-sm text-white/40">CEO, Iozera Inc.</p>
            </div>
          </div>

          {/* Right — Photo placeholder with heartbeat + orbiting dot */}
          <div className="flex items-center justify-center">
            <div className="relative animate-advisory-heartbeat">
              {/* Pulsing rings — expand outward and fade */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/40"
                  style={{
                    animation: `advisory-ring-pulse 4s ease-out ${i * 1}s infinite`,
                  }}
                />
              ))}
              <div className="h-64 w-64 rounded-full border-2 border-primary/30 bg-white/5 lg:h-80 lg:w-80 overflow-hidden">
                <Image
                  src="/media/icons/tim.png"
                  alt="Timothy Ngo"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-6 rounded-full bg-white/5 pointer-events-none" />
              {/* Orbiting golden dot */}
              <div className="absolute inset-0 animate-advisory-orbit">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-primary/60 shadow-[0_0_12px_rgba(201,162,39,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
