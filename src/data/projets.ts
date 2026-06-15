export interface Projet {
  slug: string;
  titre: string;
  client: string;
  secteur: string;
  categorie: "photo" | "video" | "branding" | "pack";
  description: string;
  besoin: string;
  solution: string;
  resultat: string;
  livrables: string[];
  imageCover: string;
  galerie?: string[];
  videoUrl?: string;
  pack?: string;
  dateAnnee: number;
  featured?: boolean;
}

export const projets: Projet[] = [
  {
    slug: "martin-plombier-val-de-marne",
    titre: "Image de marque · Plombier premium",
    client: "Martin Plomberie",
    secteur: "Plomberie",
    categorie: "pack",
    description:
      "Artisan plombier depuis 12 ans dans le Val-de-Marne, excellent technicien mais invisible en ligne. Ses concurrents peu qualifiés occupaient les premières positions Google avec des photos de mauvaise qualité.",
    besoin:
      "Se différencier visuellement, gagner en crédibilité en ligne et attirer des clients sur des interventions à plus forte valeur.",
    solution:
      "Session découverte, puis pack Branding Pro complet : logo, vidéo savoir-faire, série de photos en situation réelle, fiche Google optimisée.",
    resultat:
      "Une image cohérente et professionnelle qui reflète enfin la qualité réelle du travail. Meilleure perception client dès le premier contact.",
    livrables: ["Logo professionnel", "5 vidéos courtes", "1 vidéo savoir-faire", "20 photos retouchées", "Fiche Google optimisée"],
    imageCover: "/images/projets/martin-plombier-cover.jpg",
    galerie: [
      "/images/projets/martin-plombier-1.jpg",
      "/images/projets/martin-plombier-2.jpg",
      "/images/projets/martin-plombier-3.jpg",
    ],
    pack: "Branding Pro",
    dateAnnee: 2024,
    featured: true,
  },
  {
    slug: "atelier-vidal-cuisines",
    titre: "Branding visuel · Cuisiniste haut de gamme",
    client: "Atelier Vidal Cuisines",
    secteur: "Cuisiniste",
    categorie: "pack",
    description:
      "Cuisiniste artisanal en Essonne, spécialisé sur le sur-mesure haut de gamme. Les chantiers sont beaux, mais les photos Instagram au smartphone ne rendaient pas justice à la qualité des réalisations.",
    besoin:
      "Mettre en valeur les réalisations avec des images et vidéos dignes du niveau de qualité livré. Atteindre une clientèle prête à investir.",
    solution:
      "Shooting photo complet sur 3 chantiers récents, 2 vidéos courtes de réalisation, vidéo de présentation de l'atelier.",
    resultat:
      "Un portefeuille visuel qui justifie immédiatement le positionnement premium et facilite la discussion tarifaire avec les prospects.",
    livrables: ["3 shootings chantiers", "2 vidéos courtes", "1 vidéo atelier", "25 photos retouchées"],
    imageCover: "/images/projets/atelier-vidal-cover.jpg",
    pack: "Premium Artisan",
    dateAnnee: 2024,
    featured: true,
  },
  {
    slug: "lebrun-menuiserie",
    titre: "Film vitrine · Menuisier ébéniste",
    client: "Lebrun Menuiserie",
    secteur: "Menuiserie",
    categorie: "video",
    description:
      "Menuisier ébéniste à Paris 11e, travail à façon et mobilier sur-mesure. Clientèle architectes et particuliers exigeants. Aucun contenu vidéo existant.",
    besoin:
      "Un film vitrine qui montre le geste, la matière et le savoir-faire. Quelque chose à envoyer aux prescripteurs architectes.",
    solution:
      "Film vitrine de 2 minutes centré sur le processus de fabrication — de la planche brute au meuble livré — avec voix off sobre.",
    resultat:
      "Un outil commercial fort, utilisé en amorce de chaque rendez-vous prescripteur. Niveau de confiance immédiatement plus élevé.",
    livrables: ["1 film vitrine 2 min", "3 extraits courts réseaux", "15 photos atelier"],
    imageCover: "/images/projets/lebrun-menuiserie-cover.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pack: "Pack sur-mesure",
    dateAnnee: 2025,
    featured: true,
  },
  {
    slug: "delta-electricite",
    titre: "Contenu réseaux · Électricien tertiaire",
    client: "Delta Électricité",
    secteur: "Électricité",
    categorie: "video",
    description:
      "Entreprise d'électricité de 4 personnes, spécialisée dans le tertiaire et la rénovation en Île-de-France. Voulait développer sa présence sur LinkedIn et Instagram.",
    besoin:
      "Produire régulièrement du contenu vidéo court sans mobiliser les équipes chaque semaine.",
    solution:
      "Abonnement Social Pro — 4 vidéos courtes par mois tournées lors des interventions, montées avec des angles réseaux.",
    resultat:
      "Présence régulière sur LinkedIn, plusieurs contacts entrants qualifiés en 3 mois d'abonnement.",
    livrables: ["4 vidéos / mois", "8 photos / mois", "Script mensuel"],
    imageCover: "/images/projets/delta-electricite-cover.jpg",
    pack: "Social Pro",
    dateAnnee: 2025,
    featured: false,
  },
  {
    slug: "renovation-concept-paris",
    titre: "Identité complète · Entreprise de rénovation",
    client: "Rénovation Concept",
    secteur: "Rénovation",
    categorie: "branding",
    description:
      "Entreprise de rénovation générale à Paris et petite couronne, 6 salariés. Aucune identité visuelle cohérente, site daté, photos de chantier floues.",
    besoin:
      "Repartir sur des bases solides : logo, charte, contenu photo et vidéo pour sortir de l'image perçue en ligne.",
    solution:
      "Pack Premium Artisan complet avec identité visuelle, shooting multi-chantiers, série de vidéos et film vitrine pour le site web.",
    resultat:
      "Refonte complète de l'image en 6 semaines. Cohérence visuelle sur tous les supports. Repositionnement tarifaire facilité.",
    livrables: ["Identité visuelle complète", "8 vidéos courtes", "2 interviews", "1 film vitrine", "40 photos retouchées"],
    imageCover: "/images/projets/renovation-concept-cover.jpg",
    pack: "Premium Artisan",
    dateAnnee: 2025,
    featured: true,
  },
];

export function getProjetBySlug(slug: string): Projet | undefined {
  return projets.find((p) => p.slug === slug);
}

export function getProjetsFeatures(): Projet[] {
  return projets.filter((p) => p.featured);
}

export function getProjetsByCategorie(categorie: Projet["categorie"]): Projet[] {
  return projets.filter((p) => p.categorie === categorie);
}
