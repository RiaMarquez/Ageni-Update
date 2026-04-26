import Image from "next/image";
import type { CaseStudyProseContent } from "./types";

type Props = { content: CaseStudyProseContent };

export default function CaseStudyProse({ content }: Props) {
  const imageSide = content.imageSide ?? "right";
  const hasImage = !!content.image;

  const ImageBlock = hasImage ? (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
      {content.image?.src ? (
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
          {content.image?.caption ?? "Placeholder — replace with final asset"}
        </div>
      )}
    </div>
  ) : null;

  const TextBlock = (
    <div>
      <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
        {content.heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-dark/70 lg:text-lg">
        {content.body}
      </p>
    </div>
  );

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {hasImage ? (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {imageSide === "left" ? (
              <>
                {ImageBlock}
                {TextBlock}
              </>
            ) : (
              <>
                {TextBlock}
                {ImageBlock}
              </>
            )}
          </div>
        ) : (
          <div className="max-w-3xl">{TextBlock}</div>
        )}
      </div>
    </section>
  );
}
