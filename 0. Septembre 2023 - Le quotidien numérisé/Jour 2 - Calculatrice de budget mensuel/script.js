document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('budget-form');
  const result = document.getElementById('result');
  const historyDiv = document.getElementById('history');
  
  // Charger l'historique à partir de localStorage
  let history = JSON.parse(localStorage.getItem('budgetHistory')) || [];
  displayHistory(history);

  // Initialiser le graphique
  let ctx = document.getElementById('budgetChart').getContext('2d');
  let budgetChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Revenu', 'Nourriture', 'Loyer', 'Transport', 'Autres'],
      datasets: [{
        label: 'Dernier budget en €',
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ]
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const income = parseFloat(document.getElementById('income').value);
    const food = parseFloat(document.getElementById('food').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;

    const totalExpenses = food + rent + transport + others;
    const balance = income - totalExpenses;
    
    // Sauvegarder les données dans l'historique
    const currentDate = new Date().toLocaleDateString();
    history.push({ date: currentDate, income, food, rent, transport, others, balance });
    localStorage.setItem('budgetHistory', JSON.stringify(history));

    // Mettre à jour le graphique
    budgetChart.data.datasets[0].data = [income, food, rent, transport, others];
    budgetChart.update();

    // Vérifier les alertes et les notifications
    let alerts = "";

    if (balance < 0) {
      alerts += "Attention : Votre budget mensuel est négatif!<br>";
    }

    if (food > 500) {
      alerts += "Attention : Vos dépenses en nourriture sont élevées!<br>";
    }

    if (rent > 1000) {
      alerts += "Attention : Vos dépenses de loyer sont élevées!<br>";
    }

    if (transport > 300) {
      alerts += "Attention : Vos dépenses de transport sont élevées!<br>";
    }

    if (others > 400) {
      alerts += "Attention : Vos autres dépenses sont élevées!<br>";
    }

    if (alerts) {
      result.innerHTML += "<br>" + alerts;
    }

    if (food > 300) {
      suggestions += "Astuce : Vous pourriez économiser sur les repas en cuisinant à la maison.<br>";
    }

    if (rent > 800) {
      suggestions += "Astuce : Avez-vous envisagé de partager votre logement pour réduire le loyer?<br>";
    }

    if (transport > 100) {
      suggestions += "Astuce : Utiliser les transports en commun pourrait réduire vos coûts de transport.<br>";
    }

    if (others > 200) {
      suggestions += "Astuce : Réévaluez vos achats non essentiels pour économiser de l'argent.<br>";
    }

    if (suggestions) {
      result.innerHTML += "<br><h3>Suggestions pour économiser :</h3>" + suggestions;
    }

    displayHistory(history);
  });

  function displayHistory(history) {
    let output = "<h2>Historique des budgets</h2>";
    history.forEach((entry, index) => {
      output += `
        <div class="history-entry">
          <h3>Entrée ${index + 1} - ${entry.date}</h3>
          <p>Revenu : ${entry.income}€</p>
          <p>Nourriture : ${entry.food}€</p>
          <p>Loyer : ${entry.rent}€</p>
          <p>Transport : ${entry.transport}€</p>
          <p>Autres : ${entry.others}€</p>
          <p>Balance : ${entry.balance}€</p>
        </div>
      `;
    });
    historyDiv.innerHTML = output;
  }
});