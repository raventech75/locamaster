export interface Pack {
  id: string;
  nom: string;
  tarif: number;
  tarifLancement: number;
  livrables: string[];
  highlight?: boolean;
  badge?: string;
}

export interface Abonnement {
  id: string;
  nom: string;
  tarif: number;
  tarifLancement: number;
  livrables: string[];
  highlight?: boolean;
  badge?: string;
}

export interface AbonnementVisibilite {
  id: string;
  nom: string;
  tarif: number;
  tarifLancement: number;
  description: string;
  livrables: string[];
  note?: string;
  highlight?: boolean;
  badge?: string;
}

export const packs: Pack[] = [
  {
    id: 'starter-visuel',
    nom: 'Starter Visuel',
    tarif: 1200,
    tarifLancement: 950,
    livrables: [
      'Logo simple professionnel',
      '3 vidéos courtes (30 s) pour les réseaux',
      '10 photos pro retouchées',
      'Setup fiche Google optimisée',
      'Photos pro pour la fiche Google',
    ],
  },
  {
    id: 'branding-pro',
    nom: 'Branding Pro',
    tarif: 2500,
    tarifLancement: 2200,
    livrables: [
      'Logo + charte visuelle complète',
      '5 vidéos courtes pour les réseaux',
      '1 interview ou vidéo savoir-faire',
      '20 photos pro retouchées',
      'Déclinaisons réseaux sociaux',
      'Fiche Google optimisée + stratégie avis',
    ],
    highlight: true,
    badge: 'Le plus demandé',
  },
  {
    id: 'premium-pro',
    nom: 'Premium Pro',
    tarif: 4500,
    tarifLancement: 4000,
    livrables: [
      'Identité visuelle complète',
      '8 vidéos courtes pour les réseaux',
      '2 interviews ou témoignages clients',
      '1 film vitrine (2–3 min)',
      '40 photos pro retouchées',
      'Fiche Google & réseaux complets',
      'Mini site one-page ou page de présentation',
    ],
  },
];

export const abonnements: Abonnement[] = [
  {
    id: 'social-starter',
    nom: 'Social Starter',
    tarif: 350,
    tarifLancement: 300,
    livrables: [
      '2 vidéos courtes / mois',
      '4 photos retouchées / mois',
      'Suivi et conseil léger',
    ],
  },
  {
    id: 'social-pro',
    nom: 'Social Pro',
    tarif: 550,
    tarifLancement: 500,
    livrables: [
      '4 vidéos courtes / mois',
      '8 photos retouchées / mois',
      'Script et angle mensuel',
      'Suivi simple et régulier',
    ],
    highlight: true,
    badge: 'Meilleur rapport',
  },
  {
    id: 'social-elite',
    nom: 'Social Elite',
    tarif: 850,
    tarifLancement: 800,
    livrables: [
      '6 vidéos courtes / mois',
      '12 photos retouchées / mois',
      '1 interview courte / mois',
      'Suivi renforcé et stratégie contenu',
    ],
  },
];

export const abonnementsVisibilite: AbonnementVisibilite[] = [
  {
    id: 'google-local',
    nom: 'Google Local',
    tarif: 350,
    tarifLancement: 290,
    description: 'Votre fiche Google gérée comme un canal commercial à part entière.',
    livrables: [
      'Optimisation et mise à jour mensuelle de la fiche',
      '4 posts Google My Business / mois',
      'Réponses aux avis clients (positifs & négatifs)',
      'Photos nouvelles intégrées chaque mois',
      'Rapport de visibilité mensuel (vues, appels, itinéraires)',
    ],
    note: 'Setup initial offert le premier mois',
  },
  {
    id: 'pub-locale',
    nom: 'Pub Locale',
    tarif: 650,
    tarifLancement: 490,
    description: 'Campagnes Google Ads et Meta Ads ciblées sur votre zone de chalandise.',
    livrables: [
      'Création et gestion des campagnes Google Ads locaux',
      'Campagnes Meta Ads (Facebook & Instagram)',
      'Ciblage géographique précis (rayon ou communes)',
      'Visuels publicitaires créés par nos soins',
      'Optimisation hebdomadaire des budgets et audiences',
      'Rapport de performance mensuel détaillé',
    ],
    note: 'Budget publicitaire non inclus — conseillé dès 200 €/mois',
    highlight: true,
    badge: 'Nouveau',
  },
  {
    id: 'visibilite-totale',
    nom: 'Visibilité Totale',
    tarif: 950,
    tarifLancement: 750,
    description: 'Google Local + Pub Locale combinés, avec stratégie coordonnée.',
    livrables: [
      'Tout Google Local (fiche, posts, avis, rapport)',
      'Tout Pub Locale (Google Ads + Meta Ads)',
      'Stratégie de contenu coordonnée pub / organique',
      'Appel mensuel de suivi stratégique',
      'Tableau de bord partagé en temps réel',
    ],
    note: 'Budget publicitaire non inclus — conseillé dès 300 €/mois',
  },
];
