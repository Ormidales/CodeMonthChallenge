// Liste des fuseaux horaires à afficher
const timeZones = ['UTC', 'America/New_York', 'Europe/Paris']; // Notez les noms de fuseaux horaires corrects

// Mettre à jour l'heure pour un fuseau horaire spécifique
function updateTime(zone) {
  const now = new Date();
  const options = { timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formatter = new Intl.DateTimeFormat([], options);
  const timeString = formatter.format(now);
  document.getElementById(`time-${zone.replace(/\//g, '_')}`).innerText = timeString;  // Remplacez '/' par '_'
}

// Mettre à jour l'heure pour tous les fuseaux horaires
function updateAllTimes() {
  for (const zone of timeZones) {
    updateTime(zone);
  }
}

// Mettre à jour l'heure toutes les secondes
setInterval(updateAllTimes, 1000);

// Mettre à jour l'heure immédiatement au chargement de la page
updateAllTimes();