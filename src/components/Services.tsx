import { services } from "@/data/site";

export function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-line bg-ink-soft py-24 sm:py-32"
      aria-labelledby="services-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
            Expertise
          </p>
          <h2
            id="services-title"
            className="font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl"
          >
            Cinq métiers, une même exigence.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mist-muted sm:text-lg">
            Que vous prépariez un grand jour, une formation utile ou un outil
            digital, Ene Solutions accompagne chaque projet avec précision et
            sens du détail.
          </p>
        </div>

        <ul className="mt-16 divide-y divide-line border-y border-line">
          {services.map((service, index) => {
            const href = service.href ?? `/?service=${service.id}#contact`;
            const isExternal = href.startsWith("http");
            return (
              <li key={service.id} className="group">
                <a
                  href={href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid gap-4 py-8 transition-colors sm:grid-cols-[4rem_1fr_1.2fr_auto] sm:items-baseline sm:gap-8 sm:py-10"
                >
                  <span className="font-display text-sm tracking-widest text-copper">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-mist transition-colors group-hover:text-copper-bright sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-mist-muted italic">
                      {service.tagline}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-mist-muted sm:text-base">
                    {service.description}
                  </p>
                  <span
                    className="hidden text-copper transition-transform group-hover:translate-x-1 sm:inline"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
