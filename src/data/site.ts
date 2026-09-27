export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Lien vers la marque commerciale (externe) ou page interne. Sinon → contact. */
  href?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Lien live si disponible */
  href?: string;
  stack?: string;
  /** Capture dans /public/projects/ — ex. /projects/foo.webp */
  image?: string;
  /** Texte alternatif SEO de la capture */
  imageAlt?: string;
};

export const services: Service[] = [
  {
    id: "photographie",
    title: "Photographie de mariage",
    tagline: "L’instant, capturé avec élégance",
    description:
      "Reportages sensibles et direction artistique pour immortaliser votre journée — des préparatifs jusqu’à la dernière danse.",
    href: "https://www.loeil_de_monsieur_r.fr",
  },
  {
    id: "danse",
    title: "Cours de danse",
    tagline: "Rythme, posture, plaisir",
    description:
      "Cours individuels ou en groupe pour progresser en douceur, préparer une danse de mariage ou simplement se retrouver sur la piste.",
    href: "https://www.quericomambo.fr",
  },
  {
    id: "dj",
    title: "DJ & événementiel",
    tagline: "L’ambiance, de A à Z",
    description:
      "Animation musicale et coordination technique pour mariages, soirées privées et événements d’entreprise — playlist sur mesure, énergie maîtrisée.",
    href: "https://groovin90s.com/",
  },
  {
    id: "secourisme",
    title: "Formation secourisme",
    tagline: "Savoir réagir, sauver",
    description:
      "Formations concrètes et accessibles pour acquérir les gestes qui sauvent — particuliers, équipes et structures professionnelles.",
  },
  {
    id: "web",
    title: "Développeur web",
    tagline: "Des applications utiles et soignées",
    description:
      "Conception et développement de sites vitrines, outils métier et expériences digitales sur mesure — du brief à la mise en ligne.",
    href: "/realisations",
  },
];

/** Sites & apps développés sous la marque ENE Solutions */
export const projects: Project[] = [
  {
    id: "les-mariages-monsieur-r",
    title: "Les Mariages de Monsieur R",
    category: "Site vitrine",
    description:
      "Site vitrine de photographie de mariage conçu sur mesure : univers élégant, portfolios et prise de contact pour convertir les couples en demandes.",
    href: "https://www.monsieurr-mariages.fr/",
    stack: "Design sur mesure",
    image: "/projects/les-mariages-monsieur-r.webp",
    imageAlt:
      "Site Les Mariages de Monsieur R — vitrine web photographie de mariage",
  },
  {
    id: "monsieur-r",
    title: "L’Œil de Monsieur R",
    category: "Site vitrine",
    description:
      "Identité et site pour la photographie de mariage — mise en avant du reportage, de l’ambiance et d’un parcours de contact clair.",
    href: "https://www.loeil_de_monsieur_r.fr",
    stack: "Next.js · Design sur mesure",
    image: "/projects/monsieur-r.webp",
    imageAlt: "Site L’Œil de Monsieur R — portfolio photographe de mariage",
  },
  {
    id: "quericomambo",
    title: "Quericomambo",
    category: "Site vitrine",
    description:
      "Présence web pour les cours de danse : offre, ambiance et inscription, pensée mobile-first pour convertir sans surcharge.",
    href: "https://www.quericomambo.fr",
    stack: "Next.js · Expérience mobile",
    image: "/projects/quericomambo.webp",
    imageAlt: "Site Quericomambo — cours de danse en ligne et vitrine web",
  },
  {
    id: "groovin90s",
    title: "Groovin 90s",
    category: "Site événementiel",
    description:
      "Vitrine DJ & animation : univers musical, prestations et demande de devis pour soirées, mariages et événements.",
    href: "https://groovin90s.com/",
    stack: "Web · Branding digital",
    image: "/projects/groovin90s.webp",
    imageAlt: "Site Groovin 90s — vitrine web DJ et événementiel",
  },
  {
    id: "ene-solutions",
    title: "ENE Solutions",
    category: "Site institutionnel",
    description:
      "Hub multiservices : photographie, danse, événementiel, secourisme et développeur web sous une même marque institutionnelle.",
    href: "/",
    stack: "Next.js · Tailwind",
    image: "/projects/ene-solutions.webp",
    imageAlt: "Site institutionnel ENE Solutions — développeur web et multiservices",
  },
  {
    id: "gestion-materiel",
    title: "Gestion matériel",
    category: "Application métier",
    description:
      "Application web pour suivre le parc matériel, les mouvements et la disponibilité au quotidien — outil métier interne.",
    stack: "Application web",
    image: "/projects/gestion-materiel.webp",
    imageAlt: "Application web de gestion de matériel — interface métier",
  },
  {
    id: "salsarennes",
    title: "Salsa Rennes",
    category: "Site vitrine",
    description:
      "Site pour la communauté salsa à Rennes : cours, soirées et informations pratiques, conçu pour informer et orienter les élèves.",
    href: "https://salsarennes.fr",
    stack: "Design sur mesure",
    image: "/projects/salsarennes.webp",
    imageAlt: "Site Salsa Rennes — vitrine web école et communauté salsa",
  },
  {
    id: "salsacubaine",
    title: "Aturitmobaila",
    category: "Site vitrine",
    description:
      "Site de l’école de salsa cubaine Aturitmobaila — présentation des cours, de l’univers et de la prise de contact.",
    href: "https://salsacubaine.fr",
    stack: "Design sur mesure",
    image: "/projects/salsacubaine.webp",
    imageAlt: "Site Aturitmobaila (salsacubaine.fr) — école de salsa cubaine",
  },
];

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/#approche", label: "Approche" },
  { href: "/#contact", label: "Contact" },
] as const;
