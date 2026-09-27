import type { Metadata } from "next";
import { legal } from "@/data/legal";
import { services } from "@/data/site";
import {
  LegalDocument,
  LegalLink,
  LegalSection,
  Pending,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: { absolute: "Mentions légales | ENE Solutions" },
  description:
    "Mentions légales du site ENE Solutions : éditeur, hébergeur, propriété intellectuelle et droit applicable.",
  openGraph: {
    title: "Mentions légales | ENE Solutions",
    description:
      "Mentions légales du site ENE Solutions : éditeur, hébergeur, propriété intellectuelle et droit applicable.",
    locale: "fr_FR",
    type: "website",
  },
};

const externalSites = services.filter(
  (service): service is typeof service & { href: string } => Boolean(service.href),
);

export default function MentionsLegalesPage() {
  return (
    <LegalDocument title="Mentions légales" updatedAt={legal.policyUpdatedAt}>
      <LegalSection id="editeur" title="Éditeur du site">
        <dl className="space-y-3">
          <Info label="Nom / raison sociale" value={legal.name} />
          <Info label="Forme juridique" value={legal.legalForm} />
          <Info label="Capital social" value={legal.capital} />
          <Info label="Adresse du siège social" value={legal.address} />
          <Info label="SIREN" value={legal.siren} />
          <Info label="SIRET" value={legal.siret} />
          <Info label="RCS" value={legal.rcs} />
          <Info label="Numéro de TVA intracommunautaire" value={legal.vat} />
          <div>
            <dt className="text-mist">Email</dt>
            <dd>
              <a
                href={`mailto:${legal.email}`}
                className="text-copper-bright underline decoration-copper/40 underline-offset-4 hover:text-copper"
              >
                {legal.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-mist">Téléphone</dt>
            <dd>
              <a
                href={legal.phoneHref}
                className="text-copper-bright underline decoration-copper/40 underline-offset-4 hover:text-copper"
              >
                {legal.phone}
              </a>
            </dd>
          </div>
          <Info label="Directeur de la publication" value={legal.director} />
        </dl>
      </LegalSection>

      <LegalSection id="hebergeur" title="Hébergeur">
        <dl className="space-y-3">
          <Info label="Nom" value={legal.host.name} />
          <Info label="Adresse" value={legal.host.address} />
          <div>
            <dt className="text-mist">Contact</dt>
            <dd>
              <a
                href={`mailto:${legal.host.email}`}
                className="text-copper-bright underline decoration-copper/40 underline-offset-4 hover:text-copper"
              >
                {legal.host.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-mist">Site web</dt>
            <dd>
              <LegalLink href={legal.host.website} external>
                vercel.com
              </LegalLink>
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="propriete" title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels,
          structure et éléments graphiques) est protégé. Sauf mention
          contraire, ils sont la propriété de {legal.name} ou utilisés avec
          l&apos;autorisation de leurs titulaires.
        </p>
        <p>
          Toute reproduction, représentation ou exploitation, totale ou
          partielle, sans autorisation écrite préalable de l&apos;éditeur est
          interdite, en dehors des exceptions prévues par le code de la
          propriété intellectuelle.
        </p>
      </LegalSection>

      <LegalSection id="responsabilite" title="Responsabilité">
        <p>
          {legal.name} s&apos;efforce de fournir des informations fiables et à
          jour. Ces informations sont présentées à titre indicatif et peuvent
          évoluer. L&apos;éditeur ne garantit pas l&apos;exhaustivité ni
          l&apos;absence d&apos;erreur.
        </p>
        <p>
          Le site propose des liens vers d&apos;autres sites, ouverts en dehors
          de ces pages. Leur contenu et leurs politiques leur sont propres.{" "}
          {legal.name} n&apos;exerce pas de contrôle sur ces sites au moment de
          la visite.
        </p>
        {externalSites.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {externalSites.map((service) => (
              <li key={service.id}>
                {service.title}
                {" — "}
                <LegalLink href={service.href} external>
                  {service.href}
                </LegalLink>
              </li>
            ))}
          </ul>
        ) : null}
      </LegalSection>

      <LegalSection id="droit" title="Droit applicable">
        <p>
          Le présent site est soumis au droit français. En cas de litige, et à
          défaut de résolution amiable, les tribunaux du ressort du siège
          social sont compétents, sous réserve d&apos;une règle légale qui en
          disposerait autrement.
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="Données personnelles">
        <p>
          Le traitement des données personnelles et l&apos;usage des cookies
          sont décrits dans la{" "}
          <LegalLink href="/politique-de-confidentialite">
            Politique de confidentialité
          </LegalLink>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}

function Info({
  label,
  value,
  pending = false,
}: {
  label: string;
  value: string;
  pending?: boolean;
}) {
  return (
    <div>
      <dt className="text-mist">{label}</dt>
      <dd>{pending ? <Pending>{value}</Pending> : value}</dd>
    </div>
  );
}
