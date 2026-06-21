# CardMind 🃏

Jeu de paires (matching pairs) conçu dans le cadre du cours SEG3525 – Conception centrée sur l'usager.

**Benny Aubelin Cubahiro — Université d'Ottawa**

## Description

CardMind est un jeu de mémorisation qui adapte son interface selon le profil de l'utilisateur :

- **Mode Zen** (Débutant) — grille 4×4, sans minuterie, design chaleureux pour les utilisateurs novices
- **Mode Avancé** — grille 6×6, minuterie 3:00, HUD complet pour les utilisateurs expérimentés

## Fonctionnalités

- 3 thèmes de cartes : Animaux, Nature, Techno
- 2 niveaux de difficulté
- Flip 3D CSS (transform-style: preserve-3d)
- Meilleur temps sauvegardé par combinaison niveau×thème (localStorage)
- Design adaptatif selon le persona (Gestalt, attention, mémoire)

## Technologies

- React 18 + Vite
- CSS3 (variables, animations, dual-mode theming)

## Lancer le projet

```bash
npm install
npm run dev
```

## Démo

https://aubelin.github.io/cardmind/
