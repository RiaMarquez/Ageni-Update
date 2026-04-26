import type { CaseStudyBreakdownItem } from "./types";

type Props = {
  heading: string;
  intro?: string;
  items: CaseStudyBreakdownItem[];
};

export default function CaseStudyBreakdown({ heading, intro, items }: Props) {
  return (
    <section className="bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-6 md:grid-cols-[1fr_1.3fr] lg:gap-20 lg:px-10">
        <div className="md:pt-2">
          <span className="inline-block font-medium text-primary text-sm tracking-wide uppercase">
            {String(items.length).padStart(2, "0")} modules
          </span>
          <h2 className="mt-4 font-title text-4xl italic text-dark lg:text-5xl">
            {heading}
          </h2>
          {intro && (
            <p className="mt-6 max-w-md text-base leading-relaxed text-dark/70">
              {intro}
            </p>
          )}
        </div>

        <div className="relative">
          <ol className="cs-scroll relative flex max-h-[520px] flex-col gap-5 overflow-y-auto px-1 py-6 pr-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="group list-none rounded-2xl bg-white p-7 shadow-[0_8px_24px_-12px_rgba(45,58,74,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(45,58,74,0.24)] lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 font-title text-sm font-semibold text-dark transition-colors duration-300 group-hover:bg-primary group-hover:text-dark">
                    {i + 1}
                  </span>
                  <h3 className="font-title text-lg font-semibold text-dark lg:text-xl">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dark/60 lg:text-base">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>

          {/* Top fade — hides cards as they scroll under */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-light to-transparent" />
          {/* Bottom fade — hides cards as they scroll out */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-light to-transparent" />
        </div>
      </div>
    </section>
  );
}
