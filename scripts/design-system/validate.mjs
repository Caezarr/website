import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  collectTokens,
  createResolver,
  repositoryRoot,
  writeArtifacts,
} from "./build.mjs";

function readJson(path) {
  return JSON.parse(readFileSync(resolve(repositoryRoot, path), "utf8"));
}

function fail(message) {
  throw new Error(message);
}

function validateTokens(tokenSource) {
  const tokens = collectTokens(tokenSource);
  const ids = new Set(tokens.map((token) => token.id));

  if (ids.size !== tokens.length) {
    fail("Token IDs must be unique.");
  }

  const references = [];

  function collectReferences(value, source) {
    if (typeof value === "string") {
      for (const match of value.matchAll(/\{([^}]+)\}/g)) {
        references.push({ source, target: match[1] });
      }
      return;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        collectReferences(item, source);
      }
      return;
    }

    if (value !== null && typeof value === "object") {
      for (const item of Object.values(value)) {
        collectReferences(item, source);
      }
    }
  }

  for (const token of tokens) {
    collectReferences(token.value, token.id);
    collectReferences(token.modes, token.id);

    if (token.id.startsWith("semantic.color.")) {
      if (!token.modes?.light || !token.modes?.dark) {
        fail(`${token.id} must define light and dark modes.`);
      }
    }
  }

  for (const reference of references) {
    if (!ids.has(reference.target)) {
      fail(
        `${reference.source} references unknown token ${reference.target}.`,
      );
    }
  }

  const graph = new Map();
  for (const { source, target } of references) {
    graph.set(source, [...(graph.get(source) ?? []), target]);
  }

  function visit(id, stack = []) {
    if (stack.includes(id)) {
      fail(`Circular token reference: ${[...stack, id].join(" → ")}`);
    }
    for (const target of graph.get(id) ?? []) {
      visit(target, [...stack, id]);
    }
  }

  for (const id of ids) {
    visit(id);
  }

  return { ids, tokens };
}

function validateManifest(manifest) {
  if (manifest.id !== "wonka-design-system") {
    fail("Manifest id must remain wonka-design-system.");
  }
  if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    fail("Manifest version must use semantic versioning.");
  }
  if (!manifest.brandVersionId) {
    fail("Manifest requires an immutable brandVersionId.");
  }
  if (!manifest.governance?.humanApprovalRequired) {
    fail("Human approval must remain required.");
  }
}

function validateComponents(catalog, tokenIds) {
  const ids = new Set();

  for (const component of catalog.components) {
    if (ids.has(component.id)) {
      fail(`Duplicate component id: ${component.id}`);
    }
    ids.add(component.id);

    if (!existsSync(resolve(repositoryRoot, component.source))) {
      fail(`${component.id} source does not exist: ${component.source}`);
    }

    for (const tokenId of component.tokens) {
      if (!tokenIds.has(tokenId)) {
        fail(`${component.id} references unknown token ${tokenId}.`);
      }
    }

    if (component.accessibility.length === 0) {
      fail(`${component.id} requires an accessibility contract.`);
    }
  }
}

function validateAssets(catalog) {
  const ids = new Set();

  for (const asset of catalog.assets) {
    if (ids.has(asset.id)) {
      fail(`Duplicate asset id: ${asset.id}`);
    }
    ids.add(asset.id);

    for (const file of asset.files) {
      if (!existsSync(resolve(repositoryRoot, file.path))) {
        fail(`${asset.id} file does not exist: ${file.path}`);
      }
    }

    if (!asset.rights?.license) {
      fail(`${asset.id} requires an explicit rights status.`);
    }

    if (
      asset.lifecycle === "active" &&
      asset.rights.license === "verification_required"
    ) {
      fail(`${asset.id} cannot be active before license verification.`);
    }
  }

  return ids.size;
}

function relativeLuminance(hex) {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    fail(`DS008 contrast validation requires a six-digit hex color, got ${hex}.`);
  }

  const channels = [0, 2, 4].map((offset) => {
    const channel = Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function validateContrasts(tokens) {
  const { resolveToken } = createResolver(tokens);
  const pairs = [
    {
      id: "component.button.primary",
      foreground: "component.button.primary.foreground",
      background: "component.button.primary.background",
      minimum: 4.5,
    },
    {
      id: "component.button.secondary",
      foreground: "component.button.secondary.foreground",
      background: "component.button.secondary.background",
      minimum: 4.5,
    },
    {
      id: "component.badge",
      foreground: "semantic.color.text",
      background: "semantic.color.surface-muted",
      minimum: 4.5,
    },
    {
      id: "component.focus-ring",
      foreground: "component.focus-ring.color",
      background: "semantic.color.background",
      minimum: 3,
    },
  ];

  for (const pair of pairs) {
    for (const theme of ["light", "dark"]) {
      const foreground = resolveToken(pair.foreground, theme);
      const background = resolveToken(pair.background, theme);
      const ratio = contrastRatio(foreground, background);

      if (ratio < pair.minimum) {
        fail(
          `DS008 ${pair.id} contrast is ${ratio.toFixed(2)}:1 in ${theme}; expected at least ${pair.minimum}:1.`,
        );
      }
    }
  }
}

try {
  const tokenSource = readJson("design-system/tokens/wonka.tokens.json");
  const manifest = readJson("design-system/manifest.json");
  const components = readJson("design-system/components.json");
  const assets = readJson("design-system/assets.json");

  const { ids: tokenIds, tokens } = validateTokens(tokenSource);
  validateManifest(manifest);
  validateComponents(components, tokenIds);
  const assetCount = validateAssets(assets);
  validateContrasts(tokens);
  writeArtifacts({ check: true });

  console.log(
    `Design system valid: ${tokenIds.size} tokens, ${components.components.length} components, ${assetCount} assets, version ${manifest.version}.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
