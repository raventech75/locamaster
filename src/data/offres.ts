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

export const packs: Pack[] = [
  {
    id: 'royal-starter',
    nom: 'Royal Starter',
    tarif: 1200,
    tarifLancement: 1000,
    livrables: [
      'Logo simple professionnel',
      '3 vidéos courtes (30 s) pour les réseaux',
      '10 photos pro retouchées',
      'Aide au paramétrage de votre fiche Google',
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
      'Aide aux avis Google',
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
      'Déclinaisons réseaux complets',
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
