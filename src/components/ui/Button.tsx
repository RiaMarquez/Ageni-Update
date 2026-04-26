"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRadialFill, radialFillStyle } from "./useRadialFill";

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
  const fill = useRadialFill();

  const classes = `${base} ${variants[variant]} ${className}`.trim();

  const fillLayer = hasFill ? (
    <span
      aria-hidden
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full motion-reduce:hidden ${FILL_BG[variant]}`}
      style={radialFillStyle}
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
    ? { onMouseEnter: fill.onMouseEnter, onMouseLeave: fill.onMouseLeave }
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
