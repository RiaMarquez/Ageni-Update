"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] bg-dark pt-28 pb-0">
      {/* Watermark text */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
        <span className="translate-y-20 text-[14vw] font-bold leading-none tracking-tighter text-white/[0.03]">
          ageni.ai
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="pb-16 lg:pb-28"
          >
            <h1 className="text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Creating and delivering engaging AI literacy courses and
              certifications at any scale
            </h1>

            <div className="mt-10">
              <Button href="#contact" variant="cta" arrow>
                Contact us
              </Button>
            </div>
          </motion.div>

          {/* Right — Visual placeholder (rounded like BlueCarrot's teal card) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#4CE0B3] via-[#3DD9AD] to-[#2CC89A]">
              {/* Decorative elements matching BlueCarrot's playful illustration style */}
              <div className="relative h-full w-full p-8">
                {/* Purple circles */}
                <div className="absolute top-4 left-6 h-16 w-16 rounded-full bg-[#7B5BD5]/80" />
                <div className="absolute bottom-8 left-12 h-20 w-20 rounded-full bg-[#7B5BD5]/60" />
                <div className="absolute top-6 right-0 h-24 w-24 rounded-full bg-[#3DD9AD]/80 border-4 border-[#4F5BD5]/30" />
                <div className="absolute bottom-0 right-0 h-20 w-20 rounded-full border-4 border-white/40" />

                {/* Dot grid pattern */}
                <div className="absolute top-8 left-14 grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#7B5BD5]/50" />
                  ))}
                </div>

                {/* Wavy lines */}
                <svg className="absolute bottom-12 left-6 h-6 w-16 text-white/60" viewBox="0 0 64 24">
                  <path d="M0 12 Q8 0 16 12 T32 12 T48 12 T64 12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M0 18 Q8 6 16 18 T32 18 T48 18 T64 18" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Cursor icons */}
                <svg className="absolute right-20 bottom-16 h-6 w-6 text-[#7B5BD5]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>
                <svg className="absolute right-12 top-1/2 h-5 w-5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-medium italic text-[#7B5BD5]/70">
                    AI literacy
                  </span>
                </div>

                {/* Plus icon */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-sm bg-white/30 text-white text-lg">+</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
