export type TrackerCategory = "analytics" | "marketing" | "thirdParty";

export type OptionalTracker = {
  id: string;
  category: TrackerCategory;
  src: string;
  label: string;
};

/**
 * Scripts non essentiels.
 * La liste est vide : le site ne charge ni GA4, ni GTM, ni Google Ads,
 * ni Meta Pixel, ni Hotjar, ni Clarity, ni embed (YouTube, Vimeo, Maps),
 * ni reCAPTCHA, ni chat, ni pixel publicitaire.
 *
 * Google Consent Mode v2 n'est pas injecté : aucun tag Google n'est présent.
 * Charger gtag.js uniquement pour le Consent Mode contacterait Google.
 *
 * Pour ajouter un traceur : le déclarer ici, puis incrémenter
 * `legal.policyVersion` afin de redemander le consentement.
 * Le script n'est inséré qu'après un accord explicite pour sa catégorie.
 */
export const optionalTrackers: OptionalTracker[] = [];
