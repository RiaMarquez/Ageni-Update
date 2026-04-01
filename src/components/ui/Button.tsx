import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-all";

const variants = {
  primary: "bg-primary text-white hover:brightness-110 hover:-translate-y-0.5",
  outline:
    "border border-muted/30 text-dark hover:border-primary hover:text-primary",
} as const;

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
