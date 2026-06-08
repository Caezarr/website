import type { HubGuideLink } from "@/lib/hub-guides";

interface GuideLinkBandProps {
  title: string;
  links: HubGuideLink[];
}

export function GuideLinkBand({ title, links }: GuideLinkBandProps) {
  if (!links.length) return null;

  return (
    <section className="mb-14 rounded-lg border border-dashed border-border p-6">
      <h2 className="type-h5 mb-6">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="group rounded-md border border-border p-4 transition-colors hover:border-accent">
            <p className="type-paragraph-m-bold group-hover:text-accent">{link.title}</p>
            <p className="mt-2 type-paragraph-s text-text/55">{link.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
