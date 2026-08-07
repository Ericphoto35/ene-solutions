/** URL canonique du site (surchargeable via NEXT_PUBLIC_SITE_URL sur Vercel). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ene-solutions.vercel.app";

export const SITE_NAME = "ENE Solutions";
export const SITE_EMAIL = "contact@enesolutions.fr";

export const WEB_OFFER = {
  title: "Développeur web",
  short:
    "Conception et développement de sites vitrines, applications métier et expériences digitales sur mesure.",
  long: "ENE Solutions accompagne particuliers, associations et professionnels dans la création de sites web et d’applications utiles : identité visuelle, développement, mise en ligne et évolutions. Chaque projet est pensé pour être clair, rapide et adapté à votre activité — du site vitrine photographie ou danse jusqu’aux outils métier sur mesure.",
} as const;
