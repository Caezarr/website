import assert from "node:assert/strict";
import test from "node:test";
import {
  companyPlaceholder,
  normalizeTarget,
  redactText,
} from "@/lib/agent-blueprint";

test("normalizes a company website", () => {
  assert.deepEqual(normalizeTarget("https://www.example.com/about"), {
    domain: "example.com",
    website: "https://example.com",
  });
});

test("rejects an email address", () => {
  assert.equal(normalizeTarget("person@example.com"), null);
});

test("redacts company names in the output language", () => {
  assert.equal(
    redactText("Plus de 150 parcours Acme Acme", ["Acme"], companyPlaceholder("fr")),
    "Plus de 150 parcours l’entreprise",
  );
  assert.equal(redactText("Acme ships", ["Acme"]), "the company ships");
});
