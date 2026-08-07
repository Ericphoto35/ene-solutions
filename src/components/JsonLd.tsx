import { projects } from "@/data/site";
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  WEB_OFFER,
} from "@/data/seo";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLd }) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    logo: `${SITE_URL}/icon.png`,
    description:
      "Multiservices créatifs et techniques : photographie, danse, événementiel, secourisme et développeur web.",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_EMAIL,
      contactType: "customer service",
      availableLanguage: ["French"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/realisations#service`,
    name: `${SITE_NAME} — ${WEB_OFFER.title}`,
    url: `${SITE_URL}/realisations`,
    email: SITE_EMAIL,
    image: `${SITE_URL}/icon.png`,
    description: WEB_OFFER.long,
    serviceType: WEB_OFFER.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    availableLanguage: ["French"],
    priceRange: "€€",
  };
}

export function realisationsPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/realisations#webpage`,
    url: `${SITE_URL}/realisations`,
    name: "Réalisations web — Développeur web | ENE Solutions",
    description: WEB_OFFER.short,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/realisations#service` },
    mainEntity: { "@id": `${SITE_URL}/realisations#project-list` },
  };
}

export function breadcrumbRealisationsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Réalisations web",
        item: `${SITE_URL}/realisations`,
      },
    ],
  };
}

export function projectsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/realisations#project-list`,
    name: "Réalisations développeur web ENE Solutions",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}/realisations#${project.id}`,
        name: project.title,
        description: project.description,
        ...(project.href
          ? {
              url: project.href.startsWith("http")
                ? project.href
                : `${SITE_URL}${project.href}`,
            }
          : {}),
        ...(project.image
          ? { image: `${SITE_URL}${project.image}` }
          : {}),
        creator: { "@id": `${SITE_URL}/#organization` },
        keywords: [project.category, "développeur web", SITE_NAME].join(", "),
      },
    })),
  };
}

export function faqRealisationsSchema(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
