# 🎧 LocaMaster DJ - Landing Page + Backend

Solution complète pour la landing page LocaMaster DJ avec système de contact, démos et waitlist intégrés.

## ✨ Fonctionnalités

### 🎨 Frontend
- **Landing page moderne** avec animations Tailwind
- **3 types de formulaires** : Démo, Contact, Waitlist  
- **Modals responsives** avec validation
- **Animations smooth** et effets visuels
- **Design DJ-oriented** avec gradients et effets

### ⚡ Backend
- **API Routes Next.js** pour traitement des formulaires
- **Système d'emails** (Gmail/SendGrid/Resend)
- **Sauvegarde de données** (JSON/MongoDB/Supabase/MySQL)
- **Rate limiting** anti-spam
- **Validation** et sanitisation des inputs

## 🚀 Installation Rapide

```bash
# Clone ou télécharge le projet
git clone [ton-repo] locamaster-dj
cd locamaster-dj

# Installation des dépendances
npm install

# Configuration interactive
node scripts/setup.js

# Lancement en développement
npm run dev
```

## 📧 Configuration Email

### Option 1: Gmail (Gratuit et Simple)

1. **Active l'authentification à 2 facteurs** sur ton compte Google
2. **Génère un mot de passe d'application** :
   - Va dans Paramètres Google → Sécurité
   - "Mots de passe des applications"
   - Sélectionne "Autre" et nomme "LocaMaster DJ"
   - Copie le mot de passe généré

3. **Configure `.env.local`** :
```bash
EMAIL_PROVIDER=gmail
GMAIL_USER=ton-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop  # Le mot de passe généré
ADMIN_EMAIL=ton-email@gmail.com
```

### Option 2: SendGrid (Professionnel)

```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
FROM_EMAIL=support@locamaster-dj.com
ADMIN_EMAIL=support@locamaster-dj.com
```

### Option 3: Resend (Moderne)

```bash
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_EMAIL=support@locamaster-dj.com
```

## 💾 Configuration Base de Données

### Option 1: JSON File (Gratuit, Simple)

```bash
DB_PROVIDER=file
```

Les données sont sauvées dans `./data/` :
- `./data/demo_requests.json`
- `./data/contact_requests.json`  
- `./data/waitlist.json`

### Option 2: MongoDB

```bash
DB_PROVIDER=mongodb
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/locamaster
```

### Option 3: Supabase

```bash
DB_PROVIDER=supabase
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxxxxxxxxxx
```

### Option 4: MySQL/PlanetScale

```bash
DB_PROVIDER=mysql
DATABASE_URL=mysql://username:password@host:port/database
```

## 🎯 Types de Formulaires

### 1. Formulaire Démo (`/api/demo`)
**Objectif** : Convertir les visiteurs intéressés en prospects qualifiés

**Champs** :
- Nom/Nom de scène ⭐
- Email ⭐ 
- Téléphone
- Type d'événements ⭐
- Événements par mois
- Principales galères ⭐
- Préférence horaire contact

**Emails envoyés** :
- **À l'admin** : Nouvelle demande de démo avec toutes les infos
- **Au DJ** : Confirmation + next steps

### 2. Formulaire Contact (`/api/contact`)
**Objectif** : Support client et questions générales

**Champs** :
- Nom ⭐
- Email ⭐
- Type d'événements ⭐  
- Événements par mois
- Message ⭐

**Emails envoyés** :
- **À l'admin** : Nouveau message de contact
- **Au DJ** : Accusé de réception

### 3. Formulaire Waitlist (`/api/waitlist`)
**Objectif** : Capturer les early adopters avant le lancement

**Champs** :
- Nom ⭐
- Email ⭐
- Type d'événements ⭐
- Événements par mois
- Message (optionnel)

**Emails envoyés** :
- **À l'admin** : Nouvelle inscription waitlist
- **Au DJ** : Bienvenue sur la waitlist + next steps

## 🛡️ Sécurité

### Rate Limiting
- **10 requêtes par 15 minutes** par IP pour les APIs de contact
- Protection anti-spam intégrée
- Nettoyage automatique des données de rate limiting

### Validation
- **Validation email** côté client et serveur
- **Sanitisation des inputs** (suppression XSS)
- **Champs obligatoires** vérifiés
- **Protection CSRF** native Next.js

### Logs et Monitoring
- **Logs des erreurs** dans la console serveur
- **IP tracking** pour debugging
- **User-Agent** enregistré pour analyse

## 📱 Usage des Composants

### Modal de Contact

```jsx
import Modal from '../components/Modal'
import ContactForm from '../components/ContactForm'

function MyPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <>
      <button onClick={() => setShowDemo(true)}>
        Démo Gratuite
      </button>
      
      <Modal isOpen={showDemo} onClose={() => setShowDemo(false)}>
        <ContactForm type="demo" onClose={() => setShowDemo(false)} />
      </Modal>
    </>
  )
}
```

### Types Disponibles
- `type="demo"` - Formulaire de demande de démo
- `type="contact"` - Formulaire de contact général  
- `type="waitlist"` - Inscription à la waitlist

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Push ton code** sur GitHub
2. **Connecte Vercel** à ton repo
3. **Configure les variables d'environnement** dans Vercel
4. **Deploy** automatiquement !

Variables à configurer dans Vercel :
```bash
EMAIL_PROVIDER=gmail
GMAIL_USER=ton-email@gmail.com
GMAIL_APP_PASSWORD=ton-mot-de-passe-app
ADMIN_EMAIL=ton-email@gmail.com
DB_PROVIDER=file
NEXTAUTH_SECRET=ta-cle-secrete-longue
NEXTAUTH_URL=https://ton-domaine.vercel.app
```

### Autres Plateformes
- **Netlify** : Compatible avec les API routes Next.js
- **Railway** : Déploiement Docker possible
- **DigitalOcean App Platform** : Support Next.js natif

## 📊 Analytics et Tracking

### Données Collectées
Pour chaque soumission de formulaire :

```json
{
  "id": "unique-id",
  "type": "demo|contact|waitlist", 
  "name": "DJ TonNom",
  "email": "ton@email.com",
  "djType": "mariage",
  "eventsPerMonth": "3-5",
  "message": "Mes galères...",
  "timestamp": "2025-01-01T12:00:00.000Z",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "createdAt": "2025-01-01T12:00:00.000Z"
}
```

### Analyse Business
- **Conversion par type** de formulaire
- **Segmentation** par type d'événements  
- **Volume** d'événements par DJ
- **Sources de trafic** via IP/UserAgent

## 🔧 Personnalisation

### Couleurs et Thème

Dans `tailwind.config.js` :

```javascript
extend: {
  colors: {
    'dj-purple': '#8B5CF6',
    'dj-pink': '#EC4899', 
    'dj-blue': '#3B82F6',
  }
}
```

### Templates d'Emails

Modifie les templates dans :
- `pages/api/demo.js` - Email de confirmation démo
- `pages/api/contact.js` - Email de confirmation contact  
- `pages/api/waitlist.js` - Email de bienvenue waitlist

### Champs Personnalisés

Ajoute de nouveaux champs dans :
1. `components/ContactForm.js` - Interface
2. `pages/api/[type].js` - Traitement backend
3. `lib/utils.js` - Validation si nécessaire

## 🐛 Debugging

### Logs Utiles

```bash
# Voir les logs en temps réel
npm run dev

# Dans les logs, cherche :
# "Email envoyé: [messageId]" - Succès email
# "Données sauvées dans ./data/[file]" - Succès sauvegarde  
# "Erreur API [type]:" - Erreurs backend
```

### Problèmes Courants

**Email ne s'envoie pas :**
- Vérifier `GMAIL_APP_PASSWORD` (pas le mot de passe normal)
- Vérifier que l'auth 2FA est activée sur Google
- Tester avec un autre service email

**Rate limiting trop strict :**
- Modifier les valeurs dans `middleware.js`
- Ajuster `checkRateLimit(ip, windowMs, maxRequests)`

**Données non sauvées :**
- Vérifier les permissions du dossier `./data/`
- Tester avec `DB_PROVIDER=file` d'abord

## 🎵 Next Steps Business

1. **Analytics** : Ajouter Google Analytics pour tracker les conversions
2. **CRM** : Intégrer HubSpot/Pipedrive pour le suivi commercial
3. **Automation** : Zapier pour connecter aux outils DJ
4. **A/B Testing** : Tester différents hooks et CTA
5. **SEO** : Optimiser pour les mots-clés DJ business

---

**🎧 Fait avec ❤️ pour les DJs qui veulent professionnaliser leur business !**

Des questions ? Écris à support@locamaster-dj.com