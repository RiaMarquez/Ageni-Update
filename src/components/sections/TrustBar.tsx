"use client";

import Image from "next/image";
import { TRUST_LOGOS } from "@/lib/constants";

export default function TrustBar() {
  return (
    <section className="relative -mt-10 z-10 rounded-t-[3rem] bg-light pt-10 pb-6 lg:-mt-20 lg:rounded-t-[5rem] lg:pt-16 lg:pb-8">
      <div className="overflow-hidden">
        {/* Two identical strips; animation translates -50% for seamless infinite loop */}
        <div className="flex w-max animate-marquee">
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-28 px-14">
              {TRUST_LOGOS.map((logo) => (
                <Image
                  key={`${logo.name}-${copy}`}
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain opacity-40 grayscale"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
