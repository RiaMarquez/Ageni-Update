"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, type MouseEvent as ReactMouseEvent } from "react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "dark" | "cta";
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
};

const base =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors";

const variants = {
  primary:
    "group bg-primary text-dark px-7 py-3 font-semibold hover:text-white",
  outline:
    "group border border-muted/30 text-dark px-7 py-3 hover:border-primary hover:text-dark",
  dark: "group bg-dark text-white px-7 py-3 hover:text-dark",
  cta: "group bg-white text-dark pl-6 pr-2 py-2 shadow-sm",
} as const;

/* Fill colour per variant. Mint over white/transparent/dark works; on a mint
   primary base we fill with dark navy so the radial expansion is visible. */
const FILL_BG: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-dark",
  outline: "bg-primary",
  dark: "bg-primary",
  cta: "bg-primary",
};

const RADIAL_FILL_VARIANTS = new Set(["cta", "outline", "primary", "dark"]);

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  arrow = false,
}: ButtonProps) {
  const hasFill = RADIAL_FILL_VARIANTS.has(variant);

  const onEnter = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = 2 * Math.hypot(rect.width, rect.height);
    el.style.setProperty("--fill-x", `${x}px`);
    el.style.setProperty("--fill-y", `${y}px`);
    el.style.setProperty("--fill-w", `${diameter}px`);
    el.style.setProperty("--fill-duration", "450ms");
    el.style.setProperty("--fill-easing", "cubic-bezier(0.22,1,0.36,1)");
  }, []);

  const onLeave = useCallback((e: ReactMouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--fill-x", `${x}px`);
    el.style.setProperty("--fill-y", `${y}px`);
    el.style.setProperty("--fill-w", `0px`);
    el.style.setProperty("--fill-duration", "350ms");
    el.style.setProperty("--fill-easing", "cubic-bezier(0.55,0,0.68,0.99)");
  }, []);

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  const fillLayer = hasFill ? (
    <span
      aria-hidden
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full motion-reduce:hidden ${FILL_BG[variant]}`}
      style={{
        left: "var(--fill-x, 50%)",
        top: "var(--fill-y, 50%)",
        width: "var(--fill-w, 0px)",
        height: "var(--fill-w, 0px)",
        transition:
          "width var(--fill-duration, 450ms) var(--fill-easing, ease-out), height var(--fill-duration, 450ms) var(--fill-easing, ease-out)",
      }}
    />
  ) : null;

  const content = (
    <>
      {fillLayer}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && variant === "cta" ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 delay-200 group-hover:bg-dark">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : arrow ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : null}
      </span>
    </>
  );

  const interactive = hasFill
    ? { onMouseEnter: onEnter, onMouseLeave: onLeave }
    : {};

  if (href) {
    return (
      <Link href={href} className={classes} {...interactive}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...interactive}>
      {content}
    </button>
  );
}
