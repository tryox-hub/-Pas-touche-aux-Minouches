# 🐱 Pas touche aux Minouches — Site Web Complet

## Structure des fichiers

```
/
├── index.html              → Page d'accueil
├── chats.html              → Galerie des chats adultes
├── chatons.html            → Galerie des chatons
├── profil-chat.html        → Profil individuel d'un chat (dynamique ?id=...)
├── adoption.html           → Formulaire de demande d'adoption
├── don.html                → Page dons (compatible Yapla)
├── a-propos.html           → À propos de l'association
├── contact.html            → Page contact
├── admin.html              → Panneau d'administration (protégé par mot de passe)
├── mentions-legales.html   → Mentions légales & RGPD
├── 404.html                → Page erreur 404
└── assets/
    ├── css/
    │   └── style.css       → Toutes les feuilles de style
    └── js/
        ├── data.js         → Gestionnaire de données (localStorage)
        └── main.js         → Scripts communs
```

---

## 🚀 Mise en ligne

### Option 1 : Hébergement statique gratuit (recommandé)
- **GitHub Pages** : Gratuit, déploiement automatique depuis un repo GitHub
- **Netlify** : Glissez-déposez le dossier sur netlify.com/drop
- **Vercel** : Gratuit pour les sites statiques
- **Infomaniak Free** : Hébergement gratuit suisse

### Option 2 : Votre propre hébergeur
Uploadez tous les fichiers via FTP dans le dossier `public_html` ou `www`.

---

## 🔐 Accès Admin

URL : `votre-site.fr/admin.html`

Mot de passe par défaut : `Minouches2024!`

⚠️ **Changez immédiatement le mot de passe** dans le panneau admin → Paramètres.

### Fonctionnalités admin :
- ➕ Ajouter/modifier/supprimer des chats et chatons
- 📋 Gérer les demandes d'adoption (approuver/refuser)
- 📊 Mettre à jour les statistiques du site
- ⚙️ Changer le mot de passe admin

---

## 💛 Intégration Yapla (Dons)

Le site est prêt pour Yapla. Pour finaliser l'intégration :

1. **Créez votre compte Yapla** sur [yapla.com](https://www.yapla.com)
2. **Créez un formulaire de don** dans votre espace Yapla
3. **Dans `don.html`**, remplacez `YOUR_YAPLA_ORG` par votre identifiant Yapla :
   ```html
   <!-- Cherchez cette ligne dans don.html : -->
   btn.href = `https://www.yapla.com/fr/YOUR_YAPLA_ORG/don?amount=${val}`;
   
   <!-- Remplacez YOUR_YAPLA_ORG par votre ID, exemple : -->
   btn.href = `https://www.yapla.com/fr/pastoucheauxminouches/don?amount=${val}`;
   ```
4. **Option avancée** : Copiez l'iframe Yapla directement dans la div `#yaplaWidget` de `don.html`

### Alternative gratuite : HelloAsso
Si vous préférez HelloAsso (également gratuit pour les associations) :
- Remplacez le lien Yapla par votre lien HelloAsso
- Exemple : `https://www.helloasso.com/associations/pas-touche-aux-minouches/formulaires/don`

---

## 🗄️ Configuration Supabase (OBLIGATOIRE pour la sauvegarde permanente)

Sans Supabase, le site affiche des données de démo et les chats ajoutés ne sont **pas sauvegardés**.

### Étape 1 — Créer le projet Supabase (5 min, gratuit)

1. Allez sur **[supabase.com](https://supabase.com)** → "Start your project"
2. Créez un compte (GitHub ou email)
3. Cliquez **"New project"** → choisissez un nom (ex: `pastouche-minouches`) → choisissez un mot de passe → cliquez "Create new project"
4. Attendez ~2 minutes que le projet se lance

### Étape 2 — Créer les tables (copier-coller le SQL)

1. Dans votre projet Supabase, allez dans **"SQL Editor"** (menu de gauche)
2. Cliquez **"New query"**
3. Copiez-collez **tout le bloc SQL** qui se trouve en commentaire en haut de `assets/js/data.js`
4. Cliquez **"Run"** ✅

### Étape 3 — Récupérer les clés

1. Allez dans **Settings > API** (menu de gauche)
2. Copiez :
   - **"Project URL"** → ressemble à `https://abcdefgh.supabase.co`
   - **"anon public"** key → commence par `eyJhbGci...`

### Étape 4 — Coller les clés dans le site

Ouvrez `assets/js/data.js` et remplacez les deux lignes en haut :

```javascript
// AVANT :
const SUPABASE_URL      = 'VOTRE_URL_SUPABASE';
const SUPABASE_ANON_KEY = 'VOTRE_CLE_ANON';

// APRÈS (exemple) :
const SUPABASE_URL      = 'https://abcdefgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Étape 5 — Peupler avec les chats de démo (optionnel)

Dans le panneau admin (`/admin.html`), cliquez **"Ajouter un minouche"** pour commencer à créer vos vrais profils. Les données seront immédiatement visibles sur tout le site, pour tout le monde, en permanence. 🎉

---

## 🎨 Personnalisation

### Couleurs (dans `assets/css/style.css`) :
```css
:root {
  --coral: #f1908c;        /* Couleur principale */
  --cream: #fff9f2;        /* Fond clair */
  --brown: #5c4033;        /* Texte principal */
}
```

### Informations de l'association (à modifier dans tous les fichiers) :
- Nom : "Pas touche aux Minouches"
- Email : contact@pastoucheauxminouches.fr
- SIRET : À compléter dans `mentions-legales.html`
- Réseaux sociaux : Lien Facebook/Instagram dans le footer

---

## 📱 Compatible
- ✅ Desktop, tablette, mobile (responsive)
- ✅ Tous les navigateurs modernes
- ✅ Sans framework externe (CSS + JS vanilla)
- ✅ Yapla (dons en ligne)
- ✅ SEO friendly

---

*Créé avec ❤️ pour les minouches*
