"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SITE_EMAIL, SITE_NAME } from "@/data/seo";
import {
  countdownParts,
  isSiteGated,
  OPENING_LABEL,
  type CountdownParts,
} from "@/data/opening";

const UNITS: { key: keyof CountdownParts; label: string }[] = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Secondes" },
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function OpeningSplash() {
  const [parts, setParts] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const tick = () => setParts(countdownParts());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="opening-title"
      aria-describedby="opening-desc"
    >
      {/* Dégradé transparent : le site reste visible, mais illisible */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/70 to-ink/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-ink/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,137,74,0.18),transparent_58%)]" />
        <div className="grain opacity-30" />
      </div>

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <p className="animate-fade-up delay-1 mb-5 text-sm tracking-[0.35em] text-copper-bright uppercase">
          {SITE_NAME}
        </p>

        <p
          id="opening-title"
          className="animate-fade-up delay-2 font-display text-[clamp(2.4rem,8vw,6.5rem)] leading-[0.9] font-bold tracking-tight text-mist"
        >
          Grande ouverture
        </p>

        <h1 className="animate-fade-up delay-3 mt-5 font-display text-[clamp(1.35rem,4.2vw,2.75rem)] font-semibold tracking-[0.12em] text-copper-bright uppercase sm:tracking-[0.2em]">
          {OPENING_LABEL}
        </h1>

        <div
          className="animate-shimmer mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-copper to-transparent"
          aria-hidden
        />

        <p
          id="opening-desc"
          className="animate-fade-up delay-4 mt-8 max-w-md text-base leading-relaxed text-mist/85 sm:text-lg"
        >
          Le site se dévoile bientôt. En attendant, les coulisses se préparent.
        </p>

        {parts ? (
          <ol
            className="animate-fade-up delay-4 mt-12 grid grid-cols-4 gap-2 sm:gap-4"
            aria-label="Compte à rebours avant l’ouverture"
          >
            {UNITS.map((unit) => (
              <li
                key={unit.key}
                className="min-w-[4.25rem] rounded-sm border border-line bg-glass px-2 py-3 sm:min-w-[5.5rem] sm:px-3 sm:py-4"
              >
                <span className="font-display block text-2xl font-bold tabular-nums text-mist sm:text-4xl">
                  {unit.key === "days" ? parts[unit.key] : pad(parts[unit.key])}
                </span>
                <span className="mt-1 block text-[0.65rem] tracking-[0.18em] text-mist-muted uppercase sm:text-xs">
                  {unit.label}
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-12 h-[5.75rem] sm:h-[6.75rem]" aria-hidden />
        )}

        <a
          href={`mailto:${SITE_EMAIL}`}
          className="animate-fade-up delay-4 mt-12 text-sm text-copper-bright transition-colors hover:text-copper"
        >
          {SITE_EMAIL}
        </a>
      </div>
    </div>
  );
}

export function OpeningGate({
  children,
  initiallyGated,
}: {
  children: ReactNode;
  initiallyGated: boolean;
}) {
  const [gated, setGated] = useState(initiallyGated);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("preview");
    if (preview || !isSiteGated()) {
      setGated(false);
      return;
    }

    const id = window.setInterval(() => {
      if (!isSiteGated()) setGated(false);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!gated) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [gated]);

  return (
    <>
      {gated ? <OpeningSplash /> : null}
      <div inert={gated || undefined}>{children}</div>
    </>
  );
}
