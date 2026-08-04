import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { repositoryRoot } from "./build.mjs";

function readJson(path) {
  return JSON.parse(readFileSync(resolve(repositoryRoot, path), "utf8"));
}

function output(value) {
  console.log(JSON.stringify(value, null, 2));
}

function argumentValue(flag) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : null;
}

const manifest = readJson("public/design-system/manifest.json");
const tokenCatalog = readJson("public/design-system/tokens.json");
const componentCatalog = readJson("public/design-system/components.json");
const assetCatalog = readJson("public/design-system/assets.json");
const [command = "manifest", target, ...rest] = process.argv.slice(2);

switch (command) {
  case "manifest":
    output(manifest);
    break;

  case "tokens":
    output(tokenCatalog.tokens);
    break;

  case "token": {
    const token = tokenCatalog.tokens.find((item) => item.id === target);
    if (!token) {
      throw new Error(`Unknown token: ${target}`);
    }
    const theme = argumentValue("--theme");
    output(
      theme
        ? {
            ...token,
            value: token.values[theme],
            theme,
          }
        : token,
    );
    break;
  }

  case "components":
    output(componentCatalog.components);
    break;

  case "component": {
    const component = componentCatalog.components.find(
      (item) =>
        item.id === target ||
        item.id === `component.${target}`,
    );
    if (!component) {
      throw new Error(`Unknown component: ${target}`);
    }
    output(component);
    break;
  }

  case "assets":
    output(assetCatalog.assets);
    break;

  case "asset": {
    const asset = assetCatalog.assets.find(
      (item) =>
        item.id === target ||
        item.id === `asset.${target}`,
    );
    if (!asset) {
      throw new Error(`Unknown asset: ${target}`);
    }
    output(asset);
    break;
  }

  case "search": {
    const query = [target, ...rest].filter(Boolean).join(" ").toLowerCase();
    if (!query) {
      throw new Error("Search requires a query.");
    }

    const tokens = tokenCatalog.tokens.filter((token) =>
      JSON.stringify(token).toLowerCase().includes(query),
    );
    const components = componentCatalog.components.filter((component) =>
      JSON.stringify(component).toLowerCase().includes(query),
    );
    const assets = assetCatalog.assets.filter((asset) =>
      JSON.stringify(asset).toLowerCase().includes(query),
    );

    output({ query, tokens, components, assets });
    break;
  }

  default:
    throw new Error(
      `Unknown command: ${command}. Use manifest, tokens, token, components, component, assets, asset, or search.`,
    );
}
