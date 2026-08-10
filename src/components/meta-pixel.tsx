"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/cookie-consent/cookie-consent-provider";

const META_PIXEL_ID = "2083978768839489";

function loadMetaPixel() {
  if (typeof window === "undefined" || window.fbq) return;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const f = window;
  if (f.fbq) return;
  const n: any = (f.fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  n("init", META_PIXEL_ID);
  n("track", "PageView");
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export function MetaPixel() {
  const { consent } = useCookieConsent();
  const loaded = useRef(false);

  useEffect(() => {
    if (!consent?.categories.marketing) return;
    if (loaded.current) return;
    loaded.current = true;
    loadMetaPixel();
  }, [consent]);

  return null;
}

export { META_PIXEL_ID };
