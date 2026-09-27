import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const linkClass =
  "text-copper-bright underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-bright";

export function LegalDocument({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-ink">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
          <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
            Informations légales
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-mist-muted">
            Dernière mise à jour : {updatedAt}
          </p>
          <div className="mt-10 space-y-10 text-sm leading-relaxed text-mist-muted sm:text-base">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2
        id={id}
        className="font-display text-2xl font-semibold tracking-tight text-mist"
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function Pending({ children }: { children: ReactNode }) {
  return <span className="font-medium text-mist">{children}</span>;
}

export function LegalLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}
