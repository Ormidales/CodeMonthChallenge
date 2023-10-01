# Gestionnaire de Tâches en JavaScript

## Description
Ce projet est un simple gestionnaire de tâches (ou todo-list) développé en HTML, CSS et JavaScript. Il permet aux utilisateurs d'ajouter des tâches, de les marquer comme terminées et de les supprimer. De plus, il inclut une fonction de priorité pour chaque tâche.

## Fonctionnalités
- Ajouter une nouvelle tâche
- Marquer une tâche comme terminée
- Supprimer une tâche
- Choisir une priorité pour chaque tâche
- Trier les tâches selon leur priorité
- Sauvegarde automatique des tâches dans localStorage

## Comment l'utiliser ?
1. Clonez ce dépôt ou téléchargez les fichiers ZIP.
2. Ouvrez index.html dans votre navigateur web.
3. Utilisez le formulaire pour ajouter une nouvelle tâche.
4. Cliquez sur les boutons Done ou Delete pour marquer une tâche comme terminée ou la supprimer.
5. Les tâches sont automatiquement sauvegardées et seront disponibles même après un rafraîchissement de la page.

## Exigences
- Navigateur web moderne (Chrome, Firefox, Safari, etc.)
- Aucun serveur nécessaire, peut fonctionner localement

## Code structure
- index.html: Fichier HTML principal contenant la structure de base.
- script.js: Fichier JavaScript contenant toute la logique.

## Fonctions JavaScript importantes
- addTask(): Ajoute une nouvelle tâche à la liste.
- deleteTask(): Supprime une tâche de la liste.
- toggleTask(): Bascule une tâche entre les états terminé et non-terminé.
- saveTasks(): Sauvegarde toutes les tâches dans localStorage.
- sortTasks(): Trie les tâches en fonction de leur priorité.