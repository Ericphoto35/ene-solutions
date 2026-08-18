"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
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
    const frame = window.requestAnimationFrame(() => {
      setParts(countdownParts());
    });
    const id = window.setInterval(() => {
      setParts(countdownParts());
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(id);
    };
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
      <div className="pointer-events-none absolute inset-0 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/45 to-ink/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,137,74,0.2),transparent_55%)]" />
        <div className="grain opacity-30" />
      </div>

      <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <p className="animate-fade-up delay-1 mb-5 text-sm tracking-[0.35em] text-copper-bright uppercase">
          {SITE_NAME}
        </p>

        <h1
          id="opening-title"
          className="animate-fade-up delay-2 font-display text-[clamp(3rem,12vw,8.5rem)] leading-[0.85] font-bold tracking-tight text-mist"
        >
          Grande ouverture
        </h1>

        <p className="animate-fade-up delay-3 mt-6 font-display text-[clamp(1.5rem,5vw,3.25rem)] font-semibold tracking-[0.12em] text-copper-bright uppercase sm:tracking-[0.18em]">
          {OPENING_LABEL}
        </p>

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

function subscribeGate(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.clearInterval(id);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getGateSnapshot() {
  if (new URLSearchParams(window.location.search).has("preview")) return false;
  return isSiteGated();
}

export function OpeningGate({
  children,
  initiallyGated,
}: {
  children: ReactNode;
  initiallyGated: boolean;
}) {
  const gated = useSyncExternalStore(
    subscribeGate,
    getGateSnapshot,
    () => initiallyGated,
  );

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
