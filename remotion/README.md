# Locamaster — Studio vidéo (Remotion)

Production de vidéos animées **par code**, à la charte Locamaster (miel / noir,
Bricolage Grotesque). Ce dossier est **totalement isolé** du site Astro : il a
ses propres dépendances (React + Remotion) et ne touche jamais au bundle du site.

## À quoi ça sert

**Modèles génériques** (éditables dans le Studio) :

| Composition | Format | Usage |
|---|---|---|
| `SocialPromo` | 1080×1920 (9:16) | Intro Reels / TikTok / Shorts |
| `LogoSting` | 1920×1080 (16:9) | Intro / outro de film vitrine |
| `OffreReveal` | 1080×1080 (1:1) | Post carré qui met en avant un pack + prix |

**Jeu complet généré automatiquement** depuis [`src/data.ts`](src/data.ts) — un MP4 prêt à poster par offre et par cas d'usage :

| Préfixe | Quantité | Format | Source |
|---|---|---|---|
| `Pack-*` | 3 | 1:1 | Royal Starter, Branding Pro, Premium Artisan |
| `Abo-*` | 3 | 1:1 | Social Starter, Social Pro, Social Elite |
| `Cas-*` | 5 | 9:16 | Plombier, Cuisiniste, Menuisier, Électricien, Rénovation |

> Pour modifier les textes/prix de **toutes** ces vidéos d'un coup : éditer
> `src/data.ts`. Aucune autre modification nécessaire.

> Remotion **génère des fichiers MP4**. Ce n'est pas une lib web : on l'utilise
> ici, hors-ligne, pour produire des vidéos qu'on publie ensuite (réseaux, site,
> intros de réalisations).

## Installation

```bash
cd remotion
npm install
```

## Prévisualiser (Remotion Studio)

```bash
npm run dev
```
Ouvre un studio dans le navigateur : on voit les compositions, on scrubbe la
timeline, et on **modifie les textes / prix en direct** (panneau de droite,
grâce aux schémas Zod).

## Rendre les vidéos (MP4)

```bash
npm run render:social   # → out/social-promo.mp4
npm run render:logo     # → out/logo-sting.mp4
npm run render:offre    # → out/offre-reveal.mp4
npm run render:all      # les trois
```

### Personnaliser un rendu sans toucher au code

Passer des props en JSON :

```bash
npx remotion render OffreReveal out/premium.mp4 --props='{"title":"Premium Artisan","price":"4 000 € HT","label":"Pack complet","priceFrom":"À partir de","features":["Identité complète","8 vidéos","40 photos","1 film vitrine"]}'
```

## Où changer la charte

`src/brand.ts` — couleurs, polices, site, baseline. Synchronisé avec le
`tailwind.config.mjs` du site.

## Structure

```
remotion/
├── package.json
├── remotion.config.ts
├── tsconfig.json
└── src/
    ├── index.ts            # point d'entrée (registerRoot)
    ├── Root.tsx            # catalogue des compositions + props par défaut
    ├── brand.ts            # charte (couleurs, polices)
    ├── fonts.ts            # chargement Bricolage Grotesque + Inter
    └── compositions/
        ├── SocialPromo.tsx
        ├── LogoSting.tsx
        └── OffreReveal.tsx
```

## Ajouter une composition

1. Créer `src/compositions/MaVideo.tsx` (exporter un `React.FC`).
2. L'enregistrer dans `src/Root.tsx` avec `<Composition id="MaVideo" .../>`.
3. Ajouter un script de rendu dans `package.json` si besoin.

Les `out/` (vidéos rendues) et `node_modules/` sont git-ignorés — on ne commite
jamais les fichiers lourds.
