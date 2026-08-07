"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { navLinks } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const { style: htmlStyle } = document.documentElement;
    const { style: bodyStyle } = document.body;
    const prevHtmlOverflow = htmlStyle.overflow;
    const prevBodyOverflow = bodyStyle.overflow;

    htmlStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      htmlStyle.overflow = prevHtmlOverflow;
      bodyStyle.overflow = prevBodyOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const mobileMenu =
    mounted &&
    open &&
    createPortal(
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        className="fixed inset-0 z-[100] md:hidden"
      >
        <div className="absolute inset-0 bg-[#07111f]" aria-hidden />

        <div className="relative flex h-[100dvh] w-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:h-20 sm:px-8">
            <a
              href="/"
              className="font-display text-lg font-bold tracking-[0.18em] text-mist sm:text-xl"
              onClick={() => setOpen(false)}
            >
              ENE
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-mist"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
            >
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span className="absolute top-1.5 left-0 h-0.5 w-full rotate-45 bg-current" />
                <span className="absolute top-1.5 left-0 h-0.5 w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16"
            aria-label="Navigation mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-3xl font-semibold text-mist transition-colors hover:text-copper-bright"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="mt-2 rounded-sm bg-copper px-6 py-3 text-sm font-medium text-ink"
              onClick={() => setOpen(false)}
            >
              Nous contacter
            </a>
          </nav>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`border-b transition-[background,border-color,backdrop-filter] duration-300 ${
            scrolled && !open
              ? "border-line bg-ink/80 backdrop-blur-md"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
            <a
              href="/"
              className="font-display text-lg font-bold tracking-[0.18em] text-mist transition-colors hover:text-copper-bright sm:text-xl"
            >
              ENE
            </a>

            <nav
              className="hidden items-center gap-10 md:flex"
              aria-label="Navigation principale"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-mist-muted transition-colors hover:text-mist"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contact"
                className="rounded-sm bg-copper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-copper-bright"
              >
                Contact
              </a>
            </nav>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center text-mist md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5" aria-hidden>
                <span className="absolute top-0 left-0 h-0.5 w-full bg-current" />
                <span className="absolute top-1.5 left-0 h-0.5 w-full bg-current" />
                <span className="absolute top-3 left-0 h-0.5 w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}
