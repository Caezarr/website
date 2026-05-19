import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
} from "next-sanity";
import { Section } from "@/components/ui/section";
import type { LegalPageContent } from "@/lib/types";

const legalProse: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="type-body mb-6 text-text/80">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="type-h5 mt-12 mb-4 text-text">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="type-h6 mt-10 mb-3 text-text">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="type-body mb-6 ml-6 list-disc space-y-2 text-text/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="type-body mb-6 ml-6 list-decimal space-y-2 text-text/80">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4 hover:opacity-60"
        >
          {children}
        </a>
      );
    },
  },
};

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface LegalPageViewProps {
  data: LegalPageContent | null;
  fallbackTitle: string;
}

export function LegalPageView({ data, fallbackTitle }: LegalPageViewProps) {
  const title = data?.title ?? fallbackTitle;
  const updated = formatDate(data?.lastUpdated ?? null);

  return (
    <Section className="bg-background py-16 md:py-24" containerClassName="max-w-[48rem]">
      <header className="mb-12 border-b border-dashed border-border pb-8">
        <h1 className="type-h3 text-text">{title}</h1>
        {updated && (
          <p className="type-eyebrow mt-4 text-text/60">Last updated · {updated}</p>
        )}
      </header>

      {data?.intro && (
        <p className="type-body mb-10 text-text/80">{data.intro}</p>
      )}

      {data?.body && data.body.length > 0 ? (
        <div>
          <PortableTextBase value={data.body} components={legalProse} />
        </div>
      ) : (
        <p className="type-body text-text/60">
          This page is being prepared. Please check back soon.
        </p>
      )}
    </Section>
  );
}
