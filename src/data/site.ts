export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** Lien vers la marque commerciale (externe). Sinon → contact. */
  href?: string;
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
    title: "Développement web",
    tagline: "Des applications utiles et soignées",
    description:
      "Conception et développement d’applications web modernes : sites vitrines, outils métier et expériences digitales sur mesure.",
  },
];

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#approche", label: "Approche" },
  { href: "#contact", label: "Contact" },
] as const;
