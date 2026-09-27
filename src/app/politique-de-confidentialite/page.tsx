import type { Metadata } from "next";
import { legal } from "@/data/legal";
import { optionalTrackers } from "@/data/trackers";
import {
  LegalDocument,
  LegalLink,
  LegalSection,
} from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité | ENE Solutions" },
  description:
    "Politique de confidentialité du site ENE Solutions : données du formulaire de contact, cookie de consentement, bases légales et droits RGPD.",
  openGraph: {
    title: "Politique de confidentialité | ENE Solutions",
    description:
      "Politique de confidentialité du site ENE Solutions : données du formulaire de contact, cookie de consentement, bases légales et droits RGPD.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalDocument
      title="Politique de confidentialité"
      updatedAt={legal.policyUpdatedAt}
    >
        <p>
          Cette page décrit les traitements de données personnelles mis en œuvre
          par le site, tels qu&apos;ils résultent de son fonctionnement actuel.
        </p>

      <LegalSection id="responsable" title="Responsable du traitement">
        <p>
          Le responsable du traitement est {legal.name}.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Adresse : {legal.address}</li>
          <li>
            Email :{" "}
            <a
              href={`mailto:${legal.email}`}
              className="text-copper-bright underline decoration-copper/40 underline-offset-4 hover:text-copper"
            >
              {legal.email}
            </a>
          </li>
          <li>
            Téléphone :{" "}
            <a
              href={legal.phoneHref}
              className="text-copper-bright underline decoration-copper/40 underline-offset-4 hover:text-copper"
            >
              {legal.phone}
            </a>
          </li>
        </ul>
        <p>
          Aucun délégué à la protection des données n&apos;est désigné dans les
          informations du projet. Pour exercer vos droits, écrivez à{" "}
          {legal.email}.
        </p>
      </LegalSection>

      <LegalSection id="donnees" title="Données collectées">
        <h3 className="pt-2 font-medium text-mist">Formulaire de contact</h3>
        <p>
          Le formulaire demande le nom, l&apos;adresse e-mail, le service
          concerné et un message. Il ne transmet pas ces informations à un
          serveur du site et ne les enregistre pas dans une base de données :
          il ouvre le logiciel de messagerie de la personne, avec un message
          prérempli à destination de {legal.email}. {legal.name} ne reçoit le
          message que si la personne l&apos;envoie depuis sa messagerie.
        </p>
        <p>
          Ce formulaire sert à répondre à une demande. Il n&apos;est pas utilisé
          pour une newsletter, de la prospection ou l&apos;envoi d&apos;offres
          commerciales. Aucune case d&apos;opt-in marketing n&apos;est donc
          proposée.
        </p>

        <h3 className="pt-2 font-medium text-mist">Données techniques</h3>
        <p>
          Le code du site ne met pas en place de mesure d&apos;audience et
          n&apos;enregistre pas lui-même de journal de connexions. L&apos;hébergeur,{" "}
          {legal.host.name}, peut conserver des journaux techniques (adresse IP,
          date, pages demandées) selon ses propres règles.
        </p>
        <p>
          Les polices de caractères sont intégrées au site lors de la
          construction des pages et servies depuis le même site. La visite ne
          déclenche pas de requête vers un service de polices tiers.
        </p>

        <h3 className="pt-2 font-medium text-mist">Cookies et traceurs</h3>
        <p>
          Le site dépose un seul cookie, strictement nécessaire, nommé{" "}
          <span className="text-mist">{legal.consentCookieName}</span>. Il
          mémorise les catégories acceptées ou refusées, la date du choix et la
          version de cette politique. Durée : {legal.consentDurationLabel}. Il
          n&apos;est pas utilisé à des fins publicitaires.
        </p>
        {optionalTrackers.length === 0 ? (
          <p>
            Aucun traceur de mesure d&apos;audience, de marketing ou de contenu
            tiers n&apos;est chargé. Le site n&apos;intègre ni outil
            d&apos;analyse, ni régie publicitaire, ni vidéo, ni carte, ni
            captcha, ni chat, ni formulaire externe.
          </p>
        ) : (
          <ul className="list-disc space-y-1 pl-5">
            {optionalTrackers.map((tracker) => (
              <li key={tracker.id}>
                {tracker.label} ({tracker.category}) — chargé seulement après
                consentement pour cette catégorie.
              </li>
            ))}
          </ul>
        )}
        <p>
          Le bandeau permet d&apos;enregistrer un choix pour les catégories
          « mesure d&apos;audience », « marketing / publicité » et « contenus
          tiers ». Ces catégories sont désactivées par défaut. Tant qu&apos;aucun
          outil n&apos;y est rattaché, aucun cookie supplémentaire n&apos;est
          déposé, même en cas d&apos;acceptation.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-mist">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Nom
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Finalité
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Durée
                </th>
                <th scope="col" className="py-2 font-medium">
                  Base
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line align-top">
                <td className="py-3 pr-4 text-mist">{legal.consentCookieName}</td>
                <td className="py-3 pr-4">
                  Mémoriser le choix de consentement
                </td>
                <td className="py-3 pr-4">{legal.consentDurationLabel}</td>
                <td className="py-3">Cookie strictement nécessaire</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id="finalites" title="Finalités et bases légales">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Répondre aux demandes envoyées via le formulaire : mesures
            précontractuelles prises à la demande de la personne (article 6.1.b
            du RGPD).
          </li>
          <li>
            Mémoriser le choix relatif aux cookies : cookie strictement
            nécessaire, dispensé de consentement (article 82 de la loi
            Informatique et Libertés).
          </li>
        </ul>
        <p>
          Aucun traitement à des fins de prospection, de publicité ou de mesure
          d&apos;audience n&apos;est réalisé par le site.
        </p>
      </LegalSection>

      <LegalSection id="destinataires" title="Destinataires">
        <p>
          Les messages effectivement envoyés sont destinés à {legal.name}, via
          la boîte {legal.email}. Le logiciel de messagerie de la personne
          intervient pour l&apos;envoi, car le formulaire utilise un lien{" "}
          <span className="text-mist">mailto</span>.
        </p>
        <p>
          Aucun destinataire publicitaire, outil d&apos;analyse ou formulaire
          externe n&apos;est configuré dans le site.
        </p>
      </LegalSection>

      <LegalSection id="sous-traitants" title="Sous-traitants">
        <p>
          Aucun sous-traitant (mesure d&apos;audience, publicité, CRM,
          formulaire hébergé) n&apos;est identifié dans le code du site.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Hébergeur du site : {legal.host.name}, {legal.host.address}
          </li>
          <li>
            Messagerie de réception ({legal.email}) : {legal.mailbox.name},{" "}
            {legal.mailbox.address}
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="durees" title="Durées de conservation">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Cookie de consentement : {legal.consentDurationLabel}, puis le
            bandeau est présenté de nouveau.
          </li>
          <li>
            Messages reçus par e-mail : {legal.messageRetention} à compter de
            leur réception, puis suppression.
          </li>
          <li>
            Journaux techniques de l&apos;hébergeur : durée fixée par{" "}
            {legal.host.name}, non déterminée par ce site.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="transferts" title="Transferts hors Union européenne">
        <p>
          Le site est hébergé par {legal.host.name}, aux États-Unis. Des
          données techniques de connexion peuvent donc être traitées hors de
          l&apos;Union européenne. Vercel indique appliquer le EU-U.S. Data
          Privacy Framework. Le site ne dépose pas de traceur tiers.
        </p>
        <p>
          La boîte {legal.email} est hébergée par {legal.mailbox.name}, à
          Chypre, État membre de l&apos;Union européenne. Cet hébergement
          n&apos;organise pas, à lui seul, un transfert hors de l&apos;Union
          européenne. L&apos;acheminement du message dépend aussi du logiciel
          de messagerie de la personne.
        </p>
      </LegalSection>

      <LegalSection id="droits" title="Vos droits">
        <p>Vous disposez des droits suivants, dans les conditions du RGPD :</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>droit d&apos;accès ;</li>
          <li>droit de rectification ;</li>
          <li>droit à l&apos;effacement ;</li>
          <li>droit à la limitation du traitement ;</li>
          <li>droit d&apos;opposition, lorsque le traitement le permet ;</li>
          <li>
            droit à la portabilité lorsque le traitement est fondé sur le
            consentement ou sur un contrat et qu&apos;il est effectué à l&apos;aide
            de procédés automatisés. Le site ne constitue pas de fichier
            automatisé des messages : ils partent depuis votre messagerie ;
          </li>
          <li>
            droit de retirer votre consentement à tout moment, sans affecter la
            licéité du traitement fondé sur le consentement effectué avant ce
            retrait. Le formulaire de contact n&apos;est pas fondé sur le
            consentement. Le retrait du choix cookies se fait via « Gérer mes
            cookies » dans le pied de page.
          </li>
        </ul>
        <p>
          Pour exercer ces droits, écrivez à {legal.email} en précisant l&apos;objet
          de la demande. Une preuve d&apos;identité peut être demandée en cas de
          doute raisonnable. Une réponse est apportée dans un délai d&apos;un mois,
          prolongeable dans les conditions prévues par le RGPD.
        </p>
        <p>
          Vous pouvez aussi introduire une réclamation auprès de la CNIL :{" "}
          <LegalLink href="https://www.cnil.fr/fr/plaintes" external>
            www.cnil.fr/fr/plaintes
          </LegalLink>
          .
        </p>
      </LegalSection>

      <LegalSection id="securite" title="Sécurité">
        <p>
          Le site public est accessible en HTTPS. L&apos;hébergement du site est
          assuré par {legal.host.name}. Les messages du formulaire ne sont pas
          stockés dans une base du site : ils sont reçus sur {legal.email},
          hébergée par {legal.mailbox.name}.
        </p>
      </LegalSection>

      <LegalSection id="contact-donnees" title="Contact et mise à jour">
        <p>
          Pour toute question sur cette politique : {legal.email}. Les mentions
          légales de l&apos;éditeur sont disponibles sur la page{" "}
          <LegalLink href="/mentions-legales">Mentions légales</LegalLink>.
        </p>
        <p>Dernière mise à jour : {legal.policyUpdatedAt}.</p>
      </LegalSection>
    </LegalDocument>
  );
}
