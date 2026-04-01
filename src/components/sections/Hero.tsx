"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-dark pt-32 pb-20">
      {/* gradient placeholder */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-dark via-accent to-dark" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ageni is a virtual learning platform to power the next generation,
            wherever they might be.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/60">
            For students, professionals, founders, and business owners using AI
            in real work.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/auth" variant="primary">
              Get Started
            </Button>
            <Button
              href="#contact"
              variant="outline"
              className="border-white/20 text-white hover:border-primary hover:text-primary"
            >
              Book a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
