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
    slug: "le-clos-des-saveurs-restaurant",
    titre: "Image de marque · Restaurant gastronomique",
    client: "Le Clos des Saveurs",
    secteur: "Restauration",
    categorie: "pack",
    description:
      "Restaurant bistronomique dans le Marais, une cuisine d'exception mais des photos de salle et de plats qui ne rendaient pas justice à l'expérience. La réservation en ligne stagnait malgré une excellente réputation orale.",
    besoin:
      "Des visuels qui donnent envie de réserver immédiatement, utilisables sur Instagram, Google et le site web.",
    solution:
      "Shooting ambiance salle + photos culinaires éclairées sur 2 services + vidéo courte 'coulisses de cuisine' pour les réseaux.",
    resultat:
      "Un feed Instagram repensé qui reflète enfin le niveau de la cuisine. Réservations directes en hausse dès la première semaine de publication.",
    livrables: ["25 photos pro retouchées", "3 vidéos réseaux", "Story pack Instagram", "Fiche Google optimisée"],
    imageCover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    galerie: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
    ],
    pack: "Branding Pro",
    dateAnnee: 2024,
    featured: true,
  },
  {
    slug: "atelier-blanc-fleuriste",
    titre: "Branding visuel · Fleuriste événementiel",
    client: "Atelier Blanc",
    secteur: "Fleuriste",
    categorie: "pack",
    description:
      "Fleuriste événementiel spécialisée dans les événements d'entreprise et les célébrations haut de gamme à Paris 11e. Ses créations éphémères disparaissaient sans laisser de trace visuelle de qualité.",
    besoin:
      "Capturer l'essence de chaque création avant qu'elle ne disparaisse — et construire un portfolio qui attire les commandes événementielles.",
    solution:
      "Séances photo régulières des créations + vidéo de processus 'de la fleur à la composition' + identité visuelle cohérente sur les réseaux.",
    resultat:
      "Un portfolio vivant qui attire les commandes événementielles haut de gamme. Chiffre d'affaires événementiel en forte progression.",
    livrables: ["Logo + charte", "20 photos produit", "1 vidéo atelier", "3 Reels", "Déclinaisons réseaux"],
    imageCover: "https://images.unsplash.com/photo-1487530811015-780780169cec?w=800&q=80",
    galerie: [
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    ],
    pack: "Premium Pro",
    dateAnnee: 2024,
    featured: true,
  },
  {
    slug: "galerie-antiquites-moreau",
    titre: "Film vitrine · Galerie d'antiquités",
    client: "Galerie Moreau",
    secteur: "Antiquités",
    categorie: "video",
    description:
      "Galerie d'antiquités et objets d'art dans le 6e arrondissement. Des pièces rares et précieuses présentées avec des photos amateurs qui ne reflètent pas leur valeur réelle.",
    besoin:
      "Un film vitrine et des photos qui justifient les prix et attirent une clientèle de collectionneurs sérieux.",
    solution:
      "Film vitrine centré sur l'atmosphère de la galerie + shooting produit sur fond neutre pour les pièces phares + vidéos courtes de mise en valeur.",
    resultat:
      "Des visuels qui crédibilisent immédiatement le positionnement premium. Première vente internationale directe via Instagram.",
    livrables: ["1 film vitrine 2 min", "30 photos produit", "2 vidéos courtes", "Identité Instagram"],
    imageCover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    pack: "Pack sur-mesure",
    dateAnnee: 2025,
    featured: true,
  },
  {
    slug: "salon-coiffure-noha",
    titre: "Contenu mensuel · Salon de coiffure",
    client: "Noha Studio",
    secteur: "Coiffure",
    categorie: "video",
    description:
      "Salon de coiffure afro-créatif dans le 10e, réputé pour ses techniques et son ambiance. Besoin de créer du contenu régulier pour exister sur TikTok et Instagram sans y passer des heures.",
    besoin:
      "Produire 4 à 6 vidéos par mois en restant concentré sur les clientes, sans mobiliser l'équipe pour filmer.",
    solution:
      "Abonnement Social Pro — tournage mensuel en salon pendant les créations, montage avec les codes TikTok/Reels.",
    resultat:
      "Présence régulière sur les réseaux avec du contenu natif qui performe. +40% de prises de RDV en ligne en 2 mois.",
    livrables: ["4 vidéos / mois", "8 photos / mois", "Script et angle mensuel"],
    imageCover: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    pack: "Social Pro",
    dateAnnee: 2025,
    featured: false,
  },
  {
    slug: "la-bouquinerie-librairie",
    titre: "Identité complète · Librairie indépendante",
    client: "La Bouquinerie",
    secteur: "Librairie",
    categorie: "branding",
    description:
      "Librairie indépendante dans le 13e, avec une sélection pointue et une vraie communauté locale. Aucune présence visuelle cohérente sur les réseaux malgré une réputation de bouche-à-oreille solide.",
    besoin:
      "Une identité visuelle qui incarne l'âme de la librairie et un flux de contenu régulier pour fidéliser la communauté.",
    solution:
      "Identité visuelle complète + shooting ambiance + abonnement contenu mensuel avec calendrier éditorial inclus.",
    resultat:
      "Refonte complète de l'image en 4 semaines. Communauté Instagram multipliée par 3 en 6 mois. Soirées dédicaces à guichets fermés.",
    livrables: ["Identité visuelle complète", "8 vidéos courtes", "2 interviews auteurs", "40 photos retouchées"],
    imageCover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    pack: "Premium Pro",
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
