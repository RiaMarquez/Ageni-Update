import { TRUST_LOGOS } from "@/lib/constants";

export default function TrustBar() {
  return (
    <section className="border-b border-muted/10 bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
          {TRUST_LOGOS.map((logo) => (
            <span
              key={logo.name}
              className="text-xs font-medium uppercase tracking-wider text-dark"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
