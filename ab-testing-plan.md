# Plan A/B Testing — Locamaster
**Date** : 2026-06-17
**Outil recommandé** : PostHog (gratuit jusqu'à 1M events/mois) ou Vercel Edge Middleware

---

## Contexte

Locamaster est un site à trafic faible à modéré (site en croissance). Les tests A/B classiques nécessitent du volume.
**Approche** : Tests séquentiels (1 test à la fois) avec durée minimum 4 semaines par test, en commençant par les pages à fort enjeu commercial.

**Métriques principales** :
- Taux de clic vers `/contact` (primaire)
- Taux de soumission du formulaire (secondaire)
- Clics sur `tel:` (secondaire)

---

## Test 1 — Priorité HAUTE
### CTA Hero : "Réserver ma session découverte" vs "Demander un devis gratuit"

**Hypothèse** :
> Parce que "Réserver" implique une action concrète et évoque un rendez-vous (moins engageant qu'un "devis"),
> nous pensons que remplacer "Demander un devis gratuit" par "Réserver ma session découverte"
> augmentera le CTR du CTA principal pour les nouveaux visiteurs.
> Nous mesurerons le CTR du bouton hero et le taux de conversion /contact.

**Variante A (contrôle)** : "Demander un devis gratuit"
**Variante B** : "Réserver ma session découverte"
**Variante C** : "Voir ce que j'ai fait pour d'autres" (lien vers /realisations)

**Page** : `src/sections/Hero.astro`
**Segment** : Nouveaux visiteurs uniquement
**Split** : 34/33/33
**Durée** : 4–6 semaines minimum
**Métriques** :
- Primaire : CTR bouton hero → /contact
- Secondaire : Taux de soumission formulaire contact
- Guardrail : Taux de rebond global (ne doit pas augmenter)

**Implémentation** (sans outil externe) :
```astro
<!-- src/sections/Hero.astro -->
<a href="/contact" class="btn-accent" data-ab-test="hero-cta" data-ab-variant="A">
  Demander un devis gratuit
</a>
```
Avec Vercel Edge Middleware : affecter une variante via cookie `ab_hero_cta` au premier visit.

---

## Test 2 — Priorité HAUTE
### Page /offres : Afficher d'abord la Session Découverte vs les Packs complets

**Hypothèse** :
> Parce que les visiteurs hésitent à s'engager sur un pack complet (1 000–4 000 €) avant d'avoir confiance,
> nous pensons que montrer la Session Découverte 190 € en premier (avant les packs)
> augmentera les conversions totales (session + packs) pour les premiers visiteurs.
> Nous mesurerons les clics sur "Réserver ma session" vs "Demander ce pack".

**Variante A (contrôle)** : Ordre actuel (SessionDecouverte → Packs → Abonnements)
**Variante B** : "Commencez ici" hero centré sur 190 € uniquement, packs en secondaire

**Page** : `src/pages/offres.astro`
**Durée** : 4 semaines
**Métriques** :
- Primaire : Clics sur CTA /contact depuis /offres
- Secondaire : Taux de clic sur "Réserver ma session" vs "Demander ce pack"
- Guardrail : Valeur moyenne des demandes entrantes (ne doit pas baisser sous 190 €)

---

## Test 3 — Priorité MOYENNE
### Formulaire contact : 4 champs vs 6 champs

**Hypothèse** :
> Parce que les formulaires longs freinent la soumission (friction),
> nous pensons que supprimer "Budget estimé" et "Entreprise" du formulaire
> augmentera le taux de soumission de 15 %+ pour les visiteurs mobile.
> Nous mesurerons le taux de soumission formulaire.

**Variante A (contrôle)** : Formulaire actuel (6 champs)
**Variante B** : Formulaire simplifié (4 champs : nom, email, besoin, message)

**Page** : `src/pages/contact.astro`
**Segment** : Mobile uniquement (< 768px)
**Durée** : 6 semaines (trafic plus faible sur cette page)
**Métriques** :
- Primaire : Taux de soumission du formulaire
- Secondaire : Qualité des demandes (mesure qualitative hebdomadaire)
- Guardrail : Taux de complétion des champs obligatoires

---

## Test 4 — Priorité MOYENNE
### Social proof Hero : Stats vs Photos clients

**Hypothèse** :
> Parce que la preuve sociale visuelle (photos de vrais clients) est plus persuasive que des chiffres,
> nous pensons que remplacer la ligne de stats ("50+ clients, 5⭐") par 3 photos de résultats réels
> augmentera le CTR du CTA hero pour les visiteurs arrivant via Google.
> Nous mesurerons le temps passé sur la page et le CTR hero CTA.

**Variante A (contrôle)** : Stats texte + étoiles
**Variante B** : 3 thumbnails clients (avant/après) + une citation courte

**Page** : `src/sections/Hero.astro` (zone sous CTAs)
**Durée** : 4 semaines
**Métriques** :
- Primaire : CTR bouton hero
- Secondaire : Scroll depth (% des visiteurs qui voient SessionDecouverte)

---

## Test 5 — Priorité BASSE (après volume suffisant)
### Lead Magnet : "Guide gratuit" vs "Audit gratuit de votre fiche Google"

**Hypothèse** :
> "Audit de votre fiche Google" (valeur perçue plus élevée, résultat personnalisé)
> génère plus de soumissions email que le guide générique.

**Variante A** : Guide "5 erreurs photo"
**Variante B** : "Audit gratuit de votre fiche Google My Business"

**Page** : Composant LeadMagnet (home + offres)
**Prérequis** : Avoir suffisamment de trafic (> 2 000 visiteurs/mois)
**Durée** : 6–8 semaines

---

## Backlog hypothèses (à scorer avec ICE)

| Hypothèse | Impact | Confiance | Facilité | ICE |
|-----------|--------|-----------|----------|-----|
| CTA "Réserver" vs "Devis" | 8 | 7 | 9 | 8.0 |
| Session Découverte en hero /offres | 8 | 6 | 7 | 7.0 |
| Formulaire 4 vs 6 champs (mobile) | 6 | 7 | 8 | 7.0 |
| Social proof visuel vs stats | 6 | 6 | 7 | 6.3 |
| Guide vs Audit lead magnet | 5 | 5 | 6 | 5.3 |
| Urgence "2 créneaux" vs pas d'urgence | 7 | 5 | 9 | 7.0 |
| Garantie en haut vs en bas de page | 6 | 6 | 8 | 6.7 |
| Titre /offres "Des offres claires" vs "190 € pour commencer" | 7 | 5 | 9 | 7.0 |

---

## Plan d'implémentation sans outil externe

Pour implémenter A/B tests avec Astro + Vercel, sans outil payant :

```typescript
// middleware.ts (Vercel Edge)
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Affecter une variante au premier visit
  const abVariant = context.cookies.get('ab_hero_cta')?.value;
  if (!abVariant && context.url.pathname === '/') {
    const variant = Math.random() < 0.5 ? 'A' : 'B';
    context.cookies.set('ab_hero_cta', variant, { maxAge: 60 * 60 * 24 * 30 });
    context.locals.abHeroCta = variant;
  } else {
    context.locals.abHeroCta = abVariant ?? 'A';
  }
  return next();
});
```

Puis dans Hero.astro :
```astro
---
const variant = Astro.locals.abHeroCta ?? 'A';
const ctaLabel = variant === 'B' ? 'Réserver ma session découverte' : 'Demander un devis gratuit';
---
<a href="/contact" class="btn-accent" data-ab-variant={variant}>{ctaLabel}</a>
```

Mesure : événement `cta_click` déjà trackés via Vercel Analytics avec la propriété `variant`.

---

## Cadence recommandée

| Période | Action |
|---------|--------|
| Semaines 1–6 | Lancer Test 1 (Hero CTA) |
| Semaines 7–12 | Analyser Test 1, lancer Test 2 (/offres order) |
| Semaines 13–18 | Analyser Test 2, lancer Test 3 (formulaire mobile) |
| Mensuel | Scorer le backlog ICE, replenish hypothèses |

---

## Documentation des résultats (template)

```
## Test [N] — [Nom du test]
**Dates** : [début] → [fin]
**Variantes** : A ([description]) vs B ([description])
**Trafic** : [n par variante]
**Résultat** : [winner/loser/inconclusive]
**Métrique primaire** : [valeur A] vs [valeur B] → [delta %] (p=[valeur])
**Guardrails** : [OK / ALERTE]
**Pourquoi ça a marché / échoué** : [analyse]
**Pattern réutilisable** : [insight générique]
**Décision** : [implémenté / écarté / à re-tester]
```
