import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import manifest from "../../../design-system/manifest.json";

function Introduction() {
  return (
    <main className="sb-wonka-page">
      <section className="sb-wonka-signal px-7 py-16 md:px-12 md:py-24">
        <p className="sb-wonka-kicker mb-5 !text-blue-300">
          {manifest.brandVersionId} · {manifest.status}
        </p>
        <div className="max-w-4xl">
          <h1 className="type-h3 mb-7">One Wonka, across every surface.</h1>
          <p className="max-w-2xl text-lg leading-8 text-white/75">
            A shared visual language for products, websites, campaigns,
            presentations, and the agents that help create them.
          </p>
        </div>
      </section>

      <section className="grid gap-10 py-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="sb-wonka-kicker mb-4">How to use it</p>
          <h2 className="type-h5 max-w-xl">
            Start with intent, then choose the token or component.
          </h2>
        </div>
        <div className="grid gap-5 text-text/70">
          <p>
            Semantic tokens describe the job a decision performs. Component
            tokens lock approved choices to a reusable interface contract.
          </p>
          <p>
            Storybook is the human view. The JSON manifest, token catalog, and
            component catalog are the canonical interface for agents and tools.
          </p>
          <code className="rounded-sm bg-surface-muted p-4 font-mono text-sm text-text">
            bun run ds:query -- search &quot;primary action&quot;
          </code>
        </div>
      </section>

      <section className="border-t border-border py-12">
        <p className="sb-wonka-kicker mb-6">Principles</p>
        <div className="grid gap-4 md:grid-cols-2">
          {manifest.principles.map((principle) => (
            <article
              className="rounded-sm border border-border bg-surface p-6"
              key={principle.id}
            >
              <h3 className="type-h6 mb-3">{principle.name}</h3>
              <p className="type-paragraph-m text-text/65">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: "Getting Started/Introduction",
  component: Introduction,
  parameters: {
    docs: {
      description: {
        component:
          "The entry point for the Wonka brand and interface system. Structured catalogs remain canonical.",
      },
    },
  },
} satisfies Meta<typeof Introduction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
