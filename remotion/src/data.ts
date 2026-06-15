/**
 * Données vidéo — miroir des offres/cas du site (offres.ts, CasUsage).
 * Chaque entrée génère automatiquement une composition (voir Root.tsx).
 * Modifier ici suffit à mettre à jour toutes les vidéos.
 */

export interface OffreVideo {
  id: string;
  label: string;
  title: string;
  features: string[];
  priceFrom: string;
  price: string;
}

export interface CasVideo {
  id: string;
  kicker: string;
  line1: string;
  line2: string;
  highlight: string;
  subtitle: string;
  ctaLabel: string;
  ctaPrice: string;
}

// --- PACKS -----------------------------------------------------------------
export const packs: OffreVideo[] = [
  {
    id: 'royal-starter',
    label: "Pack d'entrée",
    title: 'Royal Starter',
    features: ['Logo professionnel', '3 vidéos courtes', '10 photos pro', 'Aide avis Google'],
    priceFrom: 'À partir de',
    price: '1 000 € HT',
  },
  {
    id: 'branding-pro',
    label: 'Le plus demandé',
    title: 'Branding Pro',
    features: ['Logo + charte visuelle', '5 vidéos courtes', '20 photos pro', 'Déclinaisons réseaux'],
    priceFrom: 'À partir de',
    price: '2 200 € HT',
  },
  {
    id: 'premium-artisan',
    label: 'Pack complet',
    title: 'Premium Artisan',
    features: ['Identité visuelle complète', '8 vidéos courtes', '40 photos pro', '1 film vitrine'],
    priceFrom: 'À partir de',
    price: '4 000 € HT',
  },
];

// --- ABONNEMENTS -----------------------------------------------------------
export const abonnements: OffreVideo[] = [
  {
    id: 'social-starter',
    label: 'Abonnement',
    title: 'Social Starter',
    features: ['2 vidéos courtes / mois', '4 photos / mois', 'Suivi léger'],
    priceFrom: 'À partir de',
    price: '300 € / mois',
  },
  {
    id: 'social-pro',
    label: 'Meilleur rapport',
    title: 'Social Pro',
    features: ['4 vidéos courtes / mois', '8 photos / mois', 'Script & angle mensuel'],
    priceFrom: 'À partir de',
    price: '500 € / mois',
  },
  {
    id: 'social-elite',
    label: 'Abonnement',
    title: 'Social Elite',
    features: ['6 vidéos courtes / mois', '12 photos / mois', '1 interview / mois'],
    priceFrom: 'À partir de',
    price: '800 € / mois',
  },
];

// --- CAS D'USAGE (vertical réseaux) ----------------------------------------
export const cas: CasVideo[] = [
  {
    id: 'plombier',
    kicker: 'Plombier · Chauffagiste',
    line1: 'Votre travail',
    line2: 'est nickel.',
    highlight: 'Montrez-le.',
    subtitle: 'Photos de chantier et vidéo avant/après qui crédibilisent vos devis.',
    ctaLabel: 'On en parle',
    ctaPrice: 'locamaster.fr',
  },
  {
    id: 'cuisiniste',
    kicker: 'Cuisiniste',
    line1: 'Des cuisines',
    line2: 'qui méritent',
    highlight: 'mieux.',
    subtitle: 'Vos réalisations filmées et photographiées comme du haut de gamme.',
    ctaLabel: 'On en parle',
    ctaPrice: 'locamaster.fr',
  },
  {
    id: 'menuisier',
    kicker: 'Menuisier · Ébéniste',
    line1: 'Le geste,',
    line2: 'la matière,',
    highlight: 'le film.',
    subtitle: 'Un film vitrine qui montre votre savoir-faire aux prescripteurs.',
    ctaLabel: 'On en parle',
    ctaPrice: 'locamaster.fr',
  },
  {
    id: 'electricien',
    kicker: 'Électricien · Tertiaire',
    line1: 'Du contenu',
    line2: 'chaque mois,',
    highlight: 'sans effort.',
    subtitle: 'On filme vos interventions, vous restez présent sur les réseaux.',
    ctaLabel: 'On en parle',
    ctaPrice: 'locamaster.fr',
  },
  {
    id: 'renovation',
    kicker: 'Entreprise de rénovation',
    line1: 'Une image',
    line2: 'à la hauteur',
    highlight: 'du chantier.',
    subtitle: 'Identité, photos et film vitrine pour sortir du « bas de gamme » perçu.',
    ctaLabel: 'On en parle',
    ctaPrice: 'locamaster.fr',
  },
];
