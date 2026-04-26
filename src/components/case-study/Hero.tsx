import Image from "next/image";
import Link from "next/link";
import CaseStudyBreadcrumb from "./Breadcrumb";
import type { CaseStudyHeroContent } from "./types";

type Props = { content: CaseStudyHeroContent };

export default function CaseStudyHero({ content }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <CaseStudyBreadcrumb items={content.breadcrumbs} className="mb-12" />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-title text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <div className="mt-8">
              <Link
                href={content.ctaHref}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-dark transition-all hover:bg-primary-light"
              >
                {content.ctaLabel}
              </Link>
            </div>

            <dl className="mt-10 space-y-2 text-white/90">
              {content.meta.map((row) => (
                <div key={row.label} className="flex gap-4 text-sm">
                  <dt className="w-32 shrink-0 text-white/60">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
