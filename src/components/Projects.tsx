import Image from "next/image";
import { existsSync } from "fs";
import path from "path";
import { projects, type Project } from "@/data/site";

function hasProjectImage(imagePath: string | undefined): boolean {
  if (!imagePath) return false;
  const absolute = path.join(process.cwd(), "public", imagePath);
  return existsSync(absolute);
}

function ProjectVisual({ project }: { project: Project }) {
  const ready = hasProjectImage(project.image);
  const alt =
    project.imageAlt ??
    `Capture d’écran du projet ${project.title} — ${project.category}, développeur web ENE Solutions`;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,137,74,0.18),transparent_60%)]"
        aria-hidden
      />
      {ready && project.image ? (
        <Image
          src={project.image}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="font-display text-sm tracking-[0.28em] text-copper uppercase">
            Aperçu
          </span>
          <span className="text-xs tracking-wide text-mist-muted">
            Capture à venir
          </span>
        </div>
      )}
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line"
        aria-hidden
      />
    </div>
  );
}

function ProjectBody({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
      <div className="order-2 grid gap-4 sm:grid-cols-[3.5rem_1fr] sm:gap-6 lg:order-1">
        <span className="font-display text-sm tracking-widest text-copper">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-xs tracking-[0.2em] text-mist-muted uppercase">
            {project.category}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-mist transition-colors group-hover:text-copper-bright sm:text-3xl">
            {project.title}
          </h3>
          {project.stack ? (
            <p className="mt-2 text-sm text-mist-muted italic">{project.stack}</p>
          ) : null}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist-muted sm:text-base">
            {project.description}
          </p>
          {!project.href ? (
            <p className="mt-3 text-sm text-copper/80">Démo sur demande</p>
          ) : (
            <p className="mt-5 text-sm tracking-wide text-copper transition-transform group-hover:translate-x-1">
              Voir le projet →
            </p>
          )}
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <ProjectVisual project={project} />
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projets"
      className="relative border-t border-line bg-ink-soft py-24 sm:py-32"
      aria-labelledby="projects-title"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
            Portfolio
          </p>
          <h2
            id="projects-title"
            className="font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
          >
            Sites et applications réalisés
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mist-muted sm:text-lg">
            Une sélection de projets web conçus et développés sous la marque ENE
            Solutions — vitrines, sites événementiels et outils métier.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {projects.map((project, index) => {
            const isExternal = Boolean(project.href?.startsWith("http"));

            return (
              <li
                key={project.id}
                className={project.href ? "group" : undefined}
              >
                <article>
                  {project.href ? (
                    <a
                      href={project.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block py-10 sm:py-12"
                    >
                      <ProjectBody project={project} index={index} />
                    </a>
                  ) : (
                    <div className="py-10 sm:py-12">
                      <ProjectBody project={project} index={index} />
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
