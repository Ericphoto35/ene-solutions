import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  JsonLd,
  breadcrumbRealisationsSchema,
  faqRealisationsSchema,
  professionalServiceSchema,
  projectsItemListSchema,
  realisationsPageSchema,
} from "@/components/JsonLd";
import { Projects } from "@/components/Projects";
import { SITE_NAME, SITE_URL, WEB_OFFER } from "@/data/seo";

const faqs = [
  {
    question: "Que fait un développeur web chez ENE Solutions ?",
    answer:
      "Je conçois et développe des sites vitrines, des sites institutionnels et des applications métier : design, développement, mise en ligne et évolutions. L’objectif est un outil clair, rapide et adapté à votre activité.",
  },
  {
    question: "Quels types de projets web pouvez-vous réaliser ?",
    answer:
      "Sites pour photographes, écoles de danse, DJs et associations, vitrines commerciales, hubs de marque, et applications de gestion (matériel, réservations, outils internes).",
  },
  {
    question: "Comment démarrer un projet de site ou d’application ?",
    answer:
      "Un premier échange permet de clarifier vos besoins, votre budget et vos délais. Ensuite : conception, développement, tests, mise en ligne, puis accompagnement si besoin.",
  },
] as const;

export const metadata: Metadata = {
  title: "Développeur web — Réalisations",
  description:
    "Développeur web ENE Solutions : sites vitrines, applications métier et projets digitaux sur mesure. Portfolio de réalisations web en France.",
  alternates: {
    canonical: "/realisations",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/realisations`,
    siteName: SITE_NAME,
    title: "Développeur web — Réalisations | ENE Solutions",
    description: WEB_OFFER.short,
    images: [
      {
        url: "/projects/ene-solutions.webp",
        width: 1200,
        height: 750,
        alt: "Aperçu du site ENE Solutions — réalisations développeur web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Développeur web — Réalisations | ENE Solutions",
    description: WEB_OFFER.short,
    images: ["/projects/ene-solutions.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RealisationsPage() {
  return (
    <>
      <JsonLd
        data={[
          professionalServiceSchema(),
          realisationsPageSchema(),
          breadcrumbRealisationsSchema(),
          projectsItemListSchema(),
          faqRealisationsSchema([...faqs]),
        ]}
      />
      <Header />
      <main>
        <section
          className="relative overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20"
          aria-labelledby="realisations-brand"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,137,74,0.14),transparent_55%)]"
            aria-hidden
          />
          <div className="grain opacity-20" aria-hidden />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <nav
              className="animate-fade-up mb-8 text-sm text-mist-muted"
              aria-label="Fil d’Ariane"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <a href="/" className="transition-colors hover:text-mist">
                    Accueil
                  </a>
                </li>
                <li aria-hidden className="text-line">
                  /
                </li>
                <li className="text-mist">Réalisations web</li>
              </ol>
            </nav>

            <p className="animate-fade-up delay-1 mb-3 text-sm tracking-[0.3em] text-copper uppercase">
              Développeur web
            </p>
            <h1
              id="realisations-brand"
              className="animate-fade-up delay-1 font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl lg:text-6xl"
            >
              Réalisations web
            </h1>
            <p className="animate-fade-up delay-2 mt-5 max-w-2xl text-base leading-relaxed text-mist-muted sm:text-lg">
              {WEB_OFFER.long}
            </p>
            <div className="animate-fade-up delay-3 mt-10 flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="rounded-sm bg-copper px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-copper-bright"
              >
                Parler de votre projet
              </a>
              <a
                href="#projets"
                className="rounded-sm border border-line px-6 py-3.5 text-sm font-medium tracking-wide text-mist transition-colors hover:border-mist-muted hover:bg-glass"
              >
                Voir les projets
              </a>
            </div>
          </div>
        </section>

        <section
          className="border-t border-line py-20 sm:py-24"
          aria-labelledby="offre-web-title"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
                Offre
              </p>
              <h2
                id="offre-web-title"
                className="font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
              >
                Un développeur web pour des projets concrets.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-mist-muted sm:text-lg">
              <p>
                Que vous ayez besoin d’un site vitrine pour présenter votre
                activité, d’une page événementielle pour convertir des
                demandes, ou d’une application pour gérer votre matériel au
                quotidien, je construis des solutions web sobres, lisibles et
                durables.
              </p>
              <p>
                Le parcours est simple : écoute du besoin, conception,
                développement, mise en ligne, puis ajustements. Les projets
                ci-dessous illustrent cette approche — photographie, danse,
                événementiel, associations et outils métier — sous la marque{" "}
                {SITE_NAME}.
              </p>
              <ul className="grid gap-3 border-l border-line pl-5 text-sm sm:text-base">
                <li>Sites vitrines et institutionnels</li>
                <li>Interfaces métier et outils de gestion</li>
                <li>Design responsive, performance et SEO de base</li>
                <li>Mise en ligne et accompagnement</li>
              </ul>
            </div>
          </div>
        </section>

        <Projects />

        <section
          className="border-t border-line py-20 sm:py-24"
          aria-labelledby="faq-web-title"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
              FAQ
            </p>
            <h2
              id="faq-web-title"
              className="font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
            >
              Questions fréquentes
            </h2>
            <dl className="mt-12 divide-y divide-line border-y border-line">
              {faqs.map((faq) => (
                <div key={faq.question} className="grid gap-3 py-8 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
                  <dt className="font-display text-xl font-semibold text-mist">
                    {faq.question}
                  </dt>
                  <dd className="text-base leading-relaxed text-mist-muted">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
