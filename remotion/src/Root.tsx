import { Composition } from 'remotion';
import { SocialPromo, socialPromoSchema } from './compositions/SocialPromo';
import { LogoSting } from './compositions/LogoSting';
import { OffreReveal, offreRevealSchema } from './compositions/OffreReveal';
import { BeforeAfter, beforeAfterSchema } from './compositions/BeforeAfter';
import { packs, abonnements, cas } from './data';

const secteurBeforeAfters = [
  { id: 'restaurant', secteur: 'Restaurateur', resultLabel: '+42 % de clics Google Maps' },
  { id: 'fleuriste',  secteur: 'Fleuriste',    resultLabel: '+38 % de visites en boutique' },
  { id: 'coiffeur',   secteur: 'Coiffeur',     resultLabel: '+55 % de prises de RDV' },
  { id: 'artisan',    secteur: 'Artisan',      resultLabel: '+3× de demandes de devis' },
  { id: 'antiquaire', secteur: 'Antiquaire',   resultLabel: "+60 % d'engagement Instagram" },
  { id: 'libraire',   secteur: 'Libraire',     resultLabel: '+45 % de trafic en boutique' },
];

/**
 * Catalogue des vidéos Locamaster.
 *
 * Compositions "modèles" (génériques, éditables dans le Studio) :
 *   SocialPromo · LogoSting · OffreReveal
 *
 * Compositions générées automatiquement depuis src/data.ts :
 *   Pack-*  (3) · Abo-*  (3) · Cas-*  (5)  → un MP4 prêt à poster par offre/cas
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ---- Modèles génériques ---- */}
      <Composition
        id="SocialPromo"
        component={SocialPromo}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        schema={socialPromoSchema}
        defaultProps={{
          kicker: 'Studio visuel · Île-de-France',
          line1: 'Votre savoir-faire',
          line2: 'mérite d’être',
          highlight: 'vu.',
          subtitle: 'Branding, photo & vidéo pour artisans et entreprises locales.',
          ctaLabel: 'Session Découverte',
          ctaPrice: '190 € HT',
        }}
      />

      <Composition
        id="LogoSting"
        component={LogoSting}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="OffreReveal"
        component={OffreReveal}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        schema={offreRevealSchema}
        defaultProps={{
          label: 'Pack le plus demandé',
          title: 'Branding Pro',
          features: ['Logo + charte visuelle', '5 vidéos courtes', '20 photos pro', 'Déclinaisons réseaux'],
          priceFrom: 'À partir de',
          price: '2 200 € HT',
        }}
      />

      {/* ---- Packs (1:1) ---- */}
      {packs.map((p) => (
        <Composition
          key={`Pack-${p.id}`}
          id={`Pack-${p.id}`}
          component={OffreReveal}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1080}
          schema={offreRevealSchema}
          defaultProps={{
            label: p.label,
            title: p.title,
            features: p.features,
            priceFrom: p.priceFrom,
            price: p.price,
          }}
        />
      ))}

      {/* ---- Abonnements (1:1) ---- */}
      {abonnements.map((a) => (
        <Composition
          key={`Abo-${a.id}`}
          id={`Abo-${a.id}`}
          component={OffreReveal}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1080}
          schema={offreRevealSchema}
          defaultProps={{
            label: a.label,
            title: a.title,
            features: a.features,
            priceFrom: a.priceFrom,
            price: a.price,
          }}
        />
      ))}

      {/* ---- Cas d'usage (9:16 réseaux) ---- */}
      {cas.map((c) => (
        <Composition
          key={`Cas-${c.id}`}
          id={`Cas-${c.id}`}
          component={SocialPromo}
          durationInFrames={210}
          fps={30}
          width={1080}
          height={1920}
          schema={socialPromoSchema}
          defaultProps={{
            kicker: c.kicker,
            line1: c.line1,
            line2: c.line2,
            highlight: c.highlight,
            subtitle: c.subtitle,
            ctaLabel: c.ctaLabel,
            ctaPrice: c.ctaPrice,
          }}
        />
      ))}

      {/* ---- Avant/Après par secteur (9:16 Reels/TikTok) ---- */}
      <Composition
        id="BeforeAfter"
        component={BeforeAfter}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        schema={beforeAfterSchema}
        defaultProps={{
          beforeUrl: '',
          afterUrl: '',
          secteur: 'Restaurateur',
          resultLabel: '+42 % de clics Google Maps',
          ctaLabel: 'Session Découverte',
          ctaPrice: '190 € HT',
        }}
      />
      {secteurBeforeAfters.map((s) => (
        <Composition
          key={`BeforeAfter-${s.id}`}
          id={`BeforeAfter-${s.id}`}
          component={BeforeAfter}
          durationInFrames={300}
          fps={30}
          width={1080}
          height={1920}
          schema={beforeAfterSchema}
          defaultProps={{
            beforeUrl: '',
            afterUrl: '',
            secteur: s.secteur,
            resultLabel: s.resultLabel,
            ctaLabel: 'Session Découverte',
            ctaPrice: '190 € HT',
          }}
        />
      ))}
    </>
  );
};
