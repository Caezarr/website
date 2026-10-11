import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Locale } from "@/i18n/config";
import type { AgentBlueprintAgent } from "@/lib/agent-blueprint";
import { blueprintText } from "@/lib/agent-blueprint-copy";
import {
  type SharedBlueprint,
  weeklyHoursSaved,
} from "@/lib/agent-blueprint-share";
import { resolveConnectedTools } from "@/lib/agent-blueprint-tools";
import { BLUEPRINT_BRAND as brand } from "@/lib/brand-colors";

// Words are never split with hyphens: agent and tool names stay readable.
Font.registerHyphenationCallback((word) => [word]);

/**
 * Characters the standard PDF fonts (WinAnsi) can draw besides Latin-1.
 * Anything else in model-written text would print as garbage.
 */
const WIN_ANSI_EXTRAS = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
const REPLACEMENTS: Record<string, string> = {
  "→": "->",
  "←": "<-",
  "≥": ">=",
  "≤": "<=",
  "≈": "~",
  "×": "x",
  "✓": "•",
  "✔": "•",
  " ": " ",
  " ": " ",
  " ": " ",
  "‑": "-",
  "−": "-",
};

/** Makes text printable with the built-in Helvetica/Times fonts. */
export function pdfSafeText(value: string): string {
  let output = "";
  for (const char of value.normalize("NFC")) {
    const replacement = REPLACEMENTS[char];
    if (replacement !== undefined) {
      output += replacement;
      continue;
    }
    const code = char.codePointAt(0) ?? 0;
    if (
      char === "\n" ||
      (code >= 0x20 && code <= 0x7e) ||
      (code >= 0xa0 && code <= 0xff) ||
      WIN_ANSI_EXTRAS.includes(char)
    ) {
      output += char;
    }
  }
  return output.replace(/[ \t]{2,}/g, " ").trim();
}

const SANS = "Helvetica";
const SANS_BOLD = "Helvetica-Bold";
const SERIF = "Times-Roman";

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 64,
    paddingHorizontal: 48,
    fontFamily: SANS,
    fontSize: 10,
    color: brand.black,
    backgroundColor: brand.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: brand.darkGray,
    borderBottomStyle: "dashed",
  },
  logo: { width: 87, height: 20 },
  wordmark: { fontFamily: SANS_BOLD, fontSize: 16 },
  eyebrow: {
    fontFamily: SANS_BOLD,
    fontSize: 7.5,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: brand.blue700,
  },
  muted: { color: brand.black, opacity: 0.6 },
  title: {
    fontFamily: SERIF,
    fontSize: 26,
    lineHeight: 1.15,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: SERIF,
    fontSize: 17,
    lineHeight: 1.2,
    marginTop: 4,
  },
  // Line height is set per text: on the page it hides dynamic (render) texts.
  paragraph: { fontSize: 10.5, lineHeight: 1.5, marginTop: 8 },
  stats: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: brand.darkGray,
    borderStyle: "dashed",
    borderRadius: 4,
  },
  stat: { flex: 1, padding: 12 },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: brand.darkGray,
    borderLeftStyle: "dashed",
  },
  statValue: {
    fontFamily: SERIF,
    fontSize: 20,
    lineHeight: 1.2,
    marginBottom: 2,
    color: brand.blue700,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  chip: {
    fontSize: 8.5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 9,
    backgroundColor: brand.lightGray,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: brand.darkGray,
    borderBottomStyle: "dashed",
  },
  agentHeader: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: brand.lightGray,
  },
  agentTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tier: {
    fontSize: 8,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 8,
    backgroundColor: brand.blue100,
    color: brand.blue900,
    alignSelf: "flex-start",
  },
  block: { marginTop: 16 },
  step: { flexDirection: "row", marginTop: 5 },
  stepIndex: {
    width: 18,
    fontFamily: SANS_BOLD,
    color: brand.blue700,
  },
  stepText: { flex: 1 },
  cta: {
    marginTop: 24,
    padding: 24,
    borderRadius: 4,
    backgroundColor: brand.black,
    color: brand.white,
  },
  ctaLink: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: brand.blue300,
    color: brand.black,
    fontFamily: SANS_BOLD,
    textDecoration: "none",
    alignSelf: "flex-start",
  },
  ctaSecondary: {
    marginTop: 10,
    color: brand.blue300,
    textDecoration: "underline",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    fontSize: 7.5,
    color: brand.lightBrown,
  },
});

export interface BlueprintPdfLinks {
  meetingUrl: string;
  /** One-click WonkaChat import, or WonkaChat itself once the export expired. */
  wonkaChatUrl: string;
  importAvailable: boolean;
  shareUrl: string;
}

function hoursPerWeekToDaysPerMonth(hours: number) {
  return Math.round((hours * 52) / 12 / 8);
}

function BlueprintPdfDocument({
  blueprint,
  links,
  logo,
}: {
  blueprint: SharedBlueprint;
  links: BlueprintPdfLinks;
  logo: Buffer | null;
}) {
  const locale: Locale = blueprint.locale;
  const t = (english: string) => pdfSafeText(blueprintText(locale, english));
  const safe = pdfSafeText;
  const labelled = (label: string, text: string) =>
    `${t(label)}${locale === "fr" ? " : " : ": "}${text}`;
  const { result } = blueprint;
  const hours = weeklyHoursSaved(result);
  const hoursLabel = (agent: Pick<AgentBlueprintAgent, "weeklyHoursSaved">) =>
    t("{min}–{max} h per week")
      .replace("{min}", String(agent.weeklyHoursSaved.min))
      .replace("{max}", String(agent.weeklyHoursSaved.max));

  const header = (
    <View style={styles.header} fixed>
      {logo ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image src={{ data: logo, format: "png" }} style={styles.logo} />
      ) : (
        <Text style={styles.wordmark}>wonka</Text>
      )}
      <Text style={styles.eyebrow}>{t("AI agent blueprint")}</Text>
    </View>
  );

  const pageLabel = t("Page {page} of {total}");
  const footer = (
    <>
      <Text style={styles.footer} fixed>
        {t("Anonymous blueprint generated by Wonka AI")}
      </Text>
      <Text
        style={[styles.footer, { textAlign: "right" }]}
        fixed
        render={({ pageNumber, totalPages }) =>
          pageLabel
            .replace("{page}", String(pageNumber))
            .replace("{total}", String(totalPages))
        }
      />
    </>
  );

  return (
    <Document
      title={`${t("AI agent blueprint")}${result.sector ? ` - ${safe(result.sector)}` : ""}`}
      author="Wonka AI"
      creator="Wonka AI"
      producer="Wonka AI"
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        {header}
        <View style={{ marginTop: 28 }}>
          {result.sector ? (
            <Text style={styles.eyebrow}>{safe(result.sector)}</Text>
          ) : null}
          <Text style={styles.title}>{safe(result.headline)}</Text>
          {result.summary ? (
            <View style={styles.block}>
              <Text style={styles.eyebrow}>{t("Summary")}</Text>
              <Text style={styles.paragraph}>{safe(result.summary)}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {`${hours.min}–${hours.max} h`}
            </Text>
            <Text style={styles.muted}>
              {t("returned to the team every week")}
            </Text>
          </View>
          <View style={[styles.stat, styles.statDivider]}>
            <Text style={styles.statValue}>
              {`${hoursPerWeekToDaysPerMonth(hours.min)}–${hoursPerWeekToDaysPerMonth(hours.max)}`}
            </Text>
            <Text style={styles.muted}>
              {t("working days freed up every month")}
            </Text>
          </View>
          <View style={[styles.stat, styles.statDivider]}>
            <Text style={styles.statValue}>{String(result.agents.length)}</Text>
            <Text style={styles.muted}>{t("Recommended agents")}</Text>
          </View>
        </View>

        {result.signals.length ? (
          <View style={styles.block}>
            <Text style={styles.eyebrow}>{t("What shaped this blueprint")}</Text>
            <View style={styles.chips}>
              {result.signals.map((signal) => (
                <Text key={signal} style={styles.chip}>
                  {safe(signal)}
                </Text>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.block}>
          <Text style={styles.eyebrow}>{t("Recommended agents")}</Text>
          {result.agents.map((agent, index) => (
            <View key={agent.id} style={styles.overviewRow} wrap={false}>
              <Text style={{ flex: 1, paddingRight: 12 }}>
                <Text style={{ fontFamily: SANS_BOLD }}>
                  {`Agent 0${index + 1}  `}
                </Text>
                {safe(agent.name)}
              </Text>
              <Text style={styles.muted}>{hoursLabel(agent)}</Text>
            </View>
          ))}
        </View>
        {footer}
      </Page>

      {result.agents.map((agent, index) => {
        const tools = resolveConnectedTools(agent.tools).map((tool) => tool.name);
        const steps = [
          ...(agent.trigger ? [labelled("Trigger", agent.trigger)] : []),
          ...agent.workflow,
          ...(agent.humanControl
            ? [labelled("Human check", agent.humanControl)]
            : []),
        ];
        return (
          <Page key={agent.id} size="A4" style={styles.page}>
            {header}
            <View style={[styles.agentHeader, { marginTop: 24 }]} wrap={false}>
              <View style={styles.agentTitleRow}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={styles.eyebrow}>
                    {`Agent 0${index + 1}${agent.process ? ` · ${safe(agent.process)}` : ""}`}
                  </Text>
                  <Text style={styles.sectionTitle}>{safe(agent.name)}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={styles.statValue}>
                    {`${agent.weeklyHoursSaved.min}–${agent.weeklyHoursSaved.max} h`}
                  </Text>
                  <Text style={styles.muted}>{t("saved every week")}</Text>
                </View>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Text style={styles.tier}>
                  {labelled("Role", t(agent.tier))}
                </Text>
                <Text style={[styles.tier, { marginLeft: 6 }]}>
                  {t(`${agent.effort} effort`)}
                </Text>
              </View>
            </View>

            <View style={styles.block}>
              <Text style={styles.eyebrow}>{t("What it does")}</Text>
              <Text style={styles.paragraph}>{safe(agent.mission)}</Text>
              {agent.companySignal ? (
                <Text style={[styles.paragraph, styles.muted]}>
                  {safe(agent.companySignal)}
                </Text>
              ) : null}
            </View>

            {steps.length ? (
              <View style={styles.block}>
                <Text style={styles.eyebrow}>{t("How it runs")}</Text>
                {steps.map((step, stepIndex) => (
                  <View key={`${stepIndex}-${step}`} style={styles.step} wrap={false}>
                    <Text style={styles.stepIndex}>{`${stepIndex + 1}.`}</Text>
                    <Text style={styles.stepText}>{safe(step)}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {tools.length ? (
              <View style={styles.block}>
                <Text style={styles.eyebrow}>{t("Tools and integrations")}</Text>
                <View style={styles.chips}>
                  {tools.map((tool) => (
                    <Text key={tool} style={styles.chip}>
                      {safe(tool)}
                    </Text>
                  ))}
                </View>
              </View>
            ) : null}

            {agent.expectedImpact ? (
              <View style={styles.block}>
                <Text style={styles.eyebrow}>{t("Expected gain")}</Text>
                <Text style={[styles.paragraph, { fontFamily: SANS_BOLD }]}>
                  {safe(agent.expectedImpact)}
                </Text>
                <Text style={[styles.paragraph, styles.muted]}>
                  {labelled("Time saved", hoursLabel(agent))}
                </Text>
              </View>
            ) : null}
            {footer}
          </Page>
        );
      })}

      <Page size="A4" style={styles.page}>
        {header}
        <View style={styles.cta}>
          <Text style={[styles.eyebrow, { color: brand.blue300 }]}>
            {t("Next step")}
          </Text>
          <Text style={[styles.title, { color: brand.white }]}>
            {t("Turn this blueprint into your first live agent.")}
          </Text>
          {[
            "30-minute call with a Wonka AI engineer",
            "Validate volumes, integrations and ROI",
            "Leave with a scoped delivery plan",
          ].map((item) => (
            <Text key={item} style={[styles.paragraph, { color: brand.white }]}>
              {`•  ${t(item)}`}
            </Text>
          ))}
          <Link src={links.meetingUrl} style={styles.ctaLink}>
            {t("Book a 30-minute call with a Wonka AI engineer")}
          </Link>
          <Link src={links.wonkaChatUrl} style={styles.ctaSecondary}>
            {links.importAvailable
              ? t("Import the agents into WonkaChat")
              : t("Try WonkaChat")}
          </Link>
        </View>
        <View style={styles.block}>
          <Link src={links.shareUrl} style={{ color: brand.blue700 }}>
            {t("View this blueprint online")}
          </Link>
          <Text style={[styles.paragraph, styles.muted]}>
            {t(
              "Time savings are directional estimates based on recurring tasks in the benchmark. Validate them against real volumes before investment.",
            )}
          </Text>
        </View>
        {footer}
      </Page>
    </Document>
  );
}

export function renderBlueprintPdf(
  blueprint: SharedBlueprint,
  links: BlueprintPdfLinks,
  logo: Buffer | null,
): Promise<Buffer> {
  return renderToBuffer(
    <BlueprintPdfDocument blueprint={blueprint} links={links} logo={logo} />,
  );
}

/** Download name, localised: wonka-ai-agent-blueprint.pdf, wonka-plan-agents-ia.pdf… */
export function blueprintPdfFilename(locale: Locale): string {
  return `${blueprintText(locale, "wonka-ai-agent-blueprint")}.pdf`;
}
