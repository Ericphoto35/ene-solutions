import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Projects } from "@/components/Projects";

export const metadata: Metadata = {
  title: "Réalisations | Ene Solutions",
  description:
    "Sites et applications développés sous la marque Ene Solutions — vitrines, outils métier et expériences digitales.",
};

export default function RealisationsPage() {
  return (
    <>
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
            <p className="animate-fade-up mb-3 text-sm tracking-[0.3em] text-copper uppercase">
              Développement web
            </p>
            <h1
              id="realisations-brand"
              className="animate-fade-up delay-1 font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl lg:text-6xl"
            >
              Réalisations
            </h1>
            <p className="animate-fade-up delay-2 mt-5 max-w-xl text-base leading-relaxed text-mist-muted sm:text-lg">
              Sites vitrines et applications métier conçus sous la marque ENE
              Solutions — du brief à la mise en ligne, avec la même exigence que
              pour chaque métier du studio.
            </p>
            <div className="animate-fade-up delay-3 mt-10">
              <a
                href="/#contact"
                className="rounded-sm bg-copper px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-copper-bright"
              >
                Parler de votre projet
              </a>
            </div>
          </div>
        </section>

        <Projects />
      </main>
      <Footer />
    </>
  );
}
