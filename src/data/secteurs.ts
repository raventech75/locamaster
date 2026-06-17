export interface SecteurFAQ {
  question: string;
  reponse: string;
}

export interface Secteur {
  slug: string;
  nom: string;
  nomPluriel: string;
  emoji: string;
  titre: string;
  metaDescription: string;
  accroche: string;
  description: string;
  problemes: string[];
  solutions: { titre: string; texte: string }[];
  faq: SecteurFAQ[];
  projetsLies?: string[]; // slugs de src/data/projets.ts
}

export const secteurs: Secteur[] = [
  {
    slug: 'restaurateurs',
    nom: 'restaurateur',
    nomPluriel: 'restaurateurs',
    emoji: '🍽',
    titre: 'Photo & vidéo pour restaurateurs — Île-de-France',
    metaDescription:
      "Photographie culinaire et vidéo pour restaurants en Île-de-France. Photos de salle, plats, ambiance. Vidéos réseaux sociaux prêtes à publier. Livraison J+5.",
    accroche: "Votre cuisine mérite des photos à sa hauteur.",
    description:
      "Un restaurant peut servir les meilleurs plats de Paris et perdre des réservations chaque jour à cause de photos floues prises au téléphone. Les clients décident de réserver — ou pas — en regardant vos images Google, Instagram et TripAdvisor avant même de lire un seul avis. Locamaster intervient dans votre restaurant pour capturer l'ambiance réelle de votre salle, la précision de vos dressages et le mouvement de votre service. Le résultat : des images qui donnent faim et qui font cliquer sur « Réserver ».",
    problemes: [
      "Des photos de plats ternes qui ne rendent pas justice à la qualité de la cuisine",
      "Un profil Google avec 3 photos floues pendant que le concurrent d'en face a un feed curé",
      "Aucune vidéo de cuisine ou d'ambiance à publier sur Instagram ou TikTok",
    ],
    solutions: [
      {
        titre: 'Photographie culinaire & ambiance',
        texte:
          "Photos de plats éclairées, photos de salle en service, photos d'équipe en action. Format prêt pour Google, TripAdvisor, site web et réseaux sociaux.",
      },
      {
        titre: 'Vidéo courte pour les réseaux',
        texte:
          "Vidéos verticales 20 à 60 secondes : coulisses de cuisine, dressage en accéléré, ambiance salle du soir. Format Reels/TikTok/Shorts prêt à publier.",
      },
      {
        titre: 'Fiche Google My Business optimisée',
        texte:
          "Mise à jour complète de votre fiche avec les nouvelles photos, catégories, horaires et stratégie d'avis. Vos clients vous trouvent avant vos concurrents.",
      },
    ],
    faq: [
      {
        question: 'Intervenez-vous pendant le service ou en dehors ?',
        reponse:
          "Les deux selon le besoin. Pour les photos d'ambiance et de service, je travaille pendant un vrai service du soir — discret, sans perturber votre équipe. Pour les photos de plats et le dressage, on peut prévoir une session en dehors des heures de pointe.",
      },
      {
        question: "Combien de plats peut-on photographier lors d'une session ?",
        reponse:
          "Sur une demi-journée, on peut couvrir entre 8 et 15 plats selon leur complexité, plus les photos d'ambiance. Je vous conseille de prioriser vos best-sellers et les plats signature.",
      },
      {
        question: 'Les photos sont-elles adaptées à TripAdvisor et Google ?',
        reponse:
          "Oui. Chaque photo est livrée dans les formats adaptés aux différentes plateformes (carré, portrait, paysage). Vous recevez un dossier organisé par usage.",
      },
    ],
    projetsLies: ['le-clos-des-saveurs-restaurant'],
  },
  {
    slug: 'fleuristes',
    nom: 'fleuriste',
    nomPluriel: 'fleuristes',
    emoji: '🌸',
    titre: 'Photo & vidéo pour fleuristes — Île-de-France',
    metaDescription:
      "Photographie et vidéo pour fleuristes en Île-de-France. Mettez vos créations florales en valeur sur Instagram, votre site et Google. Studio mobile, livraison J+5.",
    accroche: "Vos créations méritent des images aussi soignées qu'elles.",
    description:
      "Un fleuriste vend de la beauté — mais si ses bouquets et compositions ne sont pas photographiés correctement, ce talent disparaît à l'écran. Sur Instagram, une photo bien éclairée d'une composition florale peut générer des dizaines de demandes de devis. Une photo sombre ou floue, rien. Locamaster capture vos créations en lumière naturelle ou en studio mobile, dans votre boutique ou en extérieur, pour que chaque cliché rende justice à votre travail.",
    problemes: [
      "Des photos Instagram prises à la hâte qui ne montrent pas la qualité des créations",
      "Peu de contenu vidéo alors que les Reels de compositions florales explosent sur Instagram",
      "Une boutique belle en vrai, peu visible en ligne",
    ],
    solutions: [
      {
        titre: 'Photographie de créations florales',
        texte:
          "Photos de bouquets, compositions de mariage, centres de table, couronnes et décorations événementielles. Éclairage maîtrisé pour restituer les textures et les couleurs.",
      },
      {
        titre: 'Vidéo making-of et time-lapse',
        texte:
          "Vidéos de composition en accéléré, Reels d'atelier, courts métrages d'ambiance boutique. Le contenu le plus engageant pour les fleuristes sur Instagram.",
      },
      {
        titre: 'Shooting boutique',
        texte:
          "Photos de votre espace de travail, de votre devanture et de votre équipe en action. Une vitrine en ligne qui donne envie d'entrer.",
      },
    ],
    faq: [
      {
        question: "Peut-on faire un shooting de mariages et d'événements ?",
        reponse:
          "Oui, je peux intervenir sur site lors de la mise en place d'un événement pour photographier vos décorations florales en situation réelle. C'est souvent le contenu le plus impactant.",
      },
      {
        question: 'Combien de temps dure un shooting en boutique ?',
        reponse:
          "Une session de 45 à 90 minutes couvre généralement les créations du moment, quelques photos d'ambiance boutique et un plan de coupe pour les réseaux. On s'adapte à votre rythme.",
      },
    ],
    projetsLies: ['atelier-blanc-fleuriste'],
  },
  {
    slug: 'artisans',
    nom: 'artisan',
    nomPluriel: 'artisans',
    emoji: '🔨',
    titre: 'Photo & vidéo pour artisans — Île-de-France',
    metaDescription:
      "Photo et vidéo pour artisans du bâtiment, menuisiers, plombiers, électriciens, peintres en Île-de-France. Avant/après, chantiers, savoir-faire. Devis en 24h.",
    accroche: 'Votre savoir-faire vu, filmé, reconnu.',
    description:
      "Un artisan qui fait du bon travail n'est pas automatiquement celui qu'on appelle. Le bouche-à-oreille a des limites. Sur Google, les clients cherchent « plombier Paris 11e » ou « menuisier Île-de-France » et choisissent celui qui inspire le plus confiance — en quelques secondes, sans jamais avoir vu le travail en vrai. Une fiche Google avec de belles photos de chantier, une vidéo de savoir-faire et des avis clients bien gérés font la différence entre un agenda plein et une activité qui stagne.",
    problemes: [
      "Aucune photo de réalisations pour montrer la qualité du travail sur Google et les devis",
      "Activité qui dépend entièrement du bouche-à-oreille sans présence en ligne",
      "Des concurrents moins qualifiés qui gagnent des marchés grâce à une meilleure image",
    ],
    solutions: [
      {
        titre: 'Photos de chantier et avant/après',
        texte:
          "Photos de vos réalisations sur chantier, en atelier ou chez le client. Les avant/après sont le contenu le plus convaincant pour un artisan.",
      },
      {
        titre: 'Vidéo de savoir-faire',
        texte:
          "Courte vidéo qui montre votre métier en action : les gestes, les matériaux, le détail du travail. Le client comprend votre niveau sans que vous ayez besoin d'expliquer.",
      },
      {
        titre: 'Fiche Google pro',
        texte:
          "Optimisation complète de votre profil Google avec photos de qualité, gestion des avis et mise à jour régulière. Vous sortez avant vos concurrents sur les recherches locales.",
      },
    ],
    faq: [
      {
        question: 'Peut-on photographier un chantier en cours ?',
        reponse:
          "Oui, et c'est souvent le plus intéressant. Je m'adapte aux conditions du chantier (poussière, lumière naturelle variable) et je capture les étapes clés qui montrent le niveau de soin apporté au travail.",
      },
      {
        question: "Est-ce utile si j'ai déjà des clients réguliers ?",
        reponse:
          "Absolument. Les images professionnelles vous permettent de monter en gamme, d'attirer des clients avec des projets plus importants et de vous différencier des artisans qui cassent les prix. L'image valorise le travail et justifie les tarifs.",
      },
    ],
  },
  {
    slug: 'coiffeurs',
    nom: 'coiffeur',
    nomPluriel: 'coiffeurs',
    emoji: '✂️',
    titre: 'Photo & vidéo pour coiffeurs — Île-de-France',
    metaDescription:
      "Photo et vidéo pour salons de coiffure en Île-de-France. Shooting résultats, ambiance salon, Reels Instagram. Montrez votre travail, remplissez votre agenda.",
    accroche: "Un salon qui se voit autant qu'il se ressent.",
    description:
      "Dans la coiffure, le portfolio est tout. Les clients choisissent leur coiffeur en faisant défiler Instagram — ils cherchent quelqu'un qui maîtrise leur type de cheveux, leur couleur, leur style. Sans photos de résultats et sans contenu vidéo, même le meilleur salon reste invisible. Locamaster vient dans votre salon pour photographier vos résultats les plus beaux, capturer l'ambiance de votre espace et produire des Reels qui montrent la transformation en quelques secondes.",
    problemes: [
      "Un Instagram avec des photos amateur qui ne montrent pas la qualité des résultats",
      "Peu de nouveaux clients car aucun contenu de transformation ou d'avant/après",
      "Un salon élégant qui passe inaperçu en ligne",
    ],
    solutions: [
      {
        titre: 'Photographie de résultats',
        texte:
          "Photos de coupes, couleurs, balayages, coiffures de mariage. Éclairage professionnel pour restituer les nuances et les textures. Format prêt pour Instagram et Google.",
      },
      {
        titre: 'Reels de transformation',
        texte:
          "Vidéos avant/après, time-lapse de mise en couleur, Reels d'ambiance salon. Le contenu qui génère le plus d'abonnés et de prises de rendez-vous.",
      },
      {
        titre: 'Shooting salon',
        texte:
          "Photos de votre espace, de votre équipe en action, de vos produits et de l'ambiance. Une vitrine qui donne envie de pousser la porte.",
      },
    ],
    faq: [
      {
        question: 'Faut-il prévoir des modèles ou vous en chargez-vous ?',
        reponse:
          "En général, on travaille avec vos vraies clientes du jour — c'est plus naturel et plus convaincant qu'un modèle. Il suffit de me réserver un créneau sur une matinée ou une après-midi de votre planning habituel.",
      },
      {
        question: 'Combien de photos de résultats peut-on obtenir sur une session ?',
        reponse:
          "Sur une demi-journée, entre 6 et 12 photos de résultats selon le nombre de prestations en cours, plus les photos de salon. Largement de quoi alimenter Instagram plusieurs semaines.",
      },
    ],
    projetsLies: ['salon-coiffure-noha'],
  },
  {
    slug: 'antiquaires',
    nom: 'antiquaire',
    nomPluriel: 'antiquaires',
    emoji: '🪑',
    titre: 'Photo & vidéo pour antiquaires & galeristes — Île-de-France',
    metaDescription:
      "Photo et vidéo professionnelles pour antiquaires, brocanteurs et galeristes en Île-de-France. Valorisez vos pièces, attirez des acheteurs nationaux et internationaux.",
    accroche: "Chaque pièce a une âme. Montrons-la.",
    description:
      "Un objet de collection ou une pièce ancienne peut valoir dix fois plus — ou dix fois moins — selon la façon dont il est photographié. Pour un antiquaire, la photographie n'est pas un luxe, c'est un outil commercial direct. Les acheteurs sérieux cherchent désormais en ligne avant de se déplacer, et la qualité des images conditionne leur confiance. Locamaster maîtrise l'éclairage et la mise en scène des objets, des meubles et des œuvres pour que chaque pièce soit présentée à sa juste valeur.",
    problemes: [
      "Des photos d'objets sombres et sans relief qui ne rendent pas leur valeur réelle",
      "Une clientèle limitée au passage en boutique, sans reach national ou international",
      "Aucun contenu vidéo pour présenter des pièces uniques en ligne",
    ],
    solutions: [
      {
        titre: "Photographie d'objets et de meubles",
        texte:
          "Photos sur fond neutre ou en situation dans votre galerie. Lumière calibrée pour révéler les matières, les patines et les détails. Format adapté aux sites de vente, réseaux et catalogues.",
      },
      {
        titre: 'Film de présentation de pièces',
        texte:
          "Courte vidéo de 30 à 60 secondes par pièce : rotation, détails, contexte. Le format idéal pour Instagram, Pinterest et les clients à distance.",
      },
      {
        titre: 'Shooting galerie et ambiance',
        texte:
          "Photos de votre espace, de vos accrochages et de vos scénographies. Une galerie virtuelle qui attire des acheteurs avant leur visite.",
      },
    ],
    faq: [
      {
        question: 'Pouvez-vous photographier des pièces très volumineuses (meubles, sculptures) ?',
        reponse:
          "Oui. Je viens avec le matériel adapté (pieds, diffuseurs, fonds si nécessaire) pour photographier des pièces de toutes tailles dans votre espace.",
      },
      {
        question: 'Est-ce utile pour vendre sur des plateformes comme 1stDibs ou Selency ?',
        reponse:
          "Absolument. Les plateformes de vente premium exigent des photos de qualité professionnelle. Des images irréprochables augmentent significativement les chances d'acceptation et le prix de vente final.",
      },
    ],
    projetsLies: ['galerie-antiquites-moreau'],
  },
  {
    slug: 'libraires',
    nom: 'libraire',
    nomPluriel: 'libraires',
    emoji: '📚',
    titre: 'Photo & vidéo pour librairies indépendantes — Île-de-France',
    metaDescription:
      "Photo et vidéo pour librairies indépendantes en Île-de-France. Shooting boutique, événements, portraits libraires. Renforcez votre lien de proximité en ligne.",
    accroche: "Une librairie, c'est une atmosphère. Faisons-la voir.",
    description:
      "La librairie indépendante vit de l'attachement de ses clients. Ceux qui y reviennent viennent autant pour les livres que pour l'ambiance, le conseil, le lien humain. En ligne, cet attachement se construit avec des images et des vidéos qui racontent l'atmosphère du lieu, présentent les libraires et montrent les coups de cœur. Un Instagram bien tenu avec de belles photos est souvent le seul canal marketing dont une librairie indépendante a besoin.",
    problemes: [
      "Une identité forte en boutique mais peu visible en ligne",
      "Pas de contenu pour communiquer autour des événements (dédicaces, lectures, ateliers)",
      "Peu de moyens marketing face aux grandes enseignes",
    ],
    solutions: [
      {
        titre: 'Shooting boutique & atmosphère',
        texte:
          "Photos de vos rayons, de vos vitrines, de vos coins lecture et de vos mises en avant. Des images qui transmettent l'âme du lieu.",
      },
      {
        titre: 'Portraits et équipe',
        texte:
          "Photos de vos libraires en situation, portraits individuels pour les réseaux. Le visage humain derrière la librairie, c'est ce qui crée la fidélité.",
      },
      {
        titre: "Couverture d'événements",
        texte:
          "Photos et vidéos de dédicaces, lectures, ateliers enfants et soirées thématiques. Un contenu fort pour vos réseaux et votre communication.",
      },
    ],
    faq: [
      {
        question: 'Peut-on couvrir des événements en soirée ou le week-end ?',
        reponse:
          "Oui, je m'adapte à vos créneaux, y compris les soirées et les week-ends. Les événements sont souvent le meilleur contenu à produire pour une librairie.",
      },
      {
        question: 'Avez-vous une expérience avec des petits budgets ?',
        reponse:
          "La Session Découverte à 190 € HT est précisément conçue pour les structures avec des budgets limités. Un premier résultat concret, sans engagement sur un pack complet.",
      },
    ],
    projetsLies: ['la-bouquinerie-librairie'],
  },
];

export function getSecteurBySlug(slug: string): Secteur | undefined {
  return secteurs.find((s) => s.slug === slug);
}
