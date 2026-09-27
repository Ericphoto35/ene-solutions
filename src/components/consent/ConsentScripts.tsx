"use client";

import { useEffect } from "react";
import { optionalTrackers } from "@/data/trackers";
import { useConsent } from "./ConsentProvider";

/**
 * Insère les traceurs non essentiels uniquement après un accord
 * explicite pour leur catégorie. Retire la balise si l'accord est retiré.
 * Un script déjà exécuté ne peut pas toujours être « déchargé » :
 * dans ce cas, ConsentProvider recharge la page.
 */
export function ConsentScripts() {
  const { consent } = useConsent();

  useEffect(() => {
    for (const tracker of optionalTrackers) {
      const allowed = consent?.[tracker.category] === true;
      const existing = document.getElementById(tracker.id);

      if (allowed && !existing) {
        const script = document.createElement("script");
        script.id = tracker.id;
        script.src = tracker.src;
        script.async = true;
        script.dataset.consentCategory = tracker.category;
        document.head.appendChild(script);
      }

      if (!allowed && existing) {
        existing.remove();
      }
    }
  }, [consent]);

  return null;
}
