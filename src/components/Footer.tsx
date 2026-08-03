import { navLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink py-12 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.2em] text-mist">
            ENE
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist-muted">
            Photographie · Danse · DJ & événementiel · Secourisme · Développement
            web
          </p>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Pied de page">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-mist-muted transition-colors hover:text-mist"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-mist-muted">
          © {year} Ene Solutions. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
