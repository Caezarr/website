"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence } from "motion/react";
import { CookieBanner } from "./cookie-banner";
import { CookiePreferencesModal } from "./cookie-preferences-modal";

const STORAGE_KEY = "wonka:cookie-consent";
const CONSENT_VERSION = 1;

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

type ConsentRecord = {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
};

type CookieConsentContextValue = {
  consent: ConsentRecord | null;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: ConsentCategories) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: null,
  acceptAll: () => {},
  rejectAll: () => {},
  savePreferences: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
  isPreferencesOpen: false,
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

function readStored(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function pushConsentUpdate(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const consentState = {
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_storage: categories.marketing ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
  };

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consentState);
  }
  window.dataLayer?.push({ event: "consent_update", ...consentState });
}

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    // One-shot mount: read persisted consent, push it to GTM, and decide whether
    // the banner needs to appear. Cascading setState here is intentional — there
    // is no external store to subscribe to.
    const stored = readStored();
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(stored);
      pushConsentUpdate(stored.categories);
    } else {
      setBannerVisible(true);
    }
  }, []);

  const persist = useCallback((categories: ConsentCategories) => {
    const record: ConsentRecord = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      categories,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // localStorage may be unavailable; consent still pushed to GTM for this session
    }
    setConsent(record);
    pushConsentUpdate(categories);
  }, []);

  const acceptAll = useCallback(() => {
    persist({ analytics: true, marketing: true });
    setBannerVisible(false);
    setIsPreferencesOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ analytics: false, marketing: false });
    setBannerVisible(false);
    setIsPreferencesOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (categories: ConsentCategories) => {
      persist(categories);
      setBannerVisible(false);
      setIsPreferencesOpen(false);
    },
    [persist],
  );

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
        isPreferencesOpen,
      }}
    >
      {children}
      <AnimatePresence>{bannerVisible && <CookieBanner key="banner" />}</AnimatePresence>
      <AnimatePresence>
        {isPreferencesOpen && <CookiePreferencesModal key="modal" />}
      </AnimatePresence>
    </CookieConsentContext.Provider>
  );
}
