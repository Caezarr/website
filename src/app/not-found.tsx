import Image from "next/image";
import { PageLayout } from "@/components/layout/page-layout";
import { ButtonLink } from "@/components/ui/button";
import { HERO_BG_IMAGE } from "@/components/sections/hero";

export const dynamic = "force-static";

export default function NotFound() {
  return (
    <PageLayout>
      <section
        data-theme="dark"
        className="relative isolate flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-text"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <p
            aria-hidden
            className="font-serif text-[10rem] leading-[0.85] tracking-tight md:text-[18rem] lg:text-[22rem] bg-[linear-gradient(180deg,var(--color-text)_0%,transparent_95%)] bg-clip-text text-transparent"
          >
            404
          </p>

          <div className="flex max-w-xl flex-col items-center gap-4 -mt-4 md:-mt-8">
            <h1 className="type-h5">This page wandered off</h1>
            <p className="type-body text-text/80">
              The page you&rsquo;re looking for doesn&rsquo;t exist or has been
              moved. Let&rsquo;s get you back on track.
            </p>
          </div>

          <ButtonLink href="/" variant="primary" className="mt-2">
            Back to homepage
          </ButtonLink>
        </div>
      </section>
    </PageLayout>
  );
}
