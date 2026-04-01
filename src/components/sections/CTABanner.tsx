"use client";

import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] rounded-b-[2.5rem] bg-dark py-24">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end overflow-hidden">
        <span className="translate-x-20 translate-y-16 text-[16vw] font-bold leading-none tracking-tighter text-white/[0.03]">
          Let&apos;s go
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
          Want to upskill your workforce?
        </h2>
        <p className="mt-6 max-w-xl text-base text-white/50">
          Tell us about your training needs, and we&apos;ll find the right
          program during our consultation.
        </p>
        <div className="mt-10">
          <Button href="#contact" variant="cta" arrow>
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
