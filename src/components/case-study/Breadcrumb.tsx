import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CaseStudyCrumb } from "./types";

type Props = { items: CaseStudyCrumb[]; className?: string };

export default function CaseStudyBreadcrumb({ items, className = "" }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-white/70 ${className}`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? "text-white" : ""}>
              {item.label}
            </span>
          )}
          {i < items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-white/40" />
          )}
        </span>
      ))}
    </nav>
  );
}
