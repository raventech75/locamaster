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
    id: "presence-locale",
    titre: "Présence locale optimisée",
    description:
      "Fiche Google optimisée, photos professionnelles, avis clients — tout ce qu'il faut pour sortir en tête sur votre zone de chalandise.",
    icone: "map",
  },
];
