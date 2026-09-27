"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { legal } from "@/data/legal";
import { type ConsentChoice } from "@/lib/consent";
import { useConsent } from "./ConsentProvider";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright";

const buttonBase = `inline-flex min-h-11 flex-1 items-center justify-center rounded-sm px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${focusRing}`;

export function CookieBanner() {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    consent,
    banner,
    acceptAll,
    rejectAll,
    saveChoice,
    closeBanner,
    openPreferences,
  } = useConsent();
  const [draft, setDraft] = useState<ConsentChoice>({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    thirdParty: consent?.thirdParty ?? false,
  });

  useEffect(() => {
    panelRef.current?.focus();
  }, [banner]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    closeBanner();
  }

  const preferences = banner === "preferences";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div
        ref={panelRef}
        id="cookie-consent"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="pointer-events-auto mx-auto max-h-[min(85svh,44rem)] w-full max-w-3xl overflow-y-auto rounded-sm border border-line bg-ink-soft/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-md outline-none sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-xl font-semibold tracking-tight text-mist sm:text-2xl"
          >
            Nous respectons votre vie privée
          </h2>
          {consent ? (
            <button
              type="button"
              onClick={closeBanner}
              className={`shrink-0 rounded-sm px-2 py-1 text-sm text-mist-muted transition-colors hover:text-mist ${focusRing}`}
            >
              Fermer
            </button>
          ) : preferences ? (
            <button
              type="button"
              onClick={closeBanner}
              className={`shrink-0 rounded-sm px-2 py-1 text-sm text-mist-muted transition-colors hover:text-mist ${focusRing}`}
            >
              Retour
            </button>
          ) : null}
        </div>

        <p
          id={descriptionId}
          className="mt-3 text-sm leading-relaxed text-mist-muted sm:text-base"
        >
          Nous utilisons un cookie nécessaire pour mémoriser vos choix. Aucun
          cookie de mesure d&apos;audience, de publicité ou de contenu tiers
          n&apos;est déposé sur ce site pour le moment. Vous pouvez accepter,
          refuser ou personnaliser vos choix à tout moment.
        </p>

        {preferences ? (
          <ul className="mt-5 space-y-3">
            <CategoryRow
              title="Nécessaires"
              description={`Cookie ${legal.consentCookieName} : mémorise vos catégories, la date du choix et la version de la politique. Durée : ${legal.consentDurationLabel}. Toujours actif. Il n'est pas utilisé à des fins publicitaires.`}
              checked
              locked
            />
            <CategoryRow
              title="Mesure d'audience"
              description="Aucun outil de mesure d'audience n'est intégré au site. Le choix est enregistré, mais aucun cookie n'est déposé."
              checked={draft.analytics}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  analytics: !current.analytics,
                }))
              }
            />
            <CategoryRow
              title="Marketing / publicité"
              description="Aucun pixel ni cookie publicitaire n'est intégré au site. Le choix est enregistré, mais aucun cookie n'est déposé."
              checked={draft.marketing}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  marketing: !current.marketing,
                }))
              }
            />
            <CategoryRow
              title="Contenus tiers"
              description="Aucun contenu tiers (vidéo, carte ou widget) n'est intégré au site. Le choix est enregistré, mais aucun cookie n'est déposé."
              checked={draft.thirdParty}
              onToggle={() =>
                setDraft((current) => ({
                  ...current,
                  thirdParty: !current.thirdParty,
                }))
              }
            />
          </ul>
        ) : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={acceptAll}
            className={`${buttonBase} bg-copper text-ink hover:bg-copper-bright`}
          >
            Tout accepter
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className={`${buttonBase} border border-line bg-transparent text-mist hover:border-mist/40`}
          >
            Tout refuser
          </button>
          {preferences ? (
            <button
              type="button"
              onClick={() => saveChoice(draft)}
              className={`${buttonBase} border border-line bg-transparent text-mist hover:border-mist/40`}
            >
              Enregistrer mes choix
            </button>
          ) : (
            <button
              type="button"
              onClick={openPreferences}
              className={`${buttonBase} border border-line bg-transparent text-mist hover:border-mist/40`}
            >
              Personnaliser
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  locked = false,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onToggle?: () => void;
}) {
  const labelId = useId();

  return (
    <li className="flex items-start justify-between gap-4 rounded-sm border border-line bg-ink/40 p-4">
      <div id={labelId} className="min-w-0">
        <p className="text-sm font-medium text-mist">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-mist-muted">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        disabled={locked}
        onClick={onToggle}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors motion-reduce:transition-none ${
          checked ? "bg-copper" : "bg-mist/20"
        } ${locked ? "cursor-not-allowed opacity-80" : "cursor-pointer"} ${focusRing}`}
      >
        <span className="sr-only">{checked ? "Activé" : "Désactivé"}</span>
        <span
          aria-hidden
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-mist transition-transform motion-reduce:transition-none ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </li>
  );
}
