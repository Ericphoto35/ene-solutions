import Link from "next/link";
import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
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
            Photographie · Danse · DJ & événementiel · Secourisme · Développeur
            web
          </p>
        </div>

        <nav className="flex flex-wrap gap-6" aria-label="Pied de page">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-mist-muted transition-colors hover:text-mist"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:text-right">
          <p className="text-sm text-mist-muted">
            © {year} Ene Solutions et Eric Soret. Tous droits réservés.
          </p>
          <nav
            aria-label="Liens légaux"
            className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 md:justify-end"
          >
            <Link
              href="/mentions-legales"
              className="text-sm text-mist-muted transition-colors hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright"
            >
              Mentions légales
            </Link>
            <span aria-hidden="true" className="text-sm text-mist-muted">
              ·
            </span>
            <Link
              href="/politique-de-confidentialite"
              className="text-sm text-mist-muted transition-colors hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright"
            >
              Politique de confidentialité
            </Link>
            <span aria-hidden="true" className="text-sm text-mist-muted">
              ·
            </span>
            <ManageCookiesButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}
