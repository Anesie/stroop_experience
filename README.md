# 🧠 Tâche de Stroop

## 📖 Présentation
Ce projet est une implémentation web de la célèbre **tâche de Stroop**, une expérience classique en psychologie cognitive permettant d'évaluer l'interférence cognitive et le contrôle inhibiteur. 

Dans cette expérience, le participant est confronté à des mots de couleurs ("ROUGE", "VERT", "BLEU", "JAUNE") écrits dans des encres de couleurs différentes. **L'objectif est de cliquer sur la boîte correspondant à la couleur de l'encre, tout en ignorant le mot écrit.**

Ce script a été développé spécifiquement pour la collecte de données comportementales et motrices, avec un accent particulier sur la précision temporelle et le suivi spatial des mouvements de prise de décision.

## ✨ Fonctionnalités Principales
*   **Design Expérimental Structuré :** L'expérience est divisée en 6 blocs de 20 essais, incluant des pauses automatiques entre les blocs.
*   **Conditions Congruentes et Incongruentes :** Mélange aléatoire (via un algorithme de shuffle) de stimuli congruents (ex: le mot "ROUGE" écrit en rouge) et incongruents (ex: le mot "VERT" écrit en rouge) avec des ratios spécifiques pour manipuler l'anticipation.
*   **Mouse Tracking (Suivi de souris) :** Enregistrement de la trajectoire complète de la souris toutes les 13 millisecondes pour permettre l'analyse des mouvements moteurs et de l'hésitation cognitive.
*   **Chronométrie de Haute Précision :** Utilisation de l'API `performance.now()` pour garantir un enregistrement des temps de réaction (RT) avec une précision de l'ordre de la milliseconde.
*   **Feedback Visuel :** Affichage d'une pénalité visuelle (un grand "X" rouge) et d'un délai supplémentaire (2 secondes) en cas de mauvaise réponse, forçant le participant à se reconcentrer.

## 📊 Données Collectées
À la fin de l'expérience, le script génère un tableau de résultats détaillé (`results`), prêt à être exporté pour des analyses statistiques (ex: via R ou Python). Pour chaque essai, les données suivantes sont enregistrées :
*   `trialNumber` : Numéro de l'essai.
*   `word` & `inkColor` : Le mot affiché et la véritable couleur de l'encre.
*   `type` : Type d'essai (Congruent ou Incongruent).
*   `response` & `isCorrect` : Le choix du participant et l'évaluation de l'exactitude (Vrai/Faux).
*   `reactionTime` : Temps de réaction exact.
*   `startMouseX` / `startMouseY` : Coordonnées du clic initial (départ).
*   `endMouseX` / `endMouseY` : Coordonnées du clic final (réponse).
*   `mouseTrace` : Un sous-tableau contenant l'historique complet des coordonnées (x, y) et du timestamp de la souris pendant l'essai.

## 🛠️ Technologies Utilisées
*   **HTML5 / CSS3 :** Création d'une interface minimaliste (fond noir, texte blanc) pour éliminer les distractions visuelles et forcer l'attention sur les stimuli.
*   **JavaScript (Vanilla) :** Logique de l'expérience, manipulation du DOM en temps réel, gestion des événements (`Event Listeners`), minuteries asynchrones (`setTimeout`, `setInterval`) et stockage des données.

## 🚀 Installation et Utilisation
Ce projet est un script client-side pur (Front-end) et ne nécessite aucune installation de serveur ou de base de données locale.

1. Clonez ce dépôt GitHub :
   ```bash
   git clone https://github.com/Anesie/stroop_experience.git
