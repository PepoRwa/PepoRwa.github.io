# ⚡ GOWRAX.ME | Tactical Esport Interface

Bienvenue sur le terminal central de **GOWRAX**, une organisation esport d'élite (Association de fait). Cette interface web sert de hub tactique et de centre de commandement pour le déploiement de nos unités sur de multiples fronts compétitifs.

## 🛠 Spécifications Techniques (OS V7.0)

L'infrastructure GOWRAX a été forgée pour allier esthétique cyber-tactique et performances de haut niveau :

* **Frontend & Design :** Tailwind CSS (Vitesse de déploiement Alpha).
* **Typographie :** Rajdhani (Cyber), Share Tech Mono (Terminal), Rock Salt (Signature).
* **Système Global (GOWRAX OS V7.0) :** * Moteur d'injection de navigation dynamique en Single Page.
    * Système de *Smart Broadcast* (Pop-ups d'alertes via BDD).
    * Moteur d'ambiance stellaire dynamique (Canvas HTML5).
* **Backend & Sécurité (BaaS) :** Supabase (PostgreSQL).
    * Synchronisation en temps réel des bases de données (News, Calendrier, Roster).
    * *Edge Functions* sécurisées pour le transfert des communications (Gateways Web to Discord).
    * Authentification RLS pour la sécurisation du *HQ Dashboard* (Panel Admin).

## 📂 Architecture du Protocole

* `/` : Terminal d'entrée (Index) et activation du protocole.
* `/news/` : Centre de renseignement (Gowrax_Archives).
* `/roster/` : Sélection des divisions opérationnelles (Units).
    * `valorant/` : Division Tactical Shooter.
    * `cs2/` : Division Tactical Operations.
    * `fortnite/` : Division Battle Royale.
    * `rl/` : Division Supersonic Socar.
    * `calendar.html` : Interface de suivi des déploiements (Schedule).
* `/profiles/` : Base de données du personnel (Agents & Staff).
* `/ceo/` : Archives classifiées du Haut Commandement (Ptitegow, Filouxx, Crazzynel).
* `/contact/` & `/join/` : Passerelles de transmission sécurisées (Relations & Recrutement).

## 🚀 Déploiement

Le front-end du projet est configuré pour être servi via **GitHub Pages** sur le domaine personnalisé : [gowrax.me](https://gowrax.me).
Le back-end et les bases de données sont gérés via des clusters cloud.

---
*GOWRAX Protocol v7.0 - Conçu et maintenu par l'Unité Bâtisseur (Crazzynel).*