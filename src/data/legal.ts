/**
 * Informations légales affichées sur le site.
 * Ne pas inventer une donnée manquante : laisser le marqueur [À COMPLÉTER].
 * Si un traceur est ajouté plus tard, incrémenter `policyVersion`
 * pour redemander le consentement.
 */
export const legal = {
  name: "ENE SOLUTIONS",
  legalForm: "SASU",
  capital: "1 000 €",
  address: "1 allée des Violettes, 35590 Clayes",
  siren: "108 375 346",
  siret: "108 375 346 00013",
  rcs: "RCS Rennes",
  vat: "FR92108375346",
  email: "contact@enesolutions.fr",
  phone: "07 61 46 18 92",
  phoneHref: "tel:+33761461892",
  director: "Eric Soret",
  messageRetention: "1 mois",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
    email: "privacy@vercel.com",
    website: "https://vercel.com",
  },
  mailbox: {
    name: "Hostinger International Ltd",
    address: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
    email: "gdpr@hostinger.com",
    website: "https://www.hostinger.com",
  },
  policyUpdatedAt: "27 septembre 2026",
  policyVersion: "2026-09-27",
  consentCookieName: "ene_consent",
  /** Environ 6 mois, durée maximale recommandée par la CNIL pour un choix cookies. */
  consentMaxAgeSeconds: 183 * 24 * 60 * 60,
  consentDurationLabel: "6 mois",
} as const;
