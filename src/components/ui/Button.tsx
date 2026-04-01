import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "dark" | "cta";
  className?: string;
  onClick?: () => void;
  arrow?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all";

const variants = {
  primary: "bg-primary text-white px-7 py-3 hover:brightness-110 hover:-translate-y-0.5",
  outline:
    "border border-muted/30 text-dark px-7 py-3 hover:border-primary hover:text-primary",
  dark: "bg-dark text-white px-7 py-3 hover:bg-dark/90 hover:-translate-y-0.5",
  /* BlueCarrot-style CTA: white pill with blue arrow circle */
  cta: "bg-white text-dark pl-6 pr-2 py-2 hover:-translate-y-0.5 shadow-sm",
} as const;

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  arrow = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  const content = (
    <>
      {children}
      {arrow && variant === "cta" ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      ) : arrow ? (
        <ArrowUpRight className="h-4 w-4" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
