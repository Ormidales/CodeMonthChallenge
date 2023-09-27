// Générer un calendrier de démonstration pour le mois d'octobre 2023
const calendarElement = document.getElementById('calendar');
const eventInfoElement = document.getElementById('eventInfo');

const events = {
  1: 'Réunion',
  15: 'Webinaire',
  30: 'Anniversaire',
  18: 'Réunion importante'
};

for (let day = 1; day <= 31; day++) {
  const dayElement = document.createElement('div');
  dayElement.classList.add('border', 'p-4');
  dayElement.textContent = day;
  
  if (events[day]) {
    dayElement.classList.add('bg-blue-200', 'cursor-pointer');
    dayElement.addEventListener('click', function() {
      eventInfoElement.textContent = `Événement le ${day} octobre: ${events[day]}`;
      eventInfoElement.style.display = 'block';
    });
  }

  calendarElement.appendChild(dayElement);
}