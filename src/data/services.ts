export interface Service {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

export const services: Service[] = [
  {
    id: "branding",
    titre: "Branding visuel",
    description:
      "Logo, charte graphique et identité visuelle construits pour durer. Une marque cohérente qui inspire confiance au premier regard.",
    icone: "brand",
  },
  {
    id: "photo",
    titre: "Shooting photo professionnel",
    description:
      "Photos de boutique, d'atelier, de produits, de plats ou de votre équipe en situation. Retouchées, livrées rapidement, exploitables partout.",
    icone: "camera",
  },
  {
    id: "video-courte",
    titre: "Vidéos courtes réseaux sociaux",
    description:
      "Formats verticaux et horizontaux pensés pour Instagram, TikTok et LinkedIn. Courts, efficaces, regardés jusqu'au bout.",
    icone: "play",
  },
  {
    id: "film-vitrine",
    titre: "Film vitrine et film d'entreprise",
    description:
      "Une vidéo de 1 à 3 minutes qui présente votre activité, votre savoir-faire et vos valeurs. L'outil commercial le plus fort que vous puissiez avoir.",
    icone: "film",
  },
  {
    id: "temoignage",
    titre: "Témoignages vidéo clients",
    description:
      "Vos meilleurs clients racontent leur expérience. Authentique, convaincant, et bien plus efficace qu'un avis texte.",
    icone: "quote",
  },
  {
    id: "contenu-mensuel",
    titre: "Pack contenu mensuel",
    description:
      "Photos et vidéos livrées chaque mois pour alimenter vos réseaux sans y penser. Vous produisez, on documente.",
    icone: "calendar",
  },
  {
    id: "google-business",
    titre: "Gestion Fiche Google",
    description:
      "Fiche Google optimisée, photos pro intégrées, réponses aux avis, posts mensuels — votre vitrine n°1 gérée activement pour remonter en tête des recherches locales.",
    icone: "map",
  },
  {
    id: "pub-locale",
    titre: "Publicité digitale locale",
    description:
      "Campagnes Google Ads et Meta Ads ciblées sur votre zone de chalandise. Vous apparaissez devant les bons clients, au bon moment, sans gaspiller votre budget.",
    icone: "target",
  },
];
