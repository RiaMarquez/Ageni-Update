"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICE_MENU } from "@/lib/constants";
import { useSplash } from "@/components/ui/SplashContext";

export default function Navbar() {
  const { splashDone } = useSplash();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [videoExpanded, setVideoExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hide navbar while the hero video is expanded */
  useEffect(() => {
    const handler = (e: Event) => setVideoExpanded((e as CustomEvent<boolean>).detail);
    window.addEventListener("hero-video-expanded", handler);
    return () => window.removeEventListener("hero-video-expanded", handler);
  }, []);

  /* hide navbar only while the industries section fully covers the viewport */
  useEffect(() => {
    const el = document.getElementById("industries");
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setHidden(rect.top <= 0 && rect.bottom >= window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeServices = () => setServicesOpen(false);

  const isVisible = splashDone && !hidden && !videoExpanded;

  const navVariants = {
    out: {
      opacity: 0,
      y: -120,
      scale: 0.98,
      transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 170,
        damping: 20,
        mass: 0.9,
        when: "beforeChildren",
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    out: { opacity: 0, y: -10 },
    in: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 220, damping: 24 },
    },
  };

  return (
    <motion.nav
      initial="out"
      animate={isVisible ? "in" : "out"}
      variants={navVariants}
      onMouseLeave={closeServices}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-light rounded-b-[5rem] transition-shadow duration-500 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* ── Main bar ─────────────────────────────────────────── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <motion.div variants={itemVariants}>
          <Link href="/" className="shrink-0 block" onMouseEnter={closeServices}>
            <Image src="/media/ageni-logo.png" alt="ageni" width={150} height={50} className="h-[50px] w-auto" />
          </Link>
        </motion.div>

        <motion.ul variants={itemVariants} className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            ("hasDropdown" in link && link.hasDropdown) ? (
              <li key={link.label}>
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  className="flex items-center gap-1 text-sm font-medium text-dark/70 transition-colors hover:text-dark"
                >
                  {link.label}
                  <svg className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </li>
            ) : (
              <li key={link.label} onMouseEnter={closeServices}>
                <Link href={link.href} className="text-sm font-medium text-dark/70 transition-colors hover:text-dark">{link.label}</Link>
              </li>
            )
          )}
        </motion.ul>

        <motion.div variants={itemVariants} className="flex items-center gap-4" onMouseEnter={closeServices}>
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full border-2 border-primary bg-light pl-6 pr-1.5 py-1.5 text-sm font-semibold text-primary transition-all hover:bg-primary/5 lg:inline-flex"
          >
            Get Started
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </span>
          </Link>

          <button className="text-dark lg:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </div>

      {/* ── Full-width services mega menu ────────────────────── */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-dark/[0.06] bg-light shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)]"
            style={{ marginLeft: "auto", marginRight: "auto", width: "calc(100% - 3rem)" }}
          >
            <div>
              <div className="px-6 py-8">
                <div className="flex gap-10">
                  {/* Link columns */}
                  {SERVICE_MENU.columns.map((col, i) => (
                    <div key={col.title} className={`flex-1 ${i > 0 ? "border-l border-dark/[0.06] pl-10" : ""}`}>
                      <h4 className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
                        {col.title}
                      </h4>
                      <ul className="space-y-1">
                        {col.links.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-150 hover:bg-dark/[0.03]"
                            >
                              <div className="flex-1">
                                <span className="block text-sm font-medium text-dark/70 transition-colors group-hover:text-dark">
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-xs text-dark/30 transition-colors group-hover:text-dark/45">
                                  {item.desc}
                                </span>
                              </div>
                              <svg className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-dark/20 opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Promo card */}
                  <div className="flex w-64 shrink-0 flex-col rounded-2xl border border-dark/[0.06] bg-white p-6">
                    <h4 className="font-title text-lg font-bold text-dark">ageni</h4>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-dark/40">
                      AI literacy training and certification — trusted by employers and institutions worldwide.
                    </p>
                    <Link
                      href="/about"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-light"
                    >
                      About us <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-accent px-6 py-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white" onClick={() => setMobileOpen(false)}>ageni</Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-white"><X className="h-6 w-6" /></button>
              </div>
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) =>
                  ("hasDropdown" in link && link.hasDropdown) ? (
                    <li key={link.label} className="flex flex-col gap-2">
                      <span className="text-base font-semibold text-white">{link.label}</span>
                      {SERVICE_MENU.columns.map((col) => (
                        <div key={col.title} className="ml-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{col.title}</p>
                          <ul className="mb-3 space-y-1">
                            {col.links.map((item) => (
                              <li key={item.label}><Link href={item.href} className="block text-sm text-white/60 hover:text-primary" onClick={() => setMobileOpen(false)}>{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  ) : (
                    <li key={link.label}><Link href={link.href} className="text-base font-medium text-white/70 hover:text-primary" onClick={() => setMobileOpen(false)}>{link.label}</Link></li>
                  )
                )}
              </ul>
              <div className="mt-auto pt-6">
                <Link href="#contact" className="flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-5 py-3 text-sm font-semibold text-primary" onClick={() => setMobileOpen(false)}>
                  Get Started <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
