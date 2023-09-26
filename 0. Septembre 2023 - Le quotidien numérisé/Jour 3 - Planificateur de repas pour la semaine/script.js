document.addEventListener('DOMContentLoaded', function() {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const table = document.getElementById('mealTable');

    // Remplir le tableau avec les jours de la semaine
    for (let i = 0; i < days.length; i++) {
        const row = table.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = days[i];
        cell2.innerHTML = "-";
        cell3.innerHTML = "-";
        cell4.innerHTML = "-";
    }

    // Ajout d'un bouton pour ajouter des repas
    document.getElementById('addMeal').addEventListener('click', function() {
        const dayIndex = prompt("Quel jour? (0 pour Lundi, 1 pour Mardi, etc.)");
        const mealType = prompt("Type de repas? (1 pour Petit-déjeuner, 2 pour Déjeuner, 3 pour Dîner)");
        const meal = prompt("Quel est le repas?");
        table.rows[parseInt(dayIndex) + 1].cells[parseInt(mealType)].innerHTML = meal;
    });
});