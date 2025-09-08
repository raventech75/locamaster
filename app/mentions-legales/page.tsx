// app/mentions-legales/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | LOCAMASTER",
  description:
    "Mentions légales, politique de confidentialité et informations réglementaires de LOCAMASTER.",
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Mentions légales &amp; Politique de confidentialité
          </h1>
          <p className="mt-2 text-white/70">
            Dernière mise à jour : <time dateTime="2025-09-07">07/09/2025</time>
          </p>
        </header>

        {/* Sommaire */}
        <nav className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold mb-2">Sommaire</p>
          <ul className="grid sm:grid-cols-2 gap-2 text-white/80 text-sm">
            <li><a className="hover:text-white" href="#editeur">1. Éditeur du site</a></li>
            <li><a className="hover:text-white" href="#hebergeur">2. Hébergeur</a></li>
            <li><a className="hover:text-white" href="#contact">3. Contact</a></li>
            <li><a className="hover:text-white" href="#conditions">4. Conditions d’utilisation</a></li>
            <li><a className="hover:text-white" href="#propriete">5. Propriété intellectuelle</a></li>
            <li><a className="hover:text-white" href="#donnees">6. Données personnelles (RGPD)</a></li>
            <li><a className="hover:text-white" href="#cookies">7. Cookies</a></li>
            <li><a className="hover:text-white" href="#paiements">8. Paiements &amp; facturation</a></li>
            <li><a className="hover:text-white" href="#mineurs">9. Protection des mineurs</a></li>
            <li><a className="hover:text-white" href="#liens">10. Liens &amp; sites tiers</a></li>
            <li><a className="hover:text-white" href="#droit">11. Droit applicable</a></li>
            <li><a className="hover:text-white" href="#mediation">12. Médiation &amp; litiges</a></li>
            <li><a className="hover:text-white" href="#modifs">13. Modifications</a></li>
          </ul>
        </nav>

        {/* 1. Editeur */}
        <section id="editeur" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">1. Éditeur du site</h2>
          <p>
            <strong>LOCAMASTER</strong> — Société <span className="font-mono">SAS LOCAMASTER</span> au capital de <span className="font-mono">750 000 euros</span>
            <br />
            Siège social : <span className="font-mono">63 avenue de la resistance, 93100 Montreuil</span>
            <br />
            RCS / SIREN : <span className="font-mono">978107555</span> — TVA intracommunautaire : <span className="font-mono">FR24978107555</span>
            <br />
            Directeur de la publication : <span className="font-mono">SARIKAYA Guzide</span>
          </p>
        </section>

        {/* 2. Hébergeur */}
        <section id="hebergeur" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">2. Hébergeur</h2>
          <p>
            Site déployé via <strong>Vercel</strong>, Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.
            <br />
            Stockage applicatif &amp; base de données : <strong>Supabase</strong>, 970 Toa Payoh North, #07-04, Singapore 318992.
          </p>
        </section>

        {/* 3. Contact */}
        <section id="contact" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">3. Contact</h2>
          <p>
            Email : <a className="underline hover:text-white" href="mailto:contact@locamaster.fr">contact@locamaster.fr</a>
            <br />
            Téléphone : <span className="font-mono">[+33&nbsp;X&nbsp;XX&nbsp;XX&nbsp;XX&nbsp;XX]</span>
          </p>
        </section>

        {/* 4. Conditions d’utilisation */}
        <section id="conditions" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">4. Conditions d’utilisation</h2>
          <p className="text-white/80">
            L’accès et l’usage du site impliquent l’acceptation sans réserve des présentes mentions. Le site est fourni « en l’état ». 
            LOCAMASTER s’efforce d’assurer l’exactitude des informations, sans garantie d’absence d’erreurs ou d’indisponibilités temporaires.
          </p>
        </section>

        {/* 5. Propriété intellectuelle */}
        <section id="propriete" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">5. Propriété intellectuelle</h2>
          <p className="text-white/80">
            L’ensemble des contenus (textes, visuels, vidéos, logos, marques) sont protégés par le droit d’auteur et les droits voisins. 
            Toute reproduction, représentation, adaptation ou exploitation sans autorisation préalable écrite est interdite. 
            Les photographies scolaires restent la propriété de LOCAMASTER et/ou de ses photographes partenaires, sous réserve des droits des personnes photographiées.
          </p>
        </section>

        {/* 6. Données personnelles */}
        <section id="donnees" className="mb-10 space-y-4">
          <h2 className="text-xl font-bold">6. Données personnelles (RGPD)</h2>

          <div className="space-y-2">
            <h3 className="font-semibold">Responsable de traitement</h3>
            <p>
              <strong>LOCAMASTER</strong>, <span className="font-mono">[adresse&nbsp;siège]</span>,
              email : <a className="underline hover:text-white" href="mailto:privacy@locamaster.fr">privacy@locamaster.fr</a>
              {` `}(DPO / référent protection des données).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Finalités &amp; bases légales</h3>
            <ul className="list-disc pl-5 text-white/80 space-y-1">
              <li>Gestion des demandes (formulaire de contact/lead) — exécution de mesures précontractuelles.</li>
              <li>Création et accès aux galeries sécurisées — exécution du contrat (prestation photographique).</li>
              <li>Commande en ligne &amp; paiement — exécution du contrat (Stripe).</li>
              <li>Comptabilité &amp; obligations légales — obligation légale.</li>
              <li>Communication d’information (opt-in) — consentement.</li>
              <li>Amélioration du service, sécurité, détection d’abus — intérêt légitime.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Données traitées</h3>
            <p className="text-white/80">
              Identité (nom, prénom), coordonnées (email, téléphone), informations établissement, contenus de messages,
              données de commande/paiement (via Stripe), identifiants d’accès galerie (code unique), logs techniques, 
              photos/vidéos réalisées dans le cadre des prestations.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Durées de conservation</h3>
            <ul className="list-disc pl-5 text-white/80 space-y-1">
              <li>Leads / demandes d’information : 3 ans à compter du dernier contact.</li>
              <li>Dossiers clients &amp; facturation : 10 ans (obligations comptables).</li>
              <li>Comptes &amp; accès galerie : durée du projet + 12 mois (sauf obligation légale différente).</li>
              <li>Logs techniques &amp; sécurité : 6 à 12 mois.</li>
              <li>Photos : selon contrat / autorisations, durée précisée dans la convention passée avec l’établissement.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Sous-traitants &amp; transferts</h3>
            <p className="text-white/80">
              Nous utilisons des prestataires conformes (DPA/conditions) : <strong>Supabase</strong> (stockage/app), <strong>Vercel</strong> (hébergement), 
              <strong>Stripe</strong> (paiement), <strong>Formspree</strong> (routage email du formulaire). 
              Des transferts hors UE peuvent exister (ex. Vercel, Stripe) avec garanties appropriées (clauses contractuelles types / DPA).
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Vos droits</h3>
            <p className="text-white/80">
              Accès, rectification, effacement, opposition, limitation, portabilité, directives post-mortem. 
              Pour exercer : <a className="underline hover:text-white" href="mailto:privacy@locamaster.fr">privacy@locamaster.fr</a>. 
              Réclamation possible auprès de la CNIL : <a className="underline hover:text-white" href="https://www.cnil.fr">cnil.fr</a>.
            </p>
          </div>
        </section>

        {/* 7. Cookies */}
        <section id="cookies" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">7. Cookies</h2>
          <p className="text-white/80">
            Le site peut utiliser des traceurs strictement nécessaires (authentification, sécurité) et, avec votre consentement, 
            des cookies de mesure d’audience / amélioration. Un bandeau d’information permet d’accepter/refuser. 
            Vous pouvez modifier vos préférences à tout moment via le gestionnaire de cookies du site ou les réglages du navigateur.
          </p>
        </section>

        {/* 8. Paiements */}
        <section id="paiements" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">8. Paiements &amp; facturation</h2>
          <p className="text-white/80">
            Les paiements sont opérés via <strong>Stripe</strong>. Les informations de carte bancaire ne transitent pas par nos serveurs. 
            En cas de répartition des commissions (ex. 25% établissement / 75% LOCAMASTER), le splitting est automatisé conformément aux CGV.
          </p>
          <p className="text-white/80">
            Droit de rétractation : non applicable aux tirages personnalisés / fichiers numériques livrés, conformément à l’article L221-28 du Code de la consommation, 
            sauf mention contraire contractuelle. 
          </p>
        </section>

        {/* 9. Protection des mineurs */}
        <section id="mineurs" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">9. Protection des mineurs &amp; accès galerie</h2>
          <p className="text-white/80">
            Accès aux galeries via codes uniques transmis aux parents/élèves majeurs ou responsables légaux. 
            Les contenus ne sont pas référencés publiquement. 
            Les demandes de retrait d’image sont traitées prioritairement via <a className="underline hover:text-white" href="mailto:privacy@locamaster.fr">privacy@locamaster.fr</a>.
          </p>
        </section>

        {/* 10. Liens */}
        <section id="liens" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">10. Liens &amp; sites tiers</h2>
          <p className="text-white/80">
            Des liens vers des sites tiers peuvent exister. LOCAMASTER n’exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leurs contenus, 
            produits, services ou pratiques.
          </p>
        </section>

        {/* 11. Droit applicable */}
        <section id="droit" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">11. Droit applicable &amp; juridiction</h2>
          <p className="text-white/80">
            Le site et les présentes mentions sont soumis au droit français. Sauf dispositions impératives contraires, 
            les litiges relèvent des juridictions compétentes du ressort du siège de LOCAMASTER.
          </p>
        </section>

        {/* 12. Médiation */}
        <section id="mediation" className="mb-10 space-y-2">
          <h2 className="text-xl font-bold">12. Médiation de la consommation</h2>
          <p className="text-white/80">
            Conformément à l’article L612-1 du Code de la consommation, le consommateur peut recourir gratuitement à un médiateur de la consommation. 
            Médiateur pressenti : <span className="font-mono">[Nom de l’organisme de médiation]</span> — <span className="font-mono">[site web]</span>.
          </p>
        </section>

        {/* 13. Modifs */}
        <section id="modifs" className="mb-6 space-y-2">
          <h2 className="text-xl font-bold">13. Modifications</h2>
          <p className="text-white/80">
            LOCAMASTER peut modifier les présentes mentions à tout moment, notamment pour tenir compte des évolutions légales ou de service. 
            La version applicable est celle publiée à la date de votre consultation.
          </p>
        </section>

        {/* Bloc coordonnées rapide */}
        <aside className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/80">
          <p className="font-semibold text-white mb-1">Coordonnées</p>
          <p>
            LOCAMASTER — <span className="font-mono">63 avenue de la resistance, 93100 Montreuil</span> — 
            <a className="underline hover:text-white ml-1" href="mailto:contact@locamaster.fr">contact@locamaster.fr</a>
          </p>
        </aside>
      </div>
    </main>
  );
}