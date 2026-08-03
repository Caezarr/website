import type {
  BenchmarkPattern,
  CompanyContext,
} from "@/lib/agent-blueprint";

interface AzureSearchDocument {
  useCase?: unknown;
  description?: unknown;
}

interface AzureSearchResponse {
  value?: AzureSearchDocument[];
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export async function searchBenchmark(
  context: CompanyContext,
): Promise<BenchmarkPattern[]> {
  const endpoint = requiredEnv("AZURE_AI_SEARCH_ENDPOINT").replace(/\/$/, "");
  const index = requiredEnv("AZURE_AI_SEARCH_INDEX");
  const apiKey = requiredEnv("AZURE_AI_SEARCH_API_KEY");
  const apiVersion =
    process.env.AZURE_AI_SEARCH_API_VERSION?.trim() || "2025-09-01";
  const semanticConfiguration =
    process.env.AZURE_AI_SEARCH_SEMANTIC_CONFIGURATION?.trim();

  const body: Record<string, unknown> = {
    search: [
      context.benchmarkQuery,
      context.sector,
      context.operatingModel,
      ...context.departments,
      ...context.priorities,
    ].join(" "),
    searchFields: "useCase,description,sector",
    select: "useCase,description",
    filter: "recommended eq true",
    top: 20,
  };

  if (semanticConfiguration) {
    body.queryType = "semantic";
    body.semanticConfiguration = semanticConfiguration;
    body.captions = "extractive";
    body.answers = "none";
  }

  const response = await fetch(
    `${endpoint}/indexes/${encodeURIComponent(index)}/docs/search?api-version=${encodeURIComponent(apiVersion)}`,
    {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Azure AI Search returned ${response.status}`);
  }

  const data = (await response.json()) as AzureSearchResponse;
  return (data.value ?? [])
    .flatMap((document) => {
      if (
        typeof document.useCase !== "string" ||
        typeof document.description !== "string"
      ) {
        return [];
      }

      return [
        {
          useCase: document.useCase.slice(0, 180),
          description: document.description.slice(0, 1_200),
        },
      ];
    })
    .slice(0, 20);
}

