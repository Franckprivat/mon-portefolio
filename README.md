# Portfolio — Franck Kiemde

Portfolio personnel construit avec **Astro**, **Tailwind CSS v4** et **GSAP**.
Site statique, très animé, pensé mobile-first, accessible et optimisé Lighthouse.

**Démo :** https://franck-kiemde.dev *(à mettre à jour après déploiement)*

## ✨ Fonctionnalités

- **Design premium** : thème sombre par défaut, glassmorphism, dégradés subtils, grain de fond
- **Animations** : smooth scrolling (Lenis), révélations au scroll et texte mot à mot (GSAP + ScrollTrigger), boutons magnétiques, parallaxe souris, tilt 3D des cartes, curseur personnalisé
- **Mode clair / sombre** : suit le système, préférence enregistrée, zéro flash au chargement
- **Palette de commandes** (`Ctrl/Cmd + K`) : navigation + recherche de projets + actions rapides
- **Contenu en MDX** : projets et articles gérés par les Content Collections (schémas Zod typés)
- **Filtre des projets** par technologie sur `/projects`
- **SEO complet** : sitemap, robots.txt, OpenGraph, Twitter Cards, JSON-LD (schema.org), canonical
- **Performance** : zéro framework JS client, images optimisées en WebP par Astro, lazy loading, polices auto-hébergées
- **Accessibilité** : navigation clavier, `prefers-reduced-motion` respecté, ARIA sur les composants interactifs
- **Bonus** : loader d'entrée, particules canvas, transitions de pages (View Transitions), bouton retour en haut, easter egg (↑↑↓↓←→←→BA 😉)

## 🛠️ Stack

| Rôle | Outil |
| --- | --- |
| Framework | [Astro 5](https://astro.build) (statique, Content Collections, View Transitions) |
| Styles | [Tailwind CSS v4](https://tailwindcss.com) + design tokens en variables CSS |
| Animations | [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) |
| Icônes | [Lucide](https://lucide.dev) + [simple-icons](https://simpleicons.org) (logos de marques) |
| Contenu | MDX validé par Zod |
| Typo | Inter Variable + Space Grotesk Variable (auto-hébergées) |

## 🚀 Démarrer

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # build de production dans ./dist
npm run preview  # prévisualiser le build
```

## 📁 Structure

```text
src/
├── assets/          # images (optimisées au build)
├── components/
│   ├── layout/      # navbar, footer, palette, curseur, loader…
│   ├── sections/    # hero, à propos, compétences, timeline…
│   └── ui/          # boutons, badges, cartes réutilisables
├── content/
│   ├── projects/    # 1 fichier MDX = 1 projet (+ page dédiée)
│   └── blog/        # articles MDX
├── data/            # compétences, expériences (typées)
├── layouts/         # BaseLayout (SEO + éléments globaux)
├── lib/             # utilitaires (dates, temps de lecture…)
├── pages/           # routes du site
├── scripts/         # app.ts : moteur d'animations GSAP/Lenis
└── styles/          # global.css : design system Tailwind v4
```

## ➕ Ajouter un projet ou un article

Créer un fichier `.mdx` dans `src/content/projects/` ou `src/content/blog/` :
la carte, la page de détail et la recherche de la palette sont générées automatiquement.
Le schéma de la frontmatter est défini (et validé) dans `src/content.config.ts`.

## ✉️ Formulaire de contact

Sans configuration, le formulaire ouvre le client mail (repli `mailto:`).
Pour brancher un service d'envoi (Formspree, EmailJS, Resend via une function…),
définir l'endpoint dans `.env` :

```sh
PUBLIC_FORM_ENDPOINT="https://formspree.io/f/xxxxxxx"
```

## 📋 Avant de déployer

- [ ] Remplacer `site` dans `astro.config.mjs` par le vrai domaine (et dans `public/robots.txt`)
- [ ] Vérifier l'URL LinkedIn dans `src/consts.ts`
- [ ] Déposer le CV dans `public/cv-franck-kiemde.pdf`
- [ ] (Optionnel) Configurer `PUBLIC_FORM_ENDPOINT`
