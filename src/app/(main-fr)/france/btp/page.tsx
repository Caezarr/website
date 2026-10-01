import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { BtpVideoSlot, TimeCalculator } from "./btp-interactive";
import { btpIntegrations } from "./mcp-integrations";
import styles from "./btp.module.css";

export const metadata: Metadata = {
  title: "Wonka Chat pour la construction | CCTP et comptes rendus",
  description:
    "Préparez vos analyses de CCTP, comparatifs d’offres et comptes rendus de chantier avec Wonka Chat. Vos sources restent vérifiables et vos équipes gardent la décision.",
  alternates: { canonical: "/france/btp" },
};

const contactHref =
  "/france/diagnostic?secteur=btp&utm_source=btp&utm_campaign=construction";

const faqs = [
  [
    "Je n’ai déjà pas le temps. Qui prépare les agents ?",
    "Dans le programme entreprise, nous identifions les tâches avec vos services et accompagnons la préparation des usages convenus. Vos équipes apportent leurs documents et leurs règles métier : elles n’ont pas à inventer seules leur stratégie IA.",
  ],
  [
    "Mon entreprise compte moins de 100 personnes : puis-je utiliser Wonka ?",
    "Oui. Wonka Chat peut s’utiliser individuellement. Le programme accompagné présenté ici s’adresse aux entreprises de 100 collaborateurs et plus. Le nombre de licences, la durée d’engagement et le périmètre sont définis ensemble avant signature.",
  ],
  [
    "Et si l’agent oublie une contrainte du chantier ?",
    "Les synthèses et brouillons restent à vérifier avec les documents sources. L’agent prépare le travail ; il ne remplace ni votre expertise technique, ni la validation du responsable métier. Nous définissons les points de contrôle pendant le déploiement.",
  ],
  [
    "Est-ce que Wonka envoie des emails à ma place ?",
    "Les scénarios présentés ici préparent des brouillons à relire. Toute action dans vos outils dépend des connecteurs, des autorisations et des validations configurés avec votre entreprise.",
  ],
  [
    "Mes équipes doivent-elles changer de logiciels ?",
    "Non. Nous partons de votre environnement. Les outils déjà connectés restent en place ; pour les logiciels métier, nous vérifions le connecteur ou cadrons l’intégration avec vos équipes.",
  ],
  [
    "Qu’inclut l’accompagnement offert ?",
    "Le pré-kick-off, le kick-off, les échanges avec vos services, la cartographie des cas d’usage, un plan d’action priorisé et l’accompagnement au déploiement convenu. Les intégrations spécifiques et leur périmètre sont précisés dans la proposition.",
  ],
] as const;

function ToolTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className={styles.toolTrack} aria-hidden={duplicate || undefined}>
      {btpIntegrations.map((tool) => (
        <li className={styles.toolMark} key={tool.name}>
          {tool.src ? (
            <Image
              className={tool.wordmark ? styles.toolLogo : undefined}
              src={tool.src}
              alt={tool.wordmark ? tool.name : ""}
              width={tool.wordmark ? 130 : 34}
              height={tool.wordmark ? 48 : 34}
            />
          ) : null}
          {!tool.wordmark ? <span>{tool.name}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export default function BtpLandingPage() {
  return (
    <div className={styles.page} lang="fr">
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.pill}>
              <span /> Wonka Chat pour la construction
            </p>
            <h1 className="type-h3">
              Vos dossiers de chantier avancent. Vos équipes gardent la main.
            </h1>
            <p className={styles.lead}>
              CCTP, offres fournisseurs, notes de visite : Wonka Chat prépare
              les synthèses et les actions à relire, à partir des pièces que
              vous lui donnez.
            </p>
            <div className={styles.actions}>
              <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
              <a href="#demonstration" className={styles.watch}>
                Voir le scénario CCTP <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.heroNote}>
              Vous vérifiez les sources. Vous décidez de la suite.
            </p>
          </div>
          <div className={styles.videoWrap} id="demonstration">
            <BtpVideoSlot
              number="01"
              category="CCTP · CHIFFRAGE"
              title="Lire un dossier sans perdre de vue les points à vérifier."
              steps={[
                ["Pièces du dossier", "CCTP · plans · notes"],
                ["Analyse ciblée", "Exigences · écarts · manques"],
                ["Brouillon vérifiable", "Sources · arbitrage humain"],
              ]}
            />
          </div>
        </div>
      </section>

      <section className={styles.proof} aria-label="Notre expérience construction">
        <div className={styles.proofClient}>
          <Image
            src="/images/france/logos/buildwise.svg"
            alt="Buildwise"
            width={150}
            height={50}
          />
          <p>
            <strong>Une expérience IA menée avec Buildwise.</strong>
            <span>Wonka a accompagné Buildwise dans ses projets IA.</span>
          </p>
        </div>
        <div className={styles.proofExperience}>
          <span className={styles.proofYears}>10+ ans</span>
          <p>
            <strong>de connaissance métier cumulée dans l’équipe.</strong>
            <span>Une expérience de terrain au service de vos usages.</span>
          </p>
        </div>
      </section>

      <section className={styles.section + " " + styles.storySection}>
        <div className={styles.sectionCopy}>
          <p className={styles.label}>Vous connaissez la scène.</p>
          <h2 className="type-h4">
            Le chantier est fini.
            <br />
            Votre journée, pas encore.
          </h2>
          <p className={styles.shortCopy}>
            Devis, planning, administratif : les tâches de bureau s’ajoutent au
            terrain. Wonka prépare la suite ; vos équipes gardent la décision.
          </p>
        </div>
        <BtpVideoSlot
          number="02"
          category="LA JOURNÉE D’UNE ÉQUIPE"
          title="Faire avancer le travail entre deux visites."
          steps={[
            ["08:00 · Demandes", "Trier les priorités"],
            ["11:00 · Chantier", "Préparer les suites"],
            ["Fin de journée", "Relire et décider"],
          ]}
        />
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeading}>
          <p className={styles.label}>Des tâches bien réelles.</p>
          <h2 className="type-h4">
            Du document reçu
            <br />à la décision à prendre.
          </h2>
          <p className={styles.sectionSubhead}>
            CCTP, offres fournisseurs, suivi de chantier : un même espace pour
            préparer le travail et rendre les points à arbitrer visibles.
          </p>
        </div>
        <BtpVideoSlot
          number="03"
          category="FLUX MÉTIERS"
          title="Vos documents deviennent une prochaine action claire."
          steps={[
            ["CCTP ou notes", "Vos pièces et consignes"],
            ["Agent Wonka", "Classe · compare · synthétise"],
            ["Votre équipe", "Vérifie · arbitre · agit"],
          ]}
        />
      </section>

      <section
        className={styles.toolSection}
        aria-label="Plus de 70 connecteurs MCP et outils compatibles"
      >
        <div className={styles.toolCopy}>
          <p className={styles.label}>Pas besoin de changer d’outils.</p>
          <h2 className="type-h5">
            Wonka s’intègre à votre environnement de travail.
          </h2>
          <p>
            Wonka Chat propose plus de 70 connecteurs MCP. Vos équipes gardent
            leurs outils : nous activons les connexions adaptées et cadrons avec
            vous l’intégration des logiciels métier selon vos besoins.
          </p>
        </div>
        <div className={styles.toolMarquee}>
          <div className={styles.toolRail}>
            <ToolTrack />
            <ToolTrack duplicate />
          </div>
        </div>
      </section>

      <section className={styles.section + " " + styles.calculatorSection}>
        <div className={styles.sectionCopy}>
          <p className={styles.label}>Faites le calcul avec votre équipe.</p>
          <h2 className="type-h4">
            Les petites tâches
            <br />
            font les grandes journées.
          </h2>
          <p>
            Quelques minutes par personne deviennent des centaines d’heures à
            l’échelle de l’entreprise. Quel serait votre objectif ?
          </p>
        </div>
        <TimeCalculator />
      </section>

      <section className={styles.offer} id="offre">
        <div className={styles.pricingHeading}>
          <p className={styles.label}>À chaque étape, le bon niveau d’accompagnement.</p>
          <h2 className="type-h4">
            Commencez par un usage.
            <br />
            Faites-en une méthode d’équipe.
          </h2>
          <p>
            De votre premier agent au déploiement accompagné, faites évoluer
            Wonka avec les besoins de vos équipes.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          <article className={styles.planCard}>
            <div className={styles.planTop}>
              <span>01 · INDIVIDUEL</span>
              <span>Pour commencer</span>
            </div>
            <h3 className="type-h5">Wonka Chat</h3>
            <p className={styles.planDescription}>
              Votre espace IA pour les tâches du quotidien.
            </p>
            <div className={styles.planValue}>
              <strong>Vous pouvez déjà…</strong>
              <ul>
                <li>Analyser vos documents et en faire la synthèse</li>
                <li>Choisir le modèle adapté à chaque tâche</li>
                <li>Créer vos premiers agents de travail</li>
                <li>Préparer comptes rendus et tableaux</li>
              </ul>
            </div>
            <a className={styles.planCtaSecondary} href="https://wonka.chat/register">
              Découvrir Wonka Chat <span aria-hidden="true">↗</span>
            </a>
            <small>Tarifs et conditions présentés à l’inscription.</small>
          </article>

          <article className={styles.planCard + " " + styles.planRecommended}>
            <div className={styles.planTop}>
              <span>02 · ÉQUIPE</span>
            </div>
            <h3 className="type-h5">Wonka Chat pour vos équipes</h3>
            <p className={styles.planDescription}>
              Le bon point de départ pour faire passer les usages à l’échelle.
            </p>
            <div className={styles.planValue}>
              <strong>Tout ce qu’il faut pour avancer ensemble.</strong>
              <ul>
                <li>Un espace IA pour les équipes concernées</li>
                <li>Des agents adaptés aux tâches du métier</li>
                <li>Des méthodes et agents partageables</li>
                <li>Vos outils existants, selon le périmètre convenu</li>
              </ul>
            </div>
            <div className={styles.valueStack}>
              <span>DE L’USAGE À L’ADOPTION</span>
              <ol>
                <li><b>01</b><span>Identifier les tâches répétitives</span></li>
                <li><b>02</b><span>Prioriser le premier cas utile</span></li>
                <li><b>03</b><span>Préparer un agent vérifiable</span></li>
                <li><b>04</b><span>Faire grandir les usages en équipe</span></li>
              </ol>
            </div>
            <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
            <small>Licences et périmètre définis avec votre entreprise.</small>
          </article>

          <article className={styles.planCard}>
            <div className={styles.planTop}>
              <span>03 · DÉPLOIEMENT</span>
              <span>100+ collaborateurs</span>
            </div>
            <h3 className="type-h5">Un déploiement IA accompagné</h3>
            <p className={styles.planDescription}>
              Pour coordonner les usages, les métiers et les outils à l’échelle
              de l’entreprise.
            </p>
            <div className={styles.planValue}>
              <strong>Votre accompagnement inclus · valeur 10 000 €</strong>
              <ul>
                <li>Pré-kick-off et échanges avec vos services</li>
                <li>Cartographie et priorisation des cas d’usage</li>
                <li>Audit et feuille de route opérationnelle</li>
                <li>Accompagnement au déploiement convenu</li>
              </ul>
            </div>
            <a className={styles.planCtaSecondary} href={contactHref}>
              Évaluer mon déploiement <span aria-hidden="true">↗</span>
            </a>
            <small>
              5 entreprises accompagnées · licences, intégrations et périmètre
              définis sur proposition.
            </small>
          </article>
        </div>
      </section>

      <section className={styles.section + " " + styles.faq}>
        <div className={styles.sectionCopy}>
          <p className={styles.label}>Un déploiement lisible, sans mauvaise surprise.</p>
          <h2 className="type-h4">
            Les questions
            <br />
            qu’on nous pose.
          </h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.final}>
        <Image
          src="/images/CTA/cta-bg.avif"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className={styles.landscape}
        />
        <div className={styles.heroShade} />
        <div>
          <p>Votre prochain chantier mérite votre attention.</p>
          <h2 className="type-h3">
            Récupérez du temps
            <br />
            pour votre vrai métier.
          </h2>
          <ButtonLink href={contactHref}>Évaluer mes besoins IA</ButtonLink>
        </div>
      </section>
    </div>
  );
}
