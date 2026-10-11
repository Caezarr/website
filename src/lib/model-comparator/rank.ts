import {
  MODELS,
  TASK_IDS,
  type ComparatorModel,
  type PriorityId,
  type TaskId,
} from "@/lib/model-comparator/models";

export interface RankInput {
  /** Selected tasks. Empty means "all tasks". */
  tasks: readonly TaskId[];
  priorities: readonly PriorityId[];
}

export type ReasonCode =
  | "fast"
  | "lowCost"
  | "midCost"
  | "euProvider"
  | "openWeight"
  | "veryLargeContext";

export type Reason = { kind: "task"; task: TaskId } | { kind: ReasonCode };

export interface RankedModel {
  model: ComparatorModel;
  /** Weighted fit, 0–100. */
  match: number;
  /** Average task score over the selected tasks, 1–5. */
  quality: number;
  reasons: Reason[];
}

export function effectiveTasks(tasks: readonly TaskId[]): readonly TaskId[] {
  return tasks.length ? tasks : TASK_IDS;
}

export function qualityScore(model: ComparatorModel, tasks: readonly TaskId[]): number {
  const selected = effectiveTasks(tasks);
  const total = selected.reduce((sum, task) => sum + model.scores[task], 0);
  return total / selected.length;
}

function weights(priorities: readonly PriorityId[]): Record<PriorityId, number> {
  const has = (id: PriorityId) => (priorities.includes(id) ? 1 : 0);
  return {
    quality: 1 + has("quality"),
    speed: has("speed"),
    cost: has("cost"),
    sovereignty: has("sovereignty"),
  };
}

function normalised(model: ComparatorModel, quality: number): Record<PriorityId, number> {
  return {
    quality: (quality - 1) / 4,
    speed: (model.speed - 1) / 2,
    cost: (3 - model.cost) / 2,
    sovereignty: (model.sovereignty - 1) / 4,
  };
}

export function reasonsFor(model: ComparatorModel, input: RankInput): Reason[] {
  const tasks = effectiveTasks(input.tasks);
  const strongTasks = tasks
    .filter((task) => model.scores[task] >= 4)
    .sort((a, b) => model.scores[b] - model.scores[a] || TASK_IDS.indexOf(a) - TASK_IDS.indexOf(b))
    .slice(0, 2)
    .map((task): Reason => ({ kind: "task", task }));

  const extra: Reason[] = [];
  const wants = (id: PriorityId) => input.priorities.includes(id);
  if (model.context === "veryLarge" && tasks.includes("summarising")) {
    extra.push({ kind: "veryLargeContext" });
  }
  if (wants("speed") && model.speed === 3) extra.push({ kind: "fast" });
  if (wants("cost") && model.cost === 1) extra.push({ kind: "lowCost" });
  if (wants("cost") && model.cost === 2) extra.push({ kind: "midCost" });
  if (wants("sovereignty") && model.providerHq === "fr") extra.push({ kind: "euProvider" });
  if (wants("sovereignty") && model.openWeight) extra.push({ kind: "openWeight" });

  return [...strongTasks, ...extra];
}

const nonZero = (value: number) => (Math.abs(value) < 1e-9 ? 0 : value);

/**
 * Deterministic ranking: weighted fit (quality always counts, selected
 * priorities add weight), then raw task quality, then model id.
 */
export function rankModels(
  input: RankInput,
  models: readonly ComparatorModel[] = MODELS,
): RankedModel[] {
  const w = weights(input.priorities);
  const totalWeight = Object.values(w).reduce((sum, value) => sum + value, 0);

  return models
    .map((model) => {
      const quality = qualityScore(model, input.tasks);
      const values = normalised(model, quality);
      const fit =
        (Object.keys(w) as PriorityId[]).reduce((sum, id) => sum + w[id] * values[id], 0) /
        totalWeight;
      return {
        model,
        match: Math.round(fit * 100),
        quality,
        reasons: reasonsFor(model, input),
        fit,
      };
    })
    .sort(
      (a, b) =>
        nonZero(b.fit - a.fit) ||
        nonZero(b.quality - a.quality) ||
        a.model.id.localeCompare(b.model.id),
    )
    .map(({ model, match, quality, reasons }) => ({ model, match, quality, reasons }));
}
