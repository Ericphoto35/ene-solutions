export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink"
      aria-labelledby="hero-brand"
    >
      <div className="absolute inset-0 animate-drift will-change-transform" aria-hidden>
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-atelier.jpg')",
          }}
          role="img"
          aria-label="Atelier créatif vide, lumière chaude et ambiance feutrée"
        />
      </div>

      {/* Assombrir le tiers gauche pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      <div className="grain opacity-30" aria-hidden />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <p className="animate-fade-up delay-1 mb-4 text-sm tracking-[0.35em] text-copper-bright uppercase">
          Multiservices · Création · Formation
        </p>

        <h1
          id="hero-brand"
          className="animate-fade-up delay-2 font-display text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.85] font-bold tracking-tight text-mist"
        >
          ENE
          <span className="mt-2 block text-[clamp(1.1rem,3.2vw,2rem)] font-medium tracking-[0.28em] text-mist-muted uppercase">
            Solutions
          </span>
        </h1>

        <p className="animate-fade-up delay-3 mt-8 max-w-xl text-base leading-relaxed text-mist/85 sm:text-lg">
          Derrière ENE Solutions, un même professionnel au service de plusieurs
          métiers : image, événementiel, secourisme et développeur web.
        </p>

        <div className="animate-fade-up delay-4 mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded-sm bg-copper px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-copper-bright"
          >
            Nous contacter
          </a>
          <a
            href="#services"
            className="rounded-sm border border-line px-6 py-3.5 text-sm font-medium tracking-wide text-mist transition-colors hover:border-mist-muted hover:bg-glass"
          >
            Découvrir les services
          </a>
        </div>
      </div>
    </section>
  );
}
