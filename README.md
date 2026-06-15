# Locamaster — Site vitrine

Branding, photo et vidéo pour artisans et entreprises locales en Île-de-France.

## Stack technique

| Outil | Rôle |
|---|---|
| [Astro 4](https://astro.build) | Framework principal (hybrid output) |
| [Tailwind CSS 3](https://tailwindcss.com) | Styles utilitaires + design tokens |
| [TypeScript](https://www.typescriptlang.org) | Typage des données |
| [Vercel](https://vercel.com) | Hébergement + API routes serverless |
| [GSAP + ScrollTrigger](https://gsap.com) | Animations au scroll, parallaxe, compteurs |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scroll inertiel |
| [Remotion](https://remotion.dev) | Production de vidéos animées (dossier `remotion/`, isolé) |
| Supabase *(futur)* | Base de données leads + Storage médias |
| Make *(futur)* | Automatisation des leads |

## Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-repo/locamaster.git
cd locamaster

# 2. Installer les dépendances
npm install

# 3. Copier les variables d'environnement
cp .env.example .env
# Renseigner les valeurs dans .env (optionnel pour démarrer en local)

# 4. Lancer le serveur de développement
npm run dev
# → Ouvrir http://localhost:4321
```

## Structure du projet

```
src/
├── layouts/
│   └── BaseLayout.astro        # Layout global (SEO, meta, polices)
├── components/
│   ├── Navigation.astro         # Navigation sticky responsive
│   ├── Footer.astro             # Footer global
│   └── portfolio/
│       └── ProjectCard.astro    # Carte projet réutilisable
├── sections/                    # Sections de la homepage
│   ├── Hero.astro
│   ├── Positionnement.astro
│   ├── Services.astro
│   ├── SessionDecouverte.astro
│   ├── Offres.astro
│   ├── Process.astro
│   ├── PourquoiLocamaster.astro
│   ├── PortfolioPreview.astro
│   ├── CasUsage.astro
│   ├── FAQ.astro
│   └── CTAFinale.astro
├── pages/
│   ├── index.astro              # Homepage
│   ├── offres.astro             # Page tarifs
│   ├── a-propos.astro           # Page à propos
│   ├── contact.astro            # Page contact + formulaire
│   ├── 404.astro                # Page d'erreur
│   ├── mentions-legales.astro
│   ├── politique-confidentialite.astro
│   ├── realisations/
│   │   ├── index.astro          # Listing portfolio
│   │   └── [slug].astro         # Fiche projet individuelle
│   └── api/
│       └── contact.ts           # Route API formulaire de contact
├── data/                        # Données centralisées (TypeScript)
│   ├── offres.ts                # Packs + abonnements
│   ├── projets.ts               # Portfolio
│   ├── faq.ts                   # Questions fréquentes
│   └── services.ts              # Liste des services
└── styles/
    └── global.css               # Styles globaux + design tokens Tailwind
```

## Modifier les textes et offres

### Tarifs et offres
→ `src/data/offres.ts`
Modifier les objets `packs` et `abonnements` pour changer les prix, noms et livrables.

### Services présentés
→ `src/data/services.ts`
Modifier le tableau `services` pour ajouter, retirer ou modifier un service.

### FAQ
→ `src/data/faq.ts`
Modifier le tableau `faqItems` pour ajouter ou modifier les questions/réponses.

### Textes des sections
→ Chaque section dans `src/sections/`
Le wording est directement dans les templates Astro, facilement modifiable.

## Ajouter un projet au portfolio

1. Ouvrir `src/data/projets.ts`
2. Ajouter un objet dans le tableau `projets` :

```ts
{
  slug: 'mon-client-secteur',           // URL : /realisations/mon-client-secteur
  titre: 'Titre du projet',
  client: 'Nom du client',
  secteur: 'Plomberie',
  categorie: 'pack',                    // 'photo' | 'video' | 'branding' | 'pack'
  description: 'Contexte du projet...',
  besoin: 'Ce que le client cherchait...',
  solution: 'Ce que j\'ai fait...',
  resultat: 'Ce qui a changé...',
  livrables: ['20 photos', '3 vidéos'],
  imageCover: '/images/projets/mon-client-cover.jpg',
  galerie: ['/images/projets/mon-client-1.jpg'],  // optionnel
  videoUrl: 'https://www.youtube.com/embed/XXXXXXXXX',  // optionnel
  pack: 'Branding Pro',
  dateAnnee: 2025,
  featured: true,                       // true = apparaît sur la homepage
}
```

3. Ajouter l'image dans `public/images/projets/` (JPEG, 1200×800px minimum)
4. Redémarrer le serveur ou rebuilder

## Ajouter des photos et vidéos

### Photos
- Stocker dans `public/images/` (max ~500KB/image, WebP ou JPEG optimisé)
- Référencer dans les données : `imageCover: '/images/projets/mon-image.jpg'`
- Pour la production avec beaucoup d'images : utiliser **Vercel Blob**

### Vidéos
**Ne jamais stocker les vidéos lourdes dans le repo ni dans `public/`.**

Options recommandées :
1. **YouTube / Vimeo** (recommandé) → embed via `videoUrl` dans les données projet
2. **Vercel Blob** → pour de courtes vidéos (< 100MB), stocker et servir via l'URL Blob
3. **Supabase Storage** → si Supabase est déjà branché

```ts
// Dans projets.ts
videoUrl: 'https://www.youtube.com/embed/VIDEO_ID'
// ou
videoUrl: 'https://player.vimeo.com/video/VIDEO_ID'
```

## Brancher Supabase

### 1. Créer le projet Supabase
1. Créer un projet sur [supabase.com](https://supabase.com)
2. Dans Settings > API, copier l'URL et les clés

### 2. Variables d'environnement
```env
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...
```

### 3. Créer la table `leads`
Dans l'éditeur SQL de Supabase :

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  nom text not null,
  entreprise text,
  email text not null,
  telephone text,
  besoin text not null,
  budget text,
  message text not null,
  source text default 'site-web',
  created_at timestamptz default now()
);

-- Row Level Security — interdit la lecture publique
alter table leads enable row level security;

-- Seul le service role peut insérer/lire
create policy "Service role only"
  on leads
  for all
  using (false)  -- pas de lecture publique
  with check (false);  -- insertion via service role uniquement
```

### 4. Décommenter le code dans l'API route
Dans `src/pages/api/contact.ts`, décommenter la section "SUPABASE".

Installer le client :
```bash
npm install @supabase/supabase-js
```

## Brancher Make (automatisation leads)

### 1. Créer un scénario Make
1. Sur [make.com](https://make.com), créer un nouveau scénario
2. Ajouter un déclencheur **Webhooks > Custom webhook**
3. Copier l'URL générée

### 2. Variable d'environnement
```env
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/xxxxxxxxxxxx
```

### 3. Décommenter le code
Dans `src/pages/api/contact.ts`, décommenter la section "MAKE".

Le webhook reçoit un objet JSON avec tous les champs du lead.
Dans Make, vous pouvez ensuite :
- Ajouter une ligne dans un Google Sheet
- Envoyer un email de notification
- Créer une tâche dans un CRM
- Envoyer un message Slack ou WhatsApp

## Déployer sur Vercel

### Déploiement initial
```bash
# Installer la CLI Vercel
npm install -g vercel

# Déployer (première fois)
vercel

# Suivre les instructions :
# → Framework: Astro
# → Build command: npm run build
# → Output dir: dist
```

### Variables d'environnement sur Vercel
Dans le dashboard Vercel (Project > Settings > Environment Variables) :
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MAKE_WEBHOOK_URL`
- `PUBLIC_SITE_URL` → `https://locamaster.fr`

### Domaine personnalisé
Dans Vercel > Project > Domains :
1. Ajouter `locamaster.fr`
2. Ajouter `www.locamaster.fr` avec redirect vers le domaine principal
3. Configurer les DNS chez votre registrar

### Déploiements suivants
```bash
# Depuis la branche main
git push origin main
# → Vercel déploie automatiquement via le webhook GitHub
```

## Stratégie médias en production

| Type | Solution | Taille max |
|---|---|---|
| Photos optimisées | `public/images/` → Vercel CDN | ~300KB/image |
| Images nombreuses | Vercel Blob | Illimité |
| Vidéos courtes | YouTube / Vimeo embed | — |
| Vidéos lourdes | Vercel Blob ou Supabase Storage | — |

**Recommandation :** exporter toutes les images en WebP (qualité 80%) et ne jamais commiter de MP4 dans le repo.

## Commandes utiles

```bash
npm run dev       # Développement local → http://localhost:4321
npm run build     # Build de production
npm run preview   # Preview du build en local
```

## Animations (GSAP + Lenis)

Le système d'animation est centralisé dans [`src/scripts/luxe.ts`](src/scripts/luxe.ts),
importé une fois dans `BaseLayout.astro`.

- **Lenis** → smooth scroll inertiel global.
- **GSAP + ScrollTrigger** → apparitions au scroll (reveals), parallaxe, compteurs animés.
- **Curseur custom** + **boutons magnétiques** (desktop, pointeur fin).
- **Astro View Transitions** → transitions fluides entre pages.

Marqueurs déclaratifs à poser dans le markup :

| Attribut | Effet |
|---|---|
| `data-reveal` | Apparition au scroll (fondu + montée) |
| `data-parallax="10"` | Parallaxe (valeur = force en %) |
| `data-magnetic` | Bouton qui suit légèrement le curseur |
| `data-count="190" data-count-suffix=" €"` | Compteur animé au scroll |
| `data-hero-el` | Élément de la timeline d'entrée du hero |

Tout respecte `prefers-reduced-motion` (animations désactivées, contenu visible).

## Studio vidéo (Remotion)

Le dossier [`remotion/`](remotion/) est un projet **isolé** (React + Remotion)
qui génère des **vidéos MP4 animées** à la charte Locamaster — sans jamais
toucher au bundle du site.

```bash
cd remotion
npm install
npm run dev          # Remotion Studio (preview + édition des textes/prix)
npm run render:all   # Rend les 3 vidéos dans remotion/out/
```

3 compositions : `SocialPromo` (9:16 réseaux), `LogoSting` (16:9 intro/outro),
`OffreReveal` (1:1 prix). Voir [`remotion/README.md`](remotion/README.md).
