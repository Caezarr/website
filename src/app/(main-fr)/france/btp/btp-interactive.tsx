"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LogoMark } from "@/components/ui/logo-mark";
import styles from "./btp.module.css";

type VideoStep = readonly [string, string];

interface BtpVideoSlotProps {
  number: string;
  category: string;
  title: string;
  steps: readonly VideoStep[];
  videoId?: string;
  videoHash?: string;
}

export function BtpVideoSlot({
  number,
  category,
  title,
  steps,
  videoId,
  videoHash,
}: BtpVideoSlotProps) {
  const validVideoId = videoId && /^\d+$/.test(videoId) ? videoId : null;
  const source = validVideoId
    ? "https://player.vimeo.com/video/" +
      validVideoId +
      "?dnt=1&title=0&byline=0&portrait=0" +
      (videoHash ? "&h=" + encodeURIComponent(videoHash) : "")
    : null;

  if (source) {
    return (
      <div className={styles.motionSlot}>
        <div className={styles.videoFrame}>
          <iframe
            src={source}
            title={title}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.motionSlot}>
      <div
        className={styles.motionPoster}
        role="img"
        aria-label={category + " — " + title}
      >
        <div className={styles.posterTop}>
          <LogoMark className="h-5 w-auto" variant="light" />
          <span>WONKA MOTION · {number}</span>
          <span>{category}</span>
        </div>
        <div className={styles.posterContent}>
          <p>{category}</p>
          <h3>{title}</h3>
          <div className={styles.posterFlow}>
            {steps.map(([label, detail], index) => (
              <div className={styles.posterStep} key={label}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.posterBottom}>
          <span>Sources vérifiables</span>
          <span>Décision humaine</span>
        </div>
      </div>
    </div>
  );
}

export function TimeCalculator() {
  const reduced = useReducedMotion();
  const [people, setPeople] = useState(100);
  const [minutes, setMinutes] = useState(30);
  const hours = Math.round((people * minutes * 220) / 60);

  return (
    <div className={styles.calculator}>
      <div className={styles.calcPresets}>
        <span>Votre équipe</span>
        {[20, 50, 100, 200].map((count) => (
          <button
            key={count}
            type="button"
            aria-pressed={people === count}
            onClick={() => setPeople(count)}
          >
            {count}
          </button>
        ))}
      </div>
      <label htmlFor="btp-people">
        Collaborateurs concernés <strong>{people}</strong>
      </label>
      <input
        id="btp-people"
        type="range"
        min="1"
        max="200"
        value={people}
        onChange={(event) => setPeople(Number(event.target.value))}
      />
      <label htmlFor="btp-minutes">
        Minutes à réaffecter par personne et par jour{" "}
        <strong>{minutes} min</strong>
      </label>
      <input
        id="btp-minutes"
        type="range"
        min="5"
        max="120"
        step="5"
        value={minutes}
        onChange={(event) => setMinutes(Number(event.target.value))}
      />
      <div className={styles.hours}>
        <div className={styles.capacityBar} aria-hidden="true">
          <motion.span
            animate={{ width: Math.min(100, (minutes / 120) * 100) + "%" }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          />
        </div>
        <output>
          {new Intl.NumberFormat("fr-FR").format(hours)}
          <span> h / an (simulation)</span>
        </output>
        <p>à réinvestir dans vos chantiers, vos clients et vos équipes.</p>
      </div>
      <small>
        Simulation, pas un gain garanti. Hypothèse : 220 jours travaillés par
        an. À confirmer sur vos usages réels.
      </small>
    </div>
  );
}
