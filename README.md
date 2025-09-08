# LOCAMASTER — Next.js 14 Premium Starter (Stripe + Galerie étendue)

## Prérequis
- Node.js 20+
- PostgreSQL 14+
- Stripe compte Test (clé secrète + webhook secret)

## Installation
```bash
npm i
cp .env.example .env
# Éditez .env : DATABASE_URL, NEXTAUTH_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
npx prisma migrate dev --name init
npm run seed
npm run dev
```

## Stripe — Produits & Prix
1. Créez **Produits** et **Prix** dans le Dashboard Stripe (mode Test) pour vos packs.
2. Récupérez les **Price IDs** (ex: `price_123`).
3. Mettez à jour la table `Price.stripePriceId` (via Prisma Studio: `npx prisma studio`) en collant les IDs Stripe.
4. Le checkout se crée via `/api/stripe/create-checkout-session` avec `items: [{ priceId: STRIPE_PRICE_ID, quantity: 1 }]`.

### Webhook
- Configurez un endpoint webhook vers `/api/stripe/webhook` avec l'événement `checkout.session.completed`.
- Le webhook crée un `Order` et une `Commission` (calcul 25% par défaut, ou `establishment.commissionRate`).
- Si `establishment.stripeAccountId` est renseigné et que vous utilisez Stripe Connect, un **transfer** est tenté automatiquement.

## Galerie / Albums
- `Gallery` (par établissement) -> `Album` -> `Photo`.
- `accessCode` sur `Gallery` pour un accès simple type code.

## À faire ensuite
- UI de commande parents/élèves : lister produits/ prix (GET `/api/products/prices`), panier, appel checkout.
- Auth publique (parents) vs établissement (NextAuth) si besoin.
- Onboarding Stripe Connect pour établissements (création compte, `stripeAccountId`).
- Exports comptables (CSV), AR/QR, RGPD pages.
# locamaster
# locamaster
