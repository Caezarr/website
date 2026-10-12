"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import {
  decorateWonkaChatUrl,
  trackWebsiteEvent,
  WEBSITE_EVENTS,
} from "@/lib/analytics";
import {
  readSelection,
  requestLibraryImportId,
  SELECTION_STORAGE_KEY,
  toggleSelection,
  wonkaChatImportUrl,
  writeSelection,
} from "@/lib/agent-library/selection";

const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let current: string[] | null = null;

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function snapshot(): string[] {
  current ??= readSelection(storage());
  return current;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== SELECTION_STORAGE_KEY) return;
  current = readSelection(storage());
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", onStorage);
  };
}

/** Replaces the list. Kept in memory when localStorage is unavailable. */
export function setLibrarySelection(slugs: string[]) {
  current = slugs;
  writeSelection(storage(), slugs);
  emit();
}

/**
 * Slugs in the visitor's list. Empty on the server and during hydration, then
 * read from localStorage, so server and client markup always match.
 */
export function useLibrarySelection(): string[] {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function toggleLibrarySelection(slug: string): "add" | "remove" | "full" {
  const result = toggleSelection(snapshot(), slug);
  if (result.action !== "full") setLibrarySelection(result.slugs);
  return result.action;
}

function openPendingTab(message: string): Window | null {
  const tab = window.open("", "_blank");
  if (!tab) return null;
  try {
    tab.opener = null;
    tab.document.title = "WonkaChat";
    tab.document.body.textContent = message;
  } catch {
    // The blank tab still works as a navigation target.
  }
  return tab;
}

/**
 * One-click WonkaChat import of 1 to 3 full agents. The tab opens inside the
 * click handler (popup blockers allow it), then goes to the signed import URL
 * once the server returns it, or closes on failure.
 */
export function useLibraryImport(locale: Locale, pendingMessage: string) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const start = useCallback(
    async (slugs: string[], placement: string) => {
      if (pending || !slugs.length) return;
      setFailed(false);
      setPending(true);
      const tab = openPendingTab(pendingMessage);
      trackWebsiteEvent(WEBSITE_EVENTS.AGENT_LIBRARY_SEND_TO_WONKACHAT, {
        agent_count: slugs.length,
        locale,
        placement,
      });
      try {
        const id = await requestLibraryImportId(slugs, locale);
        const url = decorateWonkaChatUrl(wonkaChatImportUrl(id));
        if (tab && !tab.closed) tab.location.href = url;
        else window.location.assign(url);
      } catch {
        tab?.close();
        setFailed(true);
      } finally {
        setPending(false);
      }
    },
    [locale, pending, pendingMessage],
  );

  return { start, pending, failed };
}
