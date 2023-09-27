// Initialisation des variables
let totalSteps = 0;

// Sélection des éléments du DOM
const stepsInput = document.getElementById('steps');
const totalElement = document.getElementById('total');
const addStepsBtn = document.getElementById('addSteps');

// Écouteur d'événement sur le bouton "Ajouter"
addStepsBtn.addEventListener('click', function() {
    // Récupération de la valeur du champ d'entrée et conversion en nombre
    const steps = parseInt(stepsInput.value);

    // Ajout au total
    totalSteps += steps;
    
    // Sauvegarde des données lors de la mise à jour
    localStorage.setItem("totalSteps", totalSteps);

    // Récupération des données lors du chargement de la page
    totalSteps = parseInt(localStorage.getItem("totalSteps")) || 0;
    totalElement.textContent = totalSteps;

    // Réinitialisation du champ d'entrée
    stepsInput.value = '';
});