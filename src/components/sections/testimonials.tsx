import { sanityFetch } from "@sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@sanity/lib/queries";
import { Section } from "@/components/ui/section";
import type { Testimonial } from "@/lib/types";
import { TestimonialsCarousel } from "./testimonials-carousel";

async function getTestimonials() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  return (data ?? []) as Testimonial[];
}

export async function Testimonials({ id }: { id?: string }) {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) {
    return <div aria-hidden className="py-8 md:py-10 lg:py-14" />;
  }

  return (
    <Section
      id={id}
      containerClassName="flex flex-col gap-12 py-15 md:py-20 lg:flex-row lg:items-center lg:gap-20 lg:py-30 xl:gap-30"
    >
      <TestimonialsCarousel testimonials={testimonials} />
    </Section>
  );
}
