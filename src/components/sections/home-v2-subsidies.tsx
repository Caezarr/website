"use client";

import { HomeV2Reveal } from "@/components/pages/home-v2/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/surface";
import type { Locale } from "@/i18n/config";
import { commercialPath } from "@/i18n/routes";
import { headingClass } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";
import type { HomeV2Copy } from "@/views/copy/home-v2";

export function HomeV2Subsidies({
  copy,
  locale,
}: {
  copy: HomeV2Copy["subsidies"];
  locale: Locale;
}) {
  const startAiHref = commercialPath("startAi", locale);

  return (
    <section className="bg-background py-14 md:py-20">
      <Section>
        <HomeV2Reveal className="mb-10 md:mb-12">
          <SectionHeader
            align="left"
            eyebrow={<Eyebrow>{copy.eyebrow}</Eyebrow>}
            heading={copy.title}
            body={copy.body}
            headingRole="section"
          />
          <ButtonLink
            href={startAiHref}
            variant="primary"
            className="mt-6 md:mt-8"
          >
            {copy.strategyCta}
          </ButtonLink>
        </HomeV2Reveal>

        <HomeV2Reveal delay={0.06}>
          <p className="type-eyebrow text-text/45 mb-5 md:mb-6">
            {copy.subsidiesTitle}
          </p>
        </HomeV2Reveal>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {copy.cards.map((card, index) => (
            <HomeV2Reveal key={card.title} delay={0.08 + 0.06 * index}>
              <Surface
                variant="card"
                className={cn(
                  "flex h-full min-h-[14rem] flex-col gap-4 bg-mid-gray p-6 md:p-8",
                )}
              >
                <h3 className={cn(headingClass.card, "text-text")}>
                  {card.title}
                </h3>
                <p className="type-paragraph-m text-text/70 flex-1">
                  {card.body}
                </p>
                <ButtonLink
                  href={card.href}
                  variant="underline"
                  className="mt-auto w-fit"
                >
                  {copy.cardCta}
                </ButtonLink>
              </Surface>
            </HomeV2Reveal>
          ))}
        </div>
      </Section>
    </section>
  );
}
