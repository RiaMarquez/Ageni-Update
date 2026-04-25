import Image from "next/image";
import type { CaseStudyMediaItem } from "./types";

type Props = { id?: string; items: CaseStudyMediaItem[] };

export default function CaseStudyMediaShowcase({ id, items }: Props) {
  return (
    <section id={id} className="bg-white py-20 lg:py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 lg:gap-20 lg:px-10">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.4fr]"
          >
            <div>
              <h3 className="font-title text-2xl font-semibold text-dark lg:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dark/60 lg:text-base">
                {item.caption}
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
              {item.src ? (
                item.kind === "video" ? (
                  <video
                    src={item.src}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                )
              ) : (
                // TODO: replace with final asset
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
                  Placeholder — {item.title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
