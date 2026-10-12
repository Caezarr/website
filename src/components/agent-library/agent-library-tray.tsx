import type { Locale } from "@/i18n/config";
import { localizeHref } from "@/i18n/routes";
import {
  isLibraryImportEnabled,
  libraryIndexPath,
  librarySelectionIndex,
} from "@/lib/agent-library";
import { AGENT_LIBRARY_COPY } from "@/lib/agent-library/copy";
import { LibrarySelectionTray } from "./agent-library-selection";

/** Server wrapper: feeds the tray the catalogue names and the page links. */
export function LibraryTray({ locale, meetingUrl }: { locale: Locale; meetingUrl: string }) {
  return (
    <LibrarySelectionTray
      entries={librarySelectionIndex(locale)}
      basePath={libraryIndexPath(locale)}
      locale={locale}
      labels={AGENT_LIBRARY_COPY[locale].selection}
      blueprintHref={localizeHref("/ai-agent-blueprint", locale)}
      meetingUrl={meetingUrl}
      importEnabled={isLibraryImportEnabled()}
    />
  );
}
