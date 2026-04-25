import type { CaseStudyTestimonialContent } from "./types";

type Props = { heading: string; content: CaseStudyTestimonialContent };

export default function CaseStudyTestimonial({ heading, content }: Props) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 md:grid-cols-[1fr_1.5fr] lg:gap-20 lg:px-10">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <div>
          <p className="text-base leading-relaxed text-dark/80 lg:text-lg">
            {content.quote}
          </p>
          <div className="mt-6">
            <div className="font-title text-base font-semibold text-dark">
              {content.authorName}
            </div>
            <div className="text-sm text-dark/60">
              {content.authorRole}, {content.authorCompany}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
