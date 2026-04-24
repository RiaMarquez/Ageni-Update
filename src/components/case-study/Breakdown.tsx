import type { CaseStudyBreakdownItem } from "./types";

type Props = {
  heading: string;
  intro?: string;
  items: CaseStudyBreakdownItem[];
};

export default function CaseStudyBreakdown({ heading, intro, items }: Props) {
  return (
    <section className="bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-[26px] md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
            {heading}
          </h2>
          {intro && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-dark/70">
              {intro}
            </p>
          )}
        </div>

        <ol className="relative flex max-h-[420px] flex-col gap-4 overflow-y-auto pr-2">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="list-none rounded-2xl bg-white p-6 shadow-[0_1px_0_0_rgba(45,58,74,0.06)]"
            >
              <div className="text-sm font-medium text-primary">{i + 1}</div>
              <h3 className="mt-2 font-title text-xl font-semibold text-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/70">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
