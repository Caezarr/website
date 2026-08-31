"use client";

import { useEffect, useState } from "react";
import {
  getWebsiteFeatureFlag,
  subscribeToWebsiteFeatureFlags,
} from "@/lib/analytics";
import type { HeroData } from "@/lib/types";
import { Hero } from "./hero";

export const HOMEPAGE_HERO_EXPERIMENT_FLAG = "homepage-hero-product-preview-v1";

interface HomepageHeroExperimentProps {
  data?: HeroData | null;
  meetingUrl?: string | null;
  meetingLabel?: string | null;
}

export function HomepageHeroExperiment(props: HomepageHeroExperimentProps) {
  const [showProductUI, setShowProductUI] = useState(false);

  useEffect(
    () =>
      subscribeToWebsiteFeatureFlags(() => {
        setShowProductUI(
          getWebsiteFeatureFlag(HOMEPAGE_HERO_EXPERIMENT_FLAG) === "test",
        );
      }),
    [],
  );

  return <Hero {...props} showProductUI={showProductUI} />;
}
