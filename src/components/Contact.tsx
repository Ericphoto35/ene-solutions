"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/data/site";

type FormState = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export function Contact() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (!serviceId) return;
    const match = services.find((s) => s.id === serviceId);
    if (match) {
      setForm((prev) => ({ ...prev, service: match.title }));
    }
  }, [searchParams]);

  const mailto = useMemo(() => {
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const subject = encodeURIComponent(
      `Demande Ene Solutions — ${form.service || "Informations"}`,
    );
    const body = encodeURIComponent(
      `Bonjour,\n\nNom : ${name}\nEmail : ${email}\nService : ${form.service || "—"}\n\nMessage :\n${message}\n`,
    );
    return `mailto:contact@enesolutions.fr?subject=${subject}&body=${body}`;
  }, [form]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (name.length > 120 || email.length > 254 || message.length > 4000) return;
    setSubmitted(true);
    window.location.href = mailto;
  }

  return (
    <section
      id="contact"
      className="relative border-t border-line bg-ink-soft py-24 sm:py-32"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-3 text-sm tracking-[0.3em] text-copper uppercase">
            Contact
          </p>
          <h2
            id="contact-title"
            className="font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl"
          >
            Racontons votre prochain projet.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist-muted sm:text-lg">
            Un mariage à immortaliser, une soirée à animer, une formation à
            organiser ou une application à bâtir — écrivez-nous, on vous
            répond rapidement.
          </p>
          <div className="mt-10 space-y-3 text-sm text-mist-muted">
            <p>
              <span className="text-mist">Email</span>
              <br />
              <a
                href="mailto:contact@enesolutions.fr"
                className="text-copper-bright transition-colors hover:text-copper"
              >
                contact@enesolutions.fr
              </a>
            </p>
            <p>
              <span className="text-mist">Disponibilité</span>
              <br />
              Sur rendez-vous · France entière
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 rounded-sm border border-line bg-glass p-6 sm:p-8"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-mist-muted">Nom</span>
              <input
                required
                name="name"
                autoComplete="name"
                maxLength={120}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-sm border border-line bg-ink/50 px-4 py-3 text-mist outline-none transition-colors placeholder:text-mist-muted/50 focus:border-copper"
                placeholder="Votre nom"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-mist-muted">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-sm border border-line bg-ink/50 px-4 py-3 text-mist outline-none transition-colors placeholder:text-mist-muted/50 focus:border-copper"
                placeholder="vous@email.fr"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-2 block text-mist-muted">Service</span>
            <select
              name="service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-sm border border-line bg-ink/50 px-4 py-3 text-mist outline-none transition-colors focus:border-copper"
            >
              <option value="">Sélectionner un service</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-2 block text-mist-muted">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              maxLength={4000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-y rounded-sm border border-line bg-ink/50 px-4 py-3 text-mist outline-none transition-colors placeholder:text-mist-muted/50 focus:border-copper"
              placeholder="Parlez-nous de votre projet, de la date et de vos attentes…"
            />
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              className="rounded-sm bg-copper px-6 py-3.5 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-copper-bright"
            >
              Envoyer le message
            </button>
            {submitted && (
              <p className="text-sm text-mist-muted" role="status">
                Ouverture de votre client mail…
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
