import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
} from "next-sanity";
import Image from "next/image";
import { urlFor } from "@sanity/lib/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-14">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="w-full rounded-2xl"
        />
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-4 hover:text-accent-dark"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="type-paragraph-m text-text mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="type-h4 text-text mt-14 mb-9">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="type-h5 text-text mt-14 mb-9">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-accent text-text my-8 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="type-paragraph-m text-text my-6 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="type-paragraph-m text-text my-6 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PortableText({ value }: { value: any }) {
  return <PortableTextBase value={value} components={components} />;
}
