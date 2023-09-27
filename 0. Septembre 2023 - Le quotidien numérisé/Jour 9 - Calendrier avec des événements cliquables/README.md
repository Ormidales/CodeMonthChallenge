# Calendrier Cliquer
Calendrier Cliquer est un simple outil de calendrier avec des événements cliquables. Il est construit avec HTML, TailwindCSS, et JavaScript.

## Fonctionnalités
- Affichage d'un calendrier pour le mois en cours (actuellement fixé pour octobre 2023)
- Événements cliquables qui affichent des informations dans un panneau déroulant
- Facilement personnalisable avec TailwindCSS

## Utilisation
Ouvrez le fichier `index.html` dans votre navigateur. Vous verrez un calendrier avec des dates. Cliquez sur les dates qui ont un fond bleu pour voir les informations sur les événements de cette date.

### Ajouter des événements
Pour ajouter des événements, modifiez le fichier script.js. Vous trouverez une variable appelée events qui est un objet où vous pouvez ajouter des paires clé-valeur pour les événements.

```javascript
const events = {
  1: 'Réunion',
  15: 'Webinaire',
  30: 'Anniversaire'
};
```
Dans cet exemple, des événements ont été ajoutés pour les jours 1, 15 et 30. Vous pouvez ajouter ou retirer des événements comme vous le souhaitez.