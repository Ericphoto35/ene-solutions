export function Approach() {
  return (
    <section
      id="approche"
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="approche-title"
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,137,74,0.12),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
            Approche
          </p>
          <h2
            id="approche-title"
            className="font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl"
          >
            Une présence humaine, des livrables solides.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-mist-muted sm:text-lg">
            Une vision simple : proposer des services concrets, bien faits, et
            adaptés à ce dont vous avez vraiment besoin — sans jargon inutile,
            avec une écoute attentive du premier échange jusqu’à la livraison.
          </p>
        </div>

        <ol className="space-y-8 border-l border-line pl-6 sm:pl-8">
          {[
            {
              title: "Écoute",
              text: "On clarifie vos objectifs, votre contexte et vos contraintes avant de proposer une solution.",
            },
            {
              title: "Conception",
              text: "Direction artistique, playlist, plan de formation ou architecture technique : chaque détail est pensé.",
            },
            {
              title: "Réalisation",
              text: "Exécution soignée, communication claire, et un résultat dont vous pouvez être fier.",
            },
          ].map((step, i) => (
            <li key={step.title} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-copper sm:-left-[2.4rem]"
                aria-hidden
              />
              <p className="text-xs tracking-[0.25em] text-copper uppercase">
                Étape {i + 1}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-mist">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-muted sm:text-base">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
