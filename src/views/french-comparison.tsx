import Link from "next/link";
import { BreadcrumbSchema, FaqSchema } from "@/components/json-ld";
import { JsonLd } from "@/components/json-ld/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Surface } from "@/components/ui/surface";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buildMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import {
  comparisonPath,
  FRENCH_COMPARISONS,
  type FrenchComparison,
} from "@/lib/french-comparisons";

export function frenchComparisonMetadata(comparison: FrenchComparison) {
  return buildMetadata(
    {
      metaTitle: comparison.title,
      metaDescription: comparison.description,
      ogImage: null,
    },
    {
      path: comparisonPath(comparison),
      locale: "fr",
    },
  );
}

export function FrenchComparisonView({
  comparison: c,
}: {
  comparison: FrenchComparison;
}) {
  const url = `${getSiteUrl()}${comparisonPath(c)}`;
  return (
    <article lang="fr" className="bg-background text-text">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${getSiteUrl()}/fr` },
          { name: "Comparatifs IA", url: `${getSiteUrl()}/fr/vs` },
          { name: `Wonka vs ${c.competitor}`, url },
        ]}
      />
      <FaqSchema items={c.questions} />
      <JsonLd
        id="schema-comparison"
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.description,
          url,
          mainEntityOfPage: url,
          inLanguage: "fr-FR",
          dateModified: c.reviewedAt,
          author: { "@id": `${getSiteUrl()}/#organization` },
          publisher: { "@id": `${getSiteUrl()}/#organization` },
          image: `${getSiteUrl()}/opengraph-image.jpg`,
          citation: c.sources.map((s) => s.url),
        }}
      />
      <Section
        className="border-border border-b py-16 md:py-24"
        containerClassName="max-w-5xl"
      >
        <nav aria-label="Fil d’Ariane" className="type-paragraph-m mb-8">
          <Link href="/fr" className="underline">
            Accueil
          </Link>{" "}
          /{" "}
          <Link href="/fr/vs" className="underline">
            Comparatifs IA
          </Link>{" "}
          / {c.competitor}
        </nav>
        <Eyebrow>Choisir une IA pour votre entreprise</Eyebrow>
        <h1 className="type-h2 mt-6 text-balance">{c.title}</h1>
        <p className="type-body mt-8 max-w-3xl">{c.summary}</p>
        <p className="type-paragraph-m mt-6">
          Par l’équipe Wonka AI · Revue éditoriale du{" "}
          <time dateTime={c.reviewedAt}>24 septembre 2026</time>
        </p>
        <p className="type-paragraph-m mt-2">
          Comparatif publié par Wonka, éditeur de l’une des solutions. Les
          sources et limites figurent en bas de page.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ButtonLink href="/france/diagnostic">
            Évaluer mon projet IA
          </ButtonLink>
          <Link href="#comparatif" className="underline underline-offset-4">
            Voir les critères de choix
          </Link>
        </div>
      </Section>
      <Section className="py-14" containerClassName="max-w-5xl">
        <h2 className="type-h4">
          Quand choisir {c.competitor}, quand évaluer Wonka ?
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Surface className="border-border border p-6">
            <h3 className="type-h6">
              {c.competitor} : le bon point de départ si…
            </h3>
            <p className="mt-4">{c.competitorFit}</p>
          </Surface>
          <Surface className="border-border border p-6">
            <h3 className="type-h6">Wonka : à évaluer si…</h3>
            <p className="mt-4">{c.wonkaFit}</p>
          </Surface>
        </div>
      </Section>
      <Section id="comparatif" className="py-14" containerClassName="max-w-5xl">
        <h2 className="type-h4">
          Wonka vs {c.competitor} : les critères à vérifier
        </h2>
        <p className="mt-5">
          Une fonction absente de ce tableau n’est pas nécessairement absente du
          produit. Faites confirmer par chaque éditeur le périmètre de votre
          offre.
        </p>
        <div
          className="mt-8 overflow-x-auto"
          role="region"
          aria-label={`Tableau Wonka et ${c.competitor}`}
          tabIndex={0}
        >
          <table className="type-paragraph-m w-full min-w-xl border-collapse text-left">
            <caption className="sr-only">
              Comparaison des périmètres de Wonka et {c.competitor}
            </caption>
            <thead>
              <tr className="border-border border-b">
                <th scope="col" className="p-4">
                  Critère
                </th>
                <th scope="col" className="p-4">
                  {c.competitor}
                </th>
                <th scope="col" className="p-4">
                  Wonka
                </th>
              </tr>
            </thead>
            <tbody>
              {c.differences.map((row) => (
                <tr key={row.criterion} className="border-border border-b">
                  <th scope="row" className="p-4 align-top font-medium">
                    {row.criterion}
                  </th>
                  <td className="p-4 align-top">{row.competitor}</td>
                  <td className="p-4 align-top">{row.wonka}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section className="py-14" containerClassName="max-w-5xl">
        <h2 className="type-h4">Trois tests à réaliser avant de décider</h2>
        <ol className="mt-8 space-y-8">
          {c.pilot.map((test, i) => (
            <li key={test.title}>
              <h3 className="type-h6">
                {i + 1}. {test.title}
              </h3>
              <p className="mt-3 max-w-3xl">{test.body}</p>
            </li>
          ))}
        </ol>
        <Surface variant="callout" className="border-border mt-10 border p-6">
          <h3 className="type-h6">Mesurez le résultat, puis le coût total</h3>
          <p className="mt-4">
            Pour chaque test, notez la justesse, les sources vérifiables, le
            respect des permissions, le temps de correction et le temps gagné.
            Additionnez ensuite licences, consommation, intégration, formation
            et maintenance sur le même périmètre. Un prix par siège ne décrit
            pas le coût d’un processus en production.
          </p>
          <Link href="/fr/pricing" className="mt-4 inline-block underline">
            Consulter les tarifs Wonka
          </Link>
        </Surface>
      </Section>
      <Section className="py-14" containerClassName="max-w-5xl">
        <h2 className="type-h4">Questions fréquentes</h2>
        <div className="mt-8 space-y-8">
          {c.questions.map((item) => (
            <div key={item.question}>
              <h3 className="type-h6">{item.question}</h3>
              <p className="mt-3 max-w-3xl">{item.answer}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="sources"
        className="border-border border-t py-14"
        containerClassName="max-w-5xl"
      >
        <h2 className="type-h4">Sources et méthode</h2>
        <p className="mt-5">
          Nous distinguons les fonctions décrites par les éditeurs des points à
          valider en démonstration ou dans le contrat. Ce guide ne constitue pas
          un benchmark de performances ni un avis juridique. Les prix et les
          fonctions peuvent évoluer.
        </p>
        <ul className="mt-6 space-y-4">
          {c.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} className="underline">
                {source.label}
              </a>
              <p className="type-paragraph-m">{source.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          Côté Wonka :{" "}
          <Link href="/fr/security" className="underline">
            sécurité et données
          </Link>
          ,{" "}
          <Link href="/fr/wonka-chat/odoo" className="underline">
            intégration Odoo
          </Link>
          ,{" "}
          <Link href="/fr/start-ai" className="underline">
            accompagnement Start AI
          </Link>{" "}
          et{" "}
          <Link href="/fr/pricing" className="underline">
            tarifs
          </Link>
          .
        </p>
      </Section>
      <Section className="py-14" containerClassName="max-w-5xl">
        <h2 className="type-h4">Poursuivre votre comparaison</h2>
        <ul className="mt-6 space-y-3">
          {FRENCH_COMPARISONS.filter((item) => item.slug !== c.slug).map(
            (item) => (
              <li key={item.slug}>
                <Link href={comparisonPath(item)} className="underline">
                  Wonka vs {item.competitor}
                </Link>
              </li>
            ),
          )}
        </ul>
        <p className="mt-6">
          <Link href="/fr/comparatif-ia-entreprise" className="underline">
            Voir le guide de choix d’une IA d’entreprise
          </Link>
        </p>
        <div className="mt-10">
          <ButtonLink href="/france/diagnostic">
            Préparer mon diagnostic IA
          </ButtonLink>
        </div>
      </Section>
    </article>
  );
}
