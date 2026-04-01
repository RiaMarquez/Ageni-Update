"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PRICING_TIERS } from "@/lib/constants";

export default function Pricing() {
  return (
    <SectionWrapper id="pricing" className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Badge className="bg-primary/[0.07] text-primary/55">Pricing</Badge>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Transparent pricing. No subscriptions. No hidden fees.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/40">
            Every plan is a one-time investment in verified AI mastery. Pick the
            track that fits your role and start learning today.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col rounded-xl overflow-hidden ${
                tier.featured
                  ? "bg-white text-dark"
                  : "border border-white/10 bg-white/[0.03] text-white"
              }`}
            >
              {/* Top accent bar */}
              <div
                className={`h-1 ${
                  tier.featured ? "bg-primary" : "bg-white/10"
                }`}
              />

              <div className="flex flex-1 flex-col p-6">
                {/* Tag */}
                <span
                  className={`inline-block self-start rounded-full px-3 py-1 text-xs font-medium ${
                    tier.featured
                      ? "bg-primary/10 text-primary"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {tier.tag}
                </span>

                {/* Price */}
                <p className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                </p>
                <p
                  className={`mt-1 text-xs ${
                    tier.featured ? "text-muted" : "text-white/40"
                  }`}
                >
                  {tier.priceNote}
                </p>

                {/* One-time label */}
                <p
                  className={`mt-2 text-[10px] font-semibold tracking-widest uppercase ${
                    tier.featured ? "text-muted/60" : "text-white/20"
                  }`}
                >
                  ONE-TIME &middot; NO RENEWAL
                </p>

                {/* Description */}
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    tier.featured ? "text-muted" : "text-white/50"
                  }`}
                >
                  {tier.description}
                </p>

                {/* Divider */}
                <hr
                  className={`my-5 ${
                    tier.featured ? "border-muted/10" : "border-white/10"
                  }`}
                />

                {/* Features */}
                <ul className="flex-1 space-y-2">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        tier.featured ? "text-dark" : "text-white/60"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          tier.featured ? "bg-primary" : "bg-white/30"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6">
                  <Button
                    href="#contact"
                    variant={tier.featured ? "primary" : "outline"}
                    className={`w-full ${
                      !tier.featured
                        ? "border-white/20 text-white hover:border-primary hover:text-primary"
                        : ""
                    }`}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-xs text-white/20">
          Enterprise and volume pricing available. Commission structures apply
          for partnership referrals.
        </p>
      </div>
    </SectionWrapper>
  );
}
